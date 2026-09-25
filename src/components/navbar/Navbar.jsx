import React, { useEffect, useRef, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Contact_map from "../contatUsMap/Contat_map";

import logo from "../../../public/logo/IPCL_logo.png";
import logo_name from "../../../public/logo/IPCL_name_logo.png";

import { AuthContext } from "../../firebase/AuthContext";

import call from "../../../public/icon/phone-call.png";
import facebook from "../../../public/icon/facebook.png";
import linkdin from "../../../public/icon/linkDin.png";
import threeline from "../../../public/icon/threeLine.png";
import crossicon from "../../../public/icon/crossicon.jpg";

/* =========================================================
   MENU DATA
========================================================= */

const menuItems = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Sustainability",
    path: "/sustainability",
  },
  {
    name: "Product",
    path: "/products",
  },
];

const aboutItems = [
  {
    name: "QC & QA",
    path: "/qc-qa",
  },
  {
    name: "Contact-Us",
    path: "/contact-us",
  },
];

/* =========================================================
   ANIMATED LETTERS
========================================================= */

const AnimatedLetters = ({ text }) => {
  return (
    <span className="inline-flex whitespace-nowrap">
      {text.split("").map((letter, index) => (
        <span
          key={`${letter}-${index}`}
          className="inline-block transition-transform duration-300 group-hover:-translate-y-[1px]"
          style={{
            transitionDelay: `${index * 12}ms`,
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
    </span>
  );
};

/* =========================================================
   NAVBAR
========================================================= */

const Navbar = () => {
  const location = useLocation();
  const { user, singOutUser } = useContext(AuthContext);

  const [scrolled, setScrolled] = useState(false);
  const [responsive, setResponsive] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);

  // Controls ONLY the company Location popup.
  // It does NOT request the user's device/browser location.
  const [contactOpen, setContactOpen] = useState(false);

  const aboutTimeoutRef = useRef(null);

  /* =======================================================
     SCROLL
  ======================================================= */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =======================================================
     BODY SCROLL LOCK
  ======================================================= */

  useEffect(() => {
    if (responsive || contactOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [responsive, contactOpen]);

  /* =======================================================
     CLOSE MOBILE MENU ON ROUTE CHANGE
  ======================================================= */

  useEffect(() => {
    setResponsive(false);
    setMobileAboutOpen(false);
    setAboutOpen(false);
  }, [location.pathname]);

  /* =======================================================
     ACTIVE ROUTE
  ======================================================= */

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname === path;
  };

  const isAboutActive = aboutItems.some((item) =>
    location.pathname.startsWith(item.path)
  );

  /* =======================================================
     MOBILE MENU
  ======================================================= */

  const closeResponsive = () => {
    setResponsive(false);
    setMobileAboutOpen(false);
  };

  const openResponsive = () => {
    setResponsive(true);
  };

  /* =======================================================
     SIGN OUT
  ======================================================= */

  const handleSignOut = async () => {
    try {
      await singOutUser();
      closeResponsive();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  /* =======================================================
     LOCATION POPUP
     
     IMPORTANT:
     This function ONLY opens the company map popup.
     It does NOT use:
     
       navigator.geolocation
       geolocation.getCurrentPosition()
       watchPosition()
     
     Therefore Navbar will not request the user's exact
     browser/device location.
  ======================================================= */

  const openLocationPopup = (event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    // Close mobile menu
    setResponsive(false);
    setMobileAboutOpen(false);

    // Close About dropdown
    setAboutOpen(false);

    // Open company Location popup
    setContactOpen(true);
  };

  const closeLocationPopup = () => {
    setContactOpen(false);
  };

  /* =======================================================
     LOCATION POPUP - ESC KEY
  ======================================================= */

  useEffect(() => {
    if (!contactOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setContactOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [contactOpen]);

  /* =======================================================
     ABOUT DESKTOP
  ======================================================= */

  const handleAboutMouseEnter = () => {
    if (aboutTimeoutRef.current) {
      clearTimeout(aboutTimeoutRef.current);
    }

    setAboutOpen(true);
  };

  const handleAboutMouseLeave = () => {
    aboutTimeoutRef.current = setTimeout(() => {
      setAboutOpen(false);
    }, 120);
  };

  const handleAboutClick = () => {
    setAboutOpen((previous) => !previous);
  };

  /* =======================================================
     CLEANUP
  ======================================================= */

  useEffect(() => {
    return () => {
      if (aboutTimeoutRef.current) {
        clearTimeout(aboutTimeoutRef.current);
      }
    };
  }, []);

  /* =======================================================
     MOBILE MENU ITEM
  ======================================================= */

  const MobileMenuItem = ({ number, item, onClick, active }) => {
    return (
      <Link
        to={item.path}
        onClick={onClick}
        className={`
          group
          relative
          flex
          min-w-0
          items-center
          gap-4
          rounded-xl
          border
          px-4
          py-3.5
          transition-all
          duration-300
          ${
            active
              ? "border-[#00AEEF]/25 bg-[#00AEEF]/[0.07] text-white"
              : "border-transparent text-white/[0.68] hover:border-white/[0.08] hover:bg-white/[0.035] hover:text-white"
          }
        `}
      >
        {/* NUMBER */}
        <span
          className={`
            flex
            h-7
            w-7
            shrink-0
            items-center
            justify-center
            rounded-lg
            border
            text-[10px]
            font-semibold
            tracking-[0.08em]
            transition-all
            duration-300
            ${
              active
                ? "border-[#00AEEF]/35 bg-[#00AEEF]/10 text-[#00AEEF]"
                : "border-white/[0.10] bg-white/[0.025] text-white/[0.38] group-hover:border-[#00AEEF]/25 group-hover:text-[#00AEEF]"
            }
          `}
        >
          {number}
        </span>

        {/* TEXT */}
        <span className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-[13px] font-medium">
          {item.name}
        </span>

        {/* ARROW */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="
            shrink-0
            opacity-0
            transition-all
            duration-300
            group-hover:translate-x-0.5
            group-hover:opacity-50
          "
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </Link>
    );
  };

  return (
    <>
      {/* =====================================================
          DESKTOP / MAIN NAVBAR
      ===================================================== */}

      <nav
        className={`
          fixed
          left-1/2
          z-[1000]
          -translate-x-1/2
          transition-all
          duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]
          ${
            scrolled
              ? "top-0 w-full"
              : "top-3 w-[96%] sm:top-4 sm:w-[95%] md:top-5 md:w-[94%] lg:w-[93%] xl:w-[92%]"
          }
        `}
      >
        <div
          className={`
            relative
            isolate
            overflow-visible
            border
            border-white/50
            shadow-[0_12px_40px_rgba(15,23,42,0.16),inset_0_1px_0_rgba(255,255,255,0.9)]
            backdrop-blur-xl
            backdrop-saturate-150
            bg-gradient-to-br
            from-[#c1c2d787]
            via-[#6161615b]
            to-[#c1c2d787]
            transition-all
            duration-500
            text-black
            ${
              scrolled
                ? "rounded-none border-t-[#2E3192]/40 border-x-white/30 border-b-white/30 shadow-[0_8px_30px_rgba(15,23,42,0.14),inset_0_1px_0_rgba(46,49,146,0.18)]"
                : "rounded-[18px] sm:rounded-[20px] md:rounded-[22px]"
            }
          `}
        >
          {/* TOP LIGHT */}
          <div
            className="
              pointer-events-none
              absolute
              left-[8%]
              right-[8%]
              top-0
              h-px
              bg-gradient-to-r
              from-transparent
              via-white/[0.24]
              to-transparent
            "
          />

          {/* SUBTLE GLOW */}
          <div
            className="
              pointer-events-none
              absolute
              left-[8%]
              top-0
              h-16
              w-32
              rounded-full
              bg-[#00AEEF]/[0.04]
              blur-3xl
            "
          />

          {/* MAIN CONTENT */}
          <div
            className="
              relative
              z-10
              flex
              min-h-[78px]
              items-center
              justify-between
              gap-5
              px-4
              sm:min-h-[82px]
              sm:px-5
              md:min-h-[86px]
              md:gap-7
              md:px-7
              lg:gap-10
              lg:px-9
              xl:gap-12
              xl:px-11
            "
          >
            {/* =================================================
                LOGO
            ================================================= */}

            <Link
              to="/"
              onClick={closeResponsive}
              className="
                group
                relative
                flex
                min-w-0
                shrink-0
                cursor-pointer
                items-center
                gap-2
              "
            >
              <img
                src={logo}
                alt="IPCL Logo"
                className="
                  relative
                  z-10
                  h-[52px]
                  w-[58px]
                  shrink-0
                  object-contain
                  drop-shadow-[0_4px_9px_rgba(0,0,0,0.30)]
                  transition-transform
                  duration-500
                  group-hover:scale-[1.03]
                  sm:h-[55px]
                  sm:w-[62px]
                  md:h-[58px]
                  md:w-[66px]
                  lg:h-[60px]
                  lg:w-[68px]
                  xl:w-[120px]
                "
              />

              <img
                src={logo_name}
                alt="IPCL"
                className="
                  relative
                  z-10
                  hidden
                  h-auto
                  w-auto
                  max-w-[150px]
                  shrink-0
                  object-contain
                  opacity-95
                  transition-transform
                  duration-500
                  group-hover:translate-x-0.5
                  sm:block
                  md:max-w-[165px]
                  lg:max-w-[180px]
                  xl:max-w-[260px]
                "
              />
            </Link>

            {/* =================================================
                DESKTOP NAVIGATION
            ================================================= */}

            <div
              className="
                hidden
                min-w-0
                flex-1
                items-center
                justify-center
                md:flex
              "
            >
              <div
                className="
                  group
                  flex
                  max-w-full
                  items-center
                  gap-1.5
                  overflow-visible
                  rounded-2xl
                  border
                  border-white/70
                  bg-gradient-to-br
                  from-[#a1a6ffa8]
                  via-[#4d90f305]
                  to-[#c7c9f7ac]
                  p-1
                  shadow-[0_14px_40px_rgba(15,23,42,0.16),inset_0_1px_0_rgba(255,255,255,0.95),inset_0_-2px_6px_rgba(15,23,42,0.06)]
                  backdrop-blur-2xl
                  backdrop-saturate-150
                  transition-all
                  duration-500
                  ease-out
                  hover:-translate-y-0.5
                  hover:shadow-[0_18px_45px_rgba(46,49,146,0.18),0_8px_25px_rgba(0,166,81,0.12),inset_0_1px_0_rgba(255,255,255,1)]
                "
              >
                {menuItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={closeResponsive}
                    className={`
                      group
                      flex
                      shrink-0
                      cursor-pointer
                      items-center
                      justify-center
                      rounded-lg
                      px-4
                      py-2.5
                      text-[12px]
                      font-medium
                      tracking-[0.01em]
                      whitespace-nowrap
                      transition-all
                      duration-300
                      lg:px-5
                      lg:text-[13px]
                      ${
                        isActive(item.path)
                          ? "bg-white/[0.08] text-white"
                          : "text-white hover:bg-[#2E3192] hover:text-white"
                      }
                    `}
                  >
                    <AnimatedLetters text={item.name} />
                  </Link>
                ))}

                {/* DESKTOP ABOUT */}
                <div
                  className="relative shrink-0"
                  onMouseEnter={handleAboutMouseEnter}
                  onMouseLeave={handleAboutMouseLeave}
                >
                  <button
                    type="button"
                    onClick={handleAboutClick}
                    aria-expanded={aboutOpen}
                    className={`
                      group
                      flex
                      cursor-pointer
                      items-center
                      gap-2
                      rounded-lg
                      px-4
                      py-2.5
                      text-[12px]
                      font-medium
                      whitespace-nowrap
                      hover:bg-[#2E3192]
                      text-white
                      transition-all
                      duration-300
                      lg:px-5
                      lg:text-[13px]
                      ${
                        aboutOpen || isAboutActive
                          ? "bg-white/[0.08] text-white"
                          : "hover:bg-[#2E3192] hover:text-white"
                      }
                    `}
                  >
                    <span
                      className={`
                        h-1.5
                        w-1.5
                        shrink-0
                        rounded-full
                        transition-all
                        duration-300
                        ${
                          aboutOpen || isAboutActive
                            ? "bg-[#fff] shadow-[0_0_8px_rgba(0,174,239,0.6)]"
                            : "bg-[#fff] group-hover:bg-[#00AEEF]"
                        }
                      `}
                    />

                    <AnimatedLetters text="About" />

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`
                        h-3.5
                        w-3.5
                        shrink-0
                        opacity-50
                        transition-transform
                        duration-300
                        ${aboutOpen ? "rotate-180" : "rotate-0"}
                      `}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  {/* ABOUT DROPDOWN */}
                  <div
                    className={`
                      absolute
                      left-1/2
                      top-[calc(100%+8px)]
                      z-[1200]
                      w-[210px]
                      -translate-x-1/2
                      origin-top
                      transition-all
                      duration-300
                      ${
                        aboutOpen
                          ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
                          : "pointer-events-none -translate-y-1 scale-[0.97] opacity-0"
                      }
                    `}
                  >
                    <div className="absolute -top-2 left-0 right-0 h-3" />

                    <div
                      className="
                        rounded-xl
                        border
                        border-white/[0.10]
                        bg-gradient-to-br
                        from-[#a1a6ffa8]
                        via-[#4d90f305]
                        to-[#c7c9f7ac]
                        p-1.5
                        shadow-[0_16px_35px_rgba(0,0,0,0.38)]
                        backdrop-blur-xl
                      "
                    >
                      {aboutItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={closeResponsive}
                          className={`
                            group/item
                            flex
                            cursor-pointer
                            items-center
                            rounded-lg
                            px-3
                            py-2.5
                            text-[12px]
                            font-medium
                            transition-all
                            duration-300
                            ${
                              isActive(item.path)
                                ? "bg-[#00AEEF] text-white"
                                : "text-white/[0.65] hover:bg-[#2E3192] hover:text-white"
                            }
                          `}
                        >
                          <span
                            className="
                              mr-2.5
                              h-1.5
                              w-1.5
                              shrink-0
                              rounded-full
                              bg-[#2E3192]
                              transition-all
                              duration-300
                              group-hover/item:bg-[#fff]
                              group-hover/item:shadow-[0_0_7px_rgba(0,174,239,0.6)]
                            "
                          />

                          <span className="truncate">
                            {item.name}
                          </span>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="
                              ml-auto
                              shrink-0
                              opacity-0
                              transition-all
                              duration-300
                              group-hover/item:translate-x-0.5
                              group-hover/item:opacity-50
                            "
                          >
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* =================================================
                    LOCATION BUTTON
                    ONLY OPENS COMPANY MAP POPUP
                ================================================= */}

              <button
  type="button"
  onClick={openLocationPopup}
  aria-haspopup="dialog"
  aria-expanded={contactOpen}
  className={`
    group relative isolate flex shrink-0 cursor-pointer
    items-center justify-center
    overflow-hidden rounded-full
    border border-white/[0.24]
    px-5 py-2.5
    text-[12px] font-medium whitespace-nowrap
    text-white
    bg-white/[0.045]
    backdrop-blur-[18px]
    backdrop-saturate-150

    shadow-[inset_0_1px_1px_rgba(255,255,255,0.45),inset_0_-1px_2px_rgba(255,255,255,0.08),0_4px_8px_rgba(0,0,0,0.10),0_12px_30px_rgba(0,0,0,0.14)]

    transition-all duration-500 ease-out

    hover:bg-white/[0.075]
    hover:border-white/[0.38]
    hover:-translate-y-[2px]

    hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.60),inset_0_-2px_4px_rgba(255,255,255,0.10),0_6px_12px_rgba(0,0,0,0.12),0_18px_40px_rgba(46,49,146,0.22)]

    lg:px-6
    lg:text-[13px]

    ${
      contactOpen
        ? "bg-white/[0.10] border-white/[0.40]"
        : ""
    }
  `}
>
  {/* Liquid refraction */}
  <span
    aria-hidden="true"
    className="
      pointer-events-none
      absolute inset-0
      rounded-2
      overflow-hidden
    "
  >
    {/* Blue glass glow */}
    <span
      className="
        absolute
        -left-8 -top-8
        h-20 w-20
        rounded-3
        bg-[#2E3192]/20
        blur-[18px]
        opacity-60
        transition-all duration-700
        group-hover:translate-x-5
        group-hover:translate-y-2
        group-hover:scale-125
      "
    />

    {/* Green glass glow */}
    <span
      className="
        absolute
        -bottom-8 -right-8
        h-20 w-20
        rounded-full
        bg-[#00A651]/15
        blur-[18px]
        opacity-60
        transition-all duration-700
        group-hover:-translate-x-5
        group-hover:-translate-y-2
        group-hover:scale-125
      "
    />
  </span>

  {/* Top glass reflection */}
  <span
    aria-hidden="true"
    className="
      pointer-events-none
      absolute
      left-[8%] right-[8%] top-[1px]
      h-[45%]
      rounded-2
      bg-gradient-to-b
      from-white/[0.28]
      via-white/[0.08]
      to-transparent
      blur-[1px]
      opacity-80
    "
  />

  {/* Inner glass edge */}
  <span
    aria-hidden="true"
    className="
      pointer-events-none
      absolute inset-[1px]
      rounded-2
      border border-white/[0.12]
    "
  />

  {/* Moving glass reflection */}
  <span
    aria-hidden="true"
    className="
      pointer-events-none
      absolute
      -left-[80%]
      top-[-80%]
      h-[260%]
      w-[35%]
      rotate-[25deg]
      bg-gradient-to-r
      from-transparent
      via-white/[0.30]
      to-transparent
      blur-[3px]
      opacity-0
      transition-all duration-[1200ms] ease-out
      group-hover:left-[145%]
      group-hover:opacity-100
    "
  />

  {/* Button content */}
  <span className="relative z-10 flex items-center gap-2">
    <AnimatedLetters text="Location" />

    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="
        h-3.5 w-3.5
        opacity-60
        transition-all duration-300
        group-hover:translate-x-1
        group-hover:opacity-100
      "
    >
      <path
        d="M7 4L13 10L7 16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </span>
</button>
              </div>
            </div>

            {/* =================================================
                DESKTOP RIGHT
            ================================================= */}

            <div className="hidden shrink-0 items-center gap-2 lg:gap-2.5 md:flex">
              {/* PHONE */}
              <a
                href="tel:+88-01700-760511"
                className="
                  group
                  relative
                  flex
                  shrink-0
                  cursor-pointer
                  items-center
                  gap-2
                  overflow-hidden
                  rounded-xl
                  border
                  border-white/70
                  bg-white/55
                  px-3
                  py-1.5
                  text-[#172A8A]
                  shadow-[0_6px_20px_rgba(46,49,146,0.10),inset_0_1px_0_rgba(255,255,255,0.95)]
                  backdrop-blur-xl
                  backdrop-saturate-150
                  transition-all
                  duration-300
                  ease-out
                  hover:-translate-y-1
                  hover:border-[#2E3192]/30
                  hover:bg-white/75
                  hover:text-[#2E3192]
                  hover:shadow-[0_10px_28px_rgba(46,49,146,0.18),inset_0_1px_0_rgba(255,255,255,1)]
                "
              >
                <span
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    -translate-x-full
                    bg-gradient-to-r
                    from-transparent
                    via-white/50
                    to-transparent
                    transition-transform
                    duration-700
                    group-hover:translate-x-full
                  "
                />

                <span
                  className="
                    relative
                    flex
                    h-7
                    w-7
                    items-center
                    justify-center
                    rounded-lg
                    bg-gradient-to-br
                    from-[#2E3192]/10
                    to-[#00A651]/10
                    ring-1
                    ring-[#2E3192]/10
                    transition-all
                    duration-300
                    group-hover:scale-110
                    group-hover:bg-gradient-to-br
                    group-hover:from-[#2E3192]/15
                    group-hover:to-[#00A651]/15
                  "
                >
                  <img
                    src={call}
                    alt="Call"
                    className="
                      h-4
                      w-4
                      shrink-0
                      object-contain
                      opacity-90
                      transition-transform
                      duration-300
                      group-hover:rotate-6
                    "
                  />
                </span>

                <span className="relative whitespace-nowrap text-[11px] font-semibold tracking-wide xl:text-[12px]">
                  01700-760511
                </span>
              </a>

              {/* FACEBOOK */}
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="
                  group
                  relative
                  flex
                  h-10
                  w-10
                  shrink-0
                  cursor-pointer
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-xl
                  border
                  border-white/70
                  bg-white/55
                  shadow-[0_6px_18px_rgba(46,49,146,0.09),inset_0_1px_0_rgba(255,255,255,0.95)]
                  backdrop-blur-xl
                  backdrop-saturate-150
                  transition-all
                  duration-300
                  ease-out
                  hover:-translate-y-1
                  hover:border-[#2E3192]/30
                  hover:bg-[#2E3192]/[0.07]
                  hover:shadow-[0_10px_26px_rgba(46,49,146,0.18),inset_0_1px_0_rgba(255,255,255,1)]
                "
              >
                <span
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    -translate-x-full
                    bg-gradient-to-r
                    from-transparent
                    via-white/60
                    to-transparent
                    transition-transform
                    duration-700
                    group-hover:translate-x-full
                  "
                />

                <img
                  src={facebook}
                  alt="Facebook"
                  className="
                    relative
                    h-5
                    w-5
                    object-contain
                    opacity-90
                    transition-all
                    duration-300
                    group-hover:scale-110
                  "
                />
              </a>

              {/* LINKEDIN */}
              <a
                href="#"
                onClick={(event) => event.preventDefault()}
                aria-label="LinkedIn"
                className="
                  group
                  relative
                  flex
                  h-10
                  w-10
                  shrink-0
                  cursor-pointer
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-xl
                  border
                  border-white/70
                  bg-white/55
                  shadow-[0_6px_18px_rgba(0,166,81,0.08),inset_0_1px_0_rgba(255,255,255,0.95)]
                  backdrop-blur-xl
                  backdrop-saturate-150
                  transition-all
                  duration-300
                  ease-out
                  hover:-translate-y-1
                  hover:border-[#00A651]/30
                  hover:bg-[#00A651]/[0.07]
                  hover:shadow-[0_10px_26px_rgba(0,166,81,0.18),inset_0_1px_0_rgba(255,255,255,1)]
                "
              >
                <span
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    -translate-x-full
                    bg-gradient-to-r
                    from-transparent
                    via-white/60
                    to-transparent
                    transition-transform
                    duration-700
                    group-hover:translate-x-full
                  "
                />

                <img
                  src={linkdin}
                  alt="LinkedIn"
                  className="
                    relative
                    h-5
                    w-5
                    object-contain
                    opacity-90
                    transition-all
                    duration-300
                    group-hover:scale-110
                  "
                />
              </a>

              {/* SIGN OUT */}
              {user && (
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="
                    group
                    relative
                    shrink-0
                    cursor-pointer
                    overflow-hidden
                    whitespace-nowrap
                    rounded-xl
                    border
                    border-red-500/15
                    bg-white/55
                    px-3
                    py-2.5
                    text-[11px]
                    font-semibold
                    tracking-wide
                    text-red-600
                    shadow-[0_6px_18px_rgba(239,68,68,0.07),inset_0_1px_0_rgba(255,255,255,0.95)]
                    backdrop-blur-xl
                    backdrop-saturate-150
                    transition-all
                    duration-300
                    ease-out
                    hover:-translate-y-1
                    hover:border-red-500/30
                    hover:bg-red-50/75
                    hover:text-red-700
                    hover:shadow-[0_10px_26px_rgba(239,68,68,0.16),inset_0_1px_0_rgba(255,255,255,1)]
                    xl:text-[12px]
                  "
                >
                  <span
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      -translate-x-full
                      bg-gradient-to-r
                      from-transparent
                      via-white/60
                      to-transparent
                      transition-transform
                      duration-700
                      group-hover:translate-x-full
                    "
                  />

                  <span className="relative">Sign Out</span>
                </button>
              )}
            </div>

            {/* =================================================
                MOBILE MENU BUTTON
            ================================================= */}

            <button
              type="button"
              onClick={openResponsive}
              aria-label="Open menu"
              aria-expanded={responsive}
              className="
                flex
                h-10
                w-10
                shrink-0
                cursor-pointer
                items-center
                justify-center
                rounded-lg
                border
                border-white/[0.10]
                bg-white/[0.035]
                transition-all
                duration-300
                hover:border-[#00AEEF]/25
                hover:bg-[#00AEEF]/[0.06]
                md:hidden
              "
            >
              <img
                src={threeline}
                alt="Menu"
                className="h-5 w-5 object-contain"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* =======================================================
          MOBILE DRAWER
      ======================================================= */}

      <AnimatePresence>
        {responsive && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.25,
                ease: "easeOut",
              }}
              className="
                fixed
                inset-0
                z-[1998]
                bg-black/[0.48]
                backdrop-blur-[3px]
                md:hidden
              "
              onClick={closeResponsive}
            />

            {/* DRAWER */}
            <motion.aside
              initial={{
                x: "100%",
                opacity: 0.8,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              exit={{
                x: "100%",
                opacity: 0.8,
              }}
              transition={{
                type: "spring",
                stiffness: 330,
                damping: 32,
                mass: 0.85,
              }}
              className="
                fixed
                right-0
                top-0
                z-[1999]
                flex
                h-[100dvh]
                w-[min(88vw,390px)]
                flex-col
                overflow-hidden
                border-l
                border-white/[0.10]
                bg-[#061329]/[0.98]
                shadow-[-18px_0_55px_rgba(0,0,0,0.40)]
                backdrop-blur-2xl
                md:hidden
              "
            >
              {/* TOP LINE */}
              <div
                className="
                  pointer-events-none
                  absolute
                  left-0
                  right-0
                  top-0
                  h-px
                  bg-gradient-to-r
                  from-transparent
                  via-[#00AEEF]/40
                  to-transparent
                "
              />

              {/* MOBILE HEADER */}
              <div
                className="
                  flex
                  min-h-[82px]
                  shrink-0
                  items-center
                  justify-between
                  border-b
                  border-white/[0.07]
                  px-5
                "
              >
                <Link
                  to="/"
                  onClick={closeResponsive}
                  className="flex min-w-0 items-center gap-2"
                >
                  <img
                    src={logo}
                    alt="IPCL Logo"
                    className="
                      h-11
                      w-12
                      shrink-0
                      object-contain
                    "
                  />

                  <img
                    src={logo_name}
                    alt="IPCL"
                    className="
                      h-auto
                      max-w-[145px]
                      object-contain
                    "
                  />
                </Link>

                {/* CLOSE */}
                <button
                  type="button"
                  onClick={closeResponsive}
                  aria-label="Close menu"
                  className="
                    group
                    flex
                    h-10
                    w-10
                    shrink-0
                    cursor-pointer
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-white/[0.10]
                    bg-white/[0.035]
                    transition-all
                    duration-300
                    hover:border-[#00AEEF]/25
                    hover:bg-[#00AEEF]/[0.06]
                  "
                >
                  <img
                    src={crossicon}
                    alt="Close"
                    className="
                      h-5
                      w-5
                      object-contain
                      transition-transform
                      duration-300
                      group-hover:rotate-90
                    "
                  />
                </button>
              </div>

              {/* MOBILE CONTENT */}
              <div
                className="
                  flex-1
                  overflow-y-auto
                  overflow-x-hidden
                  px-4
                  py-5
                "
              >
                {/* SMALL LABEL */}
                <div
                  className="
                    mb-4
                    px-1
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.20em]
                    text-white/[0.32]
                  "
                >
                  Navigation
                </div>

                {/* MAIN LINKS */}
                <div className="space-y-1.5">
                  {menuItems.map((item, index) => (
                    <MobileMenuItem
                      key={item.path}
                      number={String(index + 1).padStart(2, "0")}
                      item={item}
                      active={isActive(item.path)}
                      onClick={closeResponsive}
                    />
                  ))}

                  {/* =================================================
                      MOBILE LOCATION
                  ================================================= */}

                  <button
                    type="button"
                    onClick={openLocationPopup}
                    aria-haspopup="dialog"
                    aria-expanded={contactOpen}
                    className={`
                      group
                      relative
                      flex
                      w-full
                      min-w-0
                      items-center
                      gap-4
                      rounded-xl
                      border
                      px-4
                      py-3.5
                      text-left
                      transition-all
                      duration-300
                      ${
                        contactOpen
                          ? "border-[#00AEEF]/25 bg-[#00AEEF]/[0.07] text-white"
                          : "border-transparent text-white/[0.68] hover:border-white/[0.08] hover:bg-white/[0.035] hover:text-white"
                      }
                    `}
                  >
                    <span
                      className={`
                        flex
                        h-7
                        w-7
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        border
                        text-[10px]
                        font-semibold
                        tracking-[0.08em]
                        ${
                          contactOpen
                            ? "border-[#00AEEF]/35 bg-[#00AEEF]/10 text-[#00AEEF]"
                            : "border-white/[0.10] bg-white/[0.025] text-white/[0.38] group-hover:border-[#00AEEF]/25 group-hover:text-[#00AEEF]"
                        }
                      `}
                    >
                      04
                    </span>

                    <span className="min-w-0 flex-1 truncate text-[13px] font-medium">
                      Location
                    </span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="shrink-0 opacity-40"
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>

                  {/* MOBILE ABOUT */}
                  <div className="pt-0.5">
                    <button
                      type="button"
                      onClick={() =>
                        setMobileAboutOpen((previous) => !previous)
                      }
                      aria-expanded={mobileAboutOpen}
                      className={`
                        group
                        relative
                        flex
                        w-full
                        min-w-0
                        items-center
                        gap-4
                        rounded-xl
                        border
                        px-4
                        py-3.5
                        text-left
                        transition-all
                        duration-300
                        ${
                          mobileAboutOpen || isAboutActive
                            ? "border-[#00AEEF]/25 bg-[#00AEEF]/[0.07] text-white"
                            : "border-transparent text-white/[0.68] hover:border-white/[0.08] hover:bg-white/[0.035] hover:text-white"
                        }
                      `}
                    >
                      <span
                        className={`
                          flex
                          h-7
                          w-7
                          shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          border
                          text-[10px]
                          font-semibold
                          tracking-[0.08em]
                          ${
                            mobileAboutOpen || isAboutActive
                              ? "border-[#00AEEF]/35 bg-[#00AEEF]/10 text-[#00AEEF]"
                              : "border-white/[0.10] bg-white/[0.025] text-white/[0.38] group-hover:border-[#00AEEF]/25 group-hover:text-[#00AEEF]"
                          }
                        `}
                      >
                        05
                      </span>

                      <span className="min-w-0 flex-1 truncate text-[13px] font-medium">
                        About
                      </span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`
                          shrink-0
                          opacity-50
                          transition-transform
                          duration-300
                          ${
                            mobileAboutOpen
                              ? "rotate-180"
                              : "rotate-0"
                          }
                        `}
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>

                    {/* ABOUT SUBMENU */}
                    <AnimatePresence initial={false}>
                      {mobileAboutOpen && (
                        <motion.div
                          initial={{
                            height: 0,
                            opacity: 0,
                          }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                          transition={{
                            duration: 0.3,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <div
                            className="
                              ml-5
                              mt-1.5
                              space-y-1.5
                              border-l
                              border-white/[0.08]
                              pl-3
                            "
                          >
                            {aboutItems.map((item, index) => (
                              <motion.div
                                key={item.path}
                                initial={{
                                  x: 18,
                                  opacity: 0,
                                }}
                                animate={{
                                  x: 0,
                                  opacity: 1,
                                }}
                                exit={{
                                  x: 18,
                                  opacity: 0,
                                }}
                                transition={{
                                  duration: 0.25,
                                  delay: index * 0.05,
                                  ease: [0.22, 1, 0.36, 1],
                                }}
                              >
                                <Link
                                  to={item.path}
                                  onClick={closeResponsive}
                                  className={`
                                    group/sub
                                    flex
                                    min-w-0
                                    items-center
                                    gap-3
                                    rounded-lg
                                    px-3
                                    py-3
                                    transition-all
                                    duration-300
                                    ${
                                      isActive(item.path)
                                        ? "bg-[#2E3192] text-white"
                                        : "text-white/[0.58] hover:bg-white/[0.035] hover:text-white"
                                    }
                                  `}
                                >
                                  <span
                                    className={`
                                      flex
                                      h-6
                                      w-6
                                      shrink-0
                                      items-center
                                      justify-center
                                      rounded-md
                                      border
                                      text-[9px]
                                      font-semibold
                                      ${
                                        isActive(item.path)
                                          ? "border-[#00AEEF]/30 bg-[#2E3192] text-[#00AEEF]"
                                          : "border-white/[0.08] text-white/[0.30] group-hover/sub:border-[#00AEEF]/25 group-hover/sub:text-[#00AEEF]"
                                      }
                                    `}
                                  >
                                    0{index + 1}
                                  </span>

                                  <span className="min-w-0 flex-1 truncate text-[12px] font-medium">
                                    {item.name}
                                  </span>

                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="13"
                                    height="13"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="
                                      shrink-0
                                      opacity-30
                                      transition-all
                                      duration-300
                                      group-hover/sub:translate-x-0.5
                                      group-hover/sub:opacity-60
                                    "
                                  >
                                    <path d="m9 18 6-6-6-6" />
                                  </svg>
                                </Link>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* DIVIDER */}
                <div
                  className="
                    my-6
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-white/[0.09]
                    to-transparent
                  "
                />

                {/* SOCIAL */}
                <div
                  className="
                    mb-3
                    px-1
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.20em]
                    text-white/[0.30]
                  "
                >
                  Connect
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {/* FACEBOOK */}
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="
                      flex
                      min-w-0
                      items-center
                      gap-3
                      rounded-xl
                      border
                      border-white/[0.08]
                      bg-white/[0.025]
                      px-3
                      py-3
                      text-white/[0.60]
                      transition-all
                      duration-300
                      hover:border-[#00AEEF]/25
                      hover:bg-[#00AEEF]/[0.05]
                      hover:text-white
                    "
                  >
                    <img
                      src={facebook}
                      alt="Facebook"
                      className="h-5 w-5 shrink-0 object-contain"
                    />

                    <span className="truncate text-[11px] font-medium">
                      Facebook
                    </span>
                  </a>

                  {/* LINKEDIN */}
                  <a
                    href="#"
                    onClick={(event) => event.preventDefault()}
                    className="
                      flex
                      min-w-0
                      items-center
                      gap-3
                      rounded-xl
                      border
                      border-white/[0.08]
                      bg-white/[0.025]
                      px-3
                      py-3
                      text-white/[0.60]
                      transition-all
                      duration-300
                      hover:border-[#00AEEF]/25
                      hover:bg-[#00AEEF]/[0.05]
                      hover:text-white
                    "
                  >
                    <img
                      src={linkdin}
                      alt="LinkedIn"
                      className="h-5 w-5 shrink-0 object-contain"
                    />

                    <span className="truncate text-[11px] font-medium">
                      LinkedIn
                    </span>
                  </a>
                </div>

                {/* PHONE */}
                <a
                  href="tel:+88-01700-760511"
                  className="
                    mt-2
                    flex
                    min-w-0
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-white/[0.08]
                    bg-white/[0.025]
                    px-3
                    py-3
                    text-white/[0.65]
                    transition-all
                    duration-300
                    hover:border-[#00AEEF]/25
                    hover:bg-[#00AEEF]/[0.05]
                    hover:text-white
                  "
                >
                  <span
                    className="
                      flex
                      h-7
                      w-7
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      border
                      border-white/[0.08]
                      bg-white/[0.025]
                    "
                  >
                    <img
                      src={call}
                      alt="Call"
                      className="h-4 w-4 object-contain"
                    />
                  </span>

                  <span className="truncate text-[12px] font-medium">
                    01700-760511
                  </span>
                </a>
              </div>

              {/* =================================================
                  MOBILE FOOTER
              ================================================= */}

              <div
                className="
                  shrink-0
                  border-t
                  border-white/[0.07]
                  p-4
                "
              >
                {user ? (
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="
                      flex
                      w-full
                      cursor-pointer
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-red-400/[0.15]
                      bg-red-500/[0.035]
                      px-4
                      py-3
                      text-[12px]
                      font-medium
                      text-white/[0.68]
                      transition-all
                      duration-300
                      hover:border-red-400/30
                      hover:bg-red-500/[0.07]
                      hover:text-white
                    "
                  >
                    Sign Out
                  </button>
                ) : (
                  <div
                    className="
                      text-center
                      text-[10px]
                      tracking-[0.12em]
                      text-white/[0.25]
                    "
                  >
                    IPCL
                  </div>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* =======================================================
          LOCATION POPUP
          
          This popup displays Contact_map only.
          Navbar itself NEVER accesses device location.
      ======================================================= */}

      <AnimatePresence>
        {contactOpen && (
          <>
            {/* LOCATION BACKDROP */}
            <motion.div
              key="location-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
              onClick={closeLocationPopup}
              className="
                fixed
                inset-0
                z-[3000]
                bg-black/[0.55]
                backdrop-blur-sm
              "
            />

            {/* LOCATION MODAL */}
            <motion.div
              key="location-modal"
              initial={{
                opacity: 0,
                y: 20,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.97,
              }}
              transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                fixed
                left-1/2
                top-1/2
                z-[3001]
                w-[calc(100%-2rem)]
                max-w-[700px]
                -translate-x-1/2
                -translate-y-1/2
                overflow-hidden
                rounded-2xl
                border
                border-white/[0.10]
                shadow-[0_25px_80px_rgba(0,0,0,0.55)]
              "
              role="dialog"
              aria-modal="true"
              aria-label="Location"
            >
              {/* MODAL HEADER */}
              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-white/[0.08]
                  px-4
                  py-3
                  sm:px-5
                "
              >
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00A651]" />

                  <h3 className="text-sm font-semibold text-white">
                    Location
                  </h3>
                </div>

                {/* CLOSE BUTTON */}
                <button
                  type="button"
                  onClick={closeLocationPopup}
                  aria-label="Close location popup"
                  className="
                    group
                    flex
                    h-9
                    w-9
                    shrink-0
                    cursor-pointer
                    items-center
                    justify-center
                    rounded-lg
                    border
                    border-white/[0.08]
                    bg-white/[0.035]
                    transition-all
                    duration-300
                    hover:border-[#00AEEF]/25
                    hover:bg-[#00AEEF]/[0.07]
                  "
                >
                  <img
                    src={crossicon}
                    alt="Close"
                    className="
                      h-4
                      w-4
                      object-contain
                      transition-transform
                      duration-300
                      group-hover:rotate-90
                    "
                  />
                </button>
              </div>

              {/* MAP */}
              <div className="h-[55vh] min-h-[300px] w-full">
                <Contact_map />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;