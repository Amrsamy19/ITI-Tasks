"use client ";

import "./globals.css";
import { Navigation } from "@/components/Navigation";
import StoreProvider from "./StoreProvider";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <Navigation /> */}
        <StoreProvider>
          <Toaster position="top-center"/>
          <main>{children}</main>
        </StoreProvider>
      </body>
    </html>
  );
}
