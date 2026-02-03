import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BlogPosts",
  description: "Blog Posts Static Pages",
  keywords: ["blog", "posts", "static", "nextjs"],
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
