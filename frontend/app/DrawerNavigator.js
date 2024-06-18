import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import Home from "./components/Home";
import Transactions from "./components/Transactions";
import AddExpenceIncome from "./components/AddExpenceIncome";
import { useLogin } from "./context/LoginProvider";
import CustomButton from "./components/ui/CustomButton";

const About = () => {
  return (
    <View style={styles.aboutContainer}>
      <Image
        source={require("../assets/icon.jpeg")}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.aboutTitle}>About Expense Tracker</Text>
      <Text style={styles.aboutText}>
        Welcome to Expense Tracker, your personal finance manager. This app
        allows you to effortlessly track your income and expenses, view detailed
        transaction histories, and gain insights into your spending habits.
      </Text>
      <Text style={styles.aboutText}>
        Our goal is to help you manage your finances better, providing tools to
        keep your budget on track and ensuring you are always aware of your
        financial situation.
      </Text>
      <Text style={styles.aboutText}>
        Start managing your finances better today!
      </Text>
    </View>
  );
};

const Drawer = createDrawerNavigator();

const CustomDrawer = (props) => {
  const { profile, logout } = useLogin();

  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props}>
        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: "https://png.pngtree.com/png-clipart/20210311/original/pngtree-cute-boy-cartoon-mascot-logo-png-image_6059924.jpg",
            }}
            style={styles.profileImage}
          />
          <View style={styles.profileDetails}>
            <Text style={styles.profileName}>{profile?.name || ""}</Text>
            <Text style={styles.profileEmail}>{profile?.email || ""}</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={styles.logoutButtonContainer}>
        <CustomButton
          onPress={logout}
          title="Log Out"
          icon="sign-out"
          disabled={false}
        />
      </View>
    </View>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "transparent",
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleAlign: "center",
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <Drawer.Screen
        component={Home}
        name="Home"
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        component={Transactions}
        name="Transactions"
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "receipt" : "receipt-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        component={AddExpenceIncome}
        name="Add Income"
        initialParams={{ type: "income" }}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "wallet" : "wallet-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        component={AddExpenceIncome}
        initialParams={{ type: "expense" }}
        name="Add Expense"
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "cash" : "cash-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        component={About}
        name="About"
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons
              name={
                focused ? "information-circle" : "information-circle-outline"
              }
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    marginBottom: 20,
    borderColor: "#e0e0e0",
    backgroundColor: "#F5F5F5",
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  profileDetails: {
    alignItems: "center",
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profileEmail: {
    fontSize: 16,
    color: "#777",
  },
  logoutButtonContainer: {
    position: "absolute",
    right: 0,
    left: 0,
    bottom: 50,
    paddingHorizontal: 20,
  },
  aboutContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 250, // Adjust the width as needed
    height: 200, // Adjust the height as needed
    marginBottom: 20,
    backgroundColor: "transparent",
  },
  aboutTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  aboutText: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 10,
    lineHeight: 24,
  },
});

export default DrawerNavigator;
