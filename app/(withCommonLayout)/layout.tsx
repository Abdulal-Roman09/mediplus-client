import { ReactNode } from "react";
import { Navbar } from "@/components/modules/Home/navbar/navbar";
import { Footer } from "@/components/modules/Home/Footer/Footer";
import AiHomePage from "@/components/ux/Home/Ai/AiPage";

export default function Commonlayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>{children}</main>
      <AiHomePage />
      <Footer />
    </div>
  );
}
