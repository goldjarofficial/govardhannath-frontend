"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../lib/LanguageProvider";

type ProfileData = {
  name: string;
  phone: string;
  email: string;
  city: string;
  image: string;
};

const PROFILE_STORAGE_KEY = "profile-data";

export default function HomeHeader() {
  const router = useRouter();
  const { t } = useLanguage();

  const [profileName, setProfileName] = useState("");

  // =========================================
  // LOAD PROFILE NAME
  // =========================================

  useEffect(() => {
    const loadProfile = () => {
      try {
        const storedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);

        if (!storedProfile) {
          return;
        }

        const parsedProfile = JSON.parse(storedProfile) as Partial<ProfileData>;

        if (parsedProfile.name?.trim()) {
          setProfileName(parsedProfile.name.trim());
        }
      } catch (error) {
        console.error("Failed to load profile:", error);
      }
    };

    // Load initially
    loadProfile();

    // Update immediately when profile changes
    window.addEventListener("profile-updated", loadProfile);

    return () => {
      window.removeEventListener("profile-updated", loadProfile);
    };
  }, []);

  return (
    <header
      className="
        flex
        min-h-[58px]
        items-center
        justify-between
        gap-3

        sm:min-h-[64px]

        lg:min-h-[76px]
        lg:border-b
        lg:border-[#eadfce]
      "
    >
      {/* =========================================
          LEFT - TEMPLE + WELCOME
      ========================================= */}

      <div className="flex min-w-0 items-center gap-2.5">
        {/* Temple Logo */}

        <div
          className="
            grid
            h-10
            w-10
            shrink-0
            place-items-center
            rounded-full
            border
            border-[#e2c990]
            bg-[#fffdf8]
            text-xl

            sm:h-11
            sm:w-11
            sm:text-[22px]

            lg:h-[50px]
            lg:w-[50px]
            lg:text-2xl
          "
        >
          🛕
        </div>

        {/* Welcome Text */}

        <div className="min-w-0">
          <p
            className="
              m-0
              truncate
              text-[10px]
              font-semibold
              text-[#756a60]

              sm:text-[11px]

              lg:text-xs
            "
          >
            🙏 {t("jaiShreeKrishna")}
          </p>

          <h1
            className="
              m-0
              mt-[2px]
              truncate
              font-serif
              text-[15px]
              font-bold
              text-[#302923]

              sm:text-base

              lg:text-xl
            "
          >
            {profileName}
          </h1>
        </div>
      </div>

      {/* =========================================
          RIGHT SIDE
      ========================================= */}

      <div className="flex shrink-0 items-center gap-2">
        {/* =========================
            NOTIFICATION
        ========================= */}

        <button
          type="button"
          onClick={() => router.push("/notifications")}
          aria-label={t("notifications")}
          className="
            relative
            grid
            h-9
            w-9
            shrink-0
            place-items-center
            rounded-full
            border
            border-[#eadbc5]
            bg-[#fffdf8]
            text-lg
            text-[#a71919]
            transition

            hover:bg-[#fff3df]
            active:scale-95

            lg:h-11
            lg:w-11
            lg:text-xl
          "
        >
          ♧{/* Notification Dot */}
          <span
            className="
              absolute
              right-[6px]
              top-[6px]
              h-[6px]
              w-[6px]
              rounded-full
              bg-[#d4871f]
            "
          />
        </button>

        {/* =========================
            CART
        ========================= */}

        <button
          type="button"
          onClick={() => router.push("/prasadam/cart")}
          aria-label="Open Cart"
          className="
            grid
            h-9
            w-9
            shrink-0
            place-items-center
            rounded-full
            border
            border-[#eadbc5]
            bg-[#fffdf8]
            text-[#a71919]
            transition

            hover:bg-[#fff3df]
            active:scale-95

            lg:h-11
            lg:w-11
          "
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="h-5 w-5"
          >
            <circle cx="9" cy="20" r="1" />
            <circle cx="18" cy="20" r="1" />

            <path d="M3 4h2l2.4 10.4a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 8H6" />
          </svg>
        </button>
      </div>
    </header>
  );
}
