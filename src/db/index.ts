import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { user, session, account, verification } from "./schema/auth-schema";

export const db = drizzle(process.env.DATABASE_URL!, {
  schema: {
    user,
    session,
    account,
    verification,
  },
});
