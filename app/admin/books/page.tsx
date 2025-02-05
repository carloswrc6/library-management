import React from "react";
import { DataTable } from "@/components/DataTable";
import { columns } from "./columns";
import { listBooks } from "@/lib/admin/actions/book";
const page = async () => {
  const { success, data } = await listBooks();
  const book1Data = success ? data : [];
  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <h2 className="text-xl font-semibold pb-2">All Books</h2>
      <div className="w-full overflow-hidden">
        <DataTable columns={columns} data={data} />
      </div>
    </section>
  );
};

export default page;
