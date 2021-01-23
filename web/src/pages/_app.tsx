import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { createClient, dedupExchange, fetchExchange, Provider } from "urql";
import theme from "../theme";
import { cacheExchange, QueryInput, Cache } from "@urql/exchange-graphcache";
import {
  LoginMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
} from "../generated/graphql";

// This is here so our cacheExchange is better typed
function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}

const client = createClient({
  url: "http://localhost:4000/graphql",

  fetchOptions: {
    // This wil send the cookie. We will need this for getting the cookie when we register or login
    credentials: "include",
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        // All this will basically run update the cache at the right time => specifically the MeQuery
        // Alternatively we can skip updating the cache altogether and invalidate the MeQuery
        Mutation: {
          login: (_result, args, cache, info) => {
            betterUpdateQuery<LoginMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                // if the result of our login query is an error then we are going to return the current query
                if (result.login.errors) {
                  return query;
                } else {
                  // Otherwise we are going to update our me query
                  return {
                    me: result.login.user,
                  };
                }
              }
            );
          },
          register: (_result, args, cache, info) => {
            betterUpdateQuery<RegisterMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,
              (result, query) => {
                // if the result of our login query is an error then we are going to return the current query
                if (result.register.errors) {
                  return query;
                } else {
                  // Otherwise we are going to update our me query
                  return {
                    me: result.register.user,
                  };
                }
              }
            );
          },
        },
      },
    }),
    fetchExchange,
  ],
  // We want todo a custom exchange
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <ChakraProvider resetCSS theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
