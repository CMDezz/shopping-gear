// src/app/layout.tsx
import type { Metadata } from 'next'
import { font_inter, font_playwrite } from '@/lib/utils/config/fonts'
import './globals.css'
import { Toaster } from '@/components/molecules/Sonner/Sonner'
import { QueryProvider } from '@/components/providers/QueryProvider'

export const metadata: Metadata = {
    title: 'Shopping Gear - Server Actions & TanStack Query Demo',
    description:
        'Next.js app with Server Actions, TanStack Query, and middleware',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body
                className={`${font_inter.variable} ${font_playwrite.variable}`}
            >
                <QueryProvider>
                    <main>{children}</main>
                    <Toaster />
                </QueryProvider>
            </body>
        </html>
    )
}
