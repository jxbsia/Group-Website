#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const USER_ID = process.env.SCHOLAR_USER_ID ?? 'HC8AFQcAAAAJ';
const BASE_URL = process.env.SCHOLAR_BASE_URL ?? 'https://scholar.google.com';
const PROFILE_URL =
  process.env.SCHOLAR_PROFILE_URL ?? `${BASE_URL}/citations?hl=en&user=${USER_ID}`;
const LIST_URL = `${BASE_URL}/citations?hl=en&user=${USER_ID}&view_op=list_works&sortby=pubdate`;
const PAGE_SIZE = Number(process.env.SCHOLAR_PAGE_SIZE ?? 100);
const REQUEST_DELAY_MS = Number(process.env.SCHOLAR_DELAY_MS ?? 800);
const USER_AGENT =
  process.env.SCHOLAR_USER_AGENT ??
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

const OUTPUT_PATH = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'src',
  'data',
  'publications.json'
);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function decodeHtml(input) {
  return input
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#x([0-9a-fA-F]+);/g, (_, code) =>
      String.fromCodePoint(parseInt(code, 16))
    )
    .replace(/&#(\d+);/g, (_, code) =>
      String.fromCodePoint(parseInt(code, 10))
    );
}

function stripTags(input) {
  return input.replace(/<[^>]*>/g, '');
}

function parseRow(rowHtml) {
  const anchorMatch = rowHtml.match(/<a [^>]*class="gsc_a_at"[^>]*>([\s\S]*?)<\/a>/);
  if (!anchorMatch) return null;
  const title = decodeHtml(stripTags(anchorMatch[1])).trim();
  const hrefMatch = anchorMatch[0].match(/href="([^"]+)"/);
  const href = hrefMatch ? decodeHtml(hrefMatch[1]) : '';
  const url = href ? new URL(href, BASE_URL).toString() : undefined;

  const idMatch = href.match(/citation_for_view=([^&]+)/);
  const id = idMatch ? idMatch[1] : title;

  const grayMatches = [...rowHtml.matchAll(/<div class="gs_gray">([\s\S]*?)<\/div>/g)].map(
    (match) => match[1]
  );
  const authorsText = grayMatches[0] ? decodeHtml(stripTags(grayMatches[0])) : '';
  const journalRaw = grayMatches[1] ? decodeHtml(stripTags(grayMatches[1])) : '';

  const authors = authorsText
    .split(',')
    .map((author) => author.trim())
    .filter((author) => author && author !== '...');

  const journal = journalRaw.replace(/\s*,?\s*\b\d{4}\b\s*$/, '').trim();

  const citationMatch = rowHtml.match(/class="gsc_a_ac[^\"]*"[^>]*>(.*?)<\/a>/);
  const citations = citationMatch
    ? Number(citationMatch[1].replace(/\D/g, '')) || 0
    : 0;

  const yearMatch = rowHtml.match(/class="gsc_a_y"[^>]*>[\s\S]*?(\d{4})/);
  const year = yearMatch ? Number(yearMatch[1]) : 0;

  return {
    id,
    title,
    authors,
    journal,
    year,
    type: 'article',
    citations,
    ...(url ? { url } : {}),
  };
}

function extractRows(html) {
  return [...html.matchAll(/<tr class="gsc_a_tr">([\s\S]*?)<\/tr>/g)].map(
    (match) => match[1]
  );
}

function calculateHIndex(citations) {
  const sorted = [...citations].sort((a, b) => b - a);
  let hIndex = 0;

  for (let i = 0; i < sorted.length; i += 1) {
    if (sorted[i] >= i + 1) {
      hIndex = i + 1;
    } else {
      break;
    }
  }

  return hIndex;
}

function toAsciiJson(data) {
  const json = JSON.stringify(data, null, 2);
  return json.replace(/[^\x00-\x7F]/g, (char) => {
    const code = char.codePointAt(0);
    if (!code) return '';
    if (code <= 0xffff) {
      return `\\u${code.toString(16).padStart(4, '0')}`;
    }
    const surrogate = code - 0x10000;
    const high = 0xd800 + (surrogate >> 10);
    const low = 0xdc00 + (surrogate & 0x3ff);
    return `\\u${high.toString(16).padStart(4, '0')}\\u${
      low.toString(16).padStart(4, '0')
    }`;
  });
}

async function fetchPage(cstart) {
  const url = new URL(LIST_URL);
  url.searchParams.set('cstart', String(cstart));
  url.searchParams.set('pagesize', String(PAGE_SIZE));

  const response = await fetch(url, {
    headers: {
      'User-Agent': USER_AGENT,
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status} for ${url}`);
  }

  const html = await response.text();

  if (html.includes('The system can\'t perform the operation now')) {
    throw new Error('Google Scholar rate limit or temporary block detected.');
  }

  return html;
}

async function fetchAllPublications() {
  const publications = [];
  const seenIds = new Set();
  let start = 0;

  for (let page = 0; page < 50; page += 1) {
    const html = await fetchPage(start);
    const rows = extractRows(html);
    if (rows.length === 0) {
      break;
    }

    let added = 0;
    for (const row of rows) {
      const parsed = parseRow(row);
      if (!parsed) continue;
      if (seenIds.has(parsed.id)) continue;
      seenIds.add(parsed.id);
      publications.push(parsed);
      added += 1;
    }

    if (added === 0 || rows.length < PAGE_SIZE) {
      break;
    }

    start += PAGE_SIZE;
    await sleep(REQUEST_DELAY_MS);
  }

  return publications;
}

async function run() {
  const publications = await fetchAllPublications();

  const citationCounts = publications.map((pub) => pub.citations);
  const totalCitations = citationCounts.reduce((sum, count) => sum + count, 0);
  const hIndex = calculateHIndex(citationCounts);
  const avgCitations =
    publications.length === 0
      ? 0
      : Math.round(totalCitations / publications.length);

  const data = {
    stats: {
      totalPublications: publications.length,
      totalCitations,
      hIndex,
      avgCitations,
    },
    googleScholarLink: PROFILE_URL,
    publications,
  };

  await fs.writeFile(OUTPUT_PATH, `${toAsciiJson(data)}\n`, 'utf8');
  console.log(`Wrote ${publications.length} publications to ${OUTPUT_PATH}`);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
