import { Helmet } from "react-helmet-async";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../firebase/AuthContext";
import "./DisplayProducts.css";
import ProductDetails from "./ProductDetails";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const cardVariants = (direction) => ({
  hidden: { opacity: 0, x: direction === "left" ? -50 : 50, y: 50 },
  visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
});

export default function DisplayProducts({ product, handleDelete, index }) {
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

  const direction = index % 2 === 0 ? "left" : "right";

  return (
    <>
      <Helmet>
        <title>High-Quality Plastic Packaging Products</title>
      </Helmet>

      <motion.div
        id={_id}
        className="pack-card bg-red rounded-lg text-[#737373b9] overflow-hidden cursor-pointer max-w-xs mx-auto overflow-hidden"
        variants={cardVariants(direction)}
        initial="hidden"
        animate={visible ? "visible" : "hidden"}
        whileHover={{
          y: -8,
          scale: 1,
          boxShadow: "10px 10px 15px 1px #737373b9",
          transition: {
            y: { type: "spring", stiffness: 150, damping: 3 },
            scale: { type: "spring", stiffness: 150, damping: 3 },
            boxShadow: { type: "tween", duration: 0.1 },
          },
        }}
      >
        <div className="card-image h-60 sm:h-64 md:h-72 lg:h-60 cursor-auto">
          <div className="relative h-full overflow-hidden rounded-t-xs">
            <img
              src={img_url}
              alt={name}
              className="absolute inset-0 w-full h-full object-cover object-bottom"
            />
            <div className="absolute inset-0 flex items-center justify-center  opacity-100 sm:opacity-0 hover:sm:opacity-100 transition-opacity duration-300 z-10">
              <button
                className="border bg-[#77767665] text-white px-3 cursor-pointer py-1 rounded-lg font-bold shadow"
                onClick={() => setIsOpen(true)}
              >
                Quick View
              </button>
            </div>
          </div>
        </div>

        <div className="pl-1 space-y-1 bg-white mt-2 p-3 rounded-b-lg cursor-auto">
          <h4 className="text-[#3b4042] font-bold text-lg">{name}</h4>
          <p className="text-sm font-medium text-[#7e7e7e] line-clamp-2">{description}</p>

          {user && (
            <div className="flex gap-2 justify-end mt-2">
              <Link to={`/edit-product/${_id}`}>
                <button className="border cursor-pointer px-2 py-1 rounded flex items-center gap-1 hover:bg-gray-100 text-sm">
                  <FaEdit /> Edit
                </button>
              </Link>

              <button
                onClick={() => handleDelete(_id, title)}
                className="bg-red-500 text-white px-2 py-1 cursor-pointer rounded flex items-center gap-1 hover:bg-red-600 text-sm"
              >
                <FaTrash /> Delete
              </button>
            </div>
          )}
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && <ProductDetails productInfo={product} setIsOpen={setIsOpen} />}
      </AnimatePresence>
    </>
  );
}