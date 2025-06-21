export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Header and Footer are now rendered in the root layout
  return <>{children}</>
}