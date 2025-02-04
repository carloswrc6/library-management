import React from "react";
import CardProfile from "@/components/CardProfile";
import BookBorrowed from "@/components/BookBorrowed";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { desc } from "drizzle-orm";
import { auth } from "@/auth";
import { getBorrowedBookById } from "@/lib/actions/book";

const Page = async () => {
  const session = await auth();
  const { success, data } = await getBorrowedBookById(
    session?.user?.id as string
  );
  const borrowedBooks = success ? data : [];
  console.log("getBorrowedBookById ", borrowedBooks);
  return (
    <>
      <div className="book-profile">
        <div className="flex flex-1 flex-col">
          <CardProfile />
        </div>
        <div className="relative flex flex-1 justify-center">
          <BookBorrowed title="Borrowed Books" books={borrowedBooks} />
        </div>
      </div>
    </>
  );
};
export default Page;
