"use client";

import {
  useMemo,
} from "react";

import {
  useRouter,
  useSearchParams,
} from "next/navigation";

export default function DonationSuccess() {
  const router = useRouter();

  const params =
    useSearchParams();

  const seva =
    params.get("seva") ||
    "Go Seva";

  const amount =
    params.get("amount") ||
    "1001";

  const type =
    params.get("type") ||
    "one-time";

  const frequency =
    params.get(
      "frequency"
    ) || "monthly";

  const transactionId =
    useMemo(() => {
      return (
        "DON" +
        Math.floor(
          100000 +
            Math.random() *
              900000
        )
      );
    }, []);

  const formattedAmount =
    Number(
      amount || 0
    ).toLocaleString(
      "en-IN"
    );

  const formattedFrequency =
    frequency
      .charAt(0)
      .toUpperCase() +
    frequency.slice(1);

  const handleReceipt = () => {
    alert(
      "Receipt download will be connected to the backend."
    );
  };

  const handleShare =
    async () => {
      const shareData = {
        title:
          "Seva Contribution",

        text: `I contributed ₹${formattedAmount} towards ${seva}. Jai Shree Krishna 🙏`,
      };

      if (
        navigator.share
      ) {
        try {
          await navigator.share(
            shareData
          );
        } catch {
          // User cancelled share
        }
      } else {
        alert(
          "Sharing is not supported on this browser."
        );
      }
    };

  return (
    <main className="successScreen">
      {/* DECORATION */}

      <div className="glow glowOne" />
      <div className="glow glowTwo" />

      {/* SUCCESS CARD */}

      <section className="successCard">
        {/* ICON */}

        <div className="check">
          ✓
        </div>

        {/* TITLE */}

        <span className="statusLabel">
          Payment Successful
        </span>

        <h1>
          {type === "auto"
            ? "Auto Seva Started!"
            : "Seva Successful!"}
        </h1>

        <h2>
          Jai Shree Krishna
        </h2>

        {/* DECORATION */}

        <div className="divider">
          <span />
          <b>✦</b>
          <span />
        </div>

        {/* THANKS */}

        <p className="thanks">
          Thank you for your
          generous contribution.
        </p>

        {/* DETAILS */}

        <div className="details">
          <div>
            <span>
              Seva
            </span>

            <b>
              {seva}
            </b>
          </div>

          <div>
            <span>
              Amount
            </span>

            <b className="amount">
              ₹
              {
                formattedAmount
              }
            </b>
          </div>

          {type ===
            "auto" && (
            <div>
              <span>
                Frequency
              </span>

              <b>
                {
                  formattedFrequency
                }
              </b>
            </div>
          )}

          <div>
            <span>
              Transaction ID
            </span>

            <b className="transaction">
              {
                transactionId
              }
            </b>
          </div>

          <div>
            <span>
              Date
            </span>

            <b>
              14 Sep 2026
            </b>
          </div>
        </div>

        {/* ACTIONS */}

        <div className="actions">
          <button
            type="button"
            className="receipt"
            onClick={
              handleReceipt
            }
          >
            <span>⇩</span>
            Download Receipt
          </button>

          <button
            type="button"
            className="share"
            onClick={
              handleShare
            }
          >
            <span>↗</span>
            Share
          </button>

          <button
            type="button"
            className="home"
            onClick={() =>
              router.push(
                "/dashboard"
              )
            }
          >
            ← Back to Home
          </button>
        </div>

        {/* SECURE */}

        <div className="secure">
          🔒 Your payment was
          processed securely
        </div>
      </section>

      <style jsx global>{`
        /* ==========================================
           SCREEN
        ========================================== */

        .successScreen {
          position: relative;

          width: 100%;
          min-height:
            100dvh;

          display: flex;

          align-items:
            center;

          justify-content:
            center;

          padding:
            20px
            20px
            calc(
              20px +
              env(
                safe-area-inset-bottom
              )
            );

          overflow: hidden;

          background:
            radial-gradient(
              circle at 50% 0%,
              #ffffff 0%,
              #fffaf0 42%,
              #f6ead5 100%
            );

          color:
            #4b4039;
        }

        /* ==========================================
           BACKGROUND GLOW
        ========================================== */

        .glow {
          position:
            absolute;

          border-radius:
            50%;

          pointer-events:
            none;
        }

        .glowOne {
          width: 160px;
          height: 160px;

          top: -70px;
          right: -65px;

          background:
            rgba(
              25,
              168,
              120,
              0.08
            );
        }

        .glowTwo {
          width: 170px;
          height: 170px;

          left: -85px;
          bottom: -80px;

          background:
            rgba(
              201,
              148,
              53,
              0.09
            );
        }

        /* ==========================================
           CARD
        ========================================== */

        .successCard {
          position:
            relative;

          z-index: 2;

          width: 100%;

          max-width:
            390px;

          padding:
            25px 18px;

          border:
            1px solid
            #eadbc5;

          border-radius:
            16px;

          background:
            #fffdf8;

          text-align:
            center;

          box-shadow:
            0 10px 30px
            rgba(
              79,
              43,
              14,
              0.07
            );
        }

        /* ==========================================
           CHECK
        ========================================== */

        .check {
          width: 72px;
          height: 72px;

          display: grid;

          place-items:
            center;

          margin:
            0 auto 12px;

          border-radius:
            50%;

          background:
            linear-gradient(
              145deg,
              #21ba86,
              #14895f
            );

          color: white;

          font-size: 42px;

          font-weight: 700;

          box-shadow:
            0 8px 20px
            rgba(
              25,
              168,
              120,
              0.2
            );
        }

        /* ==========================================
           STATUS
        ========================================== */

        .statusLabel {
          display:
            inline-block;

          margin-bottom:
            6px;

          padding:
            5px 10px;

          border:
            1px solid
            #cfe8dd;

          border-radius:
            999px;

          background:
            #edf8f3;

          color:
            #248463;

          font-size: 9px;

          font-weight: 700;

          letter-spacing:
            0.7px;

          text-transform:
            uppercase;
        }

        /* ==========================================
           TITLES
        ========================================== */

        .successCard h1 {
          margin: 0;

          color: #27634e;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 21px;

          line-height: 1.2;
        }

        .successCard h2 {
          margin:
            7px 0 0;

          color: #a71919;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 15px;
        }

        /* ==========================================
           DIVIDER
        ========================================== */

        .divider {
          display: flex;

          align-items:
            center;

          justify-content:
            center;

          gap: 8px;

          margin:
            12px 0;
        }

        .divider span {
          width: 45px;
          height: 1px;

          background:
            linear-gradient(
              to right,
              transparent,
              #d5b66d
            );
        }

        .divider
          span:last-child {
          background:
            linear-gradient(
              to left,
              transparent,
              #d5b66d
            );
        }

        .divider b {
          color: #c99435;

          font-size: 9px;
        }

        /* ==========================================
           THANKS
        ========================================== */

        .thanks {
          max-width:
            300px;

          margin:
            0 auto 17px;

          color: #776d65;

          font-size: 12px;

          line-height: 1.5;
        }

        /* ==========================================
           DETAILS
        ========================================== */

        .details {
          padding:
            12px;

          border:
            1px solid
            #f0dfc4;

          border-radius:
            10px;

          background:
            #fff8eb;

          text-align: left;
        }

        .details div {
          display: flex;

          align-items:
            center;

          justify-content:
            space-between;

          gap: 12px;

          padding:
            8px 0;

          border-bottom:
            1px solid
            #eee0cc;

          font-size: 11px;
        }

        .details
          div:last-child {
          border-bottom: 0;
        }

        .details span {
          color: #8a8077;

          flex-shrink: 0;
        }

        .details b {
          color: #433932;

          text-align: right;

          overflow-wrap:
            anywhere;
        }

        .details .amount {
          color:
            #a71919;

          font-size: 13px;
        }

        .transaction {
          font-family:
            monospace;

          letter-spacing:
            0.4px;
        }

        /* ==========================================
           ACTIONS
        ========================================== */

        .actions {
          width: 100%;
        }

        .receipt,
        .share,
        .home {
          width: 100%;

          border-radius:
            9px;

          font-weight: 700;

          transition:
            transform
              0.18s ease,
            background
              0.18s ease,
            border-color
              0.18s ease,
            color
              0.18s ease;
        }

        .receipt {
          height: 45px;

          display:
            inline-flex;

          align-items:
            center;

          justify-content:
            center;

          gap: 8px;

          margin-top:
            12px;

          border: 0;

          background:
            #a71919;

          color: white;

          font-size: 13px;

          box-shadow:
            0 6px 15px
            rgba(
              113,
              17,
              17,
              0.13
            );
        }

        .receipt span {
          font-size: 17px;
        }

        .share {
          height: 45px;

          display:
            inline-flex;

          align-items:
            center;

          justify-content:
            center;

          gap: 7px;

          margin-top:
            9px;

          border:
            1px solid
            #eadbc5;

          background: white;

          color: #a71919;

          font-size: 13px;
        }

        .share span {
          font-size: 16px;
        }

        .home {
          height: 42px;

          margin-top:
            5px;

          border: 0;

          background:
            transparent;

          color: #776d65;

          font-size: 12px;
        }

        .receipt:active,
        .share:active {
          transform:
            scale(0.985);
        }

        /* ==========================================
           SECURE
        ========================================== */

        .secure {
          margin-top:
            10px;

          color: #9b762f;

          font-size: 9px;

          font-weight: 600;
        }

        /* ==========================================
           SMALL MOBILE
        ========================================== */

        @media (
          max-width: 359px
        ) {
          .successScreen {
            padding: 14px;
          }

          .successCard {
            padding:
              22px 14px;

            border-radius:
              14px;
          }

          .check {
            width: 62px;
            height: 62px;

            margin-bottom:
              10px;

            font-size: 36px;
          }

          .statusLabel {
            font-size: 8px;
          }

          .successCard h1 {
            font-size: 19px;
          }

          .successCard h2 {
            font-size: 14px;
          }

          .thanks {
            margin-bottom:
              14px;

            font-size: 11px;
          }

          .details {
            padding: 10px;
          }

          .details div {
            font-size: 10px;
          }

          .receipt,
          .share {
            height: 43px;

            font-size: 12px;
          }

          .home {
            height: 38px;

            font-size: 11px;
          }
        }

        /* ==========================================
           SHORT MOBILE
        ========================================== */

        @media (
          max-height: 650px
        ) and (
          max-width: 599px
        ) {
          .successScreen {
            align-items:
              flex-start;

            overflow-y: auto;

            padding-top:
              14px;
          }

          .successCard {
            padding-top:
              18px;

            padding-bottom:
              18px;
          }

          .check {
            width: 56px;
            height: 56px;

            margin-bottom:
              8px;

            font-size: 32px;
          }

          .divider {
            margin:
              8px 0;
          }

          .thanks {
            margin-bottom:
              12px;
          }

          .details div {
            padding:
              6px 0;
          }

          .receipt {
            margin-top:
              9px;
          }
        }

        /* ==========================================
           LARGE MOBILE
        ========================================== */

        @media (
          min-width: 430px
        ) and (
          max-width: 599px
        ) {
          .successScreen {
            padding: 28px;
          }

          .successCard {
            max-width:
              430px;

            padding:
              32px 24px;

            border-radius:
              19px;
          }

          .check {
            width: 80px;
            height: 80px;

            font-size: 46px;
          }

          .successCard h1 {
            font-size: 25px;
          }

          .successCard h2 {
            font-size: 16px;
          }

          .thanks {
            font-size: 13px;
          }

          .details {
            padding: 15px;
          }

          .details div {
            padding:
              9px 0;

            font-size: 12px;
          }

          .receipt,
          .share {
            height: 49px;

            font-size: 14px;
          }
        }

        /* ==========================================
           TABLET
        ========================================== */

        @media (
          min-width: 600px
        ) and (
          max-width: 1023px
        ) {
          .successScreen {
            padding:
              50px 24px;
          }

          .successCard {
            max-width:
              520px;

            padding:
              42px 42px
              38px;

            border-radius:
              23px;

            box-shadow:
              0 18px 45px
              rgba(
                79,
                43,
                14,
                0.09
              );
          }

          .check {
            width: 88px;
            height: 88px;

            margin-bottom:
              16px;

            font-size: 51px;
          }

          .statusLabel {
            margin-bottom:
              8px;

            padding:
              6px 12px;

            font-size: 9px;
          }

          .successCard h1 {
            font-size: 30px;
          }

          .successCard h2 {
            margin-top:
              9px;

            font-size: 17px;
          }

          .divider {
            margin:
              17px 0;
          }

          .divider span {
            width: 70px;
          }

          .thanks {
            max-width:
              380px;

            margin-bottom:
              23px;

            font-size: 14px;
          }

          .details {
            padding:
              16px 18px;

            border-radius:
              13px;
          }

          .details div {
            padding:
              10px 0;

            font-size: 13px;
          }

          .details .amount {
            font-size: 15px;
          }

          .receipt,
          .share {
            height: 52px;

            border-radius:
              11px;

            font-size: 14px;
          }

          .home {
            height: 43px;

            font-size: 13px;
          }

          .secure {
            margin-top:
              14px;

            font-size: 10px;
          }
        }

        /* ==========================================
           DESKTOP WEBSITE
        ========================================== */

        @media (
          min-width: 1024px
        ) {
          .successScreen {
            min-height:
              100vh;

            padding:
              65px 40px;

            background:
              radial-gradient(
                circle at top left,
                rgba(
                  25,
                  168,
                  120,
                  0.08
                ),
                transparent
                  30%
              ),
              radial-gradient(
                circle at bottom right,
                rgba(
                  201,
                  148,
                  53,
                  0.13
                ),
                transparent
                  30%
              ),
              #fff9ed;
          }

          .successCard {
            max-width:
              610px;

            padding:
              52px 55px
              46px;

            border-radius:
              28px;

            background:
              rgba(
                255,
                253,
                248,
                0.98
              );

            box-shadow:
              0 24px 65px
              rgba(
                79,
                43,
                14,
                0.11
              );
          }

          .check {
            width: 98px;
            height: 98px;

            margin-bottom:
              18px;

            font-size: 56px;

            box-shadow:
              0 12px 28px
              rgba(
                25,
                168,
                120,
                0.22
              );
          }

          .statusLabel {
            margin-bottom:
              9px;

            padding:
              6px 13px;

            font-size: 10px;
          }

          .successCard h1 {
            font-size: 36px;
          }

          .successCard h2 {
            margin-top:
              10px;

            font-size: 19px;
          }

          .divider {
            margin:
              20px 0;
          }

          .divider span {
            width: 90px;
          }

          .divider b {
            font-size: 11px;
          }

          .thanks {
            max-width:
              420px;

            margin-bottom:
              28px;

            font-size: 15px;

            line-height: 1.6;
          }

          .details {
            padding:
              19px 22px;

            border-radius:
              14px;
          }

          .details div {
            padding:
              11px 0;

            font-size: 13px;
          }

          .details .amount {
            font-size: 16px;
          }

          .actions {
            max-width:
              420px;

            margin: 0 auto;
          }

          .receipt {
            height: 54px;

            margin-top:
              24px;

            border-radius:
              12px;

            font-size: 15px;
          }

          .receipt:hover {
            background:
              #7f1111;

            transform:
              translateY(-1px);

            box-shadow:
              0 9px 22px
              rgba(
                113,
                17,
                17,
                0.18
              );
          }

          .share {
            height: 52px;

            margin-top:
              10px;

            border-radius:
              12px;

            font-size: 14px;
          }

          .share:hover {
            border-color:
              #a71919;

            background:
              #fff5ed;

            transform:
              translateY(-1px);
          }

          .home {
            height: 44px;

            font-size: 13px;
          }

          .home:hover {
            color: #a71919;
          }

          .secure {
            margin-top:
              17px;

            font-size: 10px;
          }

          .glowOne {
            width: 290px;
            height: 290px;

            top: -130px;
            right: -100px;
          }

          .glowTwo {
            width: 280px;
            height: 280px;

            left: -130px;
            bottom: -120px;
          }
        }

        /* ==========================================
           LARGE DESKTOP
        ========================================== */

        @media (
          min-width: 1440px
        ) {
          .successCard {
            max-width:
              660px;

            padding:
              58px 62px
              52px;
          }

          .check {
            width: 106px;
            height: 106px;

            font-size: 61px;
          }

          .successCard h1 {
            font-size: 40px;
          }

          .successCard h2 {
            font-size: 20px;
          }

          .thanks {
            font-size: 16px;
          }

          .details div {
            font-size: 14px;
          }

          .actions {
            max-width:
              450px;
          }

          .receipt {
            height: 57px;

            font-size: 16px;
          }
        }
      `}</style>
    </main>
  );
}