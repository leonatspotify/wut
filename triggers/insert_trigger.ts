import { Trigger } from "deno-slack-api/types.ts";
import InsertWorkflow from "../workflows/insert_workflow.ts";

const insert_trigger: Trigger<typeof InsertWorkflow.definition> = {
  type: "shortcut",
  name: "insert a row",
  description: "Insert a word and definitiion",
  workflow: "#/workflows/insert_workflow",
  inputs: {
    channelId: {
      value: "{{data.channel_id}}",
    },
    user: {
      value: "{{data.user_id}}",
    },
  },
};


export default insert_trigger;