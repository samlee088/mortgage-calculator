import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mortgage Calculator",
  description: "Mortgage Calculator built with Nextjs and shadcn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
