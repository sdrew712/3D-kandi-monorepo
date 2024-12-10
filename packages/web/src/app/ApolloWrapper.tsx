"use client";

import { HttpLink } from "@apollo/client";
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import { useAuth } from "@/utils/useAuth";

function makeClient({ authToken }: { authToken: string | null }) {
  const env = process.env.NODE_ENV;

  let uri = "https://ykpfkfot1d.execute-api.us-west-2.amazonaws.com";
  if (env === "production") {
    uri = "https://5kkazk3271.execute-api.us-west-2.amazonaws.com";
  }

  const authLink = new HttpLink({
    uri: uri + "/graphql",
    fetchOptions: { cache: "no-store" },
    headers: {
      authorization: authToken ? `Bearer ${authToken}` : "",
    },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink,
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  const { authToken, loading } = useAuth();

  if (loading) return null;

  return (
    <ApolloNextAppProvider makeClient={() => makeClient({ authToken })}>
      {children}
    </ApolloNextAppProvider>
  );
}
