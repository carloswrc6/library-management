import AuthForm from "@/components/AuthForm";
import { signInWithCredentials } from "@/lib/actions/auth";
import { signUpSchema } from "@/lib/validations";
import React from "react";

const page = () => {
  return (
    <AuthForm
      type="SIGN_IN"
      schema={signUpSchema}
      defaultValues={{ email: "", password: "" }}
      onSubmit={signInWithCredentials}
    ></AuthForm>
  );
};

export default page;
