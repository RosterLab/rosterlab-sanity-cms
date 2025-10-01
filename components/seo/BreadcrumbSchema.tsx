interface BreadcrumbItem {
  name: string;
  url?: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
  baseUrl?: string;
}

export default function BreadcrumbSchema({
  items,
  baseUrl = "https://rosterlab.com",
}: BreadcrumbSchemaProps) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url && { item: `${baseUrl}${item.url}` }),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  );
}
