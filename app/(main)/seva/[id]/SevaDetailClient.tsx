"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import styles from "./seva-detail.module.css";

const sevaData: Record<
  string,
  {
    title: string;
    subtitle: string;
    image: string;
    description: string;
    progress: number;
    progressText: string;
  }
> = {
  "go-seva": {
    title: "Go Seva",
    subtitle: "Care for Gau Mata",
    image: "/images/go-seva.jpg",
    description:
      "Support the service of Gau Mata at Govardhannath Haveli. Your contribution helps in food, healthcare and shelter for our cows.",
    progress: 72,
    progressText: "72 cows sponsored out of 100",
  },

  "nitya-bhog": {
    title: "Nitya Bhog Seva",
    subtitle: "Daily Food Offering",
    image: "/images/nitya-bhog.jpg",
    description:
      "Support the daily bhog seva offered to Shri Govardhannathji. Your contribution helps provide sacred food offerings with devotion.",
    progress: 68,
    progressText: "68% seva sponsored",
  },

  flower: {
    title: "Flower Seva",
    subtitle: "Temple Decoration",
    image: "/images/flower-seva.jpg",
    description:
      "Support the beautiful daily flower decoration of the Haveli. Your contribution helps create a divine and devotional atmosphere for Thakurji.",
    progress: 54,
    progressText: "54% seva sponsored",
  },

  annakut: {
    title: "Annakut Seva",
    subtitle: "Special Utsav Seva",
    image: "/images/annakut.jpg",
    description:
      "Be part of the sacred Annakut Utsav and support the special offerings prepared for Shri Govardhannathji with devotion.",
    progress: 82,
    progressText: "82% seva sponsored",
  },

  "temple-maintenance": {
    title: "Temple Maintenance",
    subtitle: "Support Temple Services",
    image: "/images/temple-maintenance.jpg",
    description:
      "Support the maintenance of Govardhannath Haveli and help provide essential services for the temple and devotees.",
    progress: 45,
    progressText: "45% seva sponsored",
  },
};

const amounts = ["₹101", "₹501", "₹1,001", "₹5,001"];

export default function SevaDetail() {
  const router = useRouter();
  const params = useParams();

  const rawId = Array.isArray(params.id) ? params.id[0] : params.id;
  const id = rawId ?? "go-seva";

  const seva = sevaData[id] || sevaData["go-seva"];
  const [selectedAmount, setSelectedAmount] = useState("₹501");
  const [customAmount, setCustomAmount] = useState("");

  const handleDonate = () => {
    const amount =
      selectedAmount === "Custom"
        ? customAmount
        : selectedAmount.replace("₹", "").replace(",", "");

    if (!amount) {
      alert("Please select a donation amount");
      return;
    }

    router.push(
      `/donate?seva=${encodeURIComponent(
        seva.title,
      )}&amount=${encodeURIComponent(amount)}`,
    );
  };

  return (
    <main className={styles.screen}>
      {/* HEADER */}

      <header className={styles.header}>
        <button className={styles.back} onClick={() => router.back()}>
          ‹
        </button>

        <h1>Seva Detail</h1>
      </header>

      {/* CONTENT */}

      <section className={styles.content}>
        {/* IMAGE */}

        <img src={seva.image} alt={seva.title} className={styles.hero} />

        {/* TITLE */}

        <h2>{seva.title}</h2>

        <div className={styles.subtitle}>{seva.subtitle}</div>

        {/* DESCRIPTION */}

        <p className={styles.description}>{seva.description}</p>

        {/* PROGRESS */}

        <div className={styles.progressHeader}>
          <span>{seva.progressText}</span>
          <b>{seva.progress}%</b>
        </div>

        <div className={styles.progressTrack}>
          <div
            className={styles.progress}
            style={{
              width: `${seva.progress}%`,
            }}
          />
        </div>

        {/* DONATION AMOUNTS */}

        <div className={styles.amounts}>
          {amounts.map((amount) => (
            <button
              key={amount}
              className={
                selectedAmount === amount
                  ? `${styles.amount} ${styles.selected}`
                  : styles.amount
              }
              onClick={() => {
                setSelectedAmount(amount);
                setCustomAmount("");
              }}
            >
              {amount}
            </button>
          ))}

          <button
            className={
              selectedAmount === "Custom"
                ? `${styles.amount} ${styles.selected}`
                : styles.amount
            }
            onClick={() => {
              setSelectedAmount("Custom");
            }}
          >
            Custom
          </button>
        </div>

        {/* CUSTOM AMOUNT */}

        {selectedAmount === "Custom" && (
          <input
            className={styles.customInput}
            type="number"
            inputMode="numeric"
            placeholder="Enter donation amount"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
          />
        )}

        {/* DONATE */}

        <button className={styles.donate} onClick={handleDonate}>
          Donate Now
        </button>
      </section>
    </main>
  );
}
