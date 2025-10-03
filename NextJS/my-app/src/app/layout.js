import "./globals.css";
import { Navigation } from "@/components/Navigation";
import Providers from "@/components/providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navigation />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
