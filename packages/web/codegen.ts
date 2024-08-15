import { CodegenConfig } from "@graphql-codegen/cli";

//todo: manage envs properly
// https://docs.sst.dev/config#define-a-secret
const SCHEMA_URL = "http://localhost:4000";

const config: CodegenConfig = {
  schema: SCHEMA_URL,
  documents: ["src/**/*.tsx"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
