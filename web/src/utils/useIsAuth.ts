import { useEffect } from "react";
import { useMeQuery } from "../generated/graphql";
import { useRouter } from "next/router";

export const useIsAuth = () => {
  const router = useRouter();
  const [{ data, fetching }] = useMeQuery();

  useEffect(() => {
    // When we are not loading and we don't have a user => we go to the login page
    if (!fetching && !data?.me) {
      router.replace("/login");
    }
  }, [data, router, fetching]);
};
