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
      className="
        fixed
        inset-0
        z-50
        h-[100dvh]
        w-full
        overflow-hidden
        bg-[#fff8ed]
      "
    >
      {/* =====================================================
          MOBILE
          < 640px

          Full-screen app splash
          ===================================================== */}
      <div className="absolute inset-0 sm:hidden">
        <img
          src="/images/splash.png"
          alt="Shri Govardhannath Haveli"
          className="
            h-full
            w-full
            object-cover
            object-center
          "
        />
      </div>

      {/* =====================================================
          TABLET + DESKTOP
          >= 640px
          ===================================================== */}
      <div
        className="
          absolute
          inset-0
          hidden
          items-center
          justify-center
          overflow-hidden
          bg-[#fff8ed]

          sm:flex
        "
      >
        {/* Background blurred copy */}

        <img
          src="/images/splash.png"
          alt=""
          aria-hidden="true"
          className="
            absolute
            inset-0
            h-full
            w-full
            scale-110
            object-cover
            object-center
            opacity-[0.16]
            blur-3xl
          "
        />

        {/* Background overlay */}

        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,rgba(255,250,240,0.65)_0%,rgba(255,248,237,0.92)_65%,#fff8ed_100%)]
          "
        />

        {/* Top left decoration */}

        <div
          className="
            pointer-events-none
            absolute
            -left-24
            -top-24
            h-72
            w-72
            rounded-full
            border
            border-[#cfa657]/20

            lg:h-96
            lg:w-96
          "
        />

        {/* Bottom right decoration */}

        <div
          className="
            pointer-events-none
            absolute
            -bottom-28
            -right-28
            h-80
            w-80
            rounded-full
            border
            border-[#8f1717]/10

            lg:h-[450px]
            lg:w-[450px]
          "
        />

        {/* ===================================================
            TABLET/DESKTOP SPLASH IMAGE
            =================================================== */}

        <div
          className="
            relative
            z-10
            h-[calc(100dvh-48px)]
            max-h-[900px]
            w-auto
            overflow-hidden
            rounded-[26px]
            border
            border-[#ddc38e]/50
            bg-[#fffaf0]
            shadow-[0_20px_60px_rgba(90,52,16,0.15)]

            md:h-[calc(100dvh-64px)]

            lg:h-[calc(100dvh-80px)]
            lg:rounded-[30px]

            xl:max-h-[920px]
          "
        >
          <img
            src="/images/splash.png"
            alt="Shri Govardhannath Haveli"
            className="
              block
              h-full
              w-auto
              max-w-[90vw]
              object-contain
            "
          />
        </div>

        {/* Bottom text */}

        <div
          className="
            absolute
            bottom-3
            left-1/2
            z-10
            -translate-x-1/2
            whitespace-nowrap

            md:bottom-4
          "
        >
          <p
            className="
              m-0
              text-[9px]
              font-medium
              tracking-[0.08em]
              text-[#9b8c7d]

              lg:text-[10px]
            "
          >
            Shri Govardhannath Haveli
          </p>
        </div>
      </div>
    </main>
  );
}