import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CATA TSA',
  description: 'Technology Student Association at Central Academy of Technology and Arts - Innovating the Future, Today.',
  icons: {
    icon: '/images/tsa-logo.png',
    shortcut: '/images/tsa-logo.png',
    apple: '/images/tsa-logo.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/tsa-logo.png" type="image/png" />
        <link rel="shortcut icon" href="/images/tsa-logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/tsa-logo.png" />
      </head>
      <body className="font-body">{children}</body>
    </html>
  );
}