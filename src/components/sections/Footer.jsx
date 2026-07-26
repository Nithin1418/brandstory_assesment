import { MapPin } from "lucide-react";
import footerData from "@/data/footer.json";

// lucide-react no longer ships brand/logo icons, so social icons are inline SVGs
const LinkedinIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.11 20.45H3.56V9h3.55v11.45z" />
    </svg>
);
const YoutubeIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.51 3.5 12 3.5 12 3.5s-7.51 0-9.38.55A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.87.55 9.38.55 9.38.55s7.51 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81zM9.6 15.6V8.4l6.27 3.6-6.27 3.6z" />
    </svg>
);
const FacebookIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z" />
    </svg>
);
const InstagramIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.5.5.88 1.11 1.15 1.77.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 0 1-1.15 1.77 4.9 4.9 0 0 1-1.77 1.15c-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 0 1-1.77-1.15 4.9 4.9 0 0 1-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77A4.9 4.9 0 0 1 5.45.53c.64-.25 1.37-.42 2.43-.47C8.94.01 9.28 0 12 0zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-9.04a1.44 1.44 0 1 1 0-2.88 1.44 1.44 0 0 1 0 2.88z" />
    </svg>
);
const TwitterIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M18.9 2H22l-7.5 8.57L23 22h-6.9l-5.4-6.7L4.5 22H1.4l8.03-9.17L1 2h7.06l4.88 6.13L18.9 2zm-1.2 18h1.9L7.4 3.9H5.36L17.7 20z" />
    </svg>
);

const SOCIAL_ICONS = {
    Linkedin: LinkedinIcon,
    Youtube: YoutubeIcon,
    Facebook: FacebookIcon,
    Instagram: InstagramIcon,
    Twitter: TwitterIcon
};

export default function Footer() {
    return (
        <footer className="bg-[#131313] text-white">
            {/* Layer 2: main footer */}
            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-8 pb-12 pt-4">
                <div className="mx-auto pb-5  text-start text-xs tracking-wide text-gray-300">
                    Digital Marketing Agency Ajman
                </div>
                <div className="grid grid-cols-1 gap-10 md:grid-cols-5">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <h3 className="mb-4 text-xl font-bold tracking-wide">{footerData.brandName}</h3>
                        <p className="mb-5 text-sm leading-relaxed text-gray-400">
                            {footerData.brandDescription}
                        </p>
                        <button className="mb-6 rounded-full border border-gray-500 px-4 py-1.5 text-xs text-gray-200 transition-colors hover:bg-white hover:text-black">
                            Contact Sales
                        </button>

                        <h4 className="mb-2 text-sm font-bold">Head Office:</h4>
                        <p className="text-sm leading-relaxed text-gray-400">
                            {footerData.headOffice}
                        </p>
                    </div>

                    {/* Our Links */}
                    <div>
                        <h4 className="mb-4 text-sm font-bold">Our Links</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            {footerData.quickLinks.map((link) => (
                                <li key={link}>
                                    <a href="#" className="transition-colors hover:text-white">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="mb-4 text-sm font-bold">Services</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            {footerData.services.map((service) => (
                                <li key={service}>
                                    <a href="#" className="transition-colors hover:text-white">
                                        {service}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="mb-4 text-sm font-bold">Contact</h4>
                        <div className="space-y-4 text-sm text-gray-400">
                            <div>
                                <p className="text-gray-300">Phone:</p>
                                <p>{footerData.contact.phone}</p>
                            </div>
                            <div>
                                <p className="text-gray-300">Email:</p>
                                <p>{footerData.contact.email}</p>
                            </div>
                            <div>
                                <p className="text-gray-300">Address:</p>
                                <p className="leading-relaxed">
                                    {footerData.contact.address}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Follow us */}
                    <div>
                        <h4 className="mb-4 text-sm font-bold">Follow us</h4>
                        <ul className="space-y-3 text-sm">
                            {footerData.socials.map(({ label, href }) => {
                                const Icon = SOCIAL_ICONS[label];
                                return (
                                    <li key={label} className="flex items-center gap-2">
                                        <span className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-500">
                                            {Icon && <Icon className="h-3.5 w-3.5" />}
                                        </span>
                                        <a href={href} className="text-gray-300 transition-colors hover:text-white">
                                            {label}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            
            <div className="mt-10 border-t border-white/50 py-5 text-center text-xs text-gray-500">
                {footerData.copyright} |{" "}
                <a href="#" className="hover:text-white">Terms &amp; Conditions</a> |{" "}
                <a href="#" className="hover:text-white">Privacy Policy</a>
            </div>

            {/* Layer 3: partner badges */}
            <div className="bg-white py-6">
                <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-10 px-6 sm:px-8 lg:px-8">
                    <img src="/assets/footer/partners.png" alt="Awards" />
                </div>
            </div>

            {/* Layer 4: other locations */}
            <div
                className="relative overflow-hidden bg-[#0a0a0d] bg-contain bg-center bg-no-repeat py-16"
                style={{ backgroundImage: "url('/assets/footer/bg.png')" }}
            >
                <div className="pointer-events-none absolute inset-0 bg-black/80" />
                <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-8">
                    <h3 className="mb-10 text-center text-3xl font-bold">
                        {footerData.locationsTitle}
                    </h3>

                    <div className="grid grid-cols-1 place-items-center gap-x-12 gap-y-4 sm:grid-cols-3">
                        {footerData.locationColumns.map((col, i) => (
                            <ul key={i} className="space-y-4">
                                {col.map((item) => (
                                    <li key={item.label} className="flex items-start gap-2 text-sm">
                                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 fill-violet-600 text-violet-600" />
                                        <a
                                            href="#"
                                            className={`text-gray-100 hover:text-white ${item.underline ? "underline" : ""
                                                }`}
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}