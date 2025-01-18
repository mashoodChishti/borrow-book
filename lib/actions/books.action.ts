"use server";

import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { eq } from "drizzle-orm";
import dayjs from "dayjs";

export const borrowBook = async (params: BorrowBookParams) => {
  const { bookId, userId } = params;
  try {
    const book = await db.query.books.findFirst({
      where: eq(books.id, bookId),
    });
    if (!book || book.availableCopies <= 0) {
      return {
        success: false,
        message: "Book not available to be borrowed",
      };
    }
    const dueDate = dayjs().add(7, "day").toDate().toISOString();
    const record = await db.insert(borrowRecords).values({
      bookId,
      userId,
      dueDate,
      status: "BORROWED",
    });
    await db
      .update(books)
      .set({
        availableCopies: book.availableCopies - 1,
      })
      .where(eq(books.id, bookId));
    return {
      success: true,
      data: JSON.parse(JSON.stringify(record)),
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "An error occurred while borrowing the book",
    };
  }
};
