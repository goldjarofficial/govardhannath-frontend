"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import styles from "./seva-detail.module.css";

import { useLanguage } from "../../../lib/LanguageProvider";
import type { TranslationKey } from "../../../lib/i18n";

type SevaDetailData = {
  titleKey: TranslationKey;
  subtitleKey: TranslationKey;
  image: string;
  descriptionKey: TranslationKey;
  progress: number;
  progressTextKey: TranslationKey;
};

const sevaData: Record<string, SevaDetailData> = {
  "go-seva": {
    titleKey: "goSeva",
    subtitleKey: "careForGauMata",
    image: "/images/go-seva.jpg",
    descriptionKey: "goSevaDescription",
    progress: 72,
    progressTextKey: "goSevaProgress",
  },

  "nitya-bhog": {
    titleKey: "nityaBhogSeva",
    subtitleKey: "dailyFoodOffering",
    image: "/images/nitya-bhog.jpg",
    descriptionKey: "nityaBhogDescription",
    progress: 68,
    progressTextKey: "nityaBhogProgress",
  },

  flower: {
    titleKey: "flowerSeva",
    subtitleKey: "templeDecoration",
    image: "/images/flower-seva.jpg",
    descriptionKey: "flowerSevaDescription",
    progress: 54,
    progressTextKey: "flowerSevaProgress",
  },

  annakut: {
    titleKey: "annakutSeva",
    subtitleKey: "specialUtsavSeva",
    image: "/images/annakut.jpg",
    descriptionKey: "annakutDescription",
    progress: 82,
    progressTextKey: "annakutProgress",
  },

  "temple-maintenance": {
    titleKey: "templeMaintenance",
    subtitleKey: "supportTempleServices",
    image: "/images/temple-maintenance.jpg",
    descriptionKey: "templeMaintenanceDescription",
    progress: 45,
    progressTextKey: "templeMaintenanceProgress",
  },
};

const amounts = ["₹101", "₹501", "₹1,001", "₹5,001"];

export default function SevaDetail() {
  const router = useRouter();
  const params = useParams();
  const { t } = useLanguage();

  const rawId = Array.isArray(params.id)
    ? params.id[0]
    : params.id;

  const id = rawId ?? "go-seva";

  const seva =
    sevaData[id] || sevaData["go-seva"];

  const [selectedAmount, setSelectedAmount] =
    useState("₹501");

  const [customAmount, setCustomAmount] =
    useState("");

  const handleDonate = () => {
    const amount =
      selectedAmount === "Custom"
        ? customAmount
        : selectedAmount
            .replace("₹", "")
            .replace(",", "");

    if (!amount) {
      alert(t("selectDonationAmount"));
      return;
    }

    router.push(
      `/donate?seva=${encodeURIComponent(
        id
      )}&amount=${encodeURIComponent(amount)}`
    );
  };

  return (
    <main className={styles.screen}>
      {/* HEADER */}

      <header className={styles.header}>
        <button
          type="button"
          className={styles.back}
          onClick={() => router.back()}
          aria-label={t("back")}
        >
          ‹
        </button>

        <h1>
          {t("sevaDetail")}
        </h1>
      </header>

      {/* CONTENT */}

      <section className={styles.content}>
        {/* IMAGE */}

        <img
          src={seva.image}
          alt={t(seva.titleKey)}
          className={styles.hero}
        />

        {/* TITLE */}

        <h2>
          {t(seva.titleKey)}
        </h2>

        <div className={styles.subtitle}>
          {t(seva.subtitleKey)}
        </div>

        {/* DESCRIPTION */}

        <p className={styles.description}>
          {t(seva.descriptionKey)}
        </p>

        {/* PROGRESS */}

        <div className={styles.progressHeader}>
          <span>
            {t(seva.progressTextKey)}
          </span>

          <b>
            {seva.progress}%
          </b>
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
              type="button"
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
            type="button"
            className={
              selectedAmount === "Custom"
                ? `${styles.amount} ${styles.selected}`
                : styles.amount
            }
            onClick={() => {
              setSelectedAmount("Custom");
            }}
          >
            {t("custom")}
          </button>
        </div>

        {/* CUSTOM AMOUNT */}

        {selectedAmount === "Custom" && (
          <input
            className={styles.customInput}
            type="number"
            inputMode="numeric"
            placeholder={t("enterDonationAmount")}
            value={customAmount}
            onChange={(e) =>
              setCustomAmount(e.target.value)
            }
          />
        )}

        {/* DONATE */}

        <button
          type="button"
          className={styles.donate}
          onClick={handleDonate}
        >
          {t("donateNow")}
        </button>
      </section>
    </main>
  );
}