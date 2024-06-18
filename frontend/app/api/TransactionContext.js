import React, { createContext, useState, useContext, useEffect } from "react";
import client from "./client";
import * as SecureStore from "expo-secure-store";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const TransactionsContext = createContext();

export const TransactionsProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchTransactions = async () => {
    try {
      const token = await SecureStore.getItemAsync("userToken");
      const profileString = await SecureStore.getItemAsync("userProfile");
      const profile = profileString ? JSON.parse(profileString) : null;
      const userId = profile ? profile.id : null;
      if (!token || !userId) {
        setIsLoading(false);
        return;
      }
      const response = await client.get(`/transactions?userId=${userId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response) {
        setTransactions(response.data);
      } else {
        console.error("Error fetching transactions:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions }}>
      {isLoading ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        children
      )}
    </TransactionsContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export const useTransactions = () => useContext(TransactionsContext);
