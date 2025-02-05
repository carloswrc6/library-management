"use client";

import UserAvatar from "@/components/admin/UserAvatar";
import BookImage from "@/components/BookImage";
import CustomSelect from "@/components/CustomSelect";
import { ROLE_ENUM } from "@/constants";
import { toast } from "@/hooks/use-toast";
import { deleteUser, updateUserRole } from "@/lib/admin/actions/user";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { useCallback, useState } from "react";

export type column = {
  id: string;
  name: string;
  email?: string;
  universityCard: string;
  dateJoined: string;
  role: string;
  borrowedCount: number;
  numUniversityId: number;
  // UniversityIdCard: number
};

export const columns: ColumnDef<column>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      return (
        <UserAvatar
          src={row.original.universityCard}
          name={row.original.name}
          email={row.original.email}
        />
      );
    },
  },
  {
    accessorKey: "dateJoined",
    header: "Date Joined",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const [selectedRole, setSelectedRole] = useState(row.original.role);
      const options = ROLE_ENUM;

      const handleRoleChange = useCallback(
        async (newRole: string) => {
          console.log("handleRoleChange ", newRole);
          setSelectedRole(newRole);
          const { success, message } = await updateUserRole(
            row.original.id,
            newRole
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
                message ?? "An error occurred while updating the role.",
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
          onChange={handleRoleChange}
        />
      );
    },
  },
  {
    accessorKey: "borrowedCount",
    header: "Book Borrowed",
  },
  {
    accessorKey: "numUniversityId",
    header: "University Id No",
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
