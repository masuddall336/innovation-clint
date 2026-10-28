import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import { Link } from "react-router-dom";
import Loading from "../loading/Loading";
import "./ProductPage.css";

const Details = ({ product }) => {
  const thumbnails = [
    ...new Set([
      product?.img_url,
      ...(Array.isArray(product?.thumbnail_url) ? product.thumbnail_url : []),
    ].filter(Boolean)),
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const title = product?.title || product?.name || "Product details";

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    setActiveIndex(0);
  }, [product]);

  useEffect(() => {
    if (!lightbox) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (event) => {
      if (event.key === "Escape") setLightbox(false);
      if (event.key === "ArrowRight") setActiveIndex((index) => (index + 1) % thumbnails.length);
      if (event.key === "ArrowLeft") setActiveIndex((index) => (index - 1 + thumbnails.length) % thumbnails.length);
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [lightbox, thumbnails.length]);

  if (!product) return <Loading />;

  const activeImage = thumbnails[activeIndex] || product.img_url;
  const specifications = [
    ["Category", product.category],
    ["Capacity", product.capacity],
    ["Material", product.material],
  ].filter(([, value]) => value);

  const moveImage = (direction) => {
    setActiveIndex((index) => (index + direction + thumbnails.length) % thumbnails.length);
  };

  return (
    <div className="product-page min-h-screen bg-[#edf0f6] pb-16">
      <section className="product-page-banner relative isolate h-[220px] overflow-hidden sm:h-[260px] lg:h-[300px]" aria-label="Product collection banner">
        <img
          src="/img/product_section_banner_Compressed.png"
          alt="Plastic packaging products at our manufacturing facility"
          className="absolute inset-0 h-full w-full object-cover object-center"
          fetchPriority="high"
          decoding="async"
        />
      </section>

      <main className="mx-auto mt-6 grid w-full max-w-7xl gap-6 px-4 sm:mt-8 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-10">
        <section className="product-page-panel rounded-[26px] p-4 sm:p-6" aria-label="Product images">
          <button
            type="button"
            className="product-page-image group relative flex h-[320px] w-full items-center justify-center overflow-hidden rounded-2xl p-5 sm:h-[440px] lg:h-[520px]"
            onClick={() => thumbnails.length && setLightbox(true)}
            aria-label="Expand product image"
          >
            {activeImage ? (
              <img
                key={activeImage}
                src={activeImage}
                alt={title}
                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.025]"
              />
            ) : (
              <span className="text-sm text-slate-400">Product image unavailable</span>
            )}
            {thumbnails.length > 0 && (
              <span className="product-page-expand absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full text-[#2E3192]">
                <Expand size={17} aria-hidden="true" />
              </span>
            )}
          </button>

          {thumbnails.length > 1 && (
            <div className="product-page-thumbnails mt-5 flex gap-3 overflow-x-auto pb-1">
              {thumbnails.map((image, index) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`product-page-thumbnail h-[74px] w-[74px] shrink-0 overflow-hidden rounded-xl p-1 transition ${activeIndex === index ? "product-page-thumbnail-active" : "opacity-75 hover:opacity-100"}`}
                  aria-label={`Show product image ${index + 1}`}
                  aria-pressed={activeIndex === index}
                >
                  <img src={image} alt="" className="h-full w-full rounded-lg object-cover" />
                </button>
              ))}
            </div>
          )}
        </section>

        <section className="product-page-panel flex flex-col rounded-[26px] p-5 sm:p-7 lg:p-8" aria-label="Product specifications">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#00A651]">Product details</p>
            <h2 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl">{title}</h2>
            {product.description && (
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">{product.description}</p>
            )}
          </div>

          {specifications.length > 0 && (
            <div className="grid gap-3 sm:grid-cols-2">
              {specifications.map(([label, value]) => (
                <div className="product-page-spec rounded-2xl px-4 py-3.5" key={label}>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">{label}</p>
                  <p className="mt-1.5 text-sm font-semibold text-slate-800">{value}</p>
                </div>
              ))}
            </div>
          )}

          {(product.usages || product.additional_info) && (
            <div className="mt-6 space-y-4 border-t border-white/90 pt-5">
              {product.usages && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Typical use</h3>
                  <p className="mt-1.5 whitespace-pre-line text-sm leading-6 text-slate-600">{product.usages}</p>
                </div>
              )}
              {product.additional_info && (
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">Additional information</h3>
                  <p className="mt-1.5 whitespace-pre-line text-sm leading-6 text-slate-600">{product.additional_info}</p>
                </div>
              )}
            </div>
          )}

          <div className="mt-auto flex flex-col gap-3 pt-7 sm:flex-row">
            <Link to="/contact-us" className="product-page-button inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold">
              Contact us <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link to="/products" className="product-page-secondary inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold">
              <ArrowLeft size={16} aria-hidden="true" /> Browse products
            </Link>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {lightbox && activeImage && (
          <motion.div
            className="fixed inset-0 z-[10020] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
            role="presentation"
          >
            <button type="button" onClick={() => setLightbox(false)} className="product-page-lightbox-control absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full text-white" aria-label="Close image viewer">
              <X size={20} />
            </button>
            {thumbnails.length > 1 && (
              <button type="button" onClick={(event) => { event.stopPropagation(); moveImage(-1); }} className="product-page-lightbox-control absolute left-4 flex h-12 w-12 items-center justify-center rounded-full text-white sm:left-8" aria-label="Previous image">
                <ArrowLeft size={20} />
              </button>
            )}
            <motion.img
              key={activeImage}
              src={activeImage}
              alt={title}
              className="max-h-[86vh] max-w-[88vw] rounded-2xl object-contain shadow-2xl"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              onClick={(event) => event.stopPropagation()}
            />
            {thumbnails.length > 1 && (
              <button type="button" onClick={(event) => { event.stopPropagation(); moveImage(1); }} className="product-page-lightbox-control absolute right-4 flex h-12 w-12 items-center justify-center rounded-full text-white sm:right-8" aria-label="Next image">
                <ArrowRight size={20} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Details;
