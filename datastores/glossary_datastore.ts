import { DefineDatastore, Schema } from "deno-slack-sdk/mod.ts";

const GlossaryDataStore = DefineDatastore({
  name: "glossary",
  primary_key: "id",
  attributes: {
    id: { type: Schema.types.string },
    definition: { type: Schema.types.string },
    word: { type: Schema.types.string },
    contributor: { type: Schema.slack.types.user_id },
    lastUpdate: { type: Schema.types.string },
  },
});

export default GlossaryDataStore;
