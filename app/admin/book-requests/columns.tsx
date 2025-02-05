"use client";

import UserAvatar from "@/components/admin/UserAvatar";
import BookCover from "@/components/BookCover";
import CustomSelect from "@/components/CustomSelect";
import { STATUS_BOOK_ENUM } from "@/constants";
import { toast } from "@/hooks/use-toast";
import { updateStatusBook } from "@/lib/admin/actions/book";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { useCallback, useState } from "react";

export type column = {
  id: string;
  bookId: string;
  book: string;
  coverColor: string;
  coverUrl: string;
  userId: string;
  user: string;
  email: string;
  universityCard: string;
  status: string;
  borrowDate: string;
  returnDate: string;
  dueDate: string;
};

export const columns: ColumnDef<column>[] = [
  {
    accessorKey: "book",
    header: "Book Title",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <BookCover
          coverColor={row.original.coverColor}
          coverImage={row.original.coverUrl}
          className="w-8 h-10"
        />
        <h2 className="font-bold">{row.original.book}</h2>
      </div>
    ),
  },
  {
    accessorKey: "user",
    header: "User Requested",
    cell: ({ row }) => {
      return (
        <UserAvatar
          src={row.original.universityCard}
          name={row.original.user}
          email={row.original.email}
        />
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const [selectedRole, setSelectedRole] = useState(row.original.status);
      const options = STATUS_BOOK_ENUM;

      const handleStatusChange = useCallback(
        async (newStatus: string) => {
          console.log("handleStatusChange ", newStatus);
          setSelectedRole(newStatus);
          const { success, message } = await updateStatusBook(
            row.original.id,
            newStatus
          );

          if (success) {
            toast({
              title: "Role Updated",
              description: message,
            });
          } else {
            toast({
              title: "Error",
              description:
                message ?? "An error occurred while updating the status.",
              variant: "destructive",
            });
          }
        },
        [row.original.id]
      );

      return (
        <CustomSelect
          // label="Filter By"
          options={options}
          value={selectedRole}
          onChange={handleStatusChange}
        />
      );
    },
  },
  {
    accessorKey: "borrowDate",
    header: "Borrowed Date",
  },
  {
    accessorKey: "returnDate",
    header: "Borrowed Date",
  },
  {
    accessorKey: "dueDate",
    header: "Due Date",
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const handleEdit = useCallback(() => {
        console.log("handleEdit");
      }, [row.original.id]);

      return (
        <button
          onClick={handleEdit}
          disabled={row.original.status !== STATUS_BOOK_ENUM[0].value}
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="flex flex-row gap-2">
            <Image
              src="/icons/admin/receipt-text.svg"
              width={20}
              height={20}
              alt="Edit"
            />
            <h2 className="text-blue-800 font-bold">Generate</h2>
          </div>
        </button>
      );
    },
  },
];
