// src/app/page.jsx
import Home from "@/components/pages/Home";

export const metadata = {
  title: "Digital Marketing Agency In Abu Dhabi | 12+ Years of Expertise",
  description:
    "Leading digital marketing agency in Abu Dhabi offering SEO, PPC, and Social Media Marketing (SMM) services. 12+ years of experience helping brands grow with data-driven strategies.",
  keywords: [
    "digital marketing agency Abu Dhabi",
    "SEO agency Abu Dhabi",
    "PPC agency Abu Dhabi",
    "social media marketing Abu Dhabi",
    "marketing agency UAE",
  ],
  authors: [{ name: "Brand Story" }],
  creator: "Brand Story",
  publisher: "Brand Story",
  metadataBase: new URL("https://www.yourdomain.com"), // replace with real domain
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
    url: "https://www.yourdomain.com",
    siteName: "Brand Story",
    title: "Digital Marketing Agency In Abu Dhabi",
    description:
      "12+ years of expertise in SEO, PPC, and SMM. Discover why brands trust us as their digital marketing partner in Abu Dhabi.",
    images: [
      {
        url: "/assets/header/og-image.jpg", // add a real 1200x630 image here
        width: 1200,
        height: 630,
        alt: "Brand Story - Digital Marketing Agency In Abu Dhabi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing Agency In Abu Dhabi",
    description:
      "12+ years of expertise in SEO, PPC, and SMM. Discover why brands trust us as their digital marketing partner in Abu Dhabi.",
    images: ["/assets/header/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

// ---- JSON-LD Structured Data (component-driven) ----

// Mirrors ServicesSection.jsx -> services array (SEO, SMM, PPC)
const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Digital Marketing",
  provider: {
    "@type": "LocalBusiness",
    name: "Brand Story",
    image: "https://www.yourdomain.com/assets/header/logo.png",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Abu Dhabi",
      addressCountry: "AE",
    },
  },
  areaServed: {
    "@type": "City",
    name: "Abu Dhabi",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Digital Marketing Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Search Engine Optimization (SEO)",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Social Media Marketing (SMM)",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Pay-Per-Click Advertising (PPC)",
        },
      },
    ],
  },
};

// Mirrors StatisticsSection.jsx -> stats array (350+, 180+, 10+, 600+)
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.yourdomain.com/#organization",
  name: "Brand Story",
  description:
    "Digital marketing agency in Abu Dhabi with 12+ years of expertise in SEO, PPC, and SMM.",
  url: "https://www.yourdomain.com",
  logo: "https://www.yourdomain.com/assets/header/logo.png",
  image: "https://www.yourdomain.com/assets/header/logo.png",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Abu Dhabi",
    addressCountry: "AE",
  },
  foundingDate: "2013", // derived from "12+ years" — adjust to actual founding year
  sameAs: [
    // populate from Footer.jsx -> socials array
    // "https://www.facebook.com/yourpage",
    // "https://www.instagram.com/yourpage",
    // "https://www.linkedin.com/company/yourpage",
  ],
};

// Mirrors FaqSection.jsx -> faqs array
// NOTE: placeholder Q&A shown here — replace mainEntity items with the
// actual copy from FaqSection.jsx's `faqs` array to keep schema and UI in sync.
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What digital marketing services do you offer in Abu Dhabi?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We offer SEO, PPC (pay-per-click advertising), and social media marketing (SMM) services tailored for businesses in Abu Dhabi.",
      },
    },
    {
      "@type": "Question",
      name: "How many years of experience does your agency have?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We bring over 12 years of expertise helping brands grow through data-driven digital marketing strategies.",
      },
    },
    // Add remaining Q&A items from faqs array in FaqSection.jsx
  ],
};

// Mirrors CaseStudiesSection.jsx -> caseStudies array
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://www.yourdomain.com",
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