
import React, { useContext, useMemo, useState } from "react";
import "./Products.css";
import DisplayProducts from "./DisplayProducts";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../firebase/AuthContext";
import banner from "/img/product_section_banner_Compressed.png";
import ScrollTop from "../ScrollTop";
import { FaArrowDown, FaBoxOpen, FaRotate } from "react-icons/fa6";
import Swal from "sweetalert2";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../loading/Loading";

const Products = () => {
    const { user } = useContext(AuthContext);
    const queryClient = useQueryClient();

    const API_URL = import.meta.env.VITE_API_URL;

    const [activeCategory, setActiveCategory] = useState("All");
    const [bannerLoaded, setBannerLoaded] = useState(false);

    // =========================================================
    // FETCH PRODUCTS
    // Products are loaded directly inside Products.jsx
    // No React Router loader is required.
    // =========================================================

    const {
        data: allProducts = [],
        isLoading,
        isFetching,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["products"],

        queryFn: async () => {
            const response = await fetch(`${API_URL}/products`);

            if (!response.ok) {
                throw new Error(
                    `Failed to load products: ${response.status}`
                );
            }

            const data = await response.json();

            return Array.isArray(data) ? data : [];
        },

        // Keep cached products fresh for 5 minutes.
        staleTime: 1000 * 60 * 5,

        // Keep unused product cache for 30 minutes.
        gcTime: 1000 * 60 * 30,

        // Retry failed requests twice.
        retry: 2,

        // Prevent unnecessary refetch every time the user
        // switches browser tabs.
        refetchOnWindowFocus: false,
    });

    // =========================================================
    // FILTER PRODUCTS BY CATEGORY
    // =========================================================

    const filteredProducts = useMemo(() => {
        if (activeCategory === "All") {
            return allProducts;
        }

        return allProducts.filter(
            (product) => product.category === activeCategory
        );
    }, [allProducts, activeCategory]);

    // =========================================================
    // CATEGORIES
    // =========================================================

    const categories = useMemo(() => {
        return [
            ...new Set(
                allProducts
                    .map((product) => product.category)
                    .filter(Boolean)
            ),
        ];
    }, [allProducts]);

    // =========================================================
    // DELETE PRODUCT
    // =========================================================

    const handleDelete = async (id, title) => {
        const result = await Swal.fire({
            title: `Delete "${title}"?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        });

        if (!result.isConfirmed) {
            return;
        }

        try {
            const response = await fetch(`${API_URL}/products/${id}`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (data.deletedCount > 0) {
                await Swal.fire(
                    "Deleted!",
                    `"${title}" has been deleted.`,
                    "success"
                );

                // Immediately remove the product from the cache.
                queryClient.setQueryData(
                    ["products"],
                    (oldProducts = []) =>
                        oldProducts.filter(
                            (product) => product._id !== id
                        )
                );

                // Sync the cache with the backend.
                queryClient.invalidateQueries({
                    queryKey: ["products"],
                });
            } else {
                Swal.fire(
                    "Error!",
                    "Failed to delete the product.",
                    "error"
                );
            }
        } catch (deleteError) {
            console.error("Delete product error:", deleteError);

            Swal.fire(
                "Error!",
                "Something went wrong while deleting the product.",
                "error"
            );
        }
    };

    // =========================================================
    // INITIAL API LOADING
    // =========================================================

    if (isLoading) {
        return <Loading />;
    }

    // =========================================================
    // API ERROR
    // =========================================================

    if (isError) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center bg-white px-4">
                <div className="w-full max-w-md rounded-2xl border border-red-100 bg-white p-8 text-center shadow-xl">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                        <FaRotate className="text-2xl text-red-500" />
                    </div>

                    <h2 className="text-xl font-bold text-gray-800">
                        Products Could Not Be Loaded
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                        {error?.message ||
                            "Something went wrong while loading the products."}
                    </p>

                    <button
                        type="button"
                        onClick={() => refetch()}
                        className="
                            mt-6
                            inline-flex
                            items-center
                            gap-2
                            rounded-lg
                            bg-gradient-to-r
                            from-[#2E3192]
                            to-[#4348d1]
                            px-6
                            py-3
                            text-sm
                            font-semibold
                            text-white
                            shadow-md
                            transition-all
                            duration-300
                            hover:-translate-y-0.5
                            hover:shadow-lg
                        "
                    >
                        <FaRotate />
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // =========================================================
    // PAGE
    // =========================================================

    return (
        <div className="overflow-hidden bg-white">
            <ScrollTop />

            {/* =====================================================
                BANNER
            ====================================================== */}

            <div
                className="
                    relative
                    h-[25vh]
                    w-full
                    overflow-hidden
                    bg-gradient-to-br
                    from-[#eef7fb]
                    via-white
                    to-[#f7eff8]
                    md:h-[80vh]
                    lg:h-[65vh]
                "
            >
                {/* Banner Skeleton */}

                {!bannerLoaded && (
                    <div
                        className="
                            absolute
                            inset-0
                            overflow-hidden
                            bg-gradient-to-br
                            from-[#e8f5fa]
                            via-[#f4f7fb]
                            to-[#f5eaf6]
                        "
                    >
                        <div
                            className="
                                absolute
                                inset-0
                                animate-pulse
                                bg-gradient-to-r
                                from-transparent
                                via-white/70
                                to-transparent
                            "
                        />

                        <div
                            className="
                                absolute
                                left-1/2
                                top-1/2
                                h-12
                                w-52
                                -translate-x-1/2
                                -translate-y-1/2
                                rounded-xl
                                bg-white/60
                                shadow-sm
                            "
                        />
                    </div>
                )}

                <img
                    src={banner}
                    alt="Products banner"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    onLoad={() => setBannerLoaded(true)}
                    className={`
                        h-full
                        w-full
                        object-cover
                        object-right
                        transition-all
                        duration-700
                        ${
                            bannerLoaded
                                ? "scale-100 opacity-100"
                                : "scale-[1.02] opacity-0"
                        }
                    `}
                />
            </div>

            {/* =====================================================
                HEADING
            ====================================================== */}

            <div
                className="
                    relative
                    mx-auto
                    flex
                    w-[84%]
                    flex-col
                    items-center
                    justify-center
                    gap-4
                    py-4
                    md:flex-row
                    md:justify-between
                "
            >
                <h2
                    className="
                        typing-heading
                        flex
                        items-center
                        gap-3
                        rounded-lg
                        bg-[#2E3192]
                        px-3
                        py-2
                        text-xs
                        font-bold
                        text-white
                        shadow-lg
                        md:px-4
                        md:text-2xl
                    "
                >
                    <FaArrowDown className="animate-bounce text-xl md:text-2xl" />

                    <FaBoxOpen className="animate-pulse text-2xl md:text-3xl" />

                    <span className="typing-text">
                        Explore Our Plastic Packaging Solutions
                    </span>
                </h2>
            </div>

            {/* =====================================================
                CATEGORIES
            ====================================================== */}

            <div
                className="
                    mx-auto
                    mb-5
                    flex
                    w-[84%]
                    flex-wrap
                    justify-center
                    gap-2
                "
            >
                <button
                    type="button"
                    onClick={() => setActiveCategory("All")}
                    className={`
                        rounded-full
                        px-5
                        py-2
                        text-sm
                        font-semibold
                        transition-all
                        duration-300
                        ${
                            activeCategory === "All"
                                ? "bg-[#2E3192] text-white shadow-md"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }
                    `}
                >
                    All Products
                </button>

                {categories.map((category) => (
                    <button
                        key={category}
                        type="button"
                        onClick={() => setActiveCategory(category)}
                        className={`
                            rounded-full
                            px-5
                            py-2
                            text-sm
                            font-semibold
                            transition-all
                            duration-300
                            ${
                                activeCategory === category
                                    ? "bg-[#2E3192] text-white shadow-md"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }
                        `}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* =====================================================
                BACKGROUND REFRESH
            ====================================================== */}

            {isFetching && !isLoading && (
                <div
                    className="
                        mx-auto
                        mb-3
                        flex
                        items-center
                        justify-center
                        gap-2
                        text-xs
                        text-gray-400
                    "
                >
                    <span
                        className="
                            h-2
                            w-2
                            animate-pulse
                            rounded-full
                            bg-[#00AEEF]
                        "
                    />

                    Updating products...
                </div>
            )}

            {/* =====================================================
                PRODUCTS
            ====================================================== */}

            <section
                className="
                    products-section
                    grid
                    grid-cols-1
                    gap-3
                    sm:grid-cols-2
                    md:grid-cols-3
                    lg:grid-cols-4
                "
            >
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                        <DisplayProducts
                            key={product._id}
                            index={index}
                            product={product}
                            handleDelete={() =>
                                handleDelete(
                                    product._id,
                                    product.title || product.name
                                )
                            }
                        />
                    ))
                ) : (
                    <div
                        className="
                            col-span-full
                            flex
                            min-h-[300px]
                            items-center
                            justify-center
                        "
                    >
                        <div className="text-center">
                            <div
                                className="
                                    mx-auto
                                    mb-4
                                    flex
                                    h-20
                                    w-20
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-gray-100
                                "
                            >
                                <FaBoxOpen className="text-3xl text-gray-400" />
                            </div>

                            <h3 className="text-lg font-bold text-gray-700">
                                No Products Found
                            </h3>

                            <p className="mt-1 text-sm text-gray-400">
                                There are no products available in this
                                category.
                            </p>

                            {activeCategory !== "All" && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        setActiveCategory("All")
                                    }
                                    className="
                                        mt-4
                                        rounded-lg
                                        bg-[#2E3192]
                                        px-5
                                        py-2
                                        text-sm
                                        font-semibold
                                        text-white
                                        transition
                                        hover:bg-[#4348d1]
                                    "
                                >
                                    View All Products
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </section>

            {/* =====================================================
                ADD PRODUCT
            ====================================================== */}

            {user && (
                <div className="my-8 flex justify-center">
                    <NavLink
                        to="/products/add-product"
                        className="
                            rounded-lg
                            bg-gradient-to-r
                            from-[#2E3192]
                            to-[#4348d1]
                            px-6
                            py-3
                            font-semibold
                            text-white
                            shadow-md
                            transition-all
                            duration-300
                            hover:-translate-y-0.5
                            hover:shadow-xl
                        "
                    >
                        + Add New Product
                    </NavLink>
                </div>
            )}
        </div>
    );
};

export default Products;