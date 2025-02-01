"use client";

import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Session } from "next-auth";
import { getInitials, getName } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { logOutAction } from "@/lib/actions/auth";

const Header = ({ session }: { session: Session }) => {
  const pathname = usePathname();
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/">
        <div className="flex flex-row gap-3">
          <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
          <h1 className="text-2xl font-semibold text-white">Booky</h1>
        </div>
      </Link>
      <ul className="flex flex-row items-center gap-8">
        <li className="mb-10">
          <Link href="/">
            <span
              className={`text-lg font-medium ${
                pathname === "/" ? "text-yellow-500" : "text-white"
              }`}
            >
              Home
            </span>
          </Link>
        </li>
        <li className="mb-10">
          <Link href="/search">
            <span
              className={`text-lg font-medium ${
                pathname === "/search" ? "text-yellow-500" : "text-white"
              }`}
            >
              Search
            </span>
          </Link>
        </li>
        <li className="flex justify-center">
          <form className="mb-10 flex items-center space-x-3">
            <Avatar>
              <AvatarFallback className="text-lg bg-blue-200 font-bold">
                {getInitials(session?.user?.name || "US")}
              </AvatarFallback>
            </Avatar>
            <span className="text-lg font-bold text-white">
              {getName(session?.user?.name || "User")}
            </span>
          </form>
        </li>
        <li>
          <form onClick={() => logOutAction()} className="mb-9">
            <button type="button" className="cursor-pointer">
              <Image
                src="/icons/logout.svg"
                width={37}
                height={37}
                alt="Logout"
              />
            </button>
          </form>
        </li>
      </ul>
    </header>
  );
};

export default Header;
