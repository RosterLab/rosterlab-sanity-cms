import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { sanityConfig } from './config'

export const { projectId, dataset, apiVersion } = sanityConfig

export const client = createClient(sanityConfig)

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}