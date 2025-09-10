import Container from "@/components/ui/Container";
import ContactFormWrapper from "@/components/forms/ContactFormWrapper";
import SiteLayout from "@/components/layout/SiteLayout";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { HiLocationMarker, HiClock, HiCheck } from "react-icons/hi";
import { FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";

export const metadata = {
  title: "Contact Us - RosterLab",
  description:
    "Contact us about your staff scheduling challenges using our contact form or live chat. We will aim to get back to you within 24 hours.",
  alternates: {
    canonical: 'https://rosterlab.com/us/contact',
  },
  openGraph: {
    title: "Contact Us - RosterLab",
    description:
      "Contact us about your staff scheduling challenges using our contact form or live chat. We will aim to get back to you within 24 hours.",
    type: 'website',
    url: 'https://rosterlab.com/us/contact',
    images: [
      {
        url: "/images/og images/Contact.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us - RosterLab",
    description:
      "Contact us about your staff scheduling challenges using our contact form or live chat. We will aim to get back to you within 24 hours.",
    images: ["/images/og images/Contact.png"],
  },
};

const faqItems = [
  {
    question: "How quickly can we get started?",
    answer:
      "We will collaborate with you to gather all the information and data needed for your schedule. We’ll work alongside you on the first schedule and provide support until you’re confident using the new solution.",
  },
  {
    question: "Do you offer training?",
    answer:
      "Yes! We provide comprehensive training and handovers for paid users and ongoing support to ensure success.",
  },
  {
    question: "Can you handle complex, hard schedules?",
    answer:
      "Our AI handles all your complex and hard requirements, making the rest easy for you to manage.",
  },
];

export default function ContactPage() {
  return (
    <SiteLayout>
      <div className="py-16 bg-neutral-50 min-h-screen">
        <Container>
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-[40px] sm:text-5xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
              Speak to a scheduling{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #2055FF 0%, #0A71FF 35%, #00A3FF 65%, #00E5E0 100%)",
                }}
              >
                expert
              </span>
            </h1>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto mb-12">
              We&apos;re here to help you solve your complex challenges and
              requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* HubSpot Demo Form */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                Speak to us about your scheduling challenges
              </h2>
              <p className="text-neutral-600 mb-6">
                Fill out the form below and our team will be in touch to discuss
                how we can help you create the perfect schedule for your team.
              </p>
              <ContactFormWrapper />
            </div>

            {/* FAQ Section */}
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                  Frequently Asked Questions
                </h2>

                <FAQAccordion items={faqItems} />
              </div>
            </div>
          </div>

          {/* Benefits Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <HiClock className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-green-800 mb-1">
                90% Time Saving
              </h3>
              <p className="text-green-700 text-sm">
                Generate schedules in minutes, not hours
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <HiCheck className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-blue-800 mb-1">
                100% Compliant
              </h3>
              <p className="text-blue-700 text-sm">
                Guaranteed to meet union and contract obligations
              </p>
            </div>
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <HiCheck className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-purple-800 mb-1">
                Better Staff Satisfaction
              </h3>
              <p className="text-purple-700 text-sm">
                Fairer, safer schedules for your team
              </p>
            </div>
          </div>
        </Container>
      </div>
    </SiteLayout>
  );
}
