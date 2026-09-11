import { createCaseStudyPage } from "@/components/resources/CaseStudyPage";

export const revalidate = 3600;

const { Page, generateMetadata, generateStaticParams } =
  createCaseStudyPage(false);
export { generateMetadata, generateStaticParams };
export default Page;
