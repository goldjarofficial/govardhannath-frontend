"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useLanguage } from "../../lib/LanguageProvider";
import type { TranslationKey } from "../../lib/i18n";
import BottomNavigation from "@/app/components/navigation/BottomNavigation";

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
          (seva) => seva.category === category
        );

  return (
    <main
      className="
        min-h-screen
        bg-[#fff9ed]
        pb-[30px]
        text-[#4b4039]
      "
    >
      {/* ==================================================
          HEADER
      ================================================== */}

      <header
        className="
          relative

          flex
          h-[74px]
          items-center
          justify-center

          border-b
          border-[#f0e4d2]

          bg-[#fffdf7]

          sm:h-[78px]

          lg:h-[82px]
        "
      >
        <button
          type="button"
          onClick={() => router.back()}
          aria-label={t("back")}
          className="
            absolute
            left-[17px]
            top-1/2

            flex
            h-[38px]
            w-[38px]

            -translate-y-1/2

            items-center
            justify-center

            border-0
            bg-transparent

            text-[35px]
            font-light
            leading-none
            text-[#a71919]

            lg:left-[32px]
          "
        >
          ‹
        </button>

        <h1
          className="
            m-0

            font-serif
            text-[24px]
            font-bold
            text-[#641010]

            sm:text-[25px]

            lg:text-[27px]
          "
        >
          {t("sevaDonation")}
        </h1>
      </header>

      {/* ==================================================
          PAGE CONTENT
      ================================================== */}

      <div
        className="
          mx-auto
          w-full

          lg:max-w-[1200px]
          lg:px-8

          xl:max-w-[1400px]
        "
      >
        {/* ================================================
            CATEGORY TABS
        ================================================ */}

        <div
          className="
            flex
            items-center
            gap-2

            overflow-x-auto

            px-[15px]
            pb-[10px]
            pt-[14px]

            [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden

            sm:justify-center
            sm:gap-[10px]
            sm:px-6
            sm:pb-4
            sm:pt-5

            lg:justify-start
            lg:px-0
            lg:pb-6
            lg:pt-7
          "
        >
          {categories.map((item) => {
            const selected =
              category === item.id;

            return (
              <button
                type="button"
                key={item.id}
                onClick={() =>
                  setCategory(item.id)
                }
                className={`
                  h-[34px]
                  shrink-0

                  whitespace-nowrap

                  rounded-[10px]
                  border

                  px-[17px]

                  text-[12px]
                  font-semibold

                  transition-all
                  duration-150

                  active:scale-[0.98]

                  sm:h-[38px]
                  sm:px-5

                  lg:h-[42px]
                  lg:px-6
                  lg:text-[13px]

                  ${
                    selected
                      ? "border-[#a71919] bg-[#a71919] text-white"
                      : "border-[#eadbc5] bg-[#fffdf8] text-[#776d65] hover:border-[#a71919] hover:text-[#a71919]"
                  }
                `}
              >
                {t(item.label)}
              </button>
            );
          })}
        </div>

        {/* ================================================
            SEVA LIST
        ================================================ */}

        <section
          className="
            flex
            flex-col
            gap-[9px]

            px-[15px]
            pt-[5px]

            sm:grid
            sm:grid-cols-2
            sm:gap-4
            sm:px-6
            sm:pt-0

            lg:grid-cols-3
            lg:gap-5
            lg:px-0

            xl:grid-cols-3
            xl:gap-6
          "
        >
          {filteredSevas.map((seva) => (
            <button
              type="button"
              key={seva.id}
              onClick={() =>
                router.push(seva.route)
              }
              className="
                flex
                min-h-[82px]
                w-full
                items-center

                rounded-[12px]
                border
                border-[#f0e3d0]

                bg-[#fffdf8]

                p-[7px]

                text-left

                shadow-[0_2px_7px_rgba(100,50,20,0.05)]

                transition-all
                duration-150

                active:scale-[0.985]
                active:bg-[#fff7e8]

                sm:min-h-[105px]
                sm:p-[9px]

                lg:min-h-[135px]
                lg:rounded-[14px]
                lg:p-[10px]

                lg:hover:-translate-y-[2px]
                lg:hover:border-[#dfc89f]
                lg:hover:shadow-[0_7px_20px_rgba(100,50,20,0.08)]
              "
            >
              {/* IMAGE */}

              <img
                src={seva.image}
                alt={t(seva.titleKey)}
                className="
                  block

                  h-[68px]
                  w-[84px]

                  shrink-0

                  rounded-[9px]

                  bg-[#eadbc5]

                  object-cover

                  sm:h-[86px]
                  sm:w-[100px]

                  lg:h-[110px]
                  lg:w-[125px]
                  lg:rounded-[11px]
                "
              />

              {/* INFO */}

              <div
                className="
                  min-w-0
                  flex-1

                  px-[10px]

                  lg:px-[14px]
                "
              >
                <h2
                  className="
                    mb-1
                    mt-0

                    font-serif
                    text-[16px]
                    font-bold
                    leading-[1.2]
                    text-[#332820]

                    sm:text-[17px]

                    lg:text-[18px]
                  "
                >
                  {t(seva.titleKey)}
                </h2>

                <p
                  className="
                    m-0

                    text-[11px]
                    leading-[1.25]
                    text-[#8a8077]

                    sm:text-[12px]

                    lg:text-[13px]
                    lg:leading-[1.4]
                  "
                >
                  {t(seva.subtitleKey)}
                </p>
              </div>

              {/* ARROW */}

              <span
                className="
                  flex
                  w-[27px]
                  shrink-0
                  items-center
                  justify-center

                  font-sans
                  text-[30px]
                  font-light
                  leading-none
                  text-[#d3832d]

                  lg:w-[30px]
                  lg:text-[32px]
                "
              >
                ›
              </span>
            </button>
          ))}

          {/* ================================================
              EMPTY
          ================================================ */}

          {filteredSevas.length === 0 && (
            <div
              className="
                px-5
                py-10

                text-center
                text-[14px]
                text-[#8a8077]

                sm:col-span-2

                lg:col-span-3
              "
            >
              {t("noSevaAvailable")}
            </div>
          )}
        </section>

        {/* ================================================
            DECORATION
        ================================================ */}

        <div
          className="
            mt-[22px]

            text-center

            text-[17px]
            tracking-[8px]
            text-[#c99435]

            opacity-70

            sm:mt-8

            lg:mt-10
          "
        >
          ❧ ❧ ❧
        </div>
      </div>
      <BottomNavigation/>
    </main>
  );
}