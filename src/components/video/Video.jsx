import { useRef, useState } from "react";
import videoFile from "../../assets/video/IPC.mp4";

export default function Video({ onComplete }) {
  const videoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);

  const handleCanPlay = () => {
    const video = videoRef.current;
    if (!video) return;

    setVideoReady(true);
    video.playbackRate = 1.5;
    video.play().catch(() => {
      video.controls = true;
    });
  };

  const handleVideoError = () => {
    console.warn("Intro video could not be loaded; showing the website instead.");
    onComplete();
  };

  return (
    <div
      className="fixed inset-0 z-99999 flex h-screen w-screen items-center justify-center overflow-hidden bg-[#050b12]"
      role="status"
      aria-live="polite"
      aria-label={videoReady ? "Introduction video playing" : "Loading introduction video"}
    >
      {!videoReady && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 bg-[#07111f] text-center">
          <div className="relative h-[76px] w-[76px]">
            <span className="absolute inset-0 animate-spin rounded-full border-2 border-white/20 border-t-[#00AEEF] shadow-[0_0_24px_rgba(0,174,239,0.3)] motion-reduce:animate-none" />
            <span className="absolute inset-2 animate-[spin_2.4s_linear_infinite_reverse] rounded-full border border-white/15 motion-reduce:animate-none">
              <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-[#00AEEF] shadow-[0_0_12px_3px_rgba(0,174,239,0.8)]" />
            </span>
            <img src="/logo/IPCL_logo.png" alt="" width="40" height="40" className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 object-contain" />
          </div>
          <p className="text-sm font-medium text-white">Preparing introduction</p>
          <div className="flex gap-2" aria-hidden="true">
            {[0, 1, 2].map((dot) => (
              <span key={dot} className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00AEEF] shadow-[0_0_9px_rgba(0,174,239,0.7)]" style={{ animationDelay: `${dot * 160}ms` }} />
            ))}
          </div>
        </div>
      )}

      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        onCanPlay={handleCanPlay}
        onEnded={onComplete}
        onError={handleVideoError}
        className={`h-full w-full object-cover transition-opacity duration-300 ${videoReady ? "opacity-100" : "opacity-0"}`}
      >
        <source src={videoFile} type="video/mp4" />
      </video>
    </div>
  );
}