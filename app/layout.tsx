import type {
  Metadata,
} from "next";

import "./globals.css";

import Providers from "./providers";

export const metadata: Metadata = {
  title: "Shri Govardhannath",
  description:
    "Shri Govardhannath Haveli",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}