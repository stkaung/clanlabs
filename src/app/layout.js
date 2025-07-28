import { Suspense } from "react";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";
import VideoModalContextProvider from "@/context_api/VideoModalContext";
import HeaderContextProvider from "@/context_api/HeaderContext";
import FooterContextProvider from "@/context_api/FooterContext";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./css/backToTop.css";
import "./css/font-awesome-pro.min.css";
import "./globals.css";

export const metadata = {
  title: "Clan Labs | Roblox Group Management",
  description:
    "In service for six years, and hosting over 2,900 groups. Subscribe to use Clan Labs for as low as $5 a month, and automate your group's progression and management.",
  metadataBase: new URL("https://clanlabs.co"),
  openGraph: {
    url: "https://clanlabs.co",
    siteName: "Clan Labs | Roblox Database Service",
    locale: "en_US",
    type: "website",
    description:
      "In service for six years, and hosting over 2,900 groups. Subscribe to use Clan Labs for as low as $5 a month, and automate your group's progression and management.",
    images: [
      {
        url: "/img/logo/mainlogo.png",
        width: 200,
        height: 150,
        alt: "Clan Labs Logo",
      },
    ],
  },
  themeColor: "#1e6fd9", // Blue color for theme
};

// This layout applies to all routes
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/img/logo/mainlogo.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const savedTheme = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const theme = savedTheme || (prefersDark ? 'dark' : 'light');
                document.documentElement.classList.remove('dark', 'light');
                document.documentElement.classList.add(theme);
              } catch (e) {
                document.documentElement.classList.add('dark');
              }
            `,
          }}
        />
      </head>
      <body className="font-poppins dark:bg-dark-color overflow-x-hidden relative">
        <VideoModalContextProvider>
          <HeaderContextProvider value={{ isInnerPage: false, headerType: 1 }}>
            <FooterContextProvider value={{ footerType: 1 }}>
              <SmoothScrollWrapper>
                <Suspense fallback={<></>}>{children}</Suspense>
              </SmoothScrollWrapper>
            </FooterContextProvider>
          </HeaderContextProvider>
        </VideoModalContextProvider>
      </body>
    </html>
  );
}
