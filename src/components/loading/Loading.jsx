
import React from "react";
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-[#050914]">
      {/* Soft Ambient Glow */}
      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.12, 0.2, 0.12],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          h-[280px]
          w-[280px]
          rounded-full
          bg-[#00AEEF]/20
          blur-[100px]
        "
      />

      {/* Subtle Background Gradient */}
      <div
        className="
          pointer-events-none
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,rgba(0,174,239,0.055),transparent_45%)]
        "
      />

      {/* Main Loader */}
      <div className="relative flex w-full flex-col items-center px-6">
        {/* Minimal Logo Mark */}
        <div className="relative flex h-28 w-28 items-center justify-center">
          {/* Outer Soft Ring */}
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              absolute
              inset-0
              rounded-full
              border
              border-white/[0.08]
              border-t-[#00AEEF]/80
            "
          />

          {/* Inner Ring */}
          <motion.div
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              absolute
              inset-3
              rounded-full
              border
              border-transparent
              border-b-[#94459A]/60
            "
          />

          {/* Center */}
          <motion.div
            animate={{
              scale: [1, 1.035, 1],
              boxShadow: [
                "0 0 20px rgba(0,174,239,0.08)",
                "0 0 35px rgba(0,174,239,0.18)",
                "0 0 20px rgba(0,174,239,0.08)",
              ],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              relative
              flex
              h-[76px]
              w-[76px]
              items-center
              justify-center
              rounded-full
              border
              border-white/[0.10]
              bg-white/[0.035]
              backdrop-blur-xl
            "
          >
            <span
              className="
                select-none
                text-xl
                font-black
                tracking-[0.16em]
                text-white
              "
            >
              IPC
            </span>

            {/* Small Status Dot */}
            <motion.span
              animate={{
                opacity: [0.35, 1, 0.35],
                scale: [0.85, 1, 0.85],
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                right-[13px]
                top-[13px]
                h-1.5
                w-1.5
                rounded-full
                bg-[#00AEEF]
                shadow-[0_0_8px_#00AEEF]
              "
            />
          </motion.div>
        </div>

        {/* Company Information */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-6 text-center"
        >
          <h2 className="text-base font-semibold tracking-[0.28em] text-white">
            IPC
          </h2>

          <p className="mt-2 text-[8px] font-medium uppercase tracking-[0.32em] text-white/40">
            Intelligent Protection & Control
          </p>
        </motion.div>

        {/* Smart Loading Status */}
        <div className="mt-7 w-48">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[8px] uppercase tracking-[0.22em] text-white/30">
              System
            </span>

            <motion.span
              animate={{ opacity: [0.45, 1, 0.45] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                text-[8px]
                font-medium
                uppercase
                tracking-[0.2em]
                text-[#00AEEF]/80
              "
            >
              Loading
            </motion.span>
          </div>

          {/* Progress Track */}
          <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-white/[0.08]">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{
                duration: 1.7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                left-0
                top-0
                h-full
                w-1/2
                rounded-full
                bg-gradient-to-r
                from-transparent
                via-[#00AEEF]
                to-transparent
                shadow-[0_0_8px_rgba(0,174,239,0.7)]
              "
            />
          </div>
        </div>

        {/* Small Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-5 flex items-center gap-2"
        >
          <motion.span
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
            }}
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-[#00AEEF]
            "
          />

          <span className="text-[7px] uppercase tracking-[0.28em] text-white/25">
            Initializing System
          </span>
        </motion.div>
      </div>

      {/* Bottom Branding */}
      <div
        className="
          absolute
          bottom-6
          left-0
          right-0
          flex
          justify-center
          text-[7px]
          uppercase
          tracking-[0.3em]
          text-white/[0.18]
        "
      >
        IPC // Secure Environment
      </div>
    </div>
  );
};

export default Loading;