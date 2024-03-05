import "@/styles/globals.css";
import type { Metadata } from "next";
import LocalFont from "next/font/local";
import { Open_Sans as FontSans } from "next/font/google";
import { TailwindIndicator } from "@/components/tailwind-indicator";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { siteConfig } from "@/config/site";
import { EdgeStoreProvider } from "@/lib/edgestore";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Font files can be colocated inside of `pages`

const fontHeading = LocalFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-heading",
});

export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ["Next.js", "React", "Tailwind CSS", "Supply Cahin", "Radix UI"],
  authors: [
    {
      name: "Team8",
      url: "",
    },
  ],
  creator: "team8",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.png`],
    creator: "@",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontHeading.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <EdgeStoreProvider>
            {children}
            <Toaster />
            <TailwindIndicator />
          </EdgeStoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
