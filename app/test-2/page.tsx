import Image from "next/image";
import Button from "@/components/ui/Button";

export const metadata = {
  title: 'RosterLab - Test Homepage Design 2',
  description: 'Alternative homepage design for RosterLab AI scheduling software',
}

export default function TestHomepage2() {
  return (
    <>
      {/* Hero Section with Split Layout */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-sm font-medium text-blue-700">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                Trusted by 500+ teams worldwide
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Schedule smarter,
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  not harder
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Transform complex staff scheduling from hours to minutes with AI-powered automation that your team will love.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  href="/book-a-demo"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all transform hover:-translate-y-1"
                >
                  See it in action →
                </Button>
                <Button
                  href="/solutions/free-staff-scheduling"
                  className="bg-white text-gray-900 border-2 border-gray-200 px-8 py-4 rounded-xl text-lg font-semibold hover:border-gray-300 hover:shadow-lg transition-all"
                >
                  Try free
                </Button>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">98%</div>
                  <div className="text-sm text-gray-600">Time saved</div>
                </div>
                <div className="w-px h-12 bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">4.9/5</div>
                  <div className="text-sm text-gray-600">User rating</div>
                </div>
                <div className="w-px h-12 bg-gray-300"></div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">24/7</div>
                  <div className="text-sm text-gray-600">Support</div>
                </div>
              </div>
            </div>
            
            {/* Right Visual */}
            <div className="relative lg:h-[600px] h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-3xl transform rotate-3 opacity-20"></div>
              <div className="relative h-full bg-white rounded-3xl shadow-2xl p-8 overflow-hidden">
                {/* Mock Dashboard UI */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Weekly Schedule</h3>
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Schedule Grid Preview */}
                  <div className="grid grid-cols-7 gap-2 text-xs">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                      <div key={day} className="text-center font-medium text-gray-600 pb-2">
                        {day}
                      </div>
                    ))}
                    {Array.from({ length: 21 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-16 rounded-lg ${
                          i % 3 === 0 ? 'bg-blue-100' : i % 3 === 1 ? 'bg-green-100' : 'bg-purple-100'
                        }`}
                      ></div>
                    ))}
                  </div>
                  
                  {/* AI Suggestion Banner */}
                  <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <span className="text-lg">✨</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">AI detected scheduling conflict</p>
                        <p className="text-xs opacity-90">Click to auto-resolve →</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-30"></div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Stop wrestling with spreadsheets
            </h2>
            <p className="text-xl text-gray-600">
              Manual scheduling is broken. Here's how we fix it.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Before */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 text-6xl font-bold text-red-100">✗</div>
              <div className="relative bg-red-50 rounded-2xl p-8 border-2 border-red-100">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Before RosterLab</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span className="text-gray-700">Hours spent on manual scheduling</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span className="text-gray-700">Constant conflicts and last-minute changes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span className="text-gray-700">Unhappy staff due to unfair shifts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-500 mt-1">•</span>
                    <span className="text-gray-700">Compliance nightmares</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* After */}
            <div className="relative">
              <div className="absolute -top-4 -right-4 text-6xl font-bold text-green-100">✓</div>
              <div className="relative bg-green-50 rounded-2xl p-8 border-2 border-green-100">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">With RosterLab</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-700">Generate schedules in minutes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-700">AI handles conflicts automatically</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-700">Fair rotation keeps staff happy</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">✓</span>
                    <span className="text-gray-700">100% compliance guaranteed</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need to schedule like a pro
            </h2>
            <p className="text-xl text-gray-600">
              Powerful features that make complex scheduling simple
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: '🤖',
                title: 'AI-Powered Automation',
                description: 'Our AI learns your patterns and preferences to create optimal schedules automatically.'
              },
              {
                icon: '⚖️',
                title: 'Fair Shift Distribution',
                description: 'Ensure everyone gets their fair share of preferred and less desirable shifts.'
              },
              {
                icon: '📱',
                title: 'Mobile-First Design',
                description: 'Staff can view schedules, swap shifts, and request time off from anywhere.'
              },
              {
                icon: '🔄',
                title: 'Smart Shift Swapping',
                description: 'Automated shift trades that maintain compliance and coverage requirements.'
              },
              {
                icon: '📊',
                title: 'Real-Time Analytics',
                description: 'Track labor costs, overtime, and staff satisfaction with powerful dashboards.'
              },
              {
                icon: '🔐',
                title: 'Compliance Built-In',
                description: 'Automatically enforce labor laws, union rules, and company policies.'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Join 500+ teams scheduling smarter
            </h2>
            <p className="text-xl text-gray-600">
              From healthcare to hospitality, teams love RosterLab
            </p>
          </div>
          
          {/* Testimonial Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            {[
              {
                quote: "RosterLab cut our scheduling time by 95%. What used to take hours now takes minutes.",
                author: "Sarah Chen",
                role: "Nurse Manager",
                company: "City General Hospital"
              },
              {
                quote: "The AI suggestions are spot-on. It's like having a scheduling expert on our team 24/7.",
                author: "Mike Johnson",
                role: "Operations Director",
                company: "Grand Hotel Group"
              },
              {
                quote: "Staff morale improved dramatically once we started using fair shift distribution.",
                author: "Emma Williams",
                role: "HR Manager",
                company: "TechCorp Industries"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-8">
                <div className="text-3xl text-blue-600 mb-4">"</div>
                <p className="text-gray-700 mb-6 italic">{testimonial.quote}</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.author}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                  <div className="text-sm text-gray-500">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Logo Cloud */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-8">Trusted by industry leaders</p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-50">
              {['NHS', 'Hilton', 'Amazon', 'Google', 'Microsoft'].map((company) => (
                <div key={company} className="text-2xl font-bold text-gray-400">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to transform your scheduling?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Join hundreds of teams who've already made the switch to smarter scheduling.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href="/book-a-demo"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl transition-all transform hover:-translate-y-1"
            >
              Book your demo
            </Button>
            <Button
              href="/solutions/free-staff-scheduling"
              className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white hover:text-blue-600 transition-all"
            >
              Start free trial
            </Button>
          </div>
          <p className="mt-8 text-sm opacity-75">
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>
    </>
  );
}