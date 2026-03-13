import React, { useContext, useState, useEffect } from "react";
import "./Products.css";
import DisplayProducts from "./DisplayProducts";
import { NavLink, useLoaderData } from "react-router-dom";
import { AuthContext } from "../../firebase/AuthContext";
import banner from "../../../public/img/product_section_banner.png";
import ScrollTop from "../ScrollTop";
import { FaArrowDown, FaBoxOpen } from "react-icons/fa";
import Swal from "sweetalert2";

// Spinner component
const Spinner = () => (
    <div className="flex justify-center items-center mt-[20%]">
        <div className="w-16 h-16 border-4 border-dashed border-blue-500 rounded-full animate-spin"></div>
    </div>
);

const Products = () => {
    const allProducts = useLoaderData();
    const { user } = useContext(AuthContext);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("All");

    // Set products after loader data is ready
    useEffect(() => {
        setProducts(allProducts);
        setLoading(false); // stop loading spinner
    }, [allProducts]);

    const API_URL = import.meta.env.VITE_API_URL;

    const handleDelete = (id, title) => {
        Swal.fire({
            title: `Delete "${title}"?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${API_URL}/products/${id}`, {
                    method: "DELETE",
                })
                    .then((res) => res.json())
                    .then((data) => {
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                "Deleted!",
                                `"${title}" has been deleted.`,
                                "success"
                            );
                            setProducts(products.filter((p) => p._id !== id));
                        } else {
                            Swal.fire("Error!", "Failed to delete the product.", "error");
                        }
                    })
                    .catch(() => Swal.fire("Error!", "Something went wrong!", "error"));
            }
        });
    };

    // Filter products by category
    const filteredProducts =
        activeCategory === "All"
            ? products
            : products.filter((p) => p.category === activeCategory);

    if (loading) {
        return <Spinner />; // Show spinner while loading
    }

    return (
        <div className="w-full overflow-hidden">
            <ScrollTop />

            {/* Banner */}
            <div className="w-full h-[25vh] md:h-[80vh] lg:h-[65vh]">
                <img
                    className="w-full h-full object-cover object-right"
                    src={banner}
                    alt="banner"
                />
            </div>

            {/* Heading */}
            <div className="relative flex flex-col md:flex-row w-[92%] mx-auto items-center justify-center md:justify-between gap-4 py-4 px-5">
                <h2 className="flex items-center gap-3 rounded py-2 px-4 font-bold text-xs md:text-2xl text-white bg-[#2E3192] shadow-lg">
                    <FaArrowDown className="text-xl md:text-2xl animate-bounce" />
                    <FaBoxOpen className="text-2xl md:text-3xl animate-pulse" />
                    <span className="typing-text">Explore Our Plastic Packaging Solutions</span>
                </h2>
            </div>

            {/* Products Grid */}
            <section className="products-section grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-5">
                {filteredProducts.map((product, index) => (
                    <DisplayProducts
                        key={product._id}
                        index={index}
                        product={product}
                        handleDelete={() => handleDelete(product._id, product.title)}
                    />
                ))}
            </section>

            {/* Add new product button */}
            {user && (
                <div className="my-5 flex justify-center">
                    <NavLink
                        to="/products/add-product"
                        className="bg-amber-300 py-2 px-4 rounded font-semibold hover:bg-amber-400 transition-colors"
                    >
                        Add New Product
                    </NavLink>
                </div>
            )}
        </div>
    );
};

export default Products;