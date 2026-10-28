import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import './Misionvision.css';
import { Helmet } from 'react-helmet-async';

const Lottie = lazy(() => import('react-lottie-player'));

function AnimationSlot({ animation, play, className }) {
  return (
    <div className={className} aria-hidden="true">
      {animation && (
        <Suspense fallback={null}>
          <Lottie loop animationData={animation} play={play} className="h-full w-full" />
        </Suspense>
      )}
    </div>
  );
}

export default function MissionVision() {
  const missionRef = useRef(null);
  const visionRef = useRef(null);
  const [missionVisible, setMissionVisible] = useState(false);
  const [visionVisible, setVisionVisible] = useState(false);
  const [shouldLoadAnimations, setShouldLoadAnimations] = useState(false);
  const [animations, setAnimations] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.target === missionRef.current) {
            setMissionVisible(entry.isIntersecting);
            if (entry.isIntersecting) setShouldLoadAnimations(true);
          }
          if (entry.target === visionRef.current) {
            setVisionVisible(entry.isIntersecting);
            if (entry.isIntersecting) setShouldLoadAnimations(true);
          }
        });
      },
      { rootMargin: '650px 0px', threshold: 0.1 }
    );

    if (missionRef.current) observer.observe(missionRef.current);
    if (visionRef.current) observer.observe(visionRef.current);

    return () => {
      if (missionRef.current) observer.unobserve(missionRef.current);
      if (visionRef.current) observer.unobserve(visionRef.current);
    };
  }, []);

  useEffect(() => {
    if (!shouldLoadAnimations) return undefined;

    let active = true;

    Promise.all([
      import('../../assets/mission.json'),
      import('../../assets/Vision.json'),
      import('../../assets/Isometric_data_analysis.json'),
      import('../../assets/Business_team.json'),
    ]).then(([mission, vision, data, team]) => {
      if (active) {
        setAnimations({
          mission: mission.default,
          vision: vision.default,
          data: data.default,
          team: team.default,
        });
      }
    }).catch((error) => {
      console.error('Mission and vision animations could not be loaded:', error);
    });

    return () => {
      active = false;
    };
  }, [shouldLoadAnimations]);

  return (
    <section className="mission-vision-section ">
     

      <h2 className="section-title underline md:no-underline">Our Mission & Vision</h2>

      {/* Mission Section */}
      <div
        ref={missionRef}
        className={`mission-container ${missionVisible ? 'fade-in-left' : ''}`}
      >
        <div className="text-box">
          <AnimationSlot animation={animations?.mission} play={missionVisible} className="lottie-animation -ml-[15px]" />
          <p>
            Our mission is to deliver high-quality, durable and innovative plastic packaging solutions that empower industries to protect, transport, and showcase their products with confidence. We are committed to precision manufacturing, consistent quality, sustainable practices, and customer-focused service — ensuring every product we create adds value to the brands we serve.
          </p>
        </div>
        <div className="animation-box">
          <AnimationSlot animation={animations?.team} play={missionVisible} className="lottie-animation_right" />
        </div>
      </div>

      {/* Vision Section */}
      <div
        ref={visionRef}
        className={`vision-container ${visionVisible ? 'fade-in-left' : ''}`}
      >
        <div className="animation-box">
          <AnimationSlot animation={animations?.data} play={visionVisible} className="lottie-animation_missing_right" />
        </div>
        <div className="text-box">
          <AnimationSlot animation={animations?.vision} play={visionVisible} className="lottie-animation pb-2 -ml-5" />
          <p>
            Our vision is to become a leading regional benchmark in plastic packaging by driving innovation, adopting eco-smart technologies, and setting new standards of quality and reliability. We aim to shape the future of packaging with solutions that are safer, stronger, environmentally responsible, and trusted by industries nationwide.
          </p>
        </div>
      </div>
    </section>
  );
}