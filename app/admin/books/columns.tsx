"use client";

import UserAvatar from "@/components/admin/UserAvatar";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { deleteUser } from "@/lib/admin/actions/user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { useCallback } from "react";

export type column = {
  id: string;
  title: string;
  author: string;
  genre: string;
  coverUrl: string;
  createAt: string;
};

export const columns: ColumnDef<column>[] = [
  {
    accessorKey: "title",
    header: "Book Title",
    cell: ({ row }) => {
      return (
        <UserAvatar
          src="https://github.com/shadcn.png"
          name={row.original.title}
        />
      );
    },
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "genre",
    header: "Genre",
  },
  {
    accessorKey: "createAt",
    header: "Date Created",
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const handleDelete = useCallback(async () => {
        console.log("Deleted ID:", row.original.id);
        const { success, message } = await deleteUser(row.original.id);
        if (success) {
          toast({
            title: "Success",
            description: message,
          });
        } else {
          toast({
            title: "Delete user",
            description: message ?? "An error occurred.",
            variant: "destructive",
          });
        }
      }, [row.original.id]);
      return (
        <button onClick={handleDelete}>
          <Image
            src="/icons/admin/trash.svg"
            width={20}
            height={20}
            alt="Logo"
          />
        </button>
      );
    },
  },
];
