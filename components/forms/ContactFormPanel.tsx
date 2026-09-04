import ContactFormWrapper from "@/components/forms/ContactFormWrapper";

interface ContactFormPanelProps {
  heading?: string;
  subheading?: string;
}

/**
 * CSS handed to HubSpot for the contact form.
 *
 * By default HubSpot renders this form inside an iframe, which page-level CSS
 * cannot reach. Passing `css` both switches it to an inline render and styles
 * it — which is why these rules live in a string rather than a <style> tag.
 *
 * The form is a grid so the fields pair up two to a row. HubSpot emits them in
 * its own order (email first), so `order` puts them in reading order instead.
 */
const FORM_CSS = `
  .hs-form {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1rem;
    font-family: Poppins, system-ui, -apple-system, sans-serif;
  }
  @media (max-width: 640px) {
    .hs-form { grid-template-columns: minmax(0, 1fr); }
  }
  .hs-form fieldset { max-width: none !important; }
  .hs-form fieldset .input { margin-right: 0 !important; }
  .hs_firstname { order: 1; }
  .hs_lastname { order: 2; }
  .hs_email { order: 3; }
  .hs_industry_dropdown { order: 4; }
  .hs_how_did_you_hear_about_us { order: 5; grid-column: 1 / -1; }
  .hs_message { order: 6; grid-column: 1 / -1; }
  .hs_submit { order: 7; grid-column: 1 / -1; }
  .hs-form-field > label {
    display: block;
    margin-bottom: 0.4rem;
    color: #404040;
    font-size: 0.875rem;
    font-weight: 500;
  }
  .hs-form-field > label span { color: inherit; }
  .hs-form-field > label .hs-form-required {
    display: inline;
    margin-left: 0.15rem;
    color: #2055ff;
  }
  .hs-input {
    width: 100% !important;
    box-sizing: border-box;
    padding: 0.7rem 0.9rem;
    background: #ffffff;
    border: 1px solid #e5e5e5;
    border-radius: 0.6rem;
    color: #171717;
    font-size: 1rem;
    box-shadow: none;
  }
  .hs-input:focus {
    outline: none;
    border-color: #2055ff;
    box-shadow: 0 0 0 3px rgba(32, 85, 255, 0.12);
  }
  .hs-input::placeholder { color: #a3a3a3; }
  textarea.hs-input { min-height: 120px; resize: vertical; }
  .hs-input[type="checkbox"], .hs-input[type="radio"] {
    width: auto !important;
    margin-right: 0.5rem;
    accent-color: #2055ff;
  }
  .inputs-list { margin: 0; padding: 0; list-style: none; }
  .inputs-list label, .inputs-list label span {
    display: inline;
    margin-bottom: 0;
    font-weight: 400;
    color: #404040;
  }
  .hs-error-msgs label, .hs-error-msgs label span {
    color: #dc2626;
    font-size: 0.8125rem;
    font-weight: 500;
  }
  .hs-richtext, .legal-consent-container, .submitted-message {
    color: #525252;
    font-size: 0.9375rem;
  }
  .hs-richtext a, .legal-consent-container a { color: #2055ff; }
  .hs-button.primary {
    padding: 0.8rem 1.6rem;
    background: #2055ff;
    border: none;
    border-radius: 0.6rem;
    color: #ffffff;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
  }
  .hs-button.primary:hover { background: #0a71ff; }
`;

/** Contact hero: heading, intro, and the HubSpot contact form. */
export default function ContactFormPanel({
  heading = "Speak to a rostering expert",
  subheading = "Fill out the form below and our team will be in touch to discuss how we can help you create the perfect roster for your team.",
}: ContactFormPanelProps = {}) {
  return (
    <div className="contact-form-panel">
      <h1 className="text-[36px] md:text-5xl font-bold text-neutral-900 leading-[1.1]">
        {heading}
      </h1>
      <p className="mt-4 text-lg text-neutral-600">{subheading}</p>

      <div className="mt-8">
        <ContactFormWrapper formCss={FORM_CSS} />
      </div>
    </div>
  );
}
