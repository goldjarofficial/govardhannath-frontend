"use client";

import { useRouter } from "next/navigation";
import styles from "./darshan-timings.module.css";

const darshans = [
  {
    name: "Mangala",
    time: "05:30 AM",
    status: "Completed",
  },
  {
    name: "Shringar",
    time: "07:30 AM",
    status: "Completed",
  },
  {
    name: "Gwal",
    time: "09:00 AM",
    status: "Open Now",
  },
  {
    name: "Rajbhog",
    time: "12:15 PM",
    status: "Upcoming",
  },
  {
    name: "Utthapan",
    time: "04:00 PM",
    status: "Upcoming",
  },
  {
    name: "Bhog",
    time: "06:00 PM",
    status: "Upcoming",
  },
  {
    name: "Sandhya Aarti",
    time: "07:30 PM",
    status: "Upcoming",
  },
  {
    name: "Shayan",
    time: "09:00 PM",
    status: "Upcoming",
  },
];

export default function DarshanTimings() {
  const router = useRouter();

  return (
    <main className={styles.screen}>
      {/* HEADER */}

      <header className={styles.header}>
        <button className={styles.back} onClick={() => router.back()}>
          ‹
        </button>

        <div className={styles.heading}>
          <div className={styles.ornament}>✦</div>

          <h1>Ashtakayam Darshan</h1>

          <p>Today, 14 Sep 2026</p>
        </div>

        <div className={styles.headerSpace} />
      </header>

      {/* GOLD DIVIDER */}

      <div className={styles.divider}>
        <span />
        <b>✦</b>
        <span />
      </div>

      {/* DARSHAN LIST */}

      <section className={styles.list}>
        {darshans.map((darshan, index) => (
          <div
            className={`${styles.row} ${
              darshan.status === "Open Now" ? styles.current : ""
            }`}
            key={darshan.name}
          >
            {/* TEMPLE ICON */}

            <div className={styles.imageWrap}>
              <div className={styles.templeIcon}>🛕</div>
            </div>

            {/* DARSHAN NAME */}

            <div className={styles.details}>
              <span className={styles.number}>
                {String(index + 1).padStart(2, "0")}
              </span>

              <h2>{darshan.name}</h2>

              <small>
                {darshan.status === "Open Now"
                  ? "Darshan is live now"
                  : darshan.status === "Completed"
                    ? "Darshan completed"
                    : "Darshan upcoming"}
              </small>
            </div>

            {/* TIME + STATUS */}

            <div className={styles.timeBox}>
              <strong>{darshan.time}</strong>

              <span
                className={`${styles.status} ${
                  darshan.status === "Completed"
                    ? styles.completed
                    : darshan.status === "Open Now"
                      ? styles.open
                      : styles.upcoming
                }`}
              >
                {darshan.status}
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* FOOTER DECORATION */}

      <div className={styles.footerOrnament}>
        <span />
        <b>ॐ</b>
        <span />
      </div>

      {/* BOTTOM NAV */}

      <nav className={styles.nav}>
        <button onClick={() => router.push("/dashboard")}>
          <span>⌂</span>
          Home
        </button>

        <button className={styles.active}>
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

        <button onClick={() => router.push("/dashboard")}>
          <span>♙</span>
          Profile
        </button>
      </nav>
    </main>
  );
}
