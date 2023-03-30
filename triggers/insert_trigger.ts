import { Trigger } from "deno-slack-api/types.ts";
import InsertWorkflow from "../workflows/insert_workflow.ts";

const insert_trigger: Trigger<typeof InsertWorkflow.definition> = {
  type: "shortcut",
  name: "add definition",
  // description: "Add a definition",
  workflow: "#/workflows/insert_workflow",
  inputs: {
    interactivity: {
      value: "{{data.interactivity}}",
    },
    channelId: {
      value: "{{data.channel_id}}",
    },
    user: {
      value: "{{data.user_id}}",
    },
  },
};


export default insert_trigger;