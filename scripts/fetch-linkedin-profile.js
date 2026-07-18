#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const PROFILE_URL = process.env.LINKEDIN_PROFILE_URL || 'https://www.linkedin.com/in/mtraboulsi/';
const API_URL = process.env.LINKEDIN_PROFILE_API_URL;
const ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
const SOURCE_JSON = process.env.LINKEDIN_SOURCE_JSON;
const SOURCE_JSON_FILE = process.env.LINKEDIN_SOURCE_JSON_FILE || 'public/data/linkedin-source.json';
const EXPORT_DIR = process.env.LINKEDIN_EXPORT_DIR || 'data/linkedin';
const MAX_FEED_ITEMS = Number.parseInt(process.env.LINKEDIN_FEED_LIMIT || '6', 10);

const PUBLIC_DATA_DIR = path.join(process.cwd(), 'public', 'data');
const EXPERIENCE_PATH = path.join(PUBLIC_DATA_DIR, 'experience.json');
const FEED_PATH = path.join(PUBLIC_DATA_DIR, 'linkedin-feed.json');

const valueFor = (row, names) => {
  for (const name of names) {
    const key = Object.keys(row).find((candidate) => candidate.toLowerCase() === name.toLowerCase());
    if (key && row[key] !== undefined && row[key] !== null && String(row[key]).trim() !== '') {
      return String(row[key]).trim();
    }
  }

  return '';
};

const slugify = (value) =>
  String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const normalizeWhitespace = (value) => String(value || '').replace(/\s+/g, ' ').trim();

const truncate = (value, length = 280) => {
  const text = normalizeWhitespace(value);
  if (text.length <= length) {
    return text;
  }

  const slice = text.slice(0, length);
  const lastSpace = slice.lastIndexOf(' ');
  return `${slice.slice(0, lastSpace > 120 ? lastSpace : length).trim()}...`;
};

const parseCsv = (content) => {
  const rows = [];
  let cell = '';
  let row = [];
  let inQuotes = false;

  for (let index = 0; index < content.length; index += 1) {
    const char = content[index];
    const nextChar = content[index + 1];

    if (char === '"' && inQuotes && nextChar === '"') {
      cell += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === ',' && !inQuotes) {
      row.push(cell);
      cell = '';
      continue;
    }

    if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        index += 1;
      }
      row.push(cell);
      if (row.some((value) => value.trim() !== '')) {
        rows.push(row);
      }
      row = [];
      cell = '';
      continue;
    }

    cell += char;
  }

  row.push(cell);
  if (row.some((value) => value.trim() !== '')) {
    rows.push(row);
  }

  if (rows.length === 0) {
    return [];
  }

  const headers = rows[0].map((header) => header.trim());
  return rows.slice(1).map((values) =>
    headers.reduce((record, header, index) => {
      record[header] = (values[index] || '').trim();
      return record;
    }, {}),
  );
};

const findExportFile = (directory, names) => {
  if (!fs.existsSync(directory)) {
    return null;
  }

  const files = fs.readdirSync(directory);
  const normalizedNames = names.map((name) => name.toLowerCase());
  const match = files.find((file) => normalizedNames.includes(file.toLowerCase()));
  return match ? path.join(directory, match) : null;
};

const monthNumber = (month) => {
  const months = {
    jan: '01',
    january: '01',
    feb: '02',
    february: '02',
    mar: '03',
    march: '03',
    apr: '04',
    april: '04',
    may: '05',
    jun: '06',
    june: '06',
    jul: '07',
    july: '07',
    aug: '08',
    august: '08',
    sep: '09',
    sept: '09',
    september: '09',
    oct: '10',
    october: '10',
    nov: '11',
    november: '11',
    dec: '12',
    december: '12',
  };

  return months[String(month || '').toLowerCase()];
};

const dateToYearMonth = (value) => {
  if (!value) {
    return null;
  }

  if (typeof value === 'object') {
    const year = value.year || value.startYear || value.endYear;
    const month = value.month || value.startMonth || value.endMonth || 1;
    return year ? `${year}-${String(month).padStart(2, '0')}` : null;
  }

  const text = String(value).trim();
  if (!text || /present|current|now/i.test(text)) {
    return null;
  }

  const isoMatch = text.match(/^(\d{4})(?:[-/](\d{1,2}))?/);
  if (isoMatch) {
    return `${isoMatch[1]}-${String(isoMatch[2] || '01').padStart(2, '0')}`;
  }

  const monthYearMatch = text.match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (monthYearMatch) {
    const month = monthNumber(monthYearMatch[1]);
    return month ? `${monthYearMatch[2]}-${month}` : null;
  }

  const parsed = new Date(text);
  if (!Number.isNaN(parsed.getTime())) {
    return `${parsed.getFullYear()}-${String(parsed.getMonth() + 1).padStart(2, '0')}`;
  }

  return null;
};

const dateToIsoDate = (value) => {
  if (!value) {
    return null;
  }

  if (typeof value === 'number') {
    return new Date(value).toISOString();
  }

  const parsed = new Date(String(value));
  return Number.isNaN(parsed.getTime()) ? String(value) : parsed.toISOString();
};

const loadSourceFromApi = async () => {
  if (!API_URL) {
    return null;
  }

  const headers = {
    Accept: 'application/json',
  };

  if (ACCESS_TOKEN) {
    headers.Authorization = `Bearer ${ACCESS_TOKEN}`;
  }

  const response = await fetch(API_URL, { headers });
  if (!response.ok) {
    throw new Error(`LinkedIn source request failed: HTTP ${response.status}`);
  }

  return {
    source: 'api',
    data: await response.json(),
  };
};

const loadSourceFromJson = () => {
  if (SOURCE_JSON) {
    return {
      source: 'json-env',
      data: JSON.parse(SOURCE_JSON),
    };
  }

  const sourcePath = path.join(process.cwd(), SOURCE_JSON_FILE);
  if (fs.existsSync(sourcePath)) {
    return {
      source: 'json-file',
      data: JSON.parse(fs.readFileSync(sourcePath, 'utf8')),
    };
  }

  return null;
};

const loadSourceFromExport = () => {
  const exportPath = path.join(process.cwd(), EXPORT_DIR);
  const positionsPath = findExportFile(exportPath, ['Positions.csv', 'Position.csv', 'Experience.csv']);
  const sharesPath = findExportFile(exportPath, ['Shares.csv', 'Posts.csv', 'Company Follows.csv']);

  if (!positionsPath && !sharesPath) {
    return null;
  }

  return {
    source: 'linkedin-export',
    data: {
      positions: positionsPath ? parseCsv(fs.readFileSync(positionsPath, 'utf8')) : [],
      posts: sharesPath ? parseCsv(fs.readFileSync(sharesPath, 'utf8')) : [],
    },
  };
};

const positionFromRecord = (record, index) => {
  const title = valueFor(record, ['Title', 'Position', 'Job Title', 'headline']);
  const organization = valueFor(record, ['Company Name', 'Company', 'Organization', 'School Name', 'companyName']);
  const startDate = dateToYearMonth(
    valueFor(record, ['Started On', 'Start Date', 'From', 'startDate', 'start_date']) || record.startDate,
  );

  if (!title || !organization || !startDate) {
    return null;
  }

  const endDate = dateToYearMonth(
    valueFor(record, ['Finished On', 'End Date', 'To', 'endDate', 'end_date']) || record.endDate,
  );
  const description = valueFor(record, ['Description', 'Summary', 'description']);
  const location = valueFor(record, ['Location', 'Geo Location Name', 'locationName', 'location']);
  const employmentType = valueFor(record, ['Employment Type', 'Role', 'Contract Type', 'employmentType']);

  return {
    id: slugify(`${organization}-${title}-${startDate}`) || `linkedin-position-${index + 1}`,
    category: 'experience',
    start_date: startDate,
    end_date: endDate,
    title,
    ...(employmentType ? { role: employmentType } : {}),
    organization,
    ...(location ? { location } : {}),
    summary: description || `${title} at ${organization}.`,
    bullets: description
      ? description
          .split(/\n|(?:\s*;\s*)/)
          .map((item) => normalizeWhitespace(item))
          .filter(Boolean)
          .slice(0, 6)
      : [],
    links: [
      {
        label: 'LinkedIn Profile',
        url: PROFILE_URL,
      },
    ],
  };
};

const postFromRecord = (record, index) => {
  const text =
    valueFor(record, ['ShareCommentary', 'Post Text', 'Text', 'Content', 'Commentary', 'commentary', 'description']) ||
    record?.specificContent?.['com.linkedin.ugc.ShareContent']?.shareCommentary?.text ||
    record?.commentary?.text ||
    '';

  if (!text) {
    return null;
  }

  const rawDate =
    valueFor(record, ['Date', 'Created At', 'Created', 'Published At', 'createdAt']) ||
    record?.created?.time ||
    record?.createdAt;
  const url =
    valueFor(record, ['ShareLink', 'Post Link', 'URL', 'Url', 'Permalink', 'permalink']) ||
    record?.permalink ||
    '';
  const id = valueFor(record, ['id', 'URN', 'ShareUrn']) || slugify(`${rawDate}-${text.slice(0, 60)}`);

  return {
    id: id || `linkedin-post-${index + 1}`,
    date: dateToIsoDate(rawDate),
    text: truncate(text, 500),
    ...(url ? { url } : { url: PROFILE_URL }),
  };
};

const recordsFrom = (data, names) => {
  for (const name of names) {
    if (Array.isArray(data?.[name])) {
      return data[name];
    }
  }

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.elements)) {
    return data.elements;
  }

  return [];
};

const buildExperience = (data) => {
  const positionRecords = recordsFrom(data, ['positions', 'experience', 'experiences']);
  const items = positionRecords
    .map(positionFromRecord)
    .filter(Boolean)
    .sort((a, b) => b.start_date.localeCompare(a.start_date));

  return {
    updated_at: new Date().toISOString(),
    source: 'linkedin',
    items,
  };
};

const buildFeed = (data, source) => {
  const postRecords = recordsFrom(data, ['posts', 'feed', 'shares', 'ugcPosts']);
  const items = postRecords
    .map(postFromRecord)
    .filter(Boolean)
    .sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, MAX_FEED_ITEMS);

  return {
    updated_at: new Date().toISOString(),
    source,
    items,
  };
};

const writeJson = (filePath, data) => {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`);
};

const main = async () => {
  const source = (await loadSourceFromApi()) || loadSourceFromJson() || loadSourceFromExport();

  if (!source) {
    console.log('No LinkedIn source configured. Set LINKEDIN_PROFILE_API_URL, LINKEDIN_SOURCE_JSON, or LINKEDIN_EXPORT_DIR.');
    return;
  }

  const experience = buildExperience(source.data);
  const feed = buildFeed(source.data, source.source);

  if (experience.items.length > 0) {
    writeJson(EXPERIENCE_PATH, experience);
    console.log(`Updated ${EXPERIENCE_PATH} with ${experience.items.length} LinkedIn positions.`);
  } else {
    console.log('No LinkedIn positions found. Existing experience data was left unchanged.');
  }

  writeJson(FEED_PATH, feed);
  console.log(`Updated ${FEED_PATH} with ${feed.items.length} LinkedIn posts.`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
