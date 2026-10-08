import { spawnSync, execSync } from 'child_process';
const BASE_URL = 'https://vuhung16au.github.io/prompt-to-system/';

console.log("Checking public site at:", BASE_URL);

const urls = [
  '',
  'learn',
  'examples',
  'domains',
  'glossary',
  'about',
  'faq',
  'traces/example-trace-failure.json',
  'traces/dataset.json',
  'traces/results.csv'
];

let hasErrors = false;
for (const path of urls) {
  const res = spawnSync('curl', ['-s', '-o', '/dev/null', '-w', '%{http_code}', BASE_URL + path]);
  const code = res.stdout.toString().trim();
  if (code !== '200' && code !== '301' && code !== '302') {
     console.error(`[ERROR] URL ${BASE_URL + path} returned ${code}`);
     hasErrors = true;
  } else {
     console.log(`[OK] ${BASE_URL + path}`);
  }
}

const releaseRes = spawnSync('curl', ['-s', BASE_URL + 'release.json']);
const releaseData = releaseRes.stdout.toString().trim();
try {
  const json = JSON.parse(releaseData);
  if (!json.commit) throw new Error("No commit found");
  const localCommit = execSync('git rev-parse HEAD').toString().trim();
  if (json.commit !== localCommit) {
    throw new Error(`Commit mismatch. Deployed: ${json.commit}, Local: ${localCommit}`);
  }
  console.log("[OK] release.json verified. Commit matches:", json.commit);
} catch (e) {
  console.error("[ERROR] Failed to parse release.json", releaseData);
  hasErrors = true;
}

if (hasErrors) {
  process.exit(1);
}
console.log("Public site checks passed.");
