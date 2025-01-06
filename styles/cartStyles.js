import { StyleSheet } from "react-native";

const styles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      padding: 10,
      flex: 1,
      backgroundColor: isDarkMode ? "#1c1c1c" : "#F0F8FF",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    headerText: {
      color: isDarkMode ? "white" : "black",
    },
    deliveryInfo: {
      backgroundColor: isDarkMode ? "#333" : "white",
      padding: 8,
      marginTop: 15,
      borderRadius: 8,
    },
    deliveryTime: {
      fontWeight: "500",
      color: isDarkMode ? "white" : "black",
    },
    itemsAdded: {
      marginVertical: 12,
    },
    itemsAddedText: {
      textAlign: "center",
      letterSpacing: 3,
      fontSize: 15,
      color: "gray",
    },
    itemContainer: {
      backgroundColor: isDarkMode ? "#333" : "white",
      padding: 10,
    },
    itemRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginVertical: 6,
    },
    itemName: {
      width: 200,
      fontSize: 16,
      fontWeight: "600",
      color: isDarkMode ? "white" : "black",
    },
    quantityControl: {
      flexDirection: "row",
      paddingHorizontal: 10,
      paddingVertical: 5,
      alignItems: "center",
      borderColor: "#BEBEBE",
      borderWidth: 0.5,
      borderRadius: 10,
    },
    quantityButton: {
      fontSize: 20,
      color: "green",
      paddingHorizontal: 6,
      fontWeight: "600",
    },
    quantityText: {
      fontSize: 19,
      color: "green",
      paddingHorizontal: 8,
      fontWeight: "600",
    },
    itemPrice: {
      fontSize: 16,
      fontWeight: "bold",
      color: isDarkMode ? "white" : "black",
    },
    itemQuantity: {
      fontSize: 15,
      fontWeight: "500",
      color: isDarkMode ? "white" : "black",
    },
    deliveryInstructions: {
      marginVertical: 10,
    },
    deliveryInstructionsText: {
      fontSize: 16,
      fontWeight: "600",
      color: isDarkMode ? "white" : "black",
    },
    instructionContainer: {
      margin: 10,
      borderRadius: 10,
      padding: 10,
      backgroundColor: isDarkMode ? "#333" : "white",
    },
    instructionContent: {
      justifyContent: "center",
      alignItems: "center",
    },
    instructionText: {
      width: 75,
      fontSize: 13,
      color: isDarkMode ? "#ccc" : "#383838",
      paddingTop: 10,
      textAlign: "center",
    },
    additionalOptions: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: isDarkMode ? "#333" : "white",
      paddingVertical: 10,
      paddingHorizontal: 10,
    },
    optionRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    optionText: {
      color: isDarkMode ? "white" : "black",
    },
    donationContainer: {
      padding: 10,
      backgroundColor: isDarkMode ? "#333" : "white",
      marginVertical: 10,
    },
    donationRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    donationText: {
      color: isDarkMode ? "white" : "black",
    },
    donationDescription: {
      color: "gray",
    },
    donationAmount: {
      color: isDarkMode ? "white" : "black",
    },
    billingDetails: {
      marginVertical: 10,
    },
    billingDetailsText: {
      fontSize: 16,
      fontWeight: "bold",
      color: isDarkMode ? "white" : "black",
    },
    billingContainer: {
      backgroundColor: isDarkMode ? "#333" : "white",
      borderRadius: 7,
      padding: 10,
      marginTop: 14,
    },
    billingRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    billingLabel: {
      fontSize: 15,
      fontWeight: "400",
      color: isDarkMode ? "#ccc" : "#505050",
    },
    billingValue: {
      fontSize: 15,
      fontWeight: "400",
      color: isDarkMode ? "#ccc" : "#505050",
    },
    billingTotalLabel: {
      fontWeight: "bold",
      fontSize: 15,
      color: isDarkMode ? "white" : "black",
    },
    billingTotalValue: {
      color: isDarkMode ? "white" : "black",
    },
    paymentContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: 20,
      justifyContent: "space-between",
      backgroundColor: isDarkMode ? "#333" : "white",
    },
    paymentText: {
      fontSize: 16,
      fontWeight: "600",
      color: isDarkMode ? "white" : "black",
    },
    paymentDescription: {
      marginTop: 7,
      fontSize: 15,
      color: isDarkMode ? "white" : "black",
    },
    placeOrderButton: {
      backgroundColor: "#fd5c63",
      padding: 10,
      width: 200,
      borderRadius: 6,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 10,
    },
    placeOrderTotal: {
      color: "white",
      fontSize: 15,
      fontWeight: "bold",
    },
    placeOrderLabel: {
      fontSize: 15,
      color: "white",
      fontWeight: "500",
      marginTop: 3,
    },
    placeOrderText: {
      fontSize: 16,
      fontWeight: "500",
      color: "white",
    },
  });

export default styles;
