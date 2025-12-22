import { Footer } from "@/components/ux/Footer/Footer";
import { Navbar } from "@/components/ux/navbar/navbar";
import { ReactNode } from "react";


export default function Commonlayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer/>
    </div>
  );
}
