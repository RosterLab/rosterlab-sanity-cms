import BlogPostPage, {
  getBlogPostMetadata,
} from "@/components/blog/BlogPostPage";
export { generateStaticParams } from "@/components/blog/BlogPostPage";
export const revalidate = 300;
type Props = { params: Promise<{ slug: string }> };
export const generateMetadata = ({ params }: Props) =>
  getBlogPostMetadata({ params });
export default function GlobalBlogPostPage({ params }: Props) {
  return <BlogPostPage params={params} />;
}
