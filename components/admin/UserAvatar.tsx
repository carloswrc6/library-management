import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const UserAvatar = ({
  src,
  name,
  email,
}: {
  src: string;
  name: string;
  email?: string;
}) => {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="w-8 h-8 flex items-center justify-center rounded-full overflow-hidden">
        <AvatarImage src={src} />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col">
        <span className="font-bold">{name}</span>
        {email && <span>{email}</span>}
      </div>
    </div>
  );
};

export default UserAvatar;
