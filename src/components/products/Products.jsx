
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
  FaFilter,
  FaLayerGroup,
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
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [materialFilter, setMaterialFilter] = useState("all");

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
  const categoryOptions = useMemo(
    () => [...new Set(products.map((product) => product?.category?.trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b)),
    [products]
  );

  const materialOptions = useMemo(
    () => [...new Set(products.map((product) => product?.material?.trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b)),
    [products]
  );

  const filteredProducts = useMemo(() => {
    const search = activeSearch.trim().toLowerCase();

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
        ${product?.material || ""}
        ${product?.capacity || ""}
        ${description}
      `.toLowerCase();

      const matchesSearch = !search || searchableText.includes(search);
      const matchesCategory = categoryFilter === "all" || product?.category?.trim() === categoryFilter;
      const matchesMaterial = materialFilter === "all" || product?.material?.trim() === materialFilter;

      return matchesSearch && matchesCategory && matchesMaterial;
    });
  }, [products, activeSearch, categoryFilter, materialFilter]);

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

  const handleClearFilters = () => {
    setCategoryFilter("all");
    setMaterialFilter("all");
    handleClearSearch();
  };

  const formatFilterLabel = (value) =>
    value.replace(/[_-]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

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
        {(activeSearch || categoryFilter !== "all" || materialFilter !== "all") && (
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
                Showing {filteredProducts.length} product{filteredProducts.length === 1 ? "" : "s"}
                {activeSearch && <> matching <span className="font-semibold text-[#2E3192]">“{activeSearch}”</span></>}
                {categoryFilter !== "all" && <> in <span className="font-semibold text-[#2E3192]">{formatFilterLabel(categoryFilter)}</span></>}
                {materialFilter !== "all" && <> made with <span className="font-semibold text-[#2E3192]">{formatFilterLabel(materialFilter)}</span></>}
              </p>

              <button
                type="button"
                onClick={handleClearFilters}
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
        <div
          className="
            mx-auto
            flex
            w-full
            max-w-[1440px]
            min-w-0
            flex-col
            gap-6
            px-5
            py-5
            sm:px-6
            lg:flex-row
            lg:items-start
            lg:px-8
          "
        >
          <aside
            aria-label="Product filters"
            className="
              w-full
              shrink-0
              rounded-2xl
              border border-white/90
              bg-[#e9edf4]
              p-4
              shadow-[8px_8px_18px_rgba(151,160,178,0.38),-7px_-7px_16px_rgba(255,255,255,0.95)]
              lg:sticky
              lg:top-28
              lg:w-[248px]
            "
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/75 text-[#2E3192] shadow-[3px_3px_7px_rgba(151,160,178,0.32),-3px_-3px_7px_rgba(255,255,255,0.95)]">
                  <FaFilter aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-sm font-bold text-slate-800">Filter products</h2>
                  <p className="text-xs text-slate-500">Narrow the collection</p>
                </div>
              </div>
              {(categoryFilter !== "all" || materialFilter !== "all" || activeSearch) && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="rounded-lg px-2 py-1 text-xs font-semibold text-[#2E3192] transition hover:bg-white/70"
                >
                  Reset
                </button>
              )}
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
              <div>
                <h3 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                  <FaLayerGroup aria-hidden="true" /> Category
                </h3>
                <div className="product-filter-scroll max-h-52 space-y-1 overflow-y-auto pr-1 lg:max-h-56">
                  <button
                    type="button"
                    onClick={() => setCategoryFilter("all")}
                    aria-pressed={categoryFilter === "all"}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[13px] transition ${categoryFilter === "all" ? "bg-[#2E3192] font-semibold text-white shadow-[inset_2px_2px_5px_rgba(14,18,79,0.28),0_4px_10px_rgba(46,49,146,0.2)]" : "text-slate-700 hover:bg-white/70"}`}
                  >
                    <span>All products</span>
                    <span className={`text-xs ${categoryFilter === "all" ? "text-white/75" : "text-slate-400"}`}>{products.length}</span>
                  </button>
                  {categoryOptions.map((category) => {
                    const count = products.filter((product) => product?.category?.trim() === category).length;
                    const active = categoryFilter === category;
                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setCategoryFilter(category)}
                        aria-pressed={active}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-[13px] transition ${active ? "bg-[#2E3192] font-semibold text-white shadow-[inset_2px_2px_5px_rgba(14,18,79,0.28),0_4px_10px_rgba(46,49,146,0.2)]" : "text-slate-700 hover:bg-white/70"}`}
                      >
                        <span>{formatFilterLabel(category)}</span>
                        <span className={`text-xs ${active ? "text-white/75" : "text-slate-400"}`}>{count}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {materialOptions.length > 0 && (
                <div>
                  <h3 className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Material</h3>
                  <div className="product-filter-scroll max-h-40 space-y-1 overflow-y-auto pr-1 lg:max-h-44">
                    <button
                      type="button"
                      onClick={() => setMaterialFilter("all")}
                      aria-pressed={materialFilter === "all"}
                      className={`w-full rounded-lg px-3 py-2 text-left text-[13px] transition ${materialFilter === "all" ? "bg-white/80 font-semibold text-[#2E3192] shadow-[inset_2px_2px_5px_rgba(151,160,178,0.2),inset_-2px_-2px_5px_rgba(255,255,255,0.95)]" : "text-slate-700 hover:bg-white/70"}`}
                    >
                      Any material
                    </button>
                    {materialOptions.map((material) => {
                      const active = materialFilter === material;
                      return (
                        <button
                          key={material}
                          type="button"
                          onClick={() => setMaterialFilter(material)}
                          aria-pressed={active}
                          className={`w-full rounded-lg px-3 py-2 text-left text-[13px] transition ${active ? "bg-white/80 font-semibold text-[#2E3192] shadow-[inset_2px_2px_5px_rgba(151,160,178,0.2),inset_-2px_-2px_5px_rgba(255,255,255,0.95)]" : "text-slate-700 hover:bg-white/70"}`}
                        >
                          {formatFilterLabel(material)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </aside>

          <section
            className="
            products-section
            grid
            min-w-0
            flex-1
            grid-cols-1
            gap-6
            overflow-x-clip

            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-2
            xl:grid-cols-3
            2xl:grid-cols-4
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
                  Try adjusting or clearing your search and filters.
              </p>

              {(activeSearch || categoryFilter !== "all" || materialFilter !== "all") && (
                <button
                  type="button"
                  onClick={handleClearFilters}
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
        </div>

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
