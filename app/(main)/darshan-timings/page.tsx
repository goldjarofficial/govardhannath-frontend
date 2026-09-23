"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useLanguage } from "../../lib/LanguageProvider";
import type { TranslationKey } from "../../lib/i18n";
import HomeHeader from "@/app/components/Header";

/* =========================================================
   TYPES
========================================================= */

type DarshanStatus =
  | "completed"
  | "openNow"
  | "upcoming";

type DarshanItem = {
  nameKey: TranslationKey;
  time: string;
  hour: number;
  minute: number;
  image: string;
};

/* =========================================================
   DARSHAN DATA
========================================================= */

const DARSHANS: DarshanItem[] = [
  {
    nameKey: "mangala",
    time: "05:30 AM",
    hour: 5,
    minute: 30,
    image: "/images/mangala.jpg",
  },
  {
    nameKey: "shringar",
    time: "07:30 AM",
    hour: 7,
    minute: 30,
    image: "/images/mangala.jpg",
  },
  {
    nameKey: "gwal",
    time: "09:00 AM",
    hour: 9,
    minute: 0,
    image: "/images/mangala.jpg",
  },
  {
    nameKey: "rajbhog",
    time: "12:15 PM",
    hour: 12,
    minute: 15,
    image: "/images/mangala.jpg",
  },
  {
    nameKey: "utthapan",
    time: "04:00 PM",
    hour: 16,
    minute: 0,
    image: "/images/mangala.jpg",
  },
  {
    nameKey: "bhog",
    time: "06:00 PM",
    hour: 18,
    minute: 0,
    image: "/images/mangala.jpg",
  },
  {
    nameKey: "sandhyaAarti",
    time: "07:30 PM",
    hour: 19,
    minute: 30,
    image: "/images/mangala.jpg",
  },
  {
    nameKey: "shayan",
    time: "09:00 PM",
    hour: 21,
    minute: 0,
    image: "/images/mangala.jpg",
  },
];

/* =========================================================
   HELPERS
========================================================= */

function getMinutes(hour: number, minute: number) {
  return hour * 60 + minute;
}

function getStatus(
  index: number,
  currentTime: Date | null,
): DarshanStatus {
  if (!currentTime) {
    return "upcoming";
  }

  const currentMinutes =
    currentTime.getHours() * 60 +
    currentTime.getMinutes();

  const currentDarshan = DARSHANS[index];

  const currentDarshanMinutes = getMinutes(
    currentDarshan.hour,
    currentDarshan.minute,
  );

  const nextDarshan = DARSHANS[index + 1];

  if (currentMinutes < currentDarshanMinutes) {
    return "upcoming";
  }

  if (!nextDarshan) {
    return "openNow";
  }

  const nextDarshanMinutes = getMinutes(
    nextDarshan.hour,
    nextDarshan.minute,
  );

  if (
    currentMinutes >= currentDarshanMinutes &&
    currentMinutes < nextDarshanMinutes
  ) {
    return "openNow";
  }

  return "completed";
}

function getCurrentDarshan(
  currentTime: Date | null,
): DarshanItem | null {
  if (!currentTime) {
    return null;
  }

  const currentMinutes =
    currentTime.getHours() * 60 +
    currentTime.getMinutes();

  for (let i = DARSHANS.length - 1; i >= 0; i--) {
    const darshan = DARSHANS[i];

    const darshanMinutes = getMinutes(
      darshan.hour,
      darshan.minute,
    );

    if (currentMinutes >= darshanMinutes) {
      return darshan;
    }
  }

  return null;
}

/* =========================================================
   STATUS LABEL
========================================================= */

function getStatusLabel(
  status: DarshanStatus,
  t: ReturnType<typeof useLanguage>["t"],
) {
  switch (status) {
    case "completed":
      return t("completed");

    case "openNow":
      return t("openNow");

    default:
      return t("upcoming");
  }
}

/* =========================================================
   STATUS DESCRIPTION
========================================================= */

function getStatusDescription(
  status: DarshanStatus,
  t: ReturnType<typeof useLanguage>["t"],
) {
  switch (status) {
    case "openNow":
      return t("darshanLiveNow");

    case "completed":
      return t("darshanCompleted");

    default:
      return t("darshanUpcoming");
  }
}

/* =========================================================
   COMPONENT
========================================================= */

export default function DarshanTimings() {
  const router = useRouter();
  const { t, language } = useLanguage();

  const [currentTime, setCurrentTime] =
    useState<Date | null>(null);

  /* =======================================================
     LIVE CLOCK
  ======================================================= */

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date());
    };

    updateTime();

    const interval = window.setInterval(
      updateTime,
      1000,
    );

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  /* =======================================================
     CURRENT DARSHAN
  ======================================================= */

  const currentDarshan =
    getCurrentDarshan(currentTime);

  /* =======================================================
     DATE
  ======================================================= */

  const currentDate = currentTime
    ? currentTime.toLocaleDateString(
        language === "hi"
          ? "hi-IN"
          : language === "gu"
            ? "gu-IN"
            : "en-IN",
        {
          weekday: "long",
          day: "2-digit",
          month: "long",
          year: "numeric",
        },
      )
    : "";

  /* =======================================================
     TIME
  ======================================================= */

  const currentFormattedTime = currentTime
    ? currentTime.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
    : "--:--:--";

  /* =======================================================
     UI
  ======================================================= */

  return (
    <main
      className="
        min-h-[100dvh]
        w-full
        overflow-x-hidden

        bg-[#fffaf0]

        px-3
        pb-[84px]
        pt-2

        text-[#40372f]

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
      <div className="mx-auto w-full max-w-[1800px]">

        {/* =================================================
            GLOBAL HEADER
        ================================================= */}

        <HomeHeader />

        {/* =================================================
            MOBILE / TABLET HEADER
        ================================================= */}

        <header
          className="
            flex
            min-h-[100px]
            items-center
            justify-between
            gap-2
            py-3

            sm:min-h-[108px]
            sm:gap-3

            md:min-h-[118px]
            md:py-4

            lg:hidden
          "
        >
          {/* BACK */}

          <button
            type="button"
            onClick={() => router.back()}
            aria-label={t("back")}
            className="
              grid
              h-10
              w-10
              shrink-0
              place-items-center

              rounded-full

              border
              border-[#ead9bc]

              bg-[#fffdf7]

              text-[27px]
              leading-none
              text-[#991919]

              shadow-[0_3px_12px_rgba(91,53,19,0.07)]

              transition

              active:scale-95

              sm:h-11
              sm:w-11

              md:h-12
              md:w-12
            "
          >
            ‹
          </button>

          {/* TITLE */}

          <div className="min-w-0 flex-1 text-center">
            <div
              className="
                mb-0.5
                text-[10px]
                text-[#c99435]

                sm:text-xs
              "
            >
              ✦
            </div>

            <h1
              className="
                m-0
                truncate

                font-serif
                text-[18px]
                font-bold
                leading-tight

                text-[#991919]

                sm:text-[21px]

                md:text-[25px]
              "
            >
              {currentDarshan && (
                <span className="text-[#c99435]">
                  {t(currentDarshan.nameKey)}
                </span>
              )}
            </h1>

            <p
              className="
                mt-1
                truncate

                text-[9px]
                text-[#82766b]

                sm:text-[11px]

                md:text-xs
              "
            >
              {currentDate}
            </p>

            {/* TIME */}

            <div
              className="
                mt-1.5
                inline-flex
                items-center
                gap-1.5

                rounded-full

                border
                border-[#ead7b5]

                bg-white/80

                px-2.5
                py-1

                text-[9px]
                font-semibold

                text-[#6f5a46]

                shadow-[0_2px_8px_rgba(91,53,19,0.05)]

                sm:mt-2
                sm:px-3
                sm:py-1.5
                sm:text-[10px]

                md:text-xs
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  animate-pulse
                  rounded-full
                  bg-[#159b60]

                  sm:h-2
                  sm:w-2
                "
              />

              {currentFormattedTime}
            </div>
          </div>

          {/* CURRENT DARSHAN IMAGE */}

          <div
            className="
              flex
              h-[52px]
              w-[52px]
              shrink-0
              items-center
              justify-center
              overflow-hidden

              rounded-full

              border
              border-[#dec182]

              bg-[radial-gradient(circle,#fffdf8_0%,#fff3d9_100%)]

              p-[3px]

              shadow-[0_5px_15px_rgba(96,57,18,0.10)]

              sm:h-[60px]
              sm:w-[60px]

              md:h-[68px]
              md:w-[68px]
            "
          >
            <img
              src={
                currentDarshan?.image ||
                "/images/mangala.jpg"
              }
              alt={
                currentDarshan
                  ? t(currentDarshan.nameKey)
                  : "Temple"
              }
              className="
                block
                h-full
                w-full

                rounded-full

                object-contain
                object-center
              "
            />
          </div>
        </header>

        {/* =================================================
            MOBILE DIVIDER
        ================================================= */}

        <div
          className="
            mb-3
            flex
            h-[15px]
            items-center
            justify-center
            gap-2

            lg:hidden
          "
        >
          <span
            className="
              h-px
              w-[55px]

              bg-gradient-to-r
              from-transparent
              to-[#d9b66b]

              sm:w-[90px]

              md:w-[120px]
            "
          />

          <b className="text-[10px] text-[#c99435]">
            ✦
          </b>

          <span
            className="
              h-px
              w-[55px]

              bg-gradient-to-l
              from-transparent
              to-[#d9b66b]

              sm:w-[90px]

              md:w-[120px]
            "
          />
        </div>

        {/* =================================================
            PREMIUM DESKTOP HEADER
        ================================================= */}

        <section
          className="
            relative
            mb-5
            hidden
            min-h-[145px]
            items-center
            justify-between
            gap-6
            overflow-hidden

            rounded-[22px]

            border
            border-[#e6d2ad]

            bg-[radial-gradient(circle_at_85%_20%,rgba(201,148,53,0.14),transparent_28%),linear-gradient(135deg,#fffdf8_0%,#fff8eb_48%,#fdf0dc_100%)]

            px-8
            py-6

            shadow-[0_8px_28px_rgba(104,65,22,0.08)]

            lg:flex

            2xl:min-h-[155px]
          "
        >
          {/* SUBTLE DECORATION */}

          <div
            className="
              pointer-events-none
              absolute
              -right-12
              -top-16

              h-40
              w-40

              rounded-full

              border
              border-[#d8b66c]/20
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -right-4
              -top-8

              h-24
              w-24

              rounded-full

              border
              border-[#d8b66c]/20
            "
          />

          {/* LEFT CONTENT */}

          <div className="relative z-10">

            {/* LABEL */}

            <span
              className="
                mb-2
                inline-flex
                items-center
                gap-2

                rounded-full

                border
                border-[#e5c98e]

                bg-[#fffaf0]/80

                px-3
                py-1

                text-[10px]
                font-bold
                uppercase
                tracking-[1.8px]

                text-[#b47a20]

                shadow-[0_2px_8px_rgba(151,102,29,0.06)]
              "
            >
              <span className="text-[#c99435]">
                ✦
              </span>

              {t("darshan")}

              <span className="text-[#c99435]">
                ✦
              </span>
            </span>

            {/* TITLE */}

            <h1
              className="
                m-0

                font-serif
                text-[34px]
                font-bold
                leading-tight

                text-[#991919]

                2xl:text-[38px]
              "
            >
              {currentDarshan && (
                <span className="text-[#c99435]">
                  {t(currentDarshan.nameKey)}
                </span>
              )}
            </h1>

            {/* DATE */}

            <p
              className="
                mt-2
                text-sm
                text-[#82766b]
              "
            >
              {currentDate}
            </p>

            {/* LIVE TIME */}

            <div
              className="
                mt-3
                inline-flex
                items-center
                gap-2

                rounded-full

                border
                border-[#ead7b5]

                bg-white/70

                px-3
                py-1.5

                text-xs
                font-semibold

                text-[#6f5a46]

                shadow-[0_2px_8px_rgba(91,53,19,0.05)]
              "
            >
              <span
                className="
                  h-2
                  w-2
                  animate-pulse
                  rounded-full
                  bg-[#159b60]
                "
              />

              {currentFormattedTime}
            </div>
          </div>

          {/* DARSHAN IMAGE */}

          <div
            className="
              relative
              z-10

              flex
              h-[92px]
              w-[92px]
              shrink-0
              items-center
              justify-center
              overflow-hidden

              rounded-full

              border
              border-[#d8b56c]

              bg-[radial-gradient(circle,#fffdf8_0%,#fff3d9_100%)]

              p-[4px]

              shadow-[0_8px_24px_rgba(130,82,20,0.14)]

              2xl:h-[104px]
              2xl:w-[104px]
            "
          >
            <img
              src={
                currentDarshan?.image ||
                "/images/mangala.jpg"
              }
              alt={
                currentDarshan
                  ? t(currentDarshan.nameKey)
                  : "Temple"
              }
              className="
                block
                h-full
                w-full

                rounded-full

                object-contain
                object-center
              "
            />
          </div>
        </section>

        {/* =================================================
            DARSHAN LIST
        ================================================= */}

        <section
          className="
            overflow-hidden

            rounded-[17px]

            border
            border-[#e5cfaa]

            bg-[#fffdf8]

            shadow-[0_8px_25px_rgba(79,43,14,0.08)]

            sm:rounded-[20px]

            lg:grid
            lg:grid-cols-2
            lg:gap-4
            lg:overflow-visible
            lg:rounded-none
            lg:border-0
            lg:bg-transparent
            lg:shadow-none

            2xl:gap-5
          "
        >
          {DARSHANS.map((darshan, index) => {
            const status = getStatus(
              index,
              currentTime,
            );

            const isCurrent =
              status === "openNow";

            return (
              <div
                key={darshan.nameKey}
                className={`
                  flex
                  min-h-[82px]
                  w-full
                  items-center

                  border-b
                  border-[#ecdfca]

                  px-2.5
                  py-2

                  transition-all
                  duration-200

                  last:border-b-0

                  sm:min-h-[88px]
                  sm:px-3
                  sm:py-2.5

                  md:min-h-[100px]
                  md:px-4
                  md:py-3

                  lg:min-h-[118px]
                  lg:rounded-2xl
                  lg:border
                  lg:border-[#eadbc5]
                  lg:bg-[#fffdf8]
                  lg:px-[18px]
                  lg:py-4

                  lg:shadow-[0_5px_18px_rgba(81,46,15,0.06)]

                  lg:hover:-translate-y-[3px]
                  lg:hover:border-[#d9bc83]
                  lg:hover:shadow-[0_11px_28px_rgba(81,46,15,0.10)]

                  2xl:min-h-[128px]
                  2xl:px-[22px]
                  2xl:py-[18px]

                  ${
                    isCurrent
                      ? `
                        bg-gradient-to-r
                        from-[#effaf4]
                        to-[#fffdf8]

                        lg:border-[#b9dec9]
                        lg:from-[#edf9f2]
                        lg:to-[#fffdf8]
                      `
                      : ""
                  }
                `}
              >
                {/* IMAGE */}

                <div
                  className="
                    flex
                    w-[50px]
                    shrink-0
                    justify-center

                    sm:w-[58px]

                    md:w-[68px]

                    lg:w-[78px]
                  "
                >
                  <div
                    className="
                      flex
                      h-[42px]
                      w-[42px]
                      shrink-0
                      items-center
                      justify-center
                      overflow-hidden

                      rounded-[11px]

                      border
                      border-[#d3ad62]

                      bg-[#fff8e9]

                      p-[3px]

                      shadow-[0_3px_9px_rgba(109,65,16,0.10)]

                      sm:h-[50px]
                      sm:w-[50px]
                      sm:rounded-[13px]

                      md:h-[58px]
                      md:w-[58px]
                      md:rounded-[15px]

                      lg:h-[62px]
                      lg:w-[62px]
                      lg:rounded-2xl

                      2xl:h-[68px]
                      2xl:w-[68px]
                    "
                  >
                    <img
                      src={darshan.image}
                      alt={t(darshan.nameKey)}
                      className="
                        block
                        h-full
                        w-full

                        rounded-[8px]

                        object-contain
                        object-center
                      "
                    />
                  </div>
                </div>

                {/* DETAILS */}

                <div
                  className="
                    min-w-0
                    flex-1
                    pl-2

                    sm:pl-2.5

                    md:pl-3

                    lg:pl-[10px]
                  "
                >
                  <span
                    className="
                      mb-0.5
                      block

                      font-serif
                      text-[8px]
                      tracking-[1px]

                      text-[#c99435]

                      sm:text-[9px]

                      md:text-[10px]
                    "
                  >
                    {String(index + 1).padStart(
                      2,
                      "0",
                    )}
                  </span>

                  <h2
                    className="
                      m-0
                      truncate

                      font-serif
                      text-[13px]
                      font-bold

                      text-[#40342c]

                      sm:text-[15px]

                      md:text-lg

                      lg:text-xl

                      2xl:text-[22px]
                    "
                  >
                    {t(darshan.nameKey)}
                  </h2>

                  <small
                    className="
                      mt-1
                      block
                      truncate

                      text-[8px]
                      text-[#9a8c7d]

                      sm:text-[9px]

                      md:text-[11px]

                      lg:text-[11px]

                      2xl:text-xs
                    "
                  >
                    {getStatusDescription(
                      status,
                      t,
                    )}
                  </small>
                </div>

                {/* TIME + STATUS */}

                <div
                  className="
                    flex
                    w-[78px]
                    shrink-0
                    flex-col
                    items-start
                    gap-1

                    sm:w-[88px]

                    md:w-[105px]
                    md:gap-1.5

                    lg:w-[115px]
                    lg:items-end
                    lg:gap-2

                    2xl:w-[130px]
                  "
                >
                  <strong
                    className="
                      whitespace-nowrap

                      text-[10px]
                      font-bold

                      text-[#463a32]

                      sm:text-xs

                      md:text-sm

                      lg:text-sm

                      2xl:text-[15px]
                    "
                  >
                    {darshan.time}
                  </strong>

                  <span
                    className={`
                      whitespace-nowrap

                      rounded-md

                      px-1.5
                      py-1

                      text-[7px]
                      font-bold

                      sm:px-2
                      sm:text-[9px]

                      md:px-2.5
                      md:py-1.5
                      md:text-[10px]

                      lg:rounded-[7px]
                      lg:text-[10px]

                      2xl:text-[11px]

                      ${
                        status === "completed"
                          ? `
                            border
                            border-[#d8ecdf]
                            bg-[#eef7f1]
                            text-[#4e9873]
                          `
                          : status === "openNow"
                            ? `
                              bg-gradient-to-br
                              from-[#159b60]
                              to-[#087d48]

                              text-white

                              shadow-[0_3px_7px_rgba(11,125,72,0.20)]
                            `
                            : `
                              border
                              border-[#f5ddbc]
                              bg-[#fff0d9]
                              text-[#cf813d]
                            `
                      }
                    `}
                  >
                    {getStatusLabel(status, t)}
                  </span>
                </div>
              </div>
            );
          })}
        </section>

        {/* =================================================
            BOTTOM DECORATION
        ================================================= */}

        <div
          className="
            flex
            h-12
            items-center
            justify-center
            gap-2.5

            text-[#c99435]

            lg:h-16
          "
        >
          <span
            className="
              h-px
              w-14

              bg-gradient-to-r
              from-transparent
              to-[#d8b66c]

              lg:w-24
            "
          />

          <strong
            className="
              font-serif
              text-sm
              font-normal

              lg:text-lg
            "
          >
            ॐ
          </strong>

          <span
            className="
              h-px
              w-14

              bg-gradient-to-l
              from-transparent
              to-[#d8b66c]

              lg:w-24
            "
          />
        </div>
      </div>
    </main>
  );
}