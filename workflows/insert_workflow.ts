import { DefineWorkflow, Schema } from "deno-slack-sdk/mod.ts";
import { InsertIntoDatastorefunctionDefinition } from "../functions/insert_function.ts";

const InsertWorkflow = DefineWorkflow({
  callback_id: "insert_workflow",
  title: "insert workflow",
  description: "A read workflow",
  input_parameters: {
    properties: {
      channelId: {
        type: Schema.slack.types.channel_id,
      },
      user: {
        type: Schema.slack.types.user_id,
      },

    },
    required: [],
  },
});

const InsertRow = InsertWorkflow.addStep(InsertIntoDatastorefunctionDefinition, {
  word: "huh",
  definition: "happy ugly horse",
});

const ConfirmResult = InsertWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: InsertWorkflow.inputs.channelId,
  message: "inserting message",
});

export default InsertWorkflow;