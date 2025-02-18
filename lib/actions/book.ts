"use server";

import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { and, desc, eq, ilike, not } from "drizzle-orm";
import dayjs from "dayjs";

export const borrowBook = async (params: BorrowBookParams) => {
  const { userId, bookId } = params;

  try {

    const userStatus = await db
      .select({ status: users.status })
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    if (!userStatus.length) {
      return {
        success: false,
        error: "User not found",
      };
    }

    if (["PENDING", "REJECTED"].includes(userStatus[0].status)) {
      return {
        success: false,
        error: "User is not eligible to borrow books",
      };
    }

    const book = await db
      .select({ availableCopies: books.availableCopies })
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);

    if (!book.length || book[0].availableCopies <= 0) {
      return {
        success: false,
        error: "Book is not available for borrowing",
      };
    }

    const dueDate = dayjs().add(7, "day").toDate().toDateString();
    const record = await db
      .insert(borrowRecords)
      .values({
        userId,
        bookId,
        dueDate,
        status: "BORROWED",
      })
      .returning();

    await db
      .update(books)
      .set({ availableCopies: book[0].availableCopies - 1 })
      .where(eq(books.id, bookId));

    return {
      success: true,
      data: record,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      error: "An error occurred while borrowing the book",
    };
  }
};

export const listLatestBooks = async () => {
  try {
    const result = await db
      .select()
      .from(books)
      .limit(10)
      .orderBy(desc(books.createdAt));

    return {
      success: true,
      data: result,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
};

export const getBookDetails = async (id: string) => {
  try {
    const result = await db
      .select()
      .from(books)
      .where(eq(books.id, id))
      .limit(1);
    return {
      success: true,
      data: result,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
};

export const getBookSimilar = async (genre: string, excludeBookId?: string) => {
  try {
    const result = await db
      .select()
      .from(books)
      .where(
        excludeBookId
          ? and(eq(books.genre, genre), not(eq(books.id, excludeBookId)))
          : eq(books.genre, genre)
      )
      .orderBy(desc(books.rating))
      .limit(5);

    return {
      success: true,
      data: result,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
};

export const getSearchBook = async (title: string) => {
  try {
    if (!title) {
      return {
        success: false,
        error: "Title is required",
        data: [],
      };
    }

    const result = await db
      .select()
      .from(books)
      .where(ilike(books.title, `%${title}%`))
      .limit(10);

    if (result.length === 0) {
      return {
        success: false,
        error: "No books found matching the search criteria",
        data: [],
      };
    }

    return {
      success: true,
      data: result,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
};

export const getBorrowedBookById = async (id: string) => {
  try {
    console.log("getBorrowedBookById ", id);

    // id, titulo, genero, fecha de prestamos, tiempo restante para devolver el libro segun la fecha, fecha de retorno
    const result = await db
      .select({
        id: borrowRecords.bookId,
        title: books.title,
        genre: books.genre,
        borrowDate: borrowRecords.borrowDate,
        dueDate: borrowRecords.dueDate,
        coverColor: books.coverColor,
        coverUrl: books.coverUrl,
        returnDate: borrowRecords.returnDate,
      })
      .from(borrowRecords)
      .innerJoin(books, eq(books.id, borrowRecords.bookId))
      .where(
        and(
          eq(borrowRecords.userId, id)
          // , eq(borrowRecords.status, "BORROWED")
        )
      );

    const currentDate = new Date();

    const formattedResult = result.map((item) => {
      const dueDateObj = new Date(item.dueDate);

      const diffTime = dueDateObj - currentDate;
      const daysUntilDueDate = Math.ceil(diffTime / (1000 * 3600 * 24));

      return {
        ...item,
        borrowDate: new Date(item.borrowDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        dueDate: new Date(item.dueDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        daysUntilDueDate,
        returnDate: item.returnDate
          ? new Date(item.returnDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })
          : "",
      };
    });

    console.log("formattedResult ", formattedResult);
    return {
      success: true,
      data: formattedResult,
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      error: "An unexpected error occurred",
    };
  }
};
