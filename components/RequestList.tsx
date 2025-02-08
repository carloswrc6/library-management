"use client";

import React from "react";
import BookCover from "./BookCover";
import UserAvatar from "./admin/UserAvatar";
import Image from "next/image";
import { Button } from "./ui/button";

const RequestList = ({ dataList = [] }) => {
  return (
    <div className="bg-white rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h1 className="pb-2">Borrow Requests</h1>
        <Button>View all</Button>
      </div>
      <div className="space-y-4">
        {dataList.length > 0 ? (
          dataList.map((book) => (
            <div
              key={book.borrowId}
              className="flex items-center gap-2 p-4 bg-gray-50 rounded-2xl"
            >
              <BookCover
                coverColor={book.coverColor}
                coverImage={book.coverUrl}
                className="w-10 h-16"
              />
              <div className="flex flex-col w-full">
                <div className="flex justify-between w-full">
                  <h2 className="font-bold text-sm">{book.title}</h2>
                  <button onClick={() => {}}>
                    <Image
                      src="/icons/admin/eye-2.svg"
                      width={20}
                      height={20}
                      alt="Logo"
                    />
                  </button>
                </div>
                <span className="text-xs">{"By " + book.author}</span>
                <span className="text-xs">{book.genre}</span>
                <div className="flex items-center justify-between gap-2 w-full">
                  <div className="flex gap-2">
                    <UserAvatar
                      classNameAvatar="w-4 h-4"
                      src={book.universityCard}
                    />
                    <span className="text-xs">{book.user}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Image
                      src="/icons/admin/calendar.svg"
                      width={20}
                      height={20}
                      alt="Logo"
                    />
                    <span className="text-xs">{book.borrowDate}</span>
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

export default RequestList;
