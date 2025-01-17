import config from "@/lib/config";
import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QstashClient, resend } from "@upstash/qstash";

const { qstashUrl, qstashToken } = config.env.upstash;
const { resendToken } = config.env.resend;

export const workflowClient = new WorkflowClient({
  baseUrl: qstashUrl,
  token: qstashToken,
});

const qstashClient = new QstashClient({
  token: qstashToken,
});

export const sendEmail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  await qstashClient.publishJSON({
    api: {
      name: "email",
      provider: resend({ token: resendToken }),
    },
    body: {
      from: "BorrowBook <hello@mashoodchishti.com>",
      to: [to],
      subject,
      html,
    },
  });
};
