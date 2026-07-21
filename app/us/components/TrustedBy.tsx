import TrustedBy from "@/components/sections/TrustedBy";

interface USTrustedByProps {
  heading?: string | null;
  bare?: boolean;
}

export default function USTrustedBy({
  heading = "Trusted by leading healthcare teams",
  bare = false,
}: USTrustedByProps = {}) {
  return <TrustedBy heading={heading} bare={bare} />;
}
