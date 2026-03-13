import React, { useEffect } from "react";
import "./Sustainability.css";
import heroImg from "../../../public/img/Sustainability.jpg"; // <-- change image path as needed
import ScrollTop from "../ScrollTop";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Sustainability = () => {
  // const [darkMode, setDarkMode] = useState(false);

  // Scroll animation
  useEffect(() => {
    const sections = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach((section) => observer.observe(section));
  }, []);

  // Progress bar animation
  useEffect(() => {
    const bars = document.querySelectorAll(".progress-bar");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.width = entry.target.dataset.progress + "%";
          }
        });
      },
      { threshold: 0.5 }
    );

    bars.forEach((bar) => observer.observe(bar));
  }, []);

  return (
    <>
      <Helmet>
        <meta name="robots" content="index, follow" />
        <title>Sustainability Of Innovation Plastic Cans Ltd.</title>
        <meta name="description" content="Building a greener future through responsible manufacturing and
              innovative eco-friendly solutions." />
        <meta name="keywords" content="Sustainability, Ecofriendly, Biodegradable, Green, Lowcarbon, Reuse, Plastic, Packaging" />
        <link rel="canonical" href="https://innovation-plastic.com/sustainability" />
      </Helmet>
      {/* <h1>Sustainability</h1> */}
      <div>
        <ScrollTop></ScrollTop>
        {/* Dark Mode Toggle */}
        {/* <button className="dark-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button> */}

        {/* Hero Banner */}
        <div
          className="hero-section"
          style={{ backgroundImage: `url(${heroImg})` }}
        >
          <div className="hero-overlay">
            <h1>Sustainability Of Our Innovation</h1>
            <p>
              Building a greener future through responsible manufacturing and
              innovative eco-friendly solutions.
            </p>
          </div>
        </div>

        {/* Main Content */}
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
            Our facility includes energy-saving systems and optimized workflows to
            reduce carbon footprint.
          </p>
        </section>

        {/* Progress Bars */}
        <section className="sustain-block reveal">
          <h2>Our Sustainability Goals</h2>

          {/* <div className="progress-item">
          <span>Waste Reduction (100%)</span>
          <div className="progress-container">
            <div className="progress-bar" data-progress="100"></div>
          </div>
        </div> */}


          <div className="progress-item">
            <span>Energy Saving (40%)</span>
            <div className="progress-container">
              <div className="progress-bar" data-progress="40"></div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Sustainability;
