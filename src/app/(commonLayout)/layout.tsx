import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";
import React, { ReactNode } from "react";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-screen">{children}</div>
      <Footer></Footer>
    </div>
  );
};

export default CommonLayout;
