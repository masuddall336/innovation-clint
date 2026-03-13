import React, { useState, useEffect } from "react";
import "./Qc_Qa.css";
import videoIcon from "/icon/play.png";
import sampleVideo from "/Video/Qc_Qa_video.mp4";

// Carousel images
import Qc_slide_1 from "/img/Qc_Qa.jpg";
import ScrollTop from "../ScrollTop";
import { Helmet } from "react-helmet-async";

// Icons for each content block
import { FaCheckCircle, FaShieldAlt, FaIndustry, FaLightbulb } from "react-icons/fa";

const Qc_Qa = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    { id: 1, image: Qc_slide_1 }
  ];

  const openVideo = () => setIsVideoOpen(true);
  const closeVideo = () => setIsVideoOpen(false);

  // Automatic carousel slide
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  // Scroll animation for every text element
  useEffect(() => {
    const elements = document.querySelectorAll(".qcqa-unique-text, .qcqa-unique-text li");
    const handleScroll = () => {
      elements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 10) {
          setTimeout(() => {
            el.classList.add("qcqa-unique-text-visible");
          }, index * 100); // staggered animation
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Helmet>
        <meta name="robots" content="index, follow" />
        <title>Strict QA & QC Standards | Innovative Plastic Packaging Solutions</title>
        <meta name="description" content="Ensure excellence with our top-tier plastic packaging solutions. Our QA & QC standards guarantee durable, safe, and eco-conscious packaging for every industry." />
        <meta name="keywords" content="Plastic packaging QA,Plastic packaging QC standards,High-quality plastic packaging manufacturer,Eco-friendly plastic packaging solutions,Durable plastic packaging supplier,Industrial plastic packaging factory,Food-grade plastic packaging QA,Quality control in plastic production,Sustainable plastic packaging factory,Custom plastic packaging with QC approval,Innovative plastic packaging solutions,Certified plastic packaging manufacturer" />
        <link rel="canonical" href="https://innovation-plastic.com/qc_qa" />
      </Helmet>

      <div id="qcqa-unique-section">
        <ScrollTop />

        {/* Carousel */}
        <div id="qcqa-unique-carousel">
          {slides.map((slide, index) => (
            <img
              key={slide.id}
              src={slide.image}
              alt={`Slide ${index + 1}`}
              title="QC&QA image"
              className={`qcqa-unique-slide ${index === activeSlide ? "active" : ""}`}
            />
          ))}

          {/* Video Icon in Center */}
          <div id="qcqa-unique-carousel-video">
            <img
              src={videoIcon}
              alt="Play Video"
              title="Video Play Button"
              className="qcqa-unique-video-icon pulse"
              onClick={openVideo}
            />
          </div>
        </div>

        {/* Video Modal */}
        {isVideoOpen && (
          <div className="qcqa-unique-video-modal show" onClick={closeVideo}>
            <div className="qcqa-unique-video-wrapper" onClick={(e) => e.stopPropagation()}>
              <video controls autoPlay>
                <source src={sampleVideo} type="video/mp4" />
              </video>
              <button className="qcqa-unique-close-video" onClick={closeVideo}>✕</button>
            </div>
          </div>
        )}

        {/* QC/QA Content */}
        <div id="qcqa-unique-content">
          {/* Block 1 */}
          <div className="qcqa-unique-block qcqa-unique-text">
            <h1 className="qcqa-unique-main-text">
              <FaCheckCircle className="qcqa-icon" /> QC & QA – Ensuring Top-Quality Plastic Packaging
            </h1>
            <p>
              At <strong>Our Plastic Packaging Factory</strong>, quality is at the heart of everything we do.
              Our QC/QA team ensures safety, durability, and reliability for every product.
            </p>
          </div>

          {/* Block 2 */}
          <div className="qcqa-unique-block qcqa-unique-text">
            <h3 className="qcqa-unique-main-text"><FaShieldAlt className="qcqa-icon" /> Rigorous Quality Control (QC) Processes</h3>
            <ul>
              <li>Material Verification – Only high-grade plastics are used.</li>
              <li>Dimensional Accuracy – Perfect measurements every time.</li>
              <li>Strength & Durability Testing – Resistance to impact & temperature.</li>
              <li>Visual Inspection – No defects or discoloration.</li>
            </ul>
          </div>

          {/* Block 3 */}
          <div className="qcqa-unique-block qcqa-unique-text">
            <h3 className="qcqa-unique-main-text"><FaIndustry className="qcqa-icon" /> Comprehensive Quality Assurance (QA) System</h3>
            <ul>
              <li>ISO & Industry Standard Compliance</li>
              <li>Process Monitoring – Continuous supervision to minimize defects</li>
              <li>Batch Testing – Random product sampling</li>
              <li>Traceability – Complete documentation for accountability</li>
            </ul>
          </div>

          {/* Block 4 */}
          <div className="qcqa-unique-block qcqa-unique-text">
            <h3 className="qcqa-unique-main-text"><FaLightbulb className="qcqa-icon" /> Our QC/QA Capability</h3>
            <ul>
              <li>Consistency – High-quality packaging every time</li>
              <li>Safety – Tested for food & chemical compliance</li>
              <li>Customer Satisfaction – Meeting your exact requirements</li>
              <li>Innovation – Advanced testing and continuous improvement</li>
            </ul>
          </div>

          {/* Final Block */}
          <div className="qcqa-unique-block qcqa-unique-text">
            <p className="qcqa-unique-main-text_bottom">
              At Our<strong> Innovation Plastic Cans Ltd.</strong> quality is not just a process, it's a promise.
              Partner with us for superior plastic packaging that elevates your brand.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Qc_Qa;