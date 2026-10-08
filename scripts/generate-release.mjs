import fs from 'fs';
import { execSync } from 'child_process';

const sha = execSync('git rev-parse HEAD').toString().trim();
const release = { commit: sha, date: new Date().toISOString() };
fs.writeFileSync('dist/release.json', JSON.stringify(release, null, 2));
console.log('Created release.json with commit', sha);
