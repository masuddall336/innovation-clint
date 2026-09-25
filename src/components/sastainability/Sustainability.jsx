import React, { useEffect, useState } from "react";
import "./Sustainability.css";

import heroImg from "../../../public/img/Sustainability.jpg";
import ScrollTop from "../ScrollTop";

import { Helmet } from "react-helmet-async";

const Sustainability = () => {
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const image = new Image();

    image.onload = () => {
      if (mounted) {
        // Small delay makes the transition smoother
        requestAnimationFrame(() => {
          setPageLoading(false);
        });
      }
    };

    image.onerror = () => {
      if (mounted) {
        setPageLoading(false);
      }
    };

    image.src = heroImg;

    // Already cached
    if (image.complete) {
      setPageLoading(false);
    }

    return () => {
      mounted = false;
    };
  }, []);

  // Scroll reveal
  useEffect(() => {
    const sections = document.querySelectorAll(".reveal");

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Progress bar
  useEffect(() => {
    const bars = document.querySelectorAll(".progress-bar");

    if (!bars.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.width =
              `${entry.target.dataset.progress}%`;

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    bars.forEach((bar) => observer.observe(bar));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Helmet>
        <meta name="robots" content="index, follow" />

        <title>
          Sustainability Of Innovation Plastic Cans Ltd.
        </title>

        <meta
          name="description"
          content="Building a greener future through responsible manufacturing and innovative eco-friendly solutions."
        />

        <meta
          name="keywords"
          content="Sustainability, Ecofriendly, Biodegradable, Green, Lowcarbon, Reuse, Plastic, Packaging"
        />

        <link
          rel="canonical"
          href="https://innovation-plastic.com/sustainability"
        />

        {/* Tell browser to load banner image early */}
        <link
          rel="preload"
          as="image"
          href={heroImg}
          fetchPriority="high"
        />
      </Helmet>

      {/* ==============================
          FULL PAGE LOADING SCREEN
      =============================== */}
      {pageLoading && (
  <div className="sustainability-page-loader">
    <div className="sustainability-loader-box">
      <div className="loader-shimmer"></div>

      <div className="loader-logo-box"></div>

      <div className="loader-title-box"></div>

      <div className="loader-text-box"></div>

      <div className="loader-text-box loader-text-short"></div>

      <div className="loader-button-box"></div>
    </div>
  </div>
)}

      {/* ==============================
          ACTUAL PAGE
      =============================== */}
      <div
        className={`sustainability-page ${
          pageLoading ? "sustainability-hidden" : "sustainability-visible"
        }`}
      >
        <ScrollTop />

        {/* ==============================
            HERO BANNER
        =============================== */}
        <section
          className="hero-section"
          style={{
            backgroundImage: `url("${heroImg}")`,
          }}
        >
          <div className="hero-overlay">
            <h1>Sustainability Of Our Innovation</h1>

            <p>
              Building a greener future through responsible manufacturing and
              innovative eco-friendly solutions.
            </p>
          </div>
        </section>

        {/* ==============================
            CONTENT
        =============================== */}

        <section className="sustain-block reveal">
          <h2>Eco-Friendly Manufacturing</h2>

          <p>
            We use advanced technology to minimize waste, reduce emissions, and
            ensure environmentally responsible production.
          </p>
        </section>

        <section className="sustain-block reveal">
          <h2>Energy Efficiency</h2>

          <p>
            Our facility includes energy-saving systems and optimized workflows
            to reduce carbon footprint.
          </p>
        </section>

        {/* ==============================
            SUSTAINABILITY GOALS
        =============================== */}

        <section className="sustain-block reveal">
          <h2>Our Sustainability Goals</h2>

          <div className="progress-item">
            <span>Energy Saving (40%)</span>

            <div className="progress-container">
              <div
                className="progress-bar"
                data-progress="40"
              ></div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Sustainability;