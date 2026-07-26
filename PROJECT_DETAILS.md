# Project Documentation & Architecture Details

This documentation provides an in-depth breakdown of the **Brand Story Assessment** project. It details the technologies used, folder organization, structural architecture, and component-level specifications (including state, props, static data, and animations).

---

## 1. Project Overview & Technologies

This is a modern web application built using **Next.js** (App Router version 16.2.11) and styled with **Tailwind CSS v4**. It features high-fidelity smooth scrolling, fluid scroll-triggered animations, interactive particle fields, responsive sliders, and complex grid visuals.

### Core Stack & Dependencies
*   **Framework**: [Next.js v16.2.11](https://nextjs.org/) (App Router)
*   **State & Render Libraries**: [React v19.2.4](https://react.dev/), [React DOM v19.2.4](https://react.dev/reference/react-dom)
*   **Animations**: [GSAP v3.15.0](https://gsap.com/) (GreenSock Animation Platform) + `ScrollTrigger` plugin for advanced scroll animations and timeline controls.
*   **Smooth Scroll**: [Lenis v1.3.25](https://lenis.darkroom.engineering/) for high-performance inertial scrolling.
*   **Sliders & Carousels**: [Swiper v14.0.6](https://swiperjs.com/) for touch-friendly horizontal sliders.
*   **Iconography**: [Lucide React v1.26.0](https://lucide.dev/) for standard UI vector icons.
*   **Image Processing**: [Sharp v0.35.3](https://sharp.pixelplumbing.com/) for high-performance runtime image compression and optimization.
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with `@tailwindcss/postcss` for state-of-the-art styling.

---

## 2. Directory Structure

The project directory follows Next.js App Router conventions with components modularized by role (Pages, Layouts, high-level Sections, and low-level visual UI primitives).

```
brandstory_assesment/
├── .next/                      # Compiled Next.js build cache and production server build
├── node_modules/               # Installed npm packages and dependencies
├── public/                     # Static assets served directly (icons, logo images, backdrops)
│   └── assets/                 # Structured media assets grouped by section usage
│       ├── bg/                 # Background grid backdrops and banner backgrounds
│       ├── brands/             # Client brand logo images used in the marquee ticker
│       ├── expert/             # Images and overlay graphics for the Digital Marketing section
│       ├── footer/             # Awards/partners badges and background graphics
│       ├── header/             # Header branding logo
│       ├── partner/            # Core value graphics for the Trusted Partner section
│       └── services/           # Hover-state colored & white icons for the Services section
├── src/
│   ├── app/                    # Entry folder for Next.js App Router routes
│   │   ├── favicon.ico         # Website favicon
│   │   ├── globals.css         # Main stylesheet declaring variables and Tailwind imports
│   │   ├── layout.js           # Core layout loading Hanken Grotesk primary font
│   │   ├── not-found.js        # Fallback 404 page with high-fidelity branding style
│   │   └── page.js             # Root landing page, importing and rendering Home page client-side
│   ├── components/
│   │   ├── layout/
│   │   │   └── ClientLayout.jsx # Handles LoadingProvider wrapper, scroll lock, Navbar and Footer layouts
│   │   ├── pages/
│   │   │   └── Home.jsx        # Landing page section composer; handles ScrollTrigger height refreshes
│   │   ├── UI/                 # Atomic design elements and decorative/ambient background widgets
│   │   │   ├── ArchGlow.jsx    # SVG glowing header arch with randomized star/dust twinkle animations
│   │   │   ├── GridBackground.jsx # Background visual containing animated shine lines and random static cells
│   │   │   ├── Loader.jsx      # Slide-out screen transition rows executing on initial window visit
│   │   │   ├── SplitTextTitle.jsx # Dynamic title component animating word entry shifts sequentially
│   │   │   └── TiltedLight.jsx # Ambient light beams overlay placeholder
│   │   └── sections/           # High-level responsive container blocks forming the website sections
│   │       ├── BrandMarquee.jsx # Seamless dual-direction horizontal scrolling logo tickers
│   │       ├── CaseStudiesSection.jsx # Slider showcasing clickable client portfolio entries
│   │       ├── DigitalMarketingSection.jsx # Content + graphics containing scroll-based Y-parallax depths
│   │       ├── FaqSection.jsx   # Collapsible grid-based sliding Q&A accordion list
│   │       ├── Footer.jsx       # Multi-column sitemap, legal notes, contact forms, and map pins
│   │       ├── Hero.jsx         # Initial landing block showing main title, text, CTAs, and marquee
│   │       ├── Navbar.jsx       # Fixed header with dropdown menus, tablet, and mobile drawer views
│   │       ├── ServicesSection.jsx # Responsive cards showing core agency services (SEO, PPC, SMM)
│   │       ├── StatisticsSection.jsx # Stat blocks showing number counts alongside particle.js backgrounds
│   │       ├── TeamSection.jsx  # Loop-safe Swiper showcasing team member photos
│   │       ├── TrustedPartnerSection.jsx # Highlight list details explaining Abu Dhabi local agency benefits
│   │       └── WhatsetusApartSection.jsx # Accordion paired with custom scroll-based parallax graphics
│   └── context/
│       └── LoadingContext.jsx   # Context sharing loader completion state to prevent page jumps
├── eslint.config.mjs            # ESLint code style configurations
├── jsconfig.json                # Defines path alias mappings (e.g. "@/*" pointing to "./src/*")
├── next.config.mjs              # Next.js bundler settings (images remote domains, experimental flags)
├── postcss.config.mjs           # CSS processing directives
├── package.json                 # Project version registry and script commands
├── README.md                    # Standard initial template instructions
└── trim-brand-logos.mjs         # Dev script to auto-crop whitespace borders from brand assets
```

---

## 3. Detailed Component Architecture & Data Models

### 3.1. State & Layout Wrappers

#### `LoadingContext.jsx` (Global Context)
*   **Purpose**: Manages the loading phase to coordinate intro transitions.
*   **State**:
    *   `loading` (Boolean, default: `true`): Tracks if the initial loading presentation is active.
    *   `setLoading`: Function to transition out of loading status.
*   **Hook**: `useLoading()` returns the current context value.

#### `ClientLayout.jsx` (Layout Wrapper)
*   **Role**: Root level client container surrounding the app routes.
*   **State**: Pulls `{ loading, setLoading }` from context.
*   **Behavior**:
    *   If `loading` is true, mounts `<Loader>` with `onComplete={() => setLoading(false)}`.
    *   Mounts fixed `<Navbar loading={loading}>`.
    *   Wraps children pages inside `<main className="flex-1 flex flex-col">`.
    *   Mounts site-wide `<Footer>`.

#### `Home.jsx` (Page Composer)
*   **Role**: Renders the complete stack of layout sections in chronological order.
*   **State**: Pulls `loading` from `useLoading()`.
*   **Animations**: Contains a `useEffect` that triggers `ScrollTrigger.refresh()` after a 100ms timeout once `loading` changes to `false`. This corrects ScrollTrigger thresholds after hidden elements render and the DOM stabilizes.
*   **Child Components**: Renders `<Hero>`, `<ServicesSection>`, `<DigitalMarketingSection>`, `<WhatSetsUsApartSection>`, `<TrustedPartnerSection>`, `<StatisticsSection>`, `<TeamSection>`, `<FAQSection>`, and `<CaseStudiesSection>`.

---

### 3.2. Primary Layout Sections

#### `Hero.jsx` (Hero Landing Header)
*   **Props**: `{ loading: boolean }`
*   **State / Refs**:
    *   `titleRef`, `paraRef`, `buttonRef`: References bound to title, paragraph, and CTA button.
*   **Internal Data**:
    *   `titleText`: `"Digital Marketing Agency In Abu Dhabi"` (Split by spaces into words).
    *   `paraText`: `"Looking for a digital marketing agency in Abu Dhabi? With 12+ years of expertise..."`
*   **Animations**:
    *   **On Mount**: GSAP sets initial positions (`yPercent: 110`, `opacity: 0`) for elements.
    *   **Post-Loader**: Once `loading` changes to `false`, a GSAP timeline animates words upwards inside masked wrappers (`.title-word` and `.para-word`) with a stagger pattern, followed by the CTA fade-in.
*   **Key Children**: `<GridBackground>`, `<ArchGlow>`, and `<BrandMarquee>`.

#### `BrandMarquee.jsx` (Infinite Scroll Marquee)
*   **Role**: Displays horizontal, dual-direction looping marquee banners showing brand partner logos.
*   **Static Data**:
    *   `BRANDS_ROW_1` (Array): Slugs for row 1 (`adarsh-developers`, `atom`, `biogen`, `bluedove`, `clarks-exotica`, `curtain-label`, `ferns`, `han-digital`, `hola`, `indus-intex`).
    *   `BRANDS_ROW_2` (Array): Slugs for row 2 (`micro-genesis`, `origin`, `prema`, `redseer`, `shreemeera`, `sisa`, `smart-links`, `take-leap`, `we-sure`, `wintrust`).
*   **Props (Sub-component `MarqueeRow`)**: `{ brands: Array, direction: "left"|"right", speed: Number }`
*   **Behavior**: Clones the brand logo arrays multiple times to allow infinite, seamless keyframe loops without blank breaks. Hovering over a logo transitions it from grayscale to full color.

#### `ServicesSection.jsx` (Agency Services Grid)
*   **Static Data**:
    *   `services` (Array): Defines 3 core offerings (SEO, SMM, and PPC) containing:
        *   `icon` / `iconWhite`: Normal and hover state icon paths.
        *   `title`: The name of the service.
        *   `description`: Bulleted summaries of service outcomes.
*   **State / Refs**:
    *   `containerRef`: Bound to section wrapper.
*   **Animations**:
    *   GSAP ScrollTrigger staggered slide-up of the service card wrappers (`.service-card-wrapper`) once the top of the container reaches 85% of the viewport.

#### `DigitalMarketingSection.jsx` (Expert Details + Parallax)
*   **Static Data**:
    *   `floatingImages` (Array): Defines positions, source files, and relative speeds for 6 overlay cards surrounding the primary illustration.
*   **State / Refs**:
    *   `sectionRef`, `containerRef`, `groupRef`: Elements tracked for visibility and scrolling.
    *   `imageRefs.current` (Array of DOM nodes): Stores references to the individual floating elements.
*   **Animations**:
    *   **Entrance**: Sequential slide-up of card structures on viewport entrance.
    *   **Parallax**: Listens to the `scroll` event. Calculates `progress` based on the container's coordinates relative to the screen. Translates Y-positions of elements via `translate3d(0, progress * speed * 100, 0)` on animation frames.

#### `WhatsetusApartSection.jsx` (Accordion + Parallax)
*   **Static Data**:
    *   `items` (Array): Accordion options defining titles and bodies for unique value points.
    *   `floatingImages` (Array): Coordinate parameters and drift speeds for left side floating graphics.
*   **State**:
    *   `openIndex` (Number, default: `0`): Stores the index of the active accordion card (supports collapses by setting to `-1`).
*   **Animations**:
    *   **Parallax**: Runs scroll calculations using an animation frame loop to translate graphic items based on their individual speed multipliers.
    *   **Accordion**: Fluid height and rotation of trigger arrows when toggling index states.

#### `TrustedPartnerSection.jsx` (Value Cards)
*   **Static Data**:
    *   `points` (Array): Defines 3 items (Landscape, Strategies, Market Challenges) showing details and hand-drawn graphic markers (`idea.png`, `aim.png`, `cup.png`).
*   **Animations**: Staggers entrance transitions of the partner cards using GSAP ScrollTrigger.

#### `StatisticsSection.jsx` (Count-up Metrics & Particles)
*   **Static Data**:
    *   `stats` (Array): Numeric items defining count targets (`350`, `180`, `10`, `600`), suffixes (`+`), and descriptions.
    *   `PARTICLES_CONFIG`: Setup JSON for the particles background.
*   **State / Refs**:
    *   `gridRef`: Bound to intersection target.
    *   `inView` (Boolean, default: `false`): Becomes true once the elements enter the view.
*   **Behavior**:
    *   **Particles Field**: Renders `particles-js-stats` container. Utilizes a Next.js `Script` to fetch `particles.min.js` and initialises the particles instance, cleaning it up on unmount to prevent canvas stacking.
    *   **Count-Up Hook (`useCountUp`)**: Runs cubic-eased count animations (`1 - (1 - progress)^3`) from `0` to the target value when the section enters the view.

#### `TeamSection.jsx` (Team Swiper)
*   **Static Data**:
    *   `team` (Array): Profile details (names, Unsplash image source paths).
*   **State**:
    *   `prevEl`, `nextEl`: References to custom navigation trigger buttons.
*   **Behavior**:
    *   Triplicates team items (`[...team, ...team, ...team]`) to provide slide padding for looping.
    *   Implements Swiper slider configured with autoplay, infinite looping, and breakpoints to show up to 4.4 slides per view.

#### `FaqSection.jsx` (Accordion FAQ Block)
*   **Static Data**:
    *   `faqs` (Array): Common client questions and responses.
*   **State**:
    *   `openIndex` (Number, default: `0`): Tracks the active FAQ item.
*   **Behavior**: Uses Tailwind transition states (`grid-rows-[0fr]` to `grid-rows-[1fr]`, `opacity-0` to `opacity-100`) to animate answers collapsing or expanding smoothly without layout jumps.

#### `CaseStudiesSection.jsx` (Case Studies Swiper)
*   **Static Data**:
    *   `caseStudies` (Array): Portfolio entries with image URLs, tags/badges, titles, and paths.
*   **State**:
    *   `prevEl`, `nextEl`: References to custom arrow triggers.
*   **Behavior**: Runs Swiper in loop mode with slide triplication, mousewheel control (releasing scroll focus at boundaries), and touch grabbing gestures.

#### `Navbar.jsx` (Fixed Navigation Header)
*   **Props**: `{ loading: boolean }`
*   **Static Data**:
    *   `NAV_ITEMS` (Array): Menu structure containing parent directories and submenus.
*   **State**:
    *   `openMenu` (String|null): Tracked index for hovered menu option on desktop views.
    *   `isMobileMenuOpen` (Boolean): Controls mobile sidebar layout state.
    *   `activeMobileSubmenu` (String|null): Tracks the open mobile category accordion.
*   **Behavior**:
    *   **Intro**: Slides down from the top edge once `loading` ends.
    *   **Scroll Intercept**: Prevents page scrolling when the mobile slide-out menu drawer is open.

#### `Footer.jsx` (Site Footer Details)
*   **Static Data**:
    *   `quickLinks` & `services`: Navigation menus.
    *   `socials`: Social links.
    *   `locationColumns`: Regional navigation columns containing labels and underline markers.

---

### 3.3. UI & Visual Primitives

#### `ArchGlow.jsx` (Decorative SVG Header Arch)
*   **Props**: `{ loading: boolean }`
*   **State / Refs**:
    *   `containerRef`: Target wrapper.
    *   `cleanupRefs`: Collection of dynamically spawned elements.
*   **Behavior**:
    *   **Sprinkle twinkles**: Generates 55 stars of random sizes (`1px` to `2.4px`) scattered across the glow area. Animates their opacity and scale iteratively using GSAP.
    *   **SVG Arch Draw**: If `loading` is true, sets path lengths to stroke dash array limits. When `loading` completes, animates stroke offsets to `0` with a power3 ease.

#### `GridBackground.jsx` (Grid Visual Overlay)
*   **State / Refs**:
    *   `containerRef`: Bound to background.
*   **Configurations**:
    *   `CELL_SIZE`: `70px`.
    *   `FILL_CELL_DENSITY`: `0.03` (3% coverage).
    *   `ODD_LINES_DIRECTION`: `"top-to-bottom"`.
*   **Behavior**:
    *   **Non-Touching Scattered Cells**: Computes grid size and places filled cells randomly such that no two filled cells touch (including diagonally).
    *   **Traveling Shines**: Spawns moving linear gradient shine indicators along internal vertical column lines. Directions alternate between odd and even columns, animating at randomized speeds.

#### `Loader.jsx` (Initial Entrance Transition)
*   **Props**: `{ onComplete: () => void }`
*   **State / Refs**:
    *   `rowRefs`, `titleRef`, `subRef`, `loaderRef`: Animation control node selections.
*   **Behavior**:
    *   Blocks window scrolling during active status.
    *   Renders 5 full-width horizontal purple blocks (each `22vh` tall).
    *   Executes GSAP sequence: Logo fades and shifts up. Logo fades back out. Purple cover rows slide out to the right (`100vw`) with staggered offsets.
    *   Triggers `onComplete()` to notify context when the screen is fully revealed.

#### `SplitTextTitle.jsx` (Scroll-Triggered Title Animation)
*   **Props**: `{ text: string, className?: string, justify?: "center" | "left" }`
*   **Behavior**:
    *   Divides the target text into words.
    *   Wraps each word in a layout mask (`overflow-hidden`).
    *   Applies a ScrollTrigger to slide the words up (`yPercent: 0`) and fade them in sequentially.
