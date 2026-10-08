import fs from 'fs';
import path from 'path';

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let originalContent = content;

  content = content.replace(/currentColour/g, 'currentColor');
  content = content.replace(/transition-colours/g, 'transition-colors');
  content = content.replace(/hover:text-accent-primary transition-colours/g, 'hover:text-accent-primary transition-colors');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Fixed CSS/SVG in ${filePath}`);
  }
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.md') || file.endsWith('.mdx') || file.endsWith('.astro')) {
      processFile(fullPath);
    }
  }
}

processDirectory('./src/content');
processDirectory('./src/pages');
processDirectory('./src/components');
processDirectory('./src/layouts');
