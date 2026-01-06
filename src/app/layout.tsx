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
  title: "Publishing Policy - Your Audience Deserves to Know",
  description: "Every entity that publishes content needs a policy. From newsrooms to nonprofits, universities to YouTubers, platforms to personal blogs. Define your commitments and create accountability standards.",
  keywords: ["publishing policy", "publishing ethics", "editorial standards", "journalism standards", "content policy", "malpublish", "transparency"],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Publishing Policy - Your Audience Deserves to Know",
    description: "Every entity that publishes content needs a policy. Define your commitments and create accountability standards.",
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
