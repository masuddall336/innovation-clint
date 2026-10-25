
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import videoFile from "../../assets/video/IPC.mp4";
import Loading from "../loading/Loading";

const Video = () => {
  const videoRef = useRef(null);
  const mountedRef = useRef(false);
  const previousOverflowRef = useRef(null);

  const [showVideo, setShowVideo] = useState(true);
  const [videoReady, setVideoReady] = useState(false);

  // =========================================================
  // CLOSE VIDEO
  // =========================================================
  const closeVideo = () => {
    if (!mountedRef.current) return;

    setShowVideo(false);

    const video = videoRef.current;

    if (video) {
      try {
        video.pause();
      } catch {
        // Ignore pause errors
      }
    }
  };

  // =========================================================
  // BODY SCROLL LOCK
  // =========================================================
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (showVideo) {
      previousOverflowRef.current = {
        body: document.body.style.overflow,
        document: document.documentElement.style.overflow,
      };
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else if (previousOverflowRef.current) {
      document.body.style.overflow = previousOverflowRef.current.body;
      document.documentElement.style.overflow = previousOverflowRef.current.document;
      previousOverflowRef.current = null;
    }

    return () => {
      if (!previousOverflowRef.current) return;
      document.body.style.overflow = previousOverflowRef.current.body;
      document.documentElement.style.overflow = previousOverflowRef.current.document;
      previousOverflowRef.current = null;
    };
  }, [showVideo]);

  // =========================================================
  // VIDEO READY
  // =========================================================
  const handleVideoReady = () => {
    if (!mountedRef.current) return;

    setVideoReady(true);

  };

  // =========================================================
  // VIDEO END
  // =========================================================
  const handleVideoEnd = () => {
    closeVideo();
  };

  // =========================================================
  // VIDEO ERROR
  // =========================================================
  const handleVideoError = () => {
    console.warn("Intro video could not be loaded.");
    closeVideo();
  };

  // =========================================================
  // VIDEO CAN PLAY
  // =========================================================
  const handleCanPlay = () => {
    if (!mountedRef.current) return;

    const video = videoRef.current;

    if (!video) return;

    // 2X SPEED
    video.playbackRate = 2;
    video.defaultPlaybackRate = 2;

    handleVideoReady();

    if (video.paused) {
      video.play().catch(() => {
        if (mountedRef.current) {
          closeVideo();
        }
      });
    }
  };

  return (
    <AnimatePresence mode="wait">
      {showVideo && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.02,
          }}
          transition={{
            duration: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            fixed
            inset-0
            z-[99999]
            flex
            items-center
            justify-center
            overflow-hidden
            bg-[#07111f]
          "
        >
          {/* =================================================
              BACKGROUND
          ================================================= */}
          <div
            className="
              absolute
              inset-0
              bg-[#fff]
            "
          />

          {/* =================================================
              CENTER GLOW
          ================================================= */}
          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              h-[180px]
              w-[180px]
              sm:h-[220px]
              sm:w-[220px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-[#00AEEF]/20
              blur-[60px]
            "
          />

          {/* =================================================
              VIDEO
              
              Mobile:
              object-contain = entire video visible

              Desktop:
              object-cover = fills entire screen
          ================================================= */}
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            preload="auto"
            onCanPlay={handleCanPlay}
            onLoadedData={handleVideoReady}
            onEnded={handleVideoEnd}
            onError={handleVideoError}
            className="
              relative
              z-10
              h-full
              w-full
              object-contain
              xl:object-cover
            "
          >
            <source
              src={videoFile}
              type="video/mp4"
            />
          </video>

          {/* =================================================
              MOBILE BACKGROUND FILL
              
              Prevents harsh empty areas when video uses
              object-contain on portrait/mobile screens.
          ================================================= */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              z-20
              bg-black/10
            "
          />

          {/* =================================================
              VIDEO OVERLAY
          ================================================= */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              z-30
              bg-black/10
            "
          />

          {/* =================================================
              LOADING
          ================================================= */}
          {!videoReady && (
            <div className="absolute inset-0 z-40 flex items-center justify-center">
              <Loading />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Video;
