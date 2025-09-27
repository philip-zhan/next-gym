import SchemaBuilder from "@pothos/core";
import { db } from "@/db";
import { users } from "@/db/schema/users";
import { eq, isNull } from "drizzle-orm";

const builder = new SchemaBuilder({});

// Define User type
const User = builder.objectRef<typeof users.$inferSelect>("User");
builder.objectType(User, {
  fields: (t) => ({
    id: t.exposeInt("id", {}),
    name: t.exposeString("name", {}),
    email: t.exposeString("email", {}),
    createdAt: t.field({
      type: "String",
      resolve: (user) => user.created_at.toISOString(),
    }),
    updatedAt: t.field({
      type: "String", 
      resolve: (user) => user.updated_at.toISOString(),
    }),
    deletedAt: t.field({
      type: "String",
      nullable: true,
      resolve: (user) => user.deleted_at?.toISOString() || null,
    }),
  }),
});

// Input types for mutations
const CreateUserInput = builder.inputType("CreateUserInput", {
  fields: (t) => ({
    name: t.string({ required: true }),
    email: t.string({ required: true }),
  }),
});

const UpdateUserInput = builder.inputType("UpdateUserInput", {
  fields: (t) => ({
    name: t.string(),
    email: t.string(),
  }),
});

// Query fields
builder.queryType({
  fields: (t) => ({
    hello: t.string({
      resolve: () => "world",
    }),
    users: t.field({
      type: [User],
      resolve: async () => {
        return await db.select().from(users).where(isNull(users.deleted_at));
      },
    }),
    user: t.field({
      type: User,
      nullable: true,
      args: {
        id: t.arg.int({ required: true }),
      },
      resolve: async (_, { id }) => {
        const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
        return result[0] || null;
      },
    }),
  }),
});

// Mutation fields
builder.mutationType({
  fields: (t) => ({
    createUser: t.field({
      type: User,
      args: {
        input: t.arg({ type: CreateUserInput, required: true }),
      },
      resolve: async (_, { input }) => {
        const result = await db.insert(users).values(input).returning();
        return result[0];
      },
    }),
    updateUser: t.field({
      type: User,
      nullable: true,
      args: {
        id: t.arg.int({ required: true }),
        input: t.arg({ type: UpdateUserInput, required: true }),
      },
      resolve: async (_, { id, input }) => {
        // Filter out null/undefined values
        const updateData: Partial<typeof users.$inferInsert> = {};
        if (input.name !== undefined && input.name !== null) {
          updateData.name = input.name;
        }
        if (input.email !== undefined && input.email !== null) {
          updateData.email = input.email;
        }
        
        const result = await db
          .update(users)
          .set(updateData)
          .where(eq(users.id, id))
          .returning();
        return result[0] || null;
      },
    }),
    deleteUser: t.field({
      type: User,
      nullable: true,
      args: {
        id: t.arg.int({ required: true }),
      },
      resolve: async (_, { id }) => {
        const result = await db
          .update(users)
          .set({ deleted_at: new Date() })
          .where(eq(users.id, id))
          .returning();
        return result[0] || null;
      },
    }),
  }),
});

export const schema = builder.toSchema();
