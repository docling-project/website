// Dependencies
import type { Metadata } from "next";

// Components
// import Header from "@/components/header";
// import Footer from "@/components/footer";

// Styles
import "@/styles/index.scss";
import DarkHeader from "@/components/darkHeader";
import DarkFooter from "@/components/darkFooter";

export const metadata: Metadata = {
  title: "Docling - Open Source Document Processing for AI",
  description: "Docling simplifies document processing with advanced PDF understanding, OCR support, and seamless AI integrations. Parse PDFs, DOCX, PPTX, images & more. Open source by IBM Research.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="layout">
          <DarkHeader />
          {children}
          <DarkFooter />
        </div>
      </body>
    </html>
  );
}
