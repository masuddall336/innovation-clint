import React, { useEffect, useState } from "react";

const Contat_Map = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl">
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <div
            className="h-10 w-10 rounded-full border-4 border-gray-200 border-t-[#2E3192] animate-spin"
            aria-label="Loading map"
          />
        </div>
      )}

      <iframe
        title="Innovation Plastics Can Ltd Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.2356698655108!2d90.5848889!3d23.7405278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b5f87df6e7a1%3A0xee1bf8ac272caeb2!2sInnovation%20Plastics%20Can%20Ltd!5e1!3m2!1sen!2sbd!4v1772635155170!5m2!1sen!2sbd"
        className="absolute inset-0 w-full h-full border-0"
        onLoad={() => setLoading(false)}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default Contat_Map;