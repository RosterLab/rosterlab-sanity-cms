import WhyRosterLabPage from "@/app/why-rosterlab/WhyRosterLabPage";
import { whyRosterLabMetadata } from "@/app/why-rosterlab/why-rosterlab-metadata";

export const metadata = whyRosterLabMetadata(true);

export default function Page() {
  return <WhyRosterLabPage isUS />;
}
