import type { Metadata } from 'next';
import { Providers } from './provider';
import { cn } from '@/utils/cn';
import { fontOutfit } from '@/config/font';
import './globals.css';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

const bodyClsx = cn(fontOutfit.className, 'min-h-screen text-[15px] scroll-smooth antialiased');

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={bodyClsx}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
