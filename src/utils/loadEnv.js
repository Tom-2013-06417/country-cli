import fs from 'fs';
import path from 'path';

// AI-generated
function loadEnvFile() {
  const filePath = path.join(process.cwd(), '.env');
  if (!fs.existsSync(filePath)) return;

  for (const line of fs.readFileSync(filePath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const [key, ...rest] = trimmed.split('=');
    if (!process.env[key]) {
      process.env[key] = rest.join('=').trim();
    }
  }
}

// Runs once per process (ESM module cache). After this, use process.env anywhere.
loadEnvFile();
