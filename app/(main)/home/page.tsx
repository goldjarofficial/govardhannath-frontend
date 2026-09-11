import {
  Bell,
  Headphones,
  HandHeart,
  CalendarDays,
  BookOpen,
  Gift,
  Grid2X2,
} from 'lucide-react';
import Card from '@/app/components/ui/Card'

const actions = [
  {
    title: 'Live Darshan',
    icon: Headphones,
  },
  {
    title: 'Seva & Donation',
    icon: HandHeart,
  },
  {
    title: 'Go Seva',
    icon: HandHeart,
  },
  {
    title: 'Events & Utsav',
    icon: CalendarDays,
  },
  {
    title: 'Reels & Bhakti',
    icon: BookOpen,
  },
  {
    title: 'Prasadam',
    icon: Gift,
  },
  {
    title: 'More',
    icon: Grid2X2,
  },
];

export default function HomePage() {
  return (
    <>
      <header
        className="
          flex
          items-center
          justify-between
          px-4
          pb-3
          pt-4
        "
      >
        <div>
          <p className="text-[11px] text-[#7A655E]">
            🙏 Jai Shree Krishna
          </p>

          <h1
            className="
              temple-heading
              text-[18px]
              font-semibold
              text-[#5F1617]
            "
          >
            Namaste, Krishna
          </h1>
        </div>

        <button
          className="
            relative
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-white
          "
        >
          <Bell size={20} />

          <span
            className="
              absolute
              right-2
              top-2
              h-2
              w-2
              rounded-full
              bg-red-500
            "
          />
        </button>
      </header>

      <div className="space-y-4 px-4">
        <div
          className="
            relative
            h-[190px]
            overflow-hidden
            rounded-[22px]
            bg-[url('/images/banners/banner-1.jpg')]
            bg-cover
            bg-center
          "
        >
          <div
            className="
              absolute
              inset-x-0
              bottom-0
              flex
              items-center
              justify-between
              bg-gradient-to-t
              from-black/80
              to-transparent
              px-4
              pb-4
              pt-10
            "
          >
            <span className="font-semibold text-white">
              🔔 Live Darshan Now
            </span>

            <span
              className="
                rounded-lg
                bg-red-600
                px-3
                py-1
                text-xs
                font-bold
                text-white
              "
            >
              ● LIVE
            </span>
          </div>
        </div>

        <Card className="p-4">
          <div className="flex justify-between">
            <div>
              <p className="text-xs text-[#7A655E]">
                Next Darshan
              </p>

              <h2
                className="
                  temple-heading
                  mt-1
                  text-[18px]
                  font-semibold
                "
              >
                Rajbhog
              </h2>
            </div>

            <div className="text-right">
              <p className="text-xs text-[#7A655E]">
                12:15 PM
              </p>

              <p className="mt-1 font-semibold text-[#178755]">
                00:45:20
              </p>
            </div>
          </div>
        </Card>

        <div
          className="
            grid
            grid-cols-4
            gap-x-2
            gap-y-5
          "
        >
          {actions.map(({ title, icon: Icon }) => (
            <button
              key={title}
              className="
                flex
                flex-col
                items-center
                gap-2
                text-center
              "
            >
              <div
                className="
                  flex
                  h-[52px]
                  w-[52px]
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-[#F0DFC3]
                  bg-white
                  text-[#F26922]
                  shadow-sm
                "
              >
                <Icon size={23} />
              </div>

              <span
                className="
                  text-[10px]
                  leading-[14px]
                  text-[#4E3933]
                "
              >
                {title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}