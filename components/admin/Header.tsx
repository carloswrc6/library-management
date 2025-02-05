"use client";
import { Session } from "next-auth";
import React, { useState } from "react";
import { SearchInput } from "./SearchInput";

const Header = ({ session }: { session: Session }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (value: string) => {
    setSearchTerm(value);
    console.log("handleChange");
  };

  return (
    <header className="admin-header px-4 py-3">
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold text-dark-400">
            Welcome, {session?.user?.name}
          </h2>
          <p className="text-base text-slate-500">
            Monitor all of your users and books here
          </p>
        </div>
        <div className="w-1/3">
          <SearchInput
            placeholder="Search users, books by title, author or genre."
            value={searchTerm}
            onChange={handleChange}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
