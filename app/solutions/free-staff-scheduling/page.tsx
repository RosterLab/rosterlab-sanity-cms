import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import Image from 'next/image'
import SiteLayout from '@/components/layout/SiteLayout'
import FAQAccordion from '@/components/ui/FAQAccordion'
import TrustedBy from '@/components/sections/TrustedBy'
import { HiCheck, HiClock, HiTrendingUp, HiUsers, HiShieldCheck, HiCog, HiAcademicCap } from 'react-icons/hi'

export const metadata = {
  title: 'Free Staff Scheduling Platform - No More Spreadsheets!',
  description: 'Free staff-scheduling tool that automates rosters, slashes admin time, and keeps shifts compliant—plan smarter, faster, no credit card required.',
  openGraph: {
    title: 'Free Staff Scheduling Platform - No More Spreadsheets!',
    description: 'Free staff-scheduling tool that automates rosters, slashes admin time, and keeps shifts compliant—plan smarter, faster, no credit card required.',
    images: [
      {
        url: '/images/og%20images/Solution%20-%20Free.png',
        width: 1200,
        height: 630,
        alt: 'Free Staff Scheduling Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Staff Scheduling Platform - No More Spreadsheets!',
    description: 'Free staff-scheduling tool that automates rosters, slashes admin time, and keeps shifts compliant—plan smarter, faster, no credit card required.',
    images: ['/images/og%20images/Solution%20-%20Free.png'],
  },
}


const faqItems = [
  {
    question: "Is the AI generator included in the free product?",
    answer: "The <a href='/solutions/ai-schedules' style='color: #2563eb; text-decoration: underline;'>AI generator</a> is only available for the paid version of the platform, however if you're looking for a free digital scheduling solution we still offer great features that are better than using manual spreadsheets."
  },
  {
    question: "How do I install the employee mobile app?",
    answer: "The RosterLab employee mobile app is available for free on both iOS and Android devices. You can download it directly from the <a href='https://apps.apple.com/nz/app/rosterlab/id6448819917' target='_blank' rel='noopener noreferrer' style='color: #2563eb; text-decoration: underline;'>App Store</a> for iPhone/iPad or from the <a href='https://play.google.com/store/apps/details?id=com.rosterlab.app' target='_blank' rel='noopener noreferrer' style='color: #2563eb; text-decoration: underline;'>Google Play Store</a> for Android devices. Once installed, staff can log in with their credentials to access schedules, submit preferences, and receive notifications."
  },
  {
    question: "How do I keep my teams notified and engaged?",
    answer: "Team members can see their published rosters on the RosterLab app, allowing them to stay updated with their work schedules. They are also able to communicate their preferred shift patterns. This information is integrated into the scheduler view simplifying the communication process. Gone is the search for ambiguous emails and handwritten notes with each person's requests and availability."
  },
  {
    question: "What roster statistics can I view?",
    answer: "Easily see all the figures you could want to see, such as requests met, hours worked, weekends worked, skill mix on each shift and many more. Set the acceptable range for each day and each person, and the RosterLab app will highlight when you have too few or too many people assigned to each shift or day."
  },
  {
    question: "How does RosterLab help reduce scheduling mistakes?",
    answer: "With the RosterLab rules engine, you can have a record of all the rules and how they apply to each and every individual staff member. Then when you write the next schedule, see in real time each time you give too many shifts in a row or don't meet someone's minimum contractual hours. See a visual reminder of every person's request before you change their roster."
  }
]

const painPoints = [
  {
    title: 'No More Spreadsheet Chaos',
    description: 'Multiple versions, lost updates, and formula errors making scheduling a nightmare. Try digital scheduling - it\'s free forever.'
  },
  {
    title: 'Free forever',
    description: 'No hidden fees, no credit card required. Get started with digital scheduling at no cost and stay free forever'
  },
  {
    title: 'Seamless Communication',
    description: 'Keep your team informed with real-time updates and easy shift swapping through our mobile app'
  },
  {
    title: 'On the go mobile app',
    description: 'Staff can view schedules, swap shifts, and request leave from anywhere with our free iOS and Android apps'
  }
]

export default function ManualSchedulingPage() {
  return (
    <SiteLayout>
      <>
      {/* Hero Section */}
      <div className="bg-white pt-16 pb-0">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="pb-8 lg:pb-12">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Your free digital scheduling tool
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Our free scheduling platform helps you manage shifts, track compliance, and keep your team happy.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-700 font-medium">Skill and seniority rostering</span>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-700 font-medium">Seamlessly integrate your long and short term rosters</span>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-700 font-medium">Fair workload balancing from the get go</span>
                </div>
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-700 font-medium">Move away from spreadsheets and into the cloud</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button href="https://app.rosterlab.com" className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 text-lg">
                  Start for Free
                </Button>
                <Button href="/solutions/ai-schedules" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg">
                  Discover AI Rosters
                </Button>
              </div>
              
            </div>
            <div className="relative flex justify-center items-center">
              <div className="w-full max-w-lg">
                <Image
                  src="/images/illustration/test5 copy.svg"
                  alt="Free Staff Scheduling Illustration"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </Container>
      </div>


      {/* Intelligent Scheduling Section */}
      <div className="bg-gray-50 py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Your Dedicated Rostering App
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Our digital platform transforms manual scheduling into an efficient process that balances staff preferences, operational requirements, and compliance needs. Experience smarter workforce management without the spreadsheet hassle.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <HiClock className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Reduce Rostering Mistakes</h3>
                    <p className="text-gray-600">Intelligently set up all your staff requirements, rules and individual requests so that the information is at your fingertips.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <HiTrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Optimise Staffing Coverage</h3>
                    <p className="text-gray-600">Mathematical optimisation ensures the most efficient staff allocation and resource utilisation</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <HiUsers className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Increase Staff Satisfaction</h3>
                    <p className="text-gray-600">Fair and balanced schedules improve work-life balance and increase staff retention</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full max-w-[600px]">
              <Image
                src="/images/illustration/Devices-pana.svg"
                alt="Say Goodbye to Spreadsheets"
                width={600}
                height={400}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </Container>
      </div>

      {/* Six Steps Section */}
      <div className="bg-white py-20">
        <Container>
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-green-600 uppercase tracking-wide">
              GETTING STARTED
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              Six Steps to Build Your Free Staff Schedule
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started with digital scheduling in minutes. Our simple process helps you transition from spreadsheets to smart scheduling.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            {/* Steps displayed as a vertical timeline on mobile, horizontal cards on desktop */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Step 1 */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Import your team
                    </h3>
                    <p className="text-gray-600">
                      Upload your staff list and set up departments, roles, and skills. Define your shifts and working patterns.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Configure your rules
                    </h3>
                    <p className="text-gray-600">
                      Set minimum staffing levels, maximum hours, and rest requirements to ensure compliance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Build your schedule
                    </h3>
                    <p className="text-gray-600">
                      Create schedules using our simple and intuitive interface.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Publish to your team
                    </h3>
                    <p className="text-gray-600">
                      Share schedules instantly via the mobile app. Staff receive notifications and can sync to their calendars.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 5 */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold">5</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Handle changes easily
                    </h3>
                    <p className="text-gray-600">
                      Process leave requests and shift swaps digitally. No more phone calls or sticky notes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Step 6 */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 font-bold">6</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Track and improve
                    </h3>
                    <p className="text-gray-600">
                      Monitor attendance, track hours, and identify patterns to continuously improve your scheduling.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-12">
              <p className="text-gray-600 mb-6">
                Ready to upgrade to AI-powered scheduling?
              </p>
              <Button href="/solutions/ai-schedules" className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3">
                Explore AI Features
              </Button>
            </div>
          </div>
        </Container>
      </div>

      {/* Compliance Section */}
      <div className="bg-gray-50 py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Say Goodbye to Spreadsheets
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Stay compliant with complex healthcare regulations and union agreements automatically. Our platform understands and enforces all relevant rules and constraints.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <HiShieldCheck className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Regulatory Compliance</h3>
                    <p className="text-gray-600">Automatic adherence to healthcare regulations and industry standards</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <HiAcademicCap className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Skills Matching</h3>
                    <p className="text-gray-600">Ensures qualified staff are scheduled for appropriate roles and responsibilities</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <HiCog className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Custom Rules Engine</h3>
                    <p className="text-gray-600">Configure organisation-specific rules and policies for perfect compliance</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Core Features</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-700">Collect staff preferences</span>
                    <HiCheck className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-700">Create and distribute rosters online</span>
                    <HiCheck className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-700">Check Roster Statistics (requests met, hours worked, skill mix etc.)</span>
                    <HiCheck className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-gray-200">
                    <span className="text-gray-700">Compliant with union & contractual agreements</span>
                    <HiCheck className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between py-3">
                    <span className="text-gray-700">Access anywhere, anytime in the cloud</span>
                    <HiCheck className="w-5 h-5 text-green-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Advanced AI Capabilities Section */}
      <div className="bg-white py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="order-2 lg:order-1">
              <Image
                src="/images/illustration/free-staff-mobile.svg"
                alt="Free Employee Mobile App"
                width={600}
                height={500}
                className="w-full h-auto"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Free Employee Mobile App
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Keep your team connected with our free mobile app. Staff can view schedules, share their preferences, and receive important updates anytime, anywhere.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <HiCheck className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Real-time push notifications</span>
                </div>
                <div className="flex items-center">
                  <HiCheck className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">View schedules on the go</span>
                </div>
                <div className="flex items-center">
                  <HiCheck className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Share Staff Preferences</span>
                </div>
                <div className="flex items-center">
                  <HiCheck className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <span className="text-gray-700">Available on <a href="https://apps.apple.com/nz/app/rosterlab/id6448819917" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">iOS</a> and <a href="https://play.google.com/store/apps/details?id=com.rosterlab.app" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Android</a></span>
                </div>
              </div>
              <div className="mt-8">
                <Button href="/solutions/staff-roster-mobile-app" className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3">
                  Learn More About Mobile App
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Trusted By Section */}
      <div className="bg-gray-50">
        <div className="[&>section]:bg-gray-50">
          <TrustedBy />
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              Everything you need to know about our free digital scheduling tool
            </p>
            <FAQAccordion items={faqItems} />
          </div>
        </Container>
      </div>
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 py-20">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Simplify Your Scheduling?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Start with our free digital scheduling tool and transform your workforce management today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                href="https://app.rosterlab.com" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              >
                Start for Free
              </Button>
              <Button 
                href="/book-a-demo" 
                className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold transition-colors"
              >
                Book a Demo
              </Button>
            </div>
          </div>
        </Container>
      </div>
      </>
    </SiteLayout>
  )
}