"use client";
import React from "react";
import { Button } from "./ui/button";
import UserAvatar from "./admin/UserAvatar";

const AccountRequestsList = ({ dataList = [] }) => {
  return (
    <div className="bg-white rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h1 className="pb-2">Borrow Requests</h1>
        <Button>View all</Button>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {dataList.map((data) => (
          <div key={data.id} className="w-24">
            <UserAvatar
              layout="vertical"
              classNameAvatar="w-20 h-20"
              src={data.universityCard}
              // name={data.name}
              name={data.title}
              // email={data.email}
              email={data.author}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountRequestsList;
