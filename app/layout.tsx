// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { Suspense } from 'react'           // ← add this
import AnalyticsListener from './analytics-listener'
import SiteHeader from '@/components/site-header'
import SiteFooter from '@/components/site-footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Keejay Portfolio',
  description: 'Senior Web Developer — Drupal / WordPress / JS / Analytics',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SiteHeader />
        <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
        <SiteFooter />

        {/* keep your GA <Script> tags and <Suspense><AnalyticsListener/></Suspense> here */}
      </body>
    </html>
  )
}
