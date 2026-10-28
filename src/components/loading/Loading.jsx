
"use client";

import { useEffect } from "react";

let openLoaderCount = 0;
let previousBodyOverflow = "";
let previousHtmlOverflow = "";

const Loading = () => {
  useEffect(() => {
    if (openLoaderCount === 0) {
      previousBodyOverflow = document.body.style.overflow;
      previousHtmlOverflow = document.documentElement.style.overflow;

      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    }

    openLoaderCount += 1;

    return () => {
      openLoaderCount = Math.max(0, openLoaderCount - 1);

      if (openLoaderCount === 0) {
        document.body.style.overflow = previousBodyOverflow;
        document.documentElement.style.overflow =
          previousHtmlOverflow;
      }
    };
  }, []);

  return (
    <div
      className="site-loader"
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <style>{`
        .site-loader {
          position: fixed;
          inset: 0;
          z-index: 99998;
          display: grid;
          place-items: center;
          min-height: 100vh;
          min-height: 100dvh;
          overflow: hidden;
          background: radial-gradient(circle at center, #17304a 0%, #0b1d32 58%, #061424 100%);
          animation: site-loader-enter 0.25s ease-out both;
        }

        .site-loader__content {
          position: relative;
          width: 150px;
          height: 150px;
          display: grid;
          place-items: center;
        }

        .site-loader__orbit {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          animation: site-loader-spin 1.8s linear infinite;
        }

        .site-loader__dot {
          --dot-size: 5px;
          position: absolute;
          top: 50%;
          left: 50%;
          width: var(--dot-size);
          height: var(--dot-size);
          margin: calc(var(--dot-size) / -2);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.24);
          transform: rotate(var(--dot-angle)) translateX(68px);
        }

        .site-loader__dot:nth-child(3n + 1) {
          background: rgba(255, 255, 255, 0.92);
          box-shadow: 0 0 7px rgba(255, 255, 255, 0.65);
        }

        .site-loader__dot:nth-child(3n + 2) {
          background: #00AEEF;
          box-shadow: 0 0 8px rgba(0, 174, 239, 0.8);
        }

        .site-loader__dot:nth-child(12) {
          width: 7px;
          height: 7px;
          margin: -3.5px;
          background: #00A651;
          box-shadow: 0 0 9px rgba(0, 166, 81, 0.75);
        }

        .site-loader__logo-wrap {
          position: relative;
          width: 88px;
          height: 88px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.94);
          box-shadow: 0 8px 28px rgba(46, 49, 146, 0.08);
        }

        .site-loader__logo {
          display: block;
          width: 72px;
          height: 72px;
          object-fit: contain;
          filter: drop-shadow(0 3px 7px rgba(46, 49, 146, 0.09));
        }

        @keyframes site-loader-enter {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes site-loader-spin {
          to {
            transform: rotate(360deg);
          }
        }

        @media (max-width: 640px) {
          .site-loader__content {
            width: 132px;
            height: 132px;
          }

          .site-loader__dot {
            transform: rotate(var(--dot-angle)) translateX(58px);
          }

          .site-loader__logo-wrap {
            width: 78px;
            height: 78px;
          }

          .site-loader__logo {
            width: 64px;
            height: 64px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .site-loader,
          .site-loader__orbit {
            animation-duration: 2.8s;
          }
        }
      `}</style>

      <div className="site-loader__content">
        <span className="site-loader__orbit" aria-hidden="true">
          <i className="site-loader__dot" style={{ "--dot-angle": "0deg" }} />
          <i className="site-loader__dot" style={{ "--dot-angle": "30deg" }} />
          <i className="site-loader__dot" style={{ "--dot-angle": "60deg" }} />
          <i className="site-loader__dot" style={{ "--dot-angle": "90deg" }} />
          <i className="site-loader__dot" style={{ "--dot-angle": "120deg" }} />
          <i className="site-loader__dot" style={{ "--dot-angle": "150deg" }} />
          <i className="site-loader__dot" style={{ "--dot-angle": "180deg" }} />
          <i className="site-loader__dot" style={{ "--dot-angle": "210deg" }} />
          <i className="site-loader__dot" style={{ "--dot-angle": "240deg" }} />
          <i className="site-loader__dot" style={{ "--dot-angle": "270deg" }} />
          <i className="site-loader__dot" style={{ "--dot-angle": "300deg" }} />
          <i className="site-loader__dot" style={{ "--dot-angle": "330deg" }} />
        </span>
        <div className="site-loader__logo-wrap">
          <img
            className="site-loader__logo"
            src="/logo/IPCL_logo.png"
            alt="IPCL"
            draggable="false"
          />
        </div>
      </div>

      <span className="sr-only">Please wait, loading...</span>
    </div>
  );
};

export default Loading;
