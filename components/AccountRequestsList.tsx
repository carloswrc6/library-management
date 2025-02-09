"use client";
import React from "react";
import { Button } from "./ui/button";
import UserAvatar from "./admin/UserAvatar";

const AccountRequestsList = ({ dataList = [] }) => {
  return (
    <div className="bg-white rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-xl font-semibold">Account Requests</h1>
        <Button className="bg-gray-50 text-blue-900 hover:bg-blue-900 hover:text-gray-50 transition-colors duration-300">
          View all
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-4 place-items-center">
        {dataList.map((data, index) => (
          <div
            key={data.id}
            className={`h-full w-full bg-gray-50 rounded-2xl p-3 transition-all duration-500
            ${
              index >= dataList.length - (dataList.length % 3 || 3)
                ? "[mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,0.2))]"
                : ""
            }`}
          >
            <UserAvatar
              layout="vertical"
              classNameAvatar="w-12 h-12"
              src={data.universityCard}
              name={data.title}
              email={data.author}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountRequestsList;
