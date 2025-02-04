import React from "react";
import Link from "next/link";
import BookCover from "@/components/BookCover";
import Image from "next/image";
import { darkenColor } from "@/lib/utils";

const BookBorrowedCard = ({
  id,
  title,
  genre,
  coverColor,
  coverUrl,
  borrowDate,
  daysUntilDueDate,
  returnDate,
}: BorrowedBook) => (
  <li className="w-full">
    {daysUntilDueDate < 0 && (
      <Image
        src="/icons/warning.svg"
        width={25}
        height={25}
        alt="No Results"
        className="absolute top-0 left-0"
      />
    )}
    {/* <Link href={`/books/${id}`} className="w-full flex flex-col items-center"> */}
      <div
        className="p-5 rounded-xl"
        style={{
          backgroundColor: darkenColor(coverColor, 0.5),
        }}
      >
        <BookCover coverColor={coverColor} coverImage={coverUrl} />
      </div>
      <div>
        <p className="book-title">{title}</p>
        <p className="book-genre">{genre}</p>
        <div className="flex items-center gap-2 my-1">
          <Image
            src="/icons/book-2.svg"
            width={25}
            height={25}
            alt="No Results"
          />
          <p className="book-date">Borrowed on {borrowDate}</p>
        </div>
        <div className="flex items-center justify-between w-full">
          {daysUntilDueDate > 0 && !returnDate && (
            <div className="flex items-center gap-2">
              <Image
                src="/icons/calendar.svg"
                width={25}
                height={25}
                alt="No Results"
              />
              <p className="book-date">{daysUntilDueDate} days left to due</p>
            </div>
          )}
          {returnDate && (
            <div className="flex items-center gap-2 my-1">
              <Image
                src="/icons/tick-circle.svg"
                width={25}
                height={25}
                alt="No Results"
              />
              <p className="book-date">Returned on {returnDate}</p>
            </div>
          )}
          {daysUntilDueDate < 0 && (
            <div className="flex items-center gap-2 my-1">
              <Image
                src="/icons/warning.svg"
                width={25}
                height={25}
                alt="No Results"
              />
              <p className="book-return">Overdue Return</p>
            </div>
          )}
          <Image
            className="p-1 rounded-md"
            style={{
              backgroundColor: darkenColor(coverColor, 0.5),
            }}
            src="/icons/receipt-text.svg"
            width={25}
            height={25}
            alt="No Results"
          />
        </div>
      </div>
    {/* </Link> */}
  </li>
);

export default BookBorrowedCard;
