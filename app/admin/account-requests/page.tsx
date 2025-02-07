import React from "react";
import { DataTable } from "@/components/DataTable";
import { columns } from "./columns";
import { listAccountRequest } from "@/lib/admin/actions/user";
import { CustomAlertDialog } from "@/components/CustomAlertDialog";

const page = async () => {
  const { success, data } = await listAccountRequest();
  const userData = success ? data : [];
  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <h2 className="text-xl font-semibold pb-2">
        Account Registration Requests
      </h2>      
      <div className="w-full overflow-hidden">
        <DataTable columns={columns} data={userData} />
      </div>
    </section>
  );
};

export default page;
