"use server";

import { books, borrowRecords, users } from "@/database/schema";
import { db } from "@/database/drizzle";
import { and, count, desc, eq, gte, lt, lte } from "drizzle-orm";
import dayjs from "dayjs";

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
      .from(users);
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

export const listRecentlyAddedBooks = async () => {
  try {
    const result = await db
      .select({
        id: books.id,
        title: books.title,
        author: books.author,
        genre: books.genre,
        coverUrl: books.coverUrl,
        coverColor: books.coverColor,
        borrowDate: books.createdAt,
      })
      .from(books)
      .orderBy(desc(books.createdAt))
      .limit(10);

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
      message: "An error occurred",
    };
  }
};

const getStartAndEndOfMonth = (monthOffset = 0) => {
  const date = dayjs().add(monthOffset, "month");
  return {
    startOfMonth: date.startOf("month").toDate(),
    endOfMonth: date.endOf("month").toDate(),
  };
};

const getTotalByDateRange = async (table, dateColumn, startDate, endDate) => {
  return db
    .select({ total: count() })
    .from(table)
    .where(and(gte(dateColumn, startDate), lte(dateColumn, endDate)));
};

const calculatePercentageChange = (current, previous) => {
  if (previous > 0) {
    return ((current - previous) / previous) * 100;
  }
  return current > 0 ? 100 : 0;
};

export const getBorrowingTrends = async () => {
  const { startOfMonth } = getStartAndEndOfMonth();
  const { startOfMonth: startOfLastMonth, endOfMonth: endOfLastMonth } =
    getStartAndEndOfMonth(-1);

  const tables = [
    { table: borrowRecords, dateColumn: borrowRecords.borrowDate },
    { table: users, dateColumn: users.createdAt },
    { table: books, dateColumn: books.createdAt },
  ];

  const queries = tables.flatMap(({ table, dateColumn }) => [
    getTotalByDateRange(table, dateColumn, startOfMonth, new Date()),
    getTotalByDateRange(table, dateColumn, startOfLastMonth, endOfLastMonth),
  ]);

  const results = await Promise.all(queries);

  const [
    totalPrestamosActualResult,
    totalPrestamosMesAnteriorResult,
    totalUsuariosActualResult,
    totalUsuariosMesAnteriorResult,
    totalBooksActualResult,
    totalBooksMesAnteriorResult,
  ] = results;

  const getTotal = (result) => result[0]?.total || 0;

  const totalPrestamosActual = getTotal(totalPrestamosActualResult);
  const totalPrestamosMesAnterior = getTotal(totalPrestamosMesAnteriorResult);
  const totalUsuariosActual = getTotal(totalUsuariosActualResult);
  const totalUsuariosMesAnterior = getTotal(totalUsuariosMesAnteriorResult);
  const totalBooksActual = getTotal(totalBooksActualResult);
  const totalBooksMesAnterior = getTotal(totalBooksMesAnteriorResult);

  const porcentajeCambioPrestamos = calculatePercentageChange(
    totalPrestamosActual,
    totalPrestamosMesAnterior
  );
  const porcentajeCambioUsuarios = calculatePercentageChange(
    totalUsuariosActual,
    totalUsuariosMesAnterior
  );
  const porcentajeCambioBooks = calculatePercentageChange(
    totalBooksActual,
    totalBooksMesAnterior
  );

  return {
    totalPrestamosActual,
    totalPrestamosMesAnterior,
    porcentajeCambioPrestamos: parseFloat(porcentajeCambioPrestamos.toFixed(2)),
    totalUsuariosActual,
    totalUsuariosMesAnterior,
    porcentajeCambioUsuarios: parseFloat(porcentajeCambioUsuarios.toFixed(2)),
    totalBooksActual,
    totalBooksMesAnterior,
    porcentajeCambioBooks: parseFloat(porcentajeCambioBooks.toFixed(2)),
  };
};
