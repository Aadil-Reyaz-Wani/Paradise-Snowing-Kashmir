import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

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
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Paradise Snowing Kashmir",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
          forcedTheme="light"
        >
          {children}
          <Toaster position="top-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
