import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IntegrationIQ — Integration feasibility research",
  description: "Find out whether an integration is feasible, with official documentation and explicit uncertainty.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
