import React, { useEffect } from "react";
import "./Goalprinciple.css";
import { Helmet } from "react-helmet-async";
import { FaLeaf, FaRecycle, FaLightbulb, FaHandsHelping, FaCogs, FaHeadset } from "react-icons/fa";

const Goalprinciple = () => {
  useEffect(() => {
    const elements = document.querySelectorAll(".scroll-anim");

    const onScroll = () => {
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          el.classList.add("visible");
        }
      });
    };
    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fgp-container">

      <h1 className="fgp-title scroll-anim">Our Goals & Principles</h1>

      {/* Goals */}
      <div className="fgp-section">
        <h2 className="fgp-heading scroll-anim">Goals</h2>
        <ul className="fgp-list">
          <li className="scroll-anim hover-effect">
            <FaLeaf className="icon" /> Reduce plastic waste through efficient design and optimized material usage
          </li>
          <li className="scroll-anim hover-effect">
            <FaRecycle className="icon" /> Minimize production scrap and promote in-house recycling
          </li>
          <li className="scroll-anim hover-effect">
            <FaLightbulb className="icon" /> Stay ahead in research & development
          </li>
          <li className="scroll-anim hover-effect">
            <FaHandsHelping className="icon" /> Confirm the commitment to ecology
          </li>
        </ul>
      </div>

      {/* Principles */}
      <div className="fgp-section">
        <h2 className="fgp-heading scroll-anim">Principles</h2>
        <ul className="fgp-list">
          <li className="scroll-anim hover-effect">
            <FaCogs className="icon" /> No compromise in quality
          </li>
          <li className="scroll-anim hover-effect">
            <FaCogs className="icon" /> Highest flexibility in troubleshooting
          </li>
          <li className="scroll-anim hover-effect">
            <FaHeadset className="icon" /> 24/7 customer service
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Goalprinciple;