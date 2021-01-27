import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../../components/InputField";
import { Wrapper } from "../../components/Wrapper";
import { useChangePasswordMutation } from "../../generated/graphql";
import { toErrorMap } from "../../utils/toErrorMap";

export const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const router = useRouter();
  const [, changePassword] = useChangePasswordMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          // we will get the token from the browser and the new password form the form and send it to the server with a mutation

          const response = await changePassword({
            newPassword: values.newPassword,
            token,
          });

          if (response.data?.changePassword.errors) {
            setErrors(toErrorMap(response.data?.changePassword.errors));
          } else if (response.data?.changePassword.user) {
            router.push("/");
          }
        }}>
        {({ values, handleChange, isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              placeholder="New Password "
              label="New Password"
              type="password"
            />
            <Box mt={4}>
              <Button
                mt={4}
                colorScheme="teal"
                type="submit"
                isLoading={isSubmitting}>
                change password
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

ChangePassword.getInitialProps = ({ query }) => {
  // Special functions from next.js allows us to get any query parameters and pass to other components

  return {
    token: query.token as string,
  };
};

export default ChangePassword;
