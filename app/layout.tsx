import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'uou.cat | Innovation Team',
  description: 'We are the innovation team behind spiritu.al & more',
  keywords: ['innovation', 'team', 'spiritu.al', 'technology'],
  authors: [{ name: 'uou.cat team' }],
  creator: 'uou.cat',
  publisher: 'uou.cat',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-icon.png' },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://uou.cat',
    siteName: 'uou.cat',
    title: 'Uou Cat | Innovation Team',
    description: 'We are the innovation team behind spiritu.al & more',
    images: [
      {
        url: '/aesth.jpg',
        width: 1200,
        height: 630,
        alt: 'uou.cat Aesthetic Image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@uoucat',
    creator: '@uoucat',
    images: ['/aesth.jpg'],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

