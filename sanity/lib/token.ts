export const token = process.env.SANITY_API_TOKEN

// Only validate token when it's actually needed
export const getValidatedToken = () => {
  if (!token) {
    throw new Error('Missing SANITY_API_TOKEN')
  }
  return token as string
}

// For backward compatibility
export const validatedToken = token as string | undefined
