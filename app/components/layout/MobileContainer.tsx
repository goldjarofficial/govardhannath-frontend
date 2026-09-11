import React from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function MobileContainer({
  children,
  className = '',
}: Props) {
  return (
    <main
      className={`
        relative
        mx-auto
        min-h-screen
        w-full
        max-w-[480px]
        bg-[#FFF9ED]
        overflow-x-hidden
        ${className}
      `}
    >
      {children}
    </main>
  );
}