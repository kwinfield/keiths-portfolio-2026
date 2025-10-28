// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { Suspense } from 'react'           // ← add this
import AnalyticsListener from './analytics-listener'
import SiteHeader from '@/components/site-header'
import SiteFooter from '@/components/site-footer'
import ThemeProvider from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Keejay Portfolio',
  description: 'Senior Web Developer — Drupal / WordPress / JS / Analytics',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider>
          <SiteHeader />
          <main className="container py-8">{children}</main>
          <SiteFooter />
          {/* GA scripts + <Suspense><AnalyticsListener/></Suspense> as-is */}
        </ThemeProvider>
      </body>
    </html>
  )
}
