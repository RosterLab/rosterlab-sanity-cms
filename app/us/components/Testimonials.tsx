'use client'

import { useState } from 'react'
import Image from 'next/image'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

const testimonials = [
  {
    quote: "Scheduling would take 7-8 days, now it takes 2-3 hours…allowing me to focus more on patient care.",
    author: "Mike",
    company: "Associate Clinical Manager, Radiology",
    logo: "/images/logos/whanganui.png"
  },
  {
    quote: "RosterLab has saved me countless hours... I have recommended this service to everyone I know who writes medical schedules!",
    author: "Peter",
    company: "Senior Registrar, ICU", 
    logo: null
  },
  {
    quote: "If Rosterlab can help with our complicated scheduling needs, we are confident it will work for anyone.",
    author: "Judy Harris",
    company: "Practice Manager, Dargaville Hospital",
    logo: null
  },
  {
    quote: "We wanted more continuity of care built into the schedules, and RosterLab was easily able to incorporate that into the schedules they generated for us.",
    author: "Rebecca",
    company: "Staff Specialist Neonatologist, RPA Newborn Care",
    logo: null
  },
  {
    quote: "Since using RosterLab, I've felt that the schedules are better for my circadian rhythm, with less up-and-down cycling.",
    author: "Anthea",
    company: "MIT, Hawke's Bay Hospital",
    logo: null
  }
]

export default function USTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Loved by healthcare teams
          </h2>
          <p className="text-xl text-neutral-600">
            The only solution that generates & solves your schedule in minutes
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image placeholder */}
            <div className="order-2 lg:order-1 flex items-start justify-center">
              <Image
                src="/images/us-images/us-nurse.jpg"
                alt="Healthcare professional"
                width={400}
                height={500}
                className="w-full max-w-sm rounded-lg object-cover shadow-2xl hover:shadow-3xl transition-shadow duration-300"
                style={{ height: 'auto', maxHeight: '480px' }}
              />
            </div>
            
            {/* Speech Bubble */}
            <div className="relative order-1 lg:order-2">
              {/* Speech Bubble Background */}
              <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-lg">
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                  <div className="w-8 h-8 bg-white transform rotate-45"></div>
                </div>
                
                <div className="text-center">
                  <blockquote className="text-xl md:text-2xl text-neutral-700 mb-8 leading-relaxed">
                    &ldquo;{testimonials[currentIndex].quote}&rdquo;
                  </blockquote>
                  
                  <div className="flex flex-col items-center space-y-4">
                    {testimonials[currentIndex].logo && (
                      <div className="w-20 h-12 relative">
                        <Image
                          src={testimonials[currentIndex].logo}
                          alt={testimonials[currentIndex].company}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-neutral-900">
                        {testimonials[currentIndex].author}
                      </p>
                      <p className="text-neutral-600">
                        {testimonials[currentIndex].company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Navigation Dots */}
              <div className="flex justify-center gap-3 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`relative p-3 transition-colors ${
                      index === currentIndex ? '' : ''
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  >
                    <span
                      className={`block w-3 h-3 rounded-full transition-colors ${
                        index === currentIndex
                          ? 'bg-blue-600'
                          : 'bg-neutral-300 hover:bg-neutral-400'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Case Studies CTA */}
          <div className="text-center mt-16">
            <Button
              href="/us/book-a-demo"
              className="inline-flex items-center bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 rounded-full font-medium transition-all text-lg shadow-lg hover:shadow-xl"
            >
              Book a Demo
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}