import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PageExperience from "./page-experience";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stratoc",
  description: "Welcome to Stratoc. Moving forward, together.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PageExperience>{children}</PageExperience>
        <noscript><style>{`.preloader { display: none !important; } html, body { overflow: auto !important; } #site-content { pointer-events: auto !important; user-select: auto !important; }`}</style></noscript>
      </body>
    </html>
  );
}
