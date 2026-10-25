import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaArrowRight, FaRegCommentDots, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AskYourQuestion from "../AskYourQus/AskYourQuestion";
import "./ProductDetails.css";

const ProductDetails = ({ productInfo, setIsOpen }) => {
  const { title, name, category, capacity, material, description, img_url, thumbnail_url, _id } = productInfo;
  const productTitle = title || name || "Product details";

  const [activeImg, setActiveImg] = useState(img_url);
  const [showForm, setShowForm] = useState(false);
  const modalRef = useRef();
  const handleClose = useCallback(() => setIsOpen(false), [setIsOpen]);

  useEffect(() => {
    setActiveImg(img_url);
  }, [img_url]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [handleClose]);

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) handleClose();
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 12, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.22, ease: "easeOut" } },
    exit: { opacity: 0, y: 8, scale: 0.985, transition: { duration: 0.16 } },
  };

  return (
    <>
      <div
        onClick={handleOutsideClick}
        className="fixed inset-0 z-[10020] flex items-center justify-center bg-slate-950/45 p-3 backdrop-blur-md sm:p-5"
        role="presentation"
      >
        <motion.div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="product-details-title"
          className="product-details-modal relative flex h-[min(760px,calc(100dvh-1.5rem))] w-full max-w-5xl flex-col overflow-hidden rounded-[26px] border border-white/80 bg-white/90 shadow-[0_28px_90px_rgba(15,23,42,0.32)] backdrop-blur-2xl md:h-[min(760px,calc(100dvh-2.5rem))] md:flex-row"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Close Button */}
          <button
            type="button"
            className="product-details-close absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full text-[#2E3192] transition hover:-translate-y-0.5"
            onClick={handleClose}
            aria-label="Close product details"
          >
            <FaTimes size={16} />
          </button>

          <div className="product-details-gallery flex shrink-0 flex-col p-4 sm:p-6 md:min-h-0 md:w-[46%]">
              <div className="product-details-image relative flex h-[230px] items-center justify-center overflow-hidden rounded-2xl p-3 sm:h-[320px] md:h-auto md:min-h-0 md:flex-1">
                <img
                  src={activeImg || img_url}
                  alt={productTitle}
                  className="h-full w-full object-contain transition-transform duration-300"
                />
              </div>
              <div className="product-details-thumbnails mt-3 flex gap-2 overflow-x-auto pb-1">
                {[...new Set([img_url, ...(Array.isArray(thumbnail_url) ? thumbnail_url : [])].filter(Boolean))].map((img) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setActiveImg(img)}
                    className={`product-thumbnail shrink-0 overflow-hidden rounded-xl p-1 transition ${activeImg === img ? "product-thumbnail-active" : "opacity-70 hover:opacity-100"}`}
                    aria-label={`View ${productTitle} image`}
                    aria-pressed={activeImg === img}
                  >
                    <img src={img} alt="" className="h-14 w-14 rounded-lg object-cover" />
                  </button>
                ))}
              </div>
          </div>

          <div className="product-details-copy product-details-scroll flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-5 pt-3 sm:px-7 sm:pb-7 md:py-8 md:pl-5">
              <div className="mb-5 pr-12">
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#00A651]">Product information</span>
                <h2 id="product-details-title" className="mt-2 text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl">
                  {productTitle}
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 md:grid-cols-1 xl:grid-cols-3">
                {[
                  ["Category", category],
                  ["Capacity", capacity],
                  ["Material", material],
                ].map(([label, value]) => (
                  <div key={label} className="product-detail-meta rounded-xl px-3.5 py-3">
                    <div className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">{label}</div>
                    <div className="mt-1 text-sm font-semibold text-slate-800">{value || "Not specified"}</div>
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <h3 className="text-sm font-semibold text-slate-900">Description</h3>
                <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-600">
                  {description || "Contact us to learn more about this product."}
                </p>
              </div>

              <div className="mt-auto grid grid-cols-1 gap-3 pt-6 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setShowForm(true)}
                  className="product-card-view inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold"
                >
                  <span className="product-card-view-icon"><FaRegCommentDots aria-hidden="true" /></span>
                  Ask a question
                </button>

                <Link
                  to={`/products/${_id}`}
                  className="product-card-view inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold"
                >
                  Product page
                  <span className="product-card-view-icon"><FaArrowRight aria-hidden="true" /></span>
                </Link>
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
