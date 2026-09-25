"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/onboarding");
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100dvh",
        overflow: "hidden",
        background: "#000",
        zIndex: 9999,
      }}
    >
      {/* =====================================================
          MOBILE
          < 640px
          ===================================================== */}

      <div
        className="sm:hidden"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <img
          src="/images/splash-mobile.png"
          alt="Shri Govardhannath Haveli"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            maxWidth: "none",
            objectFit: "cover",
            objectPosition: "center center",
            display: "block",
          }}
        />
      </div>

      {/* =====================================================
          TABLET
          640px - 1023px
          ===================================================== */}

      <div
        className="hidden sm:block lg:hidden"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <img
          src="/images/splash-tablet.png"
          alt="Shri Govardhannath Haveli"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            maxWidth: "none",
            objectFit: "cover",
            objectPosition: "center center",
            display: "block",
          }}
        />
      </div>

      {/* =====================================================
          DESKTOP
          >= 1024px
          ===================================================== */}

      <div
        className="hidden lg:block"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <img
          src="/images/splash-desktop.png"
          alt="Shri Govardhannath Haveli"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            maxWidth: "none",
            objectFit: "cover",
            objectPosition: "center center",
            display: "block",
          }}
        />
      </div>
    </main>
  );
}
