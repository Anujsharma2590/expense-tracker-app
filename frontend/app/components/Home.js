import React, { useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Card from "./ui/Card";
import List from "./ui/List";
import { useNavigation } from "@react-navigation/native";
import Entypo from "@expo/vector-icons/Entypo";
import { useTransactions } from "../api/TransactionContext";

const getMoneyTextStyle = (value) => ({
  fontWeight: "bold",
  fontSize: 30,
  color: value < 0 ? "#ff4500" : "#2e8b57", // Red for negative, custom green for positive
});

const formatMoney = (value) => {
  const absValue = Math.abs(value).toFixed(2);
  return `${value < 0 ? "-" : ""}$${absValue}`;
};

const Home = () => {
  const navigation = useNavigation();

  const { transactions, fetchTransactions } = useTransactions();

  useEffect(() => {
    fetchTransactions();
  }, []);


  const handleSeeAllPress = () => {
    // Navigate to the transactions screen
    navigation.navigate("Transactions");
  };
  return (
    <View style={styles.container}>
      <Card style={{ marginHorizontal: 30, marginVertical: 20 }}>
        <View style={styles.row}>
          <Text style={styles.label}>Total Balance</Text>
          <Text style={getMoneyTextStyle(transactions?.totalBalance)}>
            {formatMoney(transactions?.totalBalance)}
          </Text>
        </View>

        <View style={styles.separator} />

        {/* Total Expenses and Savings */}
        <View style={{ flexDirection: "row" }}>
          <View style={styles.item}>
            <View style={styles.labelContainer}>
              <Entypo name="arrow-with-circle-up" size={14} color="#2e8b57" />
              <Text style={[styles.label, styles.labelGreen]}>Income</Text>
            </View>
            <Text style={styles.incomeLabel}>
              {formatMoney(transactions?.income)}
            </Text>
          </View>

          {/* Separator */}
          <View style={styles.separatorVertical} />

          {/* Total Expenses */}
          <View style={styles.item}>
            <View style={styles.labelContainer}>
              <Entypo name="arrow-with-circle-down" size={14} color="#ff4500" />
              <Text style={[styles.label, styles.labelRed]}>Expense</Text>
            </View>
            <Text style={styles.expenseLabel}>
              {formatMoney(transactions?.expense)}
            </Text>
          </View>
        </View>
      </Card>

      {/* Transactions Heading */}
      <View style={styles.transactionHeading}>
        <Text style={styles.transactionTextHeading}>Transactions</Text>
        <TouchableOpacity onPress={handleSeeAllPress}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <List data={transactions?.transactions} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  expenseLabel: {
    fontSize: 22,
    fontWeight: "bold",
  },
  incomeLabel: {
    fontSize: 22,
    fontWeight: "bold",
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },
  labelGreen: {
    color: "#2e8b57",
  },
  labelRed: {
    color: "#ff4500",
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  separatorVertical: {
    borderLeftWidth: 1,
    borderLeftColor: "lightgrey",
  },
  item: {
    flex: 1,
    alignItems: "center",
    marginVertical: 20,
  },
  transactionHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 20,
    marginHorizontal: 15,
  },
  transactionTextHeading: {
    fontSize: 20,
    fontWeight: "500",
  },
  seeAll: {
    fontSize: 16,
    color: "grey",
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  transactionList: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  transactionText: {
    fontSize: 16,
    marginVertical: 50,
  },
});

export default Home;
