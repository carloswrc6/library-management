import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import { X } from "lucide-react";

interface Props {
  typeDialog: string;
  titleButton: string;
  iconButton?: string;
  titleDialog: string;
  messageDialog: string;
  classNameButton?: string;
  nameButtonAccept: string;
}

export function CustomAlertDialog({
  typeDialog,
  titleButton,
  iconButton,
  titleDialog,
  messageDialog,
  classNameButton,
  nameButtonAccept,
}: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger className={classNameButton} asChild>
        <button>
          {iconButton && (
            <Image src={iconButton} width={20} height={20} alt="Icon Button" />
          )}
          {titleButton}
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogCancel className="absolute top-2 right-2 p-1 rounded-full border-none shadow-none">
          <X className="w-5 h-8" />
        </AlertDialogCancel>
        <AlertDialogHeader>
          <div className="flex flex-col items-center gap-3">
            <Image
              src={
                typeDialog === "success"
                  ? "/icons/admin/checkAlert.svg"
                  : "/icons/admin/denyAlert.svg"
              }
              width={100}
              height={100}
              alt="Search Icon"
            />
            <AlertDialogTitle>{titleDialog}</AlertDialogTitle>
            <AlertDialogDescription>{messageDialog}</AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <div className="flex justify-center items-center">
          <AlertDialogFooter>
            <AlertDialogAction
              className={
                typeDialog === "success"
                  ? "bg-green-800 text-white hover:bg-green-600"
                  : "bg-red-400 text-white hover:bg-red-300"
              }
            >
              {nameButtonAccept}
            </AlertDialogAction>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
