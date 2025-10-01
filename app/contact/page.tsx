import Container from "@/components/ui/Container";
import ContactFormWrapper from "@/components/forms/ContactFormWrapper";
import SiteLayout from "@/components/layout/SiteLayout";
import FAQAccordion from "@/components/ui/FAQAccordion";
import { HiLocationMarker, HiClock, HiCheck } from "react-icons/hi";
import { FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import HubSpotFormListener from "@/components/analytics/HubSpotFormListener";
import { withHreflang } from "@/components/seo/HreflangTags";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata = withHreflang(
  {
    title: "Contact Us - Get Help with Your Team Rosters",
    description:
      "Contact the team about your staff rostering needs using our contact form or live chat feature. We will aim to get back to you within 24 hours.",
    alternates: {
      canonical: "https://rosterlab.com/contact",
    },
    openGraph: {
      title: "Contact Us - Get Help with Your Team Rosters",
      description:
        "Contact the team about your staff rostering needs using our contact form or live chat feature. We will aim to get back to you within 24 hours.",
      type: "website",
      url: "https://rosterlab.com/contact",
      images: [
        {
          url: "/images/og-images/Contact.png",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Contact Us - Get Help with Your Team Rosters",
      description:
        "Contact the team about your staff rostering needs using our contact form or live chat feature. We will aim to get back to you within 24 hours.",
      images: ["/images/og-images/Contact.png"],
    },
  },
  "/contact",
);

const faqItems = [
  {
    question: "How quickly can we get started?",
    answer:
      "We will collaborate with you to gather all the information and data needed for your roster. We’ll work alongside you on the first roster and provide support until you’re confident using the new solution.",
  },
  {
    question: "Do you offer training?",
    answer:
      "Yes! We provide comprehensive training and handovers for paid users and ongoing support to ensure success.",
  },
  {
    question: "Can you handle complex, hard rosters?",
    answer:
      "Our AI handles all your complex and hard requirements, making the rest easy for you to manage.",
  },
];

export default function ContactPage() {
  return (
    <SiteLayout>
      <HubSpotFormListener />
      <div className="py-16 bg-neutral-50 min-h-screen">
        <Container>
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-[40px] sm:text-5xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6 leading-tight">
              Speak to a rostering{" "}
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
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              We&apos;re here to help you solve your complex challenges and
              requirements.
            </p>
          </div>

          {/* Benefits Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <HiClock className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-green-800 mb-1">
                90% Time Saving
              </h3>
              <p className="text-green-700 text-sm">
                Generate rosters in minutes, not hours
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
                Fairer, safer rosters for your team
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* HubSpot Demo Form */}
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                Speak to us about your rostering challenges
              </h2>
              <p className="text-neutral-600 mb-6">
                Fill out the form below and our team will be in touch to discuss
                how we can help you create the perfect roster for your team.
              </p>
              <ContactFormWrapper />
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                  Get in touch
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                        <HiLocationMarker className="w-5 h-5 text-primary-600" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-neutral-900 mb-1">
                        Headquarters
                      </h3>
                      <p className="text-neutral-600">
                        314/380 Khyber Pass Road
                        <br />
                        Newmarket, Auckland 1023
                        <br />
                        New Zealand
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <h3 className="text-xl font-bold text-neutral-900 mb-3">
                        Follow Us
                      </h3>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <a
                      href="https://www.linkedin.com/company/rosterlab"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center hover:bg-primary-200 transition-colors"
                    >
                      <FaLinkedin className="w-5 h-5 text-primary-600" />
                    </a>
                    <a
                      href="https://facebook.com/p/RosterLab-100084645549356/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center hover:bg-primary-200 transition-colors"
                    >
                      <FaFacebook className="w-5 h-5 text-primary-600" />
                    </a>
                    <a
                      href="https://instagram.com/rosterlab"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center hover:bg-primary-200 transition-colors"
                    >
                      <FaInstagram className="w-5 h-5 text-primary-600" />
                    </a>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                  Frequently Asked Questions
                </h2>

                <FAQAccordion items={faqItems} />
              </div>
            </div>
          </div>
        </Container>
      </div>
      

      {/* Hidden Breadcrumb Schema for SEO */}

      <BreadcrumbSchema 

        items={[
          { name: "Home", url: "/" },
          { name: "Contact" }

        ]}

      />

    </SiteLayout>
  );
}
