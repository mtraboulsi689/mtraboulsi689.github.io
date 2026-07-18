#!/usr/bin/env node

// Staleness tripwire: fails CI when the site's data files start telling an
// out-of-date story. Catches the class of problem where an end_date passes
// with no successor entry, or an automated feed silently stops updating.

import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'public', 'data');
const MAX_PUBLICATION_AGE_DAYS = 30; // OpenAlex cron runs weekly
const MAX_ENDED_GAP_MONTHS = 3;

const problems = [];

const readJson = (name) => {
  const filePath = path.join(DATA_DIR, name);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

const daysSince = (iso) => (Date.now() - new Date(iso).getTime()) / 86_400_000;

// 1. The publications feed should never be more than a month old.
const publications = readJson('publications.json');
const pubAge = daysSince(publications.updated_at);
if (Number.isNaN(pubAge)) {
  problems.push('publications.json: updated_at is not a valid date');
} else if (pubAge > MAX_PUBLICATION_AGE_DAYS) {
  problems.push(
    `publications.json: last updated ${Math.round(pubAge)} days ago — the weekly OpenAlex workflow may be broken`,
  );
}

// 2. Career data must answer "what am I doing now": either a current position
//    (end_date null) exists, or the newest end_date is recent.
const experience = readJson('experience.json');
const items = experience.items ?? [];
if (items.length === 0) {
  problems.push('experience.json: no entries at all');
} else {
  const hasCurrent = items.some((item) => item.end_date === null);
  if (!hasCurrent) {
    const newestEnd = items
      .map((item) => item.end_date)
      .filter(Boolean)
      .sort()
      .at(-1);
    const monthsAgo = daysSince(`${newestEnd}-01`) / 30.4;
    if (monthsAgo > MAX_ENDED_GAP_MONTHS) {
      problems.push(
        `experience.json: newest position ended ${newestEnd} (${Math.round(monthsAgo)} months ago) and nothing marks what you do now — add a current entry or update the old one`,
      );
    }
  }
}

if (problems.length > 0) {
  console.error('Staleness check failed:');
  for (const problem of problems) {
    console.error(`  - ${problem}`);
  }
  process.exit(1);
}

console.log('Staleness check passed: data files tell a current story.');
