import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/context/ThemeContext';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'Shaambhavi Sivappugaz · Software Developer & AI Engineer',
  description: 'Full-stack developer & AI engineer. 2.5+ years at Zoho building distributed systems. Monash MIT student based in Melbourne, Australia.',
  metadataBase: new URL('https://shaambhavisivappugaz-portfolio-zeta.vercel.app'),
  openGraph: {
    title: 'Shaambhavi Sivappugaz · Software Developer & AI Engineer',
    description: 'Full-stack developer & AI engineer. 2.5+ years at Zoho building distributed systems. Monash MIT student based in Melbourne, Australia.',
    url: 'https://shaambhavisivappugaz-portfolio-zeta.vercel.app',
    siteName: 'Shaambhavi Sivappugaz',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Shaambhavi Sivappugaz — Software Developer & AI Engineer',
      },
    ],
    locale: 'en_AU',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shaambhavi Sivappugaz · Software Developer & AI Engineer',
    description: 'Full-stack developer & AI engineer. 2.5+ years at Zoho. Monash MIT student, Melbourne.',
    images: ['/opengraph-image'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Black+Han+Sans&display=swap" rel="stylesheet"/>
      </head>
      <body className={inter.variable}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
