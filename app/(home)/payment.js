import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import { RAZORPAY_KEY_ID } from "@env";

const RazorpayPaymentScreen = () => {
  const [showWebView, setShowWebView] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState("");

  const navigation = useNavigation();

  const currency = "INR";
  const params = useLocalSearchParams();
  const amount = params?.amount * 100; // Convert amount to paise
  const name = params?.name;

  // Function to generate the payment URL
  const startPayment = () => {
    const url = `https://api.razorpay.com/v1/checkout/embedded?key_id=${RAZORPAY_KEY_ID}&amount=${amount}&currency=${currency}&name=Test%20Payment`;
    setPaymentUrl(url);
    setShowWebView(true);
  };

  // Handle payment success, failure, or redirect callback in the WebView
  const handleWebViewNavigationStateChange = (navState) => {
    const { url } = navState;

    if (url.includes("redirect_callback")) {
      //alert('Payment Successful!');
      setTimeout(() => {
        navigation.replace("order", {
          name, // Pass restaurant name
        });
      }, 3000); // Wait 3 seconds before navigating to the Order screen
      //setShowWebView(false);
    }
  };

  return (
    <View style={styles.container}>
      {showWebView ? (
        <WebView
          source={{ uri: paymentUrl }}
          onNavigationStateChange={handleWebViewNavigationStateChange}
          startInLoadingState={true}
          renderLoading={() => (
            <ActivityIndicator size="large" color="#0000ff" />
          )}
        />
      ) : (
        <View style={styles.paymentContainer}>
          <Text style={styles.title}>Razorpay Payment Gateway</Text>
          <TouchableOpacity style={styles.button} onPress={startPayment}>
            <Text style={styles.buttonText}>
              Pay ₹{params?.amount} to {name}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  paymentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#fd5c63",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default RazorpayPaymentScreen;
