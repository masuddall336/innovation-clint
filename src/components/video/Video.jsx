import { useEffect, useRef, useState } from "react";
import videoFile from "../../assets/video/IPC.mp4";
import Loading from "../loading/Loading";

export default function Video({ onComplete }) {
  const videoRef = useRef(null);
  const [buffered, setBuffered] = useState(false);
  const [minimumTimePassed, setMinimumTimePassed] = useState(false);
  const completedRef = useRef(false);
  const videoReady = buffered && minimumTimePassed;

  const finishVideo = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete();
  };

  const playVideo = () => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = 1;
    const playAttempt = video.play();
    if (playAttempt?.catch) playAttempt.catch(() => {
      video.muted = true;
      video.play().catch(() => null);
    });
  };

  useEffect(() => {
    const minimumTimer = window.setTimeout(() => setMinimumTimePassed(true), 2000);
    const fallbackTimer = window.setTimeout(finishVideo, 30000);

    return () => {
      window.clearTimeout(minimumTimer);
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  const handleBuffered = () => {
    setBuffered(true);
    playVideo();
  };

  const handleVideoError = () => {
    console.warn("Intro video could not be loaded; showing the website instead.");
    finishVideo();
  };

  return (
    <div
      className="fixed inset-0 z-[99999] h-[100dvh] w-screen overflow-hidden bg-black will-change-auto"
      role="status"
      aria-live="polite"
      aria-label={videoReady ? "Introduction video playing" : "Loading introduction video"}
    >
      {!videoReady && <Loading />}

      <video
        ref={videoRef}
        autoPlay
        muted
        defaultMuted
        playsInline
        preload="auto"
        disablePictureInPicture
        decoding="sync"
        webkit-playsinline="true"
        onLoadedData={handleBuffered}
        onCanPlay={handleBuffered}
        onCanPlayThrough={handleBuffered}
        onPlaying={() => setBuffered(true)}
        onEnded={finishVideo}
        onError={handleVideoError}
        className={`h-full w-full bg-black object-cover [backface-visibility:hidden] transition-opacity duration-500 motion-reduce:transition-none ${videoReady ? "opacity-100" : "opacity-0"}`}
      >
        <source src={videoFile} type="video/mp4" />
      </video>
    </div>
  );
}