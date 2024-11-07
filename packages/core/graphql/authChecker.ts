import { AuthChecker } from "type-graphql";
import { Context } from "./types/context.type";

export const customAuthChecker: AuthChecker<Context> = (
  { root, args, context, info },
  roles
) => {
  const userId = context.userId;

  return Boolean(userId);
};
