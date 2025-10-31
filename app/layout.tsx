// app/layout.tsx
import type { ReactNode } from 'react'
import { Inter } from 'next/font/google'
import ThemeProvider from '@/components/theme-provider'
import SiteHeader from '@/components/site-header'
import SiteFooter from '@/components/site-footer'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  title: {
    default: 'Keith Winfield — Web Developer',
    template: '%s — Keith Winfield',
  },
  description:
    'Web developer specializing in Drupal/WordPress + React/Next.js, accessibility (WCAG 2.2), performance (CWV), and marketing ops (GA4, Mailchimp).',
  openGraph: {
    type: 'website',
    url: 'https://keiths-portfolio-2026.vercel.app',
    title: 'Keith Winfield — Web Developer',
    description:
      'Drupal/WordPress + React/Next.js · Accessibility · Performance · GA4/Mailchimp',
    images: [
      { url: '/og.png', width: 1200, height: 630, alt: 'Keith Winfield — Web Developer' },
    ],
    siteName: 'Keith Winfield Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Keith Winfield — Web Developer',
    description:
      'Drupal/WordPress + React/Next.js · Accessibility · Performance · GA4/Mailchimp',
    images: ['/og.png'],
    creator: '@keejay', // optional if you want to keep nickname handle
  },
  icons: {
    shortcut: '/favicon.ico',
  },
}


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased min-h-dvh bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100`}>
        <ThemeProvider>
          <div className="flex min-h-dvh flex-col">
            <SiteHeader />
            <main className="container mx-auto w-full max-w-5xl flex-1 px-4 py-8">
              {children}
            </main>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
