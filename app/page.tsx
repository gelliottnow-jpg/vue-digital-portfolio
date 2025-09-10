"use client"; //portfolio site

import React, { useEffect, useState } from "react";

// --- Hero asset config ------------------------------------------------------
const HERO_SRC =
  "https://www.dropbox.com/scl/fi/5p1ea4pp5v6tlr29o8u6t/HeroImage-1.png?rlkey=wjgr214tpldjb5191iuxja29k&st=0odcecfr&raw=1";
// ---------------------------------------------------------------------------

const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#approach", label: "Approach" },
  { href: "#contact", label: "Contact" },
];

// Highlights (ka and carvana removed to avoid empty anchors)
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
    kpi: "High-end consignment ads $25 per lead, Relaunched Social Media channels 505K views in 30 days",
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
      "Consistent weekly video posting on TikTok & Instagram resulted in creating a viral brand with millions of eyeballs. We combined the social media virality with unique Facebook Ads and a simple checkout funnel on the business website resulting in $5 qualified leads on autopilot.",
    bullets: ["$5 QUALIFIED event rental leads", "5M+ TikTok impressions", "6-figure exit thanks to social media"],
    proofIdeas: ["TikTok analytics", "Lead cost export", "Booking pings"],
    cta: "Discuss Video Marketing & Digital Ads",
  },
  expressions: {
    summary:
      "Within 48 hours of starting Facebook Marketplace listing services, we sold a piece that had sat unsold for over a decade. Four weeks later, Facebook sales topped $13,000.",
    bullets: [
      "Added 5-figures of monthly revenue in 30 days",
      "Photographed and listed inventory online generating 473 leads",
      "Expanded the store's local reach by sending paying customers from outside the store's geographic reach by 100 miles",
    ],
    proofIdeas: ["Invoices (redacted)", "Listing photo collage"],
    cta: "Discuss Selling Your Inventory Online",
  },
  autohaus: {
    summary:
      "Complete social media relaunch across YouTube, Facebook, and Instagram for a once-viral luxury automotive brand. Drove rapid engagement and lead generation within the first 30 days.",
    bullets: [
      "$30 cost per lead via Facebook Ads",
      "500K views first month up 150% from prev. month",
      "All video content captured on-site and produced by Vue Digital on behalf of client",
    ],
    proofIdeas: ["Before/after analytics", "Thumbnail grid evolution", "Shorts montage stills"],
    cta: "Discuss video marketing & social media management",
  },
  ssb: {
    summary:
      "Spectacle + credibility for a niche community: organic + paid video distribution and creator collabs.",
    bullets: ["100+ new program memberships", "1.5M+ impressions from two videos", "Videos scripted and produced on behalf of client's social pages"],
    proofIdeas: ["Launch video stills", "Order notifications (redacted)", "Comments"],
    cta: "Discuss growing your social media",
  },
  luxurynaples: {
    summary:
      "A property campaign built for attention and foot traffic. Short-form teasers, geo-targeted posting, and open-house momentum.",
    bullets: ["50,000+ impressions in 30 days", "15+ attendee open house", "Local influencer marketing"],
    proofIdeas: ["Ads manager stats", "Open-house photos", "Reel tiles"],
    cta: "Discuss social media marketing or aerial drone services",
  },
  mojo: {
    summary:
      "Developed a full-scale content system that transformed Arizona realtors' quiet channel into a recognizable local brand, driving consistent audience growth and lead generation.",
    bullets: ["Over a quarter-million views from thousands of subscribers", "Professional videography of million dollar homes", "Set content standards with dramatic before / after"],
    proofIdeas: ["YT analytics", "Before/after tiles"],
    cta: "Discuss growing on YouTube and content creation",
  },
  bubble: {
    summary:
      "Filmed large events across the nation (30,000+ participants) turning videos into performance creatives for Facebook, Instagram, and Google using a six-figure ad budget. Built a digital powerhouse generating millions in revenue and online.",
    bullets: ["Six-figure registration funnels", "Viral social media ads strategy"],
    proofIdeas: ["Ad dashboards", "Registration spikes vs. content drops"],
    cta: "Discuss social media and digital marketing",
  },
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

const PROOF_IMAGES: Record<string, string[]> = {
  aam360: [
    "TIKTOK:https://www.tiktok.com/embed/7308108106364456235",
    "TIKTOK:https://www.tiktok.com/embed/7285951248086437163",
    "TIKTOK:https://www.tiktok.com/embed/7245369751973760302",
  ],
  expressions: [
    "IMG:https://www.dropbox.com/scl/fi/3bxbwgkgw1fb86mrf9rk0/Screenshot-2025-06-02-at-9.55.15-PM.png?rlkey=ywac3qcw5tq6eknxk0geiijvd&st=glhbxwja&raw=1",
    "IMG:https://www.dropbox.com/scl/fi/93tg9bsin36x0k2mf8t05/Screenshot-2025-05-15-at-9.51.31-PM.png?rlkey=1m22idgzabzxc5ls83o0mxe1t&st=kin2856d&raw=1",
    "VIMEO:https://player.vimeo.com/video/1113539417?badge=0&autopause=0&player_id=0&app_id=58479",
  ],
  autohaus: [
    "YOUTUBE:https://www.youtube.com/embed/rm_C00zIy8M",
    "INSTAGRAM:https://www.instagram.com/p/DNnyiuxtCZk/embed",
    "YOUTUBE:https://www.youtube.com/embed/pQnHZo_4DOg",
  ],
  ssb: [
    "TIKTOK:https://www.tiktok.com/embed/7288389063273352490",
    "INSTAGRAM:https://www.instagram.com/p/DNBNLtNOEWu/embed",
    "TIKTOK:https://www.tiktok.com/embed/7283882112086822190",
    "IMG:https://www.dropbox.com/scl/fi/50po4x6xc4bohyqovqzm5/shortsteelbending.png?rlkey=z5rhrweo4tous6unr6ni51y84&st=dhy831jv&raw=1",
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
    "INSTAGRAM:https://www.instagram.com/p/C-YT4gLNNID/embed",
    "INSTAGRAM:https://www.instagram.com/reel/C-GOkmgoHCP/embed",
  ],
};

// Utility hook
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

// Embed
type EmbedProps = { content?: string; title?: string; tall?: boolean };
function Embed({ content, title = "Embedded media", tall = false }: EmbedProps) {
  if (!content) return null;
  const isTikTok = content.startsWith("TIKTOK:");
  const isIG = content.startsWith("INSTAGRAM:");
  const isYT = content.startsWith("YOUTUBE:");
  const isVimeo = content.startsWith("VIMEO:");
  const src = content.replace(/^([A-Z]+):/, "");

  const baseFrameProps = {
    className: "w-full rounded-2xl border border-zinc-200 bg-zinc-100 overflow-hidden",
    style: { border: "none" as const },
    title,
  };

  if (isTikTok) return <iframe {...baseFrameProps} src={src} height={578} loading="lazy" />;
  if (isIG) return <iframe {...baseFrameProps} src={src} height={tall ? 600 : 560} scrolling="no" loading="lazy" />;
  if (isYT)
    return (
      <iframe
        {...baseFrameProps}
        src={src}
        height={315}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  if (isVimeo)
    return (
      <div className="rounded-2xl border border-zinc-200 bg-zinc-100 overflow-hidden" style={{ position: "relative", paddingTop: "56.25%" }}>
        <iframe
          {...baseFrameProps}
          src={src}
          loading="lazy"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        />
      </div>
    );
  if (content.startsWith("IMG:"))
    return (
      <div className="rounded-2xl overflow-hidden">
        <img src={content.replace("IMG:", "")} alt={title} className="w-full h-auto block" loading="lazy" decoding="async" />
      </div>
    );

  return null;
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
        {/* Brand with logo image from /public/logo.png */}
        <a
          href="#"
          aria-label="Vue Digital — Home"
          className="flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 rounded"
        >
          <img
            src="/logo.png"
            alt="Vue Digital logo"
            width={400}
            height={94}
            className="h-12 md:h-24 w-auto object-contain"
            loading="eager"
            decoding="async"
          />
          <span className="sr-only">Vue Digital</span>
        </a>

        <nav
          className="hidden md:flex gap-6 text-base text-zinc-700"
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
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  // Use NBSP once to prevent a widow on the last word pair.
  const HEADLINE = "Results You Can Measure. Stories People\u00A0Remember.";

  return (
    <section id="hero" className="pt-28 md:pt-32 pb-16 md:pb-24 bg-gradient-to-b from-white to-zinc-50">
      {/* Skip link for a11y */}
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:px-3 focus:py-2 focus:rounded"
      >
        Skip to Work
      </a>

      <div className="mx-auto max-w-6xl px-4">
        {/* Mobile: headline → image → tagline → CTA */}
        <div className="md:hidden">
          {/* 1) Headline */}
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 leading-[1.08] [text-wrap:balance] max-w-[22ch]">
            {HEADLINE}
          </h1>

          {/* 2) Full-width image */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_10px_40px_-20px_rgba(0,0,0,0.35)] my-8">
            <img
              className="h-full w-full object-cover"
              src={HERO_SRC}
              alt="Selected client work montage"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-black/10" />
          </div>

          {/* 3) Tagline */}
          <p className="text-zinc-800 text-lg font-medium [text-wrap:balance]">
            A digital marketing & content studio <span className="font-bold">by Gilles Elliott</span>.
          </p>

          {/* 4) CTA */}
          <div className="mt-6">
            <a
              href="#contact"
              className="inline-flex h-11 items-center rounded-full border border-zinc-300 bg-white px-6 hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 shadow-sm text-sm"
            >
              Get a FREE Digital Growth Plan
            </a>
          </div>
        </div>

        {/* Desktop: split grid, but keep same reading order on the left */}
        <div className="hidden md:grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-zinc-900 leading-[1.06] [text-wrap:balance] max-w-[24ch]">
              {HEADLINE}
            </h1>
            <p className="mt-5 text-zinc-800 text-lg md:text-xl font-medium [text-wrap:balance]">
              A digital marketing & content studio <span className="font-bold">by Gilles Elliott</span>.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex h-11 items-center rounded-full border border-zinc-300 bg-white px-6 hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 shadow-sm"
              >
                Get a FREE Digital Growth Plan for Your Business
              </a>
            </div>
          </div>

          <div className="relative aspect-[5/4] rounded-3xl overflow-hidden shadow-[0_10px_40px_-20px_rgba(0,0,0,0.35)]">
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
      </div>
    </section>
  );
}

function Highlights() {
  return (
    <section id="work" className="py-16 md:py-24 bg-zinc-50">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900">Work that moved the needle</h2>
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

function CaseSection({ id, title, kpi }: { id: string; title: string; kpi?: string }) {
  const c = (CASES as Record<string, any>)[id];
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
              {c.bullets.map((b: string) => (
                <li key={b} className="flex gap-2">
                  <span className="text-zinc-400">▹</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <a href="#contact" className="mt-6 inline-flex text-zinc-900 underline hover:no-underline">
              {c.cta} →
            </a>
          </div>

          {/* Custom layouts for certain cases */}
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
          ) : id === "autohaus" ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <Embed content={PROOF_IMAGES[id]?.[0]} title="Autohaus YouTube 1" />
                {PROOF_IMAGES[id]?.[2] ? (
                  <Embed content={PROOF_IMAGES[id][2]} title="Autohaus YouTube 2" />
                ) : null}
              </div>
              <Embed content={PROOF_IMAGES[id]?.[1]} title="Autohaus Instagram Reel" tall />
            </div>
          ) : (
            <div
              className={`grid gap-4 ${
                id === "aam360"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : id === "ssb"
                  ? "grid-cols-1 sm:grid-cols-2"
                  : "md:grid-cols-2"
              }`}
            >
              {PROOF_IMAGES[id]?.map((content, index) => (
                <Embed key={index} content={content} title={c.proofIdeas?.[index] || `Proof ${index + 1}`} />
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
    { title: "Learn", body: "We start by understanding your goals, customers, and what makes your business unique." },
    { title: "Plan", body: "We map out a simple, clear plan to get you more traffic, more leads, and more sales." },
    { title: "Launch", body: "We create and post high-quality content, ads, and campaigns all managed for you." },
    { title: "Grow", body: "We track results and keep improving every week to get you the best return on your investment." },
  ];
  const tools = ["Meta Ads", "Google Ads", "YouTube Studio", "TikTok", "BrightLocal", "HubSpot", "ClickUp", "Adobe", "Shopify"];
  return (
    <section id="approach" className="py-16 md:py-24 bg-zinc-50">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-zinc-900">How We Help Your Business Grow</h2>
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
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900">Get a free digital growth guide customized for your business</h2>
        <p className="mt-3 text-zinc-600">
          Email <a className="underline" href="mailto:gelliottnow@gmail.com">gelliottnow@gmail.com</a> or fill out the form below to be contacted.
        </p>
        <div className="mt-8 grid gap-3 text-left">
          <div>
            <label className="block text-sm text-zinc-600 mb-1" htmlFor="name">Name</label>
            <input
              id="name"
              className="w-full h-12 rounded-xl border border-zinc-300 px-4 focus:outline-none focus:ring-2 focus:ring-zinc-900"
              placeholder="Your name"
              aria-required="true"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="w-full h-12 rounded-xl border border-zinc-300 px-4 focus:outline-none focus:ring-2 focus:ring-zinc-900"
              placeholder="you@email.com"
              aria-required="true"
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1" htmlFor="goals">What do you want to achieve?</label>
            <textarea
              id="goals"
              className="w-full min-h-[120px] rounded-xl border border-zinc-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-zinc-900"
              placeholder="E.g., grow online sales, launch video ads, go viral on social media, or Google Business Rankings..."
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
  const [results, setResults] = useState<{ name: string; pass: boolean; details?: string }[]>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    const isDev = url.searchParams.get("dev") === "1";
    setShow(isDev);
    if (!isDev) return;

    const tests: { name: string; pass: boolean; details?: string }[] = [];

    // Test 1: Hero contains headline
    const hero = document.getElementById("hero");
    const heroPass = !!hero?.textContent?.includes("Results You Can Measure");
    tests.push({ name: "Hero includes headline", pass: heroPass });

    // Test 2: All highlight anchors map to a case id
    const missing: string[] = [];
    HIGHLIGHTS.forEach((h) => {
      if (!(CASES as Record<string, any>)[h.anchor]) missing.push(h.anchor);
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
      <CaseSection id="aam360" title="All Around Me 360 Photo Booth — Demand on Autopilot" />
      <CaseSection id="expressions" title="Expressions in Design — Local Marketplace Dominance" />
      <CaseSection id="autohaus" title="Autohaus of Naples — Dormant to Dominant" />
      <CaseSection id="ssb" title="Short Steel Bending Co. — Membership Growth Engine" />
      <CaseSection id="luxurynaples" title="LuxuryNaples.com — Open House Demand at Scale" />
      <CaseSection id="mojo" title="MoJo Scottsdale — Luxury Real Estate Marketing" />
      <CaseSection id="bubble" title="Bubble Run 5K & Muddy Dash — Soldout Events" />
      <Approach />
      <Contact />
      <DevTests />
      <footer className="py-10 border-t border-zinc-200 text-center text-sm text-zinc-600">
        <div className="flex justify-center items-center gap-4 mb-4">
          <a
            href="https://www.instagram.com/dogsinnasippycup/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-zinc-900 transition-colors"
            aria-label="Follow Vue Digital on Instagram"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12.017 0C8.396 0 7.929.01 6.71.048 5.493.087 4.73.222 4.058.42a5.916 5.916 0 0 0-2.134 1.404A5.916 5.916 0 0 0 .42 4.058C.222 4.73.087 5.493.048 6.71.01 7.929 0 8.396 0 12.017s.01 4.087.048 5.306c.039 1.217.174 1.98.372 2.652a5.916 5.916 0 0 0 1.404 2.134 5.916 5.916 0 0 0 2.134 1.404c.672.198 1.435.333 2.652.372 1.219.038 1.686.048 5.306.048s4.087-.01 5.306-.048c1.217-.039 1.98-.174 2.652-.372a5.916 5.916 0 0 0 2.134-1.404 5.916 5.916 0 0 0 1.404-2.134c.198-.672.333-1.435.372-2.652.038-1.219.048-1.686.048-5.306s-.01-4.087-.048-5.306c-.039-1.217-.174-1.98-.372-2.652a5.916 5.916 0 0 0-1.404-2.134A5.916 5.916 0 0 0 19.942.42c-.672-.198-1.435-.333-2.652-.372C16.071.01 15.604 0 12.017 0zm0 2.161c3.547 0 3.967.01 5.364.048 1.295.059 1.998.27 2.467.448.62.24 1.063.528 1.528.992.464.465.752.908.992 1.528.178.469.389 1.172.448 2.467.038 1.397.048 1.817.048 5.364s-.01 3.967-.048 5.364c-.059 1.295-.27 1.998-.448 2.467a4.11 4.11 0 0 1-.992 1.528 4.11 4.11 0 0 1-1.528.992c-.469.178-1.172.389-2.467.448-1.397.038-1.817.048-5.364.048s-3.967-.01-5.364-.048c-1.295-.059-1.998-.27-2.467-.448a4.11 4.11 0 0 1-1.528-.992 4.11 4.11 0 0 1-.992-1.528c-.178-.469-.389-1.172-.448-2.467-.038-1.397-.048-1.817-.048-5.364s.01-3.967.048-5.364c.059-1.295.27-1.998.448-2.467.24-.62.528-1.063.992-1.528a4.11 4.11 0 0 1 1.528-.992c.469-.178 1.172-.389 2.467-.448 1.397-.038 1.817-.048 5.364-.048z"/>
              <path fillRule="evenodd" d="M12.017 5.835a6.182 6.182 0 1 0 0 12.365 6.182 6.182 0 0 0 0-12.365zm0 10.203a4.021 4.021 0 1 1 0-8.042 4.021 4.021 0 0 1 0 8.042zm7.846-10.405a1.441 1.441 0 0 1-2.883 0 1.441 1.441 0 0 1 2.883 0z"/>
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/gilles-elliott-856a5a19a/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-600 hover:text-zinc-900 transition-colors"
            aria-label="Connect with Gilles Elliott on LinkedIn"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
        © {new Date().getFullYear()} Vue Digital — Naples, FL
      </footer>
    </main>
  );
}
