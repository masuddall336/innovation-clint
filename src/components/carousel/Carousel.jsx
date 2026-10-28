import React, { useState, useEffect } from "react";
import "./Carosel.css";

const slides = [
  { image: "/img/Slider_4.jpg", fixedText: "We Provide", changingTexts: ["Eco Friendly Environment"] },
  { image: "/img/Slider_2.png", fixedText: "Our", changingTexts: ["In Mould Product"] },
  { image: "/img/Slider_3.png", fixedText: "We Produce", changingTexts: ["Reliable Plastic Packaging Solutions"] },
  { image: "/img/Slider_1.png", fixedText: "We Produce", changingTexts: ["Innovative Packaging"] }
];

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  // Change text
  useEffect(() => {
    const textInterval = setInterval(() => {
      setCurrentTextIndex(
        (prev) => (prev + 1) % slides[currentSlide].changingTexts.length
      );
    }, 2000);

    return () => clearInterval(textInterval);
  }, [currentSlide]);

  // Change slide
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setCurrentTextIndex(0);
    }, 6500);

    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="carousel ">
      {/* Slides */}
      {slides.map((slide, index) => (
        <img
          width='100%'
          height='100%'
          title='Carosel Images Product Of Company and Factory Images is here'
          key={index}
          src={slide.image}
          alt="carousel"
          loading={index === 0 ? "eager" : "lazy"}
          fetchpriority={index === 0 ? "high" : "low"}
          decoding="async"
          className={`slide-image ${index === currentSlide ? "active" : ""}`}
        />
      ))}

      {/* Gradient overlay for better text visibility */}
      {<div className="gradient-overlay"></div>

        // Floating decorative layer ABOVE image
        // <div className="floating-top">
        //   <span className="master-circle c1"></span>
        //   <span className="master-circle c2"></span>
        //   <span className="master-circle c3"></span>
        //   <span className="master-circle c4"></span>
        //   <span className="master-circle c5"></span>
        // </div> 
      }

      {/* Text */}
      <div className="text-overlay ">
        <h2 className="fixed-text">{slides[currentSlide].fixedText}</h2>
        <p
          key={`${currentSlide}-${currentTextIndex}`}
          className="changing-text"
        >
          {slides[currentSlide].changingTexts[currentTextIndex]}
        </p>

        {/* Floating circles under text */}
        {/* <div className="floating-bottom">
          <span className="master-circle small"></span>
          <span className="master-circle medium"></span>
          <span className="master-circle large"></span>
          <span className="master-circle extra"></span>
        </div> */}
      </div>

      {/* Indicators */}
      <div className="carousel-indicators ">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`indicator ${index === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
