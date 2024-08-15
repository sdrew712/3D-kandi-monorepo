import { SSTConfig } from "sst";
import { PatternsTable } from "./stacks/PatternsTable";

export default {
  config(_input) {
    return {
      name: "3d-kandi-site-monorepo",
      region: "us-west-2",
    };
  },
  stacks(app) {
    app.stack(PatternsTable);
  },
} satisfies SSTConfig;
