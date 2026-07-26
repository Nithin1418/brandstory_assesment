"use client";

import { useState, useEffect } from "react";
import navbarData from "@/data/navbar.json";

export default function Navbar({ loading }) {
    const [openMenu, setOpenMenu] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeMobileSubmenu, setActiveMobileSubmenu] = useState(null);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileMenuOpen]);

    return (
        <header
            className={`fixed top-0 z-50 w-full transition-all duration-1000 ease-out ${loading
                    ? "opacity-0 -translate-y-full"
                    : "opacity-100 translate-y-0"
                }`}
        >
            <nav className="flex items-center justify-between px-6 py-4 md:px-10 max-w-7xl mx-auto">
                {/* Logo */}
                <a href="/" className="flex items-center gap-1 shrink-0">
                    <img
                        src="/assets/header/logo.png"
                        alt="Brandstory"
                        className="h-8 md:h-9 w-auto"
                    />
                </a>

                {/* Center nav pill */}
                <ul className="hidden lg:flex items-center gap-1 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md px-2 py-1.5">
                    {navbarData.navItems.map((item) => (
                        <li
                            key={item.label}
                            className="relative"
                            onMouseEnter={() => setOpenMenu(item.label)}
                            onMouseLeave={() => setOpenMenu(null)}
                        >
                            <button
                                className="flex items-center gap-1 rounded-full px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-200"
                                aria-expanded={openMenu === item.label}
                            >
                                {item.label}
                                <svg
                                    width="10"
                                    height="10"
                                    viewBox="0 0 10 10"
                                    fill="none"
                                    className={`transition-transform duration-200 ${openMenu === item.label ? "rotate-180" : ""
                                        }`}
                                >
                                    <path
                                        d="M2 3.5L5 6.5L8 3.5"
                                        stroke="currentColor"
                                        strokeWidth="1.3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>

                            {openMenu === item.label && (
                                <div className="absolute left-1/2 top-full -translate-x-1/2 pt-3">
                                    <div className="w-56 rounded-2xl border border-white/10 bg-[#0d0a17]/95 backdrop-blur-xl p-2 shadow-[0_20px_60px_-15px_rgba(124,58,237,0.5)]">
                                        {item.items.map((sub) => (
                                            <a
                                                key={sub}
                                                href="#"
                                                className="block rounded-lg px-3 py-2 text-sm text-white/70 hover:text-white hover:bg-white/[0.08] transition-colors duration-150"
                                            >
                                                {sub}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>

                {/* Grouped actions on the right */}
                <div className="flex items-center gap-4">
                    {/* CTA */}
                    <a
                        href={navbarData.ctaLink}
                        className="hidden md:inline-flex shrink-0 items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-medium text-[#5b21b6] hover:bg-white/90 transition-colors duration-200"
                    >
                        {navbarData.ctaText}
                    </a>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="lg:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors duration-200 cursor-pointer"
                        aria-label="Open menu"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M4 6H20M4 12H20M4 18H20"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Mobile Sidebar Menu Backdrop Overlay */}
            <div
                className={`fixed inset-0 z-50 bg-black/60 backdrop-blur-md transition-opacity duration-500 lg:hidden ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Sidebar Menu Drawer */}
            <div
                className={`fixed top-0 right-0 z-50 h-screen w-screen bg-[#0d0a17]/98 p-6 flex flex-col backdrop-blur-xl shadow-2xl transition-transform duration-500 ease-out lg:hidden ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                    <a href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-1">
                        <img
                            src="/assets/header/logo.png"
                            alt="Brandstory"
                            className="h-8 w-auto"
                        />
                    </a>
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-white p-2 hover:bg-white/10 rounded-full transition-colors duration-200 cursor-pointer"
                        aria-label="Close menu"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M18 6L6 18M6 6L18 18"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                </div>

                {/* Drawer Nav Items */}
                <div className="flex-1 overflow-y-auto py-6 pr-2 space-y-4">
                    {navbarData.navItems.map((item) => {
                        const isOpen = activeMobileSubmenu === item.label;
                        return (
                            <div key={item.label} className="border-b border-white/5 pb-2">
                                <button
                                    onClick={() => setActiveMobileSubmenu(isOpen ? null : item.label)}
                                    className="flex items-center justify-between w-full py-2 text-left text-white/80 hover:text-white text-lg font-medium transition-colors cursor-pointer"
                                >
                                    <span>{item.label}</span>
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        className={`transition-transform duration-200 text-white/50 ${isOpen ? "rotate-180" : ""
                                            }`}
                                    >
                                        <path
                                            d="M6 9L12 15L18 9"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>

                                {/* Collapsible Submenu */}
                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[300px] mt-2 opacity-100" : "max-h-0 opacity-0"
                                        }`}
                                >
                                    <ul className="pl-4 space-y-2 border-l border-white/10 mb-2">
                                        {item.items.map((sub) => (
                                            <li key={sub}>
                                                <a
                                                    href="#"
                                                    onClick={() => setIsMobileMenuOpen(false)}
                                                    className="block py-1.5 text-sm text-white/60 hover:text-white transition-colors"
                                                >
                                                    {sub}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Drawer Footer CTA */}
                <div className="pt-6 border-t border-white/10">
                    <a
                        href={navbarData.ctaLink}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex w-full items-center justify-center rounded-full bg-white py-3.5 text-sm font-semibold text-[#5b21b6] hover:bg-white/90 transition-all duration-200 shadow-[0_4px_20px_rgba(255,255,255,0.15)]"
                    >
                        {navbarData.ctaText}
                    </a>
                </div>
            </div>
        </header>
    );
}