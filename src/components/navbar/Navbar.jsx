import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  MapPin,
  Phone,
  X,
} from "lucide-react";

import logo from "../../../public/logo/IPCL_logo.png";
import logo_name from "../../../public/logo/IPCL_name_logo.png";
import Contact_map from "../contatUsMap/Contat_map";
import { AuthContext } from "../../firebase/AuthContext";

const BLUE = "#2E3192";
const GREEN = "#00A651";

const navItems = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Sustainability",
    path: "/sustainability",
  },
  {
    label: "Products",
    path: "/products",
  },
];

const aboutItems = [
  {
    label: "QC & QA",
    path: "/qc-qa",
  },
  {
    label: "Contact Us",
    path: "/contact-us",
  },
];

const UserAvatar = ({ user, className }) => (
  <span
    className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#2E3192] font-semibold text-white ${className}`}
  >
    {user?.photoURL ? (
      <img
        src={user.photoURL}
        alt=""
        className="h-full w-full object-cover"
      />
    ) : (
      (user?.displayName || user?.email || "U")
        .trim()
        .charAt(0)
        .toUpperCase()
    )}
  </span>
);

const Navbar = () => {
  const location = useLocation();
  const { user, singOutUser } = useContext(AuthContext);

  const [mobileMenu, setMobileMenu] = useState(false);
  const [aboutMenu, setAboutMenu] = useState(false);
  const [mobileAbout, setMobileAbout] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);

  const aboutCloseTimerRef = useRef(null);

  /* ==================================================
     ABOUT MENU CLOSE
  ================================================== */

  const cancelAboutClose = () => {
    if (aboutCloseTimerRef.current) {
      clearTimeout(aboutCloseTimerRef.current);
      aboutCloseTimerRef.current = null;
    }
  };

  const scheduleAboutClose = () => {
    cancelAboutClose();

    aboutCloseTimerRef.current = setTimeout(() => {
      setAboutMenu(false);
      aboutCloseTimerRef.current = null;
    }, 650);
  };

  /* ==================================================
     SCROLL BEHAVIOR

     MOBILE / TABLET:
     Navbar is ALWAYS fixed at top.

     LARGE DESKTOP:
     Navbar is ALSO ALWAYS fixed at top.

     IMPORTANT:
     No hide-on-scroll behavior.
     Navbar will NEVER slide out of the viewport.
  ================================================== */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  /* ==================================================
     CLOSE MENUS ON ROUTE CHANGE
  ================================================== */

  useEffect(() => {
    setMobileMenu(false);
    setAboutMenu(false);
    setMobileAbout(false);
    cancelAboutClose();
  }, [location.pathname]);

  /* ==================================================
     ESCAPE KEY
  ================================================== */

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMobileMenu(false);
        setAboutMenu(false);
        setMobileAbout(false);
        setMapOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  /* ==================================================
     BODY LOCK
  ================================================== */

  useEffect(() => {
    if (mobileMenu || mapOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenu, mapOpen]);

  /* ==================================================
     ACTIVE ROUTE
  ================================================== */

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return (
      location.pathname === path ||
      location.pathname.startsWith(`${path}/`)
    );
  };

  const aboutActive = aboutItems.some((item) => isActive(item.path));

  /* ==================================================
     LOGOUT
  ================================================== */

  const handleLogout = async () => {
    try {
      await singOutUser();

      setMobileMenu(false);
      setAboutMenu(false);
      setMobileAbout(false);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      {/* ==================================================
          MAIN NAVBAR
      ================================================== */}

     <header
  className={`
    fixed
    left-0
    right-0
    z-[9990]
    w-full
    pointer-events-auto
    transition-[top]
    duration-300
    ease-out
    ${scrolled ? "top-0" : "top-0 xl:top-10"}
  `}
>
  <div
    className={`
      w-full
      max-w-full
      mx-auto
      px-0
      transition-all
      duration-500
      ease-[cubic-bezier(0.4,0,0.2,1)]
      ${
        scrolled
          ? "sm:px-0 md:px-0 lg:px-0"
          : "sm:px-4 md:px-6 lg:px-8"
      }
    `}
  >
    <div
      className={`
        relative
        flex
        items-center
        w-full

        /* Mobile */
        h-[64px]

        /* Small desktop/tablet */
        sm:h-[72px]

        /* Large desktop */
        xl:h-[88px]

        bg-gradient-to-r
        from-[#7c7c7c83]
        to-[#7a79796f]

        backdrop-blur-xl
        backdrop-saturate-150

        transition-all
        duration-300

        ${
          scrolled
            ? `
              border-0
              sm:border-b
              sm:border-b-[#3558d484]
              sm:border-t-0
              sm:border-l-0
              sm:border-r-0
              shadow-[0_15px_45px_rgba(46,49,146,0.13)]
              rounded-none
            `
            : `
              border-0
              sm:border
              sm:border-[#3558d484]
              shadow-[0_8px_30px_rgba(46,49,146,0.08)]
              rounded-none
              sm:rounded-2xl
            `
        }
      `}
    >
      {/* ==================================================
          BRAND
      ================================================== */}
      <Link
        to="/"
        className="
          group
          relative
          flex
          items-center
          h-full
          pl-3
          pr-2
          sm:pl-4
          sm:pr-5
          lg:pl-5
          lg:pr-6
          xl:pl-5
          xl:pr-6
          shrink-0
        "
      >
        {/* Green Accent */}
        <span
          className="
            absolute
            left-0
            top-3
            bottom-3
            sm:top-4
            sm:bottom-4
            w-[3px]
            sm:w-[4px]
            rounded-r-full
            bg-[#fff]
          "
        />

        {/* Logo */}
        <motion.div
          initial={{
            opacity: 0,
            x: -10,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          className="
            flex
            items-center
            justify-center
            h-[46px]
            w-[46px]
            sm:h-[58px]
            sm:w-[58px]
            lg:h-[68px]
            lg:w-[68px]
            xl:h-[72px]
            xl:w-[100px]
            shrink-0
          "
        >
          <img
            src={logo}
            alt="Innovation Plastic Cans Ltd."
            className="
              w-full
              h-full
              object-contain
              transition-transform
              duration-300
              group-hover:scale-[1.04]
            "
          />
        </motion.div>

        {/* Company Name */}
        <div
          className="
            hidden
            sm:flex
            flex-col
            justify-center
            ml-2
            lg:ml-3
            w-32
            sm:w-[160px]
            md:w-[180px]
            lg:w-[210px]
            xl:w-[290px]
            min-w-0
          "
        >
          <img
            src={logo_name}
            alt="Innovation Plastic Cans Ltd."
            className="
              w-full
              h-auto
              max-h-[54px]
              lg:max-h-[62px]
              xl:max-h-[66px]
              object-contain
              object-left
            "
          />

          <div
            className="
              flex
              items-center
              gap-1.5
              mt-0.5
            "
          >
            <span
              className="
                h-[2px]
                w-5
                lg:w-7
                rounded-full
                bg-[#00A651]
              "
            />

            <span
              className="
                text-[7px]
                lg:text-[9px]
                tracking-[0.15em]
                lg:tracking-[0.18em]
                uppercase
                font-semibold
                text-white
                whitespace-nowrap
                [text-shadow:0_1px_3px_rgba(15,23,42,0.55)]
              "
            >
              Plastic Packaging
            </span>
          </div>
        </div>
      </Link>

      {/* ==================================================
          DESKTOP NAVIGATION
      ================================================== */}
      <nav
        className="
          hidden
          xl:flex
          items-center
          justify-center
          flex-1
          h-full
          px-2
        "
      >
        {navItems.map((item) => {
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                relative
                flex
                items-center
                justify-center
                px-4
                xl:px-5
                py-3
                text-[14px]
                font-semibold
                transition-all
                duration-200
                ${
                  active
                    ? "text-[#2E3192]"
                    : "text-white hover:text-[#2E3192]"
                }
                [text-shadow:0_1px_3px_rgba(15,23,42,0.45)]
              `}
            >
              {item.label}

              {active && (
                <motion.span
                  layoutId="navbar-active"
                  className="
                    absolute
                    left-4
                    right-4
                    bottom-1
                    h-[2px]
                    rounded-full
                    bg-[#00A651]
                  "
                />
              )}
            </Link>
          );
        })}

        {/* ==================================================
            ABOUT DROPDOWN
        ================================================== */}
        <div
          className="
            relative
            h-full
            flex
            items-center
          "
          onMouseEnter={() => {
            cancelAboutClose();
            setAboutMenu(true);
          }}
          onMouseLeave={scheduleAboutClose}
          onFocus={() => {
            cancelAboutClose();
            setAboutMenu(true);
          }}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget)) {
              scheduleAboutClose();
            }
          }}
        >
          <button
            type="button"
            onClick={() => setAboutMenu(true)}
            onFocus={() => setAboutMenu(true)}
            aria-haspopup="true"
            aria-expanded={aboutMenu}
            className={`
              relative
              flex
              items-center
              gap-1.5
              px-4
              xl:px-5
              py-3
              text-[14px]
              font-semibold
              transition-all
              duration-300
              cursor-pointer
              ${
                aboutActive
                  ? "text-[#2E3192]"
                  : "text-white hover:text-[#2E3192]"
              }
              [text-shadow:0_1px_3px_rgba(15,23,42,0.45)]
            `}
          >
            About Us

            <ChevronDown
              size={15}
              strokeWidth={2}
              className={`
                transition-transform
                duration-200
                ${aboutMenu ? "rotate-180" : ""}
              `}
            />

            {aboutActive && (
              <span
                className="
                  absolute
                  left-4
                  right-4
                  bottom-1
                  h-[2px]
                  rounded-full
                  bg-[#00A651]
                "
              />
            )}
          </button>

          <AnimatePresence>
            {aboutMenu && (
              <motion.div
                onMouseEnter={() => {
                  cancelAboutClose();
                  setAboutMenu(true);
                }}
                onMouseLeave={scheduleAboutClose}
                initial={{
                  opacity: 0,
                  y: -4,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -4,
                }}
                transition={{
                  duration: 0.18,
                  ease: "easeOut",
                }}
                className="
                  absolute
                  top-full
                  left-1/2
                  -translate-x-1/2
                  z-[9999]
                  w-[220px]
                  pt-0
                "
              >
                <div
                  className="
                    relative
                    w-full
                    overflow-hidden
                    rounded-b-lg
                    border
                    border-t-0
                    border-white/70
                    bg-[#575656b5]
                    shadow-[0_12px_30px_rgba(15,23,42,0.12)]
                    backdrop-blur-2xl
                  "
                >
                  {aboutItems.map((item) => {
                    const active = isActive(item.path);

                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`
                          group
                          flex
                          items-center
                          justify-between
                          px-3.5
                          py-2.5
                          text-[13px]
                          font-medium
                          rounded-md
                          transition-all
                          duration-300
                          ease-out
                          ${
                            active
                              ? "bg-white text-[#2E3192] font-semibold shadow-[0_4px_14px_rgba(0,0,0,0.10)]"
                              : "text-white hover:bg-[#f9f9f95f] hover:text-[#2E3192] hover:shadow-[0_4px_14px_rgba(0,0,0,0.10)] hover:-translate-y-[1px]"
                          }
                        `}
                      >
                        <span className="flex items-center gap-2">
                          {active && (
                            <span
                              className="
                                h-3.5
                                w-0.5
                                rounded-full
                                bg-[#00A651]
                              "
                            />
                          )}

                          {item.label}
                        </span>

                        <ChevronRight
                          size={15}
                          className="
                            text-[#2E3192]/55
                            opacity-50
                            transition-transform
                            duration-200
                            group-hover:translate-x-1
                            group-hover:text-[#00A651]
                          "
                        />
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Contact */}
        <Link
          to="/contact-us"
          className={`
            relative
            flex
            items-center
            justify-center
            px-4
            xl:px-5
            py-3
            text-[14px]
            font-semibold
            transition-all
            duration-200
            ${
              isActive("/contact-us")
                ? "text-[#2E3192]"
                : "text-white hover:text-[#2E3192]"
            }
            [text-shadow:0_1px_3px_rgba(15,23,42,0.45)]
          `}
        >
          Contact Us

          {isActive("/contact-us") && (
            <span
              className="
                absolute
                bottom-1
                left-4
                right-4
                h-0.5
                rounded-full
                bg-[#00A651]
              "
            />
          )}
        </Link>
      </nav>

      {/* ==================================================
          RIGHT ACTIONS
      ================================================== */}
      <div
        className="
          ml-auto
          flex
          items-center
          gap-1
          sm:gap-1.5
          pr-2
          sm:pr-3
          lg:pr-4
        "
      >
        {/* Call Us */}
        <a
          href="tel:+880"
          className="
            hidden
            xl:flex
            items-center
            gap-2
            px-3
            py-2
            rounded-lg
            text-white
            hover:text-[#2E3192]
            transition-colors
            [text-shadow:0_1px_3px_rgba(15,23,42,0.45)]
          "
        >
          <Phone
            size={15}
            strokeWidth={2}
            className="text-white"
          />

          <span className="text-xs font-semibold whitespace-nowrap">
            Call Us
          </span>
        </a>

        {/* Location */}
        <button
          type="button"
          onClick={() => setMapOpen(true)}
          className="
            hidden
            sm:flex
            items-center
            justify-center
            w-8
            h-8
            lg:w-10
            lg:h-10
            rounded-full
            bg-white/70
            border
            border-white
            text-[#2E3192]
            shadow-[0_4px_12px_rgba(15,23,42,0.08)]
            hover:bg-white
            hover:border-[#2E3192]/20
            hover:shadow-[0_6px_16px_rgba(46,49,146,0.14)]
            transition-all
            duration-200
            cursor-pointer
          "
          aria-label="Open location"
        >
          <MapPin
            size={15}
            strokeWidth={2}
            className="lg:hidden"
          />

          <MapPin
            size={17}
            strokeWidth={2}
            className="hidden lg:block"
          />
        </button>

        {/* ==================================================
            AUTH BUTTONS
        ================================================== */}
        <div
          className="
            order-2
            hidden
            items-center
            gap-1
            rounded-xl
            border
            border-white/80
            bg-white/45
            p-1
            shadow-[inset_0_1px_2px_rgba(15,23,42,0.08),0_3px_10px_rgba(15,23,42,0.06)]
            backdrop-blur-md
            sm:flex
          "
        >
          {!user ? (
            <>
              {/* Register */}
              <Link
                to="/register"
                className="
                  hidden
                  md:flex
                  items-center
                  justify-center
                  px-3
                  py-2
                  rounded-lg
                  border
                  border-[#2E3192]/25
                  bg-white/80
                  text-[#2E3192]
                  text-xs
                  font-semibold
                  whitespace-nowrap
                  shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_1px_3px_rgba(46,49,146,0.08)]
                  hover:bg-white
                  hover:border-[#2E3192]/45
                  transition-all
                  duration-200
                "
              >
                Register
              </Link>

              {/* Login */}
              <Link
                to="/login"
                className="
                  hidden
                  sm:flex
                  items-center
                  justify-center
                  px-3
                  py-2
                  rounded-lg
                  bg-[#2E3192]
                  text-white
                  text-xs
                  font-semibold
                  whitespace-nowrap
                  shadow-[inset_0_1px_1px_rgba(255,255,255,0.18),0_2px_5px_rgba(46,49,146,0.22)]
                  hover:bg-[#25277F]
                  transition-all
                  duration-200
                "
              >
                Login
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-1.5 px-1">
              <UserAvatar
                user={user}
                className="h-7 w-7 border border-white shadow-sm"
              />

              <button
                type="button"
                onClick={handleLogout}
                className="
                  rounded-lg
                  border
                  border-[#2E3192]/20
                  bg-white/80
                  px-2.5
                  py-1.5
                  text-xs
                  font-semibold
                  text-[#2E3192]
                  shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_1px_3px_rgba(46,49,146,0.08)]
                  transition-all
                  duration-200
                  hover:border-[#2E3192]
                  hover:bg-[#2E3192]
                  hover:text-white
                "
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* ==================================================
            MOBILE MENU BUTTON
        ================================================== */}
        <button
          type="button"
          onClick={() => setMobileMenu(true)}
          className="
            flex
            xl:hidden
            order-3
            items-center
            justify-center
            w-9
            h-9
            sm:w-10
            sm:h-10
            rounded-lg
            sm:rounded-xl
            bg-[#2E3192]
            text-white
            shadow-[0_5px_15px_rgba(46,49,146,0.18)]
          "
          aria-label="Open navigation"
        >
          <Menu
            size={19}
            className="sm:hidden"
          />

          <Menu
            size={21}
            className="hidden sm:block"
          />
        </button>
      </div>
    </div>
  </div>
</header>

      {/* ==================================================
          MOBILE DRAWER
      ================================================== */}

     <AnimatePresence>
  {mobileMenu && (
    <>
      {/* ==================================================
          GLASS OVERLAY
      ================================================== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={() => setMobileMenu(false)}
        className="
          fixed
          inset-0
          z-[9998]
          bg-slate-950/35
          backdrop-blur-[8px]
        "
      />

      {/* ==================================================
          GLASS MOBILE DRAWER
      ================================================== */}
      <motion.aside
        initial={{
          x: "100%",
          opacity: 0.85,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        exit={{
          x: "100%",
          opacity: 0.85,
        }}
        transition={{
          duration: 0.32,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          fixed
          top-0
          right-0
          bottom-0
          z-[9999]

          w-[min(370px,80vw)]

          overflow-y-auto
          overflow-x-hidden

          bg-white/55
          backdrop-blur-[28px]
          backdrop-saturate-[180%]

          border-l
          border-white/70

          shadow-[-25px_0_80px_rgba(15,23,42,0.20)]

          scrollbar-thin
          scrollbar-thumb-slate-300/50
          scrollbar-track-transparent
        "
      >
        {/* ==================================================
            GLASS INNER LIGHT
        ================================================== */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            -z-10
            bg-gradient-to-b
            from-white/75
            via-white/45
            to-slate-100/40
          "
        />

        {/* ==================================================
            SOFT GLASS GLOW
        ================================================== */}
        <div
          className="
            pointer-events-none
            absolute
            -top-24
            -right-24
            h-64
            w-64
            rounded-full
            bg-[#2E3192]/10
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            top-1/3
            -left-28
            h-56
            w-56
            rounded-full
            bg-[#00A651]/8
            blur-3xl
          "
        />

        {/* ==================================================
            DRAWER HEADER
        ================================================== */}
        <div
          className="
            sticky
            top-0
            z-20

            flex
            items-center
            justify-between

            px-4
            py-3

            sm:px-5
            sm:py-4

            bg-white/45
            backdrop-blur-[30px]
            backdrop-saturate-[180%]

            border-b
            border-white/70

            shadow-[0_8px_30px_rgba(15,23,42,0.07)]
          "
        >
          {/* Logo */}
          <Link
            to="/"
            onClick={() => setMobileMenu(false)}
            className="
              flex
              items-center
              gap-2.5
            "
          >
            <div
              className="
                flex
                items-center
                justify-center

                w-9
                h-9

                sm:w-12
                sm:h-12

                rounded-xl
                bg-white/55
                backdrop-blur-xl

                border
                border-white/80

                shadow-[0_6px_18px_rgba(15,23,42,0.08)]
              "
            >
              <img
                src={logo}
                alt="Innovation Plastic Cans Ltd."
                className="
                  w-8
                  h-8

                  sm:w-10
                  sm:h-10

                  object-contain
                "
              />
            </div>

            <div>
              <img
                src={logo_name}
                alt="Innovation Plastic Cans Ltd."
                className="
                  w-[115px]
                  sm:w-[135px]

                  max-h-[32px]
                  sm:max-h-[38px]

                  object-contain
                  object-left
                "
              />

              <div
                className="
                  flex
                  items-center
                  gap-1
                  mt-0.5
                "
              >
                <span
                  className="
                    w-4
                    sm:w-5
                    h-[2px]
                    rounded-full
                    bg-[#00A651]
                  "
                />

                <span
                  className="
                    text-[6px]
                    sm:text-[7px]

                    tracking-[0.13em]
                    sm:tracking-[0.15em]

                    uppercase
                    font-semibold

                    text-slate-500
                  "
                >
                  Plastic Packaging
                </span>
              </div>
            </div>
          </Link>

          {/* Close */}
          <button
            type="button"
            onClick={() => setMobileMenu(false)}
            className="
              flex
              items-center
              justify-center

              w-9
              h-9

              sm:w-10
              sm:h-10

              rounded-xl

              bg-white/55
              backdrop-blur-xl

              border
              border-white/80

              text-slate-700

              shadow-[0_5px_15px_rgba(15,23,42,0.07)]

              hover:bg-white/75
              hover:text-[#2E3192]

              transition-all
              duration-200
            "
            aria-label="Close navigation"
          >
            <X
              size={18}
              className="sm:hidden"
            />

            <X
              size={20}
              className="hidden sm:block"
            />
          </button>
        </div>

        {/* ==================================================
            DRAWER CONTENT
        ================================================== */}
        <div
          className="
            relative
            z-10

            px-4
            py-4

            sm:px-5
            sm:py-5
          "
        >
          {/* ==================================================
              MAIN NAVIGATION
          ================================================== */}
          <div className="space-y-1.5">
            {navItems.map((item) => {
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenu(false)}
                  className={`
                    group

                    flex
                    items-center
                    justify-between

                    px-3.5
                    py-3

                    sm:px-4
                    sm:py-3.5

                    rounded-xl

                    text-sm
                    font-semibold

                    border

                    transition-all
                    duration-200

                    ${
                      active
                        ? `
                          bg-white/65
                          backdrop-blur-xl
                          border-white/80
                          text-[#2E3192]
                          shadow-[0_6px_18px_rgba(46,49,146,0.08)]
                        `
                        : `
                          bg-white/20
                          border-transparent
                          text-slate-700

                          hover:bg-white/55
                          hover:border-white/70
                          hover:text-[#2E3192]
                          hover:shadow-[0_5px_15px_rgba(15,23,42,0.05)]
                        `
                    }
                  `}
                >
                  <span>{item.label}</span>

                  <ChevronRight
                    size={16}
                    className={`
                      transition-transform
                      duration-200

                      group-hover:translate-x-0.5

                      ${
                        active
                          ? "text-[#00A651]"
                          : "text-slate-400"
                      }
                    `}
                  />
                </Link>
              );
            })}

            {/* ==================================================
                MOBILE ABOUT
            ================================================== */}
            <div>
              <button
                type="button"
                onClick={() =>
                  setMobileAbout((prev) => !prev)
                }
                className={`
                  w-full

                  flex
                  items-center
                  justify-between

                  px-3.5
                  py-3

                  sm:px-4
                  sm:py-3.5

                  rounded-xl

                  text-sm
                  font-semibold

                  border

                  transition-all
                  duration-200

                  ${
                    aboutActive
                      ? `
                        bg-white/65
                        backdrop-blur-xl
                        border-white/80
                        text-[#2E3192]
                        shadow-[0_6px_18px_rgba(46,49,146,0.07)]
                      `
                      : `
                        bg-white/20
                        border-transparent
                        text-slate-700

                        hover:bg-white/55
                        hover:border-white/70
                        hover:text-[#2E3192]
                      `
                  }
                `}
              >
                <span>About Us</span>

                <ChevronDown
                  size={16}
                  className={`
                    transition-transform
                    duration-200

                    ${
                      mobileAbout
                        ? "rotate-180 text-[#00A651]"
                        : "text-slate-400"
                    }
                  `}
                />
              </button>

              <AnimatePresence>
                {mobileAbout && (
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
                      duration: 0.22,
                    }}
                    className="overflow-hidden"
                  >
                    <div
                      className="
                        ml-3
                        mt-1.5
                        pl-3

                        border-l-2
                        border-[#00A651]/30

                        space-y-1
                      "
                    >
                      {aboutItems.map((item) => {
                        const active = isActive(item.path);

                        return (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() =>
                              setMobileMenu(false)
                            }
                            className={`
                              flex
                              items-center
                              justify-between

                              px-3
                              py-2.5

                              sm:px-4
                              sm:py-3

                              rounded-lg

                              text-sm

                              border

                              transition-all
                              duration-200

                              ${
                                active
                                  ? `
                                    bg-white/60
                                    backdrop-blur-xl
                                    border-white/70
                                    text-[#2E3192]
                                    font-semibold
                                  `
                                  : `
                                    bg-white/15
                                    border-transparent
                                    text-slate-600

                                    hover:bg-white/50
                                    hover:border-white/60
                                    hover:text-[#2E3192]
                                  `
                              }
                            `}
                          >
                            <span>{item.label}</span>

                            <ChevronRight
                              size={15}
                              className={
                                active
                                  ? "text-[#00A651]"
                                  : "text-slate-400"
                              }
                            />
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ==================================================
              GLASS DIVIDER
          ================================================== */}
          <div
            className="
              my-4
              sm:my-5

              h-px

              bg-gradient-to-r
              from-transparent
              via-white/90
              to-transparent
            "
          />

          {/* ==================================================
              LOCATION
          ================================================== */}
          <button
            type="button"
            onClick={() => {
              setMobileMenu(false);
              setMapOpen(true);
            }}
            className="
              group

              w-full

              flex
              items-center
              gap-3

              px-3.5
              py-3

              sm:px-4
              sm:py-3.5

              rounded-xl

              bg-white/30
              backdrop-blur-xl

              border
              border-white/70

              text-slate-700
              text-sm
              font-semibold

              shadow-[0_5px_18px_rgba(15,23,42,0.04)]

              hover:bg-white/55
              hover:border-white/90
              hover:text-[#2E3192]

              transition-all
              duration-200
            "
          >
            <span
              className="
                flex
                items-center
                justify-center

                w-8
                h-8

                sm:w-9
                sm:h-9

                rounded-lg

                bg-white/65
                backdrop-blur-xl

                border
                border-white/80

                text-[#2E3192]

                shadow-sm

                group-hover:scale-105

                transition-transform
              "
            >
              <MapPin size={16} />
            </span>

            <span>Our Location</span>
          </button>

          {/* ==================================================
              CALL
          ================================================== */}
          <a
            href="tel:+880"
            className="
              group

              mt-2

              w-full

              flex
              items-center
              gap-3

              px-3.5
              py-3

              sm:px-4
              sm:py-3.5

              rounded-xl

              bg-white/30
              backdrop-blur-xl

              border
              border-white/70

              text-slate-700
              text-sm
              font-semibold

              shadow-[0_5px_18px_rgba(15,23,42,0.04)]

              hover:bg-white/55
              hover:border-white/90
              hover:text-[#2E3192]

              transition-all
              duration-200
            "
          >
            <span
              className="
                flex
                items-center
                justify-center

                w-8
                h-8

                sm:w-9
                sm:h-9

                rounded-lg

                bg-white/65
                backdrop-blur-xl

                border
                border-white/80

                text-[#00A651]

                shadow-sm

                group-hover:scale-105

                transition-transform
              "
            >
              <Phone size={16} />
            </span>

            <span>Call Us</span>
          </a>

          {/* ==================================================
              CONTACT
          ================================================== */}
          <Link
            to="/contact-us"
            onClick={() => setMobileMenu(false)}
            className="
              mt-2

              w-full

              flex
              items-center
              justify-center
              gap-2

              px-4
              py-3

              sm:py-3.5

              rounded-xl

              bg-[#2E3192]/90
              backdrop-blur-xl

              border
              border-white/30

              text-white
              text-sm
              font-semibold

              shadow-[0_10px_25px_rgba(46,49,146,0.18)]

              hover:bg-[#25277F]

              transition-all
              duration-200
            "
          >
            Contact Us
            <span>→</span>
          </Link>

          {/* ==================================================
              MOBILE AUTH
          ================================================== */}
          {!user ? (
            <div className="mt-3 grid grid-cols-2 gap-2">
              {/* Register */}
              <Link
                to="/register"
                onClick={() => setMobileMenu(false)}
                className="
                  flex
                  items-center
                  justify-center

                  py-3

                  rounded-xl

                  bg-white/40
                  backdrop-blur-xl

                  border
                  border-white/80

                  text-[#2E3192]
                  text-sm
                  font-semibold

                  shadow-[0_5px_15px_rgba(15,23,42,0.04)]

                  hover:bg-white/65

                  transition-all
                  duration-200
                "
              >
                Register
              </Link>

              {/* Login */}
              <Link
                to="/login"
                onClick={() => setMobileMenu(false)}
                className="
                  flex
                  items-center
                  justify-center

                  py-3

                  rounded-xl

                  bg-[#2E3192]/90
                  backdrop-blur-xl

                  border
                  border-white/30

                  text-white
                  text-sm
                  font-semibold

                  shadow-[0_8px_20px_rgba(46,49,146,0.16)]

                  hover:bg-[#25277F]

                  transition-all
                  duration-200
                "
              >
                Login
              </Link>
            </div>
          ) : (
            <div
              className="
                mt-3

                flex
                items-center
                justify-between

                rounded-xl

                bg-white/35
                backdrop-blur-xl

                border
                border-white/75

                p-2

                shadow-[0_6px_18px_rgba(15,23,42,0.05)]
              "
            >
              <div className="flex min-w-0 items-center">
                <UserAvatar
                  user={user}
                  className="
                    h-8
                    w-8

                    border-2
                    border-white/90

                    shadow-sm
                  "
                />
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="
                  rounded-lg

                  border
                  border-[#2E3192]/20

                  bg-white/60
                  backdrop-blur-xl

                  px-3
                  py-2

                  text-sm
                  font-semibold
                  text-[#2E3192]

                  hover:bg-[#2E3192]
                  hover:text-white

                  transition-all
                  duration-200
                "
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </motion.aside>
    </>
  )}
</AnimatePresence>

      {/* ==================================================
          LOCATION MODAL
      ================================================== */}

      <AnimatePresence>
        {mapOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
              fixed
              inset-0
              z-[10000]

              flex
              items-center
              justify-center

              p-4

              bg-slate-950/55
              backdrop-blur-sm
            "
            onClick={() => setMapOpen(false)}
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.96,
                y: 10,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: 10,
              }}
              transition={{
                duration: 0.2,
              }}
              onClick={(event) => event.stopPropagation()}
              className="
                relative
                w-full
                max-w-[1000px]
                h-[min(700px,85vh)]

                overflow-hidden

                rounded-2xl
                bg-white

                shadow-[0_30px_100px_rgba(15,23,42,0.25)]
              "
            >
              {/* Modal Header */}

              <div
                className="
                  absolute
                  top-0
                  left-0
                  right-0
                  z-20

                  flex
                  items-center
                  justify-between

                  px-5
                  py-4

                  bg-white/95
                  backdrop-blur-xl

                  border-b
                  border-slate-100
                "
              >
                <div>
                  <h3
                    className="
                      text-lg
                      font-bold
                      text-[#2E3192]
                    "
                  >
                    Our Location
                  </h3>

                  <p className="text-xs text-slate-500 mt-0.5">
                    Innovation Plastic Cans Ltd.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setMapOpen(false)}
                  className="
                    flex
                    items-center
                    justify-center

                    w-10
                    h-10

                    rounded-xl

                    bg-slate-100
                    text-slate-700

                    hover:bg-slate-200
                    transition-colors
                  "
                  aria-label="Close location"
                >
                  <X size={19} />
                </button>
              </div>

              {/* Map */}

              <div className="w-full h-full pt-[73px]">
                <Contact_map />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;