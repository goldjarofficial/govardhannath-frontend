"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./onboarding.module.css";

const slides = [
  {
    image: "/images/thakurji-1.jpg",
    title: (
      <>
        Experience
        <br />
        the Divine Grace
      </>
    ),
    tags: "Live Darshan • Seva • Satsang",
    text: (
      <>
        Stay connected with
        <br />
        Shri Govardhannathji
      </>
    ),
  },
  {
    image: "/images/thakurji-2.jpg",
    title: (
      <>
        Daily
        <br />
        Divine Darshan
      </>
    ),
    tags: "Darshan • Aarti • Utsav",
    text: (
      <>
        Feel the divine presence
        <br />
        wherever you are
      </>
    ),
  },
  {
    image: "/images/thakurji-3.jpg",
    title: (
      <>
        Be a Part
        <br />
        of Seva
      </>
    ),
    tags: "Seva • Bhog • Vandan",
    text: (
      <>
        Participate in sacred seva
        <br />
        with devotion
      </>
    ),
  },
  {
    image: "/images/thakurji-4.jpg",
    title: (
      <>
        Stay Connected
        <br />
        with Haveli
      </>
    ),
    tags: "Satsang • Events • Updates",
    text: (
      <>
        Everything about
        <br />
        Shri Govardhannath Haveli
      </>
    ),
  },
];

export default function Onboarding() {
  const router = useRouter();
  const [index, setIndex] = useState(0);

  const slide = slides[index];

  const next = () => {
    if (index === slides.length - 1) {
      router.push("/language");
    } else {
      setIndex(index + 1);
    }
  };

  return (
    <main className={styles.screen}>
      <div className={styles.image}>
        <img src={slide.image} alt="Shri Govardhannathji" />
      </div>

      <section className={styles.content}>
        <h1>{slide.title}</h1>

        <div className={styles.tags}>{slide.tags}</div>

        <p>{slide.text}</p>

        <div className={styles.dots}>
          {slides.map((_, i) => (
            <span key={i} className={i === index ? styles.active : ""} />
          ))}
        </div>

        <button className={styles.next} onClick={next}>
          {index === slides.length - 1 ? "Get Started" : "Next"}
        </button>

        <button
          className={styles.skip}
          onClick={() => router.push("/language")}
        >
          Skip
        </button>
      </section>

      <div className={`${styles.flower} ${styles.left}`}>
        <i />
        <i />
        <i />
      </div>

      <div className={`${styles.flower} ${styles.right}`}>
        <i />
        <i />
        <i />
      </div>
    </main>
  );
}
