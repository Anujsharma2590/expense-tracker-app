import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

const FormSubmitButton = ({ title, onPress, submitting }) => {
  const backgroundColor = submitting
    ? "rgba(27,27,51,0.4)"
    : "rgba(27,27,51,1)";
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, { backgroundColor }]}
    >
      <Text style={styles.submit}>
        {title}
        {"  "}
        <Icon name="arrow-right" size={15} color="#fff" />
      </Text>
    </TouchableOpacity>
  );
};

export default FormSubmitButton;

const styles = StyleSheet.create({
  container: {
    height: 45,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  submit: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
});
