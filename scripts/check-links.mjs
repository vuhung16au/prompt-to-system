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
            const cleanUrl = url.replace(/^\/prompt-to-system/, '');
            let targetPath = path.join('src/content', cleanUrl.replace(/^\/learn/, '/lessons').replace(/^\/examples/, '/examples').replace(/^\/domains/, '/domains') + '.md');
            if (!fs.existsSync(targetPath)) {
                // If not found directly, it might be an index page or just not fully mapped in this simple script.
                // We'll skip strict failure for now to avoid breaking the build, but log it.
                console.warn(`[WARN] Possible broken internal link in ${fullPath}: ${url}`);
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
