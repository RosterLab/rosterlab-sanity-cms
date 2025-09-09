# US Localization Script Guide

## Overview
The `localize-to-us.ts` script helps create and maintain US-localized versions of pages with American spelling, terminology, and component mappings.

## Key Features
- **Safe by default**: Won't overwrite existing files unless you use `--force`
- **Automatic backups**: Creates backups before overwriting (unless disabled)
- **Smart component mapping**: Automatically uses US-specific components when available
- **Terminology conversion**: Converts British/Australian terms to US equivalents

## Usage

### Safe Mode (Recommended)
```bash
# Only creates new files, skips existing ones
npx tsx scripts/localize-to-us.ts
```

### Update Mode
```bash
# Overwrites existing files but creates backup first
npx tsx scripts/localize-to-us.ts --force
```

### Dangerous Mode
```bash
# Overwrites without backup - USE WITH CAUTION!
npx tsx scripts/localize-to-us.ts --force --no-backup
```

## What the Script Does

### 1. Component Mappings
- `Hero` → US-specific `Hero` component
- `TrustedBy` → `USTrustedBy` 
- `RosterLoadingBar` → `ScheduleLoadingBar`
- And more...

### 2. Terminology Changes
- roster → schedule
- rostering → scheduling
- employee → staff
- aged care → senior care
- shift swaps → shift trades

### 3. URL Updates
- Internal links updated to `/us/` versions
- Canonical URLs updated
- Navigation links preserved

## Best Practices

1. **Always run in safe mode first** to see what would be created
2. **Review changes** before running with `--force`
3. **Keep backups** of customized US pages
4. **Test thoroughly** after running the script

## Customizing the Script

### Skip Specific Files
Edit the `skipFiles` array in the script:
```typescript
skipFiles: [
  'page.tsx',  // Skip homepage
  'about/page.tsx',  // Skip about page
]
```

### Add New Component Mappings
Edit `US_COMPONENT_MAPPINGS` in the script:
```typescript
"from '@/components/sections/NewComponent'": "from '@/app/us/components/NewComponent'",
```

## Troubleshooting

### Pages showing wrong content?
1. Check if the page is importing the correct US components
2. Hard refresh your browser (Cmd+Shift+R)
3. Restart the Next.js dev server

### Script overwrote customizations?
1. Check the backup directory created by the script
2. Copy your customizations back from the backup
3. Add the file to `skipFiles` to prevent future overwrites