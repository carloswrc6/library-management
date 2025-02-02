import React from "react";
import BookBorrowedCard from "./BookBorrowedCard";

interface Props {
  title: string;
  books: Book[];
  containerClassName?: string;
  hideDetails?: boolean;
}

const BookBorrowed = ({
  title,
  books,
  containerClassName,
  hideDetails,
}: Props) => {

  if (books.length < 2) return;
  return (
    <section className={containerClassName}>
      <h2 className="font-bebas-neue text-4xl text-light-100">{title}</h2>
      <ul className="book-list">
        {books.map((book) => (
          <div key={book.id} className="borrowed-books">
            <BookBorrowedCard key={book.title} {...book} hideDetails={hideDetails} />
          </div>
        ))}
      </ul>
    </section>
  );
};
export default BookBorrowed;
