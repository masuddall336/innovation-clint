import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import { FiPlusCircle } from "react-icons/fi";
import ScrollTop from "../components/ScrollTop";

const AddProducts = () => {
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        name: "",
        category: "",
        description: "",
        material: "",
        capacity: "",
        img_url: "",
        additional_info: "",
        thumbnail_url: "",
        usages: "",
    });
    const [thumbnailPreview, setThumbnailPreview] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === "thumbnail_url") {
            const urls = value
                .split(",")
                .map((url) => url.trim())
                .filter((url) => url !== "");
            setThumbnailPreview(urls);
        }
    };

    const API_URL = import.meta.env.VITE_API_URL;

    const handleAddProduct = async (e) => {
        e.preventDefault();
        const datas = { ...formData };

        if (datas.thumbnail_url) {
            datas.thumbnail_url = datas.thumbnail_url
                .split(",")
                .map((url) => url.trim())
                .filter((url) => url !== "");
        }

        try {
            const res = await fetch(`${API_URL}/products`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datas),
            });

            const data = await res.json();
            console.log(data);

            Swal.fire({
                title: "Product Added Successfully",
                icon: "success",
                draggable: true,
            });

            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);

            setFormData({
                title: "",
                name: "",
                category: "",
                description: "",
                material: "",
                capacity: "",
                img_url: "",
                additional_info: "",
                thumbnail_url: "",
                usages: "",
            });
            setThumbnailPreview([]);
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Error adding product",
                text: error.message,
                icon: "error",
            });
        }
    };

    return (
        <div className="bg-gray-900 min-h-screen pt-25 sm:pt-40 px-4 pb-5 md:px-10">
            <ScrollTop></ScrollTop>
            {/* Title */}
            <div className="flex flex-col items-center mb-12 px-2">
                <FiPlusCircle className="text-indigo-500 text-6xl mb-4" />
                <h2 className="text-4xl font-bold text-white underline mb-2 text-center">
                    Add New Product
                </h2>
                <p className="text-gray-400 text-center max-w-xl">
                    Fill out the form to add a new product. Live preview is shown on the right!
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-10 justify-center items-start">
                {/* Left: Form */}
                <form
                    onSubmit={handleAddProduct}
                    className="w-full lg:w-1/2 bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-2xl"
                >
                    {[
                        { label: "Product Title", name: "title" },
                        { label: "Name", name: "name" },
                        { label: "Category", name: "category" },
                        { label: "Material Type", name: "material" },
                        { label: "Capacity", name: "capacity" },
                        { label: "Usages", name: "usages" },
                        { label: "Additional Info", name: "additional_info" },
                        { label: "Main Image Link", name: "img_url" },
                    ].map((field) => (
                        <div key={field.name} className="mb-4 sm:mb-5">
                            <label className="block text-white font-semibold mb-1">{field.label}</label>
                            <input
                                type="text"
                                name={field.name}
                                placeholder={`Enter ${field.label.toLowerCase()}`}
                                value={formData[field.name]}
                                onChange={handleChange}
                                className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                            />
                        </div>
                    ))}

                    {/* Thumbnail URL */}
                    <div className="mb-4 sm:mb-5">
                        <label className="block text-white font-semibold mb-1">
                            Thumbnail Images (comma separated)
                        </label>
                        <input
                            name="thumbnail_url"
                            placeholder="Enter image URLs (separated by comma)"
                            
                            value={formData.thumbnail_url}
                            onChange={handleChange}
                            className="w-full px-3 h-[50px] sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-gray-700 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-4 sm:mb-5">
                        <label className="block text-white font-semibold mb-1">Product Description</label>
                        <textarea
                            name="description"
                            placeholder="Type your product description"
                            rows={6}
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-gray-700 text-white border border-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-500 cursor-pointer hover:bg-indigo-600 text-white font-bold py-2 sm:py-3 rounded-xl transition-all duration-300 shadow-lg"
                    >
                        Add Product
                    </button>
                </form>

                {/* Right: Live Product Preview */}
                <div className="w-full lg:w-1/3 flex flex-col items-center justify-start sticky top-40">
                    <AnimatePresence>
                        {success && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="bg-green-500 text-white p-4 sm:p-6 rounded-2xl shadow-2xl w-full text-center mb-6"
                            >
                                🎉 Product successfully added!
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <motion.div
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
                        className="mt-4 p-4 sm:p-6 bg-gray-800 rounded-2xl shadow-xl w-full text-left"
                    >
                        <h3 className="text-2xl font-bold text-white mb-1">{formData.title || "Product Title"}</h3>
                        <p className="text-gray-300 mb-2"><span className="font-semibold">Name:</span> {formData.name || "Product Name"}</p>
                        <p className="text-gray-300 mb-1"><span className="font-semibold">Category:</span> {formData.category || "N/A"}</p>
                        <p className="text-gray-300 mb-1"><span className="font-semibold">Material:</span> {formData.material || "N/A"}</p>
                        <p className="text-gray-300 mb-1"><span className="font-semibold">Capacity:</span> {formData.capacity || "N/A"}</p>
                        <p className="text-gray-300 mb-1"><span className="font-semibold">Usages:</span> {formData.usages || "N/A"}</p>
                        <p className="text-gray-300 mb-1"><span className="font-semibold">Additional Info:</span> {formData.additional_info || "N/A"}</p>
                        <p className="text-gray-300 mb-4"><span className="font-semibold">Description:</span> {formData.description || "Product description..."}</p>

                        {/* Main Image Preview */}
                        {formData.img_url ? (
                            <img
                                src={formData.img_url}
                                alt="Main Product"
                                className="w-full h-64 object-cover rounded-xl mb-4 border border-gray-600 mt-2"
                            />
                        ) : (
                            <div className="w-full h-64 bg-gray-700 flex items-center justify-center rounded-xl text-gray-400 mb-4 mt-2">
                                Main Image Preview
                            </div>
                        )}

                        {/* Thumbnail Previews */}
                        <div className="flex flex-wrap justify-center gap-2 max-h-40 overflow-y-auto">
                            {thumbnailPreview.length > 0 ? (
                                thumbnailPreview.map((url, i) => (
                                    <img key={i} src={url} alt={`thumb-${i}`} className="w-20 h-20 object-cover rounded-md border border-gray-600" />
                                ))
                            ) : (
                                <p className="text-gray-400">Thumbnails will appear here</p>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default AddProducts;