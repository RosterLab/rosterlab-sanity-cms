import imageUrlBuilder from '@sanity/image-url'
import { sanityConfig } from './config'

const builder = imageUrlBuilder(sanityConfig)

export function urlForImage(source: any) {
  return builder.image(source)
}

// Helper to get a direct URL for an asset image
export function getAssetUrl(asset: any) {
  if (!asset?.image) return null
  
  // Get the base URL
  const url = urlForImage(asset.image).url()
  
  // You can also customize the URL with specific dimensions or formats
  // Examples:
  // - urlForImage(asset.image).width(400).url()
  // - urlForImage(asset.image).width(800).height(600).url()
  // - urlForImage(asset.image).format('webp').url()
  
  return url
}

// Get asset URL with specific dimensions
export function getAssetUrlWithSize(asset: any, width?: number, height?: number) {
  if (!asset?.image) return null
  
  let imageBuilder = urlForImage(asset.image)
  
  if (width) imageBuilder = imageBuilder.width(width)
  if (height) imageBuilder = imageBuilder.height(height)
  
  return imageBuilder.url()
}