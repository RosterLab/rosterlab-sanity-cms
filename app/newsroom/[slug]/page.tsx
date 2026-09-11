import { createNewsroomArticlePage } from "@/components/resources/NewsroomArticlePage";

const { Page, generateMetadata, generateStaticParams } =
  createNewsroomArticlePage(false);
export { generateMetadata, generateStaticParams };
export default Page;
