import { createClient } from '@sanity/client'
import { authorFixtures } from '../fixtures/authors'
import { categoryFixtures } from '../fixtures/categories'
import { postFixtures } from '../fixtures/posts'
import { sanityConfig } from '../lib/config'

// Create a write client
const writeClient = createClient({
  ...sanityConfig,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

async function seedData() {
  try {
    console.log('🌱 Starting seed process...')

    // Seed authors first
    console.log('📝 Creating authors...')
    const authorPromises = authorFixtures.map((author) =>
      writeClient.create(author)
    )
    const createdAuthors = await Promise.all(authorPromises)
    console.log(`✅ Created ${createdAuthors.length} authors`)

    // Seed categories
    console.log('🏷️ Creating categories...')
    const categoryPromises = categoryFixtures.map((category) =>
      writeClient.create(category)
    )
    const createdCategories = await Promise.all(categoryPromises)
    console.log(`✅ Created ${createdCategories.length} categories`)

    // Seed posts with references to authors and categories
    console.log('📄 Creating posts...')
    const postPromises = postFixtures.map((post, index) => {
      const postWithRefs = {
        ...post,
        author: {
          _type: 'reference',
          _ref: createdAuthors[index % createdAuthors.length]._id,
        },
        categories: [
          {
            _type: 'reference',
            _ref: createdCategories[index % createdCategories.length]._id,
          },
          // Add a second category to some posts
          ...(index % 2 === 0 ? [{
            _type: 'reference',
            _ref: createdCategories[(index + 1) % createdCategories.length]._id,
          }] : []),
        ],
      }
      return writeClient.create(postWithRefs)
    })
    const createdPosts = await Promise.all(postPromises)
    console.log(`✅ Created ${createdPosts.length} posts`)

    console.log('🎉 Seed process completed successfully!')
    console.log(`
📊 Summary:
- Authors: ${createdAuthors.length}
- Categories: ${createdCategories.length}
- Posts: ${createdPosts.length}
    `)

  } catch (error) {
    console.error('❌ Error seeding data:', error)
    process.exit(1)
  }
}

// Check if this file is being run directly
if (require.main === module) {
  seedData()
}

export { seedData }