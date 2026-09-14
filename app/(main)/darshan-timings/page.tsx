"use client";

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
  status: DarshanStatus;
};

const darshans: DarshanItem[] = [
  {
    nameKey: "mangala",
    time: "05:30 AM",
    status: "completed",
  },
  {
    nameKey: "shringar",
    time: "07:30 AM",
    status: "completed",
  },
  {
    nameKey: "gwal",
    time: "09:00 AM",
    status: "openNow",
  },
  {
    nameKey: "rajbhog",
    time: "12:15 PM",
    status: "upcoming",
  },
  {
    nameKey: "utthapan",
    time: "04:00 PM",
    status: "upcoming",
  },
  {
    nameKey: "bhog",
    time: "06:00 PM",
    status: "upcoming",
  },
  {
    nameKey: "sandhyaAarti",
    time: "07:30 PM",
    status: "upcoming",
  },
  {
    nameKey: "shayan",
    time: "09:00 PM",
    status: "upcoming",
  },
];

export default function DarshanTimings() {
  const router = useRouter();

  const { t } = useLanguage();

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

  return (
    <main className="screen">
      {/* HEADER */}

      <header className="header">
        <button
          type="button"
          className="back"
          onClick={() => router.back()}
          aria-label={t("back")}
        >
          ‹
        </button>

        <div className="heading">
          <div className="ornament">
            ✦
          </div>

          <h1>
            {t(
              "ashtakayamDarshan"
            )}
          </h1>

          <p>
            {t("todayDate")}
          </p>
        </div>

        <div className="headerSpace" />
      </header>

      {/* GOLD DIVIDER */}

      <div className="divider">
        <span />
        <b>✦</b>
        <span />
      </div>

      {/* DESKTOP INTRO */}

      <section className="desktopIntro">
        <div>
          <span className="eyebrow">
            {t("darshan")}
          </span>

          <h2>
            {t(
              "ashtakayamDarshan"
            )}
          </h2>

          <p>
            {t("todayDate")}
          </p>
        </div>

        <div className="introTemple">
          🛕
        </div>
      </section>

      {/* DARSHAN LIST */}

      <section className="list">
        {darshans.map(
          (darshan, index) => {
            const isCurrent =
              darshan.status ===
              "openNow";

            return (
              <div
                className={`row ${
                  isCurrent
                    ? "current"
                    : ""
                }`}
                key={
                  darshan.nameKey
                }
              >
                {/* TEMPLE */}

                <div className="imageWrap">
                  <div className="templeIcon">
                    🛕
                  </div>
                </div>

                {/* DETAILS */}

                <div className="details">
                  <span className="number">
                    {String(
                      index + 1
                    ).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <h2>
                    {t(
                      darshan.nameKey
                    )}
                  </h2>

                  <small>
                    {getStatusDescription(
                      darshan.status
                    )}
                  </small>
                </div>

                {/* TIME */}

                <div className="timeBox">
                  <strong>
                    {darshan.time}
                  </strong>

                  <span
                    className={`status ${
                      darshan.status ===
                      "completed"
                        ? "completed"
                        : darshan.status ===
                            "openNow"
                          ? "open"
                          : "upcoming"
                    }`}
                  >
                    {getStatusLabel(
                      darshan.status
                    )}
                  </span>
                </div>
              </div>
            );
          }
        )}
      </section>

      {/* FOOTER */}

      <div className="footerOrnament">
        <span />
        <b>ॐ</b>
        <span />
      </div>

      {/* NAVIGATION */}

      <nav className="nav">
        <button
          type="button"
          onClick={() =>
            router.push(
              "/dashboard"
            )
          }
        >
          <span>⌂</span>
          {t("home")}
        </button>

        <button
          type="button"
          className="active"
        >
          <span>◉</span>
          {t("darshan")}
        </button>

        <button
          type="button"
          onClick={() =>
            router.push(
              "/seva-donation"
            )
          }
        >
          <span>♨</span>
          {t("seva")}
        </button>

        <button
          type="button"
          onClick={() =>
            router.push("/reels")
          }
        >
          <span>▣</span>
          {t("reels")}
        </button>

        <button
          type="button"
          onClick={() =>
            router.push(
              "/dashboard"
            )
          }
        >
          <span>♙</span>
          {t("profile")}
        </button>
      </nav>

      <style jsx global>{`
        /* ==========================================
           PAGE
        ========================================== */

        .screen {
          min-height:
            100dvh;

          padding:
            8px 10px 82px;

          background:
            radial-gradient(
              circle at 50% -10%,
              #fffef9 0,
              #fffaf0 42%,
              #f6ead5 100%
            );

          color: #3d3028;
        }

        .desktopIntro {
          display: none;
        }

        /* ==========================================
           HEADER
        ========================================== */

        .header {
          height: 88px;

          display: flex;

          align-items: center;

          justify-content:
            space-between;
        }

        .back {
          width: 40px;
          height: 40px;

          display: grid;

          place-items:
            center;

          flex-shrink: 0;

          border:
            1px solid #ead9bc;

          border-radius:
            50%;

          background:
            rgba(
              255,
              253,
              247,
              0.92
            );

          color: #991919;

          font-size: 27px;

          line-height: 1;

          box-shadow:
            0 3px 12px
            rgba(
              91,
              53,
              19,
              0.07
            );
        }

        .heading {
          text-align: center;
        }

        .headerSpace {
          width: 40px;
        }

        .ornament {
          margin-bottom:
            1px;

          color: #c99435;

          font-size: 12px;
        }

        .heading h1 {
          margin: 0;

          color: #941616;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 22px;

          font-weight: 700;

          letter-spacing:
            -0.2px;
        }

        .heading p {
          margin:
            5px 0 0;

          color: #82766b;

          font-size: 11px;
        }

        /* ==========================================
           DIVIDER
        ========================================== */

        .divider {
          height: 15px;

          display: flex;

          align-items: center;

          justify-content:
            center;

          gap: 8px;

          margin-bottom:
            8px;
        }

        .divider span {
          width: 72px;

          height: 1px;

          background:
            linear-gradient(
              to right,
              transparent,
              #d9b66b
            );
        }

        .divider span:last-child {
          background:
            linear-gradient(
              to left,
              transparent,
              #d9b66b
            );
        }

        .divider b {
          color: #c99435;

          font-size: 10px;
        }

        /* ==========================================
           LIST
        ========================================== */

        .list {
          overflow: hidden;

          border:
            1px solid #e5cfaa;

          border-radius:
            17px;

          background:
            rgba(
              255,
              253,
              248,
              0.94
            );

          box-shadow:
            0 8px 25px
              rgba(
                79,
                43,
                14,
                0.08
              ),
            inset 0 0 0 1px
              rgba(
                255,
                255,
                255,
                0.7
              );
        }

        /* ==========================================
           ROW
        ========================================== */

        .row {
          min-height: 78px;

          display: flex;

          align-items: center;

          padding:
            8px 11px
            8px 10px;

          border-bottom:
            1px solid #ecdfca;

          transition:
            background 0.2s ease,
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .row:last-child {
          border-bottom: 0;
        }

        .row.current {
          background:
            linear-gradient(
              90deg,
              rgba(
                239,
                250,
                244,
                0.9
              ),
              rgba(
                255,
                253,
                248,
                0.9
              )
            );
        }

        /* ==========================================
           TEMPLE
        ========================================== */

        .imageWrap {
          width: 57px;

          display: flex;

          justify-content:
            center;

          flex-shrink: 0;
        }

        .templeIcon {
          width: 47px;
          height: 47px;

          display: grid;

          place-items:
            center;

          border:
            1px solid #d3ad62;

          border-radius:
            13px;

          background:
            linear-gradient(
              145deg,
              #fffdf7,
              #f5e5c6
            );

          font-size: 25px;

          box-shadow:
            0 3px 9px
              rgba(
                109,
                65,
                16,
                0.1
              ),
            inset 0 0 0 1px
              rgba(
                255,
                255,
                255,
                0.8
              );
        }

        /* ==========================================
           DETAILS
        ========================================== */

        .details {
          flex: 1;

          min-width: 0;

          padding-left:
            7px;
        }

        .number {
          display: block;

          margin-bottom:
            1px;

          color: #c99435;

          font-family:
            Georgia,
            serif;

          font-size: 8px;

          letter-spacing:
            1px;
        }

        .details h2 {
          margin: 0;

          color: #40342c;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 14px;

          font-weight: 700;
        }

        .details small {
          display: block;

          margin-top:
            3px;

          color: #9a8c7d;

          font-size: 8px;
        }

        /* ==========================================
           TIME
        ========================================== */

        .timeBox {
          width: 83px;

          display: flex;

          flex-direction:
            column;

          align-items:
            flex-start;

          gap: 5px;
        }

        .timeBox strong {
          color: #463a32;

          font-size: 11px;

          font-weight: 700;

          white-space:
            nowrap;
        }

        /* ==========================================
           STATUS
        ========================================== */

        .status {
          padding:
            4px 7px;

          border-radius:
            6px;

          font-size: 8px;

          font-weight: 700;

          white-space:
            nowrap;

          letter-spacing:
            0.1px;
        }

        .completed {
          border:
            1px solid #d8ecdf;

          background:
            #eef7f1;

          color: #4e9873;
        }

        .open {
          background:
            linear-gradient(
              135deg,
              #159b60,
              #087d48
            );

          color: white;

          box-shadow:
            0 3px 7px
            rgba(
              11,
              125,
              72,
              0.2
            );
        }

        .upcoming {
          border:
            1px solid #f5ddbc;

          background:
            #fff0d9;

          color: #cf813d;
        }

        /* ==========================================
           FOOTER
        ========================================== */

        .footerOrnament {
          height: 35px;

          display: flex;

          align-items: center;

          justify-content:
            center;

          gap: 9px;

          color: #c99435;
        }

        .footerOrnament span {
          width: 60px;

          height: 1px;

          background:
            linear-gradient(
              to right,
              transparent,
              #d8b66c
            );
        }

        .footerOrnament
          span:last-child {
          background:
            linear-gradient(
              to left,
              transparent,
              #d8b66c
            );
        }

        .footerOrnament b {
          font-family:
            Georgia,
            serif;

          font-size: 13px;

          font-weight: 400;
        }

        /* ==========================================
           BOTTOM NAV
        ========================================== */

        .nav {
          position: fixed;

          z-index: 50;

          left: 0;
          right: 0;
          bottom: 0;

          height:
            calc(
              64px +
              env(
                safe-area-inset-bottom
              )
            );

          display: grid;

          grid-template-columns:
            repeat(5, 1fr);

          padding-bottom:
            env(
              safe-area-inset-bottom
            );

          border-top:
            1px solid #e5d4b8;

          background:
            rgba(
              255,
              253,
              248,
              0.97
            );

          box-shadow:
            0 -5px 20px
            rgba(
              70,
              40,
              10,
              0.1
            );

          backdrop-filter:
            blur(12px);
        }

        .nav button {
          position: relative;

          display: flex;

          flex-direction:
            column;

          align-items: center;

          justify-content:
            center;

          gap: 4px;

          border: 0;

          background:
            transparent;

          color: #84786d;

          font-size: 9px;
        }

        .nav button span {
          font-size: 19px;

          line-height: 1;
        }

        .nav .active {
          color: #a71919;

          font-weight: 700;
        }

        .nav .active::before {
          content: "";

          position: absolute;

          top: 0;

          width: 27px;
          height: 2px;

          border-radius:
            0 0 5px 5px;

          background:
            #c99435;
        }

        /* ==========================================
           SMALL MOBILE
        ========================================== */

        @media (
          max-width: 359px
        ) {
          .screen {
            padding-left: 7px;
            padding-right: 7px;
          }

          .header {
            height: 78px;
          }

          .back {
            width: 36px;
            height: 36px;

            font-size: 24px;
          }

          .headerSpace {
            width: 36px;
          }

          .heading h1 {
            font-size: 19px;
          }

          .row {
            min-height: 72px;

            padding:
              7px 7px;
          }

          .imageWrap {
            width: 49px;
          }

          .templeIcon {
            width: 42px;
            height: 42px;

            font-size: 22px;
          }

          .details {
            padding-left:
              5px;
          }

          .details h2 {
            font-size: 12px;
          }

          .timeBox {
            width: 72px;
          }

          .timeBox strong {
            font-size: 10px;
          }

          .status {
            padding:
              3px 5px;

            font-size: 7px;
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
          .screen {
            padding:
              10px 16px 84px;
          }

          .header {
            height: 96px;
          }

          .heading h1 {
            font-size: 24px;
          }

          .heading p {
            font-size: 12px;
          }

          .row {
            min-height: 86px;

            padding:
              10px 15px;
          }

          .imageWrap {
            width: 64px;
          }

          .templeIcon {
            width: 52px;
            height: 52px;

            font-size: 28px;
          }

          .details h2 {
            font-size: 15px;
          }

          .details small {
            font-size: 9px;
          }

          .timeBox {
            width: 92px;
          }

          .timeBox strong {
            font-size: 12px;
          }

          .status {
            font-size: 9px;
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
          .screen {
            width: 100%;

            max-width: 820px;

            margin: 0 auto;

            padding:
              15px 24px 90px;
          }

          .header {
            height: 105px;
          }

          .back {
            width: 44px;
            height: 44px;
          }

          .headerSpace {
            width: 44px;
          }

          .heading h1 {
            font-size: 28px;
          }

          .heading p {
            font-size: 13px;
          }

          .divider {
            margin-bottom:
              14px;
          }

          .divider span {
            width: 105px;
          }

          .list {
            border-radius:
              20px;
          }

          .row {
            min-height: 98px;

            padding:
              12px 20px;
          }

          .imageWrap {
            width: 72px;
          }

          .templeIcon {
            width: 58px;
            height: 58px;

            border-radius:
              15px;

            font-size: 31px;
          }

          .details {
            padding-left:
              10px;
          }

          .number {
            font-size: 10px;
          }

          .details h2 {
            font-size: 18px;
          }

          .details small {
            margin-top: 5px;

            font-size: 11px;
          }

          .timeBox {
            width: 115px;

            gap: 7px;
          }

          .timeBox strong {
            font-size: 14px;
          }

          .status {
            padding:
              5px 9px;

            font-size: 10px;
          }

          .nav {
            left: 50%;
            right: auto;

            width: min(
              100%,
              820px
            );

            transform:
              translateX(-50%);
          }
        }

        /* ==========================================
           DESKTOP WEBSITE
        ========================================== */

        @media (
          min-width: 1024px
        ) {
          body {
            background:
              #f7efe3;
          }

          .screen {
            width: auto;

            min-height: 100vh;

            margin-left:
              92px;

            padding:
              28px 40px 45px;

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
              #fffaf0;
          }

          /* MOBILE HEADER HIDDEN */

          .header {
            display: none;
          }

          .divider {
            display: none;
          }

          /* DESKTOP HEADER */

          .desktopIntro {
            min-height:
              135px;

            display: flex;

            align-items:
              center;

            justify-content:
              space-between;

            gap: 25px;

            margin-bottom:
              26px;

            padding:
              25px 30px;

            border:
              1px solid #eadbc5;

            border-radius:
              20px;

            background:
              linear-gradient(
                135deg,
                #fffdf8,
                #fff5e5
              );

            box-shadow:
              0 8px 28px
              rgba(
                82,
                48,
                18,
                0.07
              );
          }

          .eyebrow {
            display: block;

            margin-bottom:
              6px;

            color: #c99435;

            font-size: 12px;

            font-weight: 700;

            letter-spacing:
              1.7px;

            text-transform:
              uppercase;
          }

          .desktopIntro h2 {
            margin: 0;

            color:
              var(--maroon);

            font-family:
              Georgia,
              "Times New Roman",
              serif;

            font-size: 34px;

            line-height: 1.1;
          }

          .desktopIntro p {
            margin:
              9px 0 0;

            color: #82766b;

            font-size: 14px;
          }

          .introTemple {
            width: 82px;
            height: 82px;

            display: grid;

            place-items:
              center;

            flex-shrink: 0;

            border:
              1px solid #dec182;

            border-radius:
              50%;

            background:
              #fffdf8;

            font-size: 41px;

            box-shadow:
              0 8px 22px
              rgba(
                96,
                57,
                18,
                0.08
              );
          }

          /* LIST */

          .list {
            display: grid;

            grid-template-columns:
              repeat(
                2,
                minmax(0, 1fr)
              );

            gap: 16px;

            overflow: visible;

            border: 0;

            border-radius: 0;

            background:
              transparent;

            box-shadow: none;
          }

          .row {
            min-height:
              118px;

            padding:
              16px 18px;

            border:
              1px solid #eadbc5;

            border-radius:
              16px;

            background:
              #fffdf8;

            box-shadow:
              0 5px 18px
              rgba(
                81,
                46,
                15,
                0.06
              );
          }

          .row:last-child {
            border:
              1px solid #eadbc5;
          }

          .row:hover {
            transform:
              translateY(-3px);

            border-color:
              #d9bc83;

            box-shadow:
              0 11px 28px
              rgba(
                81,
                46,
                15,
                0.1
              );
          }

          .row.current {
            border-color:
              #b9dec9;

            background:
              linear-gradient(
                110deg,
                #edf9f2,
                #fffdf8
              );
          }

          .imageWrap {
            width: 78px;
          }

          .templeIcon {
            width: 62px;
            height: 62px;

            border-radius:
              16px;

            font-size: 33px;
          }

          .details {
            padding-left:
              10px;
          }

          .number {
            margin-bottom:
              4px;

            font-size: 10px;
          }

          .details h2 {
            font-size: 20px;
          }

          .details small {
            margin-top:
              5px;

            font-size: 11px;
          }

          .timeBox {
            width: 115px;

            align-items:
              flex-end;

            gap: 8px;
          }

          .timeBox strong {
            font-size: 14px;
          }

          .status {
            padding:
              6px 10px;

            border-radius:
              7px;

            font-size: 10px;
          }

          .footerOrnament {
            height: 75px;
          }

          .footerOrnament span {
            width: 110px;
          }

          .footerOrnament b {
            font-size: 18px;
          }

          /* DESKTOP LEFT SIDEBAR */

          .nav {
            top: 0;
            bottom: 0;

            left: 0;
            right: auto;

            width: 92px;
            height: 100vh;

            display: flex;

            flex-direction:
              column;

            padding:
              90px 8px 18px;

            border-top: 0;

            border-right:
              1px solid #eadbc5;

            background:
              #fffdf8;

            box-shadow:
              3px 0 18px
              rgba(
                80,
                40,
                10,
                0.07
              );

            transform: none;
          }

          .nav button {
            width: 100%;

            min-height: 72px;

            flex: none;

            gap: 7px;

            padding:
              10px 4px;

            border-radius:
              10px;

            font-size: 11px;
          }

          .nav button:hover {
            background:
              #fff2dd;

            color:
              #a71919;
          }

          .nav button span {
            font-size: 25px;
          }

          .nav .active {
            background:
              #fbead3;

            color:
              #a71919;
          }

          .nav .active::before {
            top: auto;
            left: 0;

            width: 3px;
            height: 34px;

            border-radius:
              0 5px 5px 0;
          }
        }

        /* ==========================================
           LARGE DESKTOP
        ========================================== */

        @media (
          min-width: 1400px
        ) {
          .screen {
            margin-left:
              92px;

            padding:
              32px 50px 50px;
          }

          .desktopIntro {
            min-height:
              150px;

            padding:
              28px 36px;
          }

          .desktopIntro h2 {
            font-size: 38px;
          }

          .introTemple {
            width: 92px;
            height: 92px;

            font-size: 46px;
          }

          .list {
            grid-template-columns:
              repeat(
                2,
                minmax(0, 1fr)
              );

            gap: 20px;
          }

          .row {
            min-height:
              128px;

            padding:
              18px 22px;
          }

          .templeIcon {
            width: 68px;
            height: 68px;

            font-size: 36px;
          }

          .details h2 {
            font-size: 22px;
          }

          .details small {
            font-size: 12px;
          }

          .timeBox {
            width: 130px;
          }

          .timeBox strong {
            font-size: 15px;
          }

          .status {
            font-size: 11px;
          }
        }
      `}</style>
    </main>
  );
}