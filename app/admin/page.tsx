import AccountRequestsList from "@/components/AccountRequestsList";
import InfoCard from "@/components/InfoCard";
import RecentlyAddedBooks from "@/components/RecentlyAddedBooks";
import RequestList from "@/components/RequestList";
import {
  getBorrowingTrends,
  listBorrowRequests,
  listRecentlyAddedBooks,
} from "@/lib/admin/actions/home";
import { listAccountRequest } from "@/lib/admin/actions/user";
import React from "react";

const page = async () => {
  const { success: successBorrow, data: bookData } = await listBorrowRequests();
  const borrowRequestData = successBorrow ? bookData?.slice(0, 3) : [];

  const { success: successRecentlyBook, data: recentlyBook } =
    await listRecentlyAddedBooks();
  const recentlyBookData = successRecentlyBook ? recentlyBook : [];
  console.table(recentlyBookData)
  const { success: successAccount, data: userData } =
    await listAccountRequest();
  const accountRequestData = successAccount ? userData : [];
  const trendsData = await getBorrowingTrends();

  return (
    <div>
      <div className="flex w-full gap-2">
        <InfoCard
          title={"Borrowed Books"}
          total={trendsData.totalPrestamosActual}
          trend={trendsData.porcentajeCambioPrestamos}
        ></InfoCard>
        <InfoCard
          title={"Total Users"}
          total={trendsData.totalUsuariosActual}
          trend={trendsData.porcentajeCambioUsuarios}
        ></InfoCard>
        <InfoCard
          title={"Total Books"}
          total={trendsData.totalBooksActual}
          trend={trendsData.porcentajeCambioBooks}
        ></InfoCard>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col gap-4 w-1/2 py-5">
          <RequestList
            dataList={borrowRequestData}
            viewDetails={true}
            viewUser={true}
            classNameList="bg-gray-50 rounded-2xl"
          ></RequestList>
          <AccountRequestsList
            dataList={accountRequestData}
            viewDetails={true}
            viewUser={true}
            classNameList="bg-gray-50 rounded-2xl"
          ></AccountRequestsList>
        </div>
        <div className="w-1/2 py-4">
          <RecentlyAddedBooks dataList={recentlyBookData}></RecentlyAddedBooks>
        </div>
      </div>
    </div>
  );
};

export default page;
