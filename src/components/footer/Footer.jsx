import React, { useEffect, useState } from "react";
import "./Footer.css";
import logo from "../../../public/logo/IPCL_logo_with_name.png";
import Call_icon from "../../../public/icon/phone-call.png";
import facebook_icon from "../../../public/icon/facebook.png";
import linkdin_icon from "../../../public/icon/linkDin.png";
import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  const [openMenu, setOpenMenu] = useState({});

  useEffect(() => {
    const bottles = document.querySelectorAll(".footer-plastic-bottle");
    const gears = document.querySelectorAll(".footer-gear");

    bottles.forEach((bottle, index) => {
      bottle.style.animation = `footer-floatBottle ${3 + index * 0.5}s ease-in-out infinite alternate`;
    });

    gears.forEach((gear, index) => {
      gear.style.animation = `footer-rotateGear ${15 + index * 5}s linear infinite`;
    });
  }, []);

  const isMobile = () => window.innerWidth <= 768;

  const toggleSubmenu = (key) => {
    if (isMobile()) {
      setOpenMenu((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    }
  };

  return (
    <>
      <div className="footer-container">
        <div className="footer-bg ">

          {/* TOP WHITE BLEND */}
          <div className="footer-top-blend"></div>

          {/* DARK OVERLAY */}
          <div className="footer-overlay"></div>

          {/* Background factory shapes */}
          <div className="footer-factory-shape footer-shape-1" />
          <div className="footer-factory-shape footer-shape-2" />
          <div className="footer-factory-shape footer-shape-3" />

          <div className="footer-conveyor-line footer-line-1" />
          <div className="footer-conveyor-line footer-line-2" />

          <div className="footer-gear footer-gear-1" />
          <div className="footer-gear footer-gear-2" />
          <div className="footer-gear footer-gear-3" />

          <div className="footer-plastic-bottle footer-bottle-1" />
          <div className="footer-plastic-bottle footer-bottle-2" />
          <div className="footer-plastic-bottle footer-bottle-3" />
          <div className="footer-plastic-bottle footer-bottle-4" />
          <div className="footer-plastic-bottle footer-bottle-5" />
          <div className="footer-plastic-bottle footer-bottle-6" />
          <div className="footer-plastic-bottle footer-bottle-7" />

          {/* Footer Content */}
          <div className="footer-content">

            {/* LOGO */}
            <div className="footer-column">
              <img
                className="footer-logo"
                src={logo}
                alt="Logo"
                loading="lazy"
              />
            </div>

            {/* SERVICES */}
            <div className="footer-column">
              <h3>Services</h3>
              <ul className="footer-menu">
                <li>
                  <div
                    className="footer-menu-title"
                    onClick={() => toggleSubmenu("manufacturing")}
                  >
                    Manufacturing
                  </div>
                </li>

                <li>
                  <div
                    className="footer-menu-title"
                    onClick={() => toggleSubmenu("packaging")}
                  >
                    Packaging
                  </div>
                </li>

                <li>
                  <div
                    className="footer-menu-title"
                    onClick={() => toggleSubmenu("logistics")}
                  >
                    Logistics
                  </div>
                </li>
              </ul>
            </div>

            {/* QUICK LINKS */}
            <div className="footer-column">
              <h3>Quick Links</h3>
              <ul className="footer-menu">
                <li>
                  <NavLink to='/contact-us'>
                    <div
                      className="footer-menu-title"
                      onClick={() => toggleSubmenu("about")}
                    >
                      Contact Us
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink to='products'>
                    <div
                      className="footer-menu-title"
                      onClick={() => toggleSubmenu("about")}
                    >
                      Find Our Products
                    </div>
                  </NavLink>
                </li>


              </ul>

            </div>

            {/* CONTACT */}
            <div className="footer-column">
              <h3>Contact Us</h3>

              <h4 className="footer-company-name">
                Innovation Plastic Cans Ltd.
              </h4>

              <p>
                Sena Kalyan Bhaban (14th Floor), 195 Motijheel C/A, Dhaka-1000
              </p>

              <p>
                Phone: +88-02-223382144 <br />
                +88-02-223382446 <br />
                +88-01700-760208
              </p>

              <p>Email: info@innovation-plastic.com</p>

              <div className="social-icons">
                <a href="tel:+8801700760511">
                  <img src={Call_icon} alt="Call" />
                </a>

                <a
                  href="https://www.facebook.com/share/1BRWKkPB49/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={facebook_icon} alt="Facebook" />
                </a>

                <a href="#">
                  <img src={linkdin_icon} alt="Linkedin" />
                </a>
              </div>
              <div className="border-2 border-[#2E3192] inline-flex rounded px-3 py-1 mt-3 font-bold hover:bg-[#2E3192] hover:text-[#fff] duration-500">
                <NavLink to="/sitemap"> Sitemap</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* COPYRIGHT */}
      <div className="footer-copyright flex flex-wrap justify-center gap-2 md:gap-0  md:justify-between">
        <div className="">
          © 2025 Innovation Plastic Cans Ltd. All rights reserved.
        </div>
        <div>
          <ul className="flex gap-3">
            <li><NavLink to='Privacy-Policy'>Privacy Policy</NavLink></li>
            <li><NavLink to=''>Terms of Services</NavLink></li>
            <li><NavLink to='cookie-policy'>Cookie Policy</NavLink></li>
          </ul>
        </div>
        <div>
          <p>Design & Develop by Abdullah Al - Masud</p>
        </div>
      </div>
    </>
  );
};

export default Footer;