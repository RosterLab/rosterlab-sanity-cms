interface StructuredDataProps {
  type?: "organization" | "website" | "article";
  data?: Record<string, unknown>;
  isUSPage?: boolean;
}

export default function StructuredData({
  type = "organization",
  data,
  isUSPage = false,
}: StructuredDataProps) {

  const getStructuredData = () => {
    switch (type) {
      case "organization":
        return {
          "@context": "http://schema.org",
          "@type": "Organization",
          name: "RosterLab",
          legalName: "ROSTERLAB LIMITED",
          url: "https://rosterlab.com",
          logo: "https://rosterlab.com/images/favicon.png",
          ...(isUSPage && { inLanguage: "en-US" }),
          address: {
            "@type": "PostalAddress",
            streetAddress: "Level 1, 22 The Strand",
            addressLocality: "Parnell",
            addressRegion: "Auckland",
            postalCode: "1010",
            addressCountry: "NZ",
          },
          description:
            "RosterLab is a software company specialising in roster optimisation and management software. Our cutting-edge AI is inspired by Dr Isaac Cleland's research from the University of Auckland. We're dedicated to improving your rosters and refining your user experience.",
          email: "hello@rosterlab.com",
          foundingDate: "2021-12",
          areaServed: "Global",
          sameAs: [
            "https://www.linkedin.com/company/rosterlab",
            "https://www.crunchbase.com/organization/rosterlab",
            "https://opencorporates.com/companies/nz/8065817",
            "https://play.google.com/store/apps/details?id=com.rosterlab.app",
            "https://apps.apple.com/app/rosterlab/id6448819917",
          ],
          funder: [
            {
              "@type": "Organization",
              name: "Edmund Hillary Fellowship",
              url: "https://ehf.org",
            },
          ],
        };
      case "website":
        return {
          "@context": "http://schema.org",
          "@type": "WebSite",
          name: "RosterLab",
          url: "https://rosterlab.com",
          description:
            "Complex solutions made easy with AI-powered scheduling for healthcare teams",
          ...(isUSPage && { inLanguage: "en-US" }),
          publisher: {
            "@type": "Organization",
            name: "RosterLab",
          },
        };
      default:
        return data || {};
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData()),
      }}
    />
  );
}
