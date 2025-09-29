import SchemaBuilder from "@pothos/core";

const builder = new SchemaBuilder({});
// Query fields
builder.queryType({
  fields: (t) => ({
    hello: t.string({
      resolve: () => "world",
    }),
  }),
});

export const schema = builder.toSchema();
