/**
 * The boundary between two page sections: a full-bleed hairline.
 *
 * The marks that used to sit on this rule now belong to the sections
 * themselves — see `SectionCorners`, which puts four of them just inside each
 * section's corners instead of two on the edge between them.
 */
interface SectionDividerProps {
  className?: string;
}

export default function SectionDivider({
  className = "",
}: SectionDividerProps) {
  return (
    // Sits in the flow between two sections rather than being pinned inside
    // one, so a boundary is owned by the page and never drawn twice.
    <div
      aria-hidden="true"
      className={`pointer-events-none relative h-px w-full bg-gray-200 ${className}`}
    />
  );
}
