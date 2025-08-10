import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { cpSync } from 'fs';

console.log('Building static version for Netlify...');

// Build the frontend only
execSync('vite build', { stdio: 'inherit' });

// Copy media files to build output
console.log('Copying media files...');
try {
  cpSync('media', 'dist/public/media', { recursive: true });
  console.log('Media files copied successfully!');
} catch (error) {
  console.error('Error copying media files:', error);
}

// Update the index.html to include environment variable
const indexPath = 'dist/public/index.html';
const indexContent = readFileSync(indexPath, 'utf8');

// Replace placeholder with actual environment variable
const updatedContent = indexContent.replace(
  '</head>',
  `  <script>
    window.GOOGLE_SHEETS_API_KEY = '${process.env.GOOGLE_SHEETS_API_KEY || ''}';
  </script>
</head>`
);

writeFileSync(indexPath, updatedContent);
console.log('Static build complete!');