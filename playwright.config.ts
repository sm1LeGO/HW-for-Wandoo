import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config(); // .env → process.env.*

export default defineConfig({
  testDir: './src/tests',
  timeout: 30 * 1000,
  retries: 0,
  use: {
    baseURL: 'https://swaper.com',
    viewport: { width: 1920, height: 1080 },
    screenshot: 'only-on-failure',
    headless: true
    },
  projects: [
    { name: 'Chromium', use: { ...devices['Desktop Chrome'] } }
  ]
});
