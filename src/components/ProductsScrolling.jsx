import React from "react";
import "./productsScrolling.css";

import img1 from "/outlineimg/01.png";
import img2 from "/outlineimg/02.png";
import img3 from "/outlineimg/03.png";
import img4 from "/outlineimg/04.png";
import img5 from "/outlineimg/05.png";
import img6 from "/outlineimg/06.png";
import img7 from "/outlineimg/07.png";
import img8 from "/outlineimg/8.png";
import img9 from "/outlineimg/9.png";
import img10 from "/outlineimg/10.png";
import img11 from "/outlineimg/11.png";
import img12 from "/outlineimg/12.png";

const ProductsScrolling = () => {

  const products = [
    img1, img2, img3, img4, img5, img6,
    img7, img8, img9, img10, img11, img12
  ];

  return (
    <section className="logo-slider">

      <div className="logo-track">

        {[...products, ...products].map((img, index) => (
          <div className="logo-item" key={index}>
            <img src={img} alt="product logo" />
          </div>
        ))}

      </div>

    </section>
  );
};

export default ProductsScrolling;