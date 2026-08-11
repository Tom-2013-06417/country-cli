#!/usr/bin/env node

import './src/utils/loadEnv.js';
import { run } from './src/cli.js';

// AI-generated
try {
  await run();
} catch (error) {
  console.error(error.message || error);
  process.exitCode = 1;
}
