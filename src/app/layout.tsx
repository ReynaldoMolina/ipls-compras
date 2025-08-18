import type { Metadata } from 'next';
import { inter } from '@/ui/fonts';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s - IPLS Compras',
    default: 'IPLS Compras',
  },
  description: 'App de administración de compras',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
