import { Box, Button, Flex, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery({
    // we don't want to make an extra query every time a page is SSR, we don't want that
    // this query results in null as the cookie is in our browser till now
    // by doing this we are pausing making of this query on a SSR page.

    pause: isServer(),
  });
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  let body = null;
  if (fetching) {
    // data is loading and body will be null
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>Login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>Register</Link>
        </NextLink>
      </>
    );
    // user not logged in
  } else {
    body = (
      <Flex>
        <Box mr={2}>{data.me.username}</Box>

        <Button
          onClick={() => {
            logout();
          }}
          variant="link"
          isLoading={logoutFetching}>
          logout
        </Button>
      </Flex>
    );
  }

  // user is logged in

  return (
    <Flex bg="tomato" p={4} ml={"auto"}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};
