#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

/**
 * Fetches publications from OpenAlex API for a given author ID
 * Handles pagination and deduplication
 */
class OpenAlexFetcher {
  constructor(authorId, apiKey = null, email = null) {
    this.authorId = authorId;
    this.apiKey = apiKey;
    this.email = email;
    this.baseUrl = 'https://api.openalex.org/works';
    this.allWorks = [];
    this.seenIds = new Set();
    this.seenDois = new Set();
  }

  /**
   * Main method to fetch all publications
   */
  async fetchAllPublications() {
    console.log(`🔍 Fetching publications for author ID: ${this.authorId}`);
    
    const filters = [
      `author.id:${this.authorId}`,
      'is_paratext:false'
    ].join(',');
    
    const params = new URLSearchParams({
      filter: filters,
      sort: 'publication_year:desc',
      'per-page': '200',
      cursor: '*'
    });
    
    // Add email for better rate limits (polite pool)
    if (this.email) {
      params.append('mailto', this.email);
    }
    
    // Add API key for premium features if available
    if (this.apiKey) {
      params.append('api_key', this.apiKey);
    }

    let url = `${this.baseUrl}?${params}`;
    let pageCount = 0;

    while (url) {
      pageCount++;
      console.log(`📄 Fetching page ${pageCount}...`);
      
      try {
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Process works from this page
        for (const work of data.results) {
          this.processWork(work);
        }
        
        // Check for next page
        url = data.meta.next_cursor ? 
          `${this.baseUrl}?${params.toString().replace('cursor=*', `cursor=${data.meta.next_cursor}`)}` : 
          null;
        
        console.log(`✅ Processed ${data.results.length} works from page ${pageCount}`);
        
        // Add delay to be respectful to the API
        await this.delay(100);
        
      } catch (error) {
        console.error(`❌ Error fetching page ${pageCount}:`, error.message);
        break;
      }
    }

    console.log(`🎉 Total publications fetched: ${this.allWorks.length}`);
    return this.finalizeAndSort();
  }

  /**
   * Process individual work and extract required fields
   */
  processWork(work) {
    const openAlexId = work.id;
    const doi = work.doi?.replace('https://doi.org/', '') || null;
    
    // Skip if we've already seen this work (by OpenAlex ID or DOI)
    if (this.seenIds.has(openAlexId) || (doi && this.seenDois.has(doi))) {
      return;
    }
    
    // Mark as seen
    this.seenIds.add(openAlexId);
    if (doi) {
      this.seenDois.add(doi);
    }

    // Extract primary URL with fallback logic
    const primaryUrl = this.extractPrimaryUrl(work, doi);
    
    // Extract author names
    const authors = work.authorships
      ?.map(authorship => authorship.author?.display_name)
      .filter(name => name) || [];

    // Extract and process abstract
    const abstractText = work.abstract_inverted_index ? 
      this.reconstructAbstract(work.abstract_inverted_index) : null;
    const abstractTeaser = abstractText ? 
      this.createAbstractTeaser(abstractText) : null;

    // Determine publication type and category
    const typeInfo = this.categorizePublication(work);

    const publication = {
      id: openAlexId,
      title: work.display_name || 'Untitled',
      year: work.publication_year || null,
      venue: work.host_venue?.display_name || work.primary_location?.source?.display_name || 'Unknown Venue',
      doi: doi,
      url: primaryUrl,
      isOpenAccess: work.open_access?.is_oa || false,
      openAccessUrl: work.open_access?.oa_url || null,
      type: typeInfo.type,
      category: typeInfo.category,
      authors: authors,
      citedByCount: work.cited_by_count || 0,
      abstract: abstractText,
      abstractTeaser: abstractTeaser
    };

    this.allWorks.push(publication);
  }

  /**
   * Reconstruct abstract from inverted index
   */
  reconstructAbstract(invertedIndex) {
    if (!invertedIndex || Object.keys(invertedIndex).length === 0) {
      return null;
    }

    const words = [];
    for (const [word, positions] of Object.entries(invertedIndex)) {
      for (const pos of positions) {
        words[pos] = word;
      }
    }

    return words.filter(word => word !== undefined).join(' ');
  }

  /**
   * Create abstract teaser (first ~140 characters)
   */
  createAbstractTeaser(abstract) {
    if (!abstract || abstract.length <= 140) {
      return abstract;
    }

    let teaser = abstract.substring(0, 140);
    const lastSpace = teaser.lastIndexOf(' ');
    if (lastSpace > 100) { // Ensure we don't cut too short
      teaser = teaser.substring(0, lastSpace);
    }
    return teaser + '...';
  }

  /**
   * Categorize publication based on OpenAlex data
   */
  categorizePublication(work) {
    const workType = (work.type || '').toLowerCase();
    const venue = work.host_venue?.display_name || '';
    const source = work.primary_location?.source?.display_name || '';
    
    // Check if it's a conference based on venue/source names
    const conferenceKeywords = [
      'conference', 'proceedings', 'symposium', 'workshop', 
      'congress', 'meeting', 'icce', 'coastal engineering'
    ];
    
    const isConference = conferenceKeywords.some(keyword => 
      venue.toLowerCase().includes(keyword) || 
      source.toLowerCase().includes(keyword)
    );

    // Determine if it's a preprint
    const preprintKeywords = ['arxiv', 'biorxiv', 'preprint', 'ssrn'];
    const isPreprint = preprintKeywords.some(keyword => 
      venue.toLowerCase().includes(keyword) || 
      source.toLowerCase().includes(keyword)
    ) || workType.includes('preprint');

    let category, type;
    
    if (isPreprint) {
      category = 'preprint';
      type = 'preprint';
    } else if (isConference) {
      category = 'conference';
      type = 'conference-paper';
    } else if (workType.includes('book') || workType.includes('monograph')) {
      category = 'book';
      type = workType;
    } else {
      // Default to article
      category = 'article';
      type = workType || 'article';
    }

    return { type, category };
  }

  /**
   * Extract primary URL with fallback logic
   */
  extractPrimaryUrl(work, doi) {
    // Prefer primary_location.landing_page_url
    if (work.primary_location?.landing_page_url) {
      return work.primary_location.landing_page_url;
    }
    
    // Then open_access.oa_url
    if (work.open_access?.oa_url) {
      return work.open_access.oa_url;
    }
    
    // Finally, construct DOI URL if DOI exists
    if (doi) {
      return `https://doi.org/${doi}`;
    }
    
    // Fallback to OpenAlex URL
    return work.id;
  }

  /**
   * Sort and finalize the publication list
   */
  finalizeAndSort() {
    // Sort by year (descending) then by title (ascending)
    this.allWorks.sort((a, b) => {
      // Primary sort: year (descending, null years go to end)
      if (a.year !== b.year) {
        if (a.year === null) return 1;
        if (b.year === null) return -1;
        return b.year - a.year;
      }
      
      // Secondary sort: title (ascending)
      return a.title.localeCompare(b.title);
    });

    return {
      updated_at: new Date().toISOString(),
      total_count: this.allWorks.length,
      items: this.allWorks
    };
  }

  /**
   * Simple delay function
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * Main execution function
 */
async function main() {
  try {
    const authorId = process.env.OPENALEX_AUTHOR_ID || 'A5082088726';
    const apiKey = process.env.OPENALEX_API_KEY;
    const email = process.env.OPENALEX_EMAIL;
    
    console.log('🚀 Starting OpenAlex publication fetch...');
    
    const fetcher = new OpenAlexFetcher(authorId, apiKey, email);
    const publicationsData = await fetcher.fetchAllPublications();
    
    // Ensure output directory exists
    const outputDir = path.join(process.cwd(), 'public', 'data');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Write to file
    const outputPath = path.join(outputDir, 'publications.json');
    fs.writeFileSync(outputPath, JSON.stringify(publicationsData, null, 2));
    
    console.log(`✅ Publications saved to ${outputPath}`);
    console.log(`📊 Summary: ${publicationsData.total_count} publications`);
    
    // Log some statistics
    const years = publicationsData.items
      .map(p => p.year)
      .filter(year => year !== null);
    
    const yearRange = years.length > 0 ? 
      `${Math.min(...years)}-${Math.max(...years)}` : 
      'No years available';
    
    const openAccessCount = publicationsData.items
      .filter(p => p.isOpenAccess).length;
    
    console.log(`📅 Year range: ${yearRange}`);
    console.log(`🔓 Open access: ${openAccessCount}/${publicationsData.total_count}`);
    
  } catch (error) {
    console.error('❌ Error in main execution:', error);
    process.exit(1);
  }
}

// Only run if this script is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { OpenAlexFetcher };