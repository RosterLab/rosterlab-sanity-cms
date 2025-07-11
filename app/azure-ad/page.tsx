import Container from '@/components/ui/Container'
import SiteLayout from '@/components/layout/SiteLayout'
import Link from 'next/link'

export const metadata = {
  title: 'Azure AD Registration Success - RosterLab',
  description: 'Your Microsoft Entra ID (Azure AD) has been successfully connected with RosterLab.',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: 'Azure AD Registration Success - RosterLab',
    description: 'Your Microsoft Entra ID (Azure AD) has been successfully connected with RosterLab.',
    type: 'website',
    url: 'https://rosterlab.com/azure-ad',
    images: [
      {
        url: '/images/og images/ADAzure.png',
        width: 1200,
        height: 630,
        alt: 'Azure AD Registration Success',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Azure AD Registration Success - RosterLab',
    description: 'Your Microsoft Entra ID (Azure AD) has been successfully connected with RosterLab.',
    images: ['/images/og images/ADAzure.png'],
  },
}

export default function AzureADSuccessPage() {
  return (
    <SiteLayout>
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-green-50 min-h-screen">
        <Container>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-xl p-8 md:p-12">
              {/* Success Header */}
              <div className="text-center mb-8">
                <div className="text-6xl mb-4">🎉</div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  You're all set!
                </h1>
                <p className="text-lg text-gray-600">
                  You have successfully registered our application
                </p>
              </div>

              {/* Main Message */}
              <div className="mb-8">
                <p className="text-gray-700 mb-6">
                  Thanks for connecting your Microsoft Entra ID (Azure AD) with RosterLab. Your organisation has now been successfully registered.
                </p>
                
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  What happens next:
                </h2>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-start">
                    <span className="text-green-500 mr-3 mt-0.5">✅</span>
                    <p className="text-gray-700">Your staff can now sign in using "Sign in with Microsoft"</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 mr-3 mt-0.5">✅</span>
                    <p className="text-gray-700">Security group claims will be passed through to RosterLab</p>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-500 mr-3 mt-0.5">✅</span>
                    <p className="text-gray-700">Access will be validated based on your approved groups and tenant ID</p>
                  </div>
                </div>

                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                  <p className="text-gray-700">
                    <span className="text-2xl mr-2">👉</span>
                    Let your RosterLab contact know once this step is complete. We'll activate access and guide you through any remaining onboarding.
                  </p>
                </div>

                <p className="text-gray-600">
                  If you run into any issues or aren't sure what to do next, just get in touch with your RosterLab implementation manager or email us at{' '}
                  <a href="mailto:support@rosterlab.com" className="text-blue-600 hover:underline">
                    support@rosterlab.com
                  </a>
                  .
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 border-t border-gray-200">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-md font-medium transition-colors"
                >
                  Return to Homepage
                </Link>
                <a
                  href="mailto:support@rosterlab.com"
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-md font-medium transition-colors"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </SiteLayout>
  )
}