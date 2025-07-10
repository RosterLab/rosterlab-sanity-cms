import { readFileSync } from 'fs'
import { join } from 'path'

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  // Read critical CSS at build time
  let criticalCSS = ''
  try {
    const cssPath = join(process.cwd(), 'app', 'case-studies', 'critical-styles.css')
    criticalCSS = readFileSync(cssPath, 'utf8')
  } catch (error) {
    console.error('Failed to read critical CSS:', error)
  }

  return (
    <>
      {criticalCSS && (
        <style 
          dangerouslySetInnerHTML={{ __html: criticalCSS }} 
          data-critical="case-studies"
        />
      )}
      {children}
    </>
  )
}