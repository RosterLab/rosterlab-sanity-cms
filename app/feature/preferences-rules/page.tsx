import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'
import SiteLayout from '@/components/layout/SiteLayout'
import Image from 'next/image'
import { HiCheck, HiCog, HiShieldCheck, HiUsers, HiClipboardList, HiAdjustments } from 'react-icons/hi'

export const metadata = {
  title: 'Preferences & Rules - RosterLab',
  description: 'Powerful preference collection and rule management. Balance staff preferences with operational requirements through intelligent constraint handling.',
}

export default function PreferencesRulesPage() {
  return (
    <SiteLayout>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Hero Section */}
        <div className="py-20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                  Powerful preference collection and rule management
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Balance staff preferences with operational requirements through intelligent constraint handling and flexible rule configuration.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    href="/book-a-demo" 
                    className="bg-indigo-600 text-white hover:bg-indigo-700 px-8 py-4 text-lg font-semibold"
                  >
                    See It In Action
                  </Button>
                  <Button 
                    href="/contact" 
                    className="bg-white text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50 px-8 py-4 text-lg font-semibold"
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-xl p-6">
                  <div className="space-y-4">
                    <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold text-gray-900">Staff Preferences</span>
                        <span className="text-sm bg-green-100 text-green-600 px-2 py-1 rounded-full font-medium">85% Satisfied</span>
                      </div>
                      <div className="space-y-2">
                        <div className="bg-white rounded p-3">
                          <div className="flex justify-between items-center mb-2">
                            <p className="font-medium text-gray-900">Sarah Johnson</p>
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Day shifts preferred</span>
                          </div>
                          <div className="text-xs text-gray-500 grid grid-cols-7 gap-1">
                            <div className="text-center">
                              <p className="font-medium">M</p>
                              <div className="h-2 bg-green-400 rounded mt-1"></div>
                            </div>
                            <div className="text-center">
                              <p className="font-medium">T</p>
                              <div className="h-2 bg-green-400 rounded mt-1"></div>
                            </div>
                            <div className="text-center">
                              <p className="font-medium">W</p>
                              <div className="h-2 bg-yellow-400 rounded mt-1"></div>
                            </div>
                            <div className="text-center">
                              <p className="font-medium">T</p>
                              <div className="h-2 bg-green-400 rounded mt-1"></div>
                            </div>
                            <div className="text-center">
                              <p className="font-medium">F</p>
                              <div className="h-2 bg-green-400 rounded mt-1"></div>
                            </div>
                            <div className="text-center">
                              <p className="font-medium">S</p>
                              <div className="h-2 bg-red-400 rounded mt-1"></div>
                            </div>
                            <div className="text-center">
                              <p className="font-medium">S</p>
                              <div className="h-2 bg-red-400 rounded mt-1"></div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white rounded p-3">
                          <div className="flex justify-between items-center mb-2">
                            <p className="font-medium text-gray-900">Active Rules</p>
                            <span className="text-xs text-indigo-600">12 configured</span>
                          </div>
                          <div className="space-y-1">
                            <div className="text-xs flex justify-between">
                              <span>Max consecutive days: 5</span>
                              <HiShieldCheck className="w-3 h-3 text-green-500" />
                            </div>
                            <div className="text-xs flex justify-between">
                              <span>Min rest between shifts: 12h</span>
                              <HiShieldCheck className="w-3 h-3 text-green-500" />
                            </div>
                            <div className="text-xs flex justify-between">
                              <span>Weekend distribution: Fair</span>
                              <HiShieldCheck className="w-3 h-3 text-green-500" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <button className="w-full mt-4 bg-indigo-600 text-white rounded-lg py-3 font-semibold hover:bg-indigo-700 transition-colors">
                        Manage Preferences & Rules
                      </button>
                    </div>
                    <div className="text-center text-sm text-gray-500">
                      <HiAdjustments className="w-5 h-5 inline mr-1 text-indigo-500" />
                      Intelligent preference balancing
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 1: Flexible Preference Collection */}
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Flexible Preference Collection
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Collect detailed staff preferences through intuitive interfaces. Support for shift times, days, locations, and role preferences with weighted importance levels and recurring patterns.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Intuitive preference collection interface</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Weighted preferences (preferred, available, unavailable)</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Recurring patterns and one-off exceptions</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="bg-gray-100 rounded-lg p-8 aspect-square flex items-center justify-center">
                  <span className="text-gray-400 text-xl">Preference Collection Interface</span>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 2: Advanced Rule Engine */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-gray-100 rounded-lg p-8 aspect-square flex items-center justify-center">
                  <span className="text-gray-400 text-xl">Rule Configuration Engine</span>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Advanced Rule Engine
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Configure complex scheduling rules that automatically enforce compliance, fairness, and operational requirements. From simple constraints to sophisticated business logic.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Drag-and-drop rule builder interface</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Pre-built templates for common scenarios</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Custom logic for organization-specific needs</span>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 3: Intelligent Balancing */}
        <div className="py-20 bg-white">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Intelligent Preference Balancing
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  Advanced algorithms balance individual preferences with team fairness and operational requirements. The system learns from feedback to improve satisfaction over time.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Multi-objective optimization algorithms</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Fairness tracking and equitable distribution</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Continuous learning from staff feedback</span>
                  </li>
                </ul>
              </div>
              <div className="relative">
                <div className="bg-gray-100 rounded-lg p-8 aspect-square flex items-center justify-center">
                  <span className="text-gray-400 text-xl">Balancing Algorithm Dashboard</span>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* Feature 4: Rule Conflict Resolution */}
        <div className="py-20 bg-gray-50">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="bg-gray-100 rounded-lg p-8 aspect-square flex items-center justify-center">
                  <span className="text-gray-400 text-xl">Conflict Resolution Engine</span>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Automatic Rule Conflict Resolution
                </h2>
                <p className="text-lg text-gray-600 mb-6">
                  When preferences and rules conflict, intelligent resolution mechanisms find the best compromise. Priority systems and escalation paths ensure critical requirements are never violated.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Automatic conflict detection and alerts</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Priority-based resolution algorithms</span>
                  </li>
                  <li className="flex items-start">
                    <HiCheck className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Manager escalation for complex situations</span>
                  </li>
                </ul>
              </div>
            </div>
          </Container>
        </div>

        {/* Stats Section */}
        <div className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
          <Container>
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-12">
                Preference & Rule Management Results
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <p className="text-5xl font-bold mb-2">89%</p>
                  <p className="text-xl opacity-90">Average preference satisfaction rate</p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">100%</p>
                  <p className="text-xl opacity-90">Rule compliance maintained</p>
                </div>
                <div>
                  <p className="text-5xl font-bold mb-2">60%</p>
                  <p className="text-xl opacity-90">Reduction in scheduling complaints</p>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* CTA Section */}
        <div className="py-20">
          <Container>
            <div className="text-center bg-white rounded-3xl shadow-xl p-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Ready to Balance Preferences with Rules?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Create fair, compliant schedules that respect staff preferences while meeting all operational requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  href="/book-a-demo" 
                  className="bg-indigo-600 text-white hover:bg-indigo-700 px-8 py-4 text-lg font-semibold"
                >
                  Book Your Demo
                </Button>
                <Button 
                  href="/pricing" 
                  className="bg-white text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50 px-8 py-4 text-lg font-semibold"
                >
                  View Pricing
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </div>
    </SiteLayout>
  )
}