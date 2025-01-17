import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { serve } from "@upstash/workflow/nextjs";
import { sendEmail } from "@/lib/workflow";

type InitialData = {
  email: string;
  fullName: string;
};

type UserState = "non-active" | "active";

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const THREE_DAYS_IN_MS = 3 * ONE_DAY_IN_MS;
const ONE_MONTH_IN_MS = 30 * ONE_DAY_IN_MS;

const getUserState = async (email: string): Promise<UserState> => {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });
  if (!user) return "non-active";
  const lastActivityDate = user.lastActivityDate;
  const now = new Date();
  const timeDifference = now.getTime() - lastActivityDate.getTime();
  if (timeDifference > THREE_DAYS_IN_MS && timeDifference <= ONE_MONTH_IN_MS)
    return "non-active";
  return "active";
};

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload;

  // Send welcome email to the user
  await context.run("new-signup", async () => {
    await sendEmail({
      to: email,
      subject: "Welcome to the platform",
      html: `<p>Welcome ${fullName} to the platform</p>`,
    });
  });

  // Wait for 3 days
  await context.sleep("wait-for-3-days", THREE_DAYS_IN_MS);

  // Check if the user is active or non-active and send the appropriate email
  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email);
    });

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        await sendEmail({
          to: email,
          subject: "Are you still there?",
          html: `<p>Hey ${fullName} we miss you!</p>`,
        });
      });
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        await sendEmail({
          to: email,
          subject: "Welcome back!",
          html: `<p>Welcome back ${fullName}!</p>`,
        });
      });
    }

    await context.sleep("wait-for-1-month", ONE_MONTH_IN_MS);
  }
});
