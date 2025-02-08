"use server";

import { books, borrowRecords, users } from "@/database/schema";
import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";

export const listBorrowRequests = async () => {
  try {
    const result = await db
      .select({
        borrowId: borrowRecords.id,
        id: books.id,
        title: books.title,
        author: books.author,
        genre: books.genre,
        coverUrl: books.coverUrl,
        coverColor: books.coverColor,
        user: users.fullName,
        universityCard: users.universityCard,
        borrowDate: borrowRecords.borrowDate,
      })
      .from(borrowRecords)
      .innerJoin(books, eq(books.id, borrowRecords.bookId))
      .innerJoin(users, eq(users.id, borrowRecords.userId));

    const formattedResult = result.map((item) => {
      return {
        ...item,
        borrowDate: new Date(item.borrowDate).toLocaleDateString("es-ES"),
      };
    });

    return {
      success: true,
      data: formattedResult,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: "An error ocurred",
    };
  }
};

export const listAccountRequests = async () => {
  try {
    const result = await db
      .select({
        id: users.id,
        name: users.fullName,
        email: users.email,
        universityCard: users.universityCard,
      })
      .from(users)
      // .where(eq(users.status, "PENDING"));

    return {
      success: true,
      data: result,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: "An error ocurred",
    };
  }
};
