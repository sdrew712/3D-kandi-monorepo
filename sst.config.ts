import { SSTConfig } from "sst";
import { KandiTable } from "./stacks/KandiTable";
import { GraphQL } from "./stacks/GraphQL";

export default {
  config(_input) {
    return {
      name: "3d-kandi-site-monorepo",
      region: "us-west-2",
    };
  },
  stacks(app) {
    app.stack(KandiTable);
    app.stack(GraphQL);
  },
} satisfies SSTConfig;
