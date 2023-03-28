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
    title: "get word",
    interactivity: ReadWorkflow.inputs.interactivity,
    submit_label: "wooooord",
    fields: {
      elements: [{
        name: "channel",
        title: "Channel to send message to",
        type: Schema.slack.types.channel_id,
        default: ReadWorkflow.inputs.channel,
      }, {
        name: "word",
        title: "word",
        type: Schema.types.string,
        long: true,
      }],
      required: ["channel", "word"],
    },
  },
);

const retrieveDefinition = ReadWorkflow.addStep(ReadDatastorefunctionDefinition, {
  word: inputForm.outputs.fields.word,
});

ReadWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: inputForm.outputs.fields.channel,
  message: retrieveDefinition.outputs.definition,
});

export default ReadWorkflow;
