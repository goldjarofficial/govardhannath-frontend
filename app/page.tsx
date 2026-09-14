"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./splash.module.css";

export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/onboarding");
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className={styles.screen}>
      <img src="/images/splash.png" alt="Shri Govardhannath Haveli" />
    </main>
  );
}
