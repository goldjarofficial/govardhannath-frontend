"use client";

import { useRouter } from "next/navigation";

export default function DonationFailed() {
  const router = useRouter();

  return (
    <main className="failedScreen">
      {/* DECORATION */}

      <div className="decoration decorationLeft" />
      <div className="decoration decorationRight" />

      {/* CARD */}

      <section className="failedCard">
        {/* FAILED ICON */}

        <div className="cross">×</div>

        {/* TITLE */}

        <h1>Payment Failed</h1>

        <h2>Jai Shree Krishna</h2>

        <div className="divider">
          <span />
          <b>✦</b>
          <span />
        </div>

        <p className="message">
          We could not complete your contribution.
          Please try again.
        </p>

        {/* ACTIONS */}

        <div className="actions">
          <button
            type="button"
            className="retry"
            onClick={() => router.back()}
          >
            Try Again
          </button>

          <button
            type="button"
            className="home"
            onClick={() => router.push("/dashboard")}
          >
            ← Back to Home
          </button>
        </div>

        {/* SECURITY */}

        <div className="secure">
          🔒 Your payment information is secure
        </div>
      </section>

      <style jsx global>{`
        /* ==========================================
           PAGE
        ========================================== */

        .failedScreen {
          position: relative;

          width: 100%;
          min-height: 100dvh;

          display: flex;
          align-items: center;
          justify-content: center;

          padding:
            20px
            20px
            calc(
              20px +
              env(safe-area-inset-bottom)
            );

          overflow: hidden;

          background:
            radial-gradient(
              circle at 50% 5%,
              #ffffff 0%,
              #fffaf0 42%,
              #f6ead5 100%
            );

          color: #4b4039;
        }

        /* ==========================================
           CARD
        ========================================== */

        .failedCard {
          position: relative;
          z-index: 2;

          width: 100%;
          max-width: 390px;

          padding: 30px 18px;

          border: 1px solid #eadbc5;

          border-radius: 16px;

          background: #fffdf8;

          text-align: center;

          box-shadow:
            0 10px 30px
            rgba(79, 43, 14, 0.07);
        }

        /* ==========================================
           FAILED ICON
        ========================================== */

        .cross {
          width: 72px;
          height: 72px;

          display: grid;
          place-items: center;

          margin: 0 auto 14px;

          border-radius: 50%;

          background:
            linear-gradient(
              145deg,
              #c84b42,
              #a92720
            );

          color: white;

          font-family: Arial, sans-serif;

          font-size: 43px;
          font-weight: 300;

          line-height: 1;

          box-shadow:
            0 7px 18px
            rgba(184, 58, 50, 0.2);
        }

        /* ==========================================
           TITLE
        ========================================== */

        .failedCard h1 {
          margin: 0;

          color: #a71919;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 22px;
          font-weight: 700;
        }

        .failedCard h2 {
          margin: 7px 0;

          color: #641010;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 15px;
          font-weight: 700;
        }

        /* ==========================================
           DIVIDER
        ========================================== */

        .divider {
          display: flex;

          align-items: center;
          justify-content: center;

          gap: 8px;

          margin: 13px 0;
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

        .divider span:last-child {
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
           MESSAGE
        ========================================== */

        .message {
          max-width: 310px;

          margin: 0 auto 20px;

          color: #776d65;

          font-size: 12px;

          line-height: 1.6;
        }

        /* ==========================================
           ACTIONS
        ========================================== */

        .actions {
          width: 100%;
        }

        .retry {
          width: 100%;
          height: 46px;

          border: 0;

          border-radius: 9px;

          background: #a71919;

          color: white;

          font-size: 14px;
          font-weight: 700;

          box-shadow:
            0 6px 15px
            rgba(113, 17, 17, 0.14);

          transition:
            transform 0.18s ease,
            background 0.18s ease,
            box-shadow 0.18s ease;
        }

        .retry:active {
          transform: scale(0.985);
        }

        .home {
          width: 100%;
          height: 42px;

          margin-top: 8px;

          border: 0;

          background: transparent;

          color: #776d65;

          font-size: 12px;

          transition:
            color 0.18s ease;
        }

        /* ==========================================
           SECURITY
        ========================================== */

        .secure {
          margin-top: 13px;

          color: #9b762f;

          font-size: 9px;
          font-weight: 600;
        }

        /* ==========================================
           DECORATION
        ========================================== */

        .decoration {
          position: absolute;

          width: 100px;
          height: 100px;

          border: 1px solid #d5b66d;

          border-radius: 50%;

          opacity: 0.14;

          pointer-events: none;
        }

        .decorationLeft {
          left: -50px;
          bottom: 30px;
        }

        .decorationRight {
          top: 35px;
          right: -50px;
        }

        /* ==========================================
           SMALL MOBILE
        ========================================== */

        @media (max-width: 359px) {
          .failedScreen {
            padding: 14px;
          }

          .failedCard {
            padding: 25px 15px;

            border-radius: 14px;
          }

          .cross {
            width: 62px;
            height: 62px;

            margin-bottom: 12px;

            font-size: 37px;
          }

          .failedCard h1 {
            font-size: 20px;
          }

          .failedCard h2 {
            font-size: 14px;
          }

          .message {
            margin-bottom: 17px;

            font-size: 11px;
          }

          .retry {
            height: 44px;

            font-size: 13px;
          }

          .home {
            height: 38px;

            font-size: 11px;
          }
        }

        /* ==========================================
           SHORT MOBILE
        ========================================== */

        @media (max-height: 600px) and (max-width: 599px) {
          .failedCard {
            padding-top: 22px;
            padding-bottom: 22px;
          }

          .cross {
            width: 58px;
            height: 58px;

            margin-bottom: 10px;

            font-size: 35px;
          }

          .divider {
            margin: 9px 0;
          }

          .message {
            margin-bottom: 15px;
          }

          .secure {
            margin-top: 8px;
          }
        }

        /* ==========================================
           LARGE MOBILE
        ========================================== */

        @media (min-width: 430px) and (max-width: 599px) {
          .failedScreen {
            padding: 28px;
          }

          .failedCard {
            max-width: 420px;

            padding: 35px 24px;

            border-radius: 18px;
          }

          .cross {
            width: 78px;
            height: 78px;

            font-size: 46px;
          }

          .failedCard h1 {
            font-size: 25px;
          }

          .failedCard h2 {
            font-size: 16px;
          }

          .message {
            font-size: 13px;
          }

          .retry {
            height: 50px;

            font-size: 15px;
          }
        }

        /* ==========================================
           TABLET
        ========================================== */

        @media (min-width: 600px) and (max-width: 1023px) {
          .failedScreen {
            padding: 50px 24px;
          }

          .failedCard {
            max-width: 500px;

            padding: 42px 40px;

            border-radius: 22px;

            box-shadow:
              0 18px 45px
              rgba(79, 43, 14, 0.09);
          }

          .cross {
            width: 84px;
            height: 84px;

            margin-bottom: 18px;

            font-size: 50px;
          }

          .failedCard h1 {
            font-size: 30px;
          }

          .failedCard h2 {
            margin-top: 9px;

            font-size: 17px;
          }

          .divider {
            margin: 17px 0;
          }

          .divider span {
            width: 70px;
          }

          .message {
            max-width: 360px;

            margin-bottom: 25px;

            font-size: 14px;
          }

          .retry {
            height: 53px;

            border-radius: 11px;

            font-size: 15px;
          }

          .home {
            height: 44px;

            font-size: 13px;
          }

          .secure {
            font-size: 10px;
          }
        }

        /* ==========================================
           DESKTOP WEBSITE
        ========================================== */

        @media (min-width: 1024px) {
          .failedScreen {
            min-height: 100vh;

            padding: 60px 40px;

            background:
              radial-gradient(
                circle at top left,
                rgba(201, 148, 53, 0.13),
                transparent 33%
              ),
              radial-gradient(
                circle at bottom right,
                rgba(167, 25, 25, 0.08),
                transparent 30%
              ),
              #fff9ed;
          }

          .failedCard {
            max-width: 560px;

            padding: 50px 52px 45px;

            border-radius: 26px;

            background:
              rgba(
                255,
                253,
                248,
                0.98
              );

            box-shadow:
              0 22px 60px
              rgba(79, 43, 14, 0.11);
          }

          .cross {
            width: 92px;
            height: 92px;

            margin-bottom: 20px;

            font-size: 55px;

            box-shadow:
              0 10px 25px
              rgba(184, 58, 50, 0.2);
          }

          .failedCard h1 {
            font-size: 34px;
          }

          .failedCard h2 {
            margin: 10px 0 0;

            font-size: 18px;
          }

          .divider {
            margin: 20px 0;
          }

          .divider span {
            width: 90px;
          }

          .divider b {
            font-size: 11px;
          }

          .message {
            max-width: 400px;

            margin-bottom: 29px;

            font-size: 14px;

            line-height: 1.7;
          }

          .actions {
            max-width: 390px;

            margin: 0 auto;
          }

          .retry {
            height: 54px;

            border-radius: 12px;

            font-size: 15px;
          }

          .retry:hover {
            background: #7f1111;

            transform: translateY(-1px);

            box-shadow:
              0 9px 22px
              rgba(113, 17, 17, 0.18);
          }

          .home {
            height: 44px;

            margin-top: 9px;

            font-size: 13px;
          }

          .home:hover {
            color: #a71919;
          }

          .secure {
            margin-top: 18px;

            font-size: 10px;
          }

          .decoration {
            width: 180px;
            height: 180px;

            opacity: 0.1;
          }

          .decorationLeft {
            left: -70px;
            bottom: 55px;
          }

          .decorationRight {
            top: 55px;
            right: -70px;
          }
        }

        /* ==========================================
           LARGE DESKTOP
        ========================================== */

        @media (min-width: 1440px) {
          .failedCard {
            max-width: 600px;

            padding: 56px 58px 50px;
          }

          .cross {
            width: 100px;
            height: 100px;

            font-size: 60px;
          }

          .failedCard h1 {
            font-size: 38px;
          }

          .failedCard h2 {
            font-size: 19px;
          }

          .message {
            max-width: 420px;

            font-size: 15px;
          }

          .actions {
            max-width: 420px;
          }

          .retry {
            height: 56px;

            font-size: 16px;
          }
        }
      `}</style>
    </main>
  );
}