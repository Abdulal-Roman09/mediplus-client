import { ReactNode } from "react";
import { Navbar } from "@/components/ux/Home/navbar/navbar";
import { Footer } from "@/components/ux/Home/Footer/Footer";
import AiHomePage from "@/components/ux/Home/Ai/AiPage";

export default function Commonlayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>
        {children}
      </main>
      <AiHomePage />
      <Footer />
    </div>
  );
}
