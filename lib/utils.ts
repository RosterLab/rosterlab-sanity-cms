import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// Check if two dates are significantly different (more than 1 day apart)
export function shouldShowLastUpdated(
  publishedAt: string,
  updatedAt: string,
): boolean {
  const published = new Date(publishedAt).getTime();
  const updated = new Date(updatedAt).getTime();
  const oneDayInMs = 24 * 60 * 60 * 1000;

  return Math.abs(updated - published) > oneDayInMs;
}
