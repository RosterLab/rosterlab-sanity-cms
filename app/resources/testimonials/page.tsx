import Link from 'next/link'
import { HiArrowRight, HiArrowUp } from 'react-icons/hi'
import { getClient } from '@/sanity/lib/client'
import { groq } from 'next-sanity'
import { validatedToken } from '@/sanity/lib/token'
import { draftMode } from 'next/headers'
import ContactForm from './ContactForm'

interface Testimonial {
  id: string
  quote: string
  author: string
  position: string
  company: string
  logo?: string
  industry: string
}

interface CaseStudy {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt: string
  categories?: Array<{
    title: string
  }>
}

// Query for case studies
const caseStudiesQuery = groq`
  *[_type == "post" && "case-studies" in categories[]->slug.current] | order(publishedAt desc) [0...2] {
    _id,
    title,
    slug,
    excerpt,
    categories[]->{
      title
    }
  }
`

const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: "One of the most impactful benefits has been the considerable amount of time it has saved us in scheduling and administrative tasks, allowing myself to focus more on patient care and less on logistical concerns. Where previously rostering would take 7-8 days, now it takes 2-3 hours instead...",
    author: "Mike",
    position: "Associate Clinical Manager Radiology",
    company: "Whanganui Hospital",
    industry: "Healthcare"
  },
  {
    id: '2',
    quote: "Managing employee schedules was a significant challenge. I tried several rostering apps before, but none could accommodate our specific rules. RosterLab has completely transformed our scheduling process. Its intuitive interface and powerful features have saved us countless hours each week. The app successfully handles all our complex scenarios, which is crucial for our 24/7 operation...",
    author: "Christian",
    position: "Station manager",
    company: "SEYPEC",
    industry: "Healthcare"
  },
  {
    id: '3',
    quote: "One of the most impactful benefits has been the considerable amount of time it has saved us in scheduling and administrative tasks, allowing myself to focus more on patient care and less on logistical concerns. Where previously rostering would take 7-8 days, now it takes 2-3 hours instead...",
    author: "Mike",
    position: "Associate Clinical Manager Radiology",
    company: "Whanganui Hospital",
    industry: "Healthcare"
  },
  {
    id: '4',
    quote: "One of the most impactful benefits has been the considerable amount of time it has saved us in scheduling and administrative tasks, allowing myself to focus more on patient care and less on logistical concerns. Where previously rostering would take 7-8 days, now it takes 2-3 hours instead...",
    author: "Mike",
    position: "Associate Clinical Manager Radiology",
    company: "Whanganui Hospital",
    industry: "Healthcare"
  },
  {
    id: '5',
    quote: "One of the most impactful benefits has been the considerable amount of time it has saved us in scheduling and administrative tasks, allowing myself to focus more on patient care and less on logistical concerns. Where previously rostering would take 7-8 days, now it takes 2-3 hours instead...",
    author: "Mike",
    position: "Associate Clinical Manager Radiology",
    company: "Whanganui Hospital",
    industry: "Healthcare"
  },
  {
    id: '6',
    quote: "One of the most impactful benefits has been the considerable amount of time it has saved us in scheduling and administrative tasks, allowing myself to focus more on patient care and less on logistical concerns. Where previously rostering would take 7-8 days, now it takes 2-3 hours instead...",
    author: "Mike",
    position: "Associate Clinical Manager Radiology",
    company: "Whanganui Hospital",
    industry: "Healthcare"
  }
]


// Company logos
const companyLogos = [
  { name: 'Te Whatu Ora', logo: '/logos/te-whatu-ora.png' },
  { name: 'Aged Care', logo: '/logos/aged-care.png' },
  { name: 'Bupa', logo: '/logos/bupa.png' },
  { name: 'Spectrum Care', logo: '/logos/spectrum-care.png' },
  { name: 'GP Care', logo: '/logos/gp-care.png' },
]

export default async function TestimonialsPage() {
  const { isEnabled } = await draftMode()
  const client = getClient(isEnabled ? { token: validatedToken } : undefined)
  
  // Fetch case studies from Sanity
  const caseStudies = await client.fetch<CaseStudy[]>(caseStudiesQuery)
  
  // If no case studies found, use fallback data
  const displayCaseStudies: CaseStudy[] = caseStudies.length > 0 ? caseStudies : [
    {
      _id: '1',
      title: 'Whanganui Radiography Department Embraces AI Rostering',
      slug: { current: 'whanganui-radiography-department-embraces-ai-rostering' },
      excerpt: 'Where Previously Rostering Would Take 7-8 Days, Now It Takes 2-3 Hours Instead',
      categories: [{ title: 'Healthcare' }]
    },
    {
      _id: '2',
      title: 'Case Study: ICU in Western Australia',
      slug: { current: 'icu-unit-western-australia' },
      excerpt: 'Where Previously Rostering Would Take 7-8 Days, Now It Takes 2-3 Hours Instead',
      categories: [{ title: 'Healthcare' }]
    }
  ]

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      {/* Hero Section with decorative background */}
      <section className="relative bg-white pt-32 pb-20 overflow-visible">
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-20 w-[600px] h-[500px] z-20">
          <div className="relative w-full h-full">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#24d9dc] rounded-2xl transform rotate-[-4deg] opacity-90 animate-float-slow shadow-2xl"></div>
            <div className="absolute top-16 right-16 w-80 h-80 bg-[#0067bf] rounded-2xl transform rotate-[28deg] opacity-80 animate-float-medium shadow-xl"></div>
            <div className="absolute top-32 right-32 w-72 h-72 bg-gray-100 rounded-2xl transform rotate-[20deg] animate-float-fast shadow-lg"></div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl animate-fade-in-up">
            <h1 className="text-5xl font-black text-[#323232] mb-6">
              Customer Success
            </h1>
            <p className="text-xl text-[#323232] mb-10 max-w-3xl">
              Customer satisfaction is our success! Discover how our technology has brought smiles to many teams and organisations.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/book-a-demo"
                className="inline-flex items-center px-8 py-3 border-2 border-[#2d3bea] text-[#2d3bea] font-bold rounded-full hover:bg-[#2d3bea] hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                Book a Demo
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-3 bg-[#2d3bea] text-white font-bold rounded-full hover:bg-[#2533cc] transition-all duration-300 transform hover:scale-105"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with wave background */}
      <section className="relative py-20 overflow-hidden z-10">
        {/* Wave background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-[#e0f7fa] to-white">
          <svg className="absolute bottom-0 w-full" viewBox="0 0 1920 200" preserveAspectRatio="none">
            <path fill="white" d="M0,100 C320,180 640,20 960,100 C1280,180 1600,20 1920,100 L1920,200 L0,200 Z"/>
          </svg>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-5xl font-black text-[#03d5ab] text-center mb-20">
            Why our customers love RosterLab
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="mb-6">
                <h3 className="text-5xl font-black text-[#03d5ab] mb-2">~90%</h3>
                <p className="text-3xl font-black text-[#03d5ab]">Time Saving</p>
              </div>
              <p className="text-xl text-[#323232]">Less time rostering management</p>
            </div>
            <div className="text-center">
              <div className="mb-6">
                <h3 className="text-5xl font-black text-[#03d5ab] mb-2">&gt;5%</h3>
                <p className="text-3xl font-black text-[#03d5ab]">More efficiency</p>
              </div>
              <p className="text-xl text-[#323232] max-w-sm mx-auto">Gained through the entire staff within organisations</p>
            </div>
            <div className="text-center">
              <div className="mb-6 relative">
                <h3 className="text-5xl font-black text-[#03d5ab] mb-2">10%</h3>
                <HiArrowUp className="absolute -top-2 right-1/3 text-[#03d5ab] text-3xl" />
                <p className="text-3xl font-black text-[#03d5ab]">Staff Engagement</p>
              </div>
              <p className="text-xl text-[#323232] max-w-sm mx-auto">Gained through the entire staff within organisations</p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Logos */}
      <section className="bg-white py-16 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8">
            {companyLogos.map((company, index) => (
              <div key={index} className="h-20 flex items-center">
                <div className="text-2xl font-semibold text-gray-400">{company.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-[#323232] mb-16 uppercase">
            Case Studies
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {displayCaseStudies.map((study: CaseStudy) => (
              <div
                key={study._id}
                className="border-2 border-[#03d5ab] rounded-lg p-10 hover:shadow-2xl transition-all duration-300 bg-white"
              >
                <div className="flex flex-wrap gap-3 mb-6">
                  {study.categories?.map((category, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-100 text-[#323232] px-6 py-2 rounded-full text-base font-semibold"
                    >
                      {category.title}
                    </span>
                  ))}
                </div>
                <h3 className="text-4xl font-semibold text-[#323232] mb-8">
                  {study.title}
                </h3>
                <p className="text-2xl text-[#323232] mb-10">
                  "{study.excerpt}"
                </p>
                <div className="flex justify-end">
                  <Link
                    href={`/blog/${study.slug.current}`}
                    className="inline-flex items-center text-[#323232] hover:text-[#2d3bea] font-medium text-lg transition-colors"
                  >
                    <HiArrowRight className="text-2xl" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/case-studies"
              className="inline-flex items-center px-12 py-4 bg-[#e8f0ff] text-[#002b63] font-bold text-3xl rounded-full hover:bg-[#d4e3ff] transition-all duration-300"
            >
              Read More
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-[#323232] mb-16 uppercase">
            What people say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.slice(0, 4).map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-[#e6fafb] rounded-xl p-10 hover:shadow-xl transition-all duration-300"
              >
                <p className="text-[#323232] text-2xl leading-relaxed mb-10">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="font-medium text-[#323232] text-xl">
                      {testimonial.author}, {testimonial.position}
                    </p>
                  </div>
                  <div className="h-20 w-40 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-gray-500">{testimonial.company}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Additional testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {testimonials.slice(4).map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-[#e6fafb] rounded-xl p-10 hover:shadow-xl transition-all duration-300"
              >
                <p className="text-[#323232] text-2xl leading-relaxed mb-10">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="font-medium text-[#323232] text-xl">
                      {testimonial.author}, {testimonial.position}
                    </p>
                  </div>
                  <div className="h-20 w-40 bg-gray-200 rounded flex items-center justify-center">
                    <span className="text-gray-500">{testimonial.company}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#24d9dc] rounded-full opacity-10 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#2d3bea] rounded-full opacity-10 translate-x-1/2 translate-y-1/2"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-12 md:p-16">
              <h2 className="text-5xl font-bold text-[#323232] text-center mb-8 leading-tight">
                Having a headache making rosters for shift workers?
              </h2>
              <p className="text-center text-[#323232] text-lg mb-6">
                Enter your details below to book a demo with us.
              </p>
              <div className="flex flex-wrap justify-center items-center gap-6 mb-12">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-[#03d5ab] rounded-full mr-2"></div>
                  <span className="text-[#2d3bea] font-bold text-lg">90% time saving</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-[#03d5ab] rounded-full mr-2"></div>
                  <span className="text-[#2d3bea] font-bold text-lg">Up to 10% improve on efficiency</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-[#03d5ab] rounded-full mr-2"></div>
                  <span className="text-[#2d3bea] font-bold text-lg">Better staff satisfaction</span>
                </div>
              </div>
              
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="bg-[#f7f7f7] py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/book-a-demo"
                className="inline-flex items-center px-10 py-4 bg-[#2d3bea] text-white font-medium text-2xl rounded-full hover:bg-[#2533cc] transition-all duration-300 transform hover:scale-105"
              >
                Book A Demo
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-10 py-4 border-3 border-[#2d3bea] text-[#2d3bea] font-medium text-2xl rounded-full hover:bg-[#2d3bea] hover:text-white transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}