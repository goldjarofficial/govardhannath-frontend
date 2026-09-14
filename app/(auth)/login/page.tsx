"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

export default function Login() {
  const router = useRouter();
  const [mobile, setMobile] = useState("");

  const sendOtp = () => {
    if (mobile.length === 10) {
      router.push(`/otp?mobile=${mobile}`);
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

        <h1>Welcome Devotee</h1>

        <p>Enter your mobile number to continue</p>

        <div className={styles.mobileInput}>
          <span>🇮🇳 +91</span>

          <input
            type="tel"
            inputMode="numeric"
            maxLength={10}
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
          />
        </div>

        <div className={styles.bottom}>
          <button
            className={styles.primary}
            disabled={mobile.length !== 10}
            onClick={sendOtp}
          >
            Send OTP
          </button>

          <small className={styles.terms}>
            By continuing, you agree to our
            <br />
            Terms & Privacy Policy
          </small>
        </div>
      </section>

      <div className={styles.cornerLeft} />
      <div className={styles.cornerRight} />
    </main>
  );
}
