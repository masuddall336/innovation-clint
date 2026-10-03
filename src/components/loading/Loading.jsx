
import React from "react";
import { motion } from "framer-motion";
import logo from "../../../public/logo/IPCL_logo.png";

const Loading = () => {
  const dots = Array.from({ length: 8 });

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#050914] overflow-hidden">
      {/* Very subtle background glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,174,239,0.055),transparent_45%)]" />

      {/* Loader */}
      <div className="relative flex flex-col items-center justify-center">
        {/* Circular loader */}
        <div className="relative flex h-32 w-32 items-center justify-center">
          {/* Soft outer glow */}
          <motion.div
            animate={{
              scale: [0.95, 1.08, 0.95],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              inset-2
              rounded-full
              bg-[#00AEEF]/10
              blur-xl
            "
          />

          {/* Outer circle */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              absolute
              inset-1
              rounded-full
              border
              border-[#00AEEF]/20
            "
          />

          {/* Moving glowing ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              absolute
              inset-1
              rounded-full
              border-2
              border-transparent
              border-t-[#00AEEF]
              border-r-[#00AEEF]/30
              shadow-[0_0_14px_rgba(0,174,239,0.7)]
            "
          />

          {/* Dots */}
          {dots.map((_, index) => {
            const angle = index * 45;

            return (
              <motion.span
                key={index}
                className="
                  absolute
                  left-1/2
                  top-1/2
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#00AEEF]
                "
                style={{
                  transform: `rotate(${angle}deg) translateY(-58px)`,
                  transformOrigin: "0 58px",
                }}
                animate={{
                  opacity: [0.15, 1, 0.15],
                  scale: [0.7, 1.25, 0.7],
                  boxShadow: [
                    "0 0 0px rgba(0,174,239,0)",
                    "0 0 9px rgba(0,174,239,0.9)",
                    "0 0 0px rgba(0,174,239,0)",
                  ],
                }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  delay: index * 0.12,
                  ease: "easeInOut",
                }}
              />
            );
          })}

          {/* Logo center */}
          <motion.div
            animate={{
              opacity: [0.88, 1, 0.88],
              scale: [0.97, 1, 0.97],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              relative
              z-10
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-full
              bg-[#050914]
            "
          >
            <img
              src={logo}
              alt="Innovation Plastic Cans"
              className="
                h-12
                w-auto
                max-w-[64px]
                object-contain
                select-none
              "
            />
          </motion.div>
        </div>

        {/* Minimal loading dots */}
        <div className="mt-7 flex items-center gap-1.5">
          {[0, 1, 2].map((index) => (
            <motion.span
              key={index}
              className="h-1.5 w-1.5 rounded-full bg-[#00AEEF]"
              animate={{
                opacity: [0.25, 1, 0.25],
                scale: [0.75, 1.15, 0.75],
                boxShadow: [
                  "0 0 0px rgba(0,174,239,0)",
                  "0 0 7px rgba(0,174,239,0.8)",
                  "0 0 0px rgba(0,174,239,0)",
                ],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.18,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;