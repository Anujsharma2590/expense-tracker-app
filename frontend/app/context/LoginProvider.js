import React, { createContext, useContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadUserData = async () => {
    try {
      const userToken = await SecureStore.getItemAsync("userToken");
      const userProfile = await SecureStore.getItemAsync("userProfile");
      if (userToken && userProfile) {
        setIsLoggedIn(true);
        setProfile(JSON.parse(userProfile));
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const login = async (userData) => {
    try {
      const { token, profileData } = userData;
      await SecureStore.setItemAsync("userToken", token);
      await SecureStore.setItemAsync(
        "userProfile",
        JSON.stringify(profileData)
      );
      setIsLoggedIn(true);
      setProfile(profileData);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync("userToken");
      await SecureStore.deleteItemAsync("userProfile");
      setIsLoggedIn(false);
      setProfile(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <LoginContext.Provider value={{ isLoggedIn, login, logout, profile }}>
      {isLoading ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        children
      )}
    </LoginContext.Provider>
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

export const useLogin = () => useContext(LoginContext);

export default LoginProvider;
