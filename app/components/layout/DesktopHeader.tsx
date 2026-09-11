'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Home', href: '/home' },
  { label: 'Live Darshan', href: '/live-darshan' },
  { label: 'Seva & Donation', href: '/seva' },
  { label: 'Events', href: '/events' },
  { label: 'Prasadam', href: '/prasadam' },
];

export default function DesktopHeader() {
  const pathname = usePathname();

  return (
    <header
      className="
        hidden
        md:block
        sticky
        top-0
        z-50
        border-b
        border-[#E9DDC7]
        bg-[#FFF9ED]/95
        backdrop-blur
      "
    >
      <div
        className="
          mx-auto
          flex
          h-20
          max-w-7xl
          items-center
          justify-between
          px-6
          lg:px-8
        "
      >
        <Link href="/home">
          <div>
            <h1
              className="
                temple-heading
                text-2xl
                font-bold
                text-[#6F0F12]
              "
            >
              Shri Govardhannath Haveli
            </h1>

            <p
              className="
                text-xs
                text-[#7A655E]
              "
            >
              Vashi, Navi Mumbai
            </p>
          </div>
        </Link>

        <nav
          className="
            flex
            items-center
            gap-6
          "
        >
          {navItems.map(item => {
            const active =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  text-sm
                  font-medium
                  transition

                  ${
                    active
                      ? 'text-[#991B1E]'
                      : 'text-[#5F4B45] hover:text-[#991B1E]'
                  }
                `}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}