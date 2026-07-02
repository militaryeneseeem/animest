import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: { default: 'Animest — Anime discovery powered by community and AI', template: '%s | Animest' },
  description: 'IMDb-class anime catalog, reviews, social lists, multilingual discovery, and AI recommendations.',
  openGraph: { title: 'Animest', type: 'website', siteName: 'Animest' },
  twitter: { card: 'summary_large_image' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="tr"><body>{children}</body></html>;
}
