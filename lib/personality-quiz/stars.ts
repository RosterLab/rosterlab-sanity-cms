import type { CSSProperties } from "react";

function seededFraction(index: number, salt: number) {
  const value = Math.sin((index + 1) * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

export function createStars(count = 50) {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    left: `${(seededFraction(index, 1) * 100).toFixed(4)}%`,
    top: `${(seededFraction(index, 2) * 100).toFixed(4)}%`,
    animationDelay: `${(seededFraction(index, 3) * 5).toFixed(4)}s`,
    animationDuration: `${(3 + seededFraction(index, 4) * 4).toFixed(4)}s`,
  })) satisfies Array<{ id: number } & CSSProperties>;
}
