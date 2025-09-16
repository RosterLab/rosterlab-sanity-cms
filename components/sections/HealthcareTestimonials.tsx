"use client";

import { useState } from "react";
import Image from "next/image";
import Container from "@/components/ui/Container";

interface Testimonial {
  quote: string;
  author: string;
  company: string;
}

interface HealthcareTestimonialsProps {
  testimonials: Testimonial[];
}

export default function HealthcareTestimonials({
  testimonials,
}: HealthcareTestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 relative overflow-hidden py-20">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Loved by healthcare teams
          </h2>
          <p className="text-xl text-gray-600">
            Trusted by leading healthcare organizations worldwide
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image on left */}
            <div className="order-2 lg:order-1 flex items-center justify-center">
              <Image
                src="/images/illustration/Doctor.svg"
                alt="Healthcare professional illustration"
                width={400}
                height={400}
                className="w-full h-auto max-w-md"
              />
            </div>

            {/* Speech Bubble on right */}
            <div className="relative order-1 lg:order-2">
              {/* Speech Bubble Background */}
              <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-lg">
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 lg:left-8 lg:-bottom-0 lg:-translate-x-0 lg:-translate-y-1/2 lg:rotate-90">
                  <div className="w-8 h-8 bg-white transform rotate-45"></div>
                </div>

                <div className="text-center">
                  <blockquote className="text-xl md:text-2xl text-gray-700 mb-8 leading-relaxed">
                    &ldquo;{testimonials[currentIndex].quote}&rdquo;
                  </blockquote>

                  <div className="flex flex-col items-center space-y-4">
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">
                        {testimonials[currentIndex].author}
                      </p>
                      <p className="text-gray-600">
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
                    className={`relative p-3 transition-colors`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  >
                    <span
                      className={`block w-3 h-3 rounded-full transition-colors ${
                        index === currentIndex ? "bg-blue-600" : "bg-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
