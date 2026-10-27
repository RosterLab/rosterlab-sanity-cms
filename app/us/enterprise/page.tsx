import EnterprisePage from "@/app/enterprise/EnterprisePage";
import { enterpriseMetadata } from "@/app/enterprise/enterprise-metadata";

export const revalidate = 3600;
export const metadata = enterpriseMetadata(true);

export default function Page() {
  return <EnterprisePage isUS />;
}
