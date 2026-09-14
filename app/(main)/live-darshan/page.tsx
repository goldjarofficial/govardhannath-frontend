"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./live-darshan.module.css";

/*
  PUT YOUR TWO YOUTUBE VIDEO IDs HERE.

  Example:
  https://www.youtube.com/live/ABC123XYZ

  Video ID:
  ABC123XYZ
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

const chats = [
  ["🙏", "Jai Shree Krishna", "Ramesh Patel"],
  ["🌸", "Radhe Radhe", "Meena Shah"],
  ["🙏", "Jai Shrinathji", "Aarti Doshi"],
  ["🌺", "Beautiful Darshan", "Pooja Mehta"],
];

export default function LiveDarshan() {
  const router = useRouter();
  const [selected, setSelected] = useState(0);

  const stream = streams[selected];

  return (
    <main className={styles.screen}>
      {/* HEADER */}

      <header className={styles.header}>
        <button className={styles.back} onClick={() => router.back()}>
          ‹
        </button>

        <div>
          <h1>Live Darshan</h1>
          <p>Shri Govardhannath Haveli</p>
        </div>

        <button className={styles.share}>↗</button>
      </header>

      {/* TWO DARSHAN SELECTORS */}

      <section className={styles.streamGrid}>
        {streams.map((item, index) => (
          <button
            key={index}
            className={`${styles.streamCard} ${
              selected === index ? styles.selected : ""
            }`}
            onClick={() => setSelected(index)}
          >
            <img src={item.image} alt="Live Darshan" />

            <div className={styles.streamShade} />

            <div className={styles.liveBadge}>
              <span />
              LIVE
            </div>

            <div className={styles.viewer}>◉ LIVE</div>
          </button>
        ))}
      </section>

      {/* YOUTUBE LIVE PLAYER */}

      <section className={styles.playerCard}>
        <div className={styles.playerHeader}>
          <div>
            <span className={styles.liveDot} />
            <b>LIVE DARSHAN</b>
          </div>

          <span className={styles.liveText}>LIVE</span>
        </div>

        <div className={styles.youtubePlayer}>
          {stream.id.startsWith("YOUR_") ? (
            <div className={styles.setupMessage}>
              <span>▶</span>

              <b>YouTube Live</b>

              <small>
                Add your YouTube Live video ID in the page.tsx file.
              </small>
            </div>
          ) : (
            <iframe
              key={stream.id}
              src={`https://www.youtube.com/embed/${stream.id}?playsinline=1&rel=0`}
              title="Live Darshan"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )}
        </div>

        <div className={styles.playerInfo}>
          <div>
            <h2>Live Darshan</h2>

            <p>Shri Govardhannath Haveli</p>
          </div>

          <div className={styles.likes}>♡ 2.1K</div>
        </div>
      </section>

      {/* LIVE CHAT */}

      <section className={styles.chatCard}>
        <div className={styles.chatTitle}>
          <span className={styles.chatDot} />
          Live Chat
        </div>

        <div className={styles.chatList}>
          {chats.map(([avatar, name, user]) => (
            <div className={styles.chatRow} key={name}>
              <div className={styles.avatar}>{avatar}</div>

              <div>
                <b>{name}</b>
                <span>{user}</span>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.messageBox}>
          <input placeholder="Type a message..." />

          <button>›</button>
        </div>
      </section>

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

        <button>
          <span>♨</span>
          Seva
        </button>

        <button>
          <span>▣</span>
          Reels
        </button>

        <button>
          <span>♙</span>
          Profile
        </button>
      </nav>
    </main>
  );
}
