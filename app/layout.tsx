import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Xinyue Zhang (Crete) - Personal Portfolio',
  description: 'Personal portfolio website of Xinyue Zhang',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
