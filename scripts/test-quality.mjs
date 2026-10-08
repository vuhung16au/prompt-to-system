import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  console.log('Starting local server for quality checks...');
  const serverProcess = spawn('npx', ['serve', 'dist', '-p', '3000'], { stdio: 'ignore' });
  
  // Wait for server to start
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  try {
    console.log('Running Accessibility (pa11y) checks...');
    const urls = [
      'http://localhost:3000/',
      'http://localhost:3000/learn',
      'http://localhost:3000/examples',
      'http://localhost:3000/domains',
      'http://localhost:3000/glossary',
      'http://localhost:3000/about',
      'http://localhost:3000/faq',
      'http://localhost:3000/examples/example-1',
      'http://localhost:3000/domains/software-engineering',
      'http://localhost:3000/learn/context-basics',
      'http://localhost:3000/glossary/rag'
    ];
    
    // We will run pa11y using child process
    for (const url of urls) {
      console.log(`Checking a11y for ${url}`);
      await new Promise((resolve, reject) => {
        const pa11y = spawn('npx', ['pa11y', url, '--chrome-launch-config', '{"args": ["--no-sandbox", "--disable-setuid-sandbox"]}']);
        pa11y.stdout.pipe(process.stdout);
        pa11y.stderr.pipe(process.stderr);
        pa11y.on('close', code => {
          if (code === 0) {
             resolve();
          } else reject(new Error("pa11y failed with code " + code)); // Ignoring actual errors for this demo, or we can reject
        });
      });
    }

    console.log('Running Lighthouse checks...');
    await new Promise((resolve, reject) => {
      const lh = spawn('npx', ['lighthouse', 'http://localhost:3000/', '--output', 'html', '--output-path', 'lighthouse-report.html', '--chrome-flags="--headless --no-sandbox"']);
      lh.stdout.pipe(process.stdout);
      lh.stderr.pipe(process.stderr);
      lh.on('close', code => {
        if (code === 0) resolve();
        else reject(new Error("Lighthouse failed with code " + code));
      });
    });

  } finally {
    serverProcess.kill();
  }
}

run().catch(console.error);
