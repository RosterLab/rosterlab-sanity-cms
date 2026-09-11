import { Fragment } from "react";
import Link from "next/link";
import {
  postAuthors,
  FALLBACK_AUTHOR,
  type PostAuthor,
} from "@/lib/posts/authors";

// One byline for one or many authors, each linked to their author page:
// "Ana Silva", "Ana Silva and Bo Chen", "Ana Silva, Bo Chen and Dev Patel".
// Author pages are not localized, so the same links serve the US routes.
export default function AuthorLinks({
  post,
  className,
}: {
  post: { authors?: PostAuthor[] | null; author?: PostAuthor | null };
  className?: string;
}) {
  const authors = postAuthors(post);
  if (!authors.length)
    return <span className={className}>{FALLBACK_AUTHOR}</span>;

  return (
    <span className={className}>
      {authors.map((author, index) => (
        <Fragment key={author.slug?.current || author.name || index}>
          {index > 0 && (index === authors.length - 1 ? " and " : ", ")}
          {author.slug?.current ? (
            <Link
              href={`/authors/${author.slug.current}`}
              className="hover:underline"
            >
              {author.name}
            </Link>
          ) : (
            author.name
          )}
        </Fragment>
      ))}
    </span>
  );
}
