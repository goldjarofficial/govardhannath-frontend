"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./events.module.css";

const events = [
  {
    title: "Janmashtami Utsav",
    date: "16 Aug 2026",
    image: "/images/janmashtami.jpg",
  },
  {
    title: "Annakut Mahotsav",
    date: "24 Oct 2026",
    image: "/images/annakut-event.jpg",
  },
  {
    title: "Sharad Purnima",
    date: "06 Nov 2026",
    image: "/images/sharad-purnima.jpg",
  },
  {
    title: "Haveli Sangeet",
    date: "15 Nov 2026",
    image: "/images/haveli-sangeet.jpg",
  },
];

export default function Events() {
  const router = useRouter();
  const [tab, setTab] = useState<"Upcoming" | "Past">("Upcoming");

  return (
    <main className={styles.screen}>
      {/* HEADER */}

      <header className={styles.header}>
        <button className={styles.back} onClick={() => router.back()}>
          ‹
        </button>

        <h1>Events &amp; Utsav</h1>
      </header>

      {/* TABS */}

      <div className={styles.tabs}>
        <button
          className={tab === "Upcoming" ? styles.activeTab : ""}
          onClick={() => setTab("Upcoming")}
        >
          Upcoming
        </button>

        <button
          className={tab === "Past" ? styles.activeTab : ""}
          onClick={() => setTab("Past")}
        >
          Past
        </button>
      </div>

      {/* EVENTS */}

      <section className={styles.list}>
        {tab === "Upcoming" ? (
          events.map((event) => (
            <button
              key={event.title}
              className={styles.eventCard}
              onClick={() =>
                router.push(`/events/${encodeURIComponent(event.title)}`)
              }
            >
              <img src={event.image} alt={event.title} />

              <div className={styles.info}>
                <h2>{event.title}</h2>

                <p>{event.date}</p>
              </div>

              <span className={styles.view}>View</span>
            </button>
          ))
        ) : (
          <div className={styles.empty}>No past events available</div>
        )}
      </section>

      {/* DECORATION */}

      <div className={styles.decoration}>❧ ❧ ❧</div>
    </main>
  );
}
