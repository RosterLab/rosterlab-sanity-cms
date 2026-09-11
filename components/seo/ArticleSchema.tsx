export interface ArticleSchemaProps {
  title: string;
  description: string;
  // A single author or several co-authors; schema.org accepts either shape.
  author: { name: string } | { name: string }[];
  publishedTime: string;
  modifiedTime?: string;
  image?: string;
  url: string;
  inLanguage?: string;
}

export default function ArticleSchema({
  title,
  description,
  author,
  publishedTime,
  modifiedTime,
  image,
  url,
  inLanguage = "en",
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    inLanguage,
    description: description,
    author: (Array.isArray(author) ? author : [author])
      .filter((person) => person?.name)
      .map((person) => ({ "@type": "Person", name: person.name })),
    publisher: {
      "@type": "Organization",
      name: "RosterLab",
      logo: {
        "@type": "ImageObject",
        url: "https://rosterlab.com/images/rosterlab_icon.svg",
      },
    },
    datePublished: publishedTime,
    ...(modifiedTime && { dateModified: modifiedTime }),
    ...(image && {
      image: {
        "@type": "ImageObject",
        url: image,
      },
    }),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
