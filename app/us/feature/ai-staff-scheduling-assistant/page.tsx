import OttoPage from "@/app/feature/ai-staff-rostering-assistant/OttoPage";
import { ottoMetadata } from "@/app/feature/ai-staff-rostering-assistant/otto-metadata";

export const metadata = ottoMetadata(true);

export default function Page() {
  return <OttoPage isUS />;
}
