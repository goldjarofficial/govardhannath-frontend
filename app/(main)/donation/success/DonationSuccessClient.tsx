"use client";

import { useRouter, useSearchParams } from "next/navigation";
import styles from "./success.module.css";

export default function DonationSuccess() {
  const router = useRouter();
  const params = useSearchParams();

  const seva = params.get("seva") || "Go Seva";

  const amount = params.get("amount") || "1,001";

  const type = params.get("type") || "one-time";

  const frequency = params.get("frequency") || "monthly";

  const transactionId = "DON" + Math.floor(100000 + Math.random() * 900000);

  return (
    <main className={styles.screen}>
      <section className={styles.card}>
        <div className={styles.check}>✓</div>

        <h1>{type === "auto" ? "Auto Seva Started!" : "Seva Successful!"}</h1>

        <h2>Jai Shree Krishna</h2>

        <p className={styles.thanks}>
          Thank you for your generous contribution.
        </p>

        <div className={styles.details}>
          <div>
            <span>Seva</span>
            <b>{seva}</b>
          </div>

          <div>
            <span>Amount</span>
            <b>₹{Number(amount).toLocaleString("en-IN")}</b>
          </div>

          {type === "auto" && (
            <div>
              <span>Frequency</span>
              <b>{frequency.charAt(0).toUpperCase() + frequency.slice(1)}</b>
            </div>
          )}

          <div>
            <span>Transaction ID</span>
            <b>{transactionId}</b>
          </div>

          <div>
            <span>Date</span>
            <b>14 Sep 2026</b>
          </div>
        </div>

        <button
          className={styles.receipt}
          onClick={() =>
            alert("Receipt download will be connected to the backend.")
          }
        >
          Download Receipt
        </button>

        <button
          className={styles.share}
          onClick={() =>
            navigator.share?.({
              title: "Seva Contribution",
              text: `I contributed ₹${amount} towards ${seva}. Jai Shree Krishna 🙏`,
            })
          }
        >
          ↗ &nbsp; Share
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
