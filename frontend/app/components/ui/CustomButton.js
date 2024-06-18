import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";

const CustomButton = ({ title, onPress, icon, disabled }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        { backgroundColor: disabled ? "rgba(27,27,51,0.5)" : "rgba(27,27,51,1)" },
        disabled && styles.disabled
      ]}
      disabled={disabled}
    >
      <View style={styles.buttonContent}>
        <Text style={styles.submit}>{title}</Text>
        {icon && <Icon name={icon} size={16} color="#fff" style={styles.icon} />}
      </View>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
  },
  icon: {
    marginLeft: 6, 
  },
  submit: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  disabled: {
    opacity: 0.5, 
  }
});
