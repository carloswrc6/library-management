"use server";

import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { and, desc, eq, ilike, not } from "drizzle-orm";
import dayjs from "dayjs";

export const borrowBook = async (params: BorrowBookParams) => {
  const { userId, bookId } = params;
  try {
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
