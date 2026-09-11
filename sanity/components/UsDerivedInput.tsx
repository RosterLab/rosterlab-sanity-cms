import { useFormValue } from "sanity";
import type { StringInputProps, TextInputProps } from "sanity";
import {
  derivedUSFields,
  type DerivedUSFields,
} from "../../lib/localization/us-derived";

// Each US field shows, as its placeholder, exactly what the page will render
// while the field is left empty. Typing overrides it; clearing it returns the
// page to the derived value. This is why the US fields are not pre-filled:
// blank means "follow the global copy", so a later dictionary or terminology
// fix still reaches every article instead of being frozen per document.
//
// The placeholder comes from the same derivedUSFields() the site uses, so the
// preview cannot drift from the rendered output.
function useDerived(field: keyof DerivedUSFields): string | undefined {
  const document = useFormValue([]) as Record<string, unknown> | undefined;
  if (!document) return undefined;
  try {
    return derivedUSFields(document as never)[field];
  } catch {
    // A half-filled draft should never break the editor.
    return undefined;
  }
}

function withPlaceholder<P extends StringInputProps | TextInputProps>(
  props: P,
  placeholder: string | undefined,
) {
  if (!placeholder) return props.renderDefault(props);
  return props.renderDefault({
    ...props,
    elementProps: { ...props.elementProps, placeholder },
  } as P);
}

export function UsTitleInput(props: StringInputProps) {
  return withPlaceholder(props, useDerived("title"));
}

export function UsExcerptInput(props: TextInputProps) {
  return withPlaceholder(props, useDerived("excerpt"));
}

export function UsMetaTitleInput(props: StringInputProps) {
  return withPlaceholder(props, useDerived("metaTitle"));
}

export function UsMetaDescriptionInput(props: TextInputProps) {
  return withPlaceholder(props, useDerived("metaDescription"));
}

export function UsSlugInput(props: StringInputProps) {
  return withPlaceholder(props, useDerived("slug"));
}
