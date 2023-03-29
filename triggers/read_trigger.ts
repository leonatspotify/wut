import { Trigger } from "deno-slack-api/types.ts";
import ReadWorkflow from "../workflows/read_workflow.ts";

const readTrigger: Trigger<typeof ReadWorkflow.definition> = {
  type: "shortcut",
  name: "Read trigger",
  description: "A read trigger",
  workflow: "#/workflows/read_workflow",
  inputs: {
    interactivity: {
      value: "{{data.interactivity}}",
    },
    channel: {
      value: "{{data.channel_id}}",
    },
    user: {
      value: "{{data.user_id}}",
    },
  },
};

export default readTrigger;
