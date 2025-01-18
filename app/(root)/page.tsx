import { auth } from "@/auth";
import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { desc } from "drizzle-orm";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";

export default async function Home() {
  const session = await auth();
  const latestBooks = (await db
    .select()
    .from(books)
    .orderBy(desc(books.id))
    .limit(10)) as Book[];
  return (
    <>
      <BookOverview {...latestBooks[0]} userId={session?.user?.id} />
      <BookList
        title="Latest Books"
        books={latestBooks.slice(1)}
        containerClassName="mt-28"
      />
    </>
  );
}
