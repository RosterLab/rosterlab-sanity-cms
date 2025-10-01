export interface ArticleSchemaProps {
  title: string;
  description: string;
  author: {
    name: string;
  };
  publishedTime: string;
  modifiedTime?: string;
  image?: string;
  url: string;
}

export default function ArticleSchema({
  title,
  description,
  author,
  publishedTime,
  modifiedTime,
  image,
  url,
}: ArticleSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description,
    author: {
      "@type": "Person",
      name: author.name,
    },
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
