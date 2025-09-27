import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { timestamps } from "./_timestamps";

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: text().notNull(),
  email: text().notNull().unique(),
  ...timestamps,
});
