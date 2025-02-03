"use client";

import BookList from "@/components/BookList";
// import CustomPagination from "@/components/CustomPagination";
// import CustomSelect from "@/components/CustomSelect";
import NoResults from "@/components/NoResults";
import { Input } from "@/components/ui/input";
import { getSearchBook } from "@/lib/actions/book";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const page = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [selectedFruit, setSelectedFruit] = useState("");
  // const fruits = [
  //   { label: "Apple", value: "apple" },
  //   { label: "Banana", value: "banana" },
  //   { label: "Blueberry", value: "blueberry" },
  //   { label: "Grapes", value: "grapes" },
  //   { label: "Pineapple", value: "pineapple" },
  // ];

  const handleClearSearch = () => {
    setSearch("");
    setSearchResults([]);
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
              className="absolute left-3 top-1/2 -translate-y-1/2"
            />
            <Input
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
            <div className="text-center text-gray-500 mt-10">Buscando...</div>
          ) : searchResults.length > 0 ? (
            <BookList
              title="Search Results "
              books={searchResults}
              containerClassName="mt-28"
            >
              {/* <CustomSelect
                label="Filter By"
                options={fruits}
                value={selectedFruit}
                onChange={setSelectedFruit}
              /> */}
            </BookList>
          ) : (
            <NoResults title={search} onClearSearch={handleClearSearch} />
          )}
        </section>
      )}
      {/* <CustomPagination></CustomPagination> */}
    </div>
  );
};

export default page;
