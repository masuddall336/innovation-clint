import React, { useEffect } from "react";
import "./Contactus.css";
import ScrollTop from "../ScrollTop";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { FaBuilding, FaIndustry } from "react-icons/fa";

const Contactus = () => {

  // Scroll reveal animation
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    });
    reveals.forEach((el) => observer.observe(el));
  }, []);

  // Form submission with SweetAlert2 confirmation
  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("access_key", "9dac0848-0962-4748-8eda-67d2a4046ccc");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const res = await response.json();

      if (res.success) {
        Swal.fire({
          icon: "success",
          title: "Message Sent Successfully!",
          text: "Thank you for contacting us. We will get back to you soon.",
          confirmButtonColor: "#0d6efd",
        });
        event.target.reset(); // Reset form fields
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

  return (
    <>
      <Helmet>
        {/* Primary SEO */}
        <meta name="robots" content="index, follow" />
        <title>
          Contact Innovation Plastic Cans Ltd. | Plastic Packaging Manufacturer in Bangladesh
        </title>
        <meta
          name="description"
          content="Get in touch with Innovation Plastic Cans Ltd., a leading plastic packaging manufacturer in Bangladesh. Contact our head office or factory for food-grade bottles, containers, and custom plastic packaging solutions."
        />
        <meta
          name="keywords"
          content="contact plastic packaging factory Bangladesh, plastic bottle manufacturer Dhaka, food grade plastic containers Bangladesh, industrial plastic packaging supplier, Innovation Plastic Cans Ltd contact, custom plastic packaging factory"
        />
        <link
          rel="canonical"
          href="https://www.innovation-plastic.com/contact_us"
        />
      </Helmet>

      <div className="contact-page">
        <ScrollTop />

        {/* Address Section */}
        <div className="address-wrapper reveal">
          <div className="address-section">
            <div className="icon-wrapper flex justify-center md:justify-start">
              <FaBuilding size={40} className="info-icon text-[#fff] " />
            </div>
            <h2 className="sec-title">Head Office</h2>
            <h1 className="address-line">Innovation Plastic Cans Ltd.</h1>
            <p className="address-line">Sena Kalyan Bhaban (14th Floor)</p>
            <p className="address-line">195 Motijheel C/A, Dhaka-1000, Bangladesh</p>
            <p className="address-line">Phone: +88-02-223382144, +88-02-223382446, +88-01700-760208</p>
            <p className="address-line">Email: info@innovation-plastic.com</p>
          </div>

          <div className="address-section">
            <div className="icon-wrapper  flex justify-center md:justify-start">
              <FaIndustry size={40} className="info-icon text-[#fff]" />
            </div>
            <h2 className="sec-title">Factory</h2>
            <p className="address-line">Innovation Plastic Cans Ltd.</p>
            <p className="address-line">Kobaga, Mahajampur, Sonargaon</p>
            <p className="address-line">Narayanganj, Bangladesh</p>
            <p className="address-line">Email: info@innovation-plastic.com</p>
          </div>
        </div>

        {/* Contact Form */}
        <form className="contact-form reveal" onSubmit={onSubmit}>
          <h3 className="form-title">Send Us a Message</h3>

          <div className="row">
            <input type="text" placeholder="Your Name" name="Name" required />
            <input type="text" placeholder="Company / Shop Name" name="Company/Shope name" required />
          </div>

          <div className="row">
            <input type="text" placeholder="Address" name="Address" required />
            <input type="text" placeholder="Number" name="Number" required />
          </div>

          <input className="subject" type="text" placeholder="Subject" name="Subject" required />
          <textarea placeholder="Write Message" className="full" rows="5" name="Massage" required></textarea>

          <button type="submit" className="submit-btn">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Contactus;