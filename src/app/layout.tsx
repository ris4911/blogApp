import type { Metadata } from "next";
import "../styles/global.css";

export const metadata: Metadata = {
  title: "My Blog App",
  description: "Create, edit, and view blog posts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100">{children}</body>
    </html>
  );
}
