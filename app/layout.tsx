import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PopupProvider } from "@/components/Common/Popup/PopupContext";
import Header from "@/components/Header/Header/Header";
import AuthHydrator from "./_providers/AuthHydrator";
import BottomNavBarGate from "@/components/_components/BottomNavBarGate";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "מצאדליאד - מצא את הדירה המושלמת שלך",
  description: "מצא דירות למכירה ולהשכרה בישראל. אלפי דירות ממתינות לך - דירות 3 חדרים, 4 חדרים, 5+ חדרים ודירות יוקרה. חיפוש מתקדם וקל לשימוש.",
  keywords: "דירות למכירה, דירות להשכרה, נדלן, דירות 3 חדרים, דירות 4 חדרים, דירות יוקרה, תל אביב, רמת גן, הרצליה",
  openGraph: {
    title: "מצאדליאד - מצא את הדירה המושלמת שלך",
    description: "מצא דירות למכירה ולהשכרה בישראל. אלפי דירות ממתינות לך - דירות 3 חדרים, 4 חדרים, 5+ חדרים ודירות יוקרה.",
    type: "website",
    locale: "he_IL",
  },
  twitter: {
    card: "summary_large_image",
    title: "מצאדליאד - מצא את הדירה המושלמת שלך",
    description: "מצא דירות למכירה ולהשכרה בישראל. אלפי דירות ממתינות לך.",
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthHydrator />
        <PopupProvider>
          <Header />
          <main>
            {children}
          </main>
          <BottomNavBarGate />
        </PopupProvider>
      </body>
    </html>
  );
}
