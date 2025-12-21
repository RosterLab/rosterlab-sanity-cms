"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";

const testimonials = [
  {
    quote:
      "Rostering would take 7-8 days, now it takes 2-3 hours…allowing me to focus more on patient care.",
    author: "Mike",
    company: "Associate Clinical Manager Radiology",
    logo: "/images/logos/whanganui.png",
    caseStudyLink: null,
  },
  {
    quote:
      "RosterLab has saved me countless hours... I have recommended this service to everyone I know who writes medical rosters!",
    author: "Peter",
    company: "Senior Registrar ICU, Western Australia",
    logo: null,
    caseStudyLink: "/case-studies/icu-unit-western-australia",
  },
  {
    quote:
      "If Rosterlab can help with our complicated rostering needs, we are confident it will work for anyone.",
    author: "Judy Harris",
    company: "Practice Manager, Dargaville Hospital",
    logo: null,
    caseStudyLink: "/case-studies/dargaville-medical-centre-new-zealand",
  },
  {
    quote:
      "We wanted more continuity of care built into the rosters, and RosterLab was easily able to incorporate that into the rosters they generated for us.",
    author: "Rebecca",
    company: "Staff Specialist Neonatologist, RPA Newborn Care",
    logo: null,
    caseStudyLink: null,
  },
  {
    quote:
      "Since using RosterLab, I've felt that the rosters are better for my circadian rhythm, with less up-and-down cycling.",
    author: "Anthea",
    company: "MIT, Hawke's Bay Hospital",
    logo: null,
    caseStudyLink: null,
  },
  {
    quote:
      "RosterLab has been a game-changer for our radiology department with significant time-savings for our on-call rosters. It has allowed us to maximise leave provisions while maintaining a safer roster",
    author: "Dr. Fernando",
    company: "Junior Consultant, Auckland Tertiary Hospital",
    logo: null,
    caseStudyLink:
      "/case-studies/auckland-tertiary-hospital-improves-fairness-for-on-call-roster",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Loved by our users
          </h2>
          <p className="text-xl text-neutral-600">
            The only solution that generates & solves your roster in minutes
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image placeholder */}
            <div className="order-2 lg:order-1 flex items-center justify-center">
              <Image
                src="/images/illustration/Doctor.svg"
                alt="Healthcare professional illustration"
                width={400}
                height={400}
                className="w-full h-auto max-w-md"
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
                      {testimonials[currentIndex].caseStudyLink && (
                        <Link
                          href={testimonials[currentIndex].caseStudyLink}
                          className="inline-block mt-2 text-sm text-blue-600 hover:text-blue-700 hover:underline"
                        >
                          Read case study →
                        </Link>
                      )}
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
                      index === currentIndex ? "" : ""
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  >
                    <span
                      className={`block w-3 h-3 rounded-full transition-colors ${
                        index === currentIndex
                          ? "bg-blue-600"
                          : "bg-neutral-300"
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
