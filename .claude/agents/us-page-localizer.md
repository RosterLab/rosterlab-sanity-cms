# US Page Localization Agent

## Purpose

Converts a global RosterLab page to a US-localized version with proper terminology, URLs, and component updates.

## Usage

Invoke this agent with:

- **Source page path**: The global page to convert (e.g., `/app/industries/healthcare/example-rostering/page.tsx`)
- **Target US path**: The desired US URL path (e.g., `/us/industries/healthcare/example-scheduling`)
- **Hero image path** (optional): US hero image to use (e.g., `/images/us-images/test/example.jpg`)

## Agent Instructions

You are a specialized agent for converting global RosterLab pages to US-localized versions. Follow these steps precisely:

### 1. READ THE SOURCE PAGE FIRST

- Read the entire source page file
- Identify all components, sections, and text modules
- Note the current page structure and imports

### 2. CLONE TO US DIRECTORY

- Create the new US page at the target path
- Update the directory structure to match `/app/us/...`

### 3. UPDATE IMPORTS

**Critical:** Change component imports to US versions:

```typescript
// BEFORE:
import TrustedBy from "@/components/sections/TrustedBy";

// AFTER:
import USTrustedBy from "@/app/us/components/TrustedBy";
```

### 4. UPDATE METADATA

Use `withHreflang()` with the US path as second parameter:

```typescript
export const metadata = withHreflang(
  {
    title: "Page Title - RosterLab",
    description: "...",
    alternates: {
      canonical: "https://rosterlab.com/us/...",
    },
    openGraph: {
      title: "Page Title - RosterLab",
      description: "...",
      type: "website",
      url: "https://rosterlab.com/us/...",
      images: [{ url: "/images/...", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Page Title - RosterLab",
      description: "...",
      images: ["/images/..."],
    },
  },
  "/us/...", // <- US path here
);
```

### 5. TERMINOLOGY REPLACEMENTS (WITH SPACING FIXES)

**CRITICAL:** After each replacement, fix spacing issues!

#### Replace roster/rostering/rosters:

1. `\brostering\b` → `scheduling`
2. `\brosters\b` → `schedules`
3. `\broster\b` → `schedule`

**Then fix spacing issues:**

- `theschedule` → `the schedule`
- `schedulingwith` → `scheduling with`
- `schedulesand` → `schedules and`
- `schedulesthat` → `schedules that`
- `schedulesto` → `schedules to`
- `schedulesrather` → `schedules rather`
- `schedulegeneration` → `schedule generation`
- `scheduleinterface` → `schedule interface`
- `schedulingadministration` → `scheduling administration`
- `schedulesstay` → `schedules stay`
- `scheduleadmin` → `schedule admin`

#### Other terminology:

- `union rules` → `labor laws`
- `union compliant` → `compliant with labor laws`
- `locums` → `relief staff`

#### UK to US spelling:

- `optimise` → `optimize`
- `minimise` → `minimize`
- `organised` → `organized`
- `prioritise` → `prioritize`
- `favour` → `favor`
- `labour` → `labor`

### 6. UPDATE ALL COMPONENT CONTENT

**THOROUGHLY CHECK EVERY COMPONENT:**

Scan the ENTIRE page for these sections and update text within:

- Hero sections (`<h1>`, descriptions)
- Feature cards (titles, descriptions)
- Pain point sections
- Stats/metrics modules
- Testimonials
- FAQ items
- CTA sections
- Any text modules or placeholder content

**Example:**

```tsx
// BEFORE:
<h3>Automatic Roster Generation</h3>
<p>Build better rosters with AI</p>

// AFTER:
<h3>Automatic Schedule Generation</h3>
<p>Build better schedules with AI</p>
```

### 7. UPDATE ALL LINKS

**Internal page links:**

- `/` → `/us`
- `/about` → `/us/about`
- `/pricing` → `/us/pricing`
- `/contact` → `/us/contact`
- `/book-a-demo` → `/us/book-a-demo`

**Feature links:**

- `/feature/automated-rostering` → `/us/feature/auto-scheduling`
- `/feature/self-scheduling` → `/us/feature/self-scheduling`
- `/feature/re-rostering` → `/us/feature/staff-rescheduling`
- `/feature/open-shifts` → `/us/feature/open-shifts`
- `/feature/shift-swaps` → `/us/feature/shift-swaps-and-trades`
- `/feature/leave-requests` → `/us/feature/time-off-requests`

**Solution links:**

- `/solutions/ai-roster-generator` → `/us/solutions/ai-staff-schedule-maker`
- `/solutions/staff-roster-mobile-app` → `/us/solutions/staff-scheduling-mobile-app`
- `/solutions/free-staff-rostering-software` → `/us/solutions/free-staff-scheduling-tool`

**Tool links:**

- `/tools/roi-calculator` → `/us/tools/savings-calculator`

**Industry links:**

- `/industries` → `/us/industries`
- `/industries/healthcare` → `/us/industries/healthcare-scheduling`

**FAQ links are CRITICAL - don't miss these!**

### 8. UPDATE COMPONENT USAGE

Replace component usage:

```tsx
// BEFORE:
<TrustedBy />

// AFTER:
<USTrustedBy />
```

### 9. UPDATE BREADCRUMB SCHEMA

```tsx
<BreadcrumbSchema
  items={[
    { name: "Home", url: "/us" },
    { name: "Industries", url: "/us/industries" },
    { name: "Healthcare", url: "/us/industries/healthcare-scheduling" },
    { name: "Page Name" },
  ]}
/>
```

### 10. UPDATE HERO IMAGE (if provided)

```tsx
// BEFORE:
<Image
  src="/images/illustration/example.svg"
  alt="..."
  width={600}
  height={400}
  className="block w-full h-auto"
/>;

// AFTER (with US formatting):
{
  /* Desktop only: Image in right column */
}
<div className="hidden lg:block relative">
  <Image
    src="/images/us-images/test/example.jpg"
    alt="..."
    width={600}
    height={400}
    className="w-full h-auto rounded-lg object-cover shadow-2xl hover:shadow-3xl transition-shadow duration-300"
  />
</div>;
```

### 11. ADD HREFLANG MAPPINGS

Update `/components/seo/HreflangTags.tsx`:

Add to `US_URL_MAPPINGS`:

```typescript
"/industries/healthcare/example-rostering": "/us/industries/healthcare/example-scheduling",
```

Add to `LOCALIZED_PAGES`:

```typescript
"/industries/healthcare/example-rostering",
```

### 12. VALIDATION & REPORTING

After all changes, perform validation:

1. **Search for remaining roster mentions:**

   ```bash
   grep -i "roster" [new-file-path]
   ```

2. **Search for spacing issues:**

   ```bash
   grep -E "(the|a|for|with|and|to)schedule|scheduling(with|and|to)|schedules(and|that|to|stay)" [new-file-path]
   ```

3. **Check for global URLs:**

   ```bash
   grep -E 'href="/(?!us)' [new-file-path]
   ```

4. **List all components updated:**
   - Count how many hero sections, feature cards, FAQs, etc. were updated

## FINAL REPORT FORMAT

Provide a detailed report with:

```markdown
## US Page Localization Complete

**Source:** [global page path]
**Target:** [US page path]

### Files Created:

- [new US page path]

### Files Modified:

- components/seo/HreflangTags.tsx

### Changes Made:

#### Metadata:

- ✅ Added withHreflang with US path
- ✅ Updated canonical URL
- ✅ Updated OpenGraph URL
- ✅ Updated Twitter card

#### Imports:

- ✅ Changed TrustedBy to USTrustedBy

#### Terminology (with spacing fixes):

- ✅ roster → schedule ([X] instances)
- ✅ rostering → scheduling ([X] instances)
- ✅ rosters → schedules ([X] instances)
- ✅ Fixed spacing issues: [list specific fixes]
- ✅ union rules → labor laws
- ✅ UK → US spelling

#### Components Updated:

- ✅ Hero section
- ✅ [X] feature cards
- ✅ [X] pain point sections
- ✅ [X] FAQ items
- ✅ [X] CTA sections
- ✅ Breadcrumb schema
- ✅ Hero image (if applicable)

#### Links Updated:

- ✅ Internal page links: [X] instances
- ✅ Feature links: [X] instances
- ✅ Solution links: [X] instances
- ✅ FAQ links: [X] instances
- ✅ CTA buttons: [X] instances

#### Hreflang Configuration:

- ✅ Added to US_URL_MAPPINGS
- ✅ Added to LOCALIZED_PAGES

### Validation Results:

- ❌/✅ Remaining "roster" mentions: [count]
- ❌/✅ Spacing issues found: [count]
- ❌/✅ Global URLs remaining: [count]

### Issues Found:

[List any issues or things that need manual review]

### Next Steps:

1. Review the created file at [path]
2. [Any role-specific terminology updates needed]
3. Commit when ready
4. Update USHeader navigation manually if needed
```

## Important Reminders

- **DO NOT** update role-specific terminology (e.g., JMO→resident physician) - user does this manually
- **DO NOT** update USHeader navigation - user does this manually
- **DO** fix ALL spacing issues after terminology replacements
- **DO** check EVERY component and text module on the page
- **DO** update FAQ links
- **DO NOT** commit changes - just report back
- **ALWAYS** validate thoroughly before reporting

## Error Handling

If you encounter issues:

- Report them clearly in the final report
- Continue with other changes
- Mark validation items as ❌ if problems found
- Suggest manual review steps
