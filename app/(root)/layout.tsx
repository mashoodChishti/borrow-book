import { auth } from "@/auth";
import Header from "@/components/Header";
import { db } from "@/database/drizzle";
import { eq } from "drizzle-orm";
import { users } from "@/database/schema";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { ReactNode } from "react";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }

  after(async () => {
    // If the user is not logged in then return
    if (!session?.user?.id) return;

    // Get the user and check if the last activity date is today if yes then return
    const user = await db.query.users.findFirst({
      where: eq(users.id, session.user.id),
    });

    if (
      user?.lastActivityDate.toDateString().slice(0, 10) ===
      new Date().toDateString().slice(0, 10)
    )
      return;

    // Update the last activity date in the database if last activity date is not today
    await db
      .update(users)
      .set({
        lastActivityDate: new Date(),
      })
      .where(eq(users.id, session.user.id));
  });

  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl text-white">
        <Header session={session} />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default RootLayout;
