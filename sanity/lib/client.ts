import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { sanityConfig } from './config'

export const { projectId, dataset, apiVersion } = sanityConfig

export const client = createClient(sanityConfig)

// Client with stega encoding for visual editing
export function getClient(preview?: { token: string }) {
  const client = createClient({
    ...sanityConfig,
    useCdn: preview ? false : sanityConfig.useCdn,
    token: preview?.token,
    perspective: preview ? 'previewDrafts' : 'published',
    stega: {
      enabled: preview ? true : false,
      studioUrl: '/studio',
    },
  })
  return client
}

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}