"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { IKImage } from "imagekitio-next";
import config from "@/lib/config";

type BookImageVariant = "extraSmall" | "small" | "medium" | "regular" | "wide";

const variantStyles: Record<BookImageVariant, string> = {
  extraSmall: "book-cover_extra_small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide",
};

interface Props {
  className?: string;
  variant?: BookImageVariant;
  coverColor: string;
  coverImage: string;
}

const BookImage = ({
  className,
  variant = "regular",
  coverColor = "#012B48",
  coverImage = "https://placehold.co/400x600.png",
}: Props) => {
  const isExternalUrl = coverImage.startsWith("http");

  return (
    <div
      // className={cn(
      //   "relative transition-all duration-300",
      //   variantStyles[variant],
      //   className
      // )}
    >
      <div
        // className="absolute z-10"
        // style={{ left: "12%", width: "100%", height: "100%" }}
      >
        {isExternalUrl ? (
          <img
            src={coverImage}
            alt="Book cover"
            className="rounded-sm object-fill"
          />
        ) : (
          <IKImage
            path={coverImage}
            urlEndpoint={config.env.imagekit.urlEndpoint}
            alt="Book cover"
            fill
            className="rounded-sm object-fill"
            loading="lazy"
            lqip={{ active: true }}
          />
        )}
      </div>
    </div>
  );
};
export default BookImage;
