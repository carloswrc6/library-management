import React from "react";
import { DataTable } from "@/components/DataTable";
import { columns } from "./columns";
import { listBorrowedBooks } from "@/lib/admin/actions/book";

const page = async () => {
  const { success, data } = await listBorrowedBooks();
  const bookData = success ? data : [];
  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <h2 className="text-xl font-semibold pb-2">All Borrowed Books</h2>
      <div className="w-full overflow-hidden">
        <DataTable columns={columns} data={bookData} />
      </div>
    </section>
  );
};

export default page;
