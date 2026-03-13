import React, { useRef, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FaTimes } from "react-icons/fa";

const AskYourQuestion = ({ isOpen, onClose }) => {
  const formRef = useRef();
  const [show, setShow] = useState(false); // modal mount
  const [animate, setAnimate] = useState(false); // modal & form animation

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      setTimeout(() => setAnimate(true), 50); // trigger animation after mount
    } else {
      setAnimate(false);
      const timer = setTimeout(() => setShow(false), 300); // fade-out duration
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleClose = () => {
    setAnimate(false);
    setTimeout(() => onClose(), 300); // wait for fade-out
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("access_key", "9dac0848-0962-4748-8eda-67d2a4046ccc");
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: json,
      });

      const res = await response.json();

      if (res.success) {
        Swal.fire({
          icon: "success",
          title: "Email Sent Successfully!",
          text: "Thank you for contacting us. We will get back to you soon.",
          confirmButtonColor: "#0d6efd",
        });
        event.target.reset();
        handleClose();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! Please try again.",
        });
      }
    } catch (err) {
      console.error("Form submission error:", err);
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Server error. Please try again later.",
      });
    }
  };

  if (!show) return null;

  const elementClass = (index) =>
    `transform transition-all duration-500 ease-out ${
      animate ? "translate-y-0 opacity-100 scale-100" : "translate-y-5 opacity-0 scale-95"
    } delay-[${index * 100}ms]`;

  return (
    <div
      className={`fixed inset-0 z-50 flex px-[15px] py-[20px] items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
        animate ? "opacity-100" : "opacity-0"
      }`}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div
        ref={formRef}
        className={`bg-gradient-to-br from-gray-900/90 to-gray-800/90 w-full max-w-xl rounded-2xl shadow-2xl relative p-6 md:p-8 text-gray-100 backdrop-blur-md transform transition-all duration-300 ${
          animate ? "translate-y-0 scale-100 opacity-100" : "translate-y-[-50px] scale-95 opacity-0"
        }`}
      >
        {/* Close Button */}
        <button
          className={elementClass(0) + " absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-br from-[#00A651] to-[#2F3292] text-white hover:scale-110 shadow-lg"}
          onClick={handleClose}
        >
          <FaTimes size={18} />
        </button>

        {/* Header */}
        <h3 className={elementClass(1) + " text-2xl font-bold mb-6 text-center text-white"}>
          Send Us a Message
        </h3>

        <form className="space-y-4" onSubmit={onSubmit}>
          {/* Row 1 */}
          <div className={elementClass(2) + " flex flex-col md:flex-row gap-3"}>
            <input
              type="text"
              placeholder="Your Name"
              name="Name"
              required
              className="flex-1 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 ease-in-out transform hover:scale-[1.02]"
            />
            <input
              type="text"
              placeholder="Company / Shop Name"
              name="Company/Shop Name"
              required
              className="flex-1 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 ease-in-out transform hover:scale-[1.02]"
            />
          </div>

          {/* Row 2 */}
          <div className={elementClass(3) + " flex flex-col md:flex-row gap-3"}>
            <input
              type="text"
              placeholder="Address"
              name="Address"
              required
              className="flex-1 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 ease-in-out transform hover:scale-[1.02]"
            />
            <input
              type="text"
              placeholder="Number"
              name="Number"
              required
              className="flex-1 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 ease-in-out transform hover:scale-[1.02]"
            />
          </div>

          {/* Subject */}
          <div className={elementClass(4)}>
            <input
              type="text"
              placeholder="Subject"
              name="Subject"
              required
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 ease-in-out transform hover:scale-[1.02]"
            />
          </div>

          {/* Textarea */}
          <div className={elementClass(5) + " flex flex-col"}>
            <label className="mb-2 text-gray-300 font-medium">Send us a SMS</label>
            <textarea
              name="Message"
              rows="5"
              required
              className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-300 ease-in-out transform hover:scale-[1.02] resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className={elementClass(6)}>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-[#00A651] to-[#2F3292] text-white rounded-lg font-semibold hover:scale-105 transition-all duration-300 ease-in-out shadow-lg"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AskYourQuestion;