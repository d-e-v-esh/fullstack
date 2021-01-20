import { ChakraProvider } from "@chakra-ui/react";
import { createClient, Provider } from "urql";
const client = createClient({
  url: "http://localhost:4000/graphql",
  fetchOptions: {
    // This wil send the cookie. We will need this for getting the cookie when we register or login
    credentials: "include",
  },
});

import theme from "../theme";
import { AppProps } from "next/app";

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
