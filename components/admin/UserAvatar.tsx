import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { IKImage } from "imagekitio-next";
import config from "@/lib/config";

const UserAvatar = ({
  classNameAvatar,
  src,
  name,
  email,
  layout = "horizontal",
}: {
  classNameAvatar: string;
  src: string;
  name: string;
  email?: string;
  layout?: "horizontal" | "vertical";
}) => {
  return (
    <div
      className={`flex ${layout === "vertical" ? "flex-col items-center" : "flex-row items-center"} gap-3`}
    >
      <Avatar
        className={`w-8 h-8 flex items-center justify-center rounded-full overflow-hidden ${classNameAvatar} `}
      >
        <IKImage
          path={src}
          urlEndpoint={config.env.imagekit.urlEndpoint}
          alt="Book cover"
          fill
          className="rounded-sm object-fill"
          loading="lazy"
          lqip={{ active: true }}
        />
        {name && <AvatarFallback>{name[0]}</AvatarFallback>}
      </Avatar>
      {name && (
        <div
          className={`flex flex-col ${layout === "vertical" ? "items-center" : ""}`}
        >
          {name && <span className="font-bold">{name}</span>}
          {email && <span>{email}</span>}
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
