import React from "react";
import { DataTable } from "../../../components/DataTable";
import { columns } from "./columns";
import { listUsers } from "@/lib/admin/actions/user";
const page = async () => {
  const { success, data } = await listUsers();
  const userData = success ? data : [];
  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <h2 className="text-xl font-semibold pb-2">All Users</h2>
      <div className="w-full overflow-hidden">
        <DataTable columns={columns} data={userData} />
      </div>
    </section>
  );
};

export default page;
