import Link from "next/link";
import Image from "next/image";
import { client, urlFor } from "@/sanity/lib/client";
import { authorsQuery } from "@/sanity/lib/queries";
import Container from "@/components/ui/Container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authors | RosterLab",
  description:
    "Meet the team behind RosterLab - experts in workforce management, AI-powered rostering, and healthcare operations.",
  alternates: {
    canonical: "/authors",
  },
  openGraph: {
    title: "Authors | RosterLab",
    description:
      "Meet the team behind RosterLab - experts in workforce management, AI-powered rostering, and healthcare operations.",
    type: "website",
    url: "https://rosterlab.com/authors",
  },
};

export default async function AuthorsPage() {
  const authors = await client.fetch(authorsQuery);

  return (
    <div className="py-12 bg-gray-50">
      <Container>
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Authors
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the experts behind RosterLab's insights on workforce
            management, AI-powered rostering, and healthcare operations.
          </p>
        </div>

        {/* Authors Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {authors.map((author: any) => (
            <Link
              key={author._id}
              href={`/authors/${author.slug.current}`}
              className="group bg-white rounded-lg shadow-sm hover:shadow-lg transition-all overflow-hidden border border-gray-200"
            >
              {/* Author Image */}
              <div className="aspect-square relative overflow-hidden bg-gray-100">
                {author.image ? (
                  <Image
                    src={urlFor(author.image).width(400).height(400).url()}
                    alt={author.name}
                    width={400}
                    height={400}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">
                    <span className="text-6xl font-bold text-blue-600">
                      {author.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {/* Author Info */}
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {author.name}
                </h2>
                {author.title && (
                  <p className="text-blue-600 font-medium mb-3">
                    {author.title}
                  </p>
                )}
                {author.bio && author.bio[0] && (
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {author.bio[0].children
                      ?.map((child: any) => child.text)
                      .join(" ")}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {authors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No authors found.</p>
          </div>
        )}
      </Container>
    </div>
  );
}
