"use client";

import React from "react";
import { Button } from "./ui/button";
import BooksDetails from "./BooksDetails";

const RequestList = ({ dataList = [] }) => {
  return (
    <div className="bg-white rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-xl font-semibold ">Borrow Requests</h1>
        <Button className="bg-gray-50 text-blue-900 hover:bg-blue-900 hover:text-gray-50 transition-colors duration-300">
          View all
        </Button>
      </div>

      <BooksDetails
        dataList={dataList}
        viewDetails={true}
        viewUser={true}
        classNameList="bg-gray-50 rounded-2xl"
      ></BooksDetails>
    </div>
  );
};

export default RequestList;
