/**
 * ARIA utility functions for consistent accessibility patterns
 */

/**
 * Generate unique IDs for ARIA relationships
 */
let idCounter = 0;
export function generateAriaId(prefix: string): string {
  return `${prefix}-${++idCounter}`;
}

/**
 * Get navigation menu ARIA props
 * Use for dropdown menus and navigation components
 */
export function getMenuAriaProps(isExpanded: boolean, menuId: string) {
  return {
    trigger: {
      role: "button" as const,
      "aria-haspopup": "menu" as const,
      "aria-expanded": isExpanded,
      "aria-controls": menuId,
    },
    menu: {
      id: menuId,
      role: "menu" as const,
      "aria-orientation": "vertical" as const,
    },
    menuItem: {
      role: "menuitem" as const,
      tabIndex: -1 as const,
    },
  };
}

/**
 * Get dialog/modal ARIA props
 */
export function getDialogAriaProps(titleId: string, descriptionId?: string) {
  return {
    dialog: {
      role: "dialog" as const,
      "aria-modal": true,
      "aria-labelledby": titleId,
      "aria-describedby": descriptionId,
    },
    backdrop: {
      "aria-hidden": true,
    },
  };
}

/**
 * Get accordion ARIA props
 */
export function getAccordionAriaProps(
  isExpanded: boolean,
  buttonId: string,
  panelId: string,
) {
  return {
    button: {
      "aria-expanded": isExpanded,
      "aria-controls": panelId,
      id: buttonId,
    },
    panel: {
      id: panelId,
      role: "region" as const,
      "aria-labelledby": buttonId,
      hidden: !isExpanded,
    },
  };
}

/**
 * Get form field ARIA props for validation
 */
export function getFormFieldAriaProps(
  fieldId: string,
  isRequired: boolean,
  isInvalid: boolean,
  errorId?: string,
) {
  return {
    field: {
      id: fieldId,
      "aria-required": isRequired,
      "aria-invalid": isInvalid,
      "aria-describedby": isInvalid && errorId ? errorId : undefined,
    },
    error: errorId
      ? {
          id: errorId,
          role: "alert" as const,
        }
      : undefined,
  };
}

/**
 * Get button ARIA props based on state
 */
export function getButtonAriaProps(options: {
  isDisabled?: boolean;
  isPressed?: boolean;
  label?: string;
  controls?: string;
}) {
  const { isDisabled, isPressed, label, controls } = options;

  return {
    "aria-disabled": isDisabled,
    "aria-pressed": isPressed !== undefined ? isPressed : undefined,
    "aria-label": label,
    "aria-controls": controls,
  };
}

/**
 * Get live region props for dynamic content
 */
export function getLiveRegionProps(
  politeness: "polite" | "assertive" = "polite",
) {
  return {
    role: "status" as const,
    "aria-live": politeness,
    "aria-atomic": true,
  };
}

/**
 * Get loading state ARIA props
 */
export function getLoadingAriaProps(
  isLoading: boolean,
  loadingText = "Loading",
) {
  return {
    "aria-busy": isLoading,
    "aria-label": isLoading ? loadingText : undefined,
  };
}
