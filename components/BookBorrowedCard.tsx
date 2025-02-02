import React from "react";
import Link from "next/link";
import BookCover from "@/components/BookCover";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const darkenColor = (hex: string, percent: number) => {
  let num = parseInt(hex.replace("#", ""), 16);
  let r = Math.max(0, (num >> 16) - (num >> 16) * percent);
  let g = Math.max(0, ((num >> 8) & 0x00ff) - ((num >> 8) & 0x00ff) * percent);
  let b = Math.max(0, (num & 0x0000ff) - (num & 0x0000ff) * percent);
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
};

const BookBorrowedCard = ({
  id,
  title,
  genre,
  coverColor,
  coverUrl,
  isLoanedBook = false,
  hideDetails = false,
}: Book) => (
  <li className={cn(isLoanedBook && "xs:w-52 w-full")}>
    <Link
      href={`/books/${id}`}
      className={cn(isLoanedBook && "w-full flex flex-col items-center")}
    >
      <div
        className="p-5 rounded-xl"
        style={{
          backgroundColor: darkenColor(coverColor, 0.5),
        }}
      >
        <BookCover coverColor={coverColor} coverImage={coverUrl} />
      </div>

      {!hideDetails && (
        <div className={cn("mt-4", !isLoanedBook && "xs:max-w-40 max-w-28")}>
          <p className="book-title">{title}</p>
          <p className="book-genre">{genre}</p>
          <div className="flex items-center gap-2">
            <Image
              src="/icons/book-2.svg"
              width={25}
              height={25}
              alt="No Results"
            />
            <p className="book-date">Borrowed on Dec 21</p>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/icons/calendar.svg"
              width={25}
              height={25}
              alt="No Results"
            />
            <p className="book-date">04 days left to due</p>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/icons/tick-circle.svg"
              width={25}
              height={25}
              alt="No Results"
            />
            <p className="book-date">Returned on 5th Jan</p>
          </div>
          <div className="flex items-center gap-3">
            <Image
              src="/icons/warning.svg"
              width={25}
              height={25}
              alt="No Results"
            />
            <p className="book-return">Overdue Return</p>
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
      )}

      {isLoanedBook && (
        <div className="mt-3 w-full">
          <div className="book-loaned">
            <Image
              src="/icons/calendar.svg"
              alt="calendar"
              width={18}
              height={18}
              className="object-contain"
            />
            <p className="text-light-100">11 days left to return</p>
          </div>

          <Button className="book-btn">Download receipt</Button>
        </div>
      )}
    </Link>
  </li>
);

export default BookBorrowedCard;
