// US-only presentation for shared legacy HubSpot forms. Keep option values and
// consent text intact so existing CRM properties and workflows receive the same
// data. Uses the supported embed translations and onFormReady callback:
// https://developers.hubspot.com/docs/cms/start-building/features/forms/legacy-forms
type FormReference = HTMLFormElement | { 0?: HTMLFormElement };

const industryLabels: Record<string, string> = {
  "[Healthcare] Aged Care": "[Healthcare] Senior Care",
  "[Healthcare] Anaesthesia": "[Healthcare] Anesthesia",
  "[Non-Healthcare] Call Centres": "[Non-Healthcare] Call Centers",
};

export function usHubSpotFormOptions(submitText?: string) {
  return {
    locale: "en",
    ...(submitText ? { submitText } : {}),
    translations: {
      en: {
        fieldLabels: { industry_dropdown: "Industry" },
        ...(submitText ? { submitText } : {}),
      },
    },
    onFormReady(reference: FormReference) {
      // HubSpot may provide a native form or a jQuery-style wrapper. Avoid
      // instanceof checks because the form may live in an about:blank iframe.
      const form = "querySelectorAll" in reference ? reference : reference[0];
      if (!form) return;
      for (const option of form.querySelectorAll<HTMLOptionElement>(
        'select[name="industry_dropdown"] option',
      )) {
        const label = industryLabels[option.value];
        if (label) option.textContent = label;
      }
      // Some iframe embeds ignore field-label translations. Only replace the
      // label's text node, preserving its required marker and accessibility.
      for (const label of form.querySelectorAll(
        'label[for^="industry_dropdown"]',
      )) {
        const walker = form.ownerDocument.createTreeWalker(
          label,
          4 /* SHOW_TEXT */,
        );
        while (walker.nextNode()) {
          const node = walker.currentNode;
          if (node.nodeValue?.includes("Industry (Dropdown)")) {
            node.nodeValue = node.nodeValue.replace(
              "Industry (Dropdown)",
              "Industry",
            );
          }
        }
      }
      if (submitText) {
        const button = form.querySelector<HTMLInputElement>(
          'input[type="submit"]',
        );
        if (button) button.value = submitText;
      }
    },
  };
}
