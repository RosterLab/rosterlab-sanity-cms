import OttoPage from "./OttoPage";
import { ottoMetadata } from "./otto-metadata";

export const metadata = ottoMetadata();

export default function Page() {
  return <OttoPage />;
}
