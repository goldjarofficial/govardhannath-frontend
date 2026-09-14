"use client";

import { useRouter } from "next/navigation";
import styles from "./failed.module.css";

export default function DonationFailed() {
  const router = useRouter();

  return (
    <main className={styles.screen}>
      <section className={styles.card}>
        <div className={styles.cross}>×</div>

        <h1>Payment Failed</h1>

        <h2>Jai Shree Krishna</h2>

        <p>We could not complete your contribution. Please try again.</p>

        <button className={styles.retry} onClick={() => router.back()}>
          Try Again
        </button>

        <button
          className={styles.home}
          onClick={() => router.push("/dashboard")}
        >
          Back to Home
        </button>
      </section>
    </main>
  );
}
