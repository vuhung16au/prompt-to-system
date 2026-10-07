import fs from 'fs';
import path from 'path';
import { globSync } from 'glob';
import { parse } from 'node-html-parser';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');
const BASE_PATH = '/prompt-to-system';

if (!fs.existsSync(distDir)) {
  console.error(`dist directory not found: ${distDir}`);
  process.exit(1);
}

const htmlFiles = globSync('**/*.html', { cwd: distDir, absolute: true });
let errors = 0;

console.log(`Checking ${htmlFiles.length} HTML files for broken links...`);

const existingFiles = new Set(
  globSync('**/*', { cwd: distDir, nodir: true }).map(f => `/${f}`)
);
// add directories acting as index.html
const existingDirs = new Set(
  globSync('**/*/', { cwd: distDir }).map(d => `/${d}`)
);

const idMap = new Map(); // file_path -> Set of IDs

// First pass: collect IDs
for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const root = parse(content);
  const ids = new Set();
  root.querySelectorAll('[id]').forEach(el => ids.add(el.id));
  
  let relativePath = file.substring(distDir.length);
  if (relativePath.endsWith('/index.html') && relativePath !== '/index.html') {
    relativePath = relativePath.slice(0, -10); // keep trailing slash?
  }
  
  idMap.set(file.substring(distDir.length), ids);
  // Also set for URL without index.html
  idMap.set(file.substring(distDir.length).replace(/\/index\.html$/, '/'), ids);
  idMap.set(file.substring(distDir.length).replace(/\/index\.html$/, ''), ids);
}

// Second pass: check links
for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const root = parse(content);
  
  // check hrefs
  const links = root.querySelectorAll('a[href], link[href], img[src]');
  
  for (const el of links) {
    const url = el.getAttribute('href') || el.getAttribute('src');
    if (!url || url.startsWith('http') || url.startsWith('mailto:') || url.startsWith('tel:') || url.startsWith('data:')) {
      continue;
    }
    
    // Ignore host-root links that don't have base path
    if (url.startsWith('/') && !url.startsWith(BASE_PATH + '/') && url !== BASE_PATH) {
      console.error(`[ERROR] Host-root link found in ${file.substring(distDir.length)}: ${url} (Missing base path ${BASE_PATH})`);
      errors++;
      continue;
    }
    
    let targetUrl = url;
    if (targetUrl.startsWith(BASE_PATH)) {
      targetUrl = targetUrl.substring(BASE_PATH.length);
      if (targetUrl === '') targetUrl = '/';
    } else if (targetUrl.startsWith('#')) {
      // Internal fragment
      const ids = idMap.get(file.substring(distDir.length).replace(/\/index\.html$/, '/')) || idMap.get(file.substring(distDir.length));
      const fragment = targetUrl.substring(1);
      if (!ids || !ids.has(fragment)) {
        console.error(`[ERROR] Broken fragment in ${file.substring(distDir.length)}: ${url}`);
        errors++;
      }
      continue;
    } else {
      // Resolve relative to current directory
      const currentDir = path.dirname(file.substring(distDir.length));
      targetUrl = path.resolve(currentDir, targetUrl.split('#')[0]);
    }
    
    const [pathPart, hashPart] = targetUrl.split('?')[0].split('#');
    let searchPath = pathPart;
    if (searchPath.endsWith('/')) searchPath += 'index.html';
    else if (!path.extname(searchPath)) searchPath += '/index.html'; // Astro default
    
    if (!existingFiles.has(searchPath) && !existingFiles.has(pathPart)) {
      console.error(`[ERROR] Broken link in ${file.substring(distDir.length)}: ${url} (Resolved to ${searchPath})`);
      errors++;
    } else if (hashPart) {
      // Check fragment
      let mappedFile = searchPath;
      if (!idMap.has(mappedFile) && idMap.has(pathPart)) mappedFile = pathPart;
      const ids = idMap.get(mappedFile) || idMap.get(pathPart.replace(/\/index\.html$/, '/'));
      
      if (!ids || !ids.has(hashPart)) {
        console.error(`[ERROR] Broken fragment link in ${file.substring(distDir.length)}: ${url}`);
        errors++;
      }
    }
  }
}

if (errors > 0) {
  console.error(`Found ${errors} broken link(s).`);
  process.exit(1);
}

console.log('All internal links and fragments are valid!');
