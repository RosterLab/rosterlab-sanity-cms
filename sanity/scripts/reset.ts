import { createClient } from '@sanity/client'
import { sanityConfig } from '../lib/config'

// Create a write client
const writeClient = createClient({
  ...sanityConfig,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

async function resetData() {
  try {
    console.log('🗑️ Starting data reset...')

    // Get all document types to delete
    const documentTypes = ['post', 'author', 'category', 'page', 'siteSettings']

    for (const type of documentTypes) {
      console.log(`🧹 Deleting all ${type} documents...`)
      
      // Get all documents of this type
      const documents = await writeClient.fetch(`*[_type == "${type}"]`)
      
      if (documents.length > 0) {
        // Delete all documents of this type
        const deletePromises = documents.map((doc: any) =>
          writeClient.delete(doc._id)
        )
        await Promise.all(deletePromises)
        console.log(`✅ Deleted ${documents.length} ${type} documents`)
      } else {
        console.log(`ℹ️ No ${type} documents found`)
      }
    }

    console.log('🎉 Data reset completed successfully!')

  } catch (error) {
    console.error('❌ Error resetting data:', error)
    process.exit(1)
  }
}

// Check if this file is being run directly
if (require.main === module) {
  resetData()
}

export { resetData }