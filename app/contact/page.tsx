import Image from "next/image";
import Container from "@/components/ui/Container";
import ContactFormPanel from "@/components/forms/ContactFormPanel";
import SiteLayout from "@/components/layout/SiteLayout";
import FAQAccordion from "@/components/ui/FAQAccordion";
import Button from "@/components/ui/Button";
import { HiExternalLink } from "react-icons/hi";
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

      {/*
        Hero: the form column runs inside the container, the product shot
        bleeds off the right edge of the viewport beside it. On desktop the
        shot is absolutely positioned so it fills the section's full height
        whatever the form does; below `lg` it drops underneath as a band.
      */}
      <section className="relative bg-white">
        <Container className="lg:px-12 xl:px-20">
          <div className="py-12 md:py-16 lg:w-1/2 lg:pr-12">
            <ContactFormPanel
              heading="Speak to a rostering expert"
              subheading="Fill out the form below and our team will be in touch to discuss how we can help you create the perfect roster for your team."
            />

            <div className="mt-10 grid grid-cols-1 gap-8 border-t border-neutral-200 pt-8 sm:grid-cols-2">
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  Headquarters
                </h2>
                <p className="mt-3 text-neutral-700">
                  314/380 Khyber Pass Road
                  <br />
                  Newmarket, Auckland 1023, NZ
                </p>
              </div>

              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-blue-600">
                  Follow us
                </h2>
                <div className="mt-3 flex items-center gap-3">
                  <a
                    href="https://www.linkedin.com/company/rosterlab"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="RosterLab on LinkedIn"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <FaLinkedin className="h-5 w-5" />
                  </a>
                  <a
                    href="https://facebook.com/p/RosterLab-100084645549356/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="RosterLab on Facebook"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <FaFacebook className="h-5 w-5" />
                  </a>
                  <a
                    href="https://instagram.com/rosterlab"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="RosterLab on Instagram"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                  >
                    <FaInstagram className="h-5 w-5" />
                  </a>
                </div>
                <p className="mt-4 text-neutral-700">
                  <a
                    href="mailto:support@rosterlab.com"
                    className="hover:text-blue-600 transition-colors"
                  >
                    support@rosterlab.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </Container>

        <div className="absolute inset-y-0 right-0 hidden w-1/2 lg:block">
          <Image
            src="/images/about/product-suite.webp"
            alt="The RosterLab app on laptops, tablets and phones: roster solutions, staff requests and the Otto AI assistant"
            fill
            sizes="50vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="relative h-56 sm:h-72 lg:hidden">
          <Image
            src="/images/about/product-suite.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-neutral-50 py-16 md:py-20">
        <Container className="lg:px-12 xl:px-20">
          <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
            Frequently Asked Questions
          </h2>
          <div className="mt-8">
            <FAQAccordion items={faqItems} variant="flat" />
          </div>
          <a
            href="https://help.rosterlab.com/en/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 text-blue-600 hover:underline"
          >
            Visit the Help Centre
            <HiExternalLink className="w-4 h-4" />
          </a>
        </Container>
      </section>

      {/* Closing CTA */}
      <section
        className="py-16 md:py-20"
        style={{
          background:
            "linear-gradient(90deg, #2055FF 0%, #0A71FF 35%, #00A3FF 65%, #00E5E0 100%)",
        }}
      >
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              The AI rostering platform built to handle your complexity
            </h2>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button
                href="/book-a-demo"
                className="bg-white text-neutral-900 hover:bg-neutral-100"
                analyticsLabel="Book a demo"
                analyticsLocation="Contact Page CTA"
              >
                Book a demo
              </Button>
              <Button
                href="/pricing"
                className="bg-transparent border border-white/70 text-white hover:bg-white/10"
                analyticsLabel="View pricing"
                analyticsLocation="Contact Page CTA"
              >
                View pricing
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Hidden Breadcrumb Schema for SEO */}

      <BreadcrumbSchema
        items={[{ name: "Home", url: "/" }, { name: "Contact" }]}
      />
    </SiteLayout>
  );
}
