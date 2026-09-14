"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useLanguage } from "../../lib/LanguageProvider";
import type { TranslationKey } from "../../lib/i18n";

type Category =
  | "all"
  | "sweets"
  | "mahaprasad"
  | "gifts";

type CategoryItem = {
  id: Category;
  labelKey: TranslationKey;
};

type Product = {
  id: number;
  titleKey: TranslationKey;
  price: number;
  image: string;
  category: Exclude<Category, "all">;
};

const categories: CategoryItem[] = [
  {
    id: "all",
    labelKey: "all",
  },
  {
    id: "sweets",
    labelKey: "sweets",
  },
  {
    id: "mahaprasad",
    labelKey: "mahaprasad",
  },
  {
    id: "gifts",
    labelKey: "gifts",
  },
];

const products: Product[] = [
  {
    id: 1,
    titleKey: "makhanaPrasadam",
    price: 200,
    image: "/images/makhana-prasadam.jpg",
    category: "mahaprasad",
  },
  {
    id: 2,
    titleKey: "peda",
    price: 180,
    image: "/images/peda.jpg",
    category: "sweets",
  },
  {
    id: 3,
    titleKey: "dryPrasadam",
    price: 250,
    image: "/images/dry-prasadam.jpg",
    category: "mahaprasad",
  },
  {
    id: 4,
    titleKey: "panchamrit",
    price: 300,
    image: "/images/panchamrit.jpg",
    category: "mahaprasad",
  },
];

export default function Prasadam() {
  const router = useRouter();
  const { t } = useLanguage();

  const [category, setCategory] =
    useState<Category>("all");

  const [cart, setCart] =
    useState<Record<number, number>>({});

  const filteredProducts =
    category === "all"
      ? products
      : products.filter(
          (product) =>
            product.category === category
        );

  const increase = (id: number) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const decrease = (id: number) => {
    setCart((prev) => {
      const quantity = prev[id] || 0;

      if (quantity <= 1) {
        const updated = { ...prev };

        delete updated[id];

        return updated;
      }

      return {
        ...prev,
        [id]: quantity - 1,
      };
    });
  };

  const totalItems =
    Object.values(cart).reduce(
      (sum, quantity) =>
        sum + quantity,
      0
    );

  const totalAmount =
    products.reduce(
      (sum, product) =>
        sum +
        product.price *
          (cart[product.id] || 0),
      0
    );

  const goToCart = () => {
    router.push(
      `/prasadam/cart?items=${totalItems}&amount=${totalAmount}`
    );
  };

  return (
    <main className="prasadamScreen">
      {/* HEADER */}

      <header className="prasadamHeader">
        <button
          type="button"
          className="prasadamBack"
          onClick={() => router.back()}
          aria-label={t("back")}
        >
          ‹
        </button>

        <div className="headerContent">
          <span className="headerEyebrow">
            Shri Govardhannath Haveli
          </span>

          <h1>{t("prasadam")}</h1>
        </div>

        <div className="headerSpace" />
      </header>

      {/* DESKTOP HERO */}

      <section className="desktopHero">
        <div>
          <span className="heroLabel">
            Sacred Offering
          </span>

          <h2>{t("prasadam")}</h2>

          <p>
            Choose blessed prasadam and sacred
            offerings from Shri Govardhannath Haveli.
          </p>
        </div>

        <div className="heroIcon">
          🛕
        </div>
      </section>

      {/* CATEGORIES */}

      <div className="categories">
        {categories.map((item) => (
          <button
            type="button"
            key={item.id}
            className={
              category === item.id
                ? "selectedCategory"
                : ""
            }
            onClick={() =>
              setCategory(item.id)
            }
          >
            {t(item.labelKey)}
          </button>
        ))}
      </div>

      {/* MAIN LAYOUT */}

      <div className="prasadamLayout">
        {/* PRODUCTS */}

        <section className="productList">
          {filteredProducts.map(
            (product) => {
              const quantity =
                cart[product.id] || 0;

              return (
                <div
                  key={product.id}
                  className="productCard"
                >
                  <div className="productImage">
                    <img
                      src={product.image}
                      alt={t(product.titleKey)}
                    />
                  </div>

                  <div className="productInfo">
                    <span className="productLabel">
                      {t("prasadam")}
                    </span>

                    <h2>
                      {t(product.titleKey)}
                    </h2>

                    <p>
                      ₹
                      {product.price.toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  </div>

                  <div className="quantity">
                    <button
                      type="button"
                      onClick={() =>
                        decrease(product.id)
                      }
                      aria-label={t(
                        "decreaseQuantity"
                      )}
                    >
                      −
                    </button>

                    <span>{quantity}</span>

                    <button
                      type="button"
                      className="plus"
                      onClick={() =>
                        increase(product.id)
                      }
                      aria-label={t(
                        "increaseQuantity"
                      )}
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            }
          )}
        </section>

        {/* DESKTOP CART SUMMARY */}

        <aside className="desktopCart">
          <div className="cartSummary">
            <span className="summaryLabel">
              {t("viewCart")}
            </span>

            <h2>{t("prasadam")}</h2>

            <div className="summaryRow">
              <span>
                Items
              </span>

              <strong>
                {totalItems}
              </strong>
            </div>

            <div className="summaryRow">
              <span>
                Total
              </span>

              <strong>
                ₹
                {totalAmount.toLocaleString(
                  "en-IN"
                )}
              </strong>
            </div>

            <button
              type="button"
              className="desktopCartButton"
              disabled={totalItems === 0}
              onClick={goToCart}
            >
              {t("viewCart")}
            </button>
          </div>
        </aside>
      </div>

      {/* MOBILE CART */}

      {totalItems > 0 && (
        <button
          type="button"
          className="mobileCart"
          onClick={goToCart}
        >
          <span>
            {t("viewCart")} ({totalItems})
          </span>

          <strong>
            ₹
            {totalAmount.toLocaleString(
              "en-IN"
            )}
          </strong>
        </button>
      )}

      {/* DECORATION */}

      <div className="prasadamDecoration">
        <span />
        <b>❧</b>
        <b>❧</b>
        <b>❧</b>
        <span />
      </div>

      <style jsx global>{`
        /* =========================================
           PAGE
        ========================================= */

        .prasadamScreen {
          width: 100%;

          min-height: 100dvh;

          padding-bottom:
            calc(
              90px +
              env(safe-area-inset-bottom)
            );

          background:
            radial-gradient(
              circle at 50% -10%,
              #fffef9 0,
              #fffaf0 42%,
              #f6ead5 100%
            );

          color: #4b4039;
        }

        .desktopHero,
        .desktopCart {
          display: none;
        }

        /* =========================================
           HEADER
        ========================================= */

        .prasadamHeader {
          position: relative;

          height: 72px;

          display: flex;

          align-items: center;
          justify-content: space-between;

          padding: 0 15px;

          border-bottom:
            1px solid #eadbc5;

          background:
            rgba(
              255,
              253,
              248,
              0.98
            );
        }

        .prasadamBack {
          width: 38px;
          height: 38px;

          display: grid;

          place-items: center;

          flex-shrink: 0;

          padding: 0;

          border: 1px solid #eadbc5;

          border-radius: 50%;

          background: #fffdf8;

          color: #a71919;

          font-size: 29px;

          line-height: 1;

          box-shadow:
            0 3px 10px
            rgba(70, 40, 10, 0.05);
        }

        .headerContent {
          flex: 1;

          text-align: center;
        }

        .headerEyebrow {
          display: none;
        }

        .prasadamHeader h1 {
          margin: 0;

          color: #641010;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 23px;
        }

        .headerSpace {
          width: 38px;

          flex-shrink: 0;
        }

        /* =========================================
           CATEGORIES
        ========================================= */

        .categories {
          display: flex;

          gap: 7px;

          overflow-x: auto;

          padding:
            13px 15px 10px;

          scrollbar-width: none;
        }

        .categories::-webkit-scrollbar {
          display: none;
        }

        .categories button {
          flex-shrink: 0;

          height: 35px;

          padding:
            0 15px;

          border:
            1px solid #eadbc5;

          border-radius: 8px;

          background: #fffdf8;

          color: #776d65;

          font-size: 10px;

          font-weight: 600;

          transition:
            background 0.18s ease,
            border-color 0.18s ease,
            color 0.18s ease,
            transform 0.18s ease;
        }

        .categories button.selectedCategory {
          border-color: #e74b18;

          background: #e74b18;

          color: white;
        }

        /* =========================================
           PRODUCTS
        ========================================= */

        .productList {
          display: flex;

          flex-direction: column;

          gap: 9px;

          padding: 0 15px;
        }

        .productCard {
          min-height: 82px;

          display: flex;

          align-items: center;

          gap: 10px;

          padding: 8px;

          border:
            1px solid #eee0cc;

          border-radius: 10px;

          background: #fffdf9;

          box-shadow:
            0 4px 14px
            rgba(79, 43, 14, 0.04);

          transition:
            transform 0.18s ease,
            border-color 0.18s ease,
            box-shadow 0.18s ease;
        }

        .productImage {
          width: 67px;
          height: 67px;

          flex-shrink: 0;

          overflow: hidden;

          border-radius: 9px;

          background: #f4e5c8;
        }

        .productImage img {
          width: 100%;
          height: 100%;

          display: block;

          object-fit: cover;
        }

        .productInfo {
          flex: 1;

          min-width: 0;
        }

        .productLabel {
          display: none;
        }

        .productInfo h2 {
          margin:
            0 0 5px;

          overflow: hidden;

          color: #332820;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 14px;

          text-overflow: ellipsis;

          white-space: nowrap;
        }

        .productInfo p {
          margin: 0;

          color: #776d65;

          font-size: 11px;
        }

        /* =========================================
           QUANTITY
        ========================================= */

        .quantity {
          display: flex;

          align-items: center;

          flex-shrink: 0;

          overflow: hidden;

          border:
            1px solid #eadbc5;

          border-radius: 7px;

          background: white;
        }

        .quantity button {
          width: 28px;
          height: 34px;

          border: 0;

          background: white;

          color: #777;

          font-size: 18px;
        }

        .quantity .plus {
          background: #e74b18;

          color: white;

          font-weight: 700;
        }

        .quantity span {
          width: 25px;

          text-align: center;

          color: #443932;

          font-size: 12px;

          font-weight: 700;
        }

        /* =========================================
           MOBILE CART
        ========================================= */

        .mobileCart {
          position: fixed;

          z-index: 30;

          left: 15px;
          right: 15px;

          bottom:
            calc(
              15px +
              env(safe-area-inset-bottom)
            );

          width:
            calc(100% - 30px);

          height: 49px;

          display: flex;

          align-items: center;
          justify-content: space-between;

          padding: 0 18px;

          border: 0;

          border-radius: 9px;

          background: #a71919;

          color: white;

          font-size: 13px;

          font-weight: 700;

          box-shadow:
            0 8px 22px
            rgba(113, 17, 17, 0.2);
        }

        .mobileCart strong {
          font-size: 14px;
        }

        /* =========================================
           DECORATION
        ========================================= */

        .prasadamDecoration {
          display: flex;

          align-items: center;
          justify-content: center;

          gap: 6px;

          margin-top: 24px;

          color: #c99435;
        }

        .prasadamDecoration span {
          width: 45px;
          height: 1px;

          background:
            linear-gradient(
              to right,
              transparent,
              #d8b66c
            );
        }

        .prasadamDecoration
          span:last-child {
          background:
            linear-gradient(
              to left,
              transparent,
              #d8b66c
            );
        }

        .prasadamDecoration b {
          font-size: 13px;

          font-weight: 400;
        }

        /* =========================================
           SMALL MOBILE
        ========================================= */

        @media (max-width: 359px) {
          .prasadamHeader {
            height: 64px;

            padding: 0 10px;
          }

          .prasadamBack {
            width: 34px;
            height: 34px;

            font-size: 26px;
          }

          .headerSpace {
            width: 34px;
          }

          .prasadamHeader h1 {
            font-size: 20px;
          }

          .categories {
            gap: 6px;

            padding:
              11px 10px 9px;
          }

          .categories button {
            height: 33px;

            padding:
              0 12px;

            font-size: 9px;
          }

          .productList {
            gap: 7px;

            padding:
              0 10px;
          }

          .productCard {
            gap: 8px;

            padding: 7px;
          }

          .productImage {
            width: 60px;
            height: 60px;
          }

          .productInfo h2 {
            font-size: 12px;
          }

          .productInfo p {
            font-size: 10px;
          }

          .quantity button {
            width: 25px;
            height: 31px;

            font-size: 16px;
          }

          .quantity span {
            width: 22px;

            font-size: 11px;
          }

          .mobileCart {
            left: 10px;
            right: 10px;

            width:
              calc(100% - 20px);

            height: 46px;

            padding:
              0 14px;

            font-size: 12px;
          }
        }

        /* =========================================
           LARGE MOBILE
        ========================================= */

        @media (min-width: 430px) and (max-width: 599px) {
          .prasadamHeader {
            height: 78px;
          }

          .prasadamHeader h1 {
            font-size: 25px;
          }

          .categories {
            gap: 9px;

            padding:
              16px 20px 12px;
          }

          .categories button {
            height: 39px;

            padding:
              0 18px;

            font-size: 11px;
          }

          .productList {
            gap: 11px;

            padding:
              0 20px;
          }

          .productCard {
            min-height: 96px;

            gap: 12px;

            padding: 10px;

            border-radius: 12px;
          }

          .productImage {
            width: 79px;
            height: 79px;

            border-radius: 10px;
          }

          .productInfo h2 {
            font-size: 16px;
          }

          .productInfo p {
            font-size: 12px;
          }

          .quantity button {
            width: 32px;
            height: 38px;
          }

          .quantity span {
            width: 28px;

            font-size: 13px;
          }

          .mobileCart {
            left: 20px;
            right: 20px;

            width:
              calc(100% - 40px);

            height: 52px;

            padding:
              0 20px;

            border-radius: 11px;

            font-size: 14px;
          }
        }

        /* =========================================
           TABLET
        ========================================= */

        @media (min-width: 600px) and (max-width: 1023px) {
          .prasadamScreen {
            min-height: 100vh;
          }

          .prasadamHeader {
            height: 82px;

            padding: 0 28px;
          }

          .prasadamBack {
            width: 42px;
            height: 42px;
          }

          .headerSpace {
            width: 42px;
          }

          .prasadamHeader h1 {
            font-size: 28px;
          }

          .categories {
            width:
              min(
                calc(100% - 48px),
                760px
              );

            justify-content: center;

            margin: 0 auto;

            padding:
              22px 0 18px;

            overflow: visible;
          }

          .categories button {
            height: 42px;

            padding:
              0 22px;

            font-size: 12px;
          }

          .productList {
            width:
              min(
                calc(100% - 48px),
                760px
              );

            display: grid;

            grid-template-columns:
              repeat(
                2,
                minmax(0, 1fr)
              );

            gap: 14px;

            margin: 0 auto;

            padding: 0;
          }

          .productCard {
            min-height: 125px;

            padding: 13px;

            border-radius: 15px;
          }

          .productImage {
            width: 95px;
            height: 95px;

            border-radius: 12px;
          }

          .productLabel {
            display: block;

            margin-bottom: 4px;

            color: #c99435;

            font-size: 9px;

            font-weight: 700;

            letter-spacing: 0.8px;

            text-transform: uppercase;
          }

          .productInfo h2 {
            font-size: 18px;
          }

          .productInfo p {
            margin-top: 7px;

            font-size: 13px;
          }

          .quantity button {
            width: 32px;
            height: 40px;
          }

          .quantity span {
            width: 28px;

            font-size: 13px;
          }

          .mobileCart {
            left: 50%;
            right: auto;

            width:
              min(
                calc(100% - 48px),
                760px
              );

            height: 54px;

            transform:
              translateX(-50%);

            border-radius: 11px;

            font-size: 14px;
          }
        }

        /* =========================================
           DESKTOP WEBSITE
        ========================================= */

        @media (min-width: 1024px) {
          .prasadamScreen {
            min-height: 100vh;

            padding:
              0 40px 55px;

            background:
              radial-gradient(
                circle at top right,
                rgba(
                  201,
                  148,
                  53,
                  0.12
                ),
                transparent 30%
              ),
              #fff9ed;
          }

          .prasadamHeader {
            height: 84px;

            margin:
              0 -40px;

            justify-content:
              flex-start;

            gap: 18px;

            padding: 0 42px;

            background: #fffdf8;
          }

          .prasadamBack {
            width: 44px;
            height: 44px;

            font-size: 31px;
          }

          .headerContent {
            flex: none;

            text-align: left;
          }

          .headerEyebrow {
            display: block;

            margin-bottom: 2px;

            color: #9a762f;

            font-size: 10px;

            font-weight: 700;

            letter-spacing: 1.3px;

            text-transform: uppercase;
          }

          .prasadamHeader h1 {
            font-size: 26px;
          }

          .headerSpace {
            display: none;
          }

          /* HERO */

          .desktopHero {
            width: 100%;

            max-width: 1320px;

            min-height: 150px;

            display: flex;

            align-items: center;
            justify-content: space-between;

            gap: 30px;

            margin:
              30px auto 0;

            padding:
              28px 34px;

            border:
              1px solid #eadbc5;

            border-radius: 22px;

            background:
              linear-gradient(
                135deg,
                #fffdf8,
                #fff3df
              );

            box-shadow:
              0 10px 30px
              rgba(80, 45, 15, 0.06);
          }

          .heroLabel {
            display: block;

            margin-bottom: 7px;

            color: #c99435;

            font-size: 11px;

            font-weight: 700;

            letter-spacing: 1.4px;

            text-transform: uppercase;
          }

          .desktopHero h2 {
            margin: 0;

            color: #641010;

            font-family:
              Georgia,
              "Times New Roman",
              serif;

            font-size: 35px;
          }

          .desktopHero p {
            max-width: 520px;

            margin: 9px 0 0;

            color: #776d65;

            font-size: 14px;

            line-height: 1.5;
          }

          .heroIcon {
            width: 86px;
            height: 86px;

            display: grid;
            place-items: center;

            flex-shrink: 0;

            border:
              1px solid #dec182;

            border-radius: 50%;

            background: #fffdf8;

            font-size: 42px;
          }

          /* CATEGORIES */

          .categories {
            width: 100%;

            max-width: 1320px;

            justify-content: flex-start;

            gap: 10px;

            margin: 0 auto;

            padding:
              25px 0 20px;

            overflow: visible;
          }

          .categories button {
            height: 42px;

            padding:
              0 22px;

            border-radius: 10px;

            font-size: 12px;
          }

          .categories button:hover {
            border-color: #e74b18;

            color: #e74b18;

            transform:
              translateY(-1px);
          }

          .categories
            button.selectedCategory:hover {
            color: white;
          }

          /* LAYOUT */

          .prasadamLayout {
            width: 100%;

            max-width: 1320px;

            display: grid;

            grid-template-columns:
              minmax(0, 1fr)
              330px;

            align-items: start;

            gap: 26px;

            margin: 0 auto;
          }

          .productList {
            display: grid;

            grid-template-columns:
              repeat(
                2,
                minmax(0, 1fr)
              );

            gap: 18px;

            padding: 0;
          }

          .productCard {
            min-height: 155px;

            gap: 15px;

            padding: 15px;

            border-radius: 16px;
          }

          .productCard:hover {
            transform:
              translateY(-3px);

            border-color: #d7b97f;

            box-shadow:
              0 12px 30px
              rgba(79, 43, 14, 0.09);
          }

          .productImage {
            width: 120px;
            height: 120px;

            border-radius: 13px;
          }

          .productLabel {
            display: block;

            margin-bottom: 5px;

            color: #c99435;

            font-size: 9px;

            font-weight: 700;

            letter-spacing: 1px;

            text-transform: uppercase;
          }

          .productInfo h2 {
            font-size: 20px;

            white-space: normal;
          }

          .productInfo p {
            margin-top: 8px;

            color: #a71919;

            font-size: 14px;

            font-weight: 700;
          }

          .quantity {
            border-radius: 9px;
          }

          .quantity button {
            width: 34px;
            height: 42px;

            font-size: 19px;
          }

          .quantity span {
            width: 30px;

            font-size: 13px;
          }

          /* DESKTOP CART */

          .desktopCart {
            display: block;

            position: sticky;

            top: 25px;
          }

          .cartSummary {
            padding: 25px 23px;

            border:
              1px solid #eadbc5;

            border-radius: 18px;

            background: #fffdf8;

            box-shadow:
              0 10px 30px
              rgba(80, 45, 15, 0.07);
          }

          .summaryLabel {
            display: block;

            margin-bottom: 6px;

            color: #c99435;

            font-size: 10px;

            font-weight: 700;

            letter-spacing: 1.2px;

            text-transform: uppercase;
          }

          .cartSummary h2 {
            margin:
              0 0 22px;

            color: #641010;

            font-family:
              Georgia,
              "Times New Roman",
              serif;

            font-size: 23px;
          }

          .summaryRow {
            display: flex;

            align-items: center;
            justify-content: space-between;

            gap: 12px;

            padding:
              12px 0;

            border-bottom:
              1px solid #eee0cc;

            color: #776d65;

            font-size: 12px;
          }

          .summaryRow strong {
            color: #433932;

            font-size: 13px;
          }

          .summaryRow:last-of-type
            strong {
            color: #a71919;

            font-size: 17px;
          }

          .desktopCartButton {
            width: 100%;
            height: 50px;

            margin-top: 22px;

            border: 0;

            border-radius: 10px;

            background: #a71919;

            color: white;

            font-size: 14px;

            font-weight: 700;

            transition:
              background 0.18s ease,
              transform 0.18s ease;
          }

          .desktopCartButton:hover:not(
              :disabled
            ) {
            background: #7f1111;

            transform:
              translateY(-1px);
          }

          .desktopCartButton:disabled {
            opacity: 0.45;

            cursor: not-allowed;
          }

          .mobileCart {
            display: none;
          }

          .prasadamDecoration {
            margin-top: 38px;
          }

          .prasadamDecoration span {
            width: 100px;
          }
        }

        /* =========================================
           LARGE DESKTOP
        ========================================= */

        @media (min-width: 1440px) {
          .desktopHero,
          .categories,
          .prasadamLayout {
            max-width: 1420px;
          }

          .desktopHero {
            min-height: 160px;

            padding:
              32px 40px;
          }

          .desktopHero h2 {
            font-size: 39px;
          }

          .heroIcon {
            width: 94px;
            height: 94px;

            font-size: 46px;
          }

          .prasadamLayout {
            grid-template-columns:
              minmax(0, 1fr)
              360px;

            gap: 30px;
          }

          .productList {
            grid-template-columns:
              repeat(
                3,
                minmax(0, 1fr)
              );

            gap: 20px;
          }

          .productCard {
            min-height: 340px;

            flex-direction: column;

            align-items: stretch;

            padding: 14px;
          }

          .productImage {
            width: 100%;
            height: 205px;

            border-radius: 14px;
          }

          .productInfo {
            padding:
              4px 3px 0;
          }

          .productInfo h2 {
            font-size: 21px;
          }

          .quantity {
            width: fit-content;

            margin-top: auto;
          }

          .cartSummary {
            padding:
              28px 26px;
          }
        }
      `}</style>
    </main>
  );
}