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
  
  function walk(currentDir) {
    const files = fs.readdirSync(currentDir);
    for (const file of files) {
      const fullPath = path.join(currentDir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        walk(fullPath);
      } else if (fullPath.endsWith('.md')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        
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
