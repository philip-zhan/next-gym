import { createAuthClient } from "better-auth/react";
import {
  adminClient,
  apiKeyClient,
  organizationClient,
} from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  plugins: [adminClient(), apiKeyClient(), organizationClient()],
});
