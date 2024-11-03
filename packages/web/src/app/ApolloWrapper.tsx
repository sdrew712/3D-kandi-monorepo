"use client";

import { HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import { useAuth } from "@/utils/useAuth";

function makeClient() {
  const env = process.env.NODE_ENV;

  let uri = "https://ykpfkfot1d.execute-api.us-west-2.amazonaws.com";
  if (env === "production") {
    uri = "https://5kkazk3271.execute-api.us-west-2.amazonaws.com";
  }

  const httpLink = new HttpLink({
    uri: uri + "/graphql",
    fetchOptions: { cache: "no-store" },
  });

  const { authToken } = useAuth();

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
    headers: {
      authorization: `Bearer ${authToken}`,
    },
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
