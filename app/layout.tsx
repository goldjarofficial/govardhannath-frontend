import "./globals.css";

export const metadata = {
  title: "Shri Govardhannath Haveli",
  description: "Seva • Satsang • Sanskar",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
