"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./language.module.css";

const languages = [
  { flag: "🇬🇧", name: "English" },
  { flag: "🇮🇳", name: "हिंदी" },
  { flag: "🇮🇳", name: "ગુજરાતી" },
];

export default function Language() {
  const router = useRouter();
  const [selected, setSelected] = useState("English");

  return (
    <main className={styles.screen}>
      <section className={styles.content}>
        <h1>Choose Language</h1>

        <p className={styles.subtitle}>अपनी भाषा चुनें</p>

        <div className={styles.list}>
          {languages.map((language) => (
            <button
              key={language.name}
              className={`${styles.card} ${
                selected === language.name ? styles.selected : ""
              }`}
              onClick={() => setSelected(language.name)}
            >
              <span className={styles.flag}>{language.flag}</span>

              <span className={styles.name}>{language.name}</span>

              <span className={styles.arrow}>›</span>
            </button>
          ))}
        </div>
      </section>

      <div className={styles.bottom}>
        <button
          className={styles.continue}
          onClick={() => router.push("/login")}
        >
          Continue
        </button>
      </div>

      <div className={`${styles.flower} ${styles.flowerLeft}`}>
        <i />
        <i />
        <i />
      </div>

      <div className={`${styles.flower} ${styles.flowerRight}`}>
        <i />
        <i />
        <i />
      </div>
    </main>
  );
}
