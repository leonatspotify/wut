import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
import GlossaryDataStore from "../datastores/glossary_datastore.ts";

export const InsertIntoDatastorefunctionDefinition = DefineFunction({
  callback_id: "insert_row",
  title: "Insert into datastore",
  description: "Add word and definition",
  source_file: "functions/insert_function.ts",
  input_parameters: {
    properties: {
      word: {
        type: Schema.types.string,
        description: "The word",
      },
      definition: {
        type: Schema.types.string,
        description: "Definitions of the word. Could contain multiple values",
      },
      contributor: {
        type: Schema.slack.types.user_id,
        description: "Contributor(s)",
      },
      lastUpdate: {
        type: Schema.slack.types.date,
        description: "Last updated date",
      },
      refCount: {
        type: Schema.types.integer,
        description: "Reference count",
      },
    },
    required: ["word", "definition"],
  },
});

export default SlackFunction(InsertIntoDatastorefunctionDefinition,
  async ({ inputs, client }) => {
    const response = await client.apps.datastore.put<typeof GlossaryDataStore.definition>({
      datastore: "glossary",
      item: {
        id: crypto.randomUUID(),
        word: inputs.word,
        definition: inputs.definition,
        contributor: inputs.contributor,
        lastUpdate: new Date().toLocaleString().split(',')[0],
      },
    });

    if (!response.ok) {
      console.log(`Failed to save a row in datastore: ${response.error}`);
      const error = `Failed to save a row in datastore: ${response.error}`;
      return { error };
    } else {
      console.log(`A new row saved: ${response.item}`);
      return { outputs: {} };
    }
  },
);