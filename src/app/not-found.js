import Link from "next/link";
import { Search } from "lucide-react";

export default function NotFound() {
    return (
        <main className="relative min-h-screen w-full overflow-hidden bg-[#0a0a0f] flex items-center justify-center px-6">
            {/* ambient glow */}
            <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-purple-600/20 blur-[120px]" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-purple-500/10 blur-[100px]" />

            <div className="relative z-10 w-full max-w-xl text-center">
                {/* Signature element: a "search" that returns nothing — ties to the SEO/search identity */}
                <div className="relative mx-auto mb-10 flex h-28 w-28 items-center justify-center">
                    {/* radar sweep rings, echoing the PPC target icon */}
                    <span className="absolute h-28 w-28 rounded-full border border-purple-500/20" />
                    <span className="absolute h-20 w-20 rounded-full border border-purple-500/30" />
                    <span className="absolute h-28 w-28 rounded-full border border-purple-500/40 animate-ping [animation-duration:2.5s]" />

                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full  bg-white/5 ring-1 ring-white/10">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-7 w-7 text-purple-400"
                        >
                            <circle cx="11" cy="11" r="7" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            <line x1="8" y1="8" x2="14" y2="14" />
                            <line x1="14" y1="8" x2="8" y2="14" />
                        </svg>
                    </div>
                </div>

                <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-purple-400">
                    Error 404
                </p>

                <h1 className="mb-4 text-4xl font-bold text-white sm:text-5xl">
                    This page didn&apos;t rank.
                </h1>

                <p className="mx-auto mb-10 max-w-md text-base leading-relaxed text-gray-400">
                    The page you&apos;re looking for isn&apos;t indexed here — it may have
                    been moved, renamed, or never existed. Let&apos;s get you back to
                    results that matter.
                </p>

                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                    <Link
                        href="/"
                        className="group inline-flex items-center gap-2 rounded-lg bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-purple-500"
                    >
                        Back to homepage
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        >
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </Link>


                </div>
            </div>
        </main>
    );
}