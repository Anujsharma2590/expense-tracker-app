import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-paper";

const FormInput = (props) => {
  const { placeholder, error, icon } = props;
  return (
    <>
      <View style={styles.container}>
        {error ? (
          <Text style={styles.errorText}>
            {error}
          </Text>
        ) : null}
      </View>
      <TextInput
        mode="outlined"
        {...props}
        placeholder={placeholder}
        style={styles.input}
        left={<TextInput.Icon icon={icon} />}
      />
    </>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 0,
  },
});
