import AuthForm from "@/components/AuthForm";
import { signUpSchema } from "@/lib/validations";
import React from "react";

const page = () => {
  return (
    <AuthForm
      type="SIGN_IN"
      schema={signUpSchema}
      defaultValues={{ email: "", password: "" }}
      // onSubmit={() => {}}
    ></AuthForm>
  );
};

export default page;
