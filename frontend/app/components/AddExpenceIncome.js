import React, { useState } from "react";
import {
  View,
  useWindowDimensions,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import Card from "./ui/Card";
import TransactionInput from "./TransactionInput";
import { expenseDropdownData, incomeDropdownData } from "./constants";
import { theme } from "../../theme";
const AddIncome = () => (
  <View>
    <Text style={styles.sceneText}>Add Income</Text>
    <TransactionInput type="income" dropdownData={incomeDropdownData} />
  </View>
);

const AddExpense = () => (
  <View>
    <Text style={styles.sceneText}>Add Expense</Text>
    <TransactionInput type="expense" dropdownData={expenseDropdownData} />
  </View>
);

const renderScene = SceneMap({
  first: AddIncome,
  second: AddExpense,
});

const AddExpenseIncome = ({ route }) => {
  const { type } = route.params;
  const [index, setIndex] = useState(type === "income" ? 0 : 1);
  const layout = useWindowDimensions();

  const renderTabBar = () => (
    <View style={styles.tabBarStyle}>
      <Pressable onPress={() => setIndex(0)}>
        {({ pressed }) => (
          <Card
            style={[
              styles.tab,
              {
                backgroundColor:
                  pressed || index === 0
                    ? theme.colors.primary
                    : theme.colors.card,
                borderColor: theme.colors.border,
                borderWidth: 0.5,
              },
            ]}
          >
            <MaterialCommunityIcons
              name="home-import-outline"
              size={24}
              color={index === 0 ? theme.colors.card : theme.colors.textPrimary}
            />
            <Text style={[styles.tabText, index === 0 && styles.activeTabText]}>
              Add Income
            </Text>
          </Card>
        )}
      </Pressable>
      <FontAwesome
        name="exchange"
        size={24}
        color={theme.colors.textPrimary}
        style={styles.middleIcon}
      />
      <Pressable onPress={() => setIndex(1)}>
        {({ pressed }) => (
          <Card
            style={[
              styles.tab,
              {
                backgroundColor:
                  pressed || index === 1
                    ? theme.colors.primary
                    : theme.colors.card,
                borderColor: theme.colors.border,
                borderWidth: 0.5,
              },
            ]}
          >
            <MaterialCommunityIcons
              name="home-export-outline"
              size={24}
              color={index === 1 ? theme.colors.card : theme.colors.textPrimary}
            />
            <Text style={[styles.tabText, index === 1 && styles.activeTabText]}>
              Add Expense
            </Text>
          </Card>
        )}
      </Pressable>
    </View>
  );

  return (
    <TabView
      navigationState={{
        index,
        routes: [
          { key: "first", title: "Add Income" },
          { key: "second", title: "Add Expense" },
        ],
      }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={renderTabBar}
    />
  );
};

const styles = StyleSheet.create({
  sceneContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sceneText: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 20,
  },
  tab: {
    padding: 20,
    borderRadius: 8,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  tabText: {
    fontSize: 16,
  },
  activeTabText: {
    fontWeight: "bold",
    color: "#fff",
  },
  tabBarStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 30,
    marginTop: 40,
    marginBottom: 30,
    marginHorizontal: 20,
  },
});

export default AddExpenseIncome;
