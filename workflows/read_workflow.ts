import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { ReadDatastorefunctionDefinition } from "../functions/read_function.ts";

const ReadWorkflow = DefineWorkflow({
  callback_id: "read_workflow",
  title: "Read workflow",
  description: "A read workflow",
  input_parameters: {
    properties: {
      interactivity: {
        type: Schema.slack.types.interactivity,
      },
      channel: {
        type: Schema.slack.types.channel_id,
      },
      user: {
        type: Schema.slack.types.user_id,
      },
    },
    required: ["user", "interactivity"],
  },
});

const inputForm = ReadWorkflow.addStep(
  Schema.slack.functions.OpenForm,
  {
    title: "wut is it",
    interactivity: ReadWorkflow.inputs.interactivity,
    submit_label: "wut",
    fields: {
      elements: [
        {
          name: "word",
          title: "word",
          type: Schema.types.string,
          long: false,
        }],
      required: ["word"],
    },
  },
);

const retrieveDefinition = ReadWorkflow.addStep(ReadDatastorefunctionDefinition, {
  word: inputForm.outputs.fields.word,
});

ReadWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: ReadWorkflow.inputs.channel,
  message: retrieveDefinition.outputs.definition,
});

export default ReadWorkflow;
