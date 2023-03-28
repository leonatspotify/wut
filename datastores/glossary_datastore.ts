import { DefineDatastore, Schema } from "deno-slack-sdk/mod.ts";

const GlossaryDataStore = DefineDatastore({
  name: "glossary",
  primary_key: "word",
  attributes: {
    word: { type: Schema.types.string },
    definition: { type: Schema.types.string },
    // contributor: { type: Schema.slack.types.user_id },
    // lastUpdate: { type: Schema.slack.types.date },
    // refCount: { type: Schema.types.integer },
  },
});

export default GlossaryDataStore;
