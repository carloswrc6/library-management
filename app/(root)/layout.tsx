import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { after } from "next/server";
import Header from "@/components/Header";

const Layout = async ({ children }: { children: ReactNode }) => {

  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        <Header   />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
