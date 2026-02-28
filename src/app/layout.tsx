import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/ui/Navbar";
import SmoothScroll from "@/components/ui/SmoothScroll";

export const metadata: Metadata = {
  title: "Shabbir Tashrifwala — AI Researcher",
  description:
    "Portfolio of Shabbir Tashrifwala. Teaching machines to think. Projects in adversarial ML, computer vision, and AI research.",
  keywords: ["AI", "Machine Learning", "PyTorch", "Deepfake Detection", "Portfolio", "Shabbir Tashrifwala"],
  openGraph: {
    title: "Shabbir Tashrifwala — AI Researcher",
    description: "Teaching machines to think so I don't have to.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XPW0Q1S0D9" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XPW0Q1S0D9');
            `,
          }}
        />
        <link rel="icon" type="image/png" href="/assets/favicon.png" />
      </head>
      <body className="antialiased">
        <CustomCursor />
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
