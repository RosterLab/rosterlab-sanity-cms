const fs = require('fs');
const path = require('path');

// Function to recursively find all page.tsx and layout.tsx files
function findPageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and .next directories
      if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
        findPageFiles(filePath, fileList);
      }
    } else if (file === 'page.tsx' || file === 'page.js') {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Function to extract metadata from a file
function extractMetadata(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract URL from file path
  let url = filePath
    .replace(/.*\/app/, '')
    .replace(/\/page\.(tsx|js)$/, '')
    .replace(/\[([^\]]+)\]/g, ':$1'); // Convert [param] to :param
  
  // Clean up the URL
  if (url === '') url = '/';
  else if (!url.startsWith('/')) url = '/' + url;
  
  // Try to extract metadata export - handle both object literal and typed metadata
  const metadataMatch = content.match(/export\s+const\s+metadata\s*(?::\s*Metadata\s*)?\s*=\s*{([^}]+)}/s);
  
  let title = '';
  let description = '';
  
  if (metadataMatch) {
    const metadataContent = metadataMatch[1];
    
    // Extract title - handle single quotes, double quotes, and backticks
    // Use a more robust regex that handles escaped quotes
    const titleMatch = metadataContent.match(/title:\s*(['"`])((?:\\.|(?!\1).)*?)\1/);
    if (titleMatch) {
      // Unescape the quotes
      title = titleMatch[2].replace(/\\(['"`])/g, '$1');
    }
    
    // Extract description - handle single quotes, double quotes, and backticks
    // Also handle multi-line strings and escaped quotes
    const descriptionMatch = metadataContent.match(/description:\s*(['"`])((?:\\.|(?!\1).)*?)\1/s);
    if (descriptionMatch) {
      // Remove line breaks and extra spaces, then unescape quotes
      description = descriptionMatch[2].replace(/\s+/g, ' ').trim().replace(/\\(['"`])/g, '$1');
    }
  }
  
  // Check for generateMetadata function
  if (!title && content.includes('generateMetadata')) {
    // For dynamic pages
    title = '[Dynamic - check generateMetadata function]';
    description = '[Dynamic - check generateMetadata function]';
  }
  
  return { url, title, description, filePath };
}

// Main function
function main() {
  const appDir = path.join(__dirname, '..', 'app');
  const pageFiles = findPageFiles(appDir);
  
  const results = [];
  
  pageFiles.forEach(filePath => {
    try {
      const metadata = extractMetadata(filePath);
      results.push(metadata);
    } catch (error) {
      console.error(`Error processing ${filePath}:`, error.message);
    }
  });
  
  // Sort by URL
  results.sort((a, b) => a.url.localeCompare(b.url));
  
  // Create CSV content
  const csvHeader = 'URL,Title,Description,File Path\n';
  const csvContent = results.map(row => {
    // Escape quotes in fields (CSV standard is to double them)
    const title = row.title.replace(/"/g, '""');
    const description = row.description.replace(/"/g, '""');
    const filePath = row.filePath.replace(/"/g, '""');
    
    return `"${row.url}","${title}","${description}","${filePath}"`;
  }).join('\n');
  
  const csv = csvHeader + csvContent;
  
  // Write to file
  const outputPath = path.join(__dirname, '..', 'site-meta-tags.csv');
  fs.writeFileSync(outputPath, csv);
  
  console.log(`Meta tags extracted to: ${outputPath}`);
  console.log(`Total pages found: ${results.length}`);
  
  // Also output to console in a readable format
  console.log('\nPages summary:');
  results.forEach(({ url, title, description }) => {
    console.log(`\nURL: ${url}`);
    console.log(`Title: ${title || '[No title found]'}`);
    console.log(`Description: ${description || '[No description found]'}`);
  });
}

main();