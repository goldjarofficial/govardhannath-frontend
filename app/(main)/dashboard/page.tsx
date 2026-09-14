"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useLanguage } from "../../lib/LanguageProvider";
import type { TranslationKey } from "../../lib/i18n";

const styles = {
  screen: "screen",
  header: "header",
  user: "user",
  logo: "logo",
  greeting: "greeting",
  name: "name",
  bell: "bell",
  liveCard: "liveCard",
  liveBar: "liveBar",
  next: "next",
  nextTemple: "nextTemple",
  miniTemple: "miniTemple",
  schedule: "schedule",
  scheduleTop: "scheduleTop",
  grid: "grid",
  action: "action",
  actionIcon: "actionIcon",
  actionText: "actionText",
  decoration: "decoration",
  nav: "nav",
  active: "active",
  drawerOverlay: "drawerOverlay",
  drawer: "drawer",
  drawerHeader: "drawerHeader",
  profilePhoto: "profilePhoto",
  close: "close",
  menu: "menu",
  menuActive: "menuActive",
} as const;

const menu = [
  ["⌂", "Home"],
  ["▶", "Live Darshan"],
  ["♨", "Seva & Donation"],
  ["🐄", "Go Seva"],
  ["◷", "Darshan Timings"],
  ["▣", "Events & Utsav"],
  ["♨", "Prasadam"],
  ["▣", "Reels & Bhakti"],
  ["▤", "Temple Information"],
  ["▣", "My Bookings"],
  ["♨", "My Donations"],
  ["♡", "Notifications"],
  ["⚙", "Settings"],
  ["?", "Help & Support"],
  ["↪", "Logout"],
] as const;

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

const actionLabels: Record<
  string,
  [TranslationKey, TranslationKey?]
> = {
  Live: ["liveDarshan", "darshan"],
  "Seva &": ["seva", "donation"],
  "Go Seva": ["goSeva"],
  Darshan: ["darshan", "darshanTimings"],
  "Events &": ["events"],
  "Reels &": ["reelsBhakti"],
  Prasadam: ["prasadam"],
  More: ["more"],
};

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

  if (name === "headset") {
    return (
      <svg {...common}>
        <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
        <path d="M4 13h3v6H5a1 1 0 0 1-1-1z" />
        <path d="M20 13h-3v6h2a1 1 0 0 1 1-1z" />
      </svg>
    );
  }

  if (name === "seva") {
    return (
      <svg {...common}>
        <path d="M5 12h14l-2 7H7z" />
        <path d="M8 12c0-3 2-5 4-5s4 2 4 5" />
      </svg>
    );
  }

  if (name === "clock") {
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }

  if (name === "gift") {
    return (
      <svg {...common}>
        <rect x="4" y="9" width="16" height="11" rx="1" />
        <path d="M12 9v11M3 9h18v4H3z" />
      </svg>
    );
  }

  if (name === "play") {
    return (
      <svg {...common}>
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="m10 8 6 4-6 4z" />
      </svg>
    );
  }

  if (name === "food") {
    return (
      <svg {...common}>
        <path d="M4 13h16" />
        <path d="M6 13c0 4 2 6 6 6s6-2 6-6" />
        <path d="M8 9c1-3 7-3 8 0" />
      </svg>
    );
  }

  if (name === "cow") {
    return (
      <svg {...common}>
        <path d="M5 10c0-3 2-5 7-5s7 2 7 5v6c0 2-2 3-7 3s-7-1-7-3z" />
        <path d="M5 11 3 9M19 11l2-2" />
        <circle cx="9" cy="11" r=".7" fill="currentColor" />
        <circle cx="15" cy="11" r=".7" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <rect x="4" y="4" width="5" height="5" rx="1" />
      <rect x="15" y="4" width="5" height="5" rx="1" />
      <rect x="4" y="15" width="5" height="5" rx="1" />
      <rect x="15" y="15" width="5" height="5" rx="1" />
    </svg>
  );
}

const actionRoutes: Record<string, string> = {
  Live: "/live-darshan",
  "Seva &": "/seva-donation",
  "Go Seva": "/seva/go-seva",
  Darshan: "/darshan-timings",
  "Events &": "/events",
  "Reels &": "/reels",
  Prasadam: "/prasadam",
};

const menuRoutes: Record<string, string> = {
  "Live Darshan": "/live-darshan",
  "Seva & Donation": "/seva-donation",
  "Go Seva": "/seva/go-seva",
  "Darshan Timings": "/darshan-timings",
  "Events & Utsav": "/events",
  Prasadam: "/prasadam",
  "Reels & Bhakti": "/reels",
  "Temple Information": "/temple-information",
  "My Bookings": "/my-bookings",
  "My Donations": "/my-donations",
  Notifications: "/notifications",
  Settings: "/settings",
  "Help & Support": "/help",
};

const menuLabels: Record<string, TranslationKey> = {
  Home: "home",
  "Live Darshan": "liveDarshan",
  "Seva & Donation": "sevaDonation",
  "Go Seva": "goSeva",
  "Darshan Timings": "darshanTimings",
  "Events & Utsav": "events",
  Prasadam: "prasadam",
  "Reels & Bhakti": "reelsBhakti",
  "Temple Information": "templeInformation",
  "My Bookings": "myBookings",
  "My Donations": "myDonations",
  Notifications: "notifications",
  Settings: "settings",
  "Help & Support": "helpSupport",
  Logout: "logout",
};

export default function Dashboard() {
  const router = useRouter();
  const { t } = useLanguage();

  const [drawer, setDrawer] = useState(false);

  const openDrawer = () => setDrawer(true);
  const closeDrawer = () => setDrawer(false);

  return (
    <main className={styles.screen}>
      <header className={styles.header}>
        <div className={styles.user}>
          <div className={styles.logo}>🛕</div>

          <div>
            <div className={styles.greeting}>
              {t("jaiShreeKrishna")}
            </div>

            <div className={styles.name}>
              {t("namasteKrishna")}
            </div>
          </div>
        </div>

        <button
          type="button"
          className={styles.bell}
          onClick={() => router.push("/notifications")}
          aria-label={t("notifications")}
        >
          ♧
          <i />
        </button>
      </header>

      <button
        type="button"
        className={styles.liveCard}
        onClick={() => router.push("/live-darshan")}
      >
        <img
          src="/images/haveli.jpg"
          alt="Shri Govardhannath Haveli"
        />

        <div className={styles.liveBar}>
          <strong>🙏 {t("liveDarshanNow")}</strong>
          <span>• {t("live")}</span>
        </div>
      </button>

      <section className={styles.next}>
        <div>
          <h2>{t("nextDarshan")}</h2>

          <div className={styles.nextTemple}>
            <div className={styles.miniTemple}>🛕</div>

            <div>
              <b>{t("rajbhog")}</b>
              <span>{t("today")}</span>
            </div>
          </div>
        </div>

        <div className={styles.schedule}>
          <div className={styles.scheduleTop}>
            <b>{t("rajbhog")}</b>
            <span>12:15 PM</span>
          </div>

          <strong>02:45:20</strong>

          <button
            type="button"
            onClick={() => router.push("/darshan-timings")}
          >
            {t("viewSchedule")} ›
          </button>
        </div>
      </section>

      <section className={styles.grid}>
        {actions.map(([icon, title]) => {
          const route = actionRoutes[title];
          const labels = actionLabels[title];

          return (
            <button
              type="button"
              key={title}
              className={styles.action}
              onClick={() => {
                if (title === "More") {
                  openDrawer();
                  return;
                }

                if (route) {
                  router.push(route);
                }
              }}
            >
              <span className={styles.actionIcon}>
                <Icon name={icon} />
              </span>

              <span className={styles.actionText}>
                <b>{t(labels[0])}</b>
                {labels[1] && <b>{t(labels[1])}</b>}
              </span>
            </button>
          );
        })}
      </section>

      <div className={styles.decoration}>
        ❧ ❧ ❧ ❧ ❧
      </div>

      <nav className={styles.nav}>
        <button
          type="button"
          className={styles.active}
          onClick={() => router.push("/dashboard")}
        >
          <span>⌂</span>
          {t("home")}
        </button>

        <button
          type="button"
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
          onClick={openDrawer}
        >
          <span>♙</span>
          {t("profile")}
        </button>
      </nav>

      {drawer && (
        <div
          className={styles.drawerOverlay}
          onClick={closeDrawer}
        >
          <aside
            className={styles.drawer}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.drawerHeader}>
              <div className={styles.profilePhoto}>
                👤
              </div>

              <div>
                <h2>Krishna Sharma</h2>
                <p>+91 8080232328</p>
              </div>

              <button
                type="button"
                className={styles.close}
                onClick={closeDrawer}
              >
                ×
              </button>
            </div>

            <div className={styles.menu}>
              {menu.map(([icon, title], index) => (
                <button
                  type="button"
                  key={title}
                  className={
                    index === 0
                      ? styles.menuActive
                      : ""
                  }
                  onClick={() => {
                    if (title === "Home") {
                      closeDrawer();
                      router.push("/dashboard");
                      return;
                    }

                    if (title === "Logout") {
                      closeDrawer();
                      router.push("/login");
                      return;
                    }

                    const route =
                      menuRoutes[title];

                    if (route) {
                      closeDrawer();
                      router.push(route);
                    }
                  }}
                >
                  <span>{icon}</span>
                  <b>{t(menuLabels[title])}</b>
                </button>
              ))}
            </div>
          </aside>
        </div>
      )}

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
          padding: 0;
          width: 100%;
          min-height: 100%;
        }

        body {
          overflow-x: hidden;
        }

        button {
          font-family: inherit;
        }

        .screen {
          min-height: 100dvh;
          padding: 12px 10px 84px;
          background: #fffaf0;
          color: #40372f;
        }

        .header {
          width: 100%;
          min-height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .user {
          min-width: 0;
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .logo {
          width: 42px;
          height: 42px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border: 1px solid #e2c990;
          border-radius: 50%;
          background: #fffdf8;
          font-size: 21px;
        }

        .greeting {
          color: #756a60;
          font-size: 11px;
          font-weight: 600;
          white-space: nowrap;
        }

        .name {
          margin-top: 2px;
          color: #302923;
          font-family: Georgia, serif;
          font-size: 15px;
          font-weight: 700;
          white-space: nowrap;
        }

        .bell {
          position: relative;
          width: 40px;
          height: 40px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          padding: 0;
          border: 1px solid #eadbc5;
          border-radius: 50%;
          background: #fffdf8;
          color: #a71919;
          cursor: pointer;
          font-size: 20px;
        }

        .bell i {
          position: absolute;
          top: 7px;
          right: 7px;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #d4871f;
        }

        .liveCard {
          position: relative;
          width: 100%;
          height: 165px;
          display: block;
          padding: 0;
          overflow: hidden;
          border: 0;
          border-radius: 14px;
          background: #e8d8bc;
          cursor: pointer;
          box-shadow:
            0 5px 18px rgba(86, 47, 20, 0.08);
        }

        .liveCard img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }

        .liveBar {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          min-height: 48px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 12px;
          padding: 20px 12px 10px;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(70, 15, 12, 0.45) 28%,
            rgba(132, 19, 19, 0.95) 100%
          );
          color: white;
        }

        .liveBar strong {
          font-size: 14px;
        }

        .liveBar span {
          flex-shrink: 0;
          padding: 4px 8px;
          border-radius: 7px;
          background: #a71919;
          font-size: 10px;
          font-weight: 700;
        }

        .next {
          width: 100%;
          min-height: 108px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 16px 5px 10px;
        }

        .next h2 {
          margin: 0 0 9px;
          color: #40372f;
          font-family: Georgia, serif;
          font-size: 17px;
        }

        .nextTemple {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .miniTemple {
          width: 67px;
          height: 42px;
          display: grid;
          place-items: center;
          font-size: 28px;
          opacity: 0.75;
        }

        .nextTemple b,
        .nextTemple span {
          display: block;
        }

        .nextTemple b {
          font-size: 12px;
        }

        .nextTemple span {
          margin-top: 4px;
          color: #81766d;
          font-size: 10px;
        }

        .schedule {
          min-width: 140px;
          text-align: right;
        }

        .scheduleTop {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          font-size: 11px;
        }

        .scheduleTop span {
          color: #514941;
        }

        .schedule > strong {
          display: inline-block;
          margin: 6px 0;
          padding: 5px 12px;
          border-radius: 5px;
          background: #dff0df;
          color: #47784e;
          font-size: 14px;
          letter-spacing: 0.5px;
        }

        .schedule button {
          display: block;
          margin-left: auto;
          padding: 4px 0;
          border: 0;
          background: transparent;
          color: #a71919;
          cursor: pointer;
          font-size: 11px;
          font-weight: 600;
        }

        .grid {
          width: 100%;
          display: grid;
          grid-template-columns:
            repeat(4, minmax(0, 1fr));
          gap: 8px;
        }

        .action {
          min-width: 0;
          height: 82px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 8px 4px;
          border: 1px solid #f0e3d0;
          border-radius: 10px;
          background: #fffdf9;
          color: #a71919;
          cursor: pointer;
          box-shadow:
            0 2px 8px rgba(100, 60, 10, 0.04);
          transition:
            transform 0.18s ease,
            box-shadow 0.18s ease,
            border-color 0.18s ease;
        }

        .action:active {
          transform: scale(0.97);
        }

        .actionIcon {
          height: 29px;
          display: grid;
          place-items: center;
        }

        .actionIcon svg {
          width: 24px;
          height: 24px;
        }

        .actionText {
          margin-top: 5px;
          color: #4d453e;
          font-size: 10px;
          line-height: 1.25;
          text-align: center;
        }

        .actionText b {
          display: block;
          font-weight: 600;
        }

        .decoration {
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          color: #c99435;
          opacity: 0.3;
          font-size: 27px;
          letter-spacing: 7px;
        }

        .nav {
          position: fixed;
          z-index: 50;
          left: 0;
          right: 0;
          bottom: 0;
          height:
            calc(64px + env(safe-area-inset-bottom));
          display: grid;
          grid-template-columns:
            repeat(5, 1fr);
          padding-bottom:
            env(safe-area-inset-bottom);
          border-top: 1px solid #eadbc5;
          background:
            rgba(255, 253, 248, 0.97);
          backdrop-filter: blur(12px);
          box-shadow:
            0 -3px 14px rgba(80, 40, 10, 0.07);
        }

        .nav button {
          min-width: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
          padding: 5px 2px;
          border: 0;
          background: transparent;
          color: #766c63;
          cursor: pointer;
          font-size: 9px;
        }

        .nav button span {
          font-size: 21px;
          line-height: 1;
        }

        .nav .active {
          color: #a71919;
          font-weight: 700;
        }

        .drawerOverlay {
          position: fixed;
          inset: 0;
          z-index: 100;
          background:
            rgba(48, 28, 22, 0.42);
          backdrop-filter: blur(2px);
        }

        .drawer {
          width: min(82vw, 340px);
          height: 100%;
          overflow-y: auto;
          background: #fffaf0;
          box-shadow:
            8px 0 25px rgba(50, 25, 10, 0.18);
          animation:
            drawerIn 0.25s ease-out;
        }

        @keyframes drawerIn {
          from {
            transform: translateX(-100%);
          }

          to {
            transform: translateX(0);
          }
        }

        .drawerHeader {
          position: relative;
          min-height: 108px;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 20px 17px;
          background:
            linear-gradient(
              135deg,
              #8c542e,
              #b8864f,
              #d3ad70
            );
          color: white;
        }

        .profilePhoto {
          width: 55px;
          height: 55px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border: 2px solid #fff4dc;
          border-radius: 50%;
          background: #fffaf0;
          font-size: 28px;
        }

        .drawerHeader h2 {
          margin: 0;
          font-family: Georgia, serif;
          font-size: 17px;
        }

        .drawerHeader p {
          margin: 5px 0 0;
          font-size: 12px;
          opacity: 0.9;
        }

        .close {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 30px;
          height: 30px;
          display: grid;
          place-items: center;
          border: 0;
          border-radius: 50%;
          background:
            rgba(255, 255, 255, 0.18);
          color: white;
          cursor: pointer;
          font-size: 22px;
        }

        .menu {
          padding: 7px 0 20px;
        }

        .menu button {
          width: 100%;
          min-height: 45px;
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 0 20px;
          border: 0;
          border-bottom: 1px solid #eadfce;
          background: transparent;
          color: #453c35;
          cursor: pointer;
          text-align: left;
        }

        .menu button span {
          width: 23px;
          color: #c24a1c;
          font-size: 20px;
          text-align: center;
        }

        .menu button b {
          font-size: 13px;
          font-weight: 600;
        }

        .menu button:hover {
          background: #fff4df;
        }

        .menuActive {
          color: #a71919 !important;
          background: #fff0d7 !important;
        }

        .menuActive span {
          color: #a71919 !important;
        }

        @media (max-width: 359px) {
          .screen {
            padding-left: 7px;
            padding-right: 7px;
          }

          .logo {
            width: 38px;
            height: 38px;
            font-size: 19px;
          }

          .greeting {
            font-size: 10px;
          }

          .name {
            font-size: 13px;
          }

          .liveCard {
            height: 145px;
          }

          .grid {
            gap: 5px;
          }

          .action {
            height: 76px;
          }

          .actionText {
            font-size: 9px;
          }

          .schedule {
            min-width: 125px;
          }
        }

        @media (min-width: 430px) and (max-width: 599px) {
          .screen {
            padding: 14px 16px 88px;
          }

          .header {
            min-height: 68px;
          }

          .logo {
            width: 48px;
            height: 48px;
          }

          .greeting {
            font-size: 12px;
          }

          .name {
            font-size: 17px;
          }

          .liveCard {
            height: 210px;
            border-radius: 16px;
          }

          .grid {
            gap: 10px;
          }

          .action {
            height: 90px;
          }

          .actionText {
            font-size: 11px;
          }
        }

        @media (min-width: 600px) and (max-width: 1023px) {
          .screen {
            width: 100%;
            max-width: 820px;
            margin: 0 auto;
            padding: 20px 24px 95px;
          }

          .header {
            min-height: 74px;
          }

          .logo {
            width: 50px;
            height: 50px;
            font-size: 24px;
          }

          .greeting {
            font-size: 12px;
          }

          .name {
            font-size: 18px;
          }

          .liveCard {
            height: 290px;
            border-radius: 18px;
          }

          .liveBar strong {
            font-size: 17px;
          }

          .next {
            min-height: 130px;
            padding: 20px 12px;
          }

          .next h2 {
            font-size: 21px;
          }

          .schedule {
            min-width: 185px;
          }

          .grid {
            gap: 13px;
          }

          .action {
            height: 105px;
            border-radius: 14px;
          }

          .actionIcon svg {
            width: 29px;
            height: 29px;
          }

          .actionText {
            font-size: 12px;
          }

          .nav {
            left: 50%;
            right: auto;
            width: min(100%, 820px);
            transform: translateX(-50%);
          }
        }

        @media (min-width: 1024px) {
          body {
            background: #f7efe3;
          }

          .screen {
            width: auto;
            max-width: none;
            min-height: 100vh;

            margin: 0;
            margin-left: 92px;

            padding: 24px 32px 40px;

            background: #fffaf0;
          }

          .header {
            min-height: 82px;
            padding: 0 4px 14px;
            border-bottom:
              1px solid #ecdfca;
          }

          .logo {
            width: 54px;
            height: 54px;
            font-size: 26px;
          }

          .greeting {
            font-size: 13px;
          }

          .name {
            font-size: 20px;
          }

          .bell {
            width: 46px;
            height: 46px;
          }

          .liveCard {
            width: 100%;
            height:
              clamp(330px, 34vw, 500px);
            margin-top: 22px;
            border-radius: 20px;
          }

          .liveCard img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .liveBar {
            min-height: 90px;
            padding: 36px 25px 20px;
          }

          .liveBar strong {
            font-size: 22px;
          }

          .liveBar span {
            padding: 7px 13px;
            font-size: 12px;
          }

          .next {
            width: 100%;
            min-height: 150px;
            margin-top: 18px;
            padding: 22px 28px;
            border:
              1px solid #eadbc5;
            border-radius: 16px;
            background: #fffdf8;
          }

          .next h2 {
            font-size: 24px;
          }

          .miniTemple {
            width: 72px;
            height: 55px;
            font-size: 35px;
          }

          .nextTemple b {
            font-size: 15px;
          }

          .nextTemple span {
            font-size: 12px;
          }

          .schedule {
            min-width: 260px;
          }

          .scheduleTop {
            font-size: 14px;
          }

          .schedule > strong {
            margin: 10px 0;
            padding: 7px 15px;
            font-size: 18px;
          }

          .schedule button {
            font-size: 13px;
          }

          .grid {
            width: 100%;
            margin-top: 22px;
            grid-template-columns:
              repeat(4, minmax(0, 1fr));
            gap: 18px;
          }

          .action {
            width: 100%;
            height: 125px;
            border-radius: 15px;
          }

          .action:hover {
            transform:
              translateY(-4px);
            border-color: #d9bd87;
            box-shadow:
              0 12px 30px
              rgba(90, 50, 20, 0.12);
          }

          .actionIcon {
            height: 42px;
          }

          .actionIcon svg {
            width: 32px;
            height: 32px;
          }

          .actionText {
            margin-top: 10px;
            font-size: 13px;
          }

          .nav {
            top: 0;
            bottom: 0;
            left: 0;
            right: auto;

            width: 92px;
            height: 100vh;

            display: flex;
            flex-direction: column;

            padding: 90px 8px 18px;

            border-top: 0;
            border-right:
              1px solid #eadbc5;

            background: #fffdf8;

            box-shadow:
              3px 0 18px
              rgba(80, 40, 10, 0.07);

            transform: none;
          }

          .nav button {
            width: 100%;
            min-height: 72px;
            flex: none;
            gap: 7px;
            padding: 10px 4px;
            border-radius: 10px;
            font-size: 11px;
          }

          .nav button:hover {
            background: #fff2dd;
            color: #a71919;
          }

          .nav button span {
            font-size: 25px;
          }

          .nav .active {
            background: #fbead3;
            color: #a71919;
          }

          .drawer {
            width: 390px;
          }

          .drawerHeader {
            min-height: 130px;
            padding: 25px 22px;
          }

          .profilePhoto {
            width: 64px;
            height: 64px;
            font-size: 32px;
          }

          .drawerHeader h2 {
            font-size: 20px;
          }

          .drawerHeader p {
            font-size: 13px;
          }

          .menu button {
            min-height: 50px;
            padding: 0 24px;
          }

          .menu button b {
            font-size: 14px;
          }

          .decoration {
            height: 75px;
            font-size: 34px;
          }
        }

        @media (min-width: 1400px) {
          .screen {
            width: auto;
            max-width: none;
            margin-left: 92px;
            padding:
              28px 44px 45px;
          }

          .liveCard {
            height: 460px;
          }

          .grid {
            gap: 20px;
          }

          .action {
            height: 135px;
          }
        }
      `}</style>
    </main>
  );
}