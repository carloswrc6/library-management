"use server";

import { ROLE_ENUM } from "@/constants";
import { db } from "@/database/drizzle";
import { borrowRecords, users } from "@/database/schema";
import { count, eq } from "drizzle-orm";

export const deleteUser = async (id: string) => {
  try {
    const result = await db.delete(users).where(eq(users.id, id));
    if (result.rowCount === 0) {
      return {
        success: false,
        message: "User not found",
      };
    }
    return {
      success: true,
      message: "User delete successfully",
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: "Error deleting user",
    };
  }
};

export const updateUserRole = async (id: string, newRole: string) => {
  try {
    console.log("ROLE_ENUM ", ROLE_ENUM);
    console.log("id ", id);
    console.log("newRole ", newRole);

    if (!ROLE_ENUM.some((role) => role.value === newRole)) {
      return {
        success: false,
        message: "Error: Invalid role",
      };
    }

    const result = await db
      .update(users)
      .set({ role: newRole })
      .where(eq(users.id, id));

    if (result.rowCount === 0) {
      return {
        success: true,
        message: "User not found",
      };
    }

    return { success: true, message: "Role updated successfully" };
  } catch (e) {
    return {
      success: false,
      message: "Error updating role",
    };
  }
};

export const listUsers = async () => {
  try {
    const result = await db
      .select({
        id: users.id,
        name: users.fullName,
        email: users.email,
        universityCard: users.universityCard,
        dateJoined: users.createdAt,
        role: users.role,
        numUniversityId: users.universityId,
        borrowedCount: count(borrowRecords.id).as("borrowedCount"), // Contar los libros prestados
      })
      .from(users)
      .leftJoin(borrowRecords, eq(users.id, borrowRecords.userId)) // Relacionar usuarios con préstamos
      .groupBy(users.id);

    const formattedResult = result.map((item) => {
      return {
        ...item,
        dateJoined: new Date(item.dateJoined).toLocaleDateString("en-US", {
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

export const listAccountRequest = async () => {
  try {
    const result = await db
      .select({
        id: users.id,
        name: users.fullName,
        email: users.email,
        dateJoined: users.createdAt,
        universityId: users.universityId,
        universityCard: users.universityCard,
        status: users.status,
      })
      .from(users)
      .where(eq(users.status, "PENDING"));

    const formattedResult = result.map((item) => ({
      ...item,
      dateJoined: new Date(item.dateJoined).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    }));

    return { success: true, data: formattedResult };
  } catch (e) {
    console.error(e);
    return { success: false, message: "An error occurred" };
  }
};

export const accountRequest = async (userId: string, newStatus: string) => {
  try {
    const result = await db
      .update(users)
      .set({ status: newStatus })
      .where(eq(users.id, userId));
    
    if (result.rowCount === 0) {
      return {
        success: true,
        message: "User not found",
      };
    }

    return { success: true, message: "Status updated successfully" };
  } catch (e) {
    console.error(e);
    return { success: false, message: "An error occurred" };
  }
};
