"use client"; //portfolio site

import React, { useEffect, useState } from "react";

// --- Hero asset config ------------------------------------------------------
// Put your image in your project's /public folder as hero.webp (1600x1280 ideal)
// or use an external URL (as below).
const HERO_SRC =
  "https://www.dropbox.com/scl/fi/5p1ea4pp5v6tlr29o8u6t/HeroImage-1.png?rlkey=wjgr214tpldjb5191iuxja29k&st=0odcecfr&raw=1";
// ---------------------------------------------------------------------------

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#approach", label: "Approach" },
  { href: "#contact", label: "Contact" },
];

// Removed KA & Carvana from Highlights to avoid empty anchors.
// Section title changed below to “Work that moved the needle”.
const HIGHLIGHTS = [
  {
    title: "All Around Me 360 Photo Booth",
    kpi: "5M+ impressions on TikTok, Facebook Ads $5 Lead Strategy, 6-figure business exit",
    img: "https://www.dropbox.com/scl/fi/2ar99jehe4zvo4d6zkbpd/photobooth.png?rlkey=rv7ux2m56e6xmykz1nr8rzcq2&st=foylmmo4&raw=1",
    anchor: "aam360",
  },
  {
    title: "Expressions in Design (Model Furniture)",
    kpi: "Added 5-figures of monthly revenue in 30 days",
    img: "https://www.dropbox.com/scl/fi/wmutmz42bu1f7e4nglphh/expressions.png?rlkey=fb41ac9fhxx6ehvu6hgepfioa&st=1zdgxkem&raw=1",
    anchor: "expressions",
  },
  {
    title: "Autohaus of Naples",
    kpi: "High-end consignment ads $30 per lead, Relaunched YouTube channel 100K views in 30 days",
    img: "https://www.dropbox.com/scl/fi/xp0ioarkdq16cf1o4d8bf/autohaus.png?rlkey=5mtn4vkxnmnqce11q98c3nn70&st=xbrvww8k&raw=1",
    anchor: "autohaus",
  },
  {
    title: "Short Steel Bending Co.",
    kpi: "100+ new memberships; 1.5M+ impressions",
    img: "https://www.dropbox.com/scl/fi/nssjwbh00pxrxtg1b57k8/steel.png?rlkey=ejvzll8qr8hvuo62frzb2w8kw&st=bpnr81fb&raw=1",
    anchor: "ssb",
  },
  {
    title: "LuxuryNaples.com",
    kpi: "50,000+ impressions in 30 days → 15+ open-house attendees",
    img: "https://www.dropbox.com/scl/fi/vrx6jh8i30ntdep4whs4v/luxurynaples.png?rlkey=n114f9h66gpanvyd5r3csu7gl&st=q672c9ae&raw=1",
    anchor: "luxurynaples",
  },
  {
    title: "MoJo Scottsdale Luxury Real Estate",
    kpi: "250K views; 750+ followers; dramatic before/after",
    img: "https://www.dropbox.com/scl/fi/krhzavreh9rpep17ja6l0/mojo.png?rlkey=s3rkfwb69egj8qrubedzwr0gq&st=h4vktfw2&raw=1",
    anchor: "mojo",
  },
  {
    title: "Bubble Run 5K & Muddy Dash",
    kpi: "On-site video capture → FB/Google ads → six-figure registrations",
    img: "https://www.dropbox.com/scl/fi/13xzal9853pwqv49acqxp/bubbles.png?rlkey=mkcjops0fite3l08kg7g0h57s&st=102v9lc5&raw=1",
    anchor: "bubble",
  },
];

const CASES = {
  aam360: {
    summary:
      "Short-form video (TikTok) + Facebook ads loop, UGC-style edits, and a simple checkout funnel with autoresponders.",
    bullets: ["$5 leads", "5M+ TikTok impressions", "6-figure exit thanks to social media"],
    proofIdeas: ["TikTok analytics", "Lead cost export", "Booking pings"],
  },
  expressions: {
    summary:
      "Quick-win revenue via Facebook Marketplace playbook: photography, listings, lead handling, and review capture.",
    bullets: ["Added 5-figures of monthly revenue in 30 days"],
    proofIdeas: ["Invoices (redacted)", "Listing photo collage"],
  },
  autohaus: {
    summary:
      "We rebuilt a dormant YouTube channel with a weekly cadence, narrative-first reviews, and shorts. Titles and thumbnails were re-engineered for CTR.",
    bullets: [
      "$30 cost per lead via Facebook Ads",
      "100K views first month: 4 long-form videos/month + 20–24 shorts",
      "YouTube, Facebook, Instagram, TikTok",
    ],
    proofIdeas: ["Before/after analytics", "Thumbnail grid evolution", "Shorts montage stills"],
  },
  ssb: {
    summary:
      "Spectacle + credibility for a niche community: organic + paid distribution and creator collabs.",
    bullets: ["100+ new program memberships", "1.5M+ impressions from two videos", "Community testimonials"],
    proofIdeas: ["Launch video stills", "Order notifications (redacted)", "Comments"],
  },
  luxurynaples: {
    summary:
      "A property campaign built for attention and foot traffic. Short-form teasers, geo-targeted boosts, and open-house momentum.",
    bullets: ["50,000+ impressions in 30 days", "15+ attendees across open houses", "Local influencer marketing"],
    proofIdeas: ["Ads manager stats", "Open-house photos", "Reel tiles"],
  },
  mojo: {
    summary:
      "From flat to fanbase: content system, hook-first scripting, cinematic cuts, and brand-consistent thumbnails.",
    bullets: ["250K YouTube views", "750+ followers", "Dramatic creative before/after"],
    proofIdeas: ["YT analytics", "Before/after tiles"],
  },
  bubble: {
    summary:
      "On-site capture turned into performance creatives for FB/Google with rapid post-production and multi-variant testing.",
    bullets: ["Six-figure registration funnels", "Viral social media video strategy"],
    proofIdeas: ["Ad dashboards", "Registration spikes vs. content drops"],
  },
  // Keeping these definitions in CASES for future use, but not shown in Highlights:
  ka: {
    summary:
      "Month-one revenue lift via GBP optimization, website launch, and Facebook Marketplaces.",
    bullets: ["+$4,000 furniture sales in first month", "Website build & Google Business Profile ranking"],
    proofIdeas: ["POS exports (redacted)", "Showroom clips"],
  },
  carvana: {
    summary:
      "Content posting for Twitter / X & Facebook plus coordination across major reputation platforms with brand-safe voice.",
    bullets: ["Twitter / X & FB content + reputation orchestration"],
    proofIdeas: ["Platform tiles", "Workflow diagram"],
  },
};

// Proof images
const PROOF_IMAGES = {
  aam360: [
    "TIKTOK:https://www.tiktok.com/embed/7308108106364456235",
    "TIKTOK:https://www.tiktok.com/embed/7285951248086437163",
    "TIKTOK:https://www.tiktok.com/embed/7245369751973760302",
  ],
  expressions: [
    "https://www.dropbox.com/scl/fi/3bxbwgkgw1fb86mrf9rk0/Screenshot-2025-06-02-at-9.55.15-PM.png?rlkey=ywac3qcw5tq6eknxk0geiijvd&st=glhbxwja&raw=1",
    "https://www.dropbox.com/scl/fi/93tg9bsin36x0k2mf8t05/Screenshot-2025-05-15-at-9.51.31-PM.png?rlkey=1m22idgzabzxc5ls83o0mxe1t&st=kin2856d&raw=1",
    "VIMEO:https://player.vimeo.com/video/1113539417?badge=0&autopause=0&player_id=0&app_id=58479",
  ],
  autohaus: [
    "YOUTUBE:https://www.youtube.com/embed/rm_C00zIy8M",
    "INSTAGRAM:https://www.instagram.com/p/DNnyiuxtCZk/embed",
  ],
  ssb: [
    "https://www.dropbox.com/scl/fi/50po4x6xc4bohyqovqzm5/shortsteelbending.png?rlkey=z5rhrweo4tous6unr6ni51y84&st=nc5xkgpd&raw=1",
  ],
  luxurynaples: [
    "INSTAGRAM:https://www.instagram.com/p/DJXTc5tye2J/embed",
    "INSTAGRAM:https://www.instagram.com/p/DJrtNbIxCdt/embed",
  ],
  mojo: [
    "YOUTUBE:https://www.youtube.com/embed/w7K2bJW1kMY",
    "YOUTUBE:https://www.youtube.com/embed/dZI6A7-DpEo",
  ],
  bubble: [
    "https://www.dropbox.com/scl/fi/pupbzhpn1d9zj22jx9jse/HeroImage-9.png?rlkey=j7zdtkwtorlo9hh0cav9bqjdp&st=fumgegul&raw=1",
  ],
};

// ---------- Utilities ----------
function useScrolled(threshold = 32) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

// Centralized, accessible, lazy-loading embed component
function Embed({ content, title = "Embedded media", tall = false }) {
  if (!content) return null;
  const isTikTok = content.startsWith("TIKTOK:");
  const isIG = content.startsWith("INSTAGRAM:");
  const isYT = content.startsWith("YOUTUBE:");
  const isVimeo = content.startsWith("VIMEO:");
  const src = content.replace(/^([A-Z]+):/, "");

  const baseFrameProps = {
    className: "w-full rounded-2xl border border-zinc-200 bg-zinc-100 overflow-hidden",
    style: { border: "none" },
    loading: "lazy",
    title,
  };

  if (isTikTok) {
    return <iframe {...baseFrameProps} src={src} height={578} />;
  }
  if (isIG) {
    return <iframe {...baseFrameProps} src={src} height={tall ? 600 : 560} scrolling="no" />;
  }
  if (isYT) {
    return (
      <iframe
        {...baseFrameProps}
        src={src}
        height={315}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }
  if (isVimeo) {
    return (
      <div
        className="rounded-2xl border border-zinc-200 bg-zinc-100 overflow-hidden"
        style={{ position: "relative", paddingTop: "56.25%" }}
      >
        <iframe
          {...baseFrameProps}
          src={src}
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />
      </div>
    );
  }
  return (
    <div className="rounded-2xl bg-zinc-100 border border-zinc-200 overflow-hidden">
      <img src={content} alt={title} className="w-full h-auto" loading="lazy" decoding="async" />
    </div>
  );
}

// ---------- UI ----------
function Nav() {
  const scrolled = useScrolled(24);
  const [mobileOpen, setMobileOpen] = useState(false);
  const toggleMobile = () => setMobileOpen((s) => !s);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition backdrop-blur ${
        scrolled ? "bg-white/80 shadow-sm" : "bg-white/0"
      }`}
      role="banner"
    >
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <a
          href="#"
          aria-label="Vue Digital — Home"
          className="font-semibold tracking-tight text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 rounded"
        >
          Vue Digital
        </a>

        <nav
          className="hidden md:flex gap-6 text-sm text-zinc-700"
          aria-label="Main"
          id="primary-navigation"
          role="navigation"
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="hover:text-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 rounded"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            className="inline-flex h-10 items-center rounded-full bg-zinc-900 px-5 text-white hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
          >
            Work with Gilles
          </a>
          <a
            href="#contact"
            className="inline-flex h-10 items-center rounded-full border border-zinc-300 px-5 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
          >
            Free Digital Opportunity Assessment
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden h-9 w-9 rounded-full border border-zinc-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
          aria-label="Open menu"
          aria-controls="mobile-menu"
          aria-expanded={mobileOpen}
          onClick={toggleMobile}
        >
          {mobileOpen ? "×" : "≡"}
        </button>
      </div>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          className="md:hidden fixed inset-0 z-50 bg-white/95 backdrop-blur"
        >
          <div className="mx-auto max-w-6xl px-4 py-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold tracking-tight text-zinc-900">Vue Digital</span>
              <button
                className="h-9 w-9 rounded-full border border-zinc-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="mt-6 grid gap-3 text-lg">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-xl border border-zinc-200 bg-white px-4 py-3 hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl bg-zinc-900 text-white px-4 py-3 text-center hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
              >
                Work with Gilles
              </a>
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="rounded-xl border border-zinc-300 px-4 py-3 text-center hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
              >
                Free Digital Opportunity Assessment
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="hero" className="pt-28 md:pt-32 pb-16 md:pb-24 bg-gradient-to-b from-white to-zinc-50">
      {/* Skip link for a11y */}
      <a href="#work" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:px-3 focus:py-2 focus:rounded">
        Skip to Work
      </a>

      <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-zinc-900">
            Results You Can Measure. Stories People Remember.
          </h1>
          <p className="mt-5 text-zinc-800 text-lg md:text-xl font-medium">
            A digital marketing & content studio.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#contact"
              className="inline-flex h-11 items-center rounded-full bg-zinc-900 px-6 text-white hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
            >
              Work with Gilles
            </a>
            <a
              href="#contact"
              className="inline-flex h-11 items-center rounded-full border border-zinc-300 px-6 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
            >
              Free Digital Opportunity Assessment
            </a>
          </div>
        </div>
        <div className="relative aspect-[4/3] md:aspect-[5/4] rounded-3xl overflow-hidden shadow-[0_10px_40px_-20px_rgba(0,0,0,0.35)]">
          <img
            className="h-full w-full object-cover"
            src={HERO_SRC}
            alt="Selected client work montage"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-black/10" />
        </div>
      </div>
    </section>
  );
}

function Highlights() {
  return (
    <section id="work" className="py-16 md:py-24 bg-zinc-50">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900">
          Work that moved the needle
        </h2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {HIGHLIGHTS.map((h) => (
            <a
              key={h.title}
              href={`#${h.anchor}`}
              className="group rounded-3xl overflow-hidden bg-white border border-zinc-200 hover:shadow-md transition block focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={h.img}
                  alt={h.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="p-5">
                <div className="text-sm uppercase tracking-widest text-zinc-500">{h.title}</div>
                <div className="mt-1 text-zinc-900 font-medium">{h.kpi}</div>
                <div className="mt-3 text-sm text-zinc-700">View case →</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseSection({ id, title, kpi }) {
  const c = CASES[id];
  if (!c) return null;

  return (
    <section id={id} className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div>
          <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900">{title}</h3>
          {kpi ? <div className="mt-1 text-sm text-zinc-500">{kpi}</div> : null}
        </div>

        <div className="mt-6">
          <div className="mb-8">
            <p className="text-zinc-700 leading-relaxed">{c.summary}</p>
            <ul className="mt-4 space-y-2 text-zinc-800">
              {c.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="text-zinc-400">▹</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <a href="#contact" className="mt-6 inline-flex text-zinc-900 hover:underline">
              Discuss a similar outcome →
            </a>
          </div>

          {/* FIXED: Clean, explicit layout for Expressions; generic responsive grid otherwise */}
          {id === "expressions" ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <Embed content={PROOF_IMAGES[id]?.[0]} title="Expressions Proof 1" />
                {PROOF_IMAGES[id]?.[2] ? (
                  <Embed content={PROOF_IMAGES[id][2]} title="Expressions Proof 3" />
                ) : null}
              </div>
              <Embed content={PROOF_IMAGES[id]?.[1]} title="Expressions Proof 2" tall />
            </div>
          ) : (
            <div className={`grid gap-4 ${id === "aam360" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"}`}>
              {PROOF_IMAGES[id]?.map((content, index) => (
                <Embed
                  key={index}
                  content={content}
                  title={c.proofIdeas?.[index] || `Proof ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Approach() {
  const steps = [
    { title: "Discover", body: "Goals, offers, audience truths, voice." },
    { title: "Design", body: "Hooks, scripts, shotlists, titles/thumbnails, tracking plan." },
    { title: "Deploy", body: "Capture, edit pipeline, publish ops, paid amplification." },
    { title: "Dial-In", body: "Iterate on data: watch-through, CTR, leads, CAC/LTV." },
  ];
  const tools = ["Meta Ads", "Google Ads", "YouTube Studio", "TikTok", "BrightLocal", "HubSpot", "ClickUp", "Adobe", "Shopify"];
  return (
    <section id="approach" className="py-16 md:py-24 bg-zinc-50">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900">How We Work</h2>
        <div className="mt-8 grid md:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.title} className="rounded-3xl border border-zinc-200 bg-white p-6">
              <div className="text-sm uppercase tracking-widest text-zinc-500">{s.title}</div>
              <div className="mt-2 text-zinc-700">{s.body}</div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-sm text-zinc-600">Toolstack: {tools.join(" · ")}</div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-zinc-50">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900">Let's make your brand unskippable.</h2>
        <p className="mt-3 text-zinc-600">
          Email{" "}
          <a className="underline" href="mailto:gelliottnow@gmail.com">
            gelliottnow@gmail.com
          </a>{" "}
          or send a quick brief below.
        </p>
        <div className="mt-8 grid gap-3 text-left">
          <div>
            <label className="block text-sm text-zinc-600 mb-1" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              className="w-full h-12 rounded-xl border border-zinc-300 px-4 focus:outline-none focus:ring-2 focus:ring-zinc-900"
              placeholder="Your name"
              aria-required="true"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full h-12 rounded-xl border border-zinc-300 px-4 focus:outline-none focus:ring-2 focus:ring-zinc-900"
              placeholder="you@company.com"
              aria-required="true"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1" htmlFor="goals">
              What do you want to achieve?
            </label>
            <textarea
              id="goals"
              className="w-full min-h-[120px] rounded-xl border border-zinc-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-zinc-900"
              placeholder="Tell me about your goals, timeline, and budget range…"
            />
          </div>
          <div className="pt-2">
            <button
              type="button"
              className="w-full h-12 rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
              aria-label="Send inquiry"
            >
              Send Inquiry
            </button>
          </div>
          <p className="text-xs text-zinc-500 text-center">No spam. No fluff. Just outcomes.</p>
        </div>
      </div>
    </section>
  );
}

/**
 * DevTests — lightweight runtime checks shown when URL has ?dev=1
 */
function DevTests() {
  const [results, setResults] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    const isDev = url.searchParams.get("dev") === "1";
    setShow(isDev);
    if (!isDev) return;

    const tests = [];

    // Test 1: Hero contains "Results You Can Measure"
    const hero = document.getElementById("hero");
    const heroPass = !!hero?.textContent?.includes("Results You Can Measure");
    tests.push({ name: "Hero includes headline", pass: heroPass });

    // Test 2: All highlight anchors map to a case id
    const missing = [];
    HIGHLIGHTS.forEach((h) => {
      if (!CASES[h.anchor]) missing.push(h.anchor);
    });
    tests.push({ name: "Highlights map to cases", pass: missing.length === 0, details: missing.join(", ") });

    // Test 3: Contact section exists
    const contactPass = !!document.getElementById("contact");
    tests.push({ name: "Contact section present", pass: contactPass });

    // Test 4: Hero image has a non-empty src
    const heroImg = hero?.querySelector("img");
    const hasSrc = !!heroImg?.getAttribute("src");
    tests.push({ name: "Hero image has src", pass: hasSrc });

    // Test 4b: Image actually loaded (naturalWidth > 0)
    setTimeout(() => {
      const heroEl = document.getElementById("hero");
      const img = heroEl?.querySelector("img");
      const ok = !!img && img.complete && (img.naturalWidth || 0) > 0;
      setResults((prev) => [...prev, { name: "Hero image rendered", pass: ok }]);
    }, 500);

    // Test 5: Ensure Results & Clients sections are removed
    const resultsRemoved = !document.getElementById("results");
    const clientsRemoved = !document.getElementById("clients");
    tests.push({ name: "Results section removed", pass: resultsRemoved });
    tests.push({ name: "Clients section removed", pass: clientsRemoved });

    setResults(tests);
  }, []);

  if (!show) return null;

  const allPass = results.every((r) => r.pass);
  return (
    <div
      className={`fixed bottom-4 right-4 z-50 rounded-xl border px-4 py-3 text-sm shadow ${
        allPass ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-red-50 border-red-200 text-red-800"
      }`}
    >
      <div className="font-medium">Dev Tests: {allPass ? "All passing" : "Failures"}</div>
      <ul className="mt-1 list-disc pl-5">
        {results.map((r) => (
          <li key={r.name}>
            {r.pass ? "✅" : "❌"} {r.name}
            {r.details && !r.pass ? <span className="ml-2 opacity-80">({r.details})</span> : null}
          </li>
        ))}
      </ul>
      <div className="mt-2 text-xs opacity-70">
        Append <code>?dev=1</code> to the URL to toggle this.
      </div>
    </div>
  );
}

export default function VueDigitalPortfolioPage() {
  return (
    <main className="text-zinc-900">
      <Nav />
      <Hero />
      <Highlights />
      {/* Deep Cases - Reordered to match portfolio grid */}
      <CaseSection id="aam360" title="All Around Me 360 Photo Booth — Demand on Autopilot" kpi="$5 leads; 5M+ views" />
      <CaseSection id="expressions" title="Expressions in Design — Quick-Win Revenue" kpi="5-figures monthly revenue in 30 days" />
      <CaseSection id="autohaus" title="Autohaus of Naples — Channel Relaunch → Leads" kpi="$30/lead; 100K views in 30 days" />
      <CaseSection id="ssb" title="Short Steel Bending Co. — Membership Growth Engine" kpi="100+ new members" />
      <CaseSection id="luxurynaples" title="LuxuryNaples.com — Open House Demand at Scale" kpi="50K impressions; 15+ attendees" />
      <CaseSection id="mojo" title="MoJo Scottsdale — From Flat to Fanbase" kpi="250K views; 750+ followers" />
      <CaseSection id="bubble" title="Bubble Run 5K & Muddy Dash — Six-Figure Ad Funnels" kpi="Event marketing" />
      <Approach />
      <Contact />
      <DevTests />
      <footer className="py-10 border-t border-zinc-200 text-center text-sm text-zinc-600">
        © {new Date().getFullYear()} Vue Digital — Naples, FL
      </footer>
    </main>
  );
}
