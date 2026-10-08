import fs from 'fs';
const file = 'src/styles/global.css';
let css = fs.readFileSync(file, 'utf-8');

// Find the dark theme block
const darkBlockMatch = css.match(/@media\s*\(prefers-color-scheme:\s*dark\)\s*\{\s*:root\s*\{([\s\S]*?)\}\s*\}/);

if (darkBlockMatch) {
  const vars = darkBlockMatch[1];
  const newDarkRule = `
  @media (prefers-color-scheme: dark) {
    :root:not(.light) {
${vars}
    }
  }
  
  :root.dark {
${vars}
  }
`;
  css = css.replace(/@media\s*\(prefers-color-scheme:\s*dark\)\s*\{\s*:root\s*\{[\s\S]*?\}\s*\}/, newDarkRule);
  fs.writeFileSync(file, css, 'utf-8');
  console.log("Updated global.css to support .dark class");
}
