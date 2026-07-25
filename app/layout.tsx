import type { Metadata } from "next";
import { Cormorant_Garamond, Work_Sans } from "next/font/google";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "N L Marriage Hall & Guest House",
  description:
    "Book N L Marriage Hall & Guest House for weddings, receptions, and celebrations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${workSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
