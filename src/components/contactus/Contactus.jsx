import React, { useEffect } from "react";
import "./Contactus.css";
import ScrollTop from "../ScrollTop";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { FaBuilding, FaIndustry } from "react-icons/fa";

const Contactus = () => {
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.1 }
    );

    reveals.forEach((el) => observer.observe(el));

    return () => {
      reveals.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    formData.append(
      "access_key",
      "9dac0848-0962-4748-8eda-67d2a4046ccc"
    );

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: json,
        }
      );

      const res = await response.json();

      if (res.success) {
        Swal.fire({
          icon: "success",
          title: "Message Sent Successfully!",
          text: "Thank you for contacting us. We will get back to you soon.",
          confirmButtonColor: "#2E3192",
        });

        event.target.reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! Please try again.",
          confirmButtonColor: "#2E3192",
        });
      }
    } catch (err) {
      console.error("Form submission error:", err);

      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: "Server error. Please try again later.",
        confirmButtonColor: "#2E3192",
      });
    }
  };

  return (
    <>
      <Helmet>
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

      <div className="min-h-screen bg-[linear-gradient(145deg,#ffffff_0%,#ffffff_64%,rgba(46,49,146,0.12)_100%)] text-slate-800">
        <ScrollTop />

        {/* =====================================================
            HERO
        ====================================================== */}
        <section className="relative bg-[linear-gradient(135deg,rgba(46,49,146,0.08)_0%,transparent_70%)] px-5 pb-12 pt-28 sm:px-8 sm:pt-32 lg:px-12 lg:pb-14 lg:pt-36">
          <div className="mx-auto max-w-6xl text-center">
            <div className="reveal">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#00A651]">
                Contact Us
              </p>

              <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#2E3192] sm:text-4xl lg:text-[44px]">
                Let&apos;s Talk
              </h1>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-[15px]">
                Have a question or business inquiry? Get in touch with
                our team and let&apos;s discuss how we can help.
              </p>

              <div className="mx-auto mt-6 flex items-center justify-center gap-1.5">
                <span className="h-[2px] w-5 rounded-full bg-[#2E3192]" />
                <span className="h-[2px] w-8 rounded-full bg-[#00A651]" />
                <span className="h-[2px] w-5 rounded-full bg-[#2E3192]" />
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            OFFICE INFORMATION
        ====================================================== */}
        <section className="bg-transparent px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">

            {/* HEAD OFFICE */}
            <div
              className="
                reveal
                rounded-xl
                border border-[#2E3192]/15
                bg-white
                p-6
                shadow-[0_10px_30px_rgba(46,49,146,0.06)]
                transition-all duration-300
                hover:border-[#2E3192]/30
                hover:shadow-[0_16px_40px_rgba(46,49,146,0.10)]
                sm:p-7
              "
            >
              <div className="flex items-start gap-4">

                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-[#2E3192]/15
                    bg-[#2E3192]/[0.06]
                    text-[#2E3192]
                  "
                >
                  <FaBuilding size={19} />
                </div>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#00A651]">
                    Corporate Office
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-[#2E3192]">
                    Head Office
                  </h2>
                </div>
              </div>

              <div className="mt-6 space-y-1.5 text-sm leading-6 text-slate-600">

                <p className="font-semibold text-slate-900">
                  Innovation Plastic Cans Ltd.
                </p>

                <p>
                  Sena Kalyan Bhaban (14th Floor)
                </p>

                <p>
                  195 Motijheel C/A, Dhaka-1000, Bangladesh
                </p>

                <p>
                  Phone: +88-02-223382144, +88-02-223382446,
                  +88-01700-760208
                </p>

                <p>
                  Email:{" "}
                  <a
                    href="mailto:info@innovation-plastic.com"
                    className="
                      font-medium
                      text-[#2E3192]
                      transition-colors
                      hover:text-[#00A651]
                    "
                  >
                    info@innovation-plastic.com
                  </a>
                </p>
              </div>

              <div className="mt-6 h-[2px] w-10 rounded-full bg-[#00A651]" />
            </div>

            {/* FACTORY */}
            <div
              className="
                reveal
                rounded-xl
                border border-[#00A651]/15
                bg-white
                p-6
                shadow-[0_10px_30px_rgba(0,166,81,0.05)]
                transition-all duration-300
                hover:border-[#00A651]/30
                hover:shadow-[0_16px_40px_rgba(0,166,81,0.09)]
                sm:p-7
              "
            >
              <div className="flex items-start gap-4">

                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-[#00A651]/15
                    bg-[#00A651]/[0.07]
                    text-[#00A651]
                  "
                >
                  <FaIndustry size={19} />
                </div>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#00A651]">
                    Manufacturing
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-[#2E3192]">
                    Factory
                  </h2>
                </div>
              </div>

              <div className="mt-6 space-y-1.5 text-sm leading-6 text-slate-600">

                <p className="font-semibold text-slate-900">
                  Innovation Plastic Cans Ltd.
                </p>

                <p>
                  Kobaga, Mahajampur, Sonargaon
                </p>

                <p>
                  Narayanganj, Bangladesh
                </p>

                <p>
                  Email:{" "}
                  <a
                    href="mailto:info@innovation-plastic.com"
                    className="
                      font-medium
                      text-[#2E3192]
                      transition-colors
                      hover:text-[#00A651]
                    "
                  >
                    info@innovation-plastic.com
                  </a>
                </p>
              </div>

              <div className="mt-6 h-[2px] w-10 rounded-full bg-[#2E3192]" />
            </div>

          </div>
        </section>

        {/* =====================================================
            CONTACT FORM
        ====================================================== */}
        <section className="bg-transparent px-5 pb-20 pt-16 sm:px-8 sm:pt-20 lg:px-12 lg:pb-24 lg:pt-24">
          <div className="mx-auto max-w-3xl">

            <form
              onSubmit={onSubmit}
              className="
                reveal
                rounded-xl
                border border-[#2E3192]/20
                bg-white
                p-6
                shadow-[0_12px_35px_rgba(46,49,146,0.08)]
                sm:p-8
                lg:p-9
              "
            >

              {/* FORM HEADER */}
              <div className="mb-8">

                <div className="mb-4 h-1 w-10 rounded-full bg-[#00A651]" />

                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#2E3192]">
                  Send a Message
                </p>

                <h3 className="mt-2 text-2xl font-bold text-[#172A8A] sm:text-[26px]">
                  How can we help?
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Fill out the form below and our team will get back to
                  you as soon as possible.
                </p>
              </div>

              {/* NAME + COMPANY */}
              <div className="grid gap-5 md:grid-cols-2">

                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-xs font-semibold text-slate-700"
                  >
                    Your Name
                  </label>

                  <input
                    id="contact-name"
                    type="text"
                    name="Name"
                    required
                    placeholder="Your name"
                    className="
                      h-12
                      w-full
                      rounded-lg
                      border border-slate-300
                      bg-white
                      px-4
                      text-sm
                      font-medium
                      text-slate-900
                      outline-none
                      placeholder:text-slate-400
                      transition-all
                      duration-200
                      focus:border-[#2E3192]
                      focus:ring-2
                      focus:ring-[#2E3192]/10
                    "
                  />
                </div>

                <div>
                  <label
                    htmlFor="company-name"
                    className="mb-2 block text-xs font-semibold text-slate-700"
                  >
                    Company / Shop Name
                  </label>

                  <input
                    id="company-name"
                    type="text"
                    name="Company/Shope name"
                    required
                    placeholder="Company or shop"
                    className="
                      h-12
                      w-full
                      rounded-lg
                      border border-slate-300
                      bg-white
                      px-4
                      text-sm
                      font-medium
                      text-slate-900
                      outline-none
                      placeholder:text-slate-400
                      transition-all
                      duration-200
                      focus:border-[#2E3192]
                      focus:ring-2
                      focus:ring-[#2E3192]/10
                    "
                  />
                </div>

              </div>

              {/* ADDRESS + PHONE */}
              <div className="mt-5 grid gap-5 md:grid-cols-2">

                <div>
                  <label
                    htmlFor="contact-address"
                    className="mb-2 block text-xs font-semibold text-slate-700"
                  >
                    Address
                  </label>

                  <input
                    id="contact-address"
                    type="text"
                    name="Address"
                    required
                    placeholder="Your address"
                    className="
                      h-12
                      w-full
                      rounded-lg
                      border border-slate-300
                      bg-white
                      px-4
                      text-sm
                      font-medium
                      text-slate-900
                      outline-none
                      placeholder:text-slate-400
                      transition-all
                      duration-200
                      focus:border-[#2E3192]
                      focus:ring-2
                      focus:ring-[#2E3192]/10
                    "
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-number"
                    className="mb-2 block text-xs font-semibold text-slate-700"
                  >
                    Phone Number
                  </label>

                  <input
                    id="contact-number"
                    type="tel"
                    name="Number"
                    required
                    placeholder="Phone number"
                    className="
                      h-12
                      w-full
                      rounded-lg
                      border border-slate-300
                      bg-white
                      px-4
                      text-sm
                      font-medium
                      text-slate-900
                      outline-none
                      placeholder:text-slate-400
                      transition-all
                      duration-200
                      focus:border-[#2E3192]
                      focus:ring-2
                      focus:ring-[#2E3192]/10
                    "
                  />
                </div>

              </div>

              {/* SUBJECT */}
              <div className="mt-5">

                <label
                  htmlFor="contact-subject"
                  className="mb-2 block text-xs font-semibold text-slate-700"
                >
                  Subject
                </label>

                <input
                  id="contact-subject"
                  type="text"
                  name="Subject"
                  required
                  placeholder="What would you like to discuss?"
                  className="
                    h-12
                    w-full
                    rounded-lg
                    border border-slate-300
                    bg-white
                    px-4
                    text-sm
                    font-medium
                    text-slate-900
                    outline-none
                    placeholder:text-slate-400
                    transition-all
                    duration-200
                    focus:border-[#2E3192]
                    focus:ring-2
                    focus:ring-[#2E3192]/10
                  "
                />

              </div>

              {/* MESSAGE */}
              <div className="mt-5">

                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-xs font-semibold text-slate-700"
                >
                  Message
                </label>

                <textarea
                  id="contact-message"
                  name="Massage"
                  required
                  rows="5"
                  placeholder="Write your message..."
                  className="
                    min-h-[145px]
                    w-full
                    resize-y
                    rounded-lg
                    border border-slate-300
                    bg-white
                    px-4
                    py-3
                    text-sm
                    font-medium
                    leading-6
                    text-slate-900
                    outline-none
                    placeholder:text-slate-400
                    transition-all
                    duration-200
                    focus:border-[#2E3192]
                    focus:ring-2
                    focus:ring-[#2E3192]/10
                  "
                />

              </div>

              {/* BUTTON */}
              <div className="mt-7 flex items-center justify-between gap-4">

                <div className="hidden h-[1px] flex-1 bg-slate-100 sm:block" />

                <button
                  type="submit"
                  className="
                    h-11
                    rounded-lg
                    bg-[#2E3192]
                    px-7
                    text-sm
                    font-semibold
                    text-white
                    shadow-[0_6px_18px_rgba(46,49,146,0.18)]
                    transition-all
                    duration-300
                    hover:-translate-y-[1px]
                    hover:bg-[#25287c]
                    hover:shadow-[0_9px_22px_rgba(46,49,146,0.22)]
                    active:translate-y-0
                    active:scale-[0.98]
                  "
                >
                  Send Message
                </button>

              </div>

            </form>

          </div>
        </section>

      </div>
    </>
  );
};

export default Contactus;