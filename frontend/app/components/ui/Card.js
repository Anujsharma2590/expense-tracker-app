import { View, StyleSheet } from "react-native";

export default function Card({ children, style = {} }) {
  return <View style={[styles.cardContainer, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 15,
    backgroundColor: "#fff",
    elevation: 8,
    shadowColor: "#000",
    shadowRadius: 8,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.15,
  },
});
