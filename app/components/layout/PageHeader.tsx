'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
  title: string;
}

export default function PageHeader({ title }: Props) {
  const router = useRouter();

  return (
    <header
      className="
        sticky
        top-0
        z-40
        flex
        h-[58px]
        items-center
        border-b
        border-[#EEE1CB]
        bg-[#FFF9ED]/95
        px-4
        backdrop-blur
      "
    >
      <button
        onClick={() => router.back()}
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
        "
      >
        <ArrowLeft
          size={21}
          className="text-[#991B1E]"
        />
      </button>

      <h1
        className="
          temple-heading
          ml-2
          text-[20px]
          font-semibold
          text-[#6F0F12]
        "
      >
        {title}
      </h1>
    </header>
  );
}