import React from "react";
import "./InfiniteScroll.css";
import image1 from "../../../public/Products/Fresher_Food_Box_4_pcs.png";
import image2 from "../../../public/Products/Hello_Kitty_Tiffin_.png";
import image3 from "../../../public/Products/Lubricant_Can_green_5Ltr.png";
import image4 from "../../../public/Products/Lubricant_Gold_1Ltr.png";
import image5 from "../../../public/Products/Lubricants_Yellow_1Ltr.png";
import image6 from "../../../public/Products/Lunbiracant_Blue_5Ltr.png";
import image7 from "../../../public/Products/one_ltr_deep_orange.png";
import image8 from "../../../public/Products/one_ltr_golden.png";
import image9 from "../../../public/Products/one_ltr_silver.png";
import image10 from "../../../public/Products/one_ltr_yellow.png";

const images = [image1, image2, image3, image4, image5, image6, image1, image2, image3, image4, image5, image6, image7, image8, image9, image10]; // repeated for seamless loop

export default function InfiniteScroll() {
  return (
    <div className="scroll-container">
      <div className="scroll-track">
        {images.map((img, index) => (
          <img key={index} src={img} alt={`scroll-${index}`} className="scroll-img" />
        ))}
      </div>
    </div>
  );
}
