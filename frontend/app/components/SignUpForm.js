import React from "react";
import FormContainer from "./FormContainer";
import { Alert } from "react-native";
import FormInput from "./FormInput";
import FormSubmitButton from "./FormSubmitButton";
import { Formik } from "formik";
import * as yup from "yup";
import client from "../api/client";

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(3, "Invalid name!")
    .required("Name is required!"),
  email: yup.string().email("Invalid email!").required("Email is required!"),
  password: yup
    .string()
    .trim()
    .min(8, "Password is too short!")
    .required("Password is required!"),
});
export default function SignupForm({ handleNavigationChange }) {
  const signUp = async (values, formikActions) => {
    try {
      const res = await client.post("/register", values);
      if (res.data.success) {
        Alert.alert("Success", res.data.message);
        handleNavigationChange();
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        Alert.alert(
          "Error",
          "Email already exists. Please use a different email."
        );
      } else {
        Alert.alert("Error", "Failed to sign up. Please try again later.");
      }
    } finally {
      formikActions.resetForm();
      formikActions.setSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <Formik
        initialValues={{ name: "", email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={signUp}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <>
            <FormInput
              placeholder="Rahul Goyal"
              label="Name"
              value={values.name}
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              error={touched.name && errors.name}
              icon="account"
            />
            <FormInput
              placeholder="example@gmail.com"
              label="Email"
              value={values.email}
              error={touched.email && errors.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              autoCapitalize="none"
              icon="email"
            />
            <FormInput
              placeholder="********"
              label="Password"
              value={values.password}
              error={touched.password && errors.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              autoCapitalize="none"
              secureTextEntry
              icon="lock"
            />
            <FormSubmitButton
              title="Sign up"
              submitting={isSubmitting}
              onPress={handleSubmit}
            />
          </>
        )}
      </Formik>
    </FormContainer>
  );
}
