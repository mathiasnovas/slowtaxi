import { GoogleAnalytics } from "@next/third-parties/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    default: "slow taxi",
    template: "%s — slow taxi",
  },
  description: "Taking the scenic route. A blog by Mathias Novas.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://slowtaxi.vercel.app/",
  ),
  openGraph: {
    title: "slow taxi",
    description: "Taking the scenic route. A blog by Mathias Novas.",
    siteName: "slow taxi",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${mono.variable} ${sans.variable}`}>
      <body
        className="min-h-screen flex flex-col"
        style={{ fontFamily: "var(--font-body)" }}
      >
        <header>
          <div className="checkered-sm" />
          <div className="max-w-2xl mx-auto px-6 py-5 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <span
                className="text-sm tracking-tight text-taxi-dark inline-flex"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                slow&nbsp;
                <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-6 group-hover:duration-[3s] group-hover:ease-linear">
                  taxi
                </span>
              </span>
            </Link>
            <nav
              className="flex items-center gap-4 text-xs text-taxi-dark/50"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <Link href="/" className="hover:text-taxi-dark transition-colors">
                blog
              </Link>
              <Link
                href="/about"
                className="hover:text-taxi-dark transition-colors"
              >
                about
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-10">
          {children}
        </main>

        <footer className="mt-auto">
          <div className="py-6">
            <div className="max-w-2xl mx-auto px-6 flex items-center justify-between">
              <p
                className="text-xs text-taxi-dark/40"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                &copy; {new Date().getFullYear()} slow taxi
              </p>
              <p
                className="text-xs text-taxi-dark/30"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                this is a footer
              </p>
            </div>
          </div>
        </footer>
        <SpeedInsights />
        {process.env.NODE_ENV === "production" &&
          process.env.NEXT_PUBLIC_GA_ID && (
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
          )}
      </body>
    </html>
  );
}
