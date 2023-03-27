import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
import { GlossaryDataStore } from "../datastores/glossary.ts";

export const InsertIntoDatastorefunctionDefinition = DefineFunction({
  callback_id: "inser_into_datastore",
  title: "Insert into datastore",
  description: "Add word and definition",
  source_file: "functions.reader.ts",
  input_parameters: {
    properties: {
      word: {
        type: Schema.types.string,
        description: "The word",
      },
      definition: {
        type: Schema.types.array,
        description: "Definitions of the word. Could contain multiple values",
      },
      // contributor: {
      //   type: Schema.slack.types.user_id,
      //   description: "Contributor(s)",
      // },
      // lastUpdate: {
      //   type: Schema.slack.types.date,
      //   description: "Last updated date",
      // },
    },
    required: ["word"],
  },
});

export default SlackFunction(InsertIntoDatastorefunctionDefinition,
  async ({ inputs, client }) => {
    const contributor = "Leon Liang";
    const response = await client.apps.datastore.put({
      datastore: "glossary",
      item: {
        word: inputs.word,
        definition: inputs.definition,
        contributor: "Leon Liang",
        // lastUpdate: 
      },
    });

    if (!response.ok) {
      const error = `Failed to save a row in datastore: ${response.error}`;
      return { error };
    } else {
      console.log(`A new row saved: ${response.item}`);
      return { outputs: {} };
    }
  },
);