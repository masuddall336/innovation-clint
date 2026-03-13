import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Details = ({ product }) => {
  const images = [product?.img_url, ...(product?.thumbnail_url || [])];

  const [activeIndex, setActiveIndex] = useState(0);
  const [imgLoading, setImgLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (product) {
      setActiveIndex(0);
      setPageLoading(true);
      setTimeout(() => setPageLoading(false), 400);
    }
  }, [product]);

  // Keyboard support
  useEffect(() => {
    const handleKey = (e) => {
      if (!lightbox) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") setLightbox(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightbox, activeIndex]);

  const changeImage = (index) => {
    if (index === activeIndex) return;
    setImgLoading(true);
    const preload = new Image();
    preload.src = images[index];
    preload.onload = () => {
      setActiveIndex(index);
      setImgLoading(false);
    };
  };

  const nextImage = () => {
    const newIndex = (activeIndex + 1) % images.length;
    changeImage(newIndex);
  };

  const prevImage = () => {
    const newIndex = (activeIndex - 1 + images.length) % images.length;
    changeImage(newIndex);
  };

  if (!product) return <div className="p-4 text-center">Loading...</div>;

  // Motion variants for text animation
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: pageLoading ? 0 : 1, y: pageLoading ? 10 : 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-[92%] mx-auto px-4 py-4"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* LEFT SIDE */}
        <div>

          {/* MAIN IMAGE */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg group bg-gray-100 w-full">
            <AnimatePresence mode="wait">
              <motion.img
                key={images[activeIndex]}
                src={images[activeIndex]}
                alt="product"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: imgLoading ? 0 : 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                onLoad={() => setImgLoading(false)}
                onClick={() => setLightbox(true)}
                className="w-full max-h-[300px] md:max-h-[350px] object-contain cursor-zoom-in transition-transform duration-300 group-hover:scale-105"
              />
            </AnimatePresence>
            {imgLoading && <div className="absolute inset-0 animate-pulse bg-gray-200" />}
          </div>

          {/* THUMBNAILS */}
          <div className="flex gap-2 overflow-x-auto pb-2 mt-3">
            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => changeImage(i)}
                className={`flex-shrink-0 cursor-pointer rounded-xl h-20 w-20 object-cover border-2 transition duration-200 hover:scale-105 ${activeIndex === i ? "border-amber-50 scale-105" : "border-transparent"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={pageLoading ? "hidden" : "visible"}
          className="space-y-3"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl font-[900] tracking-tight font-poppins bg-gradient-to-r from-green-500 to-[#2E3192] bg-clip-text text-transparent mb-3"
          >
            {product.title}
          </motion.h2>

          <motion.p variants={itemVariants}><b>Category:</b> {product.category || "Category not found"}</motion.p>
          <motion.p variants={itemVariants}><b>Capacity:</b> {product.capacity || "Capacity not found"}</motion.p>
          <motion.p variants={itemVariants}><b>Material:</b> {product.material || "Material not found"}</motion.p>
          <motion.p variants={itemVariants}><b>Usage:</b> {product.usages || "Not Uses Found"}</motion.p>
          <motion.p variants={itemVariants}><b>Additional Info:</b> {product.additional_info || "Information not found"}</motion.p>
          <motion.p variants={itemVariants}><b>Description:</b> {product.description}</motion.p>
        </motion.div>
      </div>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
          >

            {/* LEFT ARROW */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-5 text-white text-4xl bg-black/40 cursor-pointer px-1 py-1 rounded-full hover:bg-black"
            >
              ←
            </button>

            {/* IMAGE */}
            <motion.img
              key={images[activeIndex]}
              src={images[activeIndex]}
              className="max-h-[90%] max-w-[90%] rounded-xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            />

            {/* RIGHT ARROW */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-5 text-white text-4xl bg-black/40 px-1 py-1 rounded-full cursor-pointer hover:bg-black"
            >
              →
            </button>

          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Details;