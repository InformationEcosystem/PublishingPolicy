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
  title: "Publishing Policy - Define What You Stand For",
  description: "Every publisher needs a policy. Define your commitments to ethical publishing and create accountability standards for your organization.",
  keywords: ["publishing policy", "publishing ethics", "editorial standards", "journalism standards", "content policy", "malpublish"],
  openGraph: {
    title: "Publishing Policy - Define What You Stand For",
    description: "Every publisher needs a policy. Define your commitments and create accountability standards.",
    type: "website",
    url: "https://publishingpolicy.org",
  },
  metadataBase: new URL("https://publishingpolicy.org"),
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
