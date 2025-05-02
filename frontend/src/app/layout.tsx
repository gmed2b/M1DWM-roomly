import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Roomly - Find Your Perfect Meeting Space",
  description: "Discover and book professional meeting rooms, conference halls, and unique event spaces",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-neutral-50">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
