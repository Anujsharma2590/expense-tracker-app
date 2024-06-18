import React, { useState } from "react";
import { View, StyleSheet, Alert, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";
import client from "../api/client";
import * as SecureStore from "expo-secure-store";
import CustomButton from "./ui/CustomButton";

import { formatDate } from "../utils/methods";
import { useTransactions } from "../api/TransactionContext";
import { useLogin } from "../context/LoginProvider";

const TransactionInput = (props) => {
  const { profile } = useLogin();
  const value = props.type === "income" ? "bonus" : "utils";

  const { fetchTransactions } = useTransactions();

  const [values, setValues] = useState({
    heading: value,
    amount: "",
    date: new Date(),
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const toggleDatePicker = () => {
    setShowDatePicker((prev) => !prev);
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
    setValues({ ...values, date: currentDate });
  };

  const submitTransaction = async () => {
    try {
      const formattedDate = formatDate(values.date);
      const transactionValues = { ...values, date: formattedDate };

      if (props.type === "income") {
        await submitIncome(transactionValues);
      } else {
        await submitExpense(transactionValues);
      }
    } catch (error) {
      console.error("Error submitting transaction:", error);
    }
  };

  const submitIncome = async (values) => {
    try {
      const token = await SecureStore.getItemAsync("userToken");
      if (!token) {
        return;
      }
      const userId = profile.id;
      const response = await client.post(`/income?userId=${userId}`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response) {
        Alert.alert(
          "Success!",
          `${response.data.message}`,
          [
            {
              text: "OK",
            },
          ],
          { cancelable: false }
        );
        fetchTransactions();
        setValues({ heading: value, amount: "", date: new Date() });
      } else {
        console.error("Error fetching transactions:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const submitExpense = async (values) => {
    try {
      const token = await SecureStore.getItemAsync("userToken");
      if (!token) {
        return;
      }
      const userId = profile.id;
      const response = await client.post(`/expense?userId=${userId}`, values, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response) {
        Alert.alert(
          "Success!",
          `${response.data.message}`,
          [
            {
              text: "OK",
            },
          ],
          { cancelable: false }
        );
        fetchTransactions();
        setValues({ heading: value, amount: "", date: new Date() });
      } else {
        console.error("Error fetching transactions:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Picker
            selectedValue={values.heading}
            onValueChange={(itemValue) => handleChange("heading", itemValue)}
            style={styles.picker}
          >
            {props.dropdownData.map((item, index) => (
              <Picker.Item key={index} label={item.label} value={item.value} />
            ))}
          </Picker>
        </View>

        <TextInput
          mode="outlined"
          placeholder="Amount"
          label="Amount"
          style={styles.input}
          keyboardType="numeric"
          onChangeText={(text) => handleChange("amount", text)}
          value={values.amount}
          left={<TextInput.Icon icon="currency-usd" />}
        />

        <TextInput
          mode="outlined"
          placeholder="Date"
          label="Date"
          style={styles.input}
          value={values.date.toLocaleDateString()}
          left={<TextInput.Icon icon="calendar" />}
        />

        <View style={styles.datePickerContainer}>
          <CustomButton
            onPress={toggleDatePicker}
            title="Select Date"
            disabled={false}
            icon={"calendar"}
          />
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="calendar"
              onChange={onChangeDate}
            />
          )}
        </View>
        <View style={styles.addBtnContainer}>
          <CustomButton
            onPress={submitTransaction}
            title="ADD"
            icon="plus"
            disabled={!values.amount}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  inputContainer: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    overflow: "hidden",
    marginTop: 10,
  },
  input: {
    backgroundColor: "#ffffff",
    marginBottom: 10,
  },
  picker: {
    width: "100%",
    backgroundColor: "#ffffff",
  },
  datePickerContainer: {
    marginBottom: 10,
  },
  selectDateButton: {
    backgroundColor: "#007AFF", // Adjust the color to your preference
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  selectDateButtonText: {
    color: "#FFFFFF", // Adjust the color to your preference
    fontWeight: "bold",
  },
  formContainer: {
    flexDirection: "column",
    gap: 10,
  },
  addBtnContainer: {
    marginTop: 30,
  },
});

export default TransactionInput;
