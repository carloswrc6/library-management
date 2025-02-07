"use client";

import UserAvatar from "@/components/admin/UserAvatar";
import { CustomAlertDialog } from "@/components/CustomAlertDialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { accountRequest } from "@/lib/admin/actions/user";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { useCallback } from "react";

export type column = {
  id: string;
  name: string;
  email?: string;
  dateJoined: string;
  universityIdCard: string;
  universityCard: string;
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
    accessorKey: "universityId",
    header: "University Id",
  },
  {
    accessorKey: "universityIdCard",
    header: "University Card",
    cell: ({ row }) => {
      return (
        <button className="flex items-center gap-2 text-blue-100">
          <Image src="/icons/admin/eye.svg" width={20} height={20} alt="Logo" />
          View ID Card
        </button>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      // const handleRequest2 = () =>{
      //   CustomAlertDialog()
      // }
      const handleRequest = useCallback(
        async (status: string) => {
          console.log("status:", status);
          const { success, message } = await accountRequest(
            row.original.id,
            status
          );
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
        },
        [row.original.id]
      );
      return (
        <div className="flex items-center gap-2">
          <CustomAlertDialog
            typeDialog={"success"}
            titleButton={"Approve Account"}
            titleDialog={"Approve Book Request"}
            messageDialog={
              "Approve the student’s account request and grant access. A confirmation email will be sent upon approval."
            }
            classNameButton={
              "bg-green-200 text-green-700 font-bold rounded-md p-1 px-3"
            }
            nameButtonAccept={"Approve & Send Confirmation"}
          ></CustomAlertDialog>
          <CustomAlertDialog
            typeDialog={"error"}
            titleButton={""}
            iconButton={"/icons/admin/close-circle.svg"}
            titleDialog={"Deny Account Request"}
            messageDialog={
              "Denying this request will notify the student they’re not eligible due to unsuccessful ID card verification."
            }
            nameButtonAccept={"Deny & Notify Student"}
          ></CustomAlertDialog>
        </div>
      );
    },
  },
];
