import { DefineFunction, Schema, SlackFunction } from "deno-slack-sdk/mod.ts";
import GlossaryDataStore from "../datastores/glossary_datastore.ts";

export const ReadDatastorefunctionDefinition = DefineFunction({
  callback_id: "read_datastore",
  title: "Read from datastore",
  description: "Get definition of a word from ds",
  source_file: "functions/read_function.ts",
  input_parameters: {
    properties: {
      word: {
        type: Schema.types.string,
        description: "The word",
      },
    },
    required: ["word"],
  },
  output_parameters: {
    properties: {
      definition: {
        type: Schema.types.string,
        description: "definition of the word",
      },
    },
    required: ["definition"],
  },
});

export default SlackFunction(ReadDatastorefunctionDefinition,
  async ({ inputs, client }) => {
    // cost load = {

    // }
    const response = await client.apps.datastore.query<typeof GlossaryDataStore.definition>({
      datastore: "glossary",
      expression: "#word = :word",
      expression_attributes: { "#word": "word" },
      expression_values: { ":word": inputs.word }
    });

    if (!response.ok) {
      const error = `Failed to get a row in datastore: ${response.error}`;
      return { error };
    }

    const definition = response.item.definition ?? "undefined";

    return {
      outputs: { definition }
    }
  },
);