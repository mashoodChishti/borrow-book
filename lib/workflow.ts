import config from "@/lib/config";
import { Client as WorkflowClient } from "@upstash/workflow";

const { qstashUrl, qstashToken } = config.env.upstash;

export const workflowClient = new WorkflowClient({
  baseUrl: qstashUrl,
  token: qstashToken,
});
