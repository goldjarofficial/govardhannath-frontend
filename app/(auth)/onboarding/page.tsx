"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const slides = [
  {
    image: "/images/thakurji-1.jpg",
    title: (
      <>
        Experience
        <br />
        the Divine Grace
      </>
    ),
    tags: "Live Darshan • Seva • Satsang",
    text: (
      <>
        Stay connected with
        <br />
        Shri Govardhannathji
      </>
    ),
  },
  {
    image: "/images/thakurji-2.jpg",
    title: (
      <>
        Daily
        <br />
        Divine Darshan
      </>
    ),
    tags: "Darshan • Aarti • Utsav",
    text: (
      <>
        Feel the divine presence
        <br />
        wherever you are
      </>
    ),
  },
  {
    image: "/images/thakurji-3.jpg",
    title: (
      <>
        Be a Part
        <br />
        of Seva
      </>
    ),
    tags: "Seva • Bhog • Vandan",
    text: (
      <>
        Participate in sacred seva
        <br />
        with devotion
      </>
    ),
  },
  {
    image: "/images/thakurji-4.jpg",
    title: (
      <>
        Stay Connected
        <br />
        with Haveli
      </>
    ),
    tags: "Satsang • Events • Updates",
    text: (
      <>
        Everything about
        <br />
        Shri Govardhannath Haveli
      </>
    ),
  },
];

export default function Onboarding() {
  const router = useRouter();

  const [index, setIndex] = useState(0);

  const slide = slides[index];

  const next = () => {
    if (index === slides.length - 1) {
      router.push("/language");
    } else {
      setIndex((prev) => prev + 1);
    }
  };

  const skip = () => {
    router.push("/language");
  };

  return (
    <main className="screen">
      {/* IMAGE AREA */}

      <div className="image">
        <img
          src={slide.image}
          alt="Shri Govardhannathji"
        />
      </div>

      {/* CONTENT */}

      <section className="content">
        <div className="contentInner">
          <div className="miniLogo">
            🛕
          </div>

          <h1>
            {slide.title}
          </h1>

          <div className="tags">
            {slide.tags}
          </div>

          <p>
            {slide.text}
          </p>

          {/* DOTS */}

          <div className="dots">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                className={
                  i === index
                    ? "dot active"
                    : "dot"
                }
                onClick={() =>
                  setIndex(i)
                }
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* NEXT */}

          <button
            type="button"
            className="next"
            onClick={next}
          >
            {index === slides.length - 1
              ? "Get Started"
              : "Next"}

            <span>›</span>
          </button>

          {/* SKIP */}

          <button
            type="button"
            className="skip"
            onClick={skip}
          >
            Skip
          </button>
        </div>
      </section>

      {/* GOLD DECORATION */}

      <div className="flower left">
        <i />
        <i />
        <i />
      </div>

      <div className="flower right">
        <i />
        <i />
        <i />
      </div>

      <style jsx global>{`
        /* ==========================================
           PAGE
        ========================================== */

        .screen {
          position: relative;

          width: 100%;
          min-height: 100dvh;

          overflow: hidden;

          background:
            var(--cream);

          color:
            var(--text);

          text-align: center;
        }

        /* ==========================================
           IMAGE
        ========================================== */

        .image {
          position: absolute;

          top: 0;
          left: 0;

          width: 100%;
          height: 61%;

          overflow: hidden;
        }

        .image img {
          width: 100%;
          height: 100%;

          display: block;

          object-fit: cover;

          object-position:
            center top;
        }

        .image::after {
          content: "";

          position: absolute;

          inset: 0;

          background:
            linear-gradient(
              to bottom,
              transparent 42%,
              rgba(
                255,
                249,
                237,
                0.08
              ) 58%,
              rgba(
                255,
                249,
                237,
                0.48
              ) 76%,
              #fff9ed 96%
            );

          pointer-events: none;
        }

        /* ==========================================
           CONTENT
        ========================================== */

        .content {
          position: absolute;

          z-index: 5;

          left: 0;
          right: 0;
          bottom:
            calc(
              14px +
              env(
                safe-area-inset-bottom
              )
            );

          padding:
            0 48px;
        }

        .contentInner {
          width: 100%;

          max-width: 390px;

          margin: 0 auto;
        }

        .miniLogo {
          display: none;
        }

        /* ==========================================
           TITLE
        ========================================== */

        .content h1 {
          margin: 0;

          color:
            var(--maroon);

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 29px;

          line-height: 1.08;

          font-weight: 700;
        }

        /* ==========================================
           TAGS
        ========================================== */

        .tags {
          margin-top: 11px;

          color: #514941;

          font-size: 13px;

          font-weight: 700;

          line-height: 1.4;
        }

        /* ==========================================
           DESCRIPTION
        ========================================== */

        .content p {
          margin:
            6px 0 0;

          color:
            var(--muted);

          font-size: 14px;

          line-height: 1.55;
        }

        /* ==========================================
           DOTS
        ========================================== */

        .dots {
          display: flex;

          justify-content: center;
          align-items: center;

          gap: 8px;

          margin:
            12px 0;
        }

        .dot {
          width: 9px;
          height: 9px;

          padding: 0;

          border: 0;

          border-radius: 50%;

          background:
            #d2cdc4;

          transition:
            width 0.2s ease,
            background 0.2s ease;
        }

        .dot.active {
          width: 22px;

          border-radius:
            999px;

          background:
            var(--maroon);
        }

        /* ==========================================
           NEXT BUTTON
        ========================================== */

        .next {
          width: 100%;
          height: 50px;

          display:
            inline-flex;

          align-items: center;
          justify-content: center;

          gap: 8px;

          padding: 0;

          border: 0;

          border-radius:
            14px;

          background:
            var(--maroon);

          color: #fff;

          font-size: 16px;

          font-weight: 700;

          box-shadow:
            0 7px 18px
            rgba(
              113,
              17,
              17,
              0.16
            );

          transition:
            transform 0.18s ease,
            background 0.18s ease;
        }

        .next span {
          font-size: 23px;

          line-height: 1;
        }

        .next:active {
          transform:
            scale(0.985);
        }

        /* ==========================================
           SKIP
        ========================================== */

        .skip {
          display: block;

          width: 100%;
          height: 30px;

          margin-top: 6px;

          padding: 0;

          border: 0;

          background: transparent;

          color:
            #6c625b;

          font-size: 14px;
        }

        /* ==========================================
           GOLD DECORATION
        ========================================== */

        .flower {
          position: absolute;

          bottom: 52px;

          z-index: 3;

          width: 50px;
          height: 55px;

          opacity: 0.28;

          pointer-events: none;
        }

        .left {
          left: 4px;
        }

        .right {
          right: 4px;

          transform:
            scaleX(-1);
        }

        .flower::before,
        .flower::after,
        .flower i {
          content: "";

          position: absolute;

          display: block;

          border:
            2px solid
            #d5b66f;

          border-radius:
            100% 0 100% 0;
        }

        .flower::before {
          width: 18px;
          height: 32px;

          left: 4px;
          top: 12px;

          transform:
            rotate(-38deg);
        }

        .flower::after {
          width: 16px;
          height: 28px;

          left: 20px;
          top: 4px;

          transform:
            rotate(35deg);
        }

        .flower i:nth-child(1) {
          width: 14px;
          height: 25px;

          left: 29px;
          top: 25px;

          transform:
            rotate(52deg);
        }

        .flower i:nth-child(2) {
          width: 13px;
          height: 22px;

          left: 12px;
          top: 32px;

          transform:
            rotate(-65deg);
        }

        .flower i:nth-child(3) {
          width: 8px;
          height: 8px;

          left: 23px;
          top: 38px;

          border-radius:
            50%;
        }

        /* ==========================================
           SMALL MOBILE
        ========================================== */

        @media (
          max-width: 359px
        ) {
          .image {
            height: 58%;
          }

          .content {
            padding:
              0 22px;
          }

          .content h1 {
            font-size: 25px;
          }

          .tags {
            margin-top: 7px;

            font-size: 11px;
          }

          .content p {
            font-size: 12px;
          }

          .dots {
            margin:
              8px 0;
          }

          .next {
            height: 46px;

            font-size: 14px;
          }

          .skip {
            height: 26px;

            font-size: 13px;
          }

          .flower {
            bottom: 42px;
          }
        }

        /* ==========================================
           SHORT MOBILE HEIGHT
        ========================================== */

        @media (
          max-height: 700px
        ) and (
          max-width: 599px
        ) {
          .image {
            height: 57%;
          }

          .content {
            bottom:
              calc(
                8px +
                env(
                  safe-area-inset-bottom
                )
              );

            padding:
              0 30px;
          }

          .content h1 {
            font-size: 25px;
          }

          .tags {
            margin-top: 7px;
          }

          .content p {
            margin-top: 4px;

            font-size: 12px;
          }

          .dots {
            margin:
              7px 0;
          }

          .next {
            height: 44px;
          }

          .skip {
            height: 24px;

            margin-top: 3px;
          }

          .flower {
            bottom: 38px;
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
          .image {
            height: 63%;
          }

          .content {
            padding:
              0 40px;
          }

          .contentInner {
            max-width: 420px;
          }

          .content h1 {
            font-size: 32px;
          }

          .tags {
            margin-top: 12px;

            font-size: 14px;
          }

          .content p {
            font-size: 15px;
          }

          .next {
            height: 52px;
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
          .screen {
            min-height: 100vh;

            display: grid;

            grid-template-rows:
              minmax(
                360px,
                55vh
              )
              auto;

            overflow-y: auto;
          }

          .image {
            position: relative;

            width: 100%;
            height: 100%;
          }

          .image img {
            object-position:
              center 18%;
          }

          .image::after {
            background:
              linear-gradient(
                to bottom,
                transparent 50%,
                rgba(
                  255,
                  249,
                  237,
                  0.45
                ) 78%,
                #fff9ed 100%
              );
          }

          .content {
            position: relative;

            left: auto;
            right: auto;
            bottom: auto;

            width: 100%;

            padding:
              30px 24px 42px;

            background:
              var(--cream);
          }

          .contentInner {
            max-width: 520px;

            padding:
              30px 36px;

            border:
              1px solid
              var(--border);

            border-radius:
              24px;

            background:
              #fffdf8;

            box-shadow:
              0 18px 45px
              rgba(
                84,
                47,
                15,
                0.09
              );
          }

          .miniLogo {
            width: 58px;
            height: 58px;

            display: grid;

            place-items:
              center;

            margin:
              0 auto 14px;

            border:
              1px solid
              #e3c98b;

            border-radius:
              50%;

            background:
              #fffaf0;

            font-size: 28px;
          }

          .content h1 {
            font-size: 34px;
          }

          .tags {
            margin-top: 13px;

            font-size: 15px;
          }

          .content p {
            margin-top: 8px;

            font-size: 15px;
          }

          .dots {
            margin:
              17px 0;
          }

          .next {
            height: 54px;

            font-size: 16px;
          }

          .skip {
            margin-top: 8px;
          }

          .flower {
            width: 80px;
            height: 88px;

            bottom: 30px;

            opacity: 0.16;
          }
        }

        /* ==========================================
           DESKTOP WEBSITE
        ========================================== */

        @media (
          min-width: 1024px
        ) {
          .screen {
            min-height: 100vh;

            display: grid;

            grid-template-columns:
              minmax(
                0,
                1.2fr
              )
              minmax(
                420px,
                0.8fr
              );

            overflow: hidden;

            background:
              #fff9ed;

            text-align: left;
          }

          /* LEFT IMAGE */

          .image {
            position: relative;

            width: 100%;
            height: 100vh;
          }

          .image img {
            width: 100%;
            height: 100%;

            object-fit: cover;

            object-position:
              center top;
          }

          .image::after {
            background:
              linear-gradient(
                to right,
                transparent 55%,
                rgba(
                  255,
                  249,
                  237,
                  0.12
                ) 72%,
                #fff9ed 100%
              );
          }

          /* RIGHT CONTENT */

          .content {
            position: relative;

            left: auto;
            right: auto;
            bottom: auto;

            width: 100%;
            height: 100vh;

            display: flex;

            align-items:
              center;

            justify-content:
              center;

            padding:
              60px 50px;

            background:
              radial-gradient(
                circle at top right,
                rgba(
                  201,
                  148,
                  53,
                  0.11
                ),
                transparent
                  34%
              ),
              #fff9ed;
          }

          .contentInner {
            width: 100%;

            max-width: 480px;

            margin: 0;

            padding:
              44px 42px;

            border:
              1px solid
              var(--border);

            border-radius:
              28px;

            background:
              rgba(
                255,
                253,
                248,
                0.95
              );

            box-shadow:
              0 22px 55px
              rgba(
                82,
                46,
                15,
                0.11
              );

            text-align: center;
          }

          .miniLogo {
            width: 68px;
            height: 68px;

            display: grid;

            place-items:
              center;

            margin:
              0 auto 18px;

            border:
              1px solid
              #e1c482;

            border-radius:
              50%;

            background:
              #fffaf0;

            font-size: 32px;

            box-shadow:
              0 7px 20px
              rgba(
                111,
                67,
                18,
                0.07
              );
          }

          .content h1 {
            font-size: 38px;

            line-height: 1.08;
          }

          .tags {
            margin-top: 16px;

            font-size: 15px;
          }

          .content p {
            margin-top: 9px;

            font-size: 16px;
          }

          .dots {
            margin:
              21px 0;
          }

          .dot {
            width: 10px;
            height: 10px;
          }

          .dot.active {
            width: 26px;
          }

          .next {
            height: 56px;

            border-radius:
              14px;

            font-size: 16px;
          }

          .next:hover {
            background:
              var(
                --dark-maroon
              );

            transform:
              translateY(-1px);
          }

          .skip {
            height: 34px;

            margin-top: 9px;

            font-size: 14px;
          }

          .skip:hover {
            color:
              var(--maroon);
          }

          .flower {
            display: none;
          }
        }

        /* ==========================================
           LARGE DESKTOP
        ========================================== */

        @media (
          min-width: 1440px
        ) {
          .screen {
            grid-template-columns:
              minmax(
                0,
                1.28fr
              )
              minmax(
                500px,
                0.72fr
              );
          }

          .content {
            padding:
              70px 70px;
          }

          .contentInner {
            max-width: 520px;

            padding:
              50px 48px;
          }

          .miniLogo {
            width: 74px;
            height: 74px;

            font-size: 35px;
          }

          .content h1 {
            font-size: 42px;
          }

          .tags {
            font-size: 16px;
          }

          .content p {
            font-size: 17px;
          }

          .next {
            height: 58px;
          }
        }
      `}</style>
    </main>
  );
}