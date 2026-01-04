import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Malpublish - Define Your Publishing Ethics",
  description: "Enable your organization to define what malpublishing means in your context. Create and publish your publishing ethics policy.",
  keywords: ["malpublish", "publishing ethics", "misinformation", "journalism standards", "content policy"],
  openGraph: {
    title: "Malpublish - Define Your Publishing Ethics",
    description: "Enable your organization to define what malpublishing means in your context.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
