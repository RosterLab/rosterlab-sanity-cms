'use client'

import { useState } from 'react'
import Image from 'next/image'
import Container from '@/components/ui/Container'

const testimonials = [
  {
    quote: "Rostering would take 7-8 days, now it takes 2-3 hours…allowing me to focus more on patient care.",
    author: "Mike",
    company: "Associate Clinical Manager Radiology",
    logo: "/images/logos/whanganui.png"
  },
  {
    quote: "RosterLab has saved me countless hours... I have recommended this service to everyone I know who writes medical rosters!",
    author: "Peter",
    company: "Senior Registrar ICU, Western Australia", 
    logo: "/images/logos/western.png"
  },
  {
    quote: "RosterLab has been a pleasure to work with, and we highly recommend it to other medical practices and businesses.",
    author: "Practice Manager",
    company: "Dargaville Hospital",
    logo: "/images/logos/dargaville.png"
  },
  {
    quote: "If Rosterlab can help with our complicated rostering needs, we are confident it will work for anyone.",
    author: "Judy Harris",
    company: "Practice Manager, Dargaville Hospital",
    logo: "/images/logos/dargaville.png"
  }
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Loved by our Users
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
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
                  <div className="w-20 h-12 relative">
                    <Image
                      src={testimonials[currentIndex].logo}
                      alt={testimonials[currentIndex].company}
                      fill
                      className="object-contain"
                    />
                  </div>
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
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-blue-600' : 'bg-neutral-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}