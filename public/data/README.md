# Data Management

This directory contains JSON files used to dynamically populate content on the portfolio website.

## Files

### `experience.json`
Contains professional experience data that populates the Experience section of the portfolio. This can be generated from LinkedIn data with `npm run update:linkedin`.

**Structure:**
```json
{
  "updated_at": "ISO date string",
  "items": [
    {
      "id": "unique-identifier",
      "category": "experience",
      "start_date": "YYYY-MM",
      "end_date": "YYYY-MM" | null,
      "title": "Position Title",
      "role": "Employment Type",
      "organization": "Company/Institution Name",
      "location": "City, Country",
      "summary": "Brief description of the role",
      "bullets": [
        "Achievement or responsibility 1",
        "Achievement or responsibility 2"
      ],
      "links": [
        {
          "label": "Link description",
          "url": "https://example.com"
        }
      ]
    }
  ]
}
```

**Field Descriptions:**
- `id`: Unique identifier for the experience item
- `category`: Always "experience" for experience items
- `start_date`: Start date in YYYY-MM format
- `end_date`: End date in YYYY-MM format, or `null` for current positions
- `title`: Job title or project name
- `role`: Type of engagement (e.g., "Full-time", "Internship", "Contract")
- `organization`: Company or institution name
- `location`: Geographic location
- `summary`: Brief overview of the role or project
- `bullets`: Array of key achievements or responsibilities (optional)
- `links`: Array of relevant links (publications, projects, etc.) (optional)

### `publications.json`
Auto-generated file from OpenAlex API. Updated weekly via GitHub Actions.
Last manual update: 2025-08-26

### `linkedin-feed.json`
Generated from LinkedIn source data when available. The homepage displays this file only when it contains posts.

Supported update inputs:
- `LINKEDIN_PROFILE_API_URL` plus optional `LINKEDIN_ACCESS_TOKEN`: fetches an authorized JSON payload.
- `LINKEDIN_SOURCE_JSON`: raw JSON supplied as a GitHub secret or local environment variable.
- `LINKEDIN_EXPORT_DIR`: local LinkedIn export directory, defaulting to `data/linkedin/`.

The script accepts common LinkedIn/export field names for positions and posts, then writes:
- `public/data/experience.json`
- `public/data/linkedin-feed.json`

## How to Add New Experience

1. Edit `public/data/experience.json`
2. Add a new item to the `items` array following the structure above
3. Update the `updated_at` field with the current date
4. Commit and push changes to GitHub

The website will automatically load the new data without requiring a rebuild.

## Tips

- Keep summaries concise but descriptive
- Use bullet points for specific achievements and responsibilities
- Include relevant links when available (publications, project pages, etc.)
- Ensure dates are in YYYY-MM format for proper sorting
- Use descriptive but concise titles
