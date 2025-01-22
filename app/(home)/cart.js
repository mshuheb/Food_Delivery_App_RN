import { Text, View, ScrollView, Pressable } from "react-native";
import React from "react";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanCart,
  decrementQuantity,
  incrementQuantity,
} from "../../redux/CartReducer";
import {
  Feather,
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useDarkMode } from "../../DarkModeContext";
import styles from "../../styles/cartStyles";

const cart = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  const { isDarkMode } = useDarkMode();
  const instructions = [
    { id: "0", name: "Avoid Ringing", iconName: "bell" },
    { id: "1", name: "Leave at the door", iconName: "door-open" },
    { id: "2", name: "Directions to reach", iconName: "directions" },
    { id: "3", name: "Avoid Calling", iconName: "phone-alt" },
  ];
  const total = cart
    ?.map((item) => item.quantity * item.price)
    .reduce((curr, prev) => curr + prev, 0);

  // Pass the current theme mode to the styles function
  const currentStyles = styles(isDarkMode);

  return (
    <>
      <ScrollView style={currentStyles.container}>
        <View style={currentStyles.header}>
          <Ionicons
            onPress={() => router.back()}
            name="arrow-back"
            size={24}
            color={isDarkMode ? "white" : "black"}
          />
          <Text style={currentStyles.headerText}>{params?.name}</Text>
        </View>

        <View style={currentStyles.deliveryInfo}>
          <Text style={{ color: isDarkMode ? "#ffffff" : "#000000" }}>
            Delivery in{" "}
            <Text style={currentStyles.deliveryTime}>35 - 40 mins</Text>
          </Text>
        </View>

        <View style={currentStyles.itemsAdded}>
          <Text style={currentStyles.itemsAddedText}>ITEM(S) ADDED</Text>
        </View>

        <View>
          {cart?.map((item, index) => (
            <Pressable style={currentStyles.itemContainer} key={index}>
              <View style={currentStyles.itemRow}>
                <Text style={currentStyles.itemName}>{item?.name}</Text>
                <Pressable style={currentStyles.quantityControl}>
                  <Pressable onPress={() => dispatch(decrementQuantity(item))}>
                    <Text style={currentStyles.quantityButton}>-</Text>
                  </Pressable>
                  <Pressable>
                    <Text style={currentStyles.quantityText}>
                      {item.quantity}
                    </Text>
                  </Pressable>
                  <Pressable onPress={() => dispatch(incrementQuantity(item))}>
                    <Text style={currentStyles.quantityButton}>+</Text>
                  </Pressable>
                </Pressable>
              </View>
              <View style={currentStyles.itemRow}>
                <Text style={currentStyles.itemPrice}>
                  ₹{item.price * item.quantity}
                </Text>
                <Text style={currentStyles.itemQuantity}>
                  Quantity : {item?.quantity}
                </Text>
              </View>
            </Pressable>
          ))}

          <View style={currentStyles.deliveryInstructions}>
            <Text style={currentStyles.deliveryInstructionsText}>
              Delivery Instructions
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {instructions?.map((item, index) => (
                <Pressable
                  style={currentStyles.instructionContainer}
                  key={index}
                >
                  <View style={currentStyles.instructionContent}>
                    <FontAwesome5
                      name={item?.iconName}
                      size={22}
                      color={"gray"}
                    />
                    <Text style={currentStyles.instructionText}>
                      {item?.name}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          <View>
            <View style={currentStyles.additionalOptions}>
              <View style={currentStyles.optionRow}>
                <Feather
                  name="plus-circle"
                  size={24}
                  color={isDarkMode ? "white" : "black"}
                />
                <Text style={currentStyles.optionText}>Add more Items</Text>
              </View>
              <AntDesign
                name="right"
                size={20}
                color={isDarkMode ? "white" : "black"}
              />
            </View>

            <View style={currentStyles.additionalOptions}>
              <View style={currentStyles.optionRow}>
                <Entypo
                  name="new-message"
                  size={24}
                  color={isDarkMode ? "white" : "black"}
                />
                <Text style={currentStyles.optionText}>
                  Add more cooking instructions
                </Text>
              </View>
              <AntDesign
                name="right"
                size={20}
                color={isDarkMode ? "white" : "black"}
              />
            </View>

            <View style={currentStyles.additionalOptions}>
              <View style={currentStyles.optionRow}>
                <MaterialCommunityIcons
                  name="food-fork-drink"
                  size={24}
                  color={isDarkMode ? "white" : "black"}
                />
                <Text style={currentStyles.optionText}>
                  Don't send cutlery with this order
                </Text>
              </View>
              <AntDesign
                name="right"
                size={20}
                color={isDarkMode ? "white" : "black"}
              />
            </View>
          </View>

          <View style={currentStyles.donationContainer}>
            <View style={currentStyles.donationRow}>
              <Text style={currentStyles.donationText}>
                Feeding India Donation
              </Text>
              <AntDesign name="checksquare" size={24} color="#fd5c63" />
            </View>
            <View style={currentStyles.donationRow}>
              <Text style={currentStyles.donationDescription}>
                Working towards a malnutrition-free India
              </Text>
              <Text style={currentStyles.donationAmount}>Rs 3</Text>
            </View>
          </View>

          <View style={currentStyles.billingDetails}>
            <Text style={currentStyles.billingDetailsText}>
              Billing Details
            </Text>
            <View style={currentStyles.billingContainer}>
              <View style={currentStyles.billingRow}>
                <Text style={currentStyles.billingLabel}>Item Total</Text>
                <Text style={currentStyles.billingValue}>₹{total}</Text>
              </View>
              <View style={currentStyles.billingRow}>
                <Text style={currentStyles.billingLabel}>Delivery Fee</Text>
                <Text style={currentStyles.billingValue}>₹15.00</Text>
              </View>
              <View style={currentStyles.billingRow}>
                <Text style={currentStyles.billingLabel}>
                  Delivery Partner Fee
                </Text>
                <Text style={currentStyles.billingValue}>₹75</Text>
              </View>
              <View style={currentStyles.billingRow}>
                <Text style={currentStyles.billingTotalLabel}>To pay</Text>
                <Text style={currentStyles.billingTotalValue}>
                  ₹{total + 90}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {total === 0 ? null : (
        <Pressable style={currentStyles.paymentContainer}>
          <View>
            <Text style={currentStyles.paymentText}>Pay Using Cash</Text>
            <Text style={currentStyles.paymentDescription}>
              Cash on Delivery
            </Text>
          </View>
          <Pressable
            onPress={() => {
              dispatch(cleanCart());
              router.replace({
                pathname: "/payment",
                params: { name: params?.name, amount: total + 95 },
              });
            }}
            style={currentStyles.placeOrderButton}
          >
            <View>
              <Text style={currentStyles.placeOrderTotal}>{total + 95}</Text>
              <Text style={currentStyles.placeOrderLabel}>TOTAL</Text>
            </View>
            <Text style={currentStyles.placeOrderText}>Place Order</Text>
          </Pressable>
        </Pressable>
      )}
    </>
  );
};

export default cart;
