import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { InsertIntoDatastorefunctionDefinition } from "../functions/insert_function.ts";

const InsertWorkflow = DefineWorkflow({
  callback_id: "insert_workflow",
  title: "insert workflow",
  description: "A read workflow",
  input_parameters: {
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
      channelId: {
        type: Schema.slack.types.channel_id,
      },
      user: {
        type: Schema.slack.types.user_id,
      },
    },
    required: ["user", "interactivity"],
  },
});

const inputForm = InsertWorkflow.addStep(
  Schema.slack.functions.OpenForm, {
  title: "Contribute",
  interactivity: InsertWorkflow.inputs.interactivity,
  submit_label: "next",
  fields: {
    elements: [
      {
        name: "word",
        title: "word",
        type: Schema.types.string,
        long: false,
      },
      {
        name: "definition",
        title: "definition",
        type: Schema.types.string,
        long: true,
      }
    ],
    required: ["word", "definition"],
  },
},
);

InsertWorkflow.addStep(InsertIntoDatastorefunctionDefinition, {
  word: inputForm.outputs.fields.word,
  definition: inputForm.outputs.fields.definition,
  contributor: InsertWorkflow.inputs.user,
});

InsertWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: InsertWorkflow.inputs.channelId,
  message: inputForm.outputs.fields.word + " added. Thank you for your contribution!",
});

export default InsertWorkflow;