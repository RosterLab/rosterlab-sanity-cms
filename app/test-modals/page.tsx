import type { Metadata } from "next";
import TestModalsClient from "./TestModalsClient";

export const metadata: Metadata = {
  title: "Modal Preview (internal)",
  robots: { index: false, follow: false, nocache: true },
};

export default function TestModalsPage() {
  return <TestModalsClient />;
}
