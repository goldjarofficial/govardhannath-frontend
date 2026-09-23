"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "../../lib/LanguageProvider";
import type { TranslationKey } from "../../lib/i18n";

type EventTab = "upcoming" | "past";

type EventItem = {
  id: string;
  titleKey: TranslationKey;
  dateKey: TranslationKey;
  image: string;
};

const events: EventItem[] = [
  {
    id: "janmashtami-utsav",
    titleKey: "janmashtamiUtsav",
    dateKey: "janmashtamiDate",
    image: "/images/janmashtami.jpg",
  },
  {
    id: "annakut-mahotsav",
    titleKey: "annakutMahotsav",
    dateKey: "annakutEventDate",
    image: "/images/annakut-event.jpg",
  },
  {
    id: "sharad-purnima",
    titleKey: "sharadPurnima",
    dateKey: "sharadPurnimaDate",
    image: "/images/sharad-purnima.jpg",
  },
  {
    id: "haveli-sangeet",
    titleKey: "haveliSangeet",
    dateKey: "haveliSangeetDate",
    image: "/images/haveli-sangeet.jpg",
  },
];

const tabClass =
  "h-9 rounded-lg border-0 text-xs font-bold transition-all " +
  "sm:h-[42px] sm:text-sm";

const activeTabClass =
  "bg-[#a71919] text-white shadow-[0_4px_12px_rgba(167,25,25,0.15)]";

const eventCardClass =
  "group flex w-full min-h-[86px] items-center gap-[11px] rounded-[10px] " +
  "border border-[#eee0cc] bg-[#fffdf9] p-2 text-left text-[#4b4039] " +
  "shadow-[0_4px_14px_rgba(79,43,14,0.04)] transition-all " +
  "sm:min-h-[100px] sm:gap-[13px] sm:p-2.5 " +
  "md:min-h-[120px] md:gap-[17px] md:rounded-[15px] md:p-[13px] " +
  "lg:min-h-[165px] lg:gap-[18px] lg:rounded-[17px] lg:p-4 " +
  "lg:hover:-translate-y-[3px] lg:hover:border-[#d7b97f] " +
  "lg:hover:shadow-[0_12px_30px_rgba(79,43,14,0.09)] " +
  "min-[1440px]:min-h-[350px] min-[1440px]:flex-col " +
  "min-[1440px]:items-stretch min-[1440px]:gap-[14px] min-[1440px]:p-[14px]";

const imageClass =
  "h-[70px] w-[72px] shrink-0 overflow-hidden rounded-lg bg-[#f4e5c8] " +
  "sm:h-20 sm:w-[82px] sm:rounded-[10px] " +
  "md:h-[94px] md:w-[105px] md:rounded-xl " +
  "lg:h-[130px] lg:w-[145px] lg:rounded-[13px] " +
  "min-[1440px]:h-[205px] min-[1440px]:w-full min-[1440px]:rounded-[14px]";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="font-serif text-[#641010]">{children}</h2>;
}

function EventCard({
  event,
  onClick,
  t,
}: {
  event: EventItem;
  onClick: () => void;
  t: (key: TranslationKey) => string;
}) {
  return (
    <button type="button" onClick={onClick} className={eventCardClass}>
      <div className={imageClass}>
        <img
          src={event.image}
          alt={t(event.titleKey)}
          className="block h-full w-full object-cover"
        />
      </div>

      <div className="min-w-0 flex-1 min-[1440px]:px-1 min-[1440px]:pt-[3px]">
        <span
          className="
            mb-1 hidden text-[9px] font-bold uppercase
            tracking-[1px] text-[#c99435]
            md:block
            lg:text-[10px]
          "
        >
          Upcoming Event
        </span>

        <SectionTitle>
          <span
            className="
              block text-sm leading-tight
              sm:text-base
              md:text-xl
              lg:text-[21px]
              min-[1440px]:text-[22px]
            "
          >
            {t(event.titleKey)}
          </span>
        </SectionTitle>

        <p
          className="
            mt-1 text-[10px] text-[#8a8077]
            sm:text-[11px]
            md:mt-[7px] md:text-xs
            min-[1440px]:text-[13px]
          "
        >
          {t(event.dateKey)}
        </p>
      </div>

      <span
        className="
          inline-flex shrink-0 items-center justify-center gap-1
          rounded-md bg-[#fff0df] px-[9px] py-[7px]
          text-[10px] font-bold text-[#a71919] whitespace-nowrap
          sm:px-2.5 sm:py-2 sm:text-[11px]
          md:rounded-lg md:px-3 md:py-[9px] md:text-xs
          min-[1440px]:ml-auto min-[1440px]:mr-1 min-[1440px]:mt-auto
          min-[1440px]:mb-[3px] min-[1440px]:w-fit
        "
      >
        {t("view")}
        <b className="text-[15px] leading-none">›</b>
      </span>
    </button>
  );
}

function EmptyEvents({ t }: { t: (key: TranslationKey) => string }) {
  return (
    <div
      className="
        rounded-[14px] border border-[#eadbc5] bg-[#fffdf8]
        px-[15px] py-[45px] text-center text-[#8a8077]
        md:rounded-[18px] md:px-[30px] md:py-[70px]
        lg:col-span-full lg:flex lg:min-h-[320px]
        lg:flex-col lg:items-center lg:justify-center
        lg:rounded-[20px] lg:p-10
      "
    >
      <div
        className="
          mx-auto mb-3 grid h-[58px] w-[58px] place-items-center
          rounded-full border border-[#e5cfaa] bg-[#fff8eb] text-[27px]
          lg:mb-4 lg:h-[78px] lg:w-[78px] lg:text-4xl
        "
      >
        🛕
      </div>

      <h2
        className="
          font-serif text-lg text-[#641010]
          lg:text-2xl
        "
      >
        {t("past")}
      </h2>

      <p className="mt-[7px] text-xs lg:text-[13px]">{t("noPastEvents")}</p>
    </div>
  );
}

function Decoration() {
  return (
    <div
      className="
        mt-6 flex items-center justify-center gap-1.5 text-[#c99435]
        lg:mt-[38px]
      "
    >
      <span
        className="
          h-px w-12
          bg-gradient-to-r from-transparent to-[#d8b66c]
          lg:w-[100px]
        "
      />

      <b className="text-[13px] font-normal">❧</b>
      <b className="text-[13px] font-normal">❧</b>
      <b className="text-[13px] font-normal">❧</b>

      <span
        className="
          h-px w-12
          bg-gradient-to-l from-transparent to-[#d8b66c]
          lg:w-[100px]
        "
      />
    </div>
  );
}

export default function Events() {
  const router = useRouter();
  const { t } = useLanguage();

  const [tab, setTab] = useState<EventTab>("upcoming");

  return (
    <main
      className="
        min-h-dvh w-full pb-[calc(30px+env(safe-area-inset-bottom))]
        bg-[radial-gradient(circle_at_50%_-10%,#fffef9_0,#fffaf0_42%,#f6ead5_100%)]
        text-[#4b4039]
        lg:min-h-screen lg:bg-[radial-gradient(circle_at_top_right,rgba(201,148,53,0.12),transparent_30%),#fff9ed]
        lg:px-10 lg:pb-[55px]
      "
    >
      {/* HEADER */}
      <header
        className="
          relative flex h-[72px] items-center justify-between
          border-b border-[#eadbc5] bg-[rgba(255,253,248,0.98)] px-[15px]
          min-[360px]:max-[599px]:h-[78px]
          md:h-[82px] md:px-7
          lg:-mx-10 lg:h-[84px] lg:justify-start lg:gap-[18px] lg:px-[42px]
        "
      >
        <button
          type="button"
          onClick={() => router.back()}
          aria-label={t("back")}
          className="
            grid h-[38px] w-[38px] shrink-0 place-items-center
            rounded-full border border-[#eadbc5] bg-[#fffdf8]
            text-[29px] leading-none text-[#a71919]
            shadow-[0_3px_10px_rgba(70,40,10,0.05)]
            md:h-[42px] md:w-[42px]
            lg:h-11 lg:w-11 lg:text-[31px]
          "
        >
          ‹
        </button>

        <div
          className="
            flex-1 text-center
            lg:flex-none lg:text-left
          "
        >
          <span
            className="
              mb-0.5 hidden text-[10px] font-bold uppercase
              tracking-[1.3px] text-[#9a762f]
              lg:block
            "
          >
            Shri Govardhannath Haveli
          </span>

          <h1
            className="
              m-0 font-serif text-[23px] text-[#641010]
              min-[360px]:text-[25px]
              md:text-[28px]
              lg:text-[26px]
            "
          >
            {t("events")}
          </h1>
        </div>

        <div
          className="
            h-[38px] w-[38px] shrink-0
            md:h-[42px] md:w-[42px]
            lg:hidden
          "
        />
      </header>

      {/* DESKTOP HERO */}
      <section
        className="
          mx-auto mt-[30px] hidden min-h-[150px] w-full max-w-[1320px]
          items-center justify-between gap-[30px]
          rounded-[22px] border border-[#eadbc5]
          bg-gradient-to-br from-[#fffdf8] to-[#fff3df]
          px-[34px] py-7
          shadow-[0_10px_30px_rgba(80,45,15,0.06)]
          lg:flex
          min-[1440px]:min-h-[160px] min-[1440px]:max-w-[1420px]
          min-[1440px]:px-10 min-[1440px]:py-8
        "
      >
        <div>
          <span
            className="
              mb-[7px] block text-[11px] font-bold uppercase
              tracking-[1.4px] text-[#c99435]
            "
          >
            Haveli Utsav
          </span>

          <h2
            className="
              m-0 font-serif text-[35px] text-[#641010]
              min-[1440px]:text-[39px]
            "
          >
            {t("events")}
          </h2>

          <p className="mt-[9px] max-w-[520px] text-sm leading-[1.5] text-[#776d65]">
            Stay connected with upcoming utsavs, satsang and sacred
            celebrations.
          </p>
        </div>

        <div
          className="
            grid h-[86px] w-[86px] shrink-0 place-items-center
            rounded-full border border-[#dec182] bg-[#fffdf8]
            text-[42px]
            shadow-[0_8px_22px_rgba(96,57,18,0.08)]
            min-[1440px]:h-[94px] min-[1440px]:w-[94px]
            min-[1440px]:text-[46px]
          "
        >
          🛕
        </div>
      </section>

      {/* TABS */}
      <div
        className="
          mx-[15px] my-[14px] grid grid-cols-2 gap-2
          rounded-[10px] border border-[#eadbc5] bg-[#fffdf8] p-0.5
          shadow-[0_4px_14px_rgba(82,48,18,0.04)]
          min-[360px]:max-[599px]:mx-5
          min-[360px]:max-[599px]:my-[17px_20px_14px]
          md:mx-auto md:my-[22px_0_18px] md:w-[calc(100%-48px)]
          md:max-w-[760px] md:rounded-xl md:p-[3px]
          lg:my-[26px_0_24px] lg:w-full lg:max-w-[520px]
        "
      >
        {(["upcoming", "past"] as EventTab[]).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={`
              ${tabClass}
              ${
                tab === item
                  ? activeTabClass
                  : "bg-transparent text-[#776d65] lg:hover:bg-[#fff1e7] lg:hover:text-[#a71919]"
              }
            `}
          >
            {t(item)}
          </button>
        ))}
      </div>

      {/* EVENTS */}
      <section
        className="
          flex flex-col gap-[9px] px-[15px]
          min-[360px]:max-[599px]:gap-[11px] min-[360px]:max-[599px]:px-5
          md:mx-auto md:w-[calc(100%-48px)] md:max-w-[760px]
          md:gap-[13px] md:p-0
          lg:grid lg:w-full lg:max-w-[1320px]
          lg:grid-cols-2 lg:gap-5
          min-[1440px]:max-w-[1420px]
          min-[1440px]:grid-cols-3 min-[1440px]:gap-[22px]
        "
      >
        {tab === "upcoming" ? (
          events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              t={t}
              onClick={() => router.push(`/events/${event.id}`)}
            />
          ))
        ) : (
          <EmptyEvents t={t} />
        )}
      </section>

      <Decoration />
    </main>
  );
}
