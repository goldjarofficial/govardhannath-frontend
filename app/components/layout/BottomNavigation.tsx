"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  House,
  Landmark,
  HandHeart,
  Clapperboard,
  UserRound,
} from "lucide-react";

const items = [
  {
    label: "Home",
    href: "/home",
    icon: House,
  },
  {
    label: "Darshan",
    href: "/darshan",
    icon: Landmark,
  },
  {
    label: "Seva",
    href: "/seva",
    icon: HandHeart,
  },
  {
    label: "Reels",
    href: "/reels",
    icon: Clapperboard,
  },
  {
    label: "Profile",
    href: "/profile",
    icon: UserRound,
  },
];

export default function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav
      className="
    fixed
    bottom-0
    left-0
    right-0
    z-50

    flex
    items-center
    justify-around

    border-t
    border-[#E9DDC7]
    bg-white

    pb-[env(safe-area-inset-bottom)]
    pt-2

    md:hidden
  "
    >
      {items.map((item) => {
        const Icon = item.icon;

        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            className="
              flex
              min-w-[55px]
              flex-col
              items-center
              gap-1
              py-1
            "
          >
            <Icon
              size={21}
              strokeWidth={active ? 2.5 : 1.8}
              className={active ? "text-[#991B1E]" : "text-[#6F625E]"}
            />

            <span
              className={`
                text-[10px]
                ${active ? "font-semibold text-[#991B1E]" : "text-[#756661]"}
              `}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
