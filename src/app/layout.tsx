// Dependencies
import type { Metadata } from "next";
import Script from "next/script";

// Components
import DarkHeader from "@/components/darkHeader";
import DarkFooter from "@/components/darkFooter";
import AnnouncmentBar from "@/components/announcmentBar";

// Styles
import "@/styles/index.scss";

export const metadata: Metadata = {
  title: "Docling - Open Source Document Processing for AI",
  description:
    "Docling simplifies document processing with advanced PDF understanding, OCR support, and seamless AI integrations. Parse PDFs, DOCX, PPTX, images & more. Open source by IBM Research.",
  openGraph: {
    title: "Docling - Open Source Document Processing for AI",
    description:
      "Docling simplifies document processing with advanced PDF understanding, OCR support, and seamless AI integrations. Parse PDFs, DOCX, PPTX, images & more. Open source by IBM Research.",
    images: [
      {
        url: "/images/DoclingMeta.webp",
        width: 1200,
        height: 630,
        alt: "Docling Open Graph Image",
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
    <html lang="en">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-MP75NXFDH4"
        />
        <Script
          id="gtag-script"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-MP75NXFDH4');
            `,
          }}
        />
      </head>
      <body>
        <div className="layout">
          <AnnouncmentBar />
          <DarkHeader />
          {children}
          <DarkFooter />
        </div>
      </body>
    </html>
  );
}
