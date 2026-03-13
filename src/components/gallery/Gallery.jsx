import { useEffect, useRef, useState } from "react";
import "./Gallery.css";
import p_1 from '../../../public/img/p_1.jpg'
import p_2 from '../../../public/img/p_4.jpg'
import p_3 from '../../../public/img/p_5.jpg'
import p_4 from '../../../public/img/p_2.jpg'
import ScrollTop from "../ScrollTop";
import { Helmet, HelmetProvider } from "react-helmet-async";

const products = [
  { id: 1, img: p_1, title: "Pail 20Ltr." },
  { id: 2, img: p_2, title: "Food Box" },
  { id: 3, img: p_3, title: "Food Box" },
  { id: 4, img: p_4, title: "Pail 20Ltr." }
];

export default function gallery() {
  const [active, setActive] = useState(0);
  const startX = useRef(0);

  /* ======================
     AUTOPLAY (RIGHT)
  ====================== */
  useEffect(() => {
    const timer = setInterval(() => {
      slideRight();
    }, 3500);
    return () => clearInterval(timer);
  }, [active]);

  /* ======================
     SLIDE CONTROLS
  ====================== */
  const slideLeft = () => {
    // move visible items LEFT
    setActive((prev) => (prev + 1) % products.length);
  };

  const slideRight = () => {
    // move visible items RIGHT
    setActive((prev) => (prev - 1 + products.length) % products.length);
  };

  /* ======================
     TOUCH
  ====================== */
  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    const diff = e.changedTouches[0].clientX - startX.current;
    if (diff > 50) slideRight();
    if (diff < -50) slideLeft();
  };

  return (
    <>
      <div
        className="gallery"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <Helmet>
          <meta name="robots" content="index, follow" />
          <title>Gallery | Industrial & Eco-Friendly Plastic Packaging Products in Bangladesh</title>
          <meta
            name="description"
            content="Explore the gallery of Innovation Plastic Cans Ltd., showcasing high-quality industrial and eco-friendly plastic packaging products, including pails, food boxes, and containers."
          />
          <meta
            name="keywords"
            content="Plastic packaging gallery, Plastic containers, Industrial plastic packaging, Eco-friendly plastic packaging, Pails, Food boxes, Plastic packaging manufacturer Bangladesh"
          />
          <link rel="canonical" href="https://innovation-plastic.com/gallery" />

        </Helmet>
        <ScrollTop></ScrollTop>
        {/* LEFT ARROW → SLIDE LEFT */}
        {/* <button className="arrow_gallery left" onClick={slideLeft}>‹</button> */}

        {/* <div className="track">
        {products.map((item, index) => {
          let level = index - active;

          if (level > 2) level -= products.length;
          if (level < -2) level += products.length;

          if (Math.abs(level) > 2) return null;

          return (
            <div key={item.id} className={`card level${level}`}>
              <img src={item.img} alt={item.title} />
              <h4>{item.title}</h4>
            </div>
          );
        })}
      </div> */}

        {/* RIGHT ARROW → SLIDE RIGHT */}
        {/* <button className="arrow_gallery right " onClick={slideRight}>›</button> */}
        <div className="text-center garrery_trafic   text-[#fff]">
          <h1>🚧 Page Under Construction</h1>
          <p>We are working hard to bring this page to you. Please check back soon.</p>
        </div>
      </div>
    </>
  );
}
