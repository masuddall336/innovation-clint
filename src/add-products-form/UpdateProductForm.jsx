import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import ScrollTop from "../components/ScrollTop";

const UpdateProductForm = () => {
    const data = useLoaderData();
    const [loading, setLoading] = useState(false);

    const [formState, setFormState] = useState({
        title: data?.title || "",
        name: data?.name || "",
        category: data?.category || "",
        material: data?.material || "",
        capacity: data?.capacity || "",
        usages: data?.usages || "",
        additional_info: data?.additional_info || "",
        img_url: data?.img_url || "",
        thumbnail_url: Array.isArray(data?.thumbnail_url)
            ? data.thumbnail_url.join(", ")
            : data?.thumbnail_url || "",
        description: data?.description || "",
    });

    const handleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    const API_URL = import.meta.env.VITE_API_URL;

    const handleUpdateProduct = async (e) => {
        e.preventDefault();

        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "Do you want to update this product?",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#6366f1",
            cancelButtonColor: "#ef4444",
            confirmButtonText: "Yes, Update",
            background: "#1f2937",
            color: "#fff",
        });

        if (!confirm.isConfirmed) return;

        setLoading(true);

        const updatedData = {
            ...formState,
            thumbnail_url: formState.thumbnail_url
                .split(",")
                .map((url) => url.trim())
                .filter((url) => url !== ""),
        };

        try {
            const endpoint = `${API_URL}/products/${data._id}`;
            console.log("Updating product at:", endpoint);

            const res = await fetch(endpoint, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const result = await res.json();
            setLoading(false);

            if (result.modifiedCount > 0) {
                Swal.fire({
                    icon: "success",
                    title: "Product Updated Successfully!",
                    timer: 2000,
                    showConfirmButton: false,
                    background: "#1f2937",
                    color: "#fff",
                });
            } else {
                Swal.fire({
                    icon: "info",
                    title: "No Changes Detected",
                    timer: 2000,
                    showConfirmButton: false,
                    background: "#1f2937",
                    color: "#fff",
                });
            }
        } catch (error) {
            setLoading(false);
            console.error("Update failed:", error);
            Swal.fire({
                icon: "error",
                title: "Update Failed",
                text: error.message || "Something went wrong!",
                background: "#1f2937",
                color: "#fff",
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br pt-40 from-gray-900 via-gray-800 to-gray-900 py-10 px-4 md:px-8">
            <ScrollTop />

            <div className="max-w-7xl mx-auto bg-gray-800 shadow-2xl rounded-3xl p-6 md:p-12 border border-gray-700">
                {/* HEADER */}
                <div className="flex items-center gap-4 mb-10 border-b border-gray-700 pb-6">
                    <FaEdit className="text-indigo-400 text-4xl" />
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-wide">
                        Update Product
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* LEFT FORM */}
                    <form onSubmit={handleUpdateProduct} className="space-y-6">
                        {Object.keys(formState).map(
                            (key) =>
                                key !== "thumbnail_url" &&
                                key !== "description" && (
                                    <div key={key}>
                                        <label className="block font-semibold text-gray-300 mb-2 capitalize">
                                            {key.replace("_", " ")}
                                        </label>
                                        <input
                                            type="text"
                                            name={key}
                                            value={formState[key]}
                                            onChange={handleChange}
                                            className="w-full bg-gray-900 text-white border border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                                        />
                                    </div>
                                )
                        )}

                        {/* Thumbnail */}
                        <div>
                            <label className="block font-semibold text-gray-300 mb-2">
                                Thumbnail URLs (comma separated)
                            </label>
                            <textarea
                                name="thumbnail_url"
                                rows="3"
                                value={formState.thumbnail_url}
                                onChange={handleChange}
                                className="w-full bg-gray-900 text-white border border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block font-semibold text-gray-300 mb-2">
                                Description
                            </label>
                            <textarea
                                name="description"
                                rows="4"
                                value={formState.description}
                                onChange={handleChange}
                                className="w-full bg-gray-900 text-white border border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>

                        {/* BUTTON */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 rounded-xl font-semibold text-white shadow-lg flex items-center justify-center gap-3
                         bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                         hover:from-pink-500 hover:to-indigo-500 transition cursor-pointer"
                        >
                            {loading ? (
                                <>
                                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                    Updating...
                                </>
                            ) : (
                                <>
                                    <FaEdit />
                                    Update Product
                                </>
                            )}
                        </button>
                    </form>

                    {/* RIGHT LIVE PREVIEW */}
                    <motion.div
                        key={formState.img_url}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-gray-900 rounded-3xl p-6 md:p-8 shadow-inner border border-gray-700"
                    >
                        <div className="flex items-center gap-3 mb-6 border-b border-gray-700 pb-4">
                            <FaEye className="text-indigo-400 text-2xl" />
                            <h3 className="text-xl md:text-2xl font-bold text-white">
                                Live Preview
                            </h3>
                        </div>

                        {formState.img_url && (
                            <motion.img
                                src={formState.img_url}
                                alt="Preview"
                                className="w-full h-56 md:h-100 object-cover object-bottom rounded-2xl mb-6 shadow-lg"
                                whileHover={{ scale: 1.03 }}
                            />
                        )}

                        {/* ALL FIELD PREVIEW */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            {Object.entries(formState).map(([key, value]) =>
                                key !== "thumbnail_url" && key !== "img_url" ? (
                                    <div
                                        key={key}
                                        className="bg-gray-800 p-3 rounded-xl border border-gray-700"
                                    >
                                        <p className="text-indigo-400 font-semibold capitalize mb-1">
                                            {key.replace("_", " ")}
                                        </p>
                                        <p className="text-gray-300">{value || "N/A"}</p>
                                    </div>
                                ) : null
                            )}
                        </div>

                        {/* Thumbnail Preview */}
                        <div className="flex gap-3 flex-wrap mt-6">
                            {formState.thumbnail_url
                                .split(",")
                                .map((url, index) =>
                                    url.trim() ? (
                                        <motion.img
                                            key={index}
                                            src={url.trim()}
                                            alt="thumb"
                                            className="w-16 h-16 object-cover rounded-xl border border-gray-600 shadow-sm"
                                            whileHover={{ scale: 1.1 }}
                                        />
                                    ) : null
                                )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default UpdateProductForm;