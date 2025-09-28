import "./globals.css";
import { Navigation } from "@/components/Navigation";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        <main className="p-8">{children}</main>
      </body>
    </html>
  );
}
