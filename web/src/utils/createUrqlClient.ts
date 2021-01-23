import { dedupExchange, fetchExchange } from "urql";
import {
  LogoutMutation,
  MeQuery,
  MeDocument,
  LoginMutation,
  RegisterMutation,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";

import { cacheExchange } from "@urql/exchange-graphcache";

export const createUrqlClient = (ssrExchange: any) => ({
  url: "http://localhost:4000/graphql",

  fetchOptions: {
    // This wil send the cookie. We will need this for getting the cookie when we register or login
    credentials: "include" as const,
  },
  exchanges: [
    dedupExchange,
    cacheExchange({
      updates: {
        // All this will basically run update the cache at the right time => specifically the MeQuery
        // Alternatively we can skip updating the cache altogether and invalidate the MeQuery
        Mutation: {
          // Setting me value to null
          logout: (_result, args, cache, info) => {
            betterUpdateQuery<LogoutMutation, MeQuery>(
              cache,
              { query: MeDocument },
              _result,

              () => ({ me: null })
            );
          },
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
    ssrExchange,
    fetchExchange,
  ],
  // We want todo a custom exchange
});
