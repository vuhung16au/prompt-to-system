import fs from 'fs';
import path from 'path';

const REQUIRED_EXAMPLE_SECTIONS = [
  '## Purpose',
  '## When to Use',
  '## When NOT to Use',
  '## Inputs',
  '## Prompt / Procedure',
  '## Expected Output',
  '## Evaluation Rubric',
  '## Failure Modes & Risks',
  '## Provenance'
];

function validateContent(dir) {
  let hasErrors = false;
  const ids = new Set();
  
  function walk(currentDir) {
    const files = fs.readdirSync(currentDir);
    for (const file of files) {
      const fullPath = path.join(currentDir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        walk(fullPath);
      } else if (fullPath.endsWith('.md')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        
        // Check for duplicate IDs in frontmatter
        const idMatch = content.match(/^id:\s*(.+)$/m);
        if (idMatch) {
          const id = idMatch[1].trim();
          if (ids.has(id)) {
             console.error(`[ERROR] Duplicate ID found: ${id} in ${fullPath}`);
             hasErrors = true;
          }
          ids.add(id);
        }

        // Editorial checks for examples
        if (fullPath.includes('/examples/')) {
          for (const section of REQUIRED_EXAMPLE_SECTIONS) {
            if (!content.includes(section)) {
              console.error(`[ERROR] File ${fullPath} is missing required section: ${section}`);
              hasErrors = true;
            }
          }
        }
      }
    }
  }
  
  walk(dir);
  
  if (hasErrors) {
    console.error("Content validation failed.");
    process.exit(1);
  }
  console.log("Content validation passed.");
}

validateContent('src/content');
