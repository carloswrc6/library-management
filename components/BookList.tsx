import React from "react";
import BookCard from "@/components/BookCard";

interface Props {
  title: string;
  books: Book[];
  containerClassName?: string;
  hideDetails?: boolean;
  children?: React.ReactNode;
}

const BookList = ({ title, books, containerClassName, hideDetails, children  }: Props) => {
  if (books.length < 1) return;
  return (
    <section className={containerClassName}>
      <div className="flex justify-between mb-4">
        <h2 className="font-bebas-neue text-4xl text-light-100">{title}</h2>
        {children && <div>{children}</div>}
      </div>
      <ul className="book-list justify-center">
        {books.map((book) => (
          <BookCard key={book.title} {...book} hideDetails={hideDetails} />
        ))}
      </ul>
    </section>
  );
};
export default BookList;
