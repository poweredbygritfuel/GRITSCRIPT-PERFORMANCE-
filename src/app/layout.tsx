import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "GRITSCRIPT PERFORMANCE 2.0 | Precision has a purpose.",
  description:
    "Purpose-built laboratory essentials. Explore the GritScript product information catalog and prepare a sample inquiry.",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
