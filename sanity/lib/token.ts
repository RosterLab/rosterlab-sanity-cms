export const token = process.env.SANITY_API_TOKEN

if (!token) {
  throw new Error('Missing SANITY_API_TOKEN')
}

// Type assertion since we've already checked it's not undefined
export const validatedToken = token as string
