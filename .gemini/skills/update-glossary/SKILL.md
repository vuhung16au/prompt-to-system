---
name: update-glossary
description: Update the book's glossary by scanning new or updated content for technical terms.
---

# Update Glossary Skill

## When to use this skill
Use this skill when the user asks to "update the glossary", or mentions that they've added new content and need to extract technical terms for the glossary.

## Workflow

1. **Identify Content to Scan:** 
   - Ask the user which specific files or directories they recently updated (e.g., in `src/content/lessons`, `src/content/examples`, or `src/content/domains`). 
   - Alternatively, use `git status` or `git diff` to identify modified markdown files if the user wants an automatic scan.

2. **Extract Terminology:** 
   - Read the identified markdown files. 
   - Look for important technical terms, concepts, acronyms, or jargon (especially related to AI, LLMs, prompt engineering, and software development) that are introduced or emphasized.

3. **Check Existing Terms:** 
   - Check the `src/content/glossary/` directory to avoid duplicating existing terms.
   - If a term exists but the new content adds significant nuance, you may update the existing glossary file's summary or body.

4. **Create Glossary Entries:** 
   - For each new term found, create a new markdown file in `src/content/glossary/<kebab-case-term>.md`.
   - Ensure the file contains the following frontmatter structure:
   
   ```markdown
   ---
   id: <kebab-case-term>
   title: <Readable Term Name>
   summary: <A clear, 1-2 sentence definition of the term>
   ---
   
   <Optional: Additional context, examples, or detailed explanation goes here, below the frontmatter.>
   ```

5. **Summarize Changes:** 
   - Present a brief summary to the user of the new terms added or updated in the glossary.
