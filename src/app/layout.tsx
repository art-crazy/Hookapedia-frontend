import { Inter } from 'next/font/google'
import './globals.css'
import ClientLayout from '../components/ClientLayout'
import YandexMetrika from '../components/YandexMetrika/YandexMetrika'
import AgeGate from '@/components/AgeGate'

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
                <AgeGate>
                    <ClientLayout>
                        {children}
                    </ClientLayout>
                </AgeGate>
            </body>
        </html>
    )
}
