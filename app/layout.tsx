import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/lib/provider/providers";


export const metadata: Metadata = {
  title: "MediPlus",
  description: "A medical website for telemedicine solution",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}