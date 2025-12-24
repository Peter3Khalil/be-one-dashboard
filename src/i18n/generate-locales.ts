import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import ar from './locales/ar';
import en from './locales/en';

const __filename = fileURLToPath(import.meta.url);
const outputDir = path.dirname(__filename);

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`📁 Created output directory: ${outputDir}`);
}

// Map of locale names to their content
const locales = { en, ar };

for (const [localeName, content] of Object.entries(locales)) {
  const filePath = path.join(outputDir, `${localeName}.json`);

  fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n', 'utf8');
  console.log(`✅ Generated ${filePath}`);
}
