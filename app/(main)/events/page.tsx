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

export default function Events() {
  const router = useRouter();
  const { t } = useLanguage();

  const [tab, setTab] =
    useState<EventTab>("upcoming");

  return (
    <main className="eventsScreen">
      {/* HEADER */}

      <header className="eventsHeader">
        <button
          type="button"
          className="eventsBack"
          onClick={() => router.back()}
          aria-label={t("back")}
        >
          ‹
        </button>

        <div className="headerContent">
          <span className="headerEyebrow">
            Shri Govardhannath Haveli
          </span>

          <h1>{t("events")}</h1>
        </div>

        <div className="headerSpace" />
      </header>

      {/* DESKTOP HERO */}

      <section className="desktopHero">
        <div>
          <span>
            Haveli Utsav
          </span>

          <h2>
            {t("events")}
          </h2>

          <p>
            Stay connected with upcoming utsavs,
            satsang and sacred celebrations.
          </p>
        </div>

        <div className="heroIcon">
          🛕
        </div>
      </section>

      {/* TABS */}

      <div className="tabs">
        <button
          type="button"
          className={
            tab === "upcoming"
              ? "activeTab"
              : ""
          }
          onClick={() =>
            setTab("upcoming")
          }
        >
          {t("upcoming")}
        </button>

        <button
          type="button"
          className={
            tab === "past"
              ? "activeTab"
              : ""
          }
          onClick={() =>
            setTab("past")
          }
        >
          {t("past")}
        </button>
      </div>

      {/* EVENTS */}

      <section className="eventList">
        {tab === "upcoming" ? (
          events.map((event) => (
            <button
              type="button"
              key={event.id}
              className="eventCard"
              onClick={() =>
                router.push(
                  `/events/${event.id}`
                )
              }
            >
              <div className="eventImageWrap">
                <img
                  src={event.image}
                  alt={t(event.titleKey)}
                />
              </div>

              <div className="eventInfo">
                <span className="eventLabel">
                  Upcoming Event
                </span>

                <h2>
                  {t(event.titleKey)}
                </h2>

                <p>
                  {t(event.dateKey)}
                </p>
              </div>

              <span className="view">
                {t("view")}
                <b>›</b>
              </span>
            </button>
          ))
        ) : (
          <div className="empty">
            <div className="emptyIcon">
              🛕
            </div>

            <h2>
              {t("past")}
            </h2>

            <p>
              {t("noPastEvents")}
            </p>
          </div>
        )}
      </section>

      {/* DECORATION */}

      <div className="eventsDecoration">
        <span />
        <b>❧</b>
        <b>❧</b>
        <b>❧</b>
        <span />
      </div>

      <style jsx global>{`
        /* ==========================================
           PAGE
        ========================================== */

        .eventsScreen {
          width: 100%;

          min-height: 100dvh;

          padding-bottom:
            calc(
              30px +
              env(
                safe-area-inset-bottom
              )
            );

          background:
            radial-gradient(
              circle at 50% -10%,
              #fffef9 0,
              #fffaf0 42%,
              #f6ead5 100%
            );

          color:
            #4b4039;
        }

        .desktopHero {
          display: none;
        }

        /* ==========================================
           HEADER
        ========================================== */

        .eventsHeader {
          position: relative;

          height: 72px;

          display: flex;

          align-items: center;

          justify-content:
            space-between;

          padding:
            0 15px;

          border-bottom:
            1px solid
            #eadbc5;

          background:
            rgba(
              255,
              253,
              248,
              0.98
            );
        }

        .eventsBack {
          width: 38px;
          height: 38px;

          display: grid;

          place-items: center;

          flex-shrink: 0;

          padding: 0;

          border:
            1px solid
            #eadbc5;

          border-radius:
            50%;

          background:
            #fffdf8;

          color:
            #a71919;

          font-size: 29px;

          line-height: 1;

          box-shadow:
            0 3px 10px
            rgba(
              70,
              40,
              10,
              0.05
            );
        }

        .headerContent {
          flex: 1;

          text-align:
            center;
        }

        .headerEyebrow {
          display: none;
        }

        .eventsHeader h1 {
          margin: 0;

          color:
            #641010;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 23px;
        }

        .headerSpace {
          width: 38px;

          flex-shrink: 0;
        }

        /* ==========================================
           TABS
        ========================================== */

        .tabs {
          display: grid;

          grid-template-columns:
            repeat(
              2,
              minmax(0, 1fr)
            );

          gap: 8px;

          margin:
            14px 15px 12px;

          padding: 2px;

          border:
            1px solid
            #eadbc5;

          border-radius:
            10px;

          background:
            #fffdf8;

          box-shadow:
            0 4px 14px
            rgba(
              82,
              48,
              18,
              0.04
            );
        }

        .tabs button {
          height: 38px;

          border: 0;

          border-radius:
            8px;

          background:
            transparent;

          color:
            #776d65;

          font-size: 12px;

          font-weight: 700;

          transition:
            background
              0.18s ease,
            color
              0.18s ease,
            transform
              0.18s ease;
        }

        .tabs .activeTab {
          background:
            #a71919;

          color: white;

          box-shadow:
            0 4px 12px
            rgba(
              167,
              25,
              25,
              0.15
            );
        }

        /* ==========================================
           LIST
        ========================================== */

        .eventList {
          display: flex;

          flex-direction:
            column;

          gap: 9px;

          padding:
            0 15px;
        }

        /* ==========================================
           EVENT CARD
        ========================================== */

        .eventCard {
          width: 100%;

          min-height: 86px;

          display: flex;

          align-items:
            center;

          gap: 11px;

          padding: 8px;

          border:
            1px solid
            #eee0cc;

          border-radius:
            10px;

          background:
            #fffdf9;

          color:
            inherit;

          text-align: left;

          box-shadow:
            0 4px 14px
            rgba(
              79,
              43,
              14,
              0.04
            );

          transition:
            transform
              0.18s ease,
            box-shadow
              0.18s ease,
            border-color
              0.18s ease;
        }

        .eventImageWrap {
          width: 72px;
          height: 70px;

          flex-shrink: 0;

          overflow: hidden;

          border-radius:
            8px;

          background:
            #f4e5c8;
        }

        .eventImageWrap img {
          width: 100%;
          height: 100%;

          display: block;

          object-fit: cover;
        }

        .eventInfo {
          flex: 1;

          min-width: 0;
        }

        .eventLabel {
          display: none;
        }

        .eventInfo h2 {
          margin:
            0 0 5px;

          color:
            #332820;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 14px;

          line-height: 1.25;
        }

        .eventInfo p {
          margin: 0;

          color:
            #8a8077;

          font-size: 10px;
        }

        .view {
          display:
            inline-flex;

          align-items:
            center;

          justify-content:
            center;

          gap: 4px;

          padding:
            7px 9px;

          border-radius:
            6px;

          background:
            #fff0df;

          color:
            #a71919;

          font-size: 10px;

          font-weight: 700;

          white-space:
            nowrap;
        }

        .view b {
          font-size: 15px;

          line-height: 1;
        }

        /* ==========================================
           EMPTY
        ========================================== */

        .empty {
          padding:
            45px 15px;

          border:
            1px solid
            #eadbc5;

          border-radius:
            14px;

          background:
            #fffdf8;

          text-align:
            center;

          color:
            #8a8077;
        }

        .emptyIcon {
          width: 58px;
          height: 58px;

          display: grid;

          place-items:
            center;

          margin:
            0 auto 12px;

          border:
            1px solid
            #e5cfaa;

          border-radius:
            50%;

          background:
            #fff8eb;

          font-size: 27px;
        }

        .empty h2 {
          margin: 0;

          color:
            #641010;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 18px;
        }

        .empty p {
          margin:
            7px 0 0;

          font-size: 12px;
        }

        /* ==========================================
           DECORATION
        ========================================== */

        .eventsDecoration {
          display: flex;

          align-items:
            center;

          justify-content:
            center;

          gap: 6px;

          margin-top:
            24px;

          color:
            #c99435;
        }

        .eventsDecoration span {
          width: 48px;
          height: 1px;

          background:
            linear-gradient(
              to right,
              transparent,
              #d8b66c
            );
        }

        .eventsDecoration
          span:last-child {
          background:
            linear-gradient(
              to left,
              transparent,
              #d8b66c
            );
        }

        .eventsDecoration b {
          font-size: 13px;

          font-weight: 400;
        }

        /* ==========================================
           SMALL MOBILE
        ========================================== */

        @media (
          max-width: 359px
        ) {
          .eventsHeader {
            height: 64px;

            padding:
              0 10px;
          }

          .eventsBack {
            width: 34px;
            height: 34px;

            font-size: 26px;
          }

          .headerSpace {
            width: 34px;
          }

          .eventsHeader h1 {
            font-size: 20px;
          }

          .tabs {
            margin:
              12px 10px 10px;

            gap: 6px;
          }

          .eventList {
            gap: 7px;

            padding:
              0 10px;
          }

          .eventCard {
            min-height: 78px;

            gap: 8px;

            padding: 7px;
          }

          .eventImageWrap {
            width: 61px;
            height: 61px;
          }

          .eventInfo h2 {
            font-size: 12px;
          }

          .eventInfo p {
            font-size: 9px;
          }

          .view {
            padding:
              6px 7px;

            font-size: 9px;
          }
        }

        /* ==========================================
           LARGE MOBILE
        ========================================== */

        @media (
          min-width: 430px
        ) and (
          max-width: 599px
        ) {
          .eventsHeader {
            height: 78px;
          }

          .eventsHeader h1 {
            font-size: 25px;
          }

          .tabs {
            margin:
              17px 20px 14px;
          }

          .tabs button {
            height: 42px;

            font-size: 13px;
          }

          .eventList {
            gap: 11px;

            padding:
              0 20px;
          }

          .eventCard {
            min-height: 100px;

            gap: 13px;

            padding: 10px;

            border-radius:
              12px;
          }

          .eventImageWrap {
            width: 82px;
            height: 80px;

            border-radius:
              10px;
          }

          .eventInfo h2 {
            font-size: 16px;
          }

          .eventInfo p {
            font-size: 11px;
          }

          .view {
            padding:
              8px 10px;

            font-size: 11px;
          }
        }

        /* ==========================================
           TABLET
        ========================================== */

        @media (
          min-width: 600px
        ) and (
          max-width: 1023px
        ) {
          .eventsScreen {
            min-height:
              100vh;
          }

          .eventsHeader {
            height: 82px;

            padding:
              0 28px;
          }

          .eventsBack {
            width: 42px;
            height: 42px;
          }

          .headerSpace {
            width: 42px;
          }

          .eventsHeader h1 {
            font-size: 28px;
          }

          .tabs {
            width:
              min(
                calc(
                  100% - 48px
                ),
                760px
              );

            margin:
              22px auto 18px;

            padding: 3px;

            border-radius:
              12px;
          }

          .tabs button {
            height: 45px;

            font-size: 14px;
          }

          .eventList {
            width:
              min(
                calc(
                  100% - 48px
                ),
                760px
              );

            margin: 0 auto;

            gap: 13px;

            padding: 0;
          }

          .eventCard {
            min-height: 120px;

            gap: 17px;

            padding: 13px;

            border-radius:
              15px;
          }

          .eventImageWrap {
            width: 105px;
            height: 94px;

            border-radius:
              12px;
          }

          .eventLabel {
            display: block;

            margin-bottom:
              4px;

            color:
              #c99435;

            font-size: 9px;

            font-weight: 700;

            letter-spacing:
              1px;

            text-transform:
              uppercase;
          }

          .eventInfo h2 {
            font-size: 20px;
          }

          .eventInfo p {
            margin-top:
              7px;

            font-size: 12px;
          }

          .view {
            padding:
              9px 12px;

            border-radius:
              8px;

            font-size: 12px;
          }

          .empty {
            padding:
              70px 30px;

            border-radius:
              18px;
          }
        }

        /* ==========================================
           DESKTOP WEBSITE
        ========================================== */

        @media (
          min-width: 1024px
        ) {
          .eventsScreen {
            min-height:
              100vh;

            padding:
              0 40px 55px;

            background:
              radial-gradient(
                circle at top right,
                rgba(
                  201,
                  148,
                  53,
                  0.12
                ),
                transparent
                  30%
              ),
              #fff9ed;
          }

          .eventsHeader {
            height: 84px;

            margin:
              0 -40px;

            justify-content:
              flex-start;

            gap: 18px;

            padding:
              0 42px;

            background:
              #fffdf8;
          }

          .eventsBack {
            width: 44px;
            height: 44px;

            font-size: 31px;
          }

          .headerContent {
            flex: none;

            text-align: left;
          }

          .headerEyebrow {
            display: block;

            margin-bottom:
              2px;

            color:
              #9a762f;

            font-size: 10px;

            font-weight: 700;

            letter-spacing:
              1.3px;

            text-transform:
              uppercase;
          }

          .eventsHeader h1 {
            font-size: 26px;
          }

          .headerSpace {
            display: none;
          }

          /* HERO */

          .desktopHero {
            width: 100%;

            max-width:
              1320px;

            min-height:
              150px;

            display: flex;

            align-items:
              center;

            justify-content:
              space-between;

            gap: 30px;

            margin:
              30px auto 0;

            padding:
              28px 34px;

            border:
              1px solid
              #eadbc5;

            border-radius:
              22px;

            background:
              linear-gradient(
                135deg,
                #fffdf8,
                #fff3df
              );

            box-shadow:
              0 10px 30px
              rgba(
                80,
                45,
                15,
                0.06
              );
          }

          .desktopHero > div:first-child > span {
            display: block;

            margin-bottom:
              7px;

            color:
              #c99435;

            font-size: 11px;

            font-weight: 700;

            letter-spacing:
              1.4px;

            text-transform:
              uppercase;
          }

          .desktopHero h2 {
            margin: 0;

            color:
              #641010;

            font-family:
              Georgia,
              "Times New Roman",
              serif;

            font-size: 35px;
          }

          .desktopHero p {
            max-width:
              520px;

            margin:
              9px 0 0;

            color:
              #776d65;

            font-size: 14px;

            line-height: 1.5;
          }

          .heroIcon {
            width: 86px;
            height: 86px;

            display: grid;

            place-items:
              center;

            flex-shrink: 0;

            border:
              1px solid
              #dec182;

            border-radius:
              50%;

            background:
              #fffdf8;

            font-size: 42px;

            box-shadow:
              0 8px 22px
              rgba(
                96,
                57,
                18,
                0.08
              );
          }

          /* TABS */

          .tabs {
            width:
              min(
                520px,
                100%
              );

            margin:
              26px auto 24px;

            padding: 3px;

            border-radius:
              12px;
          }

          .tabs button {
            height: 46px;

            font-size: 14px;
          }

          .tabs button:hover {
            background:
              #fff1e7;

            color:
              #a71919;
          }

          .tabs .activeTab:hover {
            background:
              #a71919;

            color: white;
          }

          /* EVENT GRID */

          .eventList {
            width: 100%;

            max-width:
              1320px;

            display: grid;

            grid-template-columns:
              repeat(
                2,
                minmax(0, 1fr)
              );

            gap: 20px;

            margin: 0 auto;

            padding: 0;
          }

          .eventCard {
            min-height:
              165px;

            gap: 18px;

            padding: 16px;

            border-radius:
              17px;
          }

          .eventCard:hover {
            transform:
              translateY(-3px);

            border-color:
              #d7b97f;

            box-shadow:
              0 12px 30px
              rgba(
                79,
                43,
                14,
                0.09
              );
          }

          .eventImageWrap {
            width: 145px;
            height: 130px;

            border-radius:
              13px;
          }

          .eventLabel {
            display: block;

            margin-bottom:
              6px;

            color:
              #c99435;

            font-size: 10px;

            font-weight: 700;

            letter-spacing:
              1px;

            text-transform:
              uppercase;
          }

          .eventInfo h2 {
            font-size: 21px;
          }

          .eventInfo p {
            margin-top:
              8px;

            font-size: 12px;
          }

          .view {
            padding:
              9px 12px;

            border-radius:
              8px;

            font-size: 11px;
          }

          /* EMPTY DESKTOP */

          .empty {
            grid-column:
              1 / -1;

            min-height:
              320px;

            display: flex;

            flex-direction:
              column;

            align-items:
              center;

            justify-content:
              center;

            padding:
              40px;

            border-radius:
              20px;
          }

          .emptyIcon {
            width: 78px;
            height: 78px;

            margin-bottom:
              16px;

            font-size: 36px;
          }

          .empty h2 {
            font-size: 24px;
          }

          .empty p {
            font-size: 13px;
          }

          .eventsDecoration {
            margin-top:
              38px;
          }

          .eventsDecoration span {
            width: 100px;
          }
        }

        /* ==========================================
           LARGE DESKTOP
        ========================================== */

        @media (
          min-width: 1440px
        ) {
          .desktopHero,
          .eventList {
            max-width:
              1420px;
          }

          .desktopHero {
            min-height:
              160px;

            padding:
              32px 40px;
          }

          .desktopHero h2 {
            font-size: 39px;
          }

          .heroIcon {
            width: 94px;
            height: 94px;

            font-size: 46px;
          }

          .eventList {
            grid-template-columns:
              repeat(
                3,
                minmax(0, 1fr)
              );

            gap: 22px;
          }

          .eventCard {
            min-height:
              350px;

            flex-direction:
              column;

            align-items:
              stretch;

            gap: 14px;

            padding: 14px;
          }

          .eventImageWrap {
            width: 100%;
            height: 205px;

            border-radius:
              14px;
          }

          .eventInfo {
            padding:
              3px 4px 0;
          }

          .eventInfo h2 {
            font-size: 22px;
          }

          .eventInfo p {
            font-size: 13px;
          }

          .view {
            width: fit-content;

            margin:
              auto 4px 3px;
          }
        }
      `}</style>
    </main>
  );
}