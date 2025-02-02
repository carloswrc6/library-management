import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

interface NoResultsProps {
  title: string;
}

const NoResults = ({ title }: NoResultsProps) => {
  return (
    <section>
      <div className="book-info">
        <h1>
          Search Result:
          <span className="font-semibold text-light-200"> {title}</span>
        </h1>
      </div>
      <div className="book-info flex flex-col items-center text-center w-full">
        <Image
          src="/icons/no-result.svg"
          width={150}
          height={150}
          alt="No Results"
          className="mb-4"
        />
        <h2 className="font-semibold">No Results Found</h2>
        <span>
          We couldn’t find any books matching your search. <br />
          Try using different keywords or check for typos.
        </span>
        <Button className="book-btn text-lg max-w-md">Clear Search</Button>
      </div>
    </section>
  );
};

export default NoResults;
