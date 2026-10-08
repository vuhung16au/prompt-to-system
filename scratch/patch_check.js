import fs from 'fs';
const p = 'scripts/check-public-site.mjs';
let content = fs.readFileSync(p, 'utf8');

content = content.replace(
  `if (!json.commit) throw new Error("No commit found");
  console.log("[OK] release.json verified. Commit:", json.commit);`,
  `if (!json.commit) throw new Error("No commit found");
  const localCommit = require('child_process').execSync('git rev-parse HEAD').toString().trim();
  if (json.commit !== localCommit) {
    throw new Error(\`Commit mismatch. Deployed: \${json.commit}, Local: \${localCommit}\`);
  }
  console.log("[OK] release.json verified. Commit matches:", json.commit);`
);

// We need to add require to the script or use import if it's mjs
content = content.replace(
  `const releaseData = releaseRes.stdout.toString().trim();`,
  `import { execSync } from 'child_process';\nconst releaseData = releaseRes.stdout.toString().trim();`
);

// But wait, spawnSync and execSync are already imported?
// `import { spawnSync } from 'child_process';` is at the top. So we can just add execSync to the import.
content = content.replace(
  `import { spawnSync } from 'child_process';`,
  `import { spawnSync, execSync } from 'child_process';`
);

content = content.replace(
  `const localCommit = require('child_process').execSync('git rev-parse HEAD').toString().trim();`,
  `const localCommit = execSync('git rev-parse HEAD').toString().trim();`
);

fs.writeFileSync(p, content);
