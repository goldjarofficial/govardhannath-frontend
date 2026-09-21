"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useLanguage } from "../../lib/LanguageProvider";
import type { TranslationKey } from "../../lib/i18n";
import HomeHeader from "@/app/components/Header";

/* =========================================================
   ACTIONS
   ========================================================= */

const actions = [
  ["headset", "Live", "Darshan"],
  ["seva", "Seva &", "Donation"],
  ["cow", "Go Seva", ""],
  ["clock", "Darshan", "Timings"],
  ["gift", "Events &", "Utsav"],
  ["play", "Reels &", "Bhakti"],
  ["food", "Prasadam", ""],
  ["grid", "More", ""],
] as const;

const actionLabels: Record<string, [TranslationKey, TranslationKey?]> = {
  Live: ["liveDarshan", "darshan"],
  "Seva &": ["seva", "donation"],
  "Go Seva": ["goSeva"],
  Darshan: ["darshan", "darshanTimings"],
  "Events &": ["events"],
  "Reels &": ["reelsBhakti"],
  Prasadam: ["prasadam"],
  More: ["more"],
};

const actionRoutes: Record<string, string> = {
  Live: "/live-darshan",
  "Seva &": "/seva-donation",
  "Go Seva": "/seva/go-seva",
  Darshan: "/darshan-timings",
  "Events &": "/events",
  "Reels &": "/reels",
  Prasadam: "/prasadam",
};

/* =========================================================
   ICONS
   ========================================================= */

function Icon({ name }: { name: string }) {
  const common = {
    width: 25,
    height: 25,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "headset":
      return (
        <svg {...common}>
          <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
          <path d="M4 13h3v6H5a1 1 0 0 1-1-1z" />
          <path d="M20 13h-3v6h2a1 1 0 0 1 1-1z" />
        </svg>
      );

    case "seva":
      return (
        <svg {...common}>
          <path d="M5 12h14l-2 7H7z" />
          <path d="M8 12c0-3 2-5 4-5s4 2 4 5" />
        </svg>
      );

    case "cow":
      return (
        <svg {...common}>
          <path d="M5 10c0-3 2-5 7-5s7 2 7 5v6c0 2-2 3-7 3s-7-1-7-3z" />
          <path d="M5 11 3 9M19 11l2-2" />
          <circle cx="9" cy="11" r=".7" fill="currentColor" />
          <circle cx="15" cy="11" r=".7" fill="currentColor" />
        </svg>
      );

    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7v5l3 2" />
        </svg>
      );

    case "gift":
      return (
        <svg {...common}>
          <rect x="4" y="9" width="16" height="11" rx="1" />
          <path d="M12 9v11M3 9h18v4H3z" />
        </svg>
      );

    case "play":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="m10 8 6 4-6 4z" />
        </svg>
      );

    case "food":
      return (
        <svg {...common}>
          <path d="M4 13h16" />
          <path d="M6 13c0 4 2 6 6 6s6-2 6-6" />
          <path d="M8 9c1-3 7-3 8 0" />
        </svg>
      );

    default:
      return (
        <svg {...common}>
          <rect x="4" y="4" width="5" height="5" rx="1" />
          <rect x="15" y="4" width="5" height="5" rx="1" />
          <rect x="4" y="15" width="5" height="5" rx="1" />
          <rect x="15" y="15" width="5" height="5" rx="1" />
        </svg>
      );
  }
}

/* =========================================================
   DASHBOARD
   ========================================================= */

export default function Dashboard() {
  const router = useRouter();
  const { t } = useLanguage();

  type ProfileData = {
  name: string;
  phone: string;
  email: string;
  city: string;
  image: string;
};
 const [profileName, setProfileName] =
    useState("");
  /* =========================================================
   REAL-TIME DARSHAN COUNTDOWN
========================================================= */

  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    // Client side par actual current time set karo
    setCurrentTime(new Date());

    // Har second update
    const timer = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  /* =========================================================
   RAJBHOG TIME
   12:15 PM = 12:15
========================================================= */

  const RAJBHOG_HOUR = 12;
  const RAJBHOG_MINUTE = 15;

  const getRajbhogCountdown = () => {
    if (!currentTime) {
      return "--:--:--";
    }

    const target = new Date(currentTime);

    target.setHours(RAJBHOG_HOUR, RAJBHOG_MINUTE, 0, 0);

    /*
    Agar aaj ka Rajbhog time nikal gaya,
    to next day's Rajbhog target karega.
  */

    if (target.getTime() <= currentTime.getTime()) {
      target.setDate(target.getDate() + 1);
    }

    const difference = target.getTime() - currentTime.getTime();

    const totalSeconds = Math.floor(difference / 1000);

    const hours = Math.floor(totalSeconds / 3600);

    const minutes = Math.floor((totalSeconds % 3600) / 60);

    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0",
    )}:${String(seconds).padStart(2, "0")}`;
  };

  const rajbhogCountdown = getRajbhogCountdown();

  const handleAction = (title: string) => {
    const route = actionRoutes[title];

    if (route) {
      router.push(route);
    }
  };

  return (
    <main
      className="
        min-h-[100dvh]
        w-full
        overflow-x-hidden
        bg-[#fffaf0]
        text-[#40372f]

        px-3
        pb-[84px]
        pt-2

        sm:px-4
        sm:pt-3

        md:px-6
        md:pt-4

        lg:ml-[92px]
        lg:w-[calc(100%-92px)]
        lg:px-8
        lg:pb-10
        lg:pt-5

        xl:px-10

        2xl:px-12
      "
    >
      {/* =====================================================
          CONTENT WRAPPER
          Mobile = compact
          Desktop = full website
          ===================================================== */}

      <div className="mx-auto w-full max-w-[1800px]">
        {/* ===================================================
            HEADER
            =================================================== */}

        <HomeHeader />

        {/* ===================================================
            LIVE DARSHAN BANNER
            =================================================== */}

        <button
          type="button"
          onClick={() => router.push("/live-darshan")}
          className="
            relative
            mt-2
            block
            h-[170px]
            w-full
            overflow-hidden
            rounded-[13px]
            border-0
            bg-[#e8d8bc]
            p-0
            text-left
            shadow-[0_5px_18px_rgba(86,47,20,0.08)]

            sm:h-[220px]
            sm:rounded-2xl

            md:h-[300px]

            lg:mt-5
            lg:h-[clamp(330px,35vw,510px)]
            lg:rounded-[20px]
          "
        >
          <img
            src="/images/haveli.jpg"
            alt="Shri Govardhannath Haveli"
            className="
              block
              h-full
              w-full
              object-cover
            "
          />

          <div
            className="
              absolute
              inset-x-0
              bottom-0
              flex
              min-h-[50px]
              items-end
              justify-between
              gap-3
              bg-[linear-gradient(to_bottom,transparent_0%,rgba(70,15,12,0.40)_25%,rgba(132,19,19,0.96)_100%)]
              px-3
              pb-2.5
              pt-6
              text-white

              lg:min-h-[90px]
              lg:px-6
              lg:pb-5
              lg:pt-10
            "
          >
            <strong
              className="
                text-[13px]

                sm:text-[15px]

                lg:text-xl
              "
            >
              🙏 {t("liveDarshanNow")}
            </strong>

            <span
              className="
                shrink-0
                rounded-md
                bg-[#b51212]
                px-2
                py-1
                text-[9px]
                font-bold

                sm:text-[10px]

                lg:px-3
                lg:py-1.5
                lg:text-xs
              "
            >
              • {t("live")}
            </span>
          </div>
        </button>

        {/* ===================================================
            NEXT DARSHAN
            =================================================== */}

        <section
          className="
            mt-3
            flex
            min-h-[105px]
            w-full
            items-center
            justify-between
            gap-2
            rounded-xl
            border
            border-[#eadbc5]
            bg-[#fffdf8]
            px-3
            py-3

            sm:gap-4
            sm:px-4

            md:px-5
            md:py-4

            lg:mt-4
            lg:min-h-[135px]
            lg:px-6
            lg:py-5
          "
        >
          {/* LEFT */}

          <div className="min-w-0 flex-1">
            <h2
              className="
                m-0
                mb-2
                font-serif
                text-base
                font-bold

                sm:text-lg

                lg:text-[22px]
              "
            >
              {t("nextDarshan")}
            </h2>

            <div className="flex items-center gap-2">
              <div
                className="
                  grid
                  h-10
                  w-10
                  shrink-0
                  place-items-center
                  text-[25px]

                  sm:h-12
                  sm:w-12
                  sm:text-[28px]

                  lg:h-14
                  lg:w-14
                  lg:text-[34px]
                "
              >
                🛕
              </div>

              <div className="min-w-0">
                <strong
                  className="
                    block
                    truncate
                    text-[11px]

                    sm:text-xs

                    lg:text-sm
                  "
                >
                  {t("rajbhog")}
                </strong>

                <span
                  className="
                    mt-1
                    block
                    text-[9px]
                    text-[#81766d]

                    sm:text-[10px]

                    lg:text-xs
                  "
                >
                  {t("today")}
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div
            className="
              w-[125px]
              shrink-0
              text-right

              sm:w-[150px]

              md:w-[190px]

              lg:w-[240px]
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
                gap-2
                text-[9px]

                sm:text-[10px]

                lg:text-xs
              "
            >
              <strong>{t("rajbhog")}</strong>

              <span>
                {currentTime
                  ? currentTime.toLocaleTimeString("en-IN", {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: true,
                    })
                  : "--:--:--"}
              </span>
            </div>

            <div
              className="
                my-1.5
                ml-auto
                w-fit
                rounded
                bg-[#dff0df]
                px-2.5
                py-1
                text-[12px]
                font-bold
                tracking-wide
                text-[#47784e]

                sm:text-[13px]

                lg:my-2
                lg:px-3
                lg:py-1.5
                lg:text-base
              "
            >
              {rajbhogCountdown}
            </div>

            <button
              type="button"
              onClick={() => router.push("/darshan-timings")}
              className="
                border-0
                bg-transparent
                p-0
                text-[9px]
                font-semibold
                text-[#a71919]

                hover:underline

                sm:text-[10px]

                lg:text-xs
              "
            >
              {t("viewSchedule")} ›
            </button>
          </div>
        </section>

        {/* ===================================================
            ACTION CARDS
            =================================================== */}

        <section
          className="
            mt-3
            grid
            w-full
            grid-cols-4
            gap-2

            sm:gap-3

            md:gap-3.5

            lg:mt-5
            lg:gap-4

            xl:gap-5
          "
        >
          {actions.map(([icon, title]) => {
            const labels = actionLabels[title];
            const route = actionRoutes[title];

            return (
              <button
                key={title}
                type="button"
                disabled={!route}
                onClick={() => handleAction(title)}
                className="
                  group
                  flex
                  h-[78px]
                  min-w-0
                  flex-col
                  items-center
                  justify-center
                  rounded-[10px]
                  border
                  border-[#efdfc9]
                  bg-[#fffdf9]
                  px-1
                  py-2
                  text-[#a71919]
                  shadow-[0_2px_8px_rgba(100,60,10,0.04)]
                  transition-all
                  duration-200

                  active:scale-[0.97]

                  sm:h-[90px]

                  md:h-[100px]

                  lg:h-[120px]
                  lg:rounded-[14px]

                  lg:hover:-translate-y-1
                  lg:hover:border-[#d7b879]
                  lg:hover:shadow-[0_10px_25px_rgba(90,50,20,0.10)]

                  xl:h-[128px]
                "
              >
                <span
                  className="
                    grid
                    h-7
                    place-items-center

                    [&>svg]:h-[22px]
                    [&>svg]:w-[22px]

                    sm:[&>svg]:h-6
                    sm:[&>svg]:w-6

                    lg:h-9
                    lg:[&>svg]:h-[30px]
                    lg:[&>svg]:w-[30px]
                  "
                >
                  <Icon name={icon} />
                </span>

                <span
                  className="
                    mt-1.5
                    min-w-0
                    text-center
                    text-[9px]
                    leading-[1.2]
                    text-[#4d453e]

                    sm:text-[10px]

                    md:text-[11px]

                    lg:mt-2
                    lg:text-xs
                  "
                >
                  <strong className="block font-semibold">
                    {t(labels[0])}
                  </strong>

                  {labels[1] && (
                    <strong className="block font-semibold">
                      {t(labels[1])}
                    </strong>
                  )}
                </span>
              </button>
            );
          })}
        </section>

        {/* ===================================================
            DECORATION
            =================================================== */}

        <div
          className="
            flex
            h-12
            items-center
            justify-center
            overflow-hidden
            text-[24px]
            tracking-[6px]
            text-[#c99435]
            opacity-30

            lg:h-16
            lg:text-[30px]
          "
        >
          ❧ ❧ ❧ ❧ ❧
        </div>
      </div>
    </main>
  );
}
