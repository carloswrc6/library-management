"use client";

import BookList from "@/components/BookList";
import NoResults from "@/components/NoResults";
import { Input } from "@/components/ui/input";
import { getSearchBook } from "@/lib/actions/book";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";

const Page = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClearSearch = () => {
    setSearch("");
    setSearchResults([]);
    inputRef.current?.focus();
  };

  const handleSearch = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (!search) {
      setSearchResults([]);
      return;
    }
    setIsLoading(true);
    const handler = setTimeout(async () => {
      const { data } = await getSearchBook(search);
      setSearchResults(data);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(handler);
  }, [search]);

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
              className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer"
              onClick={handleSearch}
            />
            <Input
              ref={inputRef}
              className="form-input w-full pl-10"
              type="text"
              placeholder="Search for a book..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </section>
      {search && (
        <section>
          {isLoading ? (
            <div className="text-center text-gray-500 mt-10">Searching...</div>
          ) : searchResults.length > 0 ? (
            <BookList
              title="Search Results"
              books={searchResults}
              containerClassName="mt-28"
            />
          ) : (
            <NoResults title={search} onClearSearch={handleClearSearch} />
          )}
        </section>
      )}
    </div>
  );
};

export default Page;
