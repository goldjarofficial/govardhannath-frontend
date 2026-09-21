"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "../../lib/LanguageProvider";
import type { TranslationKey } from "../../lib/i18n";

type Props = {
  onProfileClick?: () => void;
};

type NavItem = {
  key: string;
  labelKey: TranslationKey;
  icon: string;
  route?: string;
};

export default function BottomNavigation({
  onProfileClick,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  // Current language + translation function
  const { t } = useLanguage();

  /* =========================================================
     NAVIGATION ITEMS
  ========================================================= */

  const navItems: NavItem[] = [
    {
      key: "home",
      labelKey: "home",
      icon: "⌂",
      route: "/dashboard",
    },
    {
      key: "darshan",
      labelKey: "darshan",
      icon: "◉",
      route: "/live-darshan",
    },
    {
      key: "seva",
      labelKey: "seva",
      icon: "♨",
      route: "/seva-donation",
    },
    {
      key: "reels",
      labelKey: "reels",
      icon: "▣",
      route: "/reels",
    },
    {
      key: "profile",
      labelKey: "profile",
      icon: "♙",
    },
  ];

  /* =========================================================
     ACTIVE NAVIGATION
  ========================================================= */

  const isActive = (item: NavItem) => {
    if (!item.route) return false;

    // HOME
    if (item.route === "/dashboard") {
      return pathname === "/dashboard";
    }

    // DARSHAN
    if (item.route === "/live-darshan") {
      return (
        pathname === "/live-darshan" ||
        pathname === "/darshan-timings"
      );
    }

    // SEVA
    if (item.route === "/seva-donation") {
      return (
        pathname === "/seva-donation" ||
        pathname.startsWith("/seva/") ||
        pathname.startsWith("/donate") ||
        pathname.startsWith("/donation/")
      );
    }

    // OTHER ROUTES
    return (
      pathname === item.route ||
      pathname.startsWith(`${item.route}/`)
    );
  };

  /* =========================================================
     NAVIGATION CLICK
  ========================================================= */

  const handleClick = (item: NavItem) => {
    // Profile has no route.
    // Open Profile Drawer.
    if (item.key === "profile") {
      onProfileClick?.();
      return;
    }

    if (item.route) {
      router.push(item.route);
    }
  };

  return (
    <>
      {/* =====================================================
          MOBILE / TABLET NAVIGATION
      ===================================================== */}

      <nav
        className="
          fixed
          bottom-0
          left-0
          right-0
          z-50

          grid
          h-[calc(64px+env(safe-area-inset-bottom))]
          grid-cols-5

          border-t
          border-[#eadbc5]

          bg-[#fffdf8]/95

          pb-[env(safe-area-inset-bottom)]

          shadow-[0_-3px_14px_rgba(80,40,10,0.08)]

          backdrop-blur-xl

          lg:hidden
        "
      >
        {navItems.map((item) => {
          const active = isActive(item);

          return (
            <button
              type="button"
              key={item.key}
              onClick={() => handleClick(item)}
              aria-label={t(item.labelKey)}
              className={`
                relative

                flex
                min-w-0
                flex-col
                items-center
                justify-center
                gap-[3px]

                border-0
                bg-transparent

                px-1
                py-[5px]

                text-[9px]

                transition-colors

                ${
                  active
                    ? "font-bold text-[#a71919]"
                    : "font-medium text-[#766c63] hover:text-[#a71919]"
                }
              `}
            >
              {/* ICON */}

              <span className="text-[21px] leading-none">
                {item.icon}
              </span>

              {/* TRANSLATED LABEL */}

              <span
                className="
                  block
                  w-full
                  truncate
                  text-center
                "
              >
                {t(item.labelKey)}
              </span>

              {/* ACTIVE INDICATOR */}

              {active && (
                <span
                  className="
                    absolute
                    bottom-[3px]

                    h-[3px]
                    w-5

                    rounded-full
                    bg-[#c99435]
                  "
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* =====================================================
          DESKTOP NAVIGATION
      ===================================================== */}

      <nav
        className="
          fixed
          bottom-0
          left-0
          top-0
          z-50

          hidden
          w-[92px]

          flex-col

          border-r
          border-[#eadbc5]

          bg-[#fffdf8]

          px-2
          pb-[18px]
          pt-[90px]

          shadow-[3px_0_18px_rgba(80,40,10,0.07)]

          lg:flex
        "
      >
        {navItems.map((item) => {
          const active = isActive(item);

          return (
            <button
              type="button"
              key={item.key}
              onClick={() => handleClick(item)}
              title={t(item.labelKey)}
              aria-label={t(item.labelKey)}
              className={`
                relative

                flex
                min-h-[72px]
                w-full
                flex-col
                items-center
                justify-center
                gap-[7px]

                rounded-[10px]

                border-0

                px-1
                py-[10px]

                text-[11px]

                transition

                ${
                  active
                    ? `
                      bg-[#fbead3]
                      font-bold
                      text-[#a71919]

                      before:absolute
                      before:left-0
                      before:h-[34px]
                      before:w-[3px]
                      before:rounded-r-[5px]
                      before:bg-[#c99435]
                    `
                    : `
                      bg-transparent
                      text-[#766c63]

                      hover:bg-[#fff2dd]
                      hover:text-[#a71919]
                    `
                }
              `}
            >
              {/* ICON */}

              <span className="text-[25px] leading-none">
                {item.icon}
              </span>

              {/* TRANSLATED LABEL */}

              <span
                className="
                  block
                  w-full
                  truncate
                  text-center
                "
              >
                {t(item.labelKey)}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}