require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function createPreviewSecret() {
  const secret = 'my-preview-secret-' + Math.random().toString(36).substring(7)
  
  await client.create({
    _id: 'secrets.preview',
    _type: 'system.secret',
    secret: secret,
  })
  
  console.log('Preview secret created:', secret)
}

createPreviewSecret().catch(console.error)