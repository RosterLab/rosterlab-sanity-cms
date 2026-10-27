import EnterprisePage from "./EnterprisePage";
import { enterpriseMetadata } from "./enterprise-metadata";

export const revalidate = 3600;
export const metadata = enterpriseMetadata();

export default function Page() {
  return <EnterprisePage />;
}
