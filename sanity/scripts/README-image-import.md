# Image Import Scripts for Sanity CMS

This directory contains scripts to help you import images into your Sanity CMS.

## Prerequisites

1. **Get a Sanity Write Token**
   - Go to https://www.sanity.io/manage
   - Select your project
   - Go to API → Tokens
   - Create a new token with "Editor" or "Deploy Studio" permissions
   - Save the token securely

2. **Set the Environment Variable**
   ```bash
   export SANITY_WRITE_TOKEN="your-token-here"
   ```
   
   Or add it to your `.env.local` file:
   ```
   SANITY_WRITE_TOKEN=your-token-here
   ```

## Available Scripts

### 1. Quick Image Import (`quick-image-import.ts`)

The easiest way to add images to existing documents.

**Usage:**
1. Edit `sanity/scripts/quick-image-import.ts`
2. Update the `imagesToImport` array with your image mappings
3. Run: `npm run sanity:quick-import`

**Example configuration:**
```typescript
const imagesToImport = [
  {
    type: 'post',
    slug: 'my-blog-post',
    imageUrl: 'https://example.com/image.jpg',
    fieldName: 'mainImage',
    alt: 'Blog post hero image'
  },
  {
    type: 'author', 
    slug: 'john-doe',
    imageUrl: 'https://example.com/john.jpg',
    fieldName: 'image',
    alt: 'John Doe'
  }
]
```

### 2. Advanced Image Import (`import-images.ts`)

For more complex image import scenarios with local file support.

**Usage:**
1. Edit `sanity/scripts/import-images.ts`
2. Update the `imageMappings` array
3. Run: `npm run sanity:import-images`

**Features:**
- Upload images from local files
- Bulk import capabilities
- More control over the import process

## Image URL Options

You can use images from:
1. **Public URLs**: Any publicly accessible image URL
2. **Local files**: Images in your project (update the scripts to use file paths)
3. **Placeholder services**: 
   - https://placeholder.com/600x400
   - https://picsum.photos/600/400
   - https://via.placeholder.com/600x400

## Finding Document Slugs

To find the slugs of your existing documents:

1. **Via Sanity Studio**:
   - Open Sanity Studio (http://localhost:3333)
   - Navigate to your documents
   - The slug is usually shown in the document

2. **Via Sanity Vision**:
   - Go to Vision tab in Sanity Studio
   - Run queries like:
   ```groq
   *[_type == "post"]{title, "slug": slug.current}
   *[_type == "author"]{name, "slug": slug.current}
   ```

## Troubleshooting

1. **"Document not found" error**
   - Check that the slug matches exactly (case-sensitive)
   - Ensure the document exists in your dataset

2. **"SANITY_WRITE_TOKEN not set" error**
   - Make sure you've exported the environment variable
   - Check that the token has write permissions

3. **Network errors**
   - Ensure image URLs are publicly accessible
   - Check your internet connection

## Best Practices

1. **Test first**: Try with one or two images before bulk importing
2. **Use descriptive alt text**: Important for accessibility
3. **Optimize images**: Compress images before uploading to save bandwidth
4. **Backup**: Consider backing up your dataset before bulk operations

## Example: Import Blog Post Images

```bash
# 1. Set your token
export SANITY_WRITE_TOKEN="sk..."

# 2. Edit quick-image-import.ts with your mappings

# 3. Run the import
npm run sanity:quick-import
```

The script will show progress and confirm each successful import.