import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { after } from "next/server";
import Header from "@/components/Header";
import { auth } from "@/auth";

const Layout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (!session) redirect("/sign-in");
  return (
    <main className="root-container">
      <div className="w-full">
        <Header session={session}/>
        <div className="mt-2 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
