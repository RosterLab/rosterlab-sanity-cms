'use client'

import { useState } from 'react'
import Image from 'next/image'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

interface BenefitTab {
  id: string
  label: string
  title: string
  description: string
  highlights: string[]
  image: string
}

const benefitTabs: BenefitTab[] = [
  {
    id: 'time',
    label: 'Save Time',
    title: 'Generate rosters automatically in minutes',
    description: 'Our AI-powered system creates optimised rosters in minutes, not days. Automated roster generation handles complex constraints while you focus on what matters most.',
    highlights: ['Generate Rosters Automatically', 'Handle Complex Constraints', 'Reduce Admin by 90%'],
    image: '/images/illustration/Events-pana.svg'
  },
  {
    id: 'optimization',
    label: 'Optimise Workforce', 
    title: 'Optimise your workforce with AI',
    description: 'Mathematical optimisation algorithms ensure the most efficient staff allocation while meeting all operational requirements and compliance standards.',
    highlights: ['Optimise Skill Mix', 'Allocate Staff Efficiently', 'Minimise Costs'],
    image: '/images/illustration/auto-roster.svg'
  },
  {
    id: 'turnover',
    label: 'Reduce Turnover',
    title: 'Improve staff satisfaction and retention',
    description: 'Fair and flexible rosters improve work-life balance, leading to higher staff satisfaction and reduced turnover rates.',
    highlights: ['Improve Work-Life Balance', 'Reduce Staff Turnover', 'Increase Satisfaction'],
    image: '/images/illustration/team-satisfaction-heart.svg'
  },
  {
    id: 'safety',
    label: 'Ensure Safety & Fairness',
    title: 'Ensure compliance and equity',
    description: 'Built-in compliance automation and fair distribution algorithms ensure all rosters meet regulatory requirements while maintaining equitable shift distribution.',
    highlights: ['Automate Compliance', 'Distribute Shifts Fairly', 'Reduce Clinical Risk', 'Manage Fatigue Proactively'],
    image: '/images/illustration/Programmer-pana-2.svg'
  }
]

export default function Benefits() {
  const [activeTab, setActiveTab] = useState('time')
  const currentTab = benefitTabs.find(tab => tab.id === activeTab) || benefitTabs[0]

  return (
    <section className="py-20 bg-neutral-50">
      <Container>
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
            BENEFITS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mt-2 mb-4">
            Achieve Better Staff Outcomes
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
            Transform your workforce management with our AI-powered rostering solution designed specifically for complex scheduling needs.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {benefitTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Tab Content */}
          <div className="bg-white rounded-xl shadow-lg p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
                  {currentTab.title}
                </h3>
                <p className="text-lg text-gray-600 mb-8">
                  {currentTab.description}
                </p>
                <ul className="space-y-4">
                  {currentTab.highlights.map((highlight, index) => (
                    <li key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span className="font-semibold text-gray-800">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:pl-8">
                <Image
                  src={currentTab.image}
                  alt={currentTab.title}
                  width={500}
                  height={400}
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="text-center mt-12">
            <Button
              href="/solutions/ai-staff-scheduling"
              className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition-all hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Learn more about AI rostering
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}