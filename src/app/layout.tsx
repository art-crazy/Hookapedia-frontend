import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientLayout from '../components/ClientLayout'
import YandexMetrika from '../components/YandexMetrika/YandexMetrika'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export { metadata } from "./metadata";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ru">
            <body className={inter.className}>
                <YandexMetrika />
                <ClientLayout>
                    {children}
                </ClientLayout>
            </body>
        </html>
    )
}
