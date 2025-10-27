"use client";

import { useState, useCallback } from "react";

/**
 * Hook for managing ARIA expanded state for dropdowns, accordions, etc.
 * Provides consistent state management and keyboard handling.
 *
 * @example
 * const { isExpanded, toggle, expand, collapse, ariaProps } = useAriaExpanded();
 * <button {...ariaProps.trigger}>Toggle</button>
 * <div {...ariaProps.content}>Content</div>
 */
export function useAriaExpanded(defaultExpanded = false) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const expand = useCallback(() => setIsExpanded(true), []);
  const collapse = useCallback(() => setIsExpanded(false), []);
  const toggle = useCallback(() => setIsExpanded((prev) => !prev), []);

  const ariaProps = {
    trigger: {
      "aria-expanded": isExpanded,
      onClick: toggle,
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        } else if (e.key === "Escape" && isExpanded) {
          e.preventDefault();
          collapse();
        }
      },
    },
    content: {
      hidden: !isExpanded,
      "aria-hidden": !isExpanded,
    },
  };

  return { isExpanded, toggle, expand, collapse, ariaProps };
}
