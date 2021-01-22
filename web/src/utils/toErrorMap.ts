// This takes our error messages form backend and converts them into the format that formik setError() takes

import { FieldError } from "../generated/graphql";

export const toErrorMap = (errors: FieldError[]) => {
  const errorMap: Record<string, string> = {};
  errors.forEach(({ field, message }) => {
    errorMap[field] = message;
  });
  return errorMap;
};

// setErrors expects an object with a key value pair like this
// setErrors({username: "error here"});
// the response we are getting form the backend => [{field: "username", message: "something wrong"}]
