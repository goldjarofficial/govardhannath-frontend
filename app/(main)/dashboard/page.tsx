"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./dashboard.module.css";

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
];

const actions = [
  ["headset", "Live", "Darshan"],
  ["seva", "Seva &", "Donation"],
  ["cow", "Go Seva", ""],
  ["clock", "Darshan", "Timings"],
  ["gift", "Events &", "Utsav"],
  ["play", "Reels &", "Bhakti"],
  ["food", "Prasadam", ""],
  ["grid", "More", ""],
];

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

/* =========================
   DASHBOARD TILE ROUTES
========================= */

const actionRoutes: Record<string, string> = {
  Live: "/live-darshan",

  "Seva &": "/seva-donation",

  "Go Seva": "/seva/go-seva",

  Darshan: "/darshan-timings",

  "Events &": "/events",

  "Reels &": "/reels",

  Prasadam: "/prasadam",
};

/* =========================
   SIDE DRAWER ROUTES
========================= */

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

export default function Dashboard() {
  const router = useRouter();

  const [drawer, setDrawer] = useState(false);

  /* =========================
     OPEN DRAWER
  ========================= */

  const openDrawer = () => {
    setDrawer(true);
  };

  /* =========================
     CLOSE DRAWER
  ========================= */

  const closeDrawer = () => {
    setDrawer(false);
  };

  return (
    <main className={styles.screen}>
      {/* =========================
          HEADER
      ========================= */}

      <header className={styles.header}>
        <div className={styles.user}>
          <div className={styles.logo}>🛕</div>

          <div>
            <div className={styles.greeting}>🙏 Jai Shree Krishna</div>

            <div className={styles.name}>Namaste, Krishna</div>
          </div>
        </div>

        <button
          className={styles.bell}
          onClick={() => router.push("/notifications")}
        >
          ♧
          <i />
        </button>
      </header>

      {/* =========================
          LIVE DARSHAN
      ========================= */}

      <button
        className={styles.liveCard}
        onClick={() => router.push("/live-darshan")}
      >
        <img src="/images/haveli.jpg" alt="Shri Govardhannath Haveli" />

        <div className={styles.liveBar}>
          <strong>🙏 Live Darshan Now</strong>

          <span>• LIVE</span>
        </div>
      </button>

      {/* =========================
          NEXT DARSHAN
      ========================= */}

      <section className={styles.next}>
        <div>
          <h2>Next Darshan</h2>

          <div className={styles.nextTemple}>
            <div className={styles.miniTemple}>🛕</div>

            <div>
              <b>Rajbhog</b>

              <span>Today</span>
            </div>
          </div>
        </div>

        <div className={styles.schedule}>
          <div className={styles.scheduleTop}>
            <b>Rajbhog</b>

            <span>12:15 PM</span>
          </div>

          <strong>02:45:20</strong>

          <button onClick={() => router.push("/darshan-timings")}>
            View Schedule ›
          </button>
        </div>
      </section>

      {/* =========================
          ACTION TILES
      ========================= */}

      <section className={styles.grid}>
        {actions.map(([icon, title, sub]) => {
          const route = actionRoutes[title];

          return (
            <button
              key={title}
              className={styles.action}
              onClick={() => {
                /* MORE OPENS
                     EXISTING PROFILE DRAWER */

                if (title === "More") {
                  openDrawer();
                  return;
                }

                /* NORMAL ROUTES */

                if (route) {
                  router.push(route);
                }
              }}
            >
              <span className={styles.actionIcon}>
                <Icon name={icon} />
              </span>

              <span className={styles.actionText}>
                <b>{title}</b>

                {sub && <b>{sub}</b>}
              </span>
            </button>
          );
        })}
      </section>

      {/* =========================
          DECORATION
      ========================= */}

      <div className={styles.decoration}>❧ ❧ ❧ ❧ ❧</div>

      {/* =========================
          BOTTOM NAV
      ========================= */}

      <nav className={styles.nav}>
        <button
          className={styles.active}
          onClick={() => router.push("/dashboard")}
        >
          <span>⌂</span>
          Home
        </button>

        <button onClick={() => router.push("/live-darshan")}>
          <span>◉</span>
          Darshan
        </button>

        <button onClick={() => router.push("/seva-donation")}>
          <span>♨</span>
          Seva
        </button>

        <button onClick={() => router.push("/reels")}>
          <span>▣</span>
          Reels
        </button>

        {/* PROFILE → SAME DRAWER */}

        <button onClick={openDrawer}>
          <span>♙</span>
          Profile
        </button>
      </nav>

      {/* =========================
          PROFILE SIDE DRAWER
      ========================= */}

      {drawer && (
        <div className={styles.drawerOverlay} onClick={closeDrawer}>
          <aside className={styles.drawer} onClick={(e) => e.stopPropagation()}>
            {/* =====================
                PROFILE HEADER
            ===================== */}

            <div className={styles.drawerHeader}>
              <div className={styles.profilePhoto}>👤</div>

              <div>
                <h2>Krishna Sharma</h2>

                <p>+91 8080232328</p>
              </div>

              <button className={styles.close} onClick={closeDrawer}>
                ×
              </button>
            </div>

            {/* =====================
                MENU
            ===================== */}

            <div className={styles.menu}>
              {menu.map(([icon, title], index) => (
                <button
                  key={title}
                  className={index === 0 ? styles.menuActive : ""}
                  onClick={() => {
                    /* HOME */

                    if (title === "Home") {
                      closeDrawer();

                      router.push("/dashboard");

                      return;
                    }

                    /* LOGOUT */

                    if (title === "Logout") {
                      closeDrawer();

                      router.push("/login");

                      return;
                    }

                    /* OTHER MENU ITEMS */

                    const route = menuRoutes[title];

                    if (route) {
                      closeDrawer();

                      router.push(route);
                    }
                  }}
                >
                  <span>{icon}</span>

                  <b>{title}</b>
                </button>
              ))}
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}
