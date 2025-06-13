// Environment configuration for Sanity
export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'development',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN && process.env.SANITY_API_TOKEN !== 'your_read_token' ? process.env.SANITY_API_TOKEN : undefined,
}

// Validate required environment variables
if (!sanityConfig.projectId) {
  throw new Error('Missing required environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID')
}

// Dataset environment mapping
export const datasets = {
  development: 'development',
  staging: 'staging', 
  production: 'production',
} as const

export type Dataset = typeof datasets[keyof typeof datasets]

// Get current environment
export const getCurrentEnvironment = (): string => {
  return process.env.NODE_ENV || 'development'
}

// Check if we're in development mode
export const isDevelopment = getCurrentEnvironment() === 'development'
export const isStaging = getCurrentEnvironment() === 'staging'
export const isProduction = getCurrentEnvironment() === 'production'

// Helper to get the appropriate dataset based on environment
export const getDatasetForEnvironment = (env?: string): Dataset => {
  const environment = env || getCurrentEnvironment()
  
  switch (environment) {
    case 'production':
      return datasets.production
    case 'staging':
      return datasets.staging
    default:
      return datasets.development
  }
}