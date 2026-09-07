import ContactFormWrapper from "@/components/forms/ContactFormWrapper";

interface ContactFormPanelProps {
  heading?: string;
  subheading?: string;
}

/** Contact hero: heading, intro, and the contact form. */
export default function ContactFormPanel({
  heading = "Speak to a rostering expert",
  subheading = "Fill out the form below and our team will be in touch to discuss how we can help you create the perfect roster for your team.",
}: ContactFormPanelProps = {}) {
  return (
    <div>
      <h1 className="text-[36px] md:text-5xl font-bold text-neutral-900 leading-[1.1]">
        {heading}
      </h1>
      <p className="mt-4 text-lg text-neutral-600">{subheading}</p>

      <div className="mt-8">
        <ContactFormWrapper />
      </div>
    </div>
  );
}
