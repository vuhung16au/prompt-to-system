import fs from 'fs';
const p = '.github/workflows/deploy.yml';
let content = fs.readFileSync(p, 'utf8');

const buildStepsOld = `      - name: Build with Astro
        run: npm run build
        env:
          ASTRO_TELEMETRY_DISABLED: 1
      - name: Upload artifact`;

const buildStepsNew = `      - name: Build with Astro
        run: npm run build
        env:
          ASTRO_TELEMETRY_DISABLED: 1
      - name: Run Tests (Content, Links, Markdown Lint, a11y, Lighthouse)
        run: npm test
      - name: Upload artifact`;

content = content.replace(buildStepsOld, buildStepsNew);
fs.writeFileSync(p, content);
