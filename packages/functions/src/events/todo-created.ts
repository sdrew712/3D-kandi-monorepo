import { EventHandler } from "sst/node/event-bus";
import { Todo } from "@3d-kandi-site-monorepo/core/todo";

export const handler = EventHandler(Todo.Events.Created, async (evt) => {
  console.log("Todo created", evt);
});
