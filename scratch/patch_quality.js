import fs from 'fs';

const p = 'scripts/test-quality.mjs';
let content = fs.readFileSync(p, 'utf8');

// Replace URLs to not include prompt-to-system/
content = content.replace(/'http:\/\/localhost:3000\/prompt-to-system\/'/g, "'http://localhost:3000/'");
content = content.replace(/'http:\/\/localhost:3000\/prompt-to-system\//g, "'http://localhost:3000/");

// Replace detail pages
content = content.replace(
  /'http:\/\/localhost:3000\/faq'/g,
  "'http://localhost:3000/faq',\n      'http://localhost:3000/examples/example-1',\n      'http://localhost:3000/domains/software-engineering',\n      'http://localhost:3000/learn/context-basics',\n      'http://localhost:3000/glossary/rag'"
);

// Fix pa11y exit code handling
content = content.replace(
  /if \(code === 0 \|\| code === 2\) \{[\s\S]*?\} else resolve\(\);/g,
  `if (code === 0) {
             resolve();
          } else reject(new Error("pa11y failed with code " + code));`
);

// Fix lighthouse exit code handling
content = content.replace(
  /lh\.on\('close', code => \{[\s\S]*?resolve\(\);[\s\S]*?\}\);/g,
  `lh.on('close', code => {
        if (code === 0) resolve();
        else reject(new Error("Lighthouse failed with code " + code));
      });`
);

// We need to add sandbox arguments to puppeteer/chrome so it runs inside sandbox
// For pa11y: pass runner string if needed, or set PUPPETEER_EXECUTABLE_PATH, but pa11y uses puppeteer.
// For lighthouse: '--chrome-flags="--headless --no-sandbox"'
content = content.replace(
  /--chrome-flags="--headless"/g,
  '--chrome-flags="--headless --no-sandbox"'
);

// For pa11y, we need to pass `--runner`? Wait, pa11y has a config file or CLI args.
// CLI: pa11y --runner htmlcs http://... no, --config?
// Actually pa11y CLI accepts --chrome-launch-config '{"args": ["--no-sandbox"]}'
content = content.replace(
  /const pa11y = spawn\('npx', \['pa11y', url\]\);/g,
  `const pa11y = spawn('npx', ['pa11y', url, '--chrome-launch-config', '{"args": ["--no-sandbox", "--disable-setuid-sandbox"]}']);`
);

fs.writeFileSync(p, content);
