"use client";
import { NextUIProvider } from "@nextui-org/react";
// src/components/Musicをimport
import Music from '../components/Music/page';
import Zenn from '../components/Zenn/page';
export default function App() {
  return (
    <main className="dark text-foreground bg-background">
      <NextUIProvider>
        <Music />
        <Zenn />
      </NextUIProvider>
    </main>
  )
}
