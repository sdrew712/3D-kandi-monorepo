import { StackContext, Table } from "sst/constructs";

export function KandiTable({ stack }: StackContext) {
  const table = new Table(stack, "KandiTable", {
    fields: {
      pk: "string",
      sk: "string",
    },
    primaryIndex: { partitionKey: "pk", sortKey: "sk" },
  });

  return {
    table,
  };
}
