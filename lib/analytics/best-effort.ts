export function runBestEffort(label: string, operation: () => void): void {
  try {
    operation();
  } catch (error) {
    console.warn(`[Analytics] ${label} failed`, error);
  }
}
