import * as React from "react";
import {
  View,
  useWindowDimensions,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import List from "./ui/List";
import { useTransactions } from "../api/TransactionContext";
import { filterTransactionsByTimeFrame } from "../utils/methods";

export default function Transactions() {
  const layout = useWindowDimensions();
  const { transactions } = useTransactions();

  const [index, setIndex] = React.useState(0);
  const [loading, setLoading] = React.useState(
    !transactions || !transactions.transactions
  );

  const [routes] = React.useState([
    { key: "first", title: "All" },
    { key: "second", title: "Day" },
    { key: "third", title: "Week" },
    { key: "fourth", title: "Month" },
    { key: "fifth", title: "Year" },
  ]);

  const AllRoute = () => <List data={transactions?.transactions} />;
  const DayRoute = () => (
    <List
      data={filterTransactionsByTimeFrame(transactions?.transactions, "day")}
    />
  );
  const WeekRoute = () => (
    <List
      data={filterTransactionsByTimeFrame(transactions?.transactions, "week")}
    />
  );
  const MonthRoute = () => (
    <List
      data={filterTransactionsByTimeFrame(transactions?.transactions, "month")}
    />
  );
  const YearRoute = () => (
    <List
      data={filterTransactionsByTimeFrame(transactions?.transactions, "year")}
    />
  );

  const renderScene = SceneMap({
    first: AllRoute,
    second: DayRoute,
    third: WeekRoute,
    fourth: MonthRoute,
    fifth: YearRoute,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBarStyle}
      labelStyle={styles.labelStyles}
    />
  );

  React.useEffect(() => {
    setLoading(!transactions || !transactions.transactions);
  }, [transactions]);

  return (
    <>
      {loading ? (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  tabBarStyle: {
    backgroundColor: "#fff",
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
  },
  labelStyles: {
    color: "rgba(27, 27, 51, 1)",
    fontWeight: "bold",
  },
  indicator: {
    backgroundColor: "rgba(27, 27, 51, 1)"
  },
});
