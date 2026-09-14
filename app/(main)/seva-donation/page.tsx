"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./seva-donation.module.css";

const categories = ["All", "Popular", "Go Seva", "Utsav"];

const sevas = [
  {
    title: "Go Seva",
    subtitle: "Care for Gau Mata",
    image: "/images/go-seva.jpg",
    category: "Go Seva",
    route: "/seva/go-seva",
  },
  {
    title: "Nitya Bhog Seva",
    subtitle: "Daily Food Offering",
    image: "/images/nitya-bhog.jpg",
    category: "Popular",
    route: "/seva/nitya-bhog",
  },
  {
    title: "Flower Seva",
    subtitle: "Temple Decoration",
    image: "/images/flower-seva.jpg",
    category: "Popular",
    route: "/seva/flower",
  },
  {
    title: "Annakut Seva",
    subtitle: "Special Utsav Seva",
    image: "/images/annakut.jpg",
    category: "Utsav",
    route: "/seva/annakut",
  },
  {
    title: "Temple Maintenance",
    subtitle: "Support Temple Services",
    image: "/images/temple-maintenance.jpg",
    category: "All",
    route: "/seva/temple-maintenance",
  },
];

export default function SevaDonation() {
  const router = useRouter();
  const [category, setCategory] = useState("All");

  const filteredSevas =
    category === "All"
      ? sevas
      : sevas.filter((seva) => seva.category === category);

  return (
    <main className={styles.screen}>
      {/* HEADER */}

      <header className={styles.header}>
        <button
          className={styles.back}
          onClick={() => router.back()}
          aria-label="Go back"
        >
          ‹
        </button>

        <h1>Seva &amp; Donation</h1>
      </header>

      {/* CATEGORY TABS */}

      <div className={styles.categories}>
        {categories.map((item) => (
          <button
            key={item}
            className={
              category === item
                ? `${styles.category} ${styles.selected}`
                : styles.category
            }
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {/* SEVA LIST */}

      <section className={styles.list}>
        {filteredSevas.map((seva) => (
          <button
            key={seva.title}
            className={styles.sevaCard}
            onClick={() => router.push(seva.route)}
          >
            <img
              src={seva.image}
              alt={seva.title}
              className={styles.sevaImage}
            />

            <div className={styles.sevaInfo}>
              <h2>{seva.title}</h2>
              <p>{seva.subtitle}</p>
            </div>

            <span className={styles.arrow}>›</span>
          </button>
        ))}

        {filteredSevas.length === 0 && (
          <div className={styles.empty}>No seva available</div>
        )}
      </section>

      {/* BOTTOM DECORATION */}

      <div className={styles.decoration}>❧ ❧ ❧</div>
    </main>
  );
}
