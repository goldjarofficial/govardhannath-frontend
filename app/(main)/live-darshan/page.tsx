"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useLanguage } from "../../lib/LanguageProvider";

/*
  Replace these IDs with actual YouTube Live video IDs.
*/
const streams = [
  {
    id: "YOUR_YOUTUBE_LIVE_ID_1",
    image: "/images/live-darshan-1.jpg",
  },
  {
    id: "YOUR_YOUTUBE_LIVE_ID_2",
    image: "/images/live-darshan-2.jpg",
  },
];

/*
  Chat content is user/backend generated,
  so it is not translated.
*/
const chats = [
  ["🙏", "Jai Shree Krishna", "Ramesh Patel"],
  ["🌸", "Radhe Radhe", "Meena Shah"],
  ["🙏", "Jai Shrinathji", "Aarti Doshi"],
  ["🌺", "Beautiful Darshan", "Pooja Mehta"],
];

export default function LiveDarshan() {
  const router = useRouter();
  const { t } = useLanguage();

  const [selected, setSelected] = useState(0);

  const stream = streams[selected];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: t("liveDarshan"),
          text: t("haveliName"),
          url: window.location.href,
        });
      } catch {
        // User cancelled share.
      }
    }
  };

  return (
    <main className="liveScreen">
      {/* =========================
          HEADER
      ========================== */}

      <header className="liveHeader">
        <button
          type="button"
          className="backButton"
          onClick={() => router.back()}
          aria-label={t("back")}
        >
          ‹
        </button>

        <div className="headerTitle">
          <h1>{t("liveDarshan")}</h1>

          <p>{t("haveliName")}</p>
        </div>

        <button
          type="button"
          className="shareButton"
          onClick={handleShare}
          aria-label={t("share")}
        >
          ↗
        </button>
      </header>

      {/* =========================
          DESKTOP HERO
      ========================== */}

      <section className="desktopHero">
        <div>
          <span className="heroLabel">
            {t("live")}
          </span>

          <h1>{t("liveDarshan")}</h1>

          <p>{t("haveliName")}</p>
        </div>

        <div className="heroLive">
          <span />
          {t("live")}
        </div>
      </section>

      {/* =========================
          MAIN CONTENT
      ========================== */}

      <div className="liveLayout">
        <div className="videoColumn">
          {/* =========================
              STREAM SELECTORS
          ========================== */}

          <section className="streamGrid">
            {streams.map((item, index) => (
              <button
                type="button"
                key={item.id}
                className={`streamCard ${
                  selected === index ? "selectedStream" : ""
                }`}
                onClick={() => setSelected(index)}
              >
                <img
                  src={item.image}
                  alt={`${t("liveDarshan")} ${index + 1}`}
                />

                <div className="streamShade" />

                <div className="liveBadge">
                  <span />
                  {t("live")}
                </div>

                <div className="viewer">
                  ◉ {t("live")}
                </div>
              </button>
            ))}
          </section>

          {/* =========================
              YOUTUBE PLAYER
          ========================== */}

          <section className="playerCard">
            <div className="playerHeader">
              <div>
                <span className="liveDot" />

                <b>{t("liveDarshan")}</b>
              </div>

              <span className="liveText">
                {t("live")}
              </span>
            </div>

            <div className="youtubePlayer">
              {stream.id.startsWith("YOUR_") ? (
                <div className="setupMessage">
                  <span>▶</span>

                  <b>YouTube Live</b>

                  <small>
                    {t("youtubeLiveSetup")}
                  </small>
                </div>
              ) : (
                <iframe
                  key={stream.id}
                  src={`https://www.youtube.com/embed/${stream.id}?playsinline=1&rel=0`}
                  title={t("liveDarshan")}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              )}
            </div>

            <div className="playerInfo">
              <div>
                <h2>{t("liveDarshan")}</h2>

                <p>{t("haveliName")}</p>
              </div>

              <div className="likes">
                ♡ 2.1K
              </div>
            </div>
          </section>
        </div>

        {/* =========================
            LIVE CHAT
        ========================== */}

        <section className="chatCard">
          <div className="chatTitle">
            <span className="chatDot" />

            {t("liveChat")}

            <span className="chatLive">
              {t("live")}
            </span>
          </div>

          <div className="chatList">
            {chats.map(([avatar, name, user]) => (
              <div
                className="chatRow"
                key={`${name}-${user}`}
              >
                <div className="avatar">
                  {avatar}
                </div>

                <div>
                  <b>{name}</b>

                  <span>{user}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="messageBox">
            <input
              type="text"
              placeholder={t("typeMessage")}
            />

            <button
              type="button"
              aria-label={t("sendMessage")}
            >
              ›
            </button>
          </div>
        </section>
      </div>

      {/* =========================
          DECORATION
      ========================== */}

      <div className="liveDecoration">
        <span />
        <b>ॐ</b>
        <span />
      </div>

      {/* =========================
          NAVIGATION
      ========================== */}

      <nav className="bottomNav">
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
        >
          <span>⌂</span>
          {t("home")}
        </button>

        <button
          type="button"
          className="navActive"
          onClick={() => router.push("/live-darshan")}
        >
          <span>◉</span>
          {t("darshan")}
        </button>

        <button
          type="button"
          onClick={() => router.push("/seva-donation")}
        >
          <span>♨</span>
          {t("seva")}
        </button>

        <button
          type="button"
          onClick={() => router.push("/reels")}
        >
          <span>▣</span>
          {t("reels")}
        </button>

        <button
          type="button"
          onClick={() => router.push("/dashboard")}
        >
          <span>♙</span>
          {t("profile")}
        </button>
      </nav>

      <style jsx global>{`
        /* =========================================
           SCREEN
        ========================================= */

        .liveScreen {
          width: 100%;
          min-height: 100dvh;

          padding:
            10px 10px
            calc(
              76px +
              env(safe-area-inset-bottom)
            );

          background:
            radial-gradient(
              circle at 50% -10%,
              #fffef9 0,
              #fffaf0 42%,
              #f6ead5 100%
            );

          color: #40372f;
        }

        .desktopHero {
          display: none;
        }

        /* =========================================
           HEADER
        ========================================= */

        .liveHeader {
          height: 55px;

          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .headerTitle {
          flex: 1;
          text-align: center;
        }

        .headerTitle h1 {
          margin: 0;

          color: #941616;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 21px;
        }

        .headerTitle p {
          margin: 3px 0 0;

          color: #81766d;

          font-size: 10px;
        }

        .backButton,
        .shareButton {
          width: 38px;
          height: 38px;

          display: grid;
          place-items: center;

          flex-shrink: 0;

          padding: 0;

          border: 1px solid #eadbc5;
          border-radius: 50%;

          background: #fffdf8;

          color: #a71919;

          line-height: 1;

          box-shadow:
            0 3px 10px
            rgba(70, 40, 10, 0.05);
        }

        .backButton {
          font-size: 27px;
        }

        .shareButton {
          font-size: 19px;
        }

        /* =========================================
           STREAMS
        ========================================= */

        .streamGrid {
          display: grid;

          grid-template-columns:
            repeat(2, minmax(0, 1fr));

          gap: 9px;

          margin-top: 6px;
        }

        .streamCard {
          position: relative;

          height: 135px;

          overflow: hidden;

          padding: 0;

          border: 2px solid transparent;

          border-radius: 14px;

          background: #eadbc5;

          box-shadow:
            0 4px 13px
            rgba(70, 40, 10, 0.1);

          transition:
            transform 0.18s ease,
            border-color 0.18s ease,
            box-shadow 0.18s ease;
        }

        .streamCard.selectedStream {
          border-color: #c99435;
        }

        .streamCard img {
          width: 100%;
          height: 100%;

          display: block;

          object-fit: cover;
        }

        .streamShade {
          position: absolute;
          inset: 0;

          background:
            linear-gradient(
              to bottom,
              transparent 45%,
              rgba(0, 0, 0, 0.55)
            );
        }

        .liveBadge {
          position: absolute;

          top: 8px;
          left: 8px;

          display: flex;
          align-items: center;

          padding: 5px 8px;

          border-radius: 6px;

          background: #d51b1b;

          color: white;

          font-size: 9px;
          font-weight: 700;
        }

        .liveBadge span {
          width: 6px;
          height: 6px;

          display: inline-block;

          margin-right: 4px;

          border-radius: 50%;

          background: white;
        }

        .viewer {
          position: absolute;

          top: 9px;
          right: 8px;

          color: white;

          font-size: 9px;
        }

        /* =========================================
           PLAYER
        ========================================= */

        .playerCard {
          margin-top: 12px;

          overflow: hidden;

          border: 1px solid #eadbc5;

          border-radius: 15px;

          background: #fffdf8;

          box-shadow:
            0 5px 18px
            rgba(70, 40, 10, 0.09);
        }

        .playerHeader {
          height: 40px;

          display: flex;

          align-items: center;
          justify-content: space-between;

          padding: 0 12px;

          background: #fff8e9;

          color: #8f1515;

          font-size: 11px;
        }

        .playerHeader > div {
          display: flex;
          align-items: center;
        }

        .liveDot {
          width: 7px;
          height: 7px;

          display: inline-block;

          margin-right: 6px;

          border-radius: 50%;

          background: #d51b1b;
        }

        .liveText {
          padding: 4px 8px;

          border-radius: 6px;

          background: #d51b1b;

          color: white;

          font-size: 8px;
          font-weight: 700;
        }

        /* =========================================
           YOUTUBE
        ========================================= */

        .youtubePlayer {
          position: relative;

          width: 100%;

          aspect-ratio: 16 / 9;

          background: #111;
        }

        .youtubePlayer iframe {
          width: 100%;
          height: 100%;

          display: block;

          border: 0;
        }

        .setupMessage {
          position: absolute;
          inset: 0;

          display: flex;

          flex-direction: column;

          align-items: center;
          justify-content: center;

          gap: 7px;

          padding: 20px;

          color: white;

          text-align: center;
        }

        .setupMessage span {
          color: #d51b1b;

          font-size: 34px;
        }

        .setupMessage b {
          font-size: 15px;
        }

        .setupMessage small {
          max-width: 230px;

          color: #c9c9c9;

          font-size: 10px;

          line-height: 1.4;
        }

        /* =========================================
           PLAYER INFO
        ========================================= */

        .playerInfo {
          display: flex;

          align-items: center;
          justify-content: space-between;

          gap: 15px;

          padding: 10px 12px;
        }

        .playerInfo h2 {
          margin: 0;

          color: #4a4038;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 16px;
        }

        .playerInfo p {
          margin: 3px 0 0;

          color: #8b8178;

          font-size: 10px;
        }

        .likes {
          flex-shrink: 0;

          color: #a71919;

          font-size: 12px;
        }

        /* =========================================
           CHAT
        ========================================= */

        .chatCard {
          margin-top: 12px;

          overflow: hidden;

          border: 1px solid #eadbc5;

          border-radius: 14px;

          background: #fffdf8;

          box-shadow:
            0 5px 18px
            rgba(70, 40, 10, 0.05);
        }

        .chatTitle {
          height: 43px;

          display: flex;

          align-items: center;

          gap: 7px;

          padding: 0 13px;

          border-bottom:
            1px solid #eadbc5;

          background: #fff8e9;

          color: #8f1515;

          font-size: 12px;
          font-weight: 700;
        }

        .chatDot {
          width: 7px;
          height: 7px;

          flex-shrink: 0;

          border-radius: 50%;

          background: #d51b1b;
        }

        .chatLive {
          margin-left: auto;

          padding: 4px 7px;

          border-radius: 5px;

          background: #d51b1b;

          color: white;

          font-size: 8px;
        }

        .chatList {
          padding: 5px 12px;
        }

        .chatRow {
          display: flex;

          align-items: center;

          gap: 9px;

          padding: 6px 0;
        }

        .avatar {
          width: 34px;
          height: 34px;

          display: grid;
          place-items: center;

          flex-shrink: 0;

          border: 1px solid #ead8ba;

          border-radius: 50%;

          background: #fff7e9;

          font-size: 16px;
        }

        .chatRow b,
        .chatRow span {
          display: block;
        }

        .chatRow b {
          color: #443b34;

          font-size: 11px;
        }

        .chatRow span {
          margin-top: 2px;

          color: #91877d;

          font-size: 9px;
        }

        /* =========================================
           MESSAGE BOX
        ========================================= */

        .messageBox {
          display: flex;

          gap: 7px;

          padding:
            5px 12px 11px;
        }

        .messageBox input {
          min-width: 0;

          flex: 1;

          height: 38px;

          padding: 0 13px;

          border: 1px solid #eadbc5;

          border-radius: 20px;

          outline: 0;

          background: #fffdf9;

          color: #40372f;

          font-size: 11px;
        }

        .messageBox input:focus {
          border-color: #c99435;

          box-shadow:
            0 0 0 3px
            rgba(201, 148, 53, 0.08);
        }

        .messageBox button {
          width: 38px;
          height: 38px;

          display: grid;
          place-items: center;

          flex-shrink: 0;

          padding: 0;

          border: 0;

          border-radius: 50%;

          background: #a71919;

          color: white;

          font-size: 24px;
        }

        /* =========================================
           DECORATION
        ========================================= */

        .liveDecoration {
          height: 38px;

          display: flex;

          align-items: center;
          justify-content: center;

          gap: 9px;

          color: #c99435;
        }

        .liveDecoration span {
          width: 55px;
          height: 1px;

          background:
            linear-gradient(
              to right,
              transparent,
              #d8b66c
            );
        }

        .liveDecoration span:last-child {
          background:
            linear-gradient(
              to left,
              transparent,
              #d8b66c
            );
        }

        .liveDecoration b {
          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 13px;

          font-weight: 400;
        }

        /* =========================================
           BOTTOM NAV
        ========================================= */

        .bottomNav {
          position: fixed;

          z-index: 50;

          left: 0;
          right: 0;
          bottom: 0;

          height:
            calc(
              64px +
              env(safe-area-inset-bottom)
            );

          display: grid;

          grid-template-columns:
            repeat(5, 1fr);

          padding-bottom:
            env(safe-area-inset-bottom);

          border-top:
            1px solid #eadbc5;

          background:
            rgba(
              255,
              253,
              248,
              0.98
            );

          box-shadow:
            0 -3px 14px
            rgba(80, 40, 10, 0.08);

          backdrop-filter: blur(12px);
        }

        .bottomNav button {
          position: relative;

          display: flex;

          flex-direction: column;

          align-items: center;
          justify-content: center;

          gap: 3px;

          border: 0;

          background: transparent;

          color: #766c63;

          font-size: 9px;
        }

        .bottomNav button span {
          font-size: 20px;

          line-height: 1;
        }

        .bottomNav .navActive {
          color: #a71919;

          font-weight: 700;
        }

        .bottomNav .navActive::before {
          content: "";

          position: absolute;

          top: 0;

          width: 27px;
          height: 2px;

          border-radius:
            0 0 5px 5px;

          background: #c99435;
        }

        /* =========================================
           SMALL MOBILE
        ========================================= */

        @media (max-width: 359px) {
          .liveScreen {
            padding:
              7px 7px
              calc(
                74px +
                env(safe-area-inset-bottom)
              );
          }

          .liveHeader {
            height: 51px;
          }

          .backButton,
          .shareButton {
            width: 34px;
            height: 34px;
          }

          .backButton {
            font-size: 24px;
          }

          .shareButton {
            font-size: 17px;
          }

          .headerTitle h1 {
            font-size: 18px;
          }

          .headerTitle p {
            font-size: 8px;
          }

          .streamGrid {
            gap: 6px;
          }

          .streamCard {
            height: 112px;

            border-radius: 11px;
          }

          .liveBadge {
            top: 6px;
            left: 6px;

            padding: 4px 6px;

            font-size: 8px;
          }

          .viewer {
            top: 7px;
            right: 6px;

            font-size: 8px;
          }

          .playerCard,
          .chatCard {
            margin-top: 9px;
          }

          .playerInfo h2 {
            font-size: 14px;
          }

          .playerInfo p {
            font-size: 9px;
          }
        }

        /* =========================================
           LARGE MOBILE
        ========================================= */

        @media (min-width: 430px) and (max-width: 599px) {
          .liveScreen {
            padding:
              12px 16px
              calc(
                80px +
                env(safe-area-inset-bottom)
              );
          }

          .liveHeader {
            height: 65px;
          }

          .headerTitle h1 {
            font-size: 24px;
          }

          .headerTitle p {
            font-size: 11px;
          }

          .streamGrid {
            gap: 11px;

            margin-top: 9px;
          }

          .streamCard {
            height: 155px;

            border-radius: 15px;
          }

          .playerCard,
          .chatCard {
            margin-top: 15px;
          }

          .playerHeader {
            height: 44px;

            padding: 0 15px;

            font-size: 12px;
          }

          .playerInfo {
            padding: 13px 15px;
          }

          .playerInfo h2 {
            font-size: 18px;
          }

          .chatTitle {
            height: 47px;

            padding: 0 15px;
          }

          .chatList {
            padding: 7px 15px;
          }

          .chatRow {
            padding: 8px 0;
          }

          .avatar {
            width: 38px;
            height: 38px;
          }

          .chatRow b {
            font-size: 12px;
          }

          .chatRow span {
            font-size: 10px;
          }
        }

        /* =========================================
           TABLET
        ========================================= */

        @media (min-width: 600px) and (max-width: 1023px) {
          .liveScreen {
            width: 100%;

            max-width: 820px;

            margin: 0 auto;

            padding:
              15px 24px
              calc(
                90px +
                env(safe-area-inset-bottom)
              );
          }

          .liveHeader {
            height: 75px;
          }

          .backButton,
          .shareButton {
            width: 43px;
            height: 43px;
          }

          .headerTitle h1 {
            font-size: 28px;
          }

          .headerTitle p {
            font-size: 12px;
          }

          .streamGrid {
            gap: 15px;

            margin-top: 12px;
          }

          .streamCard {
            height: 210px;

            border-radius: 18px;
          }

          .liveBadge {
            top: 12px;
            left: 12px;

            padding: 6px 9px;

            font-size: 10px;
          }

          .viewer {
            top: 13px;
            right: 12px;

            font-size: 10px;
          }

          .playerCard {
            margin-top: 18px;

            border-radius: 18px;
          }

          .playerHeader {
            height: 48px;

            padding: 0 17px;

            font-size: 13px;
          }

          .playerInfo {
            padding: 15px 17px;
          }

          .playerInfo h2 {
            font-size: 20px;
          }

          .playerInfo p {
            font-size: 11px;
          }

          .likes {
            font-size: 14px;
          }

          .chatCard {
            margin-top: 18px;

            border-radius: 18px;
          }

          .chatTitle {
            height: 49px;

            padding: 0 17px;

            font-size: 13px;
          }

          .chatList {
            padding: 8px 17px;
          }

          .chatRow {
            padding: 9px 0;
          }

          .avatar {
            width: 41px;
            height: 41px;
          }

          .chatRow b {
            font-size: 13px;
          }

          .chatRow span {
            font-size: 10px;
          }

          .messageBox {
            padding:
              8px 17px 15px;
          }

          .messageBox input {
            height: 43px;

            font-size: 12px;
          }

          .messageBox button {
            width: 43px;
            height: 43px;
          }

          .bottomNav {
            left: 50%;
            right: auto;

            width: min(100%, 820px);

            transform: translateX(-50%);
          }
        }

        /* =========================================
           DESKTOP WEBSITE
        ========================================= */

        @media (min-width: 1024px) {
          body {
            background: #f7efe3;
          }

          .liveScreen {
            width: auto;

            min-height: 100vh;

            margin-left: 92px;

            padding:
              28px 40px 48px;

            background:
              radial-gradient(
                circle at top right,
                rgba(201, 148, 53, 0.12),
                transparent 30%
              ),
              #fffaf0;
          }

          /* Mobile header */

          .liveHeader {
            display: none;
          }

          /* Desktop hero */

          .desktopHero {
            min-height: 135px;

            display: flex;

            align-items: center;
            justify-content: space-between;

            gap: 25px;

            margin-bottom: 26px;

            padding: 25px 30px;

            border: 1px solid #eadbc5;

            border-radius: 20px;

            background:
              linear-gradient(
                135deg,
                #fffdf8,
                #fff5e5
              );

            box-shadow:
              0 8px 28px
              rgba(82, 48, 18, 0.07);
          }

          .heroLabel {
            display: inline-flex;

            align-items: center;

            gap: 6px;

            margin-bottom: 7px;

            padding: 5px 9px;

            border-radius: 6px;

            background: #d51b1b;

            color: white;

            font-size: 9px;

            font-weight: 700;

            text-transform: uppercase;
          }

          .desktopHero h1 {
            margin: 0;

            color: #641010;

            font-family:
              Georgia,
              "Times New Roman",
              serif;

            font-size: 34px;
          }

          .desktopHero p {
            margin: 8px 0 0;

            color: #776d65;

            font-size: 14px;
          }

          .heroLive {
            min-width: 100px;

            height: 42px;

            display: flex;

            align-items: center;
            justify-content: center;

            gap: 7px;

            padding: 0 15px;

            border-radius: 999px;

            background: #d51b1b;

            color: white;

            font-size: 11px;

            font-weight: 700;
          }

          .heroLive span {
            width: 8px;
            height: 8px;

            border-radius: 50%;

            background: white;
          }

          /* Main desktop layout */

          .liveLayout {
            display: grid;

            grid-template-columns:
              minmax(0, 1fr)
              minmax(300px, 360px);

            align-items: start;

            gap: 24px;
          }

          .videoColumn {
            min-width: 0;
          }

          /* Streams */

          .streamGrid {
            gap: 16px;

            margin-top: 0;
          }

          .streamCard {
            height: 210px;

            border-radius: 17px;
          }

          .streamCard:hover {
            transform: translateY(-2px);

            box-shadow:
              0 9px 24px
              rgba(70, 40, 10, 0.13);
          }

          .liveBadge {
            top: 12px;
            left: 12px;

            padding: 6px 9px;

            font-size: 10px;
          }

          .viewer {
            top: 13px;
            right: 12px;

            font-size: 10px;
          }

          /* Player */

          .playerCard {
            margin-top: 20px;

            border-radius: 18px;
          }

          .playerHeader {
            height: 48px;

            padding: 0 17px;

            font-size: 13px;
          }

          .liveText {
            padding: 5px 9px;

            font-size: 9px;
          }

          .playerInfo {
            padding: 15px 18px;
          }

          .playerInfo h2 {
            font-size: 20px;
          }

          .playerInfo p {
            margin-top: 5px;

            font-size: 11px;
          }

          .likes {
            font-size: 14px;
          }

          /* Chat on right */

          .chatCard {
            position: sticky;

            top: 28px;

            height: 100%;

            min-height: 560px;

            display: flex;

            flex-direction: column;

            margin-top: 0;

            border-radius: 18px;

            box-shadow:
              0 8px 25px
              rgba(70, 40, 10, 0.07);
          }

          .chatTitle {
            height: 52px;

            flex-shrink: 0;

            padding: 0 17px;

            font-size: 13px;
          }

          .chatList {
            flex: 1;

            padding: 10px 17px;

            overflow-y: auto;
          }

          .chatRow {
            padding: 11px 0;

            border-bottom:
              1px solid #f1e5d3;
          }

          .chatRow:last-child {
            border-bottom: 0;
          }

          .avatar {
            width: 42px;
            height: 42px;

            font-size: 18px;
          }

          .chatRow b {
            font-size: 13px;
          }

          .chatRow span {
            margin-top: 3px;

            font-size: 10px;
          }

          .messageBox {
            flex-shrink: 0;

            padding:
              12px 15px 15px;

            border-top:
              1px solid #eadbc5;
          }

          .messageBox input {
            height: 44px;

            padding: 0 16px;

            font-size: 12px;
          }

          .messageBox button {
            width: 44px;
            height: 44px;
          }

          .liveDecoration {
            height: 70px;
          }

          .liveDecoration span {
            width: 100px;
          }

          .liveDecoration b {
            font-size: 18px;
          }

          /* Desktop left navigation */

          .bottomNav {
            top: 0;
            bottom: 0;

            left: 0;
            right: auto;

            width: 92px;
            height: 100vh;

            display: flex;

            flex-direction: column;

            padding:
              90px 8px 18px;

            border-top: 0;

            border-right:
              1px solid #eadbc5;

            background: #fffdf8;

            box-shadow:
              3px 0 18px
              rgba(80, 40, 10, 0.07);

            transform: none;
          }

          .bottomNav button {
            width: 100%;

            min-height: 72px;

            flex: none;

            gap: 7px;

            padding: 10px 4px;

            border-radius: 10px;

            font-size: 11px;
          }

          .bottomNav button span {
            font-size: 25px;
          }

          .bottomNav button:hover {
            background: #fff2dd;

            color: #a71919;
          }

          .bottomNav .navActive {
            background: #fbead3;

            color: #a71919;
          }

          .bottomNav .navActive::before {
            top: auto;

            left: 0;

            width: 3px;
            height: 34px;

            border-radius:
              0 5px 5px 0;
          }
        }

        /* =========================================
           LARGE DESKTOP
        ========================================= */

        @media (min-width: 1400px) {
          .liveScreen {
            padding:
              32px 50px 50px;
          }

          .desktopHero {
            min-height: 150px;

            padding: 28px 36px;
          }

          .desktopHero h1 {
            font-size: 38px;
          }

          .liveLayout {
            grid-template-columns:
              minmax(0, 1fr)
              390px;

            gap: 30px;
          }

          .streamCard {
            height: 250px;
          }

          .playerHeader {
            height: 52px;
          }

          .playerInfo {
            padding: 17px 20px;
          }

          .playerInfo h2 {
            font-size: 22px;
          }

          .chatCard {
            min-height: 640px;
          }

          .chatTitle {
            height: 55px;

            font-size: 14px;
          }

          .chatRow {
            padding: 13px 0;
          }

          .avatar {
            width: 45px;
            height: 45px;
          }
        }
      `}</style>
    </main>
  );
}