import { StackContext, Table } from "sst/constructs";

export function PatternsTable({ stack }: StackContext) {
  const table = new Table(stack, "PatternsTable", {
    fields: {
      userId: "string",
      patternId: "string",
      planes: "string",
    },
    primaryIndex: { partitionKey: "userId", sortKey: "patternId" },
  });

  return {
    table,
  };
}
