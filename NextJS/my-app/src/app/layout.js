"use client ";

import "./globals.css";
import { Navigation } from "@/components/Navigation";
import StoreProvider from "./StoreProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <StoreProvider>
          <main className="p-8">{children}</main>
        </StoreProvider>
      </body>
    </html>
  );
}
