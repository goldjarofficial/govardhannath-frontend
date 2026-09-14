"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./otp.module.css";

export default function OTP() {
  const router = useRouter();
  const params = useSearchParams();
  const mobile = params.get("mobile") || "";

  const [otp, setOtp] = useState("");

  const verify = () => {
    if (otp.length === 6) {
      router.push("/dashboard");
    }
  };

  return (
    <main className={styles.screen}>
      <section className={styles.content}>
        <img
          src="/images/login-ornament.png"
          alt=""
          className={styles.ornament}
        />

        <h1>Verify Mobile Number</h1>

        <p className={styles.subtitle}>
          Enter the 6-digit OTP sent to
          <br />
          <strong>+91 {mobile}</strong>
        </p>

        <input
          className={styles.otpInput}
          type="tel"
          inputMode="numeric"
          maxLength={6}
          placeholder="• • • • • •"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
        />

        <button
          className={styles.verify}
          disabled={otp.length !== 6}
          onClick={verify}
        >
          Verify & Continue
        </button>

        <button className={styles.resend}>Resend OTP</button>

        <button className={styles.back} onClick={() => router.back()}>
          ← Change mobile number
        </button>
      </section>

      <div className={styles.cornerLeft} />
      <div className={styles.cornerRight} />
    </main>
  );
}
