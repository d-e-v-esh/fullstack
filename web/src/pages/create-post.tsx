import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React, { useEffect } from "react";
import { InputField } from "../components/InputField";
import { useCreatePostMutation, useMeQuery } from "../generated/graphql";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";
import { useIsAuth } from "../utils/useIsAuth";

const CreatePost: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [, createPost] = useCreatePostMutation();
  useIsAuth();
  return (
    <Layout variant="small">
      <Formik
        // A real application would have validation on every single post
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values) => {
          // console.log(values);
          const { error } = await createPost({ input: values });
          // If there are no errors then we go to the home route
          // Global handler will handle if there are errors
          if (!error) {
            router.push("/");
          }
        }}>
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" placeholder="title" label="Title" />
            <Box mt={4}>
              <InputField
                textarea
                name="text"
                placeholder="text"
                label="Body"
              />
              <Button
                mt={4}
                colorScheme="teal"
                type="submit"
                isLoading={isSubmitting}>
                create post
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
