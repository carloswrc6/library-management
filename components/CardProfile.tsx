"use client";
import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import BookImage from "./BookImage";

const CardProfile = () => {
  return (
    <div className="card-my-profile">
      <div className="flex items-center gap-4">
        <Avatar className="w-40 h-40 border-4">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
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
          <h1 className="text-2xl font-semibold text-white">Carlos</h1>
          <p className="text-white">rcasascarl@gmail.com</p>
        </div>
      </div>
      <div>
        <p className="text-white text-sm">University</p>
        <h1 className="text-2xl font-semibold text-white">USS Uni. Señor Sipán</h1>
      </div>
      <div>
        <p className="text-white">Student ID</p>
        <h1 className="text-2xl font-semibold text-white">23456789</h1>
      </div>
      <div className="relative flex flex-1 justify-center">
        <div className="relative">
          <BookImage
            // coverImage={latestBooks[0].coverUrl}
            variant="wide"
            className="z-10"
            coverImage="https://ik.imagekit.io/ozhfnc8l9w/ids/AWS_GAk9cYcWO.png?updatedAt=1738213541178"
          ></BookImage>
        </div>
      </div>
    </div>
  );
};

export default CardProfile;
