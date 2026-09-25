
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import videoFile from "../../assets/video/IPC.mp4";

const Video = () => {
  const videoRef = useRef(null);
  const fallbackTimerRef = useRef(null);
  const mountedRef = useRef(false);

  const [showVideo, setShowVideo] = useState(true);
  const [videoReady, setVideoReady] = useState(false);

  // =========================================================
  // CLOSE VIDEO
  // =========================================================
  const closeVideo = () => {
    if (!mountedRef.current) return;

    setShowVideo(false);

    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }

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

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      mountedRef.current = false;

      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current);
        fallbackTimerRef.current = null;
      }

      document.body.style.overflow = previousOverflow;
    };
  }, []);

  // =========================================================
  // SAFETY FALLBACK
  // Don't allow intro to hang on slow devices
  // =========================================================
  useEffect(() => {
    if (!showVideo) return;

    // 7 seconds is enough for an intro video.
    fallbackTimerRef.current = setTimeout(() => {
      if (!mountedRef.current) return;

      console.warn("Intro video timeout.");
      closeVideo();
    }, 7000);

    return () => {
      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current);
        fallbackTimerRef.current = null;
      }
    };
  }, [showVideo]);

  // =========================================================
  // VIDEO READY
  // =========================================================
  const handleVideoReady = () => {
    if (!mountedRef.current) return;

    setVideoReady(true);

    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
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

    handleVideoReady();

    const video = videoRef.current;

    if (!video) return;

    // Do not force play().
    // autoPlay + muted + playsInline are enough.
    if (video.paused) {
      video.play().catch(() => {
        // If autoplay is blocked, simply skip the intro.
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
              LIGHTWEIGHT BACKGROUND
          ================================================= */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-br
              from-[#07111f]
              via-[#172A8A]
              to-[#94459A]
            "
          />

          {/* Simple glow - no huge blur animation */}
          <div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              h-[220px]
              w-[220px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-[#00AEEF]/20
              blur-[60px]
            "
          />

          {/* =================================================
              VIDEO
          ================================================= */}

          <motion.video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            preload="metadata"
            onCanPlay={handleCanPlay}
            onLoadedData={handleVideoReady}
            onEnded={handleVideoEnd}
            onError={handleVideoError}
            initial={{
              opacity: 0,
              scale: 1.02,
            }}
            animate={{
              opacity: videoReady ? 1 : 0,
              scale: videoReady ? 1 : 1.02,
            }}
            transition={{
              duration: 0.35,
              ease: "easeOut",
            }}
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
            "
          >
            <source src={videoFile} type="video/mp4" />
          </motion.video>

          {/* =================================================
              VIDEO OVERLAY
          ================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-black/15
            "
          />

          {/* =================================================
              LIGHTWEIGHT LOADING UI
          ================================================= */}

          <AnimatePresence>
            {!videoReady && (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.96,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.96,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="
                  relative
                  z-10
                  flex
                  flex-col
                  items-center
                "
              >
                {/* Brand Box */}

                <div
                  className="
                    relative
                    mb-5
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-white/15
                    bg-white/10
                    shadow-xl
                    backdrop-blur-sm
                  "
                >
                  <div
                    className="
                      h-9
                      w-9
                      rounded-xl
                      bg-gradient-to-br
                      from-[#00AEEF]
                      via-[#94459A]
                      to-[#172A8A]
                    "
                  />
                </div>

                {/* CSS LOADER */}

                <div
                  className="
                    mb-3
                    flex
                    items-center
                    gap-1.5
                  "
                >
                  <span className="video-dot" />
                  <span
                    className="video-dot"
                    style={{ animationDelay: "0.15s" }}
                  />
                  <span
                    className="video-dot"
                    style={{ animationDelay: "0.3s" }}
                  />
                </div>

                <p
                  className="
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-[0.35em]
                    text-white/70
                  "
                >
                  Loading
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* =================================================
              BOTTOM PROGRESS
          ================================================= */}

          {!videoReady && (
            <div
              className="
                absolute
                bottom-0
                left-0
                h-[2px]
                w-full
                overflow-hidden
                bg-white/10
              "
            >
              <div
                className="
                  video-progress
                  h-full
                  w-1/3
                  bg-gradient-to-r
                  from-[#00AEEF]
                  via-[#94459A]
                  to-[#172A8A]
                "
              />
            </div>
          )}

          {/* =================================================
              SMALL INLINE STYLE
          ================================================= */}

          <style>{`
            .video-dot {
              display: block;
              width: 7px;
              height: 7px;
              border-radius: 9999px;
              background: white;
              opacity: 0.35;
              animation: videoDot 0.8s ease-in-out infinite;
              will-change: transform, opacity;
            }

            @keyframes videoDot {
              0%,
              100% {
                transform: translateY(0) scale(0.85);
                opacity: 0.35;
              }

              50% {
                transform: translateY(-5px) scale(1);
                opacity: 1;
              }
            }

            .video-progress {
              animation: videoProgress 1.2s ease-in-out infinite;
              will-change: transform;
            }

            @keyframes videoProgress {
              0% {
                transform: translateX(-120%);
              }

              100% {
                transform: translateX(350%);
              }
            }

            @media (prefers-reduced-motion: reduce) {
              .video-dot,
              .video-progress {
                animation: none !important;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Video;