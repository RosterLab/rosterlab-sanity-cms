#!/usr/bin/env ts-node

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'
import { join, dirname, basename } from 'path'
import { glob } from 'glob'

// Content transformation rules for US localization
const TERMINOLOGY_MAP = {
  // Primary terms
  'rostering': 'scheduling',
  'Rostering': 'Scheduling',
  'ROSTERING': 'SCHEDULING',
  'roster': 'schedule',
  'Roster': 'Schedule',
  'ROSTER': 'SCHEDULE',
  'rosters': 'schedules',
  'Rosters': 'Schedules',
  'ROSTERS': 'SCHEDULES',
  
  // Compound terms
  'staff roster': 'staff schedule',
  'Staff roster': 'Staff schedule',
  'Staff Roster': 'Staff Schedule',
  'employee roster': 'employee schedule',
  'Employee roster': 'Employee schedule',
  'Employee Roster': 'Employee Schedule',
  'roster management': 'schedule management',
  'Roster management': 'Schedule management',
  'Roster Management': 'Schedule Management',
  'roster planning': 'schedule planning',
  'Roster planning': 'Schedule planning',
  'Roster Planning': 'Schedule Planning',
  'roster system': 'scheduling system',
  'Roster system': 'Scheduling system',
  'Roster System': 'Scheduling System',
  'rostering software': 'scheduling software',
  'Rostering software': 'Scheduling software',
  'Rostering Software': 'Scheduling Software',
  'rostering solution': 'scheduling solution',
  'Rostering solution': 'Scheduling solution',
  'Rostering Solution': 'Scheduling Solution',
  'roster template': 'schedule template',
  'Roster template': 'Schedule template',
  'Roster Template': 'Schedule Template',
  'roster builder': 'schedule builder',
  'Roster builder': 'Schedule builder',
  'Roster Builder': 'Schedule Builder',
  
  // Healthcare specific
  'nurse rostering': 'nurse scheduling',
  'Nurse rostering': 'Nurse scheduling',
  'Nurse Rostering': 'Nurse Scheduling',
  'medical rostering': 'medical scheduling',
  'Medical rostering': 'Medical scheduling',
  'Medical Rostering': 'Medical Scheduling',
  'healthcare rostering': 'healthcare scheduling',
  'Healthcare rostering': 'Healthcare scheduling',
  'Healthcare Rostering': 'Healthcare Scheduling',
  
  // Other healthcare terms
  'aged care': 'senior care',
  'Aged care': 'Senior care',
  'Aged Care': 'Senior Care',
  'aged care facility': 'nursing home',
  'Aged care facility': 'Nursing home',
  'Aged Care Facility': 'Nursing Home',
  'aged care facilities': 'nursing homes',
  'Aged care facilities': 'Nursing homes',
  'Aged Care Facilities': 'Nursing Homes',
  'rostered': 'scheduled',
  'Rostered': 'Scheduled',
  'ROSTERED': 'SCHEDULED',
  'unrostered': 'unscheduled',
  'Unrostered': 'Unscheduled',
  'UNROSTERED': 'UNSCHEDULED',
  
  // URL specific terms (should be done separately)
  // '/roster': '/schedule',
  // 'roster-': 'schedule-',
  // '-roster': '-schedule',
}

// SEO metadata updates
const SEO_UPDATES = {
  // Title updates
  'RosterLab': 'RosterLab',  // Keep brand name
  'Smart Rostering': 'Smart Scheduling',
  'Rostering Software': 'Scheduling Software',
  'Roster Management': 'Schedule Management',
  
  // Description updates
  'rostering challenges': 'scheduling challenges',
  'rostering needs': 'scheduling needs',
  'rostering process': 'scheduling process',
}

interface LocalizationOptions {
  inputFile: string
  outputFile: string
  updateLinks?: boolean
  fileType?: 'tsx' | 'ts' | 'mdx' | 'md'
}

// URL mappings as specified by user
const URL_MAPPINGS: Record<string, string> = {
  // Main pages
  '/': '/us/',
  '/about': '/us/about',
  '/pricing': '/us/pricing',
  '/contact': '/us/contact',
  '/book-a-demo': '/us/book-a-demo',
  
  // Tools
  '/roi-calculator': '/us/tools/roi-calculator',
  '/staff-rostering-interactive-demo': '/us/product-tour',
  
  // Solutions - with terminology changes
  '/solutions/staff-roster-mobile-app': '/us/solutions/staff-scheduling-mobile-app',
  '/solutions/ai-staff-scheduling': '/us/solutions/ai-staff-schedule-maker',
  '/solutions/free-staff-scheduling': '/us/solutions/free-staff-scheduling-tool',
  
  // Features - with terminology changes
  '/feature/auto-roster-generation': '/us/feature/auto-scheduling',
  '/feature/open-shifts': '/us/feature/open-shifts',
  '/feature/shift-swaps': '/us/feature/shift-swaps-and-trades',
  '/feature/leave-requests': '/us/feature/time-off-requests',
  '/feature/self-scheduling': '/us/feature/self-scheduling',
  '/feature/re-rostering': '/us/feature/shift-rescheduling',
  
  // Industries - with terminology changes
  '/industries': '/us/industries',
  '/industries/healthcare': '/us/industries/healthcare-scheduling',
  '/industries/healthcare/aged-care': '/us/industries/healthcare/senior-care-scheduling',
  '/industries/healthcare/ed-icu': '/us/industries/healthcare/ed-icu-scheduling',
  '/industries/healthcare/radiology': '/us/industries/healthcare/radiology-scheduling',
}

function localizeContent(content: string, options: LocalizationOptions): string {
  let localizedContent = content
  
  // Apply terminology replacements
  // Sort by length descending to replace longer phrases first
  const sortedTerms = Object.entries(TERMINOLOGY_MAP).sort((a, b) => b[0].length - a[0].length)
  
  for (const [original, replacement] of sortedTerms) {
    // Use word boundaries to avoid partial replacements
    const regex = new RegExp(`\\b${original}\\b`, 'g')
    localizedContent = localizedContent.replace(regex, replacement)
  }
  
  // Update internal links if requested
  if (options.updateLinks) {
    // Helper function to transform URLs based on mappings
    const transformUrl = (path: string): string => {
      // Don't transform external links, anchors, or already localized links
      if (path.startsWith('http') || path.startsWith('#') || path.startsWith('/us/')) {
        return path
      }
      
      // Special cases - don't localize certain paths
      const excludePaths = ['/api/', '/studio', '/_next/', '/images/', '/fonts/']
      if (excludePaths.some(exclude => path.startsWith(exclude))) {
        return path
      }
      
      // Check if we have a specific mapping for this URL
      if (URL_MAPPINGS[path]) {
        return URL_MAPPINGS[path]
      }
      
      // For URLs not in the mapping, just add /us prefix
      // This handles dynamic routes and other pages
      return `/us${path}`
    }
    
    // Update href attributes
    localizedContent = localizedContent.replace(
      /href="(\/[^"]*)"/g,
      (match, path) => {
        const newPath = transformUrl(path)
        return newPath === path ? match : `href="${newPath}"`
      }
    )
    
    // Update Link component href props (single quotes)
    localizedContent = localizedContent.replace(
      /href={'(\/[^']*)'}/g,
      (match, path) => {
        const newPath = transformUrl(path)
        return newPath === path ? match : `href={'${newPath}'}`
      }
    )
    
    // Update object property href values
    localizedContent = localizedContent.replace(
      /href:\s*["'](\/[^"']*)/g,
      (match, path) => {
        const newPath = transformUrl(path)
        return newPath === path ? match : `href: "${newPath}`
      }
    )
    
    // Update router.push calls
    localizedContent = localizedContent.replace(
      /router\.push\(['"`](\/[^'"`]*)['"``]\)/g,
      (match, path) => {
        const newPath = transformUrl(path)
        return newPath === path ? match : `router.push('${newPath}')`
      }
    )
  }
  
  // Update canonical URLs
  localizedContent = localizedContent.replace(
    /canonical:\s*['"`]https:\/\/rosterlab\.com(\/[^'"`]*)['"``]/g,
    (match, path) => {
      if (path.startsWith('/us/')) {
        return match
      }
      // Use URL mappings for canonical URLs
      const mappedPath = URL_MAPPINGS[path] || `/us${path}`
      return `canonical: 'https://rosterlab.com${mappedPath}'`
    }
  )
  
  // Update OpenGraph URLs
  localizedContent = localizedContent.replace(
    /url:\s*['"`]https:\/\/rosterlab\.com(\/[^'"`]*)['"``]/g,
    (match, path) => {
      if (path.startsWith('/us/')) {
        return match
      }
      // Use URL mappings for OpenGraph URLs
      const mappedPath = URL_MAPPINGS[path] || `/us${path}`
      return `url: 'https://rosterlab.com${mappedPath}'`
    }
  )
  
  return localizedContent
}

function localizeFile(inputPath: string, outputPath: string, updateLinks = false) {
  console.log(`Localizing: ${inputPath} -> ${outputPath}`)
  
  const content = readFileSync(inputPath, 'utf-8')
  const fileType = inputPath.endsWith('.tsx') ? 'tsx' : 
                   inputPath.endsWith('.ts') ? 'ts' :
                   inputPath.endsWith('.mdx') ? 'mdx' : 'md'
  
  const localizedContent = localizeContent(content, {
    inputFile: inputPath,
    outputFile: outputPath,
    updateLinks,
    fileType
  })
  
  // Ensure output directory exists
  const outputDir = dirname(outputPath)
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true })
  }
  
  writeFileSync(outputPath, localizedContent, 'utf-8')
  console.log(`✅ Localized: ${outputPath}`)
}

// Main function to run localization
async function main() {
  const appDir = join(__dirname, '..', 'app')
  const targetDir = join(__dirname, '..', 'app', 'us')
  
  // Create target directory if it doesn't exist
  if (!existsSync(targetDir)) {
    mkdirSync(targetDir, { recursive: true })
  }
  
  // Define files/directories to localize - as specified in requirements
  const pagesToLocalize = [
    // Main navigation pages
    { source: 'page.tsx', target: 'page.tsx' }, // Homepage
    { source: 'about/page.tsx', target: 'about/page.tsx' },
    { source: 'pricing/page.tsx', target: 'pricing/page.tsx' },
    { source: 'contact/page.tsx', target: 'contact/page.tsx' },
    { source: 'book-a-demo/page.tsx', target: 'book-a-demo/page.tsx' },
    { source: 'book-a-demo/client.tsx', target: 'book-a-demo/client.tsx' },
    
    // Tools pages
    { source: 'draft/roi-calculator/page.tsx', target: 'tools/roi-calculator/page.tsx' },
    { source: 'draft/roi-calculator/client.tsx', target: 'tools/roi-calculator/client.tsx' },
    { source: 'staff-rostering-interactive-demo/page.tsx', target: 'product-tour/page.tsx' },
    { source: 'staff-rostering-interactive-demo/client.tsx', target: 'product-tour/client.tsx' },
    { source: 'staff-rostering-interactive-demo/PageWrapper.tsx', target: 'product-tour/PageWrapper.tsx' },
    
    // Solutions pages
    { source: 'solutions/staff-roster-mobile-app/page.tsx', target: 'solutions/staff-roster-mobile-app/page.tsx' },
    { source: 'solutions/ai-staff-scheduling/page.tsx', target: 'solutions/ai-staff-schedule-maker/page.tsx' },
    { source: 'solutions/free-staff-scheduling/page.tsx', target: 'solutions/free-staff-scheduling-tool/page.tsx' },
    
    // Feature pages
    { source: 'feature/auto-roster-generation/page.tsx', target: 'feature/auto-scheduling/page.tsx' },
    { source: 'feature/open-shifts/page.tsx', target: 'feature/open-shifts/page.tsx' },
    { source: 'feature/shift-swaps/page.tsx', target: 'feature/shift-swaps-and-trades/page.tsx' },
    { source: 'feature/shift-swaps/ShiftSwapsContent.tsx', target: 'feature/shift-swaps-and-trades/ShiftSwapsContent.tsx' },
    { source: 'feature/shift-swaps/AuditTrailModule.tsx', target: 'feature/shift-swaps-and-trades/AuditTrailModule.tsx' },
    { source: 'feature/shift-swaps/WeekendRotationModule.tsx', target: 'feature/shift-swaps-and-trades/WeekendRotationModule.tsx' },
    { source: 'feature/leave-requests/page.tsx', target: 'feature/time-off-requests/page.tsx' },
    { source: 'feature/leave-requests/LeaveRequestDemo.tsx', target: 'feature/time-off-requests/LeaveRequestDemo.tsx' },
    { source: 'feature/self-scheduling/page.tsx', target: 'feature/self-scheduling/page.tsx' },
    { source: 'feature/re-rostering/page.tsx', target: 'feature/shift-rescheduling/page.tsx' },
    
    // Industries pages
    { source: 'industries/page.tsx', target: 'industries/page.tsx' },
    { source: 'industries/healthcare/page.tsx', target: 'industries/healthcare-scheduling/page.tsx' },
    { source: 'industries/healthcare/aged-care/page.tsx', target: 'industries/healthcare/senior-care-scheduling/page.tsx' },
    { source: 'industries/healthcare/ed-icu/page.tsx', target: 'industries/healthcare/ed-icu-scheduling/page.tsx' },
    { source: 'industries/healthcare/radiology/page.tsx', target: 'industries/healthcare/radiology-scheduling/page.tsx' },
  ]
  
  // Process each file
  for (const { source, target } of pagesToLocalize) {
    const inputPath = join(appDir, source)
    const outputPath = join(targetDir, target)
    
    // Skip if source doesn't exist
    if (!existsSync(inputPath)) {
      console.log(`⚠️  Skipping (not found): ${inputPath}`)
      continue
    }
    
    localizeFile(inputPath, outputPath, true)
  }
  
  console.log('\n✅ Localization script completed!')
  console.log(`\nNext steps:
  1. Review the generated files in ${targetDir}
  2. Create the middleware for /us routing
  3. Update the sitemap with hreflang tags
  4. Add the country selector to the header
  5. Test all localized pages
  `)
}

// Run the script
if (require.main === module) {
  main().catch(console.error)
}

export { localizeContent, localizeFile }