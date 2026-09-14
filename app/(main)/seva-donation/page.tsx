"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./seva-donation.module.css";

import { useLanguage } from "../../lib/LanguageProvider";
import type { TranslationKey } from "../../lib/i18n";

/* ======================================================
   CATEGORY TYPES
====================================================== */

type Category =
  | "all"
  | "popular"
  | "goSeva"
  | "utsav";

/* ======================================================
   CATEGORIES
====================================================== */

const categories: {
  id: Category;
  label: TranslationKey;
}[] = [
  {
    id: "all",
    label: "all",
  },
  {
    id: "popular",
    label: "popular",
  },
  {
    id: "goSeva",
    label: "goSeva",
  },
  {
    id: "utsav",
    label: "utsav",
  },
];

/* ======================================================
   SEVA DATA
====================================================== */

const sevas: {
  id: string;
  titleKey: TranslationKey;
  subtitleKey: TranslationKey;
  image: string;
  category: Category;
  route: string;
}[] = [
  {
    id: "go-seva",
    titleKey: "goSeva",
    subtitleKey: "careForGauMata",
    image: "/images/go-seva.jpg",
    category: "goSeva",
    route: "/seva/go-seva",
  },

  {
    id: "nitya-bhog",
    titleKey: "nityaBhogSeva",
    subtitleKey: "dailyFoodOffering",
    image: "/images/nitya-bhog.jpg",
    category: "popular",
    route: "/seva/nitya-bhog",
  },

  {
    id: "flower",
    titleKey: "flowerSeva",
    subtitleKey: "templeDecoration",
    image: "/images/flower-seva.jpg",
    category: "popular",
    route: "/seva/flower",
  },

  {
    id: "annakut",
    titleKey: "annakutSeva",
    subtitleKey: "specialUtsavSeva",
    image: "/images/annakut.jpg",
    category: "utsav",
    route: "/seva/annakut",
  },

  {
    id: "temple-maintenance",
    titleKey: "templeMaintenance",
    subtitleKey: "supportTempleServices",
    image: "/images/temple-maintenance.jpg",
    category: "all",
    route: "/seva/temple-maintenance",
  },
];

/* ======================================================
   COMPONENT
====================================================== */

export default function SevaDonation() {
  const router = useRouter();

  const { t } = useLanguage();

  const [category, setCategory] =
    useState<Category>("all");

  /* ====================================================
     FILTER SEVAS
  ==================================================== */

  const filteredSevas =
    category === "all"
      ? sevas
      : sevas.filter(
          (seva) =>
            seva.category === category
        );

  return (
    <main className={styles.screen}>
      {/* ==============================
          HEADER
      ============================== */}

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
          {t("sevaDonation")}
        </h1>
      </header>

      {/* ==============================
          CATEGORY TABS
      ============================== */}

      <div className={styles.categories}>
        {categories.map((item) => (
          <button
            type="button"
            key={item.id}
            className={
              category === item.id
                ? `${styles.category} ${styles.selected}`
                : styles.category
            }
            onClick={() =>
              setCategory(item.id)
            }
          >
            {t(item.label)}
          </button>
        ))}
      </div>

      {/* ==============================
          SEVA LIST
      ============================== */}

      <section className={styles.list}>
        {filteredSevas.map((seva) => (
          <button
            type="button"
            key={seva.id}
            className={styles.sevaCard}
            onClick={() =>
              router.push(seva.route)
            }
          >
            <img
              src={seva.image}
              alt={t(seva.titleKey)}
              className={styles.sevaImage}
            />

            <div className={styles.sevaInfo}>
              <h2>
                {t(seva.titleKey)}
              </h2>

              <p>
                {t(seva.subtitleKey)}
              </p>
            </div>

            <span className={styles.arrow}>
              ›
            </span>
          </button>
        ))}

        {filteredSevas.length === 0 && (
          <div className={styles.empty}>
            {t("noSevaAvailable")}
          </div>
        )}
      </section>

      {/* ==============================
          BOTTOM DECORATION
      ============================== */}

      <div className={styles.decoration}>
        ❧ ❧ ❧
      </div>
    </main>
  );
}