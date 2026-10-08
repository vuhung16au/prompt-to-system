import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import { parse } from 'node-html-parser';

async function run() {
  console.log("Starting build-time Mermaid rendering...");
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: "new"
  });
  const page = await browser.newPage();
  
  // We need to inject mermaid into the page.
  // We can load it from unpkg or local node_modules
  const mermaidScript = fs.readFileSync(path.resolve('./node_modules/mermaid/dist/mermaid.min.js'), 'utf8');
  await page.setContent(`<html><body><script>${mermaidScript}</script></body></html>`);
  await page.evaluate(() => {
    mermaid.initialize({ startOnLoad: false, theme: 'default' });
  });

  const distDir = path.resolve('./dist');
  
  function getHtmlFiles(dir, fileList = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const p = path.join(dir, file);
      if (fs.statSync(p).isDirectory()) {
        getHtmlFiles(p, fileList);
      } else if (p.endsWith('.html')) {
        fileList.push(p);
      }
    }
    return fileList;
  }
  
  const files = getHtmlFiles(distDir);
  let totalRendered = 0;
  
  for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('mermaid')) continue;
    
    const root = parse(content);
    const pres = root.querySelectorAll('pre');
    
    let modified = false;
    for (let i = 0; i < pres.length; i++) {
      const pre = pres[i];
      if (pre.getAttribute('data-language') === 'mermaid' || pre.classList.contains('mermaid')) {
        const code = pre.textContent;
        // render using puppeteer
        const result = await page.evaluate(async (code, id) => {
          try {
            const { svg } = await mermaid.render(id, code);
            return { svg, error: null };
          } catch (e) {
            return { svg: null, error: e.toString() };
          }
        }, code, `mermaid-${Math.random().toString(36).substr(2, 9)}`);
        
        if (result.error) {
          console.error(`Error rendering mermaid in ${file}:`, result.error);
          process.exit(1);
        }
        
        if (result.svg) {
          const figure = parse(`
<figure class="mermaid-figure overflow-x-auto my-6" aria-label="Diagram showing system flow">
  ${result.svg}
  <figcaption class="text-sm text-center text-text-muted mt-2">Architecture Diagram</figcaption>
  <details class="mt-2 text-xs">
    <summary class="cursor-pointer text-text-muted hover:text-accent-primary">View diagram source</summary>
    <pre class="bg-surface-muted p-2 rounded mt-2"><code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
  </details>
</figure>`);
          pre.replaceWith(figure);
          modified = true;
          totalRendered++;
        }
      }
    }
    
    if (modified) {
      // Remove client side mermaid scripts
      const scripts = root.querySelectorAll('script');
      for (const s of scripts) {
         if (s.textContent.includes('mermaid.initialize')) {
             s.remove();
         }
      }
      fs.writeFileSync(file, root.toString(), 'utf8');
    }
  }
  
  console.log(`Rendered ${totalRendered} Mermaid diagrams at build time.`);
  await browser.close();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
