"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BottomNavigation from "../../components/navigation/BottomNavigation";

/* ======================================================
   REELS DATA
====================================================== */

const reels = [
  {
    id: 1,
    video: "/videos/reel-1.mp4",
    title: "Today's Shringar Darshan",
    subtitle: "Jai Shrinathji 🙏",
    username: "@govardhannath_haveli",
    likes: "5.2K",
    comments: "120",
  },
  {
    id: 2,
    video: "/videos/reel-2.mp4",
    title: "Divine Darshan",
    subtitle: "Shri Govardhannathji 🌸",
    username: "@govardhannath_haveli",
    likes: "3.8K",
    comments: "86",
  },
  {
    id: 3,
    video: "/videos/reel-3.mp4",
    title: "Sandhya Aarti",
    subtitle: "Jai Shree Krishna 🙏",
    username: "@govardhannath_haveli",
    likes: "4.6K",
    comments: "102",
  },
];

/* ======================================================
   COMPONENT
====================================================== */

export default function Reels() {
  const router = useRouter();

  const [current, setCurrent] = useState(0);

  const reel = reels[current];

  /* ====================================================
     NEXT REEL
  ==================================================== */

  const nextReel = () => {
    if (current < reels.length - 1) {
      setCurrent((prev) => prev + 1);
    }
  };

  /* ====================================================
     PREVIOUS REEL
  ==================================================== */

  const previousReel = () => {
    if (current > 0) {
      setCurrent((prev) => prev - 1);
    }
  };

  return (
    <main
      className="
        fixed
        inset-0

        overflow-hidden

        bg-[#090706]
        text-white

        lg:left-[92px]
      "
    >
      {/* ==================================================
          DESKTOP BACKGROUND
      ================================================== */}

      <div
        className="
          pointer-events-none

          absolute
          inset-0

          hidden

          lg:block
          lg:bg-[radial-gradient(circle_at_top,_#2b211b_0%,_#100d0b_45%,_#090706_100%)]
        "
      />

      {/* ==================================================
          VIDEO WRAPPER
      ================================================== */}

      <div
        className="
          relative

          mx-auto

          h-[calc(100dvh-64px)]
          w-full

          overflow-hidden

          bg-[#111]

          sm:max-w-[520px]

          lg:h-screen
          lg:max-w-[500px]
          lg:border-x
          lg:border-white/10
          lg:shadow-[0_0_60px_rgba(0,0,0,0.55)]

          xl:max-w-[540px]
        "
      >
        {/* ================================================
            VIDEO
        ================================================ */}

        <video
          key={reel.video}
          src={reel.video}
          className="
            block
            h-full
            w-full
            object-cover
          "
          autoPlay
          muted
          loop
          playsInline
        />

        {/* ================================================
            TOP GRADIENT
        ================================================ */}

        <div
          className="
            pointer-events-none

            absolute
            inset-x-0
            top-0

            h-[150px]

            bg-gradient-to-b
            from-black/50
            to-transparent
          "
        />

        {/* ================================================
            BOTTOM GRADIENT
        ================================================ */}

        <div
          className="
            pointer-events-none

            absolute
            inset-x-0
            bottom-0

            h-[300px]

            bg-gradient-to-t
            from-black/90
            via-black/40
            to-transparent

            sm:h-[340px]
          "
        />

        {/* ================================================
            BACK BUTTON
        ================================================ */}

        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Back"
          className="
            absolute
            left-4
            top-4
            z-20

            grid
            h-10
            w-10
            place-items-center

            rounded-full

            border
            border-white/10

            bg-black/20

            text-[32px]
            leading-none
            text-white

            backdrop-blur-sm

            transition

            hover:bg-black/40

            sm:left-5
            sm:top-5
          "
        >
          ‹
        </button>

        {/* ================================================
            REEL NUMBER
        ================================================ */}

        <div
          className="
            absolute
            left-1/2
            top-5
            z-10

            -translate-x-1/2

            rounded-full

            bg-black/30

            px-3
            py-1

            text-[10px]
            font-semibold

            backdrop-blur-md
          "
        >
          {current + 1} / {reels.length}
        </div>

        {/* ================================================
            RIGHT ACTIONS
        ================================================ */}

        <div
          className="
            absolute
            bottom-[90px]
            right-2
            z-20

            flex
            flex-col
            items-center

            gap-5

            sm:bottom-[105px]
            sm:right-3
          "
        >
          {/* LIKE */}

          <button
            type="button"
            aria-label="Like"
            className="
              flex
              w-[52px]
              flex-col
              items-center
              gap-1

              border-0
              bg-transparent

              text-white
            "
          >
            <span
              className="
                text-[29px]
                leading-none

                drop-shadow-lg

                sm:text-[31px]
              "
            >
              ♡
            </span>

            <small
              className="
                text-[10px]
                font-semibold
                drop-shadow-md
              "
            >
              {reel.likes}
            </small>
          </button>

          {/* COMMENTS */}

          <button
            type="button"
            aria-label="Comments"
            className="
              flex
              w-[52px]
              flex-col
              items-center
              gap-1

              border-0
              bg-transparent

              text-white
            "
          >
            <span
              className="
                text-[25px]
                leading-none
                drop-shadow-lg
              "
            >
              •••
            </span>

            <small
              className="
                text-[10px]
                font-semibold
                drop-shadow-md
              "
            >
              {reel.comments}
            </small>
          </button>

          {/* SHARE */}

          <button
            type="button"
            aria-label="Share"
            className="
              flex
              w-[52px]
              flex-col
              items-center
              gap-1

              border-0
              bg-transparent

              text-white
            "
          >
            <span
              className="
                text-[28px]
                leading-none
                drop-shadow-lg
              "
            >
              ↗
            </span>

            <small
              className="
                text-[10px]
                font-semibold
                drop-shadow-md
              "
            >
              Share
            </small>
          </button>

          {/* AUDIO */}

          <button
            type="button"
            aria-label="Audio"
            className="
              flex
              w-[52px]
              flex-col
              items-center
              gap-1

              border-0
              bg-transparent

              text-white
            "
          >
            <span
              className="
                grid
                h-10
                w-10
                place-items-center

                rounded-full

                border
                border-white/20

                bg-black/40

                text-[20px]

                backdrop-blur-sm
              "
            >
              ♫
            </span>

            <small
              className="
                text-[10px]
                font-semibold
                drop-shadow-md
              "
            >
              Audio
            </small>
          </button>
        </div>

        {/* ================================================
            CONTENT
        ================================================ */}

        <div
          className="
            absolute
            bottom-[18px]
            left-[15px]
            right-[70px]
            z-20

            sm:bottom-6
            sm:left-5
            sm:right-[80px]
          "
        >
          {/* PROFILE */}

          <div
            className="
              mb-[10px]

              flex
              items-center
              gap-2
            "
          >
            <div
              className="
                grid
                h-8
                w-8
                shrink-0
                place-items-center

                rounded-full

                border-2
                border-white

                bg-[#f4e6cc]

                text-[15px]

                sm:h-9
                sm:w-9
              "
            >
              🛕
            </div>

            <div
              className="
                min-w-0
                flex-1

                text-[12px]

                sm:text-[13px]
              "
            >
              <b className="truncate">
                {reel.username}
              </b>
            </div>

            <button
              type="button"
              className="
                h-[29px]
                shrink-0

                rounded-[7px]

                border-0

                bg-white

                px-3

                text-[10px]
                font-bold
                text-[#332820]

                transition

                hover:bg-[#fff3df]

                sm:h-8
                sm:px-4
              "
            >
              Follow
            </button>
          </div>

          {/* TITLE */}

          <h1
            className="
              m-0

              font-serif

              text-[21px]
              leading-[1.15]
              text-white

              drop-shadow-lg

              sm:text-[24px]

              lg:text-[26px]
            "
          >
            {reel.title}
          </h1>

          {/* SUBTITLE */}

          <p
            className="
              mt-[5px]

              font-serif

              text-[15px]
              text-white

              drop-shadow-lg

              sm:text-[16px]
            "
          >
            {reel.subtitle}
          </p>

          {/* ORIGINAL AUDIO */}

          <div
            className="
              mt-[10px]

              flex
              items-center
              gap-[6px]

              text-[10px]
              text-[#eee]

              sm:text-[11px]
            "
          >
            <span className="text-[16px]">
              ♫
            </span>

            Original Audio
          </div>
        </div>

        {/* ================================================
            PREVIOUS TAP AREA
        ================================================ */}

        <button
          type="button"
          onClick={previousReel}
          aria-label="Previous Reel"
          disabled={current === 0}
          className="
            absolute
            bottom-[20%]
            left-0
            top-[15%]
            z-10

            w-[28%]

            cursor-default

            border-0
            bg-transparent
          "
        />

        {/* ================================================
            NEXT TAP AREA
        ================================================ */}

        <button
          type="button"
          onClick={nextReel}
          aria-label="Next Reel"
          disabled={current === reels.length - 1}
          className="
            absolute
            bottom-[20%]
            right-0
            top-[15%]
            z-10

            w-[28%]

            cursor-default

            border-0
            bg-transparent
          "
        />
      </div>

      {/* ==================================================
          REUSABLE BOTTOM NAVIGATION
      ================================================== */}

      <BottomNavigation />

      {/* ==================================================
          DESKTOP REEL INDICATORS
      ================================================== */}

      <div
        className="
          fixed
          right-8
          top-1/2
          z-30

          hidden
          -translate-y-1/2

          flex-col
          gap-3

          lg:flex
        "
      >
        {reels.map((item, index) => (
          <button
            type="button"
            key={item.id}
            onClick={() => setCurrent(index)}
            aria-label={`Open reel ${index + 1}`}
            className={`
              rounded-full

              border-0

              transition-all
              duration-200

              ${
                current === index
                  ? "h-8 w-2 bg-white"
                  : "h-2 w-2 bg-white/35 hover:bg-white/70"
              }
            `}
          />
        ))}
      </div>
    </main>
  );
}