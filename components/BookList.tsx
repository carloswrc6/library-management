import React from "react";
import BookCard from "@/components/BookCard";

interface Props {
  title: string;
  books: Book[];
  containerClassName?: string;
  hideDetails?: boolean;
}

const BookList = ({ title, books, containerClassName, hideDetails }: Props) => {
  if (books.length < 2) return;
  return (
    <section className={containerClassName}>
      <h2 className="font-bebas-neue text-4xl text-light-100">{title}</h2>
      <ul className="book-list justify-center">
        {books.map((book) => (
          <BookCard key={book.title} {...book} hideDetails={hideDetails} />
        ))}
      </ul>
    </section>
  );
};
export default BookList;
