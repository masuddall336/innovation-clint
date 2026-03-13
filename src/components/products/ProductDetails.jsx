import React, { useState, useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AskYourQuestion from "../AskYourQus/AskYourQuestion";

const ProductDetails = ({ productInfo, setIsOpen }) => {
  const {
    title,
    category,
    capacity,
    material,
    description,
    img_url,
    thumbnail_url,
    _id,
  } = productInfo;

  const [activeImg, setActiveImg] = useState(img_url);
  const [showForm, setShowForm] = useState(false);
  const modalRef = useRef();

  useEffect(() => {
    setActiveImg(img_url);
  }, [img_url]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  const handleClose = () => setIsOpen(false);

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) handleClose();
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.5 },
    }),
  };

  const modalVariants = {
    hidden: { opacity: 0, y: -50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -50, scale: 0.95, transition: { duration: 0.3 } },
  };

  return (
    <>
      <div
        onClick={handleOutsideClick}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-3"
      >
        <motion.div
          ref={modalRef}
          className="bg-white w-full max-w-5xl rounded-2xl shadow-2xl relative font-poppins antialiased transform overflow-auto
                     max-h-[90vh] md:max-h-[85vh]"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Close Button */}
          <button
            className="absolute top-3 right-3 md:top-1 md:right-1 w-8 h-8 flex items-center justify-center rounded-full 
                       bg-gradient-to-r from-[#00A651] to-[#2E3192] text-white shadow-md
                       hover:scale-110 transition-transform cursor-pointer z-50"
            onClick={handleClose}
          >
            <FaTimes size={16} />
          </button>

          <div className="flex flex-col md:flex-row">
            {/* Left Image Section */}
            <div className="md:w-1/2 w-full p-4">
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl overflow-hidden">
                <img
                  src={activeImg}
                  alt="product"
                  className="w-full h-[260px] md:h-[380px] object-cover object-bottom transition-transform duration-300"
                />
              </div>
              <div className="flex gap-2 mt-3 overflow-x-auto">
                {[img_url, ...(thumbnail_url || [])].map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    onClick={() => setActiveImg(img)}
                    className={`w-16 h-16 rounded-lg cursor-pointer object-cover border-2 transition-all duration-300
                      ${activeImg === img
                        ? "border-none scale-105"
                        : "border-transparent opacity-70 hover:opacity-100"}`}
                  />
                ))}
              </div>
            </div>

            {/* Right Details Section */}
            <div className="md:w-1/2 w-full p-6 flex flex-col justify-between">
              <div className="overflow-hidden">
                <motion.h2
                  className="text-4xl font-bold tracking-tight font-poppins bg-gradient-to-r from-green-500 to-[#2E3192] bg-clip-text text-transparent mb-3"
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  custom={1}
                >
                  {title}
                </motion.h2>

                <motion.div
                  className="space-y-2 text-lg font-inter"
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  custom={2}
                >
                  <p>
                    <span className="font-semibold text-[#2E3192]">Category: </span>
                    <span className="text-gray-700">{category || "Not Found"}</span>
                  </p>
                  <p>
                    <span className="font-semibold text-[#2E3192]">Capacity: </span>
                    <span className="text-gray-700">{capacity || "Not Found"}</span>
                  </p>
                  <p>
                    <span className="font-semibold text-[#2E3192]">Material: </span>
                    <span className="text-gray-700">{material || "Not Found"}</span>
                  </p>
                </motion.div>

                <motion.p
                  className="text-gray-600 mt-5 leading-relaxed text-lg font-inter"
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  custom={3}
                >
                  {description}
                </motion.p>
              </div>

              {/* Buttons Section */}
              <motion.div
                className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-5"
                variants={textVariants}
                initial="hidden"
                animate="visible"
                custom={4}
              >
                <button
                  onClick={() => setShowForm(true)}
                  className="flex-1 text-center py-3 rounded-lg text-lg font-semibold text-white bg-gradient-to-r from-[#00A651] to-[#2E3192] hover:scale-[1.02] transition-transform shadow-md font-inter"
                >
                  Ask Your Question
                </button>

                <Link
                  to={`/products/${_id}`}
                  className="flex-1 text-center py-3 rounded-lg border border-[#5d5c5c] text-lg font-semibold text-black hover:text-white hover:bg-gradient-to-r from-[#00A651] to-[#2E3192] hover:border-0 hover:scale-[1.02] transition-transform shadow-md font-inter"
                >
                  View Details
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Ask Your Question Modal */}
        <AskYourQuestion isOpen={showForm} onClose={() => setShowForm(false)} />
    </>
  );
};

export default ProductDetails;