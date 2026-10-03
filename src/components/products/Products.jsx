
import React, { useContext, useMemo, useState } from "react";
import "./Products.css";
import DisplayProducts from "./DisplayProducts";
import { NavLink } from "react-router-dom";
import banner from "/img/product_section_banner_Compressed.png";
import ScrollTop from "../ScrollTop";

import {
  FaArrowDown,
  FaBoxOpen,
  FaRotate,
  FaMagnifyingGlass,
  FaXmark,
} from "react-icons/fa6";

import Swal from "sweetalert2";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loading from "../loading/Loading";
import { AuthContext } from "../../firebase/AuthContext";

const Products = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const [searchInput, setSearchInput] = useState("");
  const [activeSearch, setActiveSearch] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  /* =====================================================
     FETCH PRODUCTS
  ====================================================== */
  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["products"],

    queryFn: async () => {
      if (!API_URL) {
        throw new Error("VITE_API_URL is not configured");
      }

      const response = await fetch(`${API_URL}/products`);

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        return data;
      }

      if (Array.isArray(data?.products)) {
        return data.products;
      }

      return [];
    },

    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  /* =====================================================
     SEARCH
  ====================================================== */
  const filteredProducts = useMemo(() => {
    const search = activeSearch.trim().toLowerCase();

    if (!search) {
      return products;
    }

    return products.filter((product) => {
      const title = product?.title || "";
      const name = product?.name || "";
      const category = product?.category || "";

      const subcategory =
        product?.subcategory ||
        product?.subCategory ||
        "";

      const description = product?.description || "";

      const searchableText = `
        ${title}
        ${name}
        ${category}
        ${subcategory}
        ${description}
      `.toLowerCase();

      return searchableText.includes(search);
    });
  }, [products, activeSearch]);

  /* =====================================================
     SEARCH SUBMIT
  ====================================================== */
  const handleSearch = (e) => {
    e.preventDefault();

    setActiveSearch(searchInput.trim());
  };

  /* =====================================================
     CLEAR SEARCH
  ====================================================== */
  const handleClearSearch = () => {
    setSearchInput("");
    setActiveSearch("");
  };

  /* =====================================================
     DELETE PRODUCT
  ====================================================== */
  const handleDeleteProduct = async (product) => {
    if (!product?._id) return;

    const result = await Swal.fire({
      title: "Delete Product?",
      text: "This product will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#2E3192",
    });

    if (!result.isConfirmed) return;

    try {
      if (!API_URL) {
        throw new Error("VITE_API_URL is not configured");
      }

      const response = await fetch(
        `${API_URL}/products/${product._id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      queryClient.setQueryData(
        ["products"],
        (oldProducts = []) =>
          oldProducts.filter(
            (item) => item?._id !== product._id
          )
      );

      await queryClient.invalidateQueries({
        queryKey: ["products"],
      });

      Swal.fire({
        icon: "success",
        title: "Deleted",
        text: "Product deleted successfully.",
        timer: 1600,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Delete product error:", error);

      Swal.fire({
        icon: "error",
        title: "Delete Failed",
        text:
          error?.message ||
          "Unable to delete this product.",
      });
    }
  };

  /* =====================================================
     LOADING
  ====================================================== */
  if (isLoading) {
    return <Loading />;
  }

  /* =====================================================
     ERROR
  ====================================================== */
  if (isError) {
    return (
      <>
        <ScrollTop />

        <div className="flex min-h-[60vh] items-center justify-center px-5">
          <div
            className="
              w-full
              max-w-md
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-8
              text-center
              shadow-lg
            "
          >
            <div
              className="
                mx-auto
                mb-5
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                bg-slate-100
              "
            >
              <FaRotate className="text-xl text-[#2E3192]" />
            </div>

            <h2 className="text-xl font-bold text-slate-800">
              Unable to Load Products
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Something went wrong while loading the
              products. Please try again.
            </p>

            <button
              type="button"
              onClick={() => refetch()}
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-[#2E3192]
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                shadow-md
                transition
                hover:bg-[#1E216F]
              "
            >
              <FaRotate />
              Try Again
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen min-w-0 overflow-x-clip bg-white">
      <ScrollTop />

      {/* =====================================================
          OPTIMIZED PRODUCT BANNER
      ====================================================== */}
      <section
        className="
          relative
          w-full
          overflow-hidden
          bg-slate-100
        "
      >
        <img
          src={banner}
          alt="Our Products"
          width="1920"
          height="700"
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="
            block
            h-[220px]
            w-full
            object-cover
            object-right

            sm:h-[280px]

            md:h-[400px]

            lg:h-[500px]

            xl:h-[520px]
          "
        />
      </section>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <main className="w-full min-w-0 overflow-x-clip">

        {/* ===================================================
            HEADING + SEARCH
        ==================================================== */}
        <div
          className="
            mx-auto
            flex
            w-full
            max-w-[1440px]
            flex-col
            gap-3
            px-3
            py-4

            sm:px-4

            lg:flex-row
            lg:items-center
            lg:justify-between
            lg:px-6
          "
        >
          {/* LEFT CONTENT */}
          <div className="flex min-w-0 items-center gap-2.5">
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-[#2E3192]/10
              "
            >
              <FaBoxOpen className="text-base text-[#2E3192]" />
            </div>

            <div>
              <h1
                className="
                  text-lg
                  font-bold
                  text-slate-800

                  sm:text-xl
                "
              >
                Our Products
              </h1>

              <p
                className="
                  mt-0.5
                  text-xs
                  text-slate-500

                  sm:text-sm
                "
              >
                Explore our complete product collection
              </p>
            </div>
          </div>

          {/* SEARCH */}
          <form
            onSubmit={handleSearch}
            className="
              flex
              w-full
              max-w-[400px]
              items-center
              gap-1.5

              lg:w-[34%]
            "
          >
            <div
              className="
                relative
                flex
                h-10
                w-full
                items-center
                overflow-hidden
                rounded-xl
                border
                border-slate-200
                bg-white
                shadow-sm
                transition

                focus-within:border-[#2E3192]

                focus-within:shadow-[0_8px_25px_rgba(46,49,146,0.10)]
              "
            >
              <FaMagnifyingGlass
                className="
                  ml-3
                  shrink-0
                  text-sm
                  text-slate-400
                "
              />

              <input
                type="text"
                value={searchInput}
                onChange={(e) =>
                  setSearchInput(e.target.value)
                }
                placeholder="Search products..."
                className="
                  h-full
                  min-w-0
                  flex-1
                  bg-transparent
                  px-2.5
                  text-sm
                  text-slate-700
                  outline-none

                  placeholder:text-slate-400
                "
              />

              {searchInput && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="
                    mr-2
                    flex
                    h-7
                    w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    text-slate-400
                    transition

                    hover:bg-slate-100
                    hover:text-slate-700
                  "
                  aria-label="Clear search"
                >
                  <FaXmark />
                </button>
              )}
            </div>

            <button
              type="submit"
              className="
                flex
                h-10
                shrink-0
                items-center
                gap-2
                rounded-xl
                bg-[#2E3192]
                px-3
                text-sm
                font-semibold
                text-white
                shadow-sm
                transition

                hover:bg-[#1E216F]

                active:scale-[0.98]
              "
            >
              <FaMagnifyingGlass />

              <span className="hidden md:inline">
                Search
              </span>
            </button>
          </form>
        </div>

        {/* ===================================================
            SEARCH RESULT INFO
        ==================================================== */}
        {activeSearch && (
          <div
            className="
              mx-auto
              w-full
              max-w-[1440px]
              px-3
              pb-2

              sm:px-4

              lg:px-6
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
                rounded-xl
                border
                border-slate-100
                bg-slate-50
                px-4
                py-3
              "
            >
              <p className="text-sm text-slate-600">
                Search results for{" "}
                <span className="font-semibold text-[#2E3192]">
                  "{activeSearch}"
                </span>
              </p>

              <button
                type="button"
                onClick={handleClearSearch}
                className="
                  text-xs
                  font-semibold
                  text-[#2E3192]
                  transition

                  hover:underline
                "
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {/* ===================================================
            PRODUCTS GRID
        ==================================================== */}
        <section
          className="
            products-section
            mx-auto
            grid
            w-full
            max-w-[1440px]
            min-w-0
            grid-cols-1
            gap-2
            overflow-x-clip
            px-3

            sm:grid-cols-2
            sm:px-4

            md:grid-cols-3

            lg:grid-cols-4
            lg:px-6
          "
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <DisplayProducts
                key={
                  product?._id ||
                  product?.id ||
                  product?.productId
                }
                product={product}
                onDelete={handleDeleteProduct}
              />
            ))
          ) : (
            <div
              className="
                col-span-full
                flex
                min-h-[300px]
                flex-col
                items-center
                justify-center
                rounded-2xl
                border
                border-dashed
                border-slate-200
                bg-slate-50
                px-5
                text-center
              "
            >
              <div
                className="
                  mb-4
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  shadow-sm
                "
              >
                <FaBoxOpen className="text-2xl text-slate-400" />
              </div>

              <h3 className="text-lg font-semibold text-slate-700">
                No Products Found
              </h3>

              <p
                className="
                  mt-1
                  max-w-md
                  text-sm
                  text-slate-500
                "
              >
                We couldn't find any products matching
                your search.
              </p>

              {activeSearch && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="
                    mt-5
                    rounded-xl
                    bg-[#2E3192]
                    px-5
                    py-2.5
                    text-sm
                    font-semibold
                    text-white
                    transition

                    hover:bg-[#1E216F]
                  "
                >
                  View All Products
                </button>
              )}
            </div>
          )}
        </section>

        {/* ===================================================
            ADD PRODUCT
        ==================================================== */}
        {user && (
          <div
            className="
              mx-auto
              flex
              w-full
              max-w-[1500px]
              justify-center
              px-5
              py-8

              sm:px-6

              lg:px-8
            "
          >
            <NavLink
              to="/add-product"
              className="
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-[#2E3192]
                px-6
                py-3
                text-sm
                font-semibold
                text-white
                shadow-md
                transition

                hover:bg-[#1E216F]

                active:scale-[0.98]
              "
            >
              <FaArrowDown className="rotate-[-45deg]" />

              Add Product
            </NavLink>
          </div>
        )}
      </main>
    </div>
  );
};

export default Products;