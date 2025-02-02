import React from "react";
import { DataTable } from "../../../components/DataTable";
import { columns } from "./columns";
const page = () => {
  const data: Payment[] = [
    {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@yahoo.com",
    },
    {
      id: "3u1reuv4",
      amount: 242,
      status: "success",
      email: "Abe45@gmail.com",
    },
    {
      id: "derv1ws0",
      amount: 837,
      status: "processing",
      email: "Monserrat44@gmail.com",
    },
    {
      id: "5kma53ae",
      amount: 874,
      status: "success",
      email: "Silas22@gmail.com",
    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@hotmail.com",
    },
  ];

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="w-full overflow-hidden">
        <DataTable columns={columns} data={data} />
      </div>
    </section>
  );
};

export default page;
