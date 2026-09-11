'use client';

import { useRouter } from 'next/navigation';

export default function LanguagePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#FFF9ED] px-5 py-8">
      <div className="mx-auto w-full max-w-[480px]">
        <h1 className="text-center text-2xl font-semibold text-[#6F0F12]">
          Choose Language
        </h1>

        <p className="mt-1 text-center text-sm text-[#7A655E]">
          अपनी भाषा चुनें
        </p>

        <div className="mt-8 space-y-3">
          <button className="flex w-full items-center justify-between rounded-xl border border-[#E9DDC7] bg-white px-4 py-4">
            <span>English</span>
            <span>›</span>
          </button>

          <button className="flex w-full items-center justify-between rounded-xl border border-[#E9DDC7] bg-white px-4 py-4">
            <span>हिन्दी</span>
            <span>›</span>
          </button>

          <button className="flex w-full items-center justify-between rounded-xl border border-[#E9DDC7] bg-white px-4 py-4">
            <span>ગુજરાતી</span>
            <span>›</span>
          </button>
        </div>

        <button
          onClick={() => router.push('/login')}
          className="mt-10 w-full rounded-xl bg-[#991B1E] px-5 py-3 font-semibold text-white"
        >
          Continue
        </button>
      </div>
    </main>
  );
}