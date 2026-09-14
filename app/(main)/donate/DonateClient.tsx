"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./donate.module.css";

const frequencies = [
  {
    id: "daily",
    title: "Daily",
    subtitle: "Every day",
  },
  {
    id: "weekly",
    title: "Weekly",
    subtitle: "Every week",
  },
  {
    id: "monthly",
    title: "Monthly",
    subtitle: "Every month",
  },
];

export default function DonatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const seva = searchParams.get("seva") || "Go Seva";

  const urlAmount = searchParams.get("amount") || "1001";

  const [amount, setAmount] = useState(urlAmount);

  const [type, setType] = useState<"one-time" | "auto">("one-time");

  const [frequency, setFrequency] = useState("monthly");

  const [customAmount, setCustomAmount] = useState("");

  const finalAmount = amount === "custom" ? customAmount : amount;

  const handlePayment = () => {
    if (!finalAmount || Number(finalAmount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    /*
      TEMPORARY DEMO FLOW

      Later this button will call our
      payment gateway API.

      One Time:
      → Create payment order
      → Open UPI/Card/Net Banking
      → Success / Failed

      Auto Seva:
      → Create mandate/subscription
      → User authorizes AutoPay
      → Success / Failed
    */

    router.push(
      `/donation/success?seva=${encodeURIComponent(
        seva,
      )}&amount=${encodeURIComponent(
        finalAmount,
      )}&type=${type}&frequency=${frequency}`,
    );
  };

  return (
    <main className={styles.screen}>
      {/* HEADER */}

      <header className={styles.header}>
        <button className={styles.back} onClick={() => router.back()}>
          ‹
        </button>

        <h1>Payment</h1>
      </header>

      {/* CONTENT */}

      <section className={styles.content}>
        {/* SEVA SUMMARY */}

        <div className={styles.sevaCard}>
          <div className={styles.sevaIcon}>🛕</div>

          <div>
            <h2>{seva}</h2>

            <p>₹{Number(finalAmount || 0).toLocaleString("en-IN")}</p>
          </div>
        </div>

        {/* PAYMENT TYPE */}

        <h3 className={styles.sectionTitle}>Choose Donation Type</h3>

        <div className={styles.typeTabs}>
          <button
            className={type === "one-time" ? styles.typeActive : ""}
            onClick={() => setType("one-time")}
          >
            <strong>One Time</strong>

            <span>Make a single donation</span>
          </button>

          <button
            className={type === "auto" ? styles.typeActive : ""}
            onClick={() => setType("auto")}
          >
            <strong>Auto Seva</strong>

            <span>Automatic recurring seva</span>
          </button>
        </div>

        {/* AUTO SEVA */}

        {type === "auto" && (
          <div className={styles.autoBox}>
            <div className={styles.autoTitle}>
              <span>🔄</span>

              <div>
                <strong>Start Auto Seva</strong>

                <p>Your selected amount will be automatically debited.</p>
              </div>
            </div>

            <h3>Select Frequency</h3>

            <div className={styles.frequency}>
              {frequencies.map((item) => (
                <button
                  key={item.id}
                  className={
                    frequency === item.id ? styles.frequencyActive : ""
                  }
                  onClick={() => setFrequency(item.id)}
                >
                  <strong>{item.title}</strong>

                  <span>{item.subtitle}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* AMOUNT */}

        <h3 className={styles.sectionTitle}>Donation Amount</h3>

        <div className={styles.amountGrid}>
          {["101", "501", "1001", "5001"].map((value) => (
            <button
              key={value}
              className={amount === value ? styles.amountActive : ""}
              onClick={() => {
                setAmount(value);
                setCustomAmount("");
              }}
            >
              ₹{Number(value).toLocaleString("en-IN")}
            </button>
          ))}

          <button
            className={amount === "custom" ? styles.amountActive : ""}
            onClick={() => setAmount("custom")}
          >
            Custom
          </button>
        </div>

        {/* CUSTOM */}

        {amount === "custom" && (
          <div className={styles.customBox}>
            <span>₹</span>

            <input
              type="number"
              inputMode="numeric"
              placeholder="Enter amount"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
            />
          </div>
        )}

        {/* PAYMENT METHOD */}

        <h3 className={styles.sectionTitle}>Select Payment Method</h3>

        <div className={styles.methods}>
          <button>
            <span className={styles.methodIcon}>✓</span>

            <div>
              <strong>UPI</strong>

              <small>GPay, PhonePe, Paytm</small>
            </div>

            <span>›</span>
          </button>

          <button>
            <span className={styles.methodIcon}>▣</span>

            <div>
              <strong>Credit / Debit Card</strong>

              <small>Visa, Mastercard & more</small>
            </div>

            <span>›</span>
          </button>

          <button>
            <span className={styles.methodIcon}>▤</span>

            <div>
              <strong>Net Banking</strong>

              <small>All major banks</small>
            </div>

            <span>›</span>
          </button>
        </div>

        {/* PAY BUTTON */}

        <button className={styles.pay} onClick={handlePayment}>
          {type === "auto"
            ? `Start Auto Seva ₹${Number(finalAmount || 0).toLocaleString(
                "en-IN",
              )}`
            : `Pay ₹${Number(finalAmount || 0).toLocaleString("en-IN")}`}
        </button>

        {/* SECURITY */}

        <div className={styles.secure}>🔒 100% Secure Payment</div>

        {type === "auto" && (
          <p className={styles.mandateNote}>
            By continuing, you authorize the recurring payment mandate for your
            selected seva and frequency. You can cancel your Auto Seva later.
          </p>
        )}
      </section>
    </main>
  );
}
