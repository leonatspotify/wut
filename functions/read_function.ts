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
    const response = await client.apps.datastore.query<typeof GlossaryDataStore.definition>({
      datastore: "glossary",
      expression: "#word = :word",
      expression_attributes: { "#word": "word" },
      expression_values: { ":word": inputs.word }
    });

    console.log(response);

    if (!response.ok) {
      const error = `Failed to get a row in datastore: ${response.error}`;
      return { error };
    }

    var definition = inputs.word + ":";

    for (let i = 0; i < response.items.length; i++) {

      console.log(response.items[i]);

      definition += `\n - ${response.items[i].definition}`
    };

    // if (response.items.length != 0) {
    //   definition = inputs.word + ": " + response.items[0].definition;
    // }

    return {
      outputs: { definition }
    }
  },
);