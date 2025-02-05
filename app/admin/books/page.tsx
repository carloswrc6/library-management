import React from "react";
import { DataTable } from "@/components/DataTable";
import { columns } from "./columns";
import { listBooks } from "@/lib/admin/actions/book";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const page = async () => {
  const { success, data } = await listBooks();
  const bookData = success ? data : [];
  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex justify-between items-center gap-2">
        <h2 className="text-xl font-semibold pb-2">All Books</h2>
        <div className="flex flex-wrap pt-2 pb-5 items-center gap-2">
          <Button className="bg-primary-admin" asChild>
            <Link href="/admin/books/new" className="text-white">
              + Create a New Book
            </Link>
          </Button>
        </div>
      </div>
      <div className="w-full overflow-hidden">
        <DataTable columns={columns} data={bookData} />
      </div>
    </section>
  );
};

export default page;
