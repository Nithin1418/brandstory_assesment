import Home from "@/components/pages/Home";
import heroData from "@/data/hero.json";
import footerData from "@/data/footer.json";
import servicesData from "@/data/services.json";
import statisticsData from "@/data/statistics.json";
import faqData from "@/data/faq.json";

const experienceStat = statisticsData.stats.find((s) =>
  s.label.toLowerCase().includes("experience")
);
const yearsOfExp = experienceStat
  ? `${experienceStat.value}${experienceStat.suffix} Years`
  : "12+ Years";


const brandNameNormal = footerData.brandName
  ? footerData.brandName.charAt(0).toUpperCase() +
  footerData.brandName.slice(1).toLowerCase()
  : "Brand Story";

export const metadata = {
  title: `${heroData.titleText} | ${yearsOfExp} of Expertise`,
  description: heroData.paraText,
  keywords: [
    heroData.titleText.toLowerCase(),
    ...servicesData.services.map((s) => s.title.toLowerCase()),
    ...servicesData.services.map((s) => `${s.title.toLowerCase()} abu dhabi`),
    "digital marketing agency abu dhabi",
    "marketing agency uae",
  ],
  authors: [{ name: brandNameNormal }],
  creator: brandNameNormal,
  publisher: brandNameNormal,
  metadataBase: new URL("https://landing-page-assessment-ivory.vercel.app/"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://landing-page-assessment-ivory.vercel.app/",
    siteName: brandNameNormal,
    title: heroData.titleText,
    description: heroData.paraText,
    images: [
      {
        url: "/assets/header/logo.png",
        width: 1200,
        height: 630,
        alt: `${brandNameNormal} - ${heroData.titleText}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: heroData.titleText,
    description: heroData.paraText,
    images: ["/assets/header/logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};


const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Digital Marketing",
  provider: {
    "@type": "LocalBusiness",
    name: brandNameNormal,
    image: "https://landing-page-assessment-ivory.vercel.app/assets/header/logo.png",
    address: {
      "@type": "PostalAddress",
      streetAddress: footerData.contact.address,
      addressLocality: "Dubai",
      addressCountry: "AE",
    },
  },
  areaServed: {
    "@type": "City",
    name: "Abu Dhabi",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: servicesData.title,
    itemListElement: servicesData.services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.description,
      },
    })),
  },
};


const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://landing-page-assessment-ivory.vercel.app/#organization",
  name: brandNameNormal,
  description: heroData.paraText,
  url: "https://landing-page-assessment-ivory.vercel.app/",
  logo: "https://landing-page-assessment-ivory.vercel.app/assets/header/logo.png",
  image: "https://landing-page-assessment-ivory.vercel.app/assets/header/logo.png",
  address: {
    "@type": "PostalAddress",
    streetAddress: footerData.contact.address,
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  telephone: footerData.contact.phone,
  email: footerData.contact.email,
  foundingDate: "2014",
  sameAs: footerData.socials
    .map((s) => s.href)
    .filter((href) => href && href !== "#"),
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

// Breadcrumb Schema
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://landing-page-assessment-ivory.vercel.app/",
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Home />
    </>
  );
}