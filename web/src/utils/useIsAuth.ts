import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";
import { useRouter } from "next/router";

export const useIsAuth = () => {
  const router = useRouter();
  const [{ data, fetching }] = useMeQuery();

  useEffect(() => {
    // When we are not loading and we don't have a user => we go to the login page
    if (!fetching && !data?.me) {
      router.replace("/login?next=" + router.pathname);
      // we are telling the login page where it should go after we have logged in and we are setting the "next" field 
      // we do this so that the user routes back to the page after logging in where he was before
    }
  }, [data, router, fetching]);
};
