import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IKImage } from "imagekitio-next";
import config from "@/lib/config";

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
        <IKImage
          path={src}
          urlEndpoint={config.env.imagekit.urlEndpoint}
          alt="Book cover"
          fill
          className="rounded-sm object-fill"
          loading="lazy"
          lqip={{ active: true }}
        />
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
