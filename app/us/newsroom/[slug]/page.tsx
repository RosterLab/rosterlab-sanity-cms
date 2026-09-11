import { createNewsroomArticlePage } from "@/components/resources/NewsroomArticlePage";

const { Page, generateMetadata, generateStaticParams } =
  createNewsroomArticlePage(true);
export { generateMetadata, generateStaticParams };
export default Page;
