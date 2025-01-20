import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useDarkMode } from "../../DarkModeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../../supabase";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Menu, Divider } from "react-native-paper"; // Add this for the menu
import styles from "../../styles/profileStyles";

const UserProfileView = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [gender, setGender] = useState(null);
  const [address, setAddress] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [editingAddress, setEditingAddress] = useState(false);
  const [editingPhoneNumber, setEditingPhoneNumber] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [loading, setLoading] = useState(true);


  const router = useRouter();
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const email = await AsyncStorage.getItem("userEmail");
        if (email) {
          setUserEmail(email);
        }
      } catch (error) {
        console.log("Error fetching user email:", error);
      }
    };

    fetchUserEmail();
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userEmail) return;
      try {
        const { data, error } = await supabase
          .from("user_details")
          .select("name, gender, email, address, phone_number")
          .eq("email", userEmail)
          .single();

        if (error) {
          console.log("Error fetching user details:", error);
          return;
        }

        if (data) {
          setUserName(data.name);
          setGender(data.gender);
          setAddress(data.address);
          setPhoneNumber(data.phone_number);
          const avatarPath = data.gender === "male" ? "male" : "female";
          setSelectedImage(avatarPath);
        }
      } catch (error) {
        console.log("Error fetching user profile:", error);
      }
      finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchUserProfile();
  }, [userEmail]);

  const handleGenderSelection = async (newGender) => {
    const avatarPath = newGender === "male" ? "male" : "female";

    setGender(newGender);
    setSelectedImage(avatarPath);

    try {
      const { error } = await supabase
        .from("user_details")
        .update({ gender: newGender })
        .eq("email", userEmail);

      if (error) {
        Alert.alert("Error", "Failed to update gender.");
        console.log("Error updating gender:", error);
      } else {
        AsyncStorage.setItem("userGender", newGender);
        AsyncStorage.setItem("userAvatar", avatarPath);
      }
    } catch (error) {
      console.log("Error updating gender:", error);
    }
  };

  const handleAddressUpdate = async () => {
    try {
      const { error } = await supabase
        .from("user_details")
        .update({ address: newAddress })
        .eq("email", userEmail);

      if (error) {
        Alert.alert("Error", "Failed to update address.");
        console.log("Error updating address:", error);
      } else {
        setAddress(newAddress);
        setEditingAddress(false);
      }
    } catch (error) {
      console.log("Error updating address:", error);
    }
  };

  const handlePhoneNumberUpdate = async () => {
    try {
      const { error } = await supabase
        .from("user_details")
        .update({ phone_number: newPhoneNumber })
        .eq("email", userEmail);

      if (error) {
        Alert.alert("Error", "Failed to update phone number.");
        console.log("Error updating phone number:", error);
      } else {
        setPhoneNumber(newPhoneNumber);
        setEditingPhoneNumber(false);
      }
    } catch (error) {
      console.log("Error updating phone number:", error);
    }
  };

  const handleAddressDelete = async () => {
    try {
      const { error } = await supabase
        .from("user_details")
        .update({ address: null })
        .eq("email", userEmail);

      if (error) {
        Alert.alert("Error", "Failed to delete address.");
        console.log("Error deleting address:", error);
      } else {
        setAddress(null);
      }
    } catch (error) {
      console.log("Error deleting address:", error);
    }
  };

  const handlePhoneNumberDelete = async () => {
    try {
      const { error } = await supabase
        .from("user_details")
        .update({ phone_number: null })
        .eq("email", userEmail);

      if (error) {
        Alert.alert("Error", "Failed to delete phone number.");
        console.log("Error deleting phone number:", error);
      } else {
        setPhoneNumber(null);
      }
    } catch (error) {
      console.log("Error deleting phone number:", error);
    }
  };

  const avatarImages = {
    male: require("../../assets/male.jpg"),
    female: require("../../assets/female.png"),
    default: require("../../assets/profpic.jpg"),
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("authToken");
      router.replace("/login");
    } catch (error) {
      Alert.alert("Error", "Could not log out. Please try again.");
      console.log("Logout error:", error);
    }
  };

  const avatarSource = avatarImages[selectedImage] || avatarImages.default;

  return (
    <View
      style={[styles.container, { backgroundColor: isDarkMode ? "#121212" : "#f0f0f0" }]}
    >
      {loading ? (
        // Full screen activity indicator
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={isDarkMode ? "#ffffff" : "#000000"} />
        </View>
      ) : (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#121212" : "#f0f0f0" },
      ]}
    >
      <View style={styles.iconContainer}>
        <Ionicons
          onPress={() => router.back()}
          style={styles.icon}
          name="arrow-back"
          size={24}
          color={isDarkMode ? "#ffffff" : "#000000"}
        />
      </View>

      <View style={styles.centerContent}>
        <View
          style={[
            styles.card,
            { backgroundColor: isDarkMode ? "#1e1e1e" : "#ffffff" },
          ]}
        >
          <View style={styles.avatarContainer}>
            <Image style={styles.avatar} source={avatarSource} />
          </View>
          <Text
            style={[
              styles.cardText,
              { color: isDarkMode ? "#ffffff" : "#000000" },
            ]}
          >
            Welcome, {userName}!
          </Text>
          <View style={styles.divider} />
          <Text
            style={[
              styles.headerText,
              { color: isDarkMode ? "#ffffff" : "#000000" },
            ]}
          >
            Email
          </Text>
          <Text
            style={[
              styles.detailText,
              { color: isDarkMode ? "#ffffff" : "#000000", fontWeight: "bold" },
            ]}
          >
            {userEmail}
          </Text>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text
              style={[
                styles.headerText,
                { color: isDarkMode ? "#ffffff" : "#000000" },
              ]}
            >
              Gender
            </Text>
            <TouchableOpacity
              style={[
                styles.genderChangeButton,
                { backgroundColor: isDarkMode ? "#000000" : "#ffffff" },
              ]}
              onPress={() =>
                handleGenderSelection(gender === "male" ? "female" : "male")
              }
            >
              <MaterialIcons
                name="change-circle"
                size={30}
                color={isDarkMode ? "#ffffff" : "#000000"}
              />
            </TouchableOpacity>
          </View>
          <Text
            style={[
              styles.detailText,
              { color: isDarkMode ? "#ffffff" : "#000000", fontWeight: "bold" },
            ]}
          >
            {gender || "Not set"}
          </Text>
          <View style={styles.divider} />

          {/* Address Section */}
          {/* Address Section */}
<View style={styles.row}>
  <Text
    style={[
      styles.headerText,
      { color: isDarkMode ? "#ffffff" : "#000000" },
    ]}
  >
    Address
  </Text>
  <Text
    style={[
      styles.detailText,
      {
        color: isDarkMode ? "#ffffff" : "#000000",
        fontWeight: "bold",
      },
    ]}
  >
    {address || "Not set"}
  </Text>
  {address && (
    <TouchableOpacity
      style={styles.menuButton}
      onPress={() =>
        Alert.alert("Modify Address", "Choose an action", [
          { text: "Edit", onPress: () => setEditingAddress(true) },
          {
            text: "Delete",
            onPress: () => {
              handleAddressDelete();
            },
            style: "destructive",
          },
          { text: "Cancel", style: "cancel" },
        ])
      }
    >
      <MaterialIcons
        name="more-vert"
        size={24}
        color={isDarkMode ? "#ffffff" : "#000000"}
      />
    </TouchableOpacity>
  )}
</View>

{editingAddress ? (
  <View style={{ marginTop: 10 }}>
    <TextInput
      style={[styles.input, { backgroundColor: "#ffffff" }]}
      placeholder="Enter your address"
      placeholderTextColor="#888"
      value={newAddress || address} // Display current address or new input
      onChangeText={setNewAddress}
    />
    <TouchableOpacity
      style={[styles.button, { backgroundColor: "#fd5c63" }]}
      onPress={() => {
        // Only save the address if there is a valid input
        if (newAddress.trim()) {
          handleAddressUpdate();
        } else {
          Alert.alert("Address is required", "Please enter a valid address.");
        }
      }}
    >
      <Text style={[styles.buttonText, { color: "#ffffff" }]}>
        Save Address
      </Text>
    </TouchableOpacity>
  </View>
) : (
  !address && (
    <TouchableOpacity
      onPress={() => setEditingAddress(true)}
      style={[styles.button, { backgroundColor: "#fd5c63" }]}
    >
      <Text style={[styles.buttonText, { color: "#ffffff" }]}>
        +Add Address
      </Text>
    </TouchableOpacity>
  )
)}


          <View style={styles.divider} />

          {/* Phone Number Section */}
          {/* Phone Number Section */}
<View style={styles.row}>
  <Text
    style={[
      styles.headerText,
      { color: isDarkMode ? "#ffffff" : "#000000" },
    ]}
  >
    Phone Number
  </Text>
  <Text
    style={[
      styles.detailText,
      {
        color: isDarkMode ? "#ffffff" : "#000000",
        fontWeight: "bold",
      },
    ]}
  >
    {phoneNumber || "Not set"}
  </Text>

  {phoneNumber && (
    <TouchableOpacity
      style={styles.menuButton}
      onPress={() =>
        Alert.alert("Modify Phone Number", "Choose an action", [
          {
            text: "Edit",
            onPress: () => setEditingPhoneNumber(true),
          },
          {
            text: "Delete",
            onPress: () => {
              handlePhoneNumberDelete();
            },
            style: "destructive",
          },
          { text: "Cancel", style: "cancel" },
        ])
      }
    >
      <MaterialIcons
        name="more-vert"
        size={24}
        color={isDarkMode ? "#ffffff" : "#000000"}
      />
    </TouchableOpacity>
  )}
</View>

{editingPhoneNumber ? (
  <View style={{ marginTop: 10 }}>
    <TextInput
      style={[styles.input, { backgroundColor: "#ffffff" }]}
      placeholder="Enter your phone number"
      placeholderTextColor="#888"
      value={newPhoneNumber || phoneNumber} // Display current phone number or input
      onChangeText={setNewPhoneNumber}
      keyboardType="phone-pad"
    />
    <TouchableOpacity
      style={[styles.button, { backgroundColor: "#fd5c63" }]}
      onPress={() => {
        // Only save the phone number if it's valid
        if (newPhoneNumber.trim()) {
          handlePhoneNumberUpdate();
        } else {
          Alert.alert("Phone Number is required", "Please enter a valid phone number.");
        }
      }}
    >
      <Text style={[styles.buttonText, { color: "#ffffff" }]}>
        Save Phone Number
      </Text>
    </TouchableOpacity>
  </View>
) : (
  !phoneNumber && (
    <TouchableOpacity
      onPress={() => setEditingPhoneNumber(true)}
      style={[styles.button, { backgroundColor: "#fd5c63" }]}
    >
      <Text style={[styles.buttonText, { color: "#ffffff" }]}>
        +Add Phone Number
      </Text>
    </TouchableOpacity>
  )
)}
</View>

        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: "#fd5c63",
              borderColor: "white",
            },
          ]}
          onPress={handleLogout}
        >
          <Text
            style={[
              styles.buttonText,
              { color: "white", marginRight: 8 },
            ]}
          >
            Logout
          </Text>
          <MaterialIcons
            name="logout"
            size={20}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
      )}
      </View>
  );
};
export default UserProfileView;


