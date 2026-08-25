import type { Metadata, Viewport } from 'next';
import { Caprasimo, Figtree } from 'next/font/google';
import '../styles/organic.css';
import '../styles/globals.css';

const caprasimo = Caprasimo({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-caprasimo',
  display: 'swap',
});

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-figtree',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'TVSH Repair Tracker — POC',
  description:
    'Proof-of-concept repair tracking for TV Sales & Home: branch portal, customer status screen and WhatsApp assistant.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${caprasimo.variable} ${figtree.variable}`}>
      <body>{children}</body>
    </html>
  );
}
