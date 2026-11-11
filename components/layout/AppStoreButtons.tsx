import Image from "next/image";

interface StoreLink {
  href: string;
  /** Brand-blue outlined badge, at least 2× its 40px display height. */
  badge: string;
  alt: string;
}

const STORES: StoreLink[] = [
  {
    href: "https://apps.apple.com/nz/app/rosterlab/id6448819917",
    badge: "/images/app-store-badge-blue.webp",
    alt: "Download on the App Store",
  },
  {
    href: "https://play.google.com/store/apps/details?id=com.rosterlab.app",
    badge: "/images/google-play-badge-blue.webp",
    alt: "Get it on Google Play",
  },
];

/**
 * App Store and Google Play badges in the brand blue, in place of the stores'
 * black badge artwork, so the footer matches the rest of the site.
 */
export default function AppStoreButtons() {
  return (
    <div className="flex flex-wrap gap-4 justify-center items-center">
      {STORES.map(({ href, badge, alt }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex rounded-lg transition-opacity hover:opacity-80"
        >
          <Image
            src={badge}
            alt={alt}
            width={145}
            height={40}
            className="h-10 w-auto"
          />
        </a>
      ))}
    </div>
  );
}
