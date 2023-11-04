"use client";
import { Inter } from 'next/font/google'
import './globals.css'
import { MainNavbar } from "../components/MainNavBar/page";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";


const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="dark">
            <MainNavbar />
            {children}
          </NextThemesProvider>
        </NextUIProvider >
      </body>
    </html >
  )
}
