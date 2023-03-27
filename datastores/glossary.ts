import { DefineDatastore, Schema } from "deno-slack-sdk/mod.ts";

export const GlossaryDataStore = DefineDatastore({
  name: "glossary",
  primary_key: "word",
  attributes: {
    word: { type: Schema.types.string },
    definition: { type: Schema.types.array },
    contributor: { type: Schema.types.string },
    lastUpdate: { type: Schema.slack.types.date },
    refCount: { type: Schema.types.integer },
  },
});
