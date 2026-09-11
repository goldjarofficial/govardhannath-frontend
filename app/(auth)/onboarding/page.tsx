"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import MobileContainer from "@/app/components/layout/MobileContainer";
import Button from "@/app/components/ui/Button";

export default function OnboardingPage() {
  const router = useRouter();

  return (
    <MobileContainer>
      <section
        className="
          flex
          min-h-screen
          flex-col
          px-5
          pb-8
          pt-10
        "
      >
        <div
          className="
            relative
            h-[360px]
            overflow-hidden
            rounded-[28px]
          "
        >
          <Image
            src="/images/onboarding/temple.jpg"
            alt="Shri Govardhannath Temple"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col text-center">
          <h1
            className="
              temple-heading
              mt-8
              text-[29px]
              font-bold
              leading-tight
              text-[#6F0F12]
            "
          >
            Experience
            <br />
            the Divine Grace
          </h1>

          <p
            className="
              mx-auto
              mt-4
              max-w-[320px]
              text-[14px]
              leading-6
              text-[#7A655E]
            "
          >
            Stay connected with Shri Govardhannathji through Live Darshan, Seva,
            Satsang and divine updates.
          </p>

          <div className="my-7 flex justify-center gap-2">
            <span className="h-2 w-5 rounded-full bg-[#991B1E]" />
            <span className="h-2 w-2 rounded-full bg-[#D7C7AC]" />
            <span className="h-2 w-2 rounded-full bg-[#D7C7AC]" />
            <span className="h-2 w-2 rounded-full bg-[#D7C7AC]" />
          </div>

          <div className="mt-auto">
            <Button fullWidth onClick={() => router.push("/language")}>
              Next
            </Button>

            <button
              onClick={() => router.push("/language")}
              className="
                mt-4
                w-full
                py-3
                text-sm
                text-[#7A655E]
              "
            >
              Skip
            </button>
          </div>
        </div>
      </section>
    </MobileContainer>
  );
}
