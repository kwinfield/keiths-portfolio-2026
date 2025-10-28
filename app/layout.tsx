// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { Suspense } from 'react'           // ← add this
import AnalyticsListener from './analytics-listener'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Keejay Portfolio',
  description: 'Senior Web Developer — Drupal / WordPress / JS / Analytics',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}

        {/* GA4 loader */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        {/* Wrap hooks in Suspense to satisfy CSR bailout on 404/_not-found */}
        <Suspense fallback={null}>
          <AnalyticsListener />
        </Suspense>
      </body>
    </html>
  )
}
