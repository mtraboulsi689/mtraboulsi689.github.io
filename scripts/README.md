# Publications Data Fetcher

This directory contains scripts for automatically fetching and updating publication data from the OpenAlex API.

## How it works

### 1. Automated Data Fetching (`fetch-publications.js`)

The script fetches publications for OpenAlex author ID `A5082088726` and:

- **Queries OpenAlex API** with filters for non-paratext works
- **Handles pagination** to retrieve all publications
- **Deduplicates** entries by DOI and OpenAlex ID
- **Extracts key data** including:
  - Title, authors, publication year
  - Venue/journal information
  - DOI and URLs (with fallback logic)
  - Open access status and URLs
  - Citation counts
  - Publication types

### 2. Weekly Updates (GitHub Actions)

The workflow in `.github/workflows/update-publications.yml`:

- **Runs weekly** every Sunday at 2 AM UTC
- **Can be triggered manually** via GitHub Actions UI
- **Commits changes** automatically when new data is found
- **Respects API limits** with appropriate delays

### 3. Frontend Integration

The Publications component (`src/components/Publications.tsx`):

- **Fetches data** from `/data/publications.json`
- **Shows loading states** and error handling
- **Provides filtering** by publication type
- **Displays metrics** like total citations and open access count
- **Updates automatically** when new data is available

## Data Structure

The generated `public/data/publications.json` contains:

```json
{
  "updated_at": "2025-01-01T00:00:00.000Z",
  "total_count": 4,
  "items": [
    {
      "id": "https://openalex.org/W...",
      "title": "Publication Title",
      "year": 2025,
      "venue": "Journal Name",
      "doi": "10.1000/...",
      "url": "https://...",
      "isOpenAccess": true,
      "openAccessUrl": "https://...",
      "type": "article",
      "authors": ["Author 1", "Author 2"],
      "citedByCount": 5
    }
  ]
}
```

## Manual Usage

To run the script manually:

```bash
# Fetch latest publications
node scripts/fetch-publications.js

# Set custom author ID
OPENALEX_AUTHOR_ID=A1234567890 node scripts/fetch-publications.js
```

## Benefits

- ✅ **Always up-to-date** publication list
- ✅ **No manual maintenance** required
- ✅ **Rich metadata** from OpenAlex
- ✅ **Citation tracking** included
- ✅ **Open access indicators**
- ✅ **Professional presentation**