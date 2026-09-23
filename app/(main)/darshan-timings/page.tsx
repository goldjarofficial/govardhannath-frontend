"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useLanguage } from "../../lib/LanguageProvider";
import type { TranslationKey } from "../../lib/i18n";
import HomeHeader from "@/app/components/Header";

type DarshanStatus = "completed" | "openNow" | "upcoming";

type DarshanItem = {
  nameKey: TranslationKey;
  time: string;
  hour: number;
  minute: number;
  image: string;
};

const DARSHANS: DarshanItem[] = [
  {
    nameKey: "mangala",
    time: "05:30 AM",
    hour: 5,
    minute: 30,
    image: "/images/mangala1.jpg",
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

const getMinutes = (hour: number, minute: number) =>
  hour * 60 + minute;

function getStatus(
  index: number,
  currentTime: Date | null,
): DarshanStatus {
  if (!currentTime) return "upcoming";

  const currentMinutes =
    currentTime.getHours() * 60 + currentTime.getMinutes();

  const currentDarshan = DARSHANS[index];

  const startTime = getMinutes(
    currentDarshan.hour,
    currentDarshan.minute,
  );

  const nextDarshan = DARSHANS[index + 1];

  if (currentMinutes < startTime) {
    return "upcoming";
  }

  if (!nextDarshan) {
    return "openNow";
  }

  const nextTime = getMinutes(
    nextDarshan.hour,
    nextDarshan.minute,
  );

  return currentMinutes < nextTime
    ? "openNow"
    : "completed";
}

function getCurrentDarshan(
  currentTime: Date | null,
): DarshanItem | null {
  if (!currentTime) return null;

  const currentMinutes =
    currentTime.getHours() * 60 + currentTime.getMinutes();

  for (let i = DARSHANS.length - 1; i >= 0; i--) {
    const darshan = DARSHANS[i];

    if (
      currentMinutes >=
      getMinutes(darshan.hour, darshan.minute)
    ) {
      return darshan;
    }
  }

  return null;
}

function StatusBadge({
  status,
  t,
}: {
  status: DarshanStatus;
  t: ReturnType<typeof useLanguage>["t"];
}) {
  const styles = {
    completed:
      "border-gray-200 bg-gray-100 text-gray-500",

    openNow:
      "border-emerald-200 bg-emerald-50 text-emerald-700",

    upcoming:
      "border-amber-200 bg-amber-50 text-amber-700",
  };

  const labels = {
    completed: t("completed"),
    openNow: t("openNow"),
    upcoming: t("upcoming"),
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status === "openNow" && (
        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500" />
      )}

      {labels[status]}
    </span>
  );
}

/* ---------------------------------------
   PROFILE STYLE IMAGE
---------------------------------------- */

function ProfileImage({
  src,
  alt,
  size = "normal",
}: {
  src: string;
  alt: string;
  size?: "normal" | "large";
}) {
  const sizeClass =
    size === "large"
      ? "h-24 w-24"
      : "h-16 w-16";

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full border border-[#dfc38d] bg-[#fffaf0] shadow-sm ${sizeClass}`}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
    </div>
  );
}

export default function DarshanTimings() {
  const router = useRouter();
  const { t, language } = useLanguage();

  const [currentTime, setCurrentTime] =
    useState<Date | null>(null);

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

  const currentDarshan =
    getCurrentDarshan(currentTime);

  const locale =
    language === "hi"
      ? "hi-IN"
      : language === "gu"
        ? "gu-IN"
        : "en-IN";

  const currentDate = currentTime
    ? currentTime.toLocaleDateString(locale, {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : "";

  const currentFormattedTime = currentTime
    ? currentTime.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      })
    : "--:--:--";

  return (
    <main className="min-h-screen bg-[#fffaf0] px-4 py-5 text-[#40372f] lg:ml-[92px] lg:px-10">
      <div className="mx-auto max-w-7xl">

        <HomeHeader />

        {/* MOBILE HEADER */}

        <div className="mb-6 flex items-center gap-4 lg:hidden">

          <button
            type="button"
            onClick={() => router.back()}
            aria-label={t("back")}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#e8d8bc] bg-white text-2xl text-[#991919] shadow-sm transition hover:bg-[#fff8ec] active:scale-95"
          >
            ‹
          </button>

          <div className="min-w-0 flex-1 text-center">

            <p className="mb-1 text-xs font-medium uppercase tracking-[2px] text-[#c99435]">
              {t("darshan")}
            </p>

            <h1 className="truncate font-serif text-2xl font-bold text-[#991919]">
              {currentDarshan
                ? t(currentDarshan.nameKey)
                : t("darshan")}
            </h1>

            <p className="mt-1 text-xs text-[#8a7b6c]">
              {currentDate}
            </p>

            <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-[#ead9bd] bg-white px-3 py-1.5 text-xs font-medium text-[#6d5b49]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              {currentFormattedTime}
            </div>

          </div>

          {currentDarshan && (
            <ProfileImage
              src={currentDarshan.image}
              alt={t(currentDarshan.nameKey)}
              size="large"
            />
          )}

        </div>

        {/* DESKTOP HEADER */}

        <section className="mb-8 hidden items-center justify-between rounded-3xl border border-[#e6d3ad] bg-white px-8 py-7 shadow-[0_10px_35px_rgba(79,43,14,0.07)] lg:flex">

          <div>

            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#e6cf9d] bg-[#fffaf0] px-4 py-2 text-xs font-semibold uppercase tracking-[2px] text-[#b47a20]">
              <span>✦</span>

              {t("darshan")}

              <span>✦</span>
            </div>

            <h1 className="font-serif text-4xl font-bold text-[#991919]">
              {currentDarshan
                ? t(currentDarshan.nameKey)
                : t("darshan")}
            </h1>

            <p className="mt-2 text-sm text-[#857668]">
              {currentDate}
            </p>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#ead9bd] bg-[#fffaf0] px-4 py-2 text-sm font-medium text-[#6d5b49]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />

              {currentFormattedTime}
            </div>

          </div>

          {currentDarshan && (
            <ProfileImage
              src={currentDarshan.image}
              alt={t(currentDarshan.nameKey)}
              size="large"
            />
          )}

        </section>

        {/* TITLE */}

        <div className="mb-5 flex items-center gap-4">

          <div className="h-px flex-1 bg-[#e3cfaa]" />

          <div className="text-center">

            <p className="font-serif text-lg font-semibold text-[#991919]">
              {t("darshan")}
            </p>

            <span className="text-xs text-[#b18a4d]">
              Daily Timings
            </span>

          </div>

          <div className="h-px flex-1 bg-[#e3cfaa]" />

        </div>

        {/* DARSHAN CARDS */}

        <section className="grid gap-4 md:grid-cols-2">

          {DARSHANS.map((darshan, index) => {

            const status = getStatus(
              index,
              currentTime,
            );

            const isCurrent =
              status === "openNow";

            return (
              <article
                key={darshan.nameKey}
                className={`group flex items-center gap-4 rounded-2xl border bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
                  isCurrent
                    ? "border-emerald-200 bg-gradient-to-r from-emerald-50/70 to-white"
                    : "border-[#eadcc5]"
                }`}
              >

                {/* PROFILE STYLE IMAGE */}

                <ProfileImage
                  src={darshan.image}
                  alt={t(darshan.nameKey)}
                />

                {/* DETAILS */}

                <div className="min-w-0 flex-1">

                  <div className="mb-1 flex items-center gap-2">

                    <span className="text-[11px] font-semibold tracking-wider text-[#c99435]">
                      {String(index + 1).padStart(
                        2,
                        "0",
                      )}
                    </span>

                    {isCurrent && (
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                        LIVE
                      </span>
                    )}

                  </div>

                  <h2 className="truncate font-serif text-lg font-bold text-[#40342c]">
                    {t(darshan.nameKey)}
                  </h2>

                  <p className="mt-1 text-xs text-[#938476]">
                    {status === "openNow"
                      ? t("darshanLiveNow")
                      : status === "completed"
                        ? t("darshanCompleted")
                        : t("darshanUpcoming")}
                  </p>

                </div>

                {/* TIME */}

                <div className="flex shrink-0 flex-col items-end gap-2">

                  <time className="text-sm font-bold text-[#40342c]">
                    {darshan.time}
                  </time>

                  <StatusBadge
                    status={status}
                    t={t}
                  />

                </div>

              </article>
            );
          })}

        </section>

        {/* FOOTER */}

        <div className="mt-10 flex items-center justify-center gap-4">

          <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#d8b66c]" />

          <span className="font-serif text-lg text-[#c99435]">
            ॐ
          </span>

          <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#d8b66c]" />

        </div>

      </div>
    </main>
  );
}