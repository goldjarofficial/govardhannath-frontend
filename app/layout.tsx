import type { Metadata } from 'next';

import {
  Cormorant_Garamond,
  Inter,
} from 'next/font/google';

import './globals.css';

import Providers from './providers';

const headingFont =
  Cormorant_Garamond({
    subsets: ['latin'],
    variable: '--font-heading',
    weight: [
      '400',
      '500',
      '600',
      '700',
    ],
  });

const bodyFont = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

export const metadata: Metadata = {
  title:
    'Shri Govardhannath Haveli',

  description:
    'Shri Govardhannath Haveli - Vashi, Navi Mumbai',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${headingFont.variable}
          ${bodyFont.variable}
        `}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}