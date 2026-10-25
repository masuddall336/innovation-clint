import { Helmet } from "react-helmet-async";
import { FaArrowRight, FaEdit, FaTrash } from "react-icons/fa";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../firebase/AuthContext";
import "./DisplayProducts.css";
import ProductDetails from "./ProductDetails";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function DisplayProducts({ product, handleDelete }) {
  const { name, img_url, description, _id, title } = product;
  const { user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    const el = document.getElementById(_id);
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [_id]);

  return (
    <>
      <Helmet>
        <title>High-Quality Plastic Packaging Products</title>
      </Helmet>

      <motion.div
        id={_id}
        className="pack-card w-full cursor-pointer overflow-hidden text-slate-600"
        role="button"
        tabIndex={0}
        aria-label={`View details for ${name}`}
        onClick={(event) => {
          if (event.target.closest("a, button")) return;
          setIsOpen(true);
        }}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setIsOpen(true);
          }
        }}
        variants={cardVariants}
        initial="hidden"
        animate={visible ? "visible" : "hidden"}
        whileHover={{
          y: -5,
          scale: 1,
          transition: {
            y: { type: "spring", stiffness: 220, damping: 18 },
            scale: { type: "spring", stiffness: 220, damping: 18 },
          },
        }}
      >
        <div className="card-image h-60 sm:h-64 md:h-72 lg:h-60">
          <div className="relative h-full overflow-hidden rounded-2xl">
            <img
              src={img_url}
              alt={name}
              className="absolute inset-0 w-full h-full object-cover object-bottom"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/15 via-transparent to-white/10" />
          </div>
        </div>

        <div className="product-card-content space-y-1.5 p-3.5">
          <h4 className="text-slate-800 font-bold text-base">{name}</h4>
          <p className="text-sm font-medium text-slate-600 line-clamp-2">{description}</p>

          <div className="product-card-footer mt-3 flex flex-wrap items-center justify-between gap-2">
            {user && (
              <div className="flex flex-wrap gap-2">
                <Link to={`/edit-product/${_id}`} onClick={(event) => event.stopPropagation()}>
                  <button className="product-card-action cursor-pointer px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 text-sm">
                    <FaEdit /> Edit
                  </button>
                </Link>

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleDelete(_id, title);
                  }}
                  className="product-card-delete text-white px-2.5 py-1.5 cursor-pointer rounded-lg flex items-center gap-1.5 text-sm"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            )}
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setIsOpen(true);
              }}
              className="product-card-view ml-auto inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold"
            >
              View details
              <span className="product-card-view-icon">
                <FaArrowRight aria-hidden="true" />
              </span>
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && <ProductDetails productInfo={product} setIsOpen={setIsOpen} />}
      </AnimatePresence>
    </>
  );
}
