import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const CIRCLE_LENGTH = 2 * Math.PI * 20;

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frameId = null;

    const updateProgress = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;

      setProgress(
        scrollableHeight > 0
          ? Math.min((scrollPosition / scrollableHeight) * 100, 100)
          : 0
      );
      setIsVisible(scrollPosition > 160);
    };

    const handleScroll = () => {
      if (frameId !== null) return;

      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        updateProgress();
      });
    };

    updateProgress();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "instant" })}
      aria-label={`Scroll to top, ${Math.round(progress)}% down the page`}
      title="Scroll to top"
      tabIndex={isVisible ? 0 : -1}
      className={`fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-[#07111f] text-[#2E3192] hover:text-[#fff] shadow-[0_8px_28px_rgba(0,0,0,0.35)] transition-all duration-200 hover:scale-105 hover:bg-[#2E3192] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2E3192] sm:bottom-7 sm:right-7 sm:h-14 sm:w-14 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <svg
        className="absolute inset-0 h-full w-full -rotate-90"
        viewBox="0 0 48 48"
        aria-hidden="true"
      >
        <circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="2"
        />
        <circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          stroke="#00AEEF"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={CIRCLE_LENGTH}
          strokeDashoffset={CIRCLE_LENGTH * (1 - progress / 100)}
          className="transition-[stroke-dashoffset] duration-150"
        />
      </svg>
      <ArrowUp size={19} strokeWidth={2.4} aria-hidden="true" />
    </button>
  );
};

export default ScrollProgress;