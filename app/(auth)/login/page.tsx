"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useLanguage } from "../../lib/LanguageProvider";
import { authService } from "../../services/auth.service";

export default function Login() {
  const router = useRouter();
  const { t } = useLanguage();

  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* =========================================================
     MOBILE INPUT
     ========================================================= */

  const handleMobileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value
      .replace(/\D/g, "")
      .slice(0, 10);

    setMobile(value);

    if (error) {
      setError("");
    }
  };

  /* =========================================================
     LOGIN / SEND OTP API
     ========================================================= */

  const sendOtp = async () => {
    const cleanedMobile = mobile.trim();

    if (!/^\d{10}$/.test(cleanedMobile)) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    if (loading) return;

    try {
      setLoading(true);
      setError("");

      const response = await authService.loginInitiate({
        mobileNumber: cleanedMobile,
      });

      console.log("Login initiate response:", response);

      if (!response.success) {
        setError(response.message || "Failed to send OTP");
        return;
      }

      /* Existing user -> OTP */

      router.push(
        `/otp?mobile=${encodeURIComponent(cleanedMobile)}`
      );
    } catch (err: any) {
      console.error("Login error:", err);

      /* User not registered -> Register */

      if (
        err?.status === 404 ||
        err?.response?.status === 404
      ) {
        router.push(
          `/register?mobile=${encodeURIComponent(
            cleanedMobile
          )}`
        );

        return;
      }

      setError(
        err?.response?.data?.message ??
          err?.message ??
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="
        relative
        min-h-[100dvh]
        w-full
        overflow-hidden
        bg-[linear-gradient(180deg,#fffaf0_0%,#fff7e9_100%)]
        text-[#40372f]

        lg:grid
        lg:grid-cols-[1fr_1fr]
      "
    >
      {/* =====================================================
          DESKTOP LEFT SIDE
          ===================================================== */}

      <section
        className="
          relative
          hidden
          min-h-screen
          overflow-hidden
          bg-[#711111]

          lg:flex
          lg:flex-col
          lg:justify-between
          lg:p-12

          xl:p-16
        "
      >
        {/* BACKGROUND IMAGE */}

        <img
          src="/images/haveli.jpg"
          alt="Shri Govardhannath Haveli"
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
          "
        />

        {/* DARK OVERLAY */}

        <div
          className="
            absolute
            inset-0
            bg-[linear-gradient(135deg,rgba(69,8,8,0.94)_0%,rgba(117,17,17,0.80)_50%,rgba(84,42,15,0.72)_100%)]
          "
        />

        {/* DECORATION */}

        <div
          className="
            pointer-events-none
            absolute
            -left-28
            -top-28
            h-[380px]
            w-[380px]
            rounded-full
            bg-[#e6b458]/10
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-36
            -right-20
            h-[450px]
            w-[450px]
            rounded-full
            bg-[#f1cc85]/10
            blur-3xl
          "
        />

        {/* BRAND */}

        <div className="relative z-10 flex items-center gap-3">
          <div
            className="
              grid
              h-[58px]
              w-[58px]
              place-items-center
              rounded-full
              border
              border-[#f4d69c]/50
              bg-white/10
              text-[29px]
              backdrop-blur-md
            "
          >
            🛕
          </div>

          <div>
            <p
              className="
                m-0
                text-xs
                font-semibold
                text-[#f5d99e]
              "
            >
              🙏 Jai Shree Krishna
            </p>

            <h2
              className="
                mt-1
                font-serif
                text-xl
                font-bold
                text-white
              "
            >
              Shri Govardhannath
            </h2>
          </div>
        </div>

        {/* DESKTOP CENTER CONTENT */}

        <div
          className="
            relative
            z-10
            max-w-[570px]
          "
        >
          <span
            className="
              inline-flex
              rounded-full
              border
              border-[#f1d293]/30
              bg-white/10
              px-4
              py-2
              text-[10px]
              font-semibold
              tracking-[0.12em]
              text-[#ffe4aa]
              backdrop-blur-md
            "
          >
            SHRI GOVARDHANNATH HAVELI
          </span>

          <h1
            className="
              mt-6
              max-w-[520px]
              font-serif
              text-[44px]
              font-bold
              leading-[1.12]
              text-white

              xl:text-[52px]
            "
          >
            Begin your spiritual journey with Govardhannath.
          </h1>

          <p
            className="
              mt-5
              max-w-[490px]
              text-[15px]
              leading-7
              text-white/75
            "
          >
            Experience Live Darshan, Seva, Prasadam,
            temple events and devotional services from
            anywhere.
          </p>

          <div
            className="
              mt-8
              flex
              items-center
              gap-3
              text-[#f4d69c]
            "
          >
            <span className="h-px w-16 bg-[#f4d69c]/60" />

            <span className="font-serif text-xl">
              ॐ
            </span>

            <span className="h-px w-16 bg-[#f4d69c]/60" />
          </div>
        </div>

        <p
          className="
            relative
            z-10
            text-xs
            text-white/55
          "
        >
          Shri Govardhannath Haveli
        </p>
      </section>

      {/* =====================================================
          LOGIN SIDE
          ===================================================== */}

      <section
        className="
          relative
          flex
          min-h-[100dvh]
          items-center
          justify-center
          px-5
          py-7

          max-[359px]:px-[14px]

          sm:px-6

          lg:min-h-screen
          lg:px-10
          lg:py-10

          xl:px-16
        "
      >
        {/* BACKGROUND DECORATION */}

        <div
          className="
            pointer-events-none
            absolute
            -bottom-12
            -left-12
            h-28
            w-28
            rounded-full
            border
            border-[#d5b66d]
            opacity-[0.15]

            lg:h-40
            lg:w-40
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -right-12
            -top-12
            h-28
            w-28
            rounded-full
            border
            border-[#d5b66d]
            opacity-[0.15]

            lg:h-40
            lg:w-40
          "
        />

        {/* MAIN LOGIN WRAPPER */}

        <div
          className="
            relative
            z-10
            w-full
            max-w-[420px]

            sm:max-w-[450px]

            lg:max-w-[500px]
          "
        >
          {/* ORNAMENT */}

          <img
            src="/images/login-ornament.png"
            alt=""
            className="
              mx-auto
              block
              h-[105px]
              w-[105px]
              object-contain
              opacity-60

              max-[359px]:h-[90px]
              max-[359px]:w-[90px]

              sm:h-[125px]
              sm:w-[125px]

              lg:h-[145px]
              lg:w-[145px]
            "
          />

          {/* =================================================
              MOBILE / TABLET TITLE
              ================================================= */}

          <div className="mb-6 text-center lg:hidden">
            <h1
              className="
                m-0
                font-serif
                text-[27px]
                font-bold
                leading-tight
                text-[#8f1717]

                max-[359px]:text-[24px]

                sm:text-[31px]
              "
            >
              {t("welcomeDevotee")}
            </h1>

            <p
              className="
                mx-auto
                mb-0
                mt-2
                max-w-[330px]
                text-[12px]
                leading-5
                text-[#81766d]

                sm:text-[14px]
              "
            >
              {t("enterMobile")}
            </p>
          </div>

          {/* =================================================
              LOGIN CARD
              ================================================= */}

          <div
            className="
              rounded-[20px]
              border
              border-[#eadbc5]
              bg-[#fffdf9]
              px-5
              py-6
              shadow-[0_10px_35px_rgba(83,48,14,0.08)]

              max-[359px]:px-4
              max-[359px]:py-5

              sm:px-7
              sm:py-7

              lg:rounded-[26px]
              lg:px-10
              lg:py-10
              lg:shadow-[0_20px_55px_rgba(83,48,14,0.11)]
            "
          >
            {/* DESKTOP TITLE */}

            <div className="mb-8 hidden lg:block">
              <p
                className="
                  mb-2
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-[#b47c34]
                "
              >
                Welcome Back
              </p>

              <h1
                className="
                  m-0
                  font-serif
                  text-[34px]
                  font-bold
                  text-[#711111]
                "
              >
                {t("welcomeDevotee")}
              </h1>

              <p
                className="
                  mb-0
                  mt-2
                  text-[14px]
                  leading-6
                  text-[#81766d]
                "
              >
                {t("enterMobile")}
              </p>
            </div>

            {/* =================================================
                MOBILE NUMBER
                ================================================= */}

            <div>
              <label
                htmlFor="mobile"
                className="
                  mb-2
                  block
                  text-[11px]
                  font-semibold
                  text-[#554940]

                  sm:text-xs
                "
              >
                {t("mobileNumber")}
              </label>

              <div
                className="
                  flex
                  h-[54px]
                  w-full
                  items-center
                  overflow-hidden
                  rounded-[13px]
                  border
                  border-[#d3a653]
                  bg-[#fffdf9]
                  shadow-[0_4px_14px_rgba(107,61,13,0.05)]
                  transition-all

                  focus-within:border-[#a71919]
                  focus-within:ring-[3px]
                  focus-within:ring-[#a71919]/[0.08]

                  max-[359px]:h-[50px]

                  sm:h-[58px]

                  lg:h-[60px]
                  lg:rounded-[15px]
                "
              >
                {/* COUNTRY CODE */}

                <span
                  className="
                    flex
                    h-full
                    shrink-0
                    items-center
                    border-r
                    border-[#eadbc5]
                    bg-[#fff8ec]
                    px-3
                    text-[13px]
                    font-semibold
                    text-[#40372f]

                    sm:px-4
                    sm:text-sm
                  "
                >
                  🇮🇳 +91
                </span>

                {/* INPUT */}

                <input
                  id="mobile"
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder={t("mobileNumber")}
                  value={mobile}
                  onChange={handleMobileChange}
                  disabled={loading}
                  aria-label={t("mobileNumber")}
                  autoComplete="tel"
                  className="
                    h-full
                    min-w-0
                    flex-1
                    border-0
                    bg-transparent
                    px-3
                    text-[14px]
                    text-[#40372f]
                    outline-none

                    placeholder:text-[#a49a91]

                    disabled:cursor-not-allowed
                    disabled:opacity-60

                    sm:px-4
                    sm:text-[15px]

                    lg:text-base
                  "
                />
              </div>

              {/* HELPER */}

              <div
                className="
                  mt-2
                  flex
                  items-center
                  justify-between
                  text-[10px]
                "
              >
                <span className="text-[#95897e]">
                  OTP will be sent to this number
                </span>

                <span
                  className={
                    mobile.length === 10
                      ? "font-semibold text-[#4d7d50]"
                      : "text-[#a99d92]"
                  }
                >
                  {mobile.length}/10
                </span>
              </div>
            </div>

            {/* =================================================
                ERROR
                ================================================= */}

            {error && (
              <div
                role="alert"
                className="
                  mt-3
                  rounded-[10px]
                  border
                  border-red-200
                  bg-red-50
                  px-3
                  py-2.5
                  text-[11px]
                  font-medium
                  leading-5
                  text-red-700
                "
              >
                {error}
              </div>
            )}

            {/* =================================================
                SEND OTP
                ================================================= */}

            <button
              type="button"
              disabled={mobile.length !== 10 || loading}
              onClick={sendOtp}
              className="
                mt-6
                flex
                h-[50px]
                w-full
                items-center
                justify-center
                gap-2
                rounded-[13px]
                border-0
                bg-[#a71919]
                text-[14px]
                font-bold
                text-white
                shadow-[0_6px_15px_rgba(113,17,17,0.13)]
                transition-all
                duration-200

                enabled:hover:-translate-y-[1px]
                enabled:hover:bg-[#831313]
                enabled:hover:shadow-[0_9px_22px_rgba(113,17,17,0.18)]

                enabled:active:translate-y-0
                enabled:active:scale-[0.985]

                disabled:cursor-not-allowed
                disabled:bg-[#d28d88]
                disabled:shadow-none

                max-[359px]:h-[48px]

                sm:h-[52px]

                lg:h-[54px]
                lg:text-[15px]
              "
            >
              {loading ? (
                <>
                  <span
                    className="
                      h-4
                      w-4
                      animate-spin
                      rounded-full
                      border-2
                      border-white/40
                      border-t-white
                    "
                  />

                  <span>Sending OTP...</span>
                </>
              ) : (
                <>
                  <span>{t("sendOtp")}</span>

                  <span className="text-[22px] leading-none">
                    ›
                  </span>
                </>
              )}
            </button>

            {/* =================================================
                REGISTER
                ================================================= */}

            <div className="my-5 flex items-center gap-3">
              <span className="h-px flex-1 bg-[#eadfce]" />

              <span
                className="
                  shrink-0
                  text-[10px]
                  text-[#9a8d82]
                "
              >
                New devotee?
              </span>

              <span className="h-px flex-1 bg-[#eadfce]" />
            </div>

            <button
              type="button"
              disabled={loading}
              onClick={() => router.push("/register")}
              className="
                flex
                h-[48px]
                w-full
                items-center
                justify-center
                gap-2
                rounded-[13px]
                border
                border-[#d3a653]
                bg-[#fffaf0]
                text-[13px]
                font-bold
                text-[#941616]
                transition-all
                duration-200

                enabled:hover:border-[#b98231]
                enabled:hover:bg-[#fff2dd]

                enabled:active:scale-[0.985]

                disabled:cursor-not-allowed
                disabled:opacity-60

                sm:h-[50px]

                lg:h-[52px]
                lg:text-[14px]
              "
            >
              Create New Account

              <span className="text-lg leading-none">
                ›
              </span>
            </button>

            {/* =================================================
                TERMS
                ================================================= */}

            <p
              className="
                mb-0
                mt-5
                text-center
                text-[9px]
                leading-[1.7]
                text-[#776c63]

                sm:text-[10px]

                lg:text-[11px]
              "
            >
              {t("termsText")}
            </p>
          </div>

          {/* =================================================
              BOTTOM ORNAMENT
              ================================================= */}

          <div
            className="
              mt-5
              flex
              items-center
              justify-center
              gap-2.5
              text-[#c99435]
              opacity-60
            "
          >
            <span
              className="
                h-px
                w-12
                bg-gradient-to-r
                from-transparent
                to-[#c99435]

                sm:w-16
              "
            />

            <span className="font-serif text-sm">
              ॐ
            </span>

            <span
              className="
                h-px
                w-12
                bg-gradient-to-l
                from-transparent
                to-[#c99435]

                sm:w-16
              "
            />
          </div>
        </div>
      </section>
    </main>
  );
}