import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { Wrapper } from "../components/Wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const ForgotPassword: React.FC<{}> = ({}) => {
  const [, forgotPassword] = useForgotPasswordMutation();
  const [complete, setComplete] = useState(false);
  return (
    <div>
      <Wrapper variant="small">
        <Formik
          initialValues={{ email: "" }}
          onSubmit={async (values) => {
            const response = await forgotPassword(values);
            setComplete(true);
          }}>
          {({ isSubmitting }) =>
            complete ? (
              <Box>
                if an email with that account exists then we sent you an email
              </Box>
            ) : (
              <Form>
                <InputField
                  name="email"
                  placeholder="email"
                  label="email"
                  type="email"
                />
                <Button
                  mt={4}
                  colorScheme="teal"
                  type="submit"
                  isLoading={isSubmitting}>
                  login
                </Button>
              </Form>
            )
          }
        </Formik>
      </Wrapper>
    </div>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
