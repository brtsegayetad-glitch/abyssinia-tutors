import fs from 'fs';
import path from 'path';

const libraryDataDir = './node_modules/react-example/src/data';
const targetDir = './src/data';

// Ensure our local directory exists
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

console.log("Reading your private Amharic files...");
const files = fs.readdirSync(libraryDataDir).filter(f => f.endsWith('.json'));

let combinedData = {};

files.forEach(file => {
  const fileKey = file.replace('.json', '');
  const rawContent = fs.readFileSync(path.join(libraryDataDir, file), 'utf-8');
  combinedData[fileKey] = JSON.parse(rawContent);
});

const exportContent = `// Automatically generated from private library assets
export const amharicLibraryData = ${JSON.stringify(combinedData, null, 2)};
`;

fs.writeFileSync(path.join(targetDir, 'amharicLibrary.ts'), exportContent);
console.log("✨ Done! Created src/data/amharicLibrary.ts containing your full curriculum.");
