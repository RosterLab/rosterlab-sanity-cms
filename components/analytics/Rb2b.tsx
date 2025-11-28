import Script from "next/script";

interface Rb2bProps {
  accountKey: string;
}

/**
 * Rb2b B2B Visitor Identification
 *
 * Identifies anonymous B2B website visitors by revealing company information
 * and contact details for potential leads.
 */
export default function Rb2b({ accountKey }: Rb2bProps) {
  return (
    <Script
      id="reb2b-tracker"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          !function(key) {
            if (window.reb2b) return;
            window.reb2b = {loaded: true};
            var s = document.createElement("script");
            s.async = true;
            s.src = "https://b2bjsstore.s3.us-west-2.amazonaws.com/b/" + key + "/" + key + ".js.gz";
            document.getElementsByTagName("script")[0].parentNode.insertBefore(s, document.getElementsByTagName("script")[0]);
          }("${accountKey}");
        `,
      }}
    />
  );
}
