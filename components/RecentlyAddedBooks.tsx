"use client";

import React from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import BooksDetails from "./BooksDetails";

const RecentlyAddedBooks = ({ dataList = [] }) => {
  return (
    <div className="bg-white rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-xl font-semibold">Recently Added Books</h1>
        <Button className="bg-gray-50 text-blue-900 hover:bg-blue-900 hover:text-gray-50 transition-colors duration-300">
          View all
        </Button>
      </div>
      <div className="flex items-center gap-3 p-3 mb-4 bg-gray-50 rounded-2xl">
        <button onClick={() => {}} className="bg-white rounded-3xl p-2">
          <Image
            src="/icons/admin/Plus.svg"
            width={20}
            height={20}
            alt="Logo"
          />
        </button>
        <h1>Add new book</h1>
      </div>
      <BooksDetails
        dataList={dataList}
        viewDetails={false}
        viewUser={false}
      ></BooksDetails>
    </div>
  );
};

export default RecentlyAddedBooks;
