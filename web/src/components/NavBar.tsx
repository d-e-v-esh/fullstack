import { Box, Button, Flex, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
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
