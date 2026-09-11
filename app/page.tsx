"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/onboarding");
    }, 2500);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main
      className="
        relative
        mx-auto
        flex
        min-h-screen
        w-full
        max-w-[480px]
        flex-col
        items-center
        justify-center
        overflow-hidden
        bg-gradient-to-b
        from-[#3A0506]
        via-[#760C10]
        to-[#A51A1D]
        px-6
        text-white
      "
    >
      <div className="relative h-[260px] w-[260px]">
        <Image
          src="/images/splash/shrinathji.png"
          alt="Shri Govardhannath"
          fill
          priority
          className="object-contain"
        />
      </div>

      <h1
        className="
          temple-heading
          mt-6
          text-center
          text-[31px]
          font-semibold
          leading-[1]
        "
      >
        Shri Govardhannath
        <br />
        Haveli
      </h1>

      <p className="mt-3 text-sm text-[#F5DFA8]">Vashi, Navi Mumbai</p>

      <div
        className="
          mt-8
          flex
          items-center
          gap-3
          text-xs
          text-[#F5DFA8]
        "
      >
        <span>Bhakti</span>
        <span>•</span>
        <span>Seva</span>
        <span>•</span>
        <span>Sanskar</span>
      </div>
    </main>
  );
}
