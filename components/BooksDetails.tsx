"use client";

import React from "react";
import BookCover from "./BookCover";
import UserAvatar from "./admin/UserAvatar";
import Image from "next/image";
import { Button } from "./ui/button";

const BooksDetails = ({
  dataList = [],
  viewDetails = false,
  viewUser = false,
  classNameList = "",
}) => {
  return (
    <div className="rounded-2xl ">
      <div className="space-y-4">
        {dataList.length > 0 ? (
          dataList.map((book) => (
            <div
              key={book.borrowId}
              className={`flex items-center gap-2 p-4 
              last:[mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,0.2))] 
              last:transition-all 
              last:duration-500 ${classNameList}`}
            >
              <BookCover
                coverColor={book.coverColor}
                coverImage={book.coverUrl}
                className="w-10 h-16"
              />
              <div className="flex flex-col w-full">
                <div className="flex justify-between w-full">
                  <h1 className="font-bold text-sm">{book.title}</h1>
                  {viewDetails && (
                    <button onClick={() => {}}>
                      <Image
                        src="/icons/admin/eye-2.svg"
                        width={20}
                        height={20}
                        alt="Logo"
                      />
                    </button>
                  )}
                </div>
                <span className="text-xs text-slate-500">
                  {"By " + book.author + " • " + book.genre}
                </span>
                <div className="flex items-center justify-between gap-2 w-full">
                  {viewUser && (
                    <div className="flex gap-2">
                      <UserAvatar
                        classNameAvatar="w-4 h-4"
                        src={book.universityCard}
                      />
                      <span className="text-xs text-slate-600">
                        {book.user}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Image
                      src="/icons/admin/calendar.svg"
                      width={15}
                      height={15}
                      alt="Logo"
                    />
                    <span className="text-xs text-slate-600">
                      {book.borrowDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No borrow requests found.</p>
        )}
      </div>
    </div>
  );
};

export default BooksDetails;
