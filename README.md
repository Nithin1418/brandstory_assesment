# Brand Story Assessment

A high-fidelity, responsive Next.js web application built for a premier Digital Marketing Agency in Abu Dhabi. This project demonstrates state-of-the-art frontend development practices, combining modern layout structure, rich aesthetics, complex grid animations, smooth scroll performance, and comprehensive search engine optimization (SEO).

---
🔗 **Live Demo**: https://landing-page-assessment-ivory.vercel.app/

## 🚀 Key Features

*   **Premium Visual Experience**: Dark-themed layout using vibrant violet-to-indigo gradients, ambient glassmorphism, responsive backdrops, a twinkling particle/star SVG header arc (`ArchGlow`), and a dynamic columns grid with traveling shine lines (`GridBackground`).
*   **Interactive Cursor Follower**: Canvas-based trailing dot system styled in the `#7C4DFF` theme color, using high-fidelity linear interpolation (lerp) and quadratic curve rendering.
*   **Intro Entrance Transition**: A custom, multi-row staggered slide-out transition screen (`Loader`) that locks page scrolling during execution and seamlessly reveals the landing page.
*   **Fluid Animations & Parallax**: Responsive animations powered by **GSAP** and **ScrollTrigger** for word-by-word text slide-ups, card fades, and multi-layer parallax grids (`DigitalMarketingSection`, `WhatSetsUsApartSection`).
*   **Smooth Inertial Scroll**: Integrated **Lenis** smooth scroll system matching browser refresh rates.
*   **Touch-Friendly Carousels**: Infinite loop, autoplay-paired carousels utilizing **Swiper.js** for the Case Studies slider and Team profile list.
*   **Advanced SEO & Schema Layout**: Implemented semantic HTML5 tags, comprehensive meta configurations (OpenGraph, Twitter, canonical formats), and validated JSON-LD schema markers (LocalBusiness, Service catalog, breadcrumb trail, FAQ page) rendered server-side for maximum indexability.
*   **Decoupled Data Architecture**: Complete content separation; all copywriting copy, locations, navigation trees, and static data lists are isolated into independent, cleanly structured JSON files inside `src/data/` to keep UI components focused purely on presentation.
*   **Logo Optimization Tool**: Custom automated preprocessing script (`trim-brand-logos.mjs`) to auto-crop transparent whitespace padding from brand assets, ensuring uniform relative scale on the infinite brand marquee track.

---

## 🛠️ Technologies Used

### Core Framework & State
*   **Next.js v16.2.11** (App Router architecture)
*   **React v19.2.4** / **React DOM v19.2.4**
*   **Context API** (Global loading state management)

### Styling & Layout
*   **Tailwind CSS v4** (Utility-first fluid layouts)
*   **PostCSS** (@tailwindcss/postcss compiler plugin)
*   **Lucide React v1.26.0** (Vector icon package)

### Animations & Smooth Scrolling
*   **GSAP v3.15.0** (GreenSock Animation Platform)
*   **GSAP ScrollTrigger Plugin** (Viewport entry timelines)
*   **Lenis v1.3.25** (High-performance smooth scrolling engine)

### Carousels & Plugins
*   **Swiper v14.0.6** (Centred layouts, breakpointed responsive views, autoplay controls)
*   **Particles.js** (Dynamic background particle field in Statistics section)

### Build & Pre-processors
*   **Sharp v0.35.3** (Runtime next/image optimization and script cropping)
*   **ESLint** (Code quality lint verification)

---

## ⚙️ Project Setup & Installation

### Prerequisites
*   **Node.js**: `v18.x` or higher (`v20+` LTS recommended)
*   **npm**: `v9.x` or higher (or equivalent package manager)

### 1. Installation
Clone the repository and install project dependencies:
```bash
npm install
```

### 2. Development Mode
Run the local development server with hot-reload:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 3. Production Build
Compile the codebase for optimal production performance:
```bash
npm run build
```

### 4. Start Production Server
Launch the compiled application:
```bash
npm run start
```

### 5. Lint Verification
Scan files for styling and syntax violations:
```bash
npm run lint
```

### 6. Branding Asset Preprocessor Utility
If you add new brand logos (`/public/assets/brands/*.png`), they may have uneven transparent borders causing them to scale inconsistently. Run the preprocessor to automatically crop borders and re-add a uniform padding (e.g., 6px):
```bash
node trim-brand-logos.mjs
```
*Optional command flags:*
*   `--padding=X` (Define custom border padding in pixels, default is `6`)
*   `--dry-run` (Preview files that would be modified without writing changes)

---

## 📂 Folder Structure

```
brandstory-assesment/
├── .next/                         # Compiled Next.js build cache and server distribution files
├── node_modules/                  # Project package dependencies
├── public/                        # Static public assets served directly
│   └── assets/                    # Asset directories grouped by section usage
│       ├── bg/                    # Ambient background visuals and header grid backdrops
│       ├── brands/                # Client brand logos used in infinite looping marquees
│       ├── expert/                # Parallax cards and illustration graphics for Digital Marketing
│       ├── footer/                # Award badges and location maps
│       ├── header/                # Main header logotypes and OG images
│       ├── partner/               # Hand-drawn graphic highlights for Trusted Partner section
│       └── services/              # Interactive colored and white icons for Services cards
├── src/
│   ├── app/                       # Next.js App Router entrypoints (Server-side rendering)
│   │   ├── favicon.ico            # Site tab favicon icon
│   │   ├── globals.css            # Stylesheet containing Tailwind imports, animations, and variables
│   │   ├── layout.js              # Base HTML wrapper loading font variables and layout containers
│   │   ├── not-found.js           # Styled 404 branding page with customized navigation CTAs
│   │   └── page.js                # Root page configuration with SEO metadata and JSON-LD schemas
│   ├── components/                # Modular React UI component system (Client-side rendering)
│   │   ├── layout/
│   │   │   └── ClientLayout.jsx   # Root-level layout (Loader, Navbar, Footer, and global Contexts)
│   │   ├── pages/
│   │   │   └── Home.jsx           # Main page section composition and ScrollTrigger refresh hook
│   │   ├── UI/                    # Low-level visual elements and interactive design primitives
│   │   │   ├── ArchGlow.jsx       # Twinkling star generator and custom SVG arch stroke animation
│   │   │   ├── CursorFollower.jsx # Interactive trail chasing the mouse cursor using #7C4DFF theme
│   │   │   ├── GridBackground.jsx # Performance-tuned cell highlighter and vertical light streams
│   │   │   ├── Loader.jsx         # Staggered curtain loader blocking scroll on initial visit
│   │   │   ├── SplitTextTitle.jsx # Utility wrapper animating text headers word-by-word on scroll
│   │   │   └── TiltedLight.jsx    # Decorative ambient light stream overlay
│   │   └── sections/              # Mid-level responsive layout blocks representing page folds
│   │       ├── BrandMarquee.jsx   # Dual-direction infinite scrolling client marquee
│   │       ├── CaseStudiesSection.jsx # Slider displaying responsive clickable client case studies
│   │       ├── DigitalMarketingSection.jsx # Rich card layout featuring scroll-linked Y-parallax
│   │       ├── FaqSection.jsx     # Responsive grid accordion with custom CSS transitions
│   │       ├── Footer.jsx         # Site navigation links, location blocks, and contacts
│   │       ├── Hero.jsx           # Interactive top fold featuring header, copy, CTA, and brand marquee
│   │       ├── Navbar.jsx         # Sticky header with responsive navigation menu overlays
│   │       ├── ServicesSection.jsx # Cards displaying primary offerings with staggered entrance lints
│   │       ├── StatisticsSection.jsx # Metric count-up grids with floating particles backdrop
│   │       ├── TeamSection.jsx    # Loop-safe Swiper.js carousel for profile slides
│   │       ├── TrustedPartnerSection.jsx # Grid of company highlights with drawing overlays
│   │       └── WhatsetusApartSection.jsx # Hybrid vertical parallax paired with accordion items
│   ├── context/
│   │   └── LoadingContext.jsx     # Global provider sharing the startup loading animation state
│   └── data/                      # Isolated JSON data files matching section models
│       ├── brandMarquee.json
│       ├── caseStudies.json
│       ├── digitalMarketing.json
│       ├── faq.json
│       ├── footer.json
│       ├── hero.json
│       ├── navbar.json
│       ├── services.json
│       ├── statistics.json
│       ├── team.json
│       ├── trustedPartner.json
│       └── whatSetsUsApart.json
├── eslint.config.mjs              # ESLint directives
├── jsconfig.json                  # Path aliases (e.g. "@/*" pointing to "./src/*")
├── next.config.mjs                # Next.js configurations
├── postcss.config.mjs             # PostCSS configuration
├── package.json                   # Scripts, entrypoints, and dependencies manifest
├── README.md                      # Detailed project documentation
└── trim-brand-logos.mjs           # Automated Sharp logo cropping developer script
```

---

## 🧠 Architectural Decisions & Assumptions

### 1. Hybrid Component Architecture (Server vs. Client)
To maximize SEO performance and Core Web Vitals while retaining rich animations, the project follows a hybrid design pattern:
*   **Server Component (Default)**: `src/app/page.js` runs purely on the server. This allows generating metadata tags, social graphs, and structured JSON-LD schemas (local business parameters, FAQ lists, core services offer catalogs) immediately at compile time. Crawlers receive valid, fully structured SEO data without executing JavaScript.
*   **Client Components**: Components inside `src/components/` use `"use client"` where dynamic animation loops (GSAP/ScrollTrigger), smooth scroll bindings, client state context toggling, and sliders (Swiper.js) are initialized.

### 2. Context-Bound Animation Lifecycles
Single-page application navigation and React component re-rendering can lead to orphaned ScrollTrigger trackers, causing timeline bugs or memory leaks.
*   **Assumption**: Every timeline and ScrollTrigger is registered inside a `gsap.context()` wrapper within `useEffect` scopes.
*   **Result**: All active triggers, elements, and handlers are safely collected and destroyed during unmounting to ensure clean, leak-free layout changes.

### 3. Scroll Height Alignment (`ScrollTrigger.refresh`)
When using custom loaders that mask layout elements or dynamic accordion containers, content heights change post-mount. If GSAP calculates trigger positions before the page layout settles, triggers fire at incorrect offsets.
*   **Assumption**: A `ScrollTrigger.refresh()` timeline trigger is scheduled inside a `setTimeout` hook on `Home.jsx` exactly `100ms` after the introductory loading sequence transitions `loading` to `false`. This allows the browser page height to stabilize before locking scroll thresholds.

### 4. Interactive Loader and Scroll Locking
Initial visits perform heavy visual loads. Allowing the user to scroll before the transition completes disrupts layout alignments.
*   **Assumption**: The `Loader` component injects `overflow: hidden` onto `document.body` and `document.documentElement` immediately upon mounting.
*   **Result**: Page scrolling is locked. Once the staggered exit animation finishes, cleanups trigger and styles are cleared to hand page control over to the smooth scrolling library.

### 5. Content Decoupling (JSON Data Files)
Hardcoding textual headers and items directly into HTML structure leads to code bloat and maintenance hurdles.
*   **Decision**: Decouple static content from components. Text lines, button labels, asset files, and sub-items are externalized into `src/data/*.json` files. Changing site copy or adding items requires editing only the JSON models, protecting JSX files from structural changes.

### 6. Asset Marquee Normalization
Brand partner assets obtained from design exports frequently feature inconsistent boundary gaps and transparent margins, causing logos to align unevenly inside grid containers or marquee rows.
*   **Assumption**: We assume that all logos can be normalized programmatically.
*   **Decision**: We created a node preprocessor script using `sharp` (`trim-brand-logos.mjs`) to scan the asset directory, trim uneven margins from each logo's canvas, and re-inject a standardized spacing padding. This guarantees uniform sizes across all client brands in the marquee display.

### 7. Interactive Canvas-Based Cursor Follower
To provide an engaging, responsive micro-interaction that matches the modern high-end agency styling, we added a custom `<CursorFollower />` component.
*   **Decision**: Drawing on a fullscreen `<canvas>` layer is chosen for rendering trailing visual paths as it is more performant than using multiple individual CSS-translated DOM elements.
*   **Design & Theme**: The tail trail is rendered using linear interpolation (lerp) and quadratic curves styled in the `#7C4DFF` primary theme color, wrapping events with proper cleanup hooks on unmount.

### 8. Lenis Smooth Scroll & GSAP Ticker Synchronization
To deliver high-performance, inertial smooth scrolling, Lenis is integrated globally within `ClientLayout.jsx`.
*   **Synchronization**: Instead of running a standalone `requestAnimationFrame` loop, Lenis's animation frame ticks are bound directly to the `gsap.ticker` using `gsap.ticker.add()`.
*   **Result**: Scroll calculation ticks match the GSAP ScrollTrigger updates perfectly, preventing animation offsets and scroll stuttering. Ticker lag smoothing is disabled (`lagSmoothing(0)`) to maintain perfect alignment during high-load frame renders.
