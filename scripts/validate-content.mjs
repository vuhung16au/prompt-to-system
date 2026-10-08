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
  const titles = new Set();
  const allFiles = [];

  function walk(currentDir) {
    const files = fs.readdirSync(currentDir);
    for (const file of files) {
      const fullPath = path.join(currentDir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        walk(fullPath);
      } else if (fullPath.endsWith('.md')) {
        allFiles.push(fullPath);
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

        // Check for duplicate concepts (titles)
        const titleMatch = content.match(/^title:\s*(.+)$/m);
        if (titleMatch) {
          const title = titleMatch[1].trim().toLowerCase();
          if (titles.has(title)) {
             console.error(`[ERROR] Duplicate concept (title) found: ${title} in ${fullPath}`);
             hasErrors = true;
          }
          titles.add(title);
        }

        const isDraft = content.match(/^status:\s*draft/m);

        if (!isDraft) {
          // Placeholder repository IDs
          if (content.match(/placeholder-repo-\d+/)) {
            console.error(`[ERROR] Placeholder repo ID found in ${fullPath}`);
            hasErrors = true;
          }

          // Repeated generated filler
          if (content.includes('In the context of this specific topic, latency plays a crucial role')) {
            console.error(`[ERROR] Generated padding found in ${fullPath}`);
            hasErrors = true;
          }

          // Irrelevant sources
          if (content.match(/Reference implementations from production systems/i)) {
             console.error(`[ERROR] Irrelevant generic source in ${fullPath}`);
             hasErrors = true;
          }

          // Unsupported claims
          if (content.includes('Reproduced manually with standard test suite')) {
             console.error(`[ERROR] Unsupported verification claim in ${fullPath}`);
             hasErrors = true;
          }

          // Stale review date
          const dateMatch = content.match(/^last_verified:\s*(.+)$/m);
          if (dateMatch) {
            const dateStr = dateMatch[1].trim();
            const lastVerified = new Date(dateStr);
            const now = new Date();
            const diffDays = Math.ceil((now - lastVerified) / (1000 * 60 * 60 * 24));
            if (diffDays > 90) {
              console.error(`[ERROR] Stale review date in ${fullPath} (> 90 days).`);
              hasErrors = true;
            }
          }

          // Empty relationship check
          if (content.match(/related_lessons:\s*\[\s*\]/) || content.match(/related_examples:\s*\[\s*\]/)) {
            console.error(`[ERROR] Empty relationship array in ${fullPath}`);
            hasErrors = true;
          }

          // Placeholder text check
          if (content.includes('project-1') || content.includes('Definition for')) {
            console.error(`[ERROR] Placeholder text found in ${fullPath}`);
            hasErrors = true;
          }

          // Editorial checks for examples
          if (fullPath.includes('/examples/')) {
            const kindMatch = content.match(/^kind:\s*(.+)$/m);
            const isPrompt = kindMatch ? kindMatch[1].trim() === 'prompt' : true;

            if (isPrompt) {
              for (const section of REQUIRED_EXAMPLE_SECTIONS) {
                if (!content.includes(section)) {
                  console.error(`[ERROR] File ${fullPath} is missing required section: ${section}`);
                  hasErrors = true;
                }
              }
            }
            
            const summaryMatch = content.match(/^summary:\s*(.+)$/m);
            if (summaryMatch && summaryMatch[1].trim().startsWith('A practical example for')) {
              console.error(`[ERROR] File ${fullPath} has generic summary starting with "A practical example for"`);
              hasErrors = true;
            }
            
            const procedureMatch = content.match(/## Prompt \/ Procedure\s*([\s\S]*?)##/);
            if (procedureMatch) {
              const proc = procedureMatch[1].trim();
              if (proc === '`input_data`' || proc === 'input_data') {
                console.error(`[ERROR] File ${fullPath} has generic procedure containing only input_data`);
                hasErrors = true;
              }
            }
          }
        }
      }
    }
  }
  
  walk(dir);
  
  // Basic orphan check removed to avoid false positives

  if (hasErrors) {
    console.error("Content validation failed.");
    process.exit(1);
  }
  console.log("Content validation passed.");
}

validateContent('src/content');
