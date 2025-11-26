import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Paradise Snowing Kashmir | Local Travel Experts",
    template: "%s | Paradise Snowing Kashmir",
  },
  description: "Plan your dream trip to Kashmir & Ladakh with local experts. Customized itineraries, houseboats, and adventure tours.",
  keywords: ["Kashmir Tourism", "Ladakh Trips", "Srinagar Houseboats", "Gulmarg Skiing", "Kashmir Honeymoon Packages"],
  authors: [{ name: "Paradise Snowing Kashmir" }],
  creator: "Paradise Snowing Kashmir",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Paradise Snowing Kashmir | Local Travel Experts",
    description: "Plan your dream trip to Kashmir & Ladakh with local experts.",
    siteName: "Paradise Snowing Kashmir",
    images: [
      {
        url: "/images/og-default.jpg", // Ensure this image exists or use a placeholder
        width: 1200,
        height: 630,
        alt: "Paradise Snowing Kashmir",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paradise Snowing Kashmir",
    description: "Plan your dream trip to Kashmir & Ladakh with local experts.",
    images: ["/images/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
