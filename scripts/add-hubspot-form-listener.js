#!/usr/bin/env node

/**
 * Script to add HubSpotFormListener to pages that contain HubSpot forms
 * 
 * Usage: node scripts/add-hubspot-form-listener.js [file-path]
 * 
 * If no file path is provided, it will scan the entire project for HubSpot forms
 * and add the listener where needed.
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const { exec } = require('child_process');
const execAsync = promisify(exec);

// Patterns that indicate a HubSpot form is present
const HUBSPOT_PATTERNS = [
  'window.hbspt',
  'hbspt.forms.create',
  'HubSpotForm',
  'HubSpotEmbedForm',
  'HubSpotEmbeddedForm',
  'NewsletterFormWrapper',
  'ContactFormWrapper',
  'portalId.*formId', // HubSpot form configuration
  'js.hsforms.net', // HubSpot form script
];

// Pattern to check if HubSpotFormListener is already imported
const LISTENER_IMPORT_PATTERN = /import\s+HubSpotFormListener\s+from\s+['"]@\/components\/analytics\/HubSpotFormListener['"]/;

// Pattern to check if HubSpotFormListener is already used
const LISTENER_USAGE_PATTERN = /<HubSpotFormListener\s*\/>/;

// Files to exclude from scanning
const EXCLUDE_PATTERNS = [
  '**/node_modules/**',
  '**/.next/**',
  '**/dist/**',
  '**/build/**',
  '**/*.test.*',
  '**/*.spec.*',
  '**/scripts/**',
];

/**
 * Check if a file contains HubSpot forms
 */
function containsHubSpotForm(content) {
  return HUBSPOT_PATTERNS.some(pattern => {
    const regex = new RegExp(pattern, 'i');
    return regex.test(content);
  });
}

/**
 * Check if HubSpotFormListener is already present
 */
function hasHubSpotFormListener(content) {
  return LISTENER_IMPORT_PATTERN.test(content) && LISTENER_USAGE_PATTERN.test(content);
}

/**
 * Add HubSpotFormListener import to the imports section
 */
function addImport(content) {
  // Find the last import statement
  const importMatches = content.match(/import\s+.*\s+from\s+['"].*['"]\s*;?/g);
  if (importMatches && importMatches.length > 0) {
    const lastImport = importMatches[importMatches.length - 1];
    const lastImportIndex = content.lastIndexOf(lastImport);
    const insertPosition = lastImportIndex + lastImport.length;
    
    const importStatement = "\nimport HubSpotFormListener from '@/components/analytics/HubSpotFormListener'";
    return content.slice(0, insertPosition) + importStatement + content.slice(insertPosition);
  }
  
  // If no imports found, add at the beginning
  return `import HubSpotFormListener from '@/components/analytics/HubSpotFormListener'\n\n${content}`;
}

/**
 * Add HubSpotFormListener component to the JSX
 */
function addListener(content) {
  // Find return statement with JSX
  const returnMatch = content.match(/return\s*\(\s*\n?\s*(<[\s\S]*?>)/);
  
  if (returnMatch) {
    const returnIndex = content.indexOf(returnMatch[0]);
    const jsxStartIndex = returnIndex + returnMatch[0].indexOf('<');
    
    // Insert HubSpotFormListener after the opening tag
    const beforeJsx = content.slice(0, jsxStartIndex);
    const afterJsx = content.slice(jsxStartIndex);
    
    // Find the first closing > to insert after the opening tag
    const firstClosingBracket = afterJsx.indexOf('>');
    if (firstClosingBracket !== -1) {
      const insertPosition = firstClosingBracket + 1;
      const updatedContent = beforeJsx + 
        afterJsx.slice(0, insertPosition) + 
        '\n      <HubSpotFormListener />' + 
        afterJsx.slice(insertPosition);
      
      return updatedContent;
    }
  }
  
  return content;
}

/**
 * Process a single file
 */
function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  if (!containsHubSpotForm(content)) {
    console.log(`✓ ${filePath} - No HubSpot forms found`);
    return false;
  }
  
  if (hasHubSpotFormListener(content)) {
    console.log(`✓ ${filePath} - HubSpotFormListener already present`);
    return false;
  }
  
  console.log(`⚠ ${filePath} - HubSpot form found, adding listener...`);
  
  let updatedContent = content;
  
  // Add import if not present
  if (!LISTENER_IMPORT_PATTERN.test(updatedContent)) {
    updatedContent = addImport(updatedContent);
  }
  
  // Add component usage if not present
  if (!LISTENER_USAGE_PATTERN.test(updatedContent)) {
    updatedContent = addListener(updatedContent);
  }
  
  // Write the updated content
  fs.writeFileSync(filePath, updatedContent);
  console.log(`✅ ${filePath} - HubSpotFormListener added successfully`);
  
  return true;
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length > 0) {
    // Process specific file(s)
    for (const file of args) {
      if (fs.existsSync(file)) {
        processFile(file);
      } else {
        console.error(`❌ File not found: ${file}`);
      }
    }
  } else {
    // Scan entire project
    console.log('Scanning project for HubSpot forms...\n');
    
    // Use find command to get all tsx and jsx files
    const { stdout } = await execAsync(`find . -type f \\( -name "*.tsx" -o -name "*.jsx" \\) | grep -v node_modules | grep -v .next | grep -v dist | grep -v build | grep -v test | grep -v spec | grep -v scripts`);
    
    const files = stdout.trim().split('\n').filter(file => file.length > 0);
    
    let updatedCount = 0;
    
    for (const file of files) {
      const cleanPath = file.startsWith('./') ? file.substring(2) : file;
      if (processFile(cleanPath)) {
        updatedCount++;
      }
    }
    
    console.log(`\n✅ Scan complete. Updated ${updatedCount} file(s).`);
  }
}

// Run the script
main().catch(console.error);