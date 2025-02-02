import React from "react";
import CardProfile from "@/components/CardProfile";
import BookBorrowed from "@/components/BookBorrowed";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { desc } from "drizzle-orm";

const Page = async () => {
  const latestBooks = (await db
    .select()
    .from(books)
    .limit(10)
    .orderBy(desc(books.createdAt))) as Book[];

  console.log("latestBooks ", latestBooks);
  return (
    <>
      <div className="book-profile">
        <div className="flex flex-1 flex-col">
          <CardProfile />
        </div>
        <div className="relative flex flex-1 justify-center">
          <BookBorrowed title="Borrowed Books" books={latestBooks}   />
        </div>
      </div>
    </>
  );
};
export default Page;
