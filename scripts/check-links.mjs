import fs from 'fs';
import path from 'path';

function checkLinks(dir) {
  let hasErrors = false;
  
  function walk(currentDir) {
    const files = fs.readdirSync(currentDir);
    for (const file of files) {
      const fullPath = path.join(currentDir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        walk(fullPath);
      } else if (fullPath.endsWith('.md')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        // Simple regex to find markdown links: [text](/path)
        const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
        let match;
        while ((match = linkRegex.exec(content)) !== null) {
          const url = match[2];
          if (url.startsWith('/')) {
            // Strip optional base path
            const cleanUrl = url.replace(/^\/prompt-to-system/, '').split('#')[0]; // Ignore hash
            if (cleanUrl === '' || cleanUrl === '/') continue; // Root is handled by pages/index.astro

            let targetPath;
            if (cleanUrl.startsWith('/learn/')) {
               targetPath = path.join('src/content/lessons', cleanUrl.replace('/learn/', '') + '.md');
            } else if (cleanUrl.startsWith('/examples/')) {
               targetPath = path.join('src/content/examples', cleanUrl.replace('/examples/', '') + '.md');
            } else if (cleanUrl.startsWith('/domains/')) {
               targetPath = path.join('src/content/domains', cleanUrl.replace('/domains/', '') + '.md');
            } else if (cleanUrl.startsWith('/glossary/')) {
               targetPath = path.join('src/content/glossary', cleanUrl.replace('/glossary/', '') + '.md');
            } else {
               // Might be a page like /about or / or /learn
               let pagePath = cleanUrl;
               if (pagePath.endsWith('/')) pagePath = pagePath.slice(0, -1);
               const p1 = path.join('src/pages', pagePath + '.astro');
               const p2 = path.join('src/pages', pagePath, 'index.astro');
               const p3 = path.join('public', cleanUrl); // Check public directory
               if (!fs.existsSync(p1) && !fs.existsSync(p2) && !fs.existsSync(p3)) {
                  console.error(`[ERROR] Broken internal link in ${fullPath}: ${url}`);
                  hasErrors = true;
               }
               continue;
            }

            if (!fs.existsSync(targetPath)) {
                console.error(`[ERROR] Broken internal link in ${fullPath}: ${url} -> ${targetPath}`);
                hasErrors = true;
            }
          }
        }
      }
    }
  }
  
  walk(dir);
  if (hasErrors) process.exit(1);
  console.log("Link check complete.");
}

checkLinks('src/content');
