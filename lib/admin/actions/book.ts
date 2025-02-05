"use server";

import { books, borrowRecords, users } from "@/database/schema";
import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";

export const createBook = async (params: BookParams) => {
  try {
    const newBook = await db
      .insert(books)
      .values({
        ...params,
        availableCopies: params.totalCopies,
      })
      .returning();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newBook[0])),
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "An error occurred while creating the book",
    };
  }
};

export const listBooks = async () => {
  try {
    const result = await db
      .select({
        id: books.id,
        title: books.title,
        author: books.author,
        genre: books.genre,
        coverUrl: books.coverUrl,
        coverColor: books.coverColor,
        createAt: books.createdAt,
      })
      .from(books);

    const formattedResult = result.map((item) => {
      return {
        ...item,
        createAt: new Date(item.createAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
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

export const listBorrowedBooks = async () => {
  try {
    const result = await db
      .select({
        bookId: books.id,
        book: books.title,
        coverUrl: books.coverUrl,
        coverColor: books.coverColor,
        userId: users.id,
        user: users.fullName,
        email: users.email,
        universityCard: users.universityCard,
        status: borrowRecords.status,
        borrowDate: borrowRecords.borrowDate,
        returnDate: borrowRecords.returnDate,
        dueDate: borrowRecords.dueDate,
      })
      .from(borrowRecords)
      .innerJoin(books, eq(books.id, borrowRecords.bookId))
      .innerJoin(users, eq(users.id, borrowRecords.userId));

    const formattedResult = result.map((item) => {
      return {
        ...item,
        borrowDate: new Date(item.borrowDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        returnDate: item.returnDate
          ? new Date(item.returnDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })
          : "",
        dueDate: new Date(item.dueDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
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

export const updateStatusBook = async (id: string, status: string) => {
  try {
    return {
      success: true,
      data: [],
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: "An error ocurred",
    };
  }
};
