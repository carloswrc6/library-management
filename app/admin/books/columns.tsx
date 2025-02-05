"use client";

import BookCover from "@/components/BookCover";
import { toast } from "@/hooks/use-toast";
import { deleteUser } from "@/lib/admin/actions/user";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

export type column = {
  id: string;
  title: string;
  author: string;
  genre: string;
  coverColor: string;
  coverUrl: string;
  createAt: string;
};

export const columns: ColumnDef<column>[] = [
  {
    accessorKey: "title",
    header: "Book Title",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <BookCover
          coverColor={row.original.coverColor}
          coverImage={row.original.coverUrl}
          className="w-8 h-10"
        />
        <h2 className="font-bold">{row.original.title}</h2>
      </div>
    ),
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
      const router = useRouter();
      const handleEdit = useCallback(() => {
        router.push(`/admin/books/details/${row.original.id}`);
      }, [row.original.id, router]);

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
        <div className="flex gap-2">
          <button onClick={handleEdit}>
            <Image
              src="/icons/admin/edit.svg"
              width={20}
              height={20}
              alt="Edit"
            />
          </button>
          <button onClick={handleDelete}>
            <Image
              src="/icons/admin/trash.svg"
              width={20}
              height={20}
              alt="Delete"
            />
          </button>
        </div>
      );
    },
  },
];
