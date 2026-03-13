import React, { useEffect, useRef, useState } from 'react';
import './Misionvision.css';
import { Helmet } from 'react-helmet-async';
import Lottie from 'react-lottie-player';
import missionAnimation from '../../assets/mission.json';
import visionAnimation from '../../assets/Vision.json';

import extraAnimationMission from '../../assets/Isometric_data_analysis.json'; // Add your extra Lottie file here
import extraAnimationVission from '../../assets/Business_team.json'; // Add your extra Lottie file here

export default function MissionVision() {
  const missionRef = useRef(null);
  const visionRef = useRef(null);
  const [missionVisible, setMissionVisible] = useState(false);
  const [visionVisible, setVisionVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.target === missionRef.current) setMissionVisible(entry.isIntersecting);
          if (entry.target === visionRef.current) setVisionVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.3 }
    );

    if (missionRef.current) observer.observe(missionRef.current);
    if (visionRef.current) observer.observe(visionRef.current);

    return () => {
      if (missionRef.current) observer.unobserve(missionRef.current);
      if (visionRef.current) observer.unobserve(visionRef.current);
    };
  }, []);

  return (
    <section className="mission-vision-section ">
     

      <h2 className="section-title underline md:no-underline">Our Mission & Vision</h2>

      {/* Mission Section */}
      <div
        ref={missionRef}
        className={`mission-container ${missionVisible ? 'fade-in-left' : ''}`}
      >
        <div className="text-box">
          <Lottie loop animationData={missionAnimation} play={missionVisible} className="lottie-animation -ml-[15px]" />
          <p>
            Our mission is to deliver high-quality, durable and innovative plastic packaging solutions that empower industries to protect, transport, and showcase their products with confidence. We are committed to precision manufacturing, consistent quality, sustainable practices, and customer-focused service — ensuring every product we create adds value to the brands we serve.
          </p>
        </div>
        <div className="animation-box">
          <Lottie loop animationData={extraAnimationVission} play={missionVisible} className="lottie-animation_right" />
        </div>
      </div>

      {/* Vision Section */}
      <div
        ref={visionRef}
        className={`vision-container ${visionVisible ? 'fade-in-left' : ''}`}
      >
        <div className="animation-box">
          <Lottie loop animationData={extraAnimationMission} play={visionVisible} className="lottie-animation_missing_right" />
        </div>
        <div className="text-box">
          <Lottie loop animationData={visionAnimation} play={visionVisible} className="lottie-animation pb-2 -ml-[20px]" />
          <p>
            Our vision is to become a leading regional benchmark in plastic packaging by driving innovation, adopting eco-smart technologies, and setting new standards of quality and reliability. We aim to shape the future of packaging with solutions that are safer, stronger, environmentally responsible, and trusted by industries nationwide.
          </p>
        </div>
      </div>
    </section>
  );
}