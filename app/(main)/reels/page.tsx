"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./reels.module.css";

const reels = [
  {
    id: 1,
    video: "/videos/reel-1.mp4",
    title: "Today's Shringar Darshan",
    subtitle: "Jai Shrinathji 🙏",
    username: "@govardhannath_haveli",
    likes: "5.2K",
    comments: "120",
  },
  {
    id: 2,
    video: "/videos/reel-2.mp4",
    title: "Divine Darshan",
    subtitle: "Shri Govardhannathji 🌸",
    username: "@govardhannath_haveli",
    likes: "3.8K",
    comments: "86",
  },
  {
    id: 3,
    video: "/videos/reel-3.mp4",
    title: "Sandhya Aarti",
    subtitle: "Jai Shree Krishna 🙏",
    username: "@govardhannath_haveli",
    likes: "4.6K",
    comments: "102",
  },
];

export default function Reels() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);

  const reel = reels[current];

  const nextReel = () => {
    if (current < reels.length - 1) {
      setCurrent(current + 1);
    }
  };

  const previousReel = () => {
    if (current > 0) {
      setCurrent(current - 1);
    }
  };

  return (
    <main className={styles.screen}>
      {/* VIDEO */}

      <div className={styles.videoArea}>
        <video
          key={reel.video}
          className={styles.video}
          src={reel.video}
          autoPlay
          muted
          loop
          playsInline
        />

        <div className={styles.topGradient} />
        <div className={styles.bottomGradient} />

        {/* BACK */}

        <button
          className={styles.back}
          onClick={() => router.back()}
          aria-label="Back"
        >
          ‹
        </button>

        {/* RIGHT ACTIONS */}

        <div className={styles.actions}>
          <button aria-label="Like">
            <span>♡</span>
            <small>{reel.likes}</small>
          </button>

          <button aria-label="Comments">
            <span>•••</span>
            <small>{reel.comments}</small>
          </button>

          <button aria-label="Share">
            <span>↗</span>
            <small>Share</small>
          </button>

          <button aria-label="Audio">
            <span>♫</span>
            <small>Audio</small>
          </button>
        </div>

        {/* CONTENT */}

        <div className={styles.content}>
          <div className={styles.profileRow}>
            <div className={styles.profileImage}>🛕</div>

            <div className={styles.profileName}>
              <b>{reel.username}</b>
            </div>

            <button className={styles.follow}>Follow</button>
          </div>

          <h1>{reel.title}</h1>

          <p>{reel.subtitle}</p>

          <div className={styles.audio}>
            <span>♫</span>
            Original Audio
          </div>
        </div>

        {/* SWIPE / TAP AREAS */}

        <button
          className={styles.previousArea}
          onClick={previousReel}
          aria-label="Previous Reel"
        />

        <button
          className={styles.nextArea}
          onClick={nextReel}
          aria-label="Next Reel"
        />
      </div>

      {/* USER BOTTOM NAV */}

      <nav className={styles.nav}>
        <button onClick={() => router.push("/dashboard")}>
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

        <button className={styles.active}>
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
