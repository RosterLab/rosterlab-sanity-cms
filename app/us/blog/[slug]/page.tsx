import BlogPostPage, {
  getBlogPostMetadata,
} from "@/components/blog/BlogPostPage";
export { generateUSStaticParams as generateStaticParams } from "@/components/blog/BlogPostPage";
export const revalidate = 300;
type Props = { params: Promise<{ slug: string }> };
export const generateMetadata = ({ params }: Props) =>
  getBlogPostMetadata({ params, isUS: true });
export default function USBlogPostPage({ params }: Props) {
  return <BlogPostPage params={params} isUS />;
}
