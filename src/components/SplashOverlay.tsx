import { useEffect, useState } from "react";

export default function SplashOverlay() {
  const [visible, setVisible] = useState(() => {
    return !sessionStorage.getItem("buildcored-splash");
  });

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem("buildcored-splash", "1");
      }, 2300);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="splash-overlay fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center gap-6">
      <img
        src="/logo.svg"
        alt="Buildcored"
        className="splash-logo h-16 md:h-20 w-auto"
      />
      <p className="splash-tagline text-sm md:text-base text-white/40 font-light tracking-widest uppercase">
        creative engineering
      </p>
    </div>
  );
}
