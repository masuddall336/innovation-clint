
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import {
  ArrowDown,
  CheckCircle2,
  Factory,
  Leaf,
  Recycle,
} from "lucide-react";

import ScrollTop from "../ScrollTop";

import heroImg from "../../../public/img/Sustainability.jpg";

// ======================================================
// API
// ======================================================

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const fetchSustainability = async () => {
  const response = await axios.get(`${API_URL}/sustainability`);
  return response.data;
};

// ======================================================
// DEFAULT / FALLBACK DATA
// ======================================================

const defaultData = {
  hero: {
    badge: "Sustainability",
    title: "Building a Greener Future",
    subtitle:
      "Responsible manufacturing and sustainable solutions for a better tomorrow.",
  },

  introduction: {
    title: "Responsible Manufacturing",
    description:
      "We continuously improve our manufacturing processes to reduce waste, use resources responsibly, and create a more sustainable future.",
  },

  initiatives: [
    {
      title: "Eco-Friendly Manufacturing",
      description:
        "Responsible production methods help us minimize waste and reduce our environmental impact.",
      icon: "factory",
    },
    {
      title: "Waste Reduction",
      description:
        "We focus on efficient material use and practical processes that help reduce unnecessary production waste.",
      icon: "recycle",
    },
  ],
};

// ======================================================
// ICON HELPER
// ======================================================

const getIcon = (icon) => {
  const className = "h-5 w-5";

  switch (icon?.toLowerCase()) {
    case "factory":
      return <Factory className={className} strokeWidth={1.7} />;

    case "recycle":
      return <Recycle className={className} strokeWidth={1.7} />;

    case "leaf":
      return <Leaf className={className} strokeWidth={1.7} />;

    default:
      return <Leaf className={className} strokeWidth={1.7} />;
  }
};

// ======================================================
// COMPONENT
// ======================================================

const Sustainability = () => {
  // ====================================================
  // TANSTACK QUERY
  // ====================================================

  const {
    data: apiData,
    isError,
    isFetching,
  } = useQuery({
    queryKey: ["sustainability"],
    queryFn: fetchSustainability,

    // Page renders immediately.
    // API updates in background.
    initialData: defaultData,

    staleTime: 10 * 60 * 1000,
    gcTime: 20 * 60 * 1000,

    retry: 1,
    refetchOnWindowFocus: false,
  });

  // ====================================================
  // MERGE API + FALLBACK DATA
  // ====================================================

  const data = {
    ...defaultData,
    ...(apiData?.data || apiData || {}),

    hero: {
      ...defaultData.hero,
      ...(apiData?.data?.hero || apiData?.hero || {}),
    },

    introduction: {
      ...defaultData.introduction,
      ...(apiData?.data?.introduction ||
        apiData?.introduction ||
        {}),
    },

    initiatives:
      apiData?.data?.initiatives ||
      apiData?.initiatives ||
      defaultData.initiatives,
  };

  // ====================================================
  // SCROLL REVEAL
  // ====================================================

  useEffect(() => {
    const elements = document.querySelectorAll(
      "[data-sustainability-reveal]"
    );

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.remove(
            "opacity-0",
            "translate-y-5"
          );

          entry.target.classList.add(
            "opacity-100",
            "translate-y-0"
          );

          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [data]);

  return (
    <>
      <ScrollTop />

      {/* ==================================================
          SEO
      ================================================== */}

      <Helmet>
        <title>
          Sustainability | Innovation Plastic Cans Ltd.
        </title>

        <meta
          name="description"
          content="Learn about Innovation Plastic Cans Ltd.'s sustainability initiatives, responsible manufacturing practices, waste reduction, and environmental commitment."
        />

        <link
          rel="canonical"
          href="https://innovation-plastic.com/sustainability"
        />

        <meta
          property="og:title"
          content="Sustainability | Innovation Plastic Cans Ltd."
        />

        <meta
          property="og:description"
          content="Responsible manufacturing and sustainable solutions from Innovation Plastic Cans Ltd."
        />

        <meta
          property="og:type"
          content="website"
        />

        {/* ==================================================
            HERO ANIMATIONS
        ================================================== */}

        <style>
          {`
            @keyframes sustainabilityHeroText {
              from {
                opacity: 0;
                transform: translateY(22px);
              }

              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            @keyframes sustainabilityFade {
              from {
                opacity: 0;
              }

              to {
                opacity: 1;
              }
            }

            @keyframes sustainabilityLine {
              from {
                width: 0;
                opacity: 0;
              }

              to {
                width: 56px;
                opacity: 1;
              }
            }

            @keyframes sustainabilityArrow {
              0%,
              100% {
                transform: translateY(0);
              }

              50% {
                transform: translateY(4px);
              }
            }

            .sustainability-hero-badge {
              animation:
                sustainabilityFade
                0.6s
                ease-out
                both;
            }

            .sustainability-hero-line {
              animation:
                sustainabilityLine
                0.7s
                ease-out
                0.15s
                both;
            }

            .sustainability-hero-title {
              animation:
                sustainabilityHeroText
                0.75s
                ease-out
                0.08s
                both;
            }

            .sustainability-hero-description {
              animation:
                sustainabilityHeroText
                0.75s
                ease-out
                0.18s
                both;
            }

            .sustainability-hero-button {
              animation:
                sustainabilityHeroText
                0.75s
                ease-out
                0.28s
                both;
            }

            .sustainability-scroll-icon {
              animation:
                sustainabilityArrow
                1.5s
                ease-in-out
                infinite;
            }

            @media (prefers-reduced-motion: reduce) {
              .sustainability-hero-badge,
              .sustainability-hero-line,
              .sustainability-hero-title,
              .sustainability-hero-description,
              .sustainability-hero-button,
              .sustainability-scroll-icon {
                animation: none !important;
              }
            }
          `}
        </style>
      </Helmet>

      {/* ==================================================
          HERO — 100VH
      ================================================== */}

      <section className="relative isolate min-h-screen overflow-hidden bg-slate-950">
        {/* Background image */}
        <img
          src={heroImg}
          alt="Sustainability at Innovation Plastic Cans Ltd."
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Minimal dark overlay */}
        <div className="absolute inset-0 bg-slate-950/55" />

        {/* Hero content */}
        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-5 py-20 sm:px-8 lg:px-10">
          <div className="max-w-2xl text-white">

            {/* Badge */}
            <div className="sustainability-hero-badge mb-5 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-white/80">
              <span className="h-2 w-2 rounded-full bg-[#00A651]" />

              {data.hero.badge || "Sustainability"}
            </div>

            {/* Green line */}
            <div className="sustainability-hero-line mb-5 h-[2px] bg-[#00A651]" />

            {/* Title */}
            <h1 className="sustainability-hero-title max-w-2xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
              {data.hero.title}
            </h1>

            {/* Description */}
            <p className="sustainability-hero-description mt-5 max-w-xl text-sm leading-7 text-white/80 sm:text-base lg:text-lg">
              {data.hero.subtitle}
            </p>

            {/* Explore button */}
            <button
              type="button"
              onClick={() => {
                document
                  .getElementById("sustainability-content")
                  ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
              }}
              className="sustainability-hero-button mt-8 inline-flex items-center gap-2 text-sm font-medium text-white transition-colors duration-300 hover:text-[#00A651]"
            >
              Explore our approach

              <ArrowDown
                size={16}
                strokeWidth={1.7}
                className="sustainability-scroll-icon"
              />
            </button>
          </div>
        </div>
      </section>

      {/* ==================================================
          MAIN CONTENT
      ================================================== */}

      <main
        id="sustainability-content"
        className="bg-white"
      >

        {/* =================================================
            INTRODUCTION
        ================================================= */}

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
          <div
            data-sustainability-reveal
            className="mx-auto max-w-3xl translate-y-5 text-center opacity-0 transition-all duration-700 ease-out"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2E3192]">
              Our Commitment
            </span>

            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              {data.introduction.title}
            </h2>

            <div className="mx-auto mt-5 h-[2px] w-12 bg-[#00A651]" />

            <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              {data.introduction.description}
            </p>
          </div>
        </section>

        {/* =================================================
            INITIATIVES
        ================================================= */}

        <section className="border-y border-slate-100 bg-slate-50/60">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">

            {/* Section heading */}
            <div
              data-sustainability-reveal
              className="mb-10 translate-y-5 opacity-0 transition-all duration-700 ease-out"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2E3192]">
                Sustainability In Action
              </span>

              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
                Practical Steps Toward a Better Future
              </h2>
            </div>

            {/* Cards */}
            <div className="grid gap-5 md:grid-cols-2">
              {data.initiatives?.map((item, index) => (
                <article
                  key={item.id || `${item.title}-${index}`}
                  data-sustainability-reveal
                  className="group translate-y-5 rounded-2xl border border-slate-200 bg-white p-7 opacity-0 shadow-sm transition-all duration-700 ease-out hover:-translate-y-1 hover:border-[#2E3192]/20 hover:shadow-md"
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="flex items-start gap-5">

                    {/* Icon */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#2E3192]/5 text-[#2E3192] transition-colors duration-300 group-hover:bg-[#2E3192] group-hover:text-white">
                      {getIcon(item.icon)}
                    </div>

                    {/* Content */}
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* =================================================
            OUR APPROACH
        ================================================= */}

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">

            {/* Heading */}
            <div
              data-sustainability-reveal
              className="translate-y-5 opacity-0 transition-all duration-700 ease-out"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2E3192]">
                Our Approach
              </span>

              <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                Better Manufacturing.
                <br />

                <span className="text-[#2E3192]">
                  Better Tomorrow.
                </span>
              </h2>
            </div>

            {/* Principles */}
            <div
              data-sustainability-reveal
              className="translate-y-5 opacity-0 transition-all duration-700 ease-out"
            >
              <div className="space-y-5">

                {[
                  "Responsible use of materials",
                  "Reducing unnecessary production waste",
                  "Continuous improvement of manufacturing practices",
                  "Creating sustainable long-term value",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2
                      className="mt-0.5 shrink-0 text-[#00A651]"
                      size={19}
                      strokeWidth={1.8}
                    />

                    <p className="text-sm leading-6 text-slate-600 sm:text-base">
                      {item}
                    </p>
                  </div>
                ))}

              </div>
            </div>
          </div>
        </section>

        {/* =================================================
            FINAL CTA
        ================================================= */}

        <section className="border-t border-slate-100 bg-white">
          <div
            data-sustainability-reveal
            className="mx-auto max-w-4xl translate-y-5 px-5 py-16 text-center opacity-0 transition-all duration-700 ease-out sm:px-8 sm:py-20"
          >
            <Leaf
              className="mx-auto text-[#00A651]"
              size={30}
              strokeWidth={1.5}
            />

            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Sustainability Starts With Responsible Choices
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600">
              At Innovation Plastic Cans Ltd., we continue to look for
              practical ways to improve our processes and reduce our
              environmental impact.
            </p>
          </div>
        </section>
      </main>

      {/* ==================================================
          API STATUS
      ================================================== */}

      {isError && !isFetching && (
        <div className="fixed bottom-4 right-4 z-50 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs text-slate-500 shadow-lg">
          Showing available sustainability information.
        </div>
      )}
    </>
  );
};

export default Sustainability;