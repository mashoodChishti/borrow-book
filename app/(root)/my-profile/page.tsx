import BookList from "@/components/BookList";
import React from "react";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";

const MyProfile = async () => {
  const booksList = (await db.select().from(books)) as Book[];
  return (
    <>
      <BookList title="Borrowed Books" books={booksList} />
    </>
  );
};

export default MyProfile;
