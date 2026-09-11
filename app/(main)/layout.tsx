import DesktopHeader from '@/app/components/layout/DesktopHeader';
import BottomNavigation from '@/app/components/layout/BottomNavigation';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        min-h-dvh
        bg-[#FFF9ED]
      "
    >
      <DesktopHeader />

      <main
        className="
          min-h-dvh
          pb-[82px]

          md:pb-0
        "
      >
        {children}
      </main>

      <BottomNavigation />
    </div>
  );
}