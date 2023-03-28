import { Manifest } from "deno-slack-sdk/mod.ts";
import SampleWorkflow from "./workflows/sample_workflow.ts";
import InsertWorkflow from "./workflows/insert_workflow.ts";
import ReadWorkflow from "./workflows/read_workflow.ts";

import GlossaryDataStore from "./datastores/glossary_datastore.ts";

export default Manifest({
  name: "wut",
  description: "Wut is it",
  icon: "assets/default_new_app_icon.png",
  workflows: [SampleWorkflow, InsertWorkflow, ReadWorkflow],
  outgoingDomains: [],
  datastores: [GlossaryDataStore],
  botScopes: [
    "commands",
    "chat:write",
    "chat:write.public",
    "datastore:read",
    "datastore:write",
  ],
});
