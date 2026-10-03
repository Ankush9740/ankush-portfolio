import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import { PORTFOLIO_INTRO_STORAGE_KEY } from "@/lib/portfolio-intro";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ankush — Creative Developer",
  description:
    "A creative developer portfolio focused on useful, interactive digital experiences.",
  icons: { icon: "/favicon.svg" },
};

const introBootstrapScript = `(() => {
  try {
    if (window.location.pathname !== "/") return;
    if (window.sessionStorage.getItem(${JSON.stringify(PORTFOLIO_INTRO_STORAGE_KEY)}) !== "complete") return;

    const root = document.documentElement;
    root.classList.add("intro-session-complete");

    const revealPortfolio = () => {
      const site = document.getElementById("portfolio-site");
      if (!site) return false;

      document.getElementById("portfolio-intro")?.remove();
      site.className = "site-ready site-refreshing";
      root.classList.remove("intro-session-complete");
      return true;
    };

    if (!revealPortfolio()) {
      const observer = new MutationObserver(() => {
        if (!revealPortfolio()) return;
        observer.disconnect();
      });
      observer.observe(root, { childList: true, subtree: true });
    }
  } catch {}
})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} data-scroll-behavior="smooth">
      <body>
        {children}
        <Script id="portfolio-intro-session-bootstrap" strategy="beforeInteractive">
          {introBootstrapScript}
        </Script>
      </body>
    </html>
  );
}
