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

  let uri = process.env.NEXT_PUBLIC_DEV_GRAPHQL_URL;

  if (env === "production") {
    uri = process.env.NEXT_PUBLIC_PROD_GRAPHQL_URL;
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
