import BookList from "@/components/BookList";
import NoResults from "@/components/NoResults";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

const page = () => {
  const search = "ABC de algoritmos";
  const searchResults = [];

  return (
    <div className="w-full">
      <section className="book-overview">
        <div className="flex flex-1 flex-col items-center gap-5">
          <div className="book-info">
            <p className="uppercase">Discover Your Next Great Read:</p>
          </div>
          <h1>Explore and Search for</h1>
          <h1 className="pb-5">
            <span className="font-semibold text-light-200"> Any Book </span>
            In Our Library
          </h1>
          <div className="relative w-full max-w-4xl">
            <Image
              src="/icons/search-fill.svg"
              width={20}
              height={20}
              alt="Search Icon"
              className="absolute left-3 top-1/2 -translate-y-1/2"
            />
            <Input
              className="form-input w-full pl-10"
              type="text"
              placeholder="Search for a book..."
            />
          </div>
        </div>
      </section>
      <section>
        {searchResults.length < 1 ? (
          <NoResults title={search} />
        ) : (
          <BookList
            title="Search Results "
            books={searchResults.slice(1)}
            containerClassName="mt-28"
          />
        )}
      </section>
    </div>
  );
};

export default page;
