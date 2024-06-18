import React from "react";
import { Text, StyleSheet, Alert } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import client from "../api/client";
import FormContainer from "./FormContainer";
import FormInput from "./FormInput";
import FormSubmitButton from "./FormSubmitButton";
import { useLogin } from "../context/LoginProvider";


const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm = () => {
  const { login } = useLogin();

  const handleLogin = async (values, { setSubmitting, setErrors }) => {
    try {
      const res = await client.post("/login", values);
      
      if (res.data.success) {
        login(res.data);
      } else {
        Alert.alert("Error", res.data.message);
      }
    } catch (error) {
      setErrors({ general: "An error occurred. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={handleLogin}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isSubmitting,
          touched,
        }) => (
          <>
            {errors.general && (
              <Text style={styles.errorText}>{errors.general}</Text>
            )}
            <FormInput
              value={values.email}
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              label="Email"
              placeholder="example@email.com"
              autoCapitalize="none"
              error={touched.email && errors.email}
              icon="email"
            />
            <FormInput
              value={values.password}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              label="Password"
              placeholder="********"
              autoCapitalize="none"
              secureTextEntry
              error={touched.password && errors.password}
              icon="lock"
            />
            <FormSubmitButton
              onPress={handleSubmit}
              title="Login"
              submitting={isSubmitting}
            />
          </>
        )}
      </Formik>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
  },
});

export default LoginForm;
