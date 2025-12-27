import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/lib/provider/providers";
import TanstackQueryProvider from "@/lib/provider/tanstackQuery";

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
        <TanstackQueryProvider>
          <Providers>{children}</Providers>
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
