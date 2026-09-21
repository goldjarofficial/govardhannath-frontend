"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useLanguage } from "../../lib/LanguageProvider";
import type { TranslationKey } from "../../lib/i18n";

type DarshanStatus =
  | "completed"
  | "openNow"
  | "upcoming";

type DarshanItem = {
  nameKey: TranslationKey;
  time: string;
  hour: number;
  minute: number;
};

const darshans: DarshanItem[] = [
  {
    nameKey: "mangala",
    time: "05:30 AM",
    hour: 5,
    minute: 30,
  },
  {
    nameKey: "shringar",
    time: "07:30 AM",
    hour: 7,
    minute: 30,
  },
  {
    nameKey: "gwal",
    time: "09:00 AM",
    hour: 9,
    minute: 0,
  },
  {
    nameKey: "rajbhog",
    time: "12:15 PM",
    hour: 12,
    minute: 15,
  },
  {
    nameKey: "utthapan",
    time: "04:00 PM",
    hour: 16,
    minute: 0,
  },
  {
    nameKey: "bhog",
    time: "06:00 PM",
    hour: 18,
    minute: 0,
  },
  {
    nameKey: "sandhyaAarti",
    time: "07:30 PM",
    hour: 19,
    minute: 30,
  },
  {
    nameKey: "shayan",
    time: "09:00 PM",
    hour: 21,
    minute: 0,
  },
];

export default function DarshanTimings() {
  const router = useRouter();

  const { t, language } = useLanguage();

  const [currentTime, setCurrentTime] =
    useState<Date | null>(null);

  /* =====================================================
     REAL TIME
  ===================================================== */

  useEffect(() => {
    setCurrentTime(new Date());

    const interval = window.setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      window.clearInterval(interval);
    };
  }, []);

  /* =====================================================
     DARSHAN STATUS
  ===================================================== */

  const getDarshanStatus = (
    index: number
  ): DarshanStatus => {
    if (!currentTime) {
      return "upcoming";
    }

    const currentMinutes =
      currentTime.getHours() * 60 +
      currentTime.getMinutes();

    const darshan = darshans[index];

    const darshanMinutes =
      darshan.hour * 60 +
      darshan.minute;

    const nextDarshan =
      darshans[index + 1];

    if (currentMinutes < darshanMinutes) {
      return "upcoming";
    }

    if (!nextDarshan) {
      return "openNow";
    }

    const nextDarshanMinutes =
      nextDarshan.hour * 60 +
      nextDarshan.minute;

    if (
      currentMinutes >= darshanMinutes &&
      currentMinutes < nextDarshanMinutes
    ) {
      return "openNow";
    }

    return "completed";
  };

  /* =====================================================
     STATUS TEXT
  ===================================================== */

  const getStatusLabel = (
    status: DarshanStatus
  ) => {
    if (status === "completed") {
      return t("completed");
    }

    if (status === "openNow") {
      return t("openNow");
    }

    return t("upcoming");
  };

  const getStatusDescription = (
    status: DarshanStatus
  ) => {
    if (status === "openNow") {
      return t("darshanLiveNow");
    }

    if (status === "completed") {
      return t("darshanCompleted");
    }

    return t("darshanUpcoming");
  };

  /* =====================================================
     CURRENT DATE
  ===================================================== */

  const getCurrentDate = () => {
    if (!currentTime) {
      return "";
    }

    const locale =
      language === "hi"
        ? "hi-IN"
        : language === "gu"
          ? "gu-IN"
          : "en-IN";

    return currentTime.toLocaleDateString(
      locale,
      {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );
  };

  /* =====================================================
     CURRENT TIME
  ===================================================== */

  const getCurrentTime = () => {
    if (!currentTime) {
      return "--:--:--";
    }

    return currentTime.toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }
    );
  };

  return (
    <main
      className="
        min-h-dvh
        bg-[radial-gradient(circle_at_50%_-10%,#fffef9_0%,#fffaf0_42%,#f6ead5_100%)]
        px-[10px]
        pt-2
        pb-[90px]
        text-[#3d3028]

        min-[430px]:px-4
        min-[600px]:mx-auto
        min-[600px]:max-w-[820px]
        min-[600px]:px-6
        min-[600px]:pt-[15px]

        lg:ml-[92px]
        lg:max-w-none
        lg:px-10
        lg:py-7
        lg:pb-12
        lg:bg-[radial-gradient(circle_at_top_right,rgba(201,148,53,0.12),transparent_30%),#fffaf0]

        2xl:px-[50px]
        2xl:py-8
      "
    >
      {/* =================================================
          MOBILE HEADER
      ================================================= */}

      <header
        className="
          flex
          h-[88px]
          items-center
          justify-between

          max-[359px]:h-[78px]
          min-[430px]:h-[96px]
          min-[600px]:h-[105px]

          lg:hidden
        "
      >
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
            bg-[rgba(255,253,247,0.92)]
            text-[27px]
            leading-none
            text-[#991919]
            shadow-[0_3px_12px_rgba(91,53,19,0.07)]
            transition

            hover:bg-[#fff6e7]
            active:scale-95

            max-[359px]:h-9
            max-[359px]:w-9
            max-[359px]:text-2xl

            min-[600px]:h-11
            min-[600px]:w-11
          "
        >
          ‹
        </button>

        <div className="text-center">
          <div
            className="
              mb-[1px]
              text-xs
              text-[#c99435]
            "
          >
            ✦
          </div>

          <h1
            className="
              m-0
              font-serif
              text-[22px]
              font-bold
              tracking-[-0.2px]
              text-[#941616]

              max-[359px]:text-[19px]
              min-[430px]:text-2xl
              min-[600px]:text-[28px]
            "
          >
            {t("ashtakayamDarshan")}
          </h1>

          <p
            className="
              mt-[5px]
              text-[11px]
              text-[#82766b]

              min-[430px]:text-xs
              min-[600px]:text-[13px]
            "
          >
            {getCurrentDate()}
          </p>
        </div>

        <div
          className="
            w-10
            max-[359px]:w-9
            min-[600px]:w-11
          "
        />
      </header>

      {/* =================================================
          MOBILE DIVIDER
      ================================================= */}

      <div
        className="
          mb-2
          flex
          h-[15px]
          items-center
          justify-center
          gap-2

          min-[600px]:mb-[14px]
          lg:hidden
        "
      >
        <span
          className="
            h-px
            w-[72px]
            bg-gradient-to-r
            from-transparent
            to-[#d9b66b]

            min-[600px]:w-[105px]
          "
        />

        <b className="text-[10px] text-[#c99435]">
          ✦
        </b>

        <span
          className="
            h-px
            w-[72px]
            bg-gradient-to-l
            from-transparent
            to-[#d9b66b]

            min-[600px]:w-[105px]
          "
        />
      </div>

      {/* =================================================
          DESKTOP INTRO
      ================================================= */}

      <section
        className="
          mb-[26px]
          hidden
          min-h-[135px]
          items-center
          justify-between
          gap-6
          rounded-[20px]
          border
          border-[#eadbc5]
          bg-gradient-to-br
          from-[#fffdf8]
          to-[#fff5e5]
          px-[30px]
          py-[25px]
          shadow-[0_8px_28px_rgba(82,48,18,0.07)]

          lg:flex

          2xl:min-h-[150px]
          2xl:px-9
          2xl:py-7
        "
      >
        <div>
          <span
            className="
              mb-[6px]
              block
              text-xs
              font-bold
              uppercase
              tracking-[1.7px]
              text-[#c99435]
            "
          >
            {t("darshan")}
          </span>

          <h2
            className="
              m-0
              font-serif
              text-[34px]
              leading-[1.1]
              font-bold
              text-[#941616]

              2xl:text-[38px]
            "
          >
            {t("ashtakayamDarshan")}
          </h2>

          <p
            className="
              mt-[9px]
              text-sm
              text-[#82766b]
            "
          >
            {getCurrentDate()}
          </p>

          {/* REAL CURRENT TIME */}

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

            {getCurrentTime()}
          </div>
        </div>

        <div
          className="
            grid
            h-[82px]
            w-[82px]
            shrink-0
            place-items-center
            rounded-full
            border
            border-[#dec182]
            bg-[#fffdf8]
            text-[41px]
            shadow-[0_8px_22px_rgba(96,57,18,0.08)]

            2xl:h-[92px]
            2xl:w-[92px]
            2xl:text-[46px]
          "
        >
          🛕
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
          bg-[rgba(255,253,248,0.94)]
          shadow-[0_8px_25px_rgba(79,43,14,0.08)]

          min-[600px]:rounded-[20px]

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
        {darshans.map(
          (darshan, index) => {
            const status =
              getDarshanStatus(index);

            const isCurrent =
              status === "openNow";

            return (
              <div
                key={darshan.nameKey}
                className={`
                  flex
                  min-h-[78px]
                  items-center
                  border-b
                  border-[#ecdfca]
                  px-[10px]
                  py-2
                  transition-all
                  duration-200

                  last:border-b-0

                  max-[359px]:min-h-[72px]
                  max-[359px]:px-[7px]
                  max-[359px]:py-[7px]

                  min-[430px]:min-h-[86px]
                  min-[430px]:px-[15px]
                  min-[430px]:py-[10px]

                  min-[600px]:min-h-[98px]
                  min-[600px]:px-5
                  min-[600px]:py-3

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
                {/* TEMPLE ICON */}

                <div
                  className="
                    flex
                    w-[57px]
                    shrink-0
                    justify-center

                    max-[359px]:w-[49px]

                    min-[430px]:w-16
                    min-[600px]:w-[72px]

                    lg:w-[78px]
                  "
                >
                  <div
                    className="
                      grid
                      h-[47px]
                      w-[47px]
                      place-items-center
                      rounded-[13px]
                      border
                      border-[#d3ad62]
                      bg-gradient-to-br
                      from-[#fffdf7]
                      to-[#f5e5c6]
                      text-[25px]
                      shadow-[0_3px_9px_rgba(109,65,16,0.10)]

                      max-[359px]:h-[42px]
                      max-[359px]:w-[42px]
                      max-[359px]:text-[22px]

                      min-[430px]:h-[52px]
                      min-[430px]:w-[52px]
                      min-[430px]:text-[28px]

                      min-[600px]:h-[58px]
                      min-[600px]:w-[58px]
                      min-[600px]:rounded-[15px]
                      min-[600px]:text-[31px]

                      lg:h-[62px]
                      lg:w-[62px]
                      lg:rounded-2xl
                      lg:text-[33px]

                      2xl:h-[68px]
                      2xl:w-[68px]
                      2xl:text-[36px]
                    "
                  >
                    🛕
                  </div>
                </div>

                {/* DETAILS */}

                <div
                  className="
                    min-w-0
                    flex-1
                    pl-[7px]

                    max-[359px]:pl-[5px]

                    min-[600px]:pl-[10px]
                    lg:pl-[10px]
                  "
                >
                  <span
                    className="
                      mb-[1px]
                      block
                      font-serif
                      text-[8px]
                      tracking-[1px]
                      text-[#c99435]

                      min-[600px]:text-[10px]
                      lg:mb-1
                    "
                  >
                    {String(
                      index + 1
                    ).padStart(2, "0")}
                  </span>

                  <h2
                    className="
                      m-0
                      font-serif
                      text-[14px]
                      font-bold
                      text-[#40342c]

                      max-[359px]:text-xs

                      min-[430px]:text-[15px]
                      min-[600px]:text-lg

                      lg:text-xl
                      2xl:text-[22px]
                    "
                  >
                    {t(darshan.nameKey)}
                  </h2>

                  <small
                    className="
                      mt-[3px]
                      block
                      text-[8px]
                      text-[#9a8c7d]

                      min-[430px]:text-[9px]

                      min-[600px]:mt-[5px]
                      min-[600px]:text-[11px]

                      lg:text-[11px]
                      2xl:text-xs
                    "
                  >
                    {getStatusDescription(
                      status
                    )}
                  </small>
                </div>

                {/* TIME + STATUS */}

                <div
                  className="
                    flex
                    w-[83px]
                    flex-col
                    items-start
                    gap-[5px]

                    max-[359px]:w-[72px]

                    min-[430px]:w-[92px]

                    min-[600px]:w-[115px]
                    min-[600px]:gap-[7px]

                    lg:w-[115px]
                    lg:items-end
                    lg:gap-2

                    2xl:w-[130px]
                  "
                >
                  <strong
                    className="
                      whitespace-nowrap
                      text-[11px]
                      font-bold
                      text-[#463a32]

                      max-[359px]:text-[10px]

                      min-[430px]:text-xs
                      min-[600px]:text-sm

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
                      px-[7px]
                      py-1
                      text-[8px]
                      font-bold
                      tracking-[0.1px]

                      max-[359px]:px-[5px]
                      max-[359px]:py-[3px]
                      max-[359px]:text-[7px]

                      min-[430px]:text-[9px]

                      min-[600px]:px-[9px]
                      min-[600px]:py-[5px]
                      min-[600px]:text-[10px]

                      lg:rounded-[7px]
                      lg:px-[10px]
                      lg:py-[6px]
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
                          : status ===
                              "openNow"
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
                    {getStatusLabel(status)}
                  </span>
                </div>
              </div>
            );
          }
        )}
      </section>

      {/* =================================================
          FOOTER ORNAMENT
      ================================================= */}

      <div
        className="
          flex
          h-[35px]
          items-center
          justify-center
          gap-[9px]
          text-[#c99435]

          lg:h-[75px]
        "
      >
        <span
          className="
            h-px
            w-[60px]
            bg-gradient-to-r
            from-transparent
            to-[#d8b66c]

            lg:w-[110px]
          "
        />

        <b
          className="
            font-serif
            text-[13px]
            font-normal

            lg:text-lg
          "
        >
          ॐ
        </b>

        <span
          className="
            h-px
            w-[60px]
            bg-gradient-to-l
            from-transparent
            to-[#d8b66c]

            lg:w-[110px]
          "
        />
      </div>
    </main>
  );
}