"use client";
import Image from "next/image";
import React from "react";
import UserAvatar from "./admin/UserAvatar";
import { Session } from "next-auth";

const CardProfile = ({ session }: { session: Session }) => {
  return (
    <div className="card-my-profile">
      <div>
        <p className="text-white text-sm">University</p>
        <h1 className="text-2xl font-semibold text-white">
          USS Uni. Señor Sipán
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <UserAvatar
          classNameAvatar="w-40 h-40 border-4"
          src={session?.user?.image}
          name=""
        />
        <div className="space-y-1">
          <div className="flex items-center gap-2 pb-1">
            <Image
              src="/icons/check.svg"
              alt="calendar"
              width={18}
              height={18}
              className="object-contain"
            />
            <p className="text-white text-xs">Verified Student</p>
          </div>
          <h1 className="text-2xl font-semibold text-white">
            {session?.user?.name}
          </h1>
          <p className="text-white">{session?.user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default CardProfile;
