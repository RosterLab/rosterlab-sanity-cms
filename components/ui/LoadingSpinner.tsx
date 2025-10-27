import { cn } from "@/lib/utils";
import { getLoadingAriaProps } from "@/lib/utils/aria";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
}

/**
 * Accessible loading spinner with proper ARIA attributes
 *
 * @example
 * ```tsx
 * <LoadingSpinner size="md" label="Loading content" />
 * ```
 */
export default function LoadingSpinner({
  size = "md",
  label = "Loading",
  className,
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
  };

  const ariaProps = getLoadingAriaProps(true, label);

  return (
    <div
      className={cn("flex items-center justify-center", className)}
      role="status"
      {...ariaProps}
    >
      <div
        className={cn(
          "animate-spin rounded-full border-blue-600 border-t-transparent",
          sizeClasses[size],
        )}
        aria-hidden="true"
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}
