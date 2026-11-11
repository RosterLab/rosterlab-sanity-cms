interface CaseStudyGateCheckProps {
  isUS?: boolean;
  slug: string;
  children: React.ReactNode;
}

/** Case studies are public and render immediately without an access form. */
export default function CaseStudyGateCheck({
  children,
}: CaseStudyGateCheckProps) {
  return <>{children}</>;
}
