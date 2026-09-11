import { createCaseStudyPage } from "@/components/resources/CaseStudyPage";

export const revalidate = 3600;

const { Page, generateMetadata, generateStaticParams } =
  createCaseStudyPage(true);
export { generateMetadata, generateStaticParams };
export default Page;
