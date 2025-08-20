import type { Metadata } from 'next';
import { inter } from '@/ui/fonts';
import { ThemeProvider } from 'next-themes';
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
    <html lang="es-ES" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
