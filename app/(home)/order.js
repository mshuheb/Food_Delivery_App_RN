import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import moment from "moment";
import { FontAwesome5 } from "@expo/vector-icons";
import { useDarkMode } from "../../DarkModeContext";
import { Video } from "expo-av";

const order = () => {
  const params = useLocalSearchParams();
  const [tip, setTip] = useState(0);
  const time = moment().format("LT");
  const { isDarkMode } = useDarkMode();

  // Reference the local video file using require
  const videoUri =
    "https://xkveywmtbhzcgmdvtvjq.supabase.co/storage/v1/object/public/Assets/Food%20Delivery.mp4"; // Path to your local video

  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          height: 60,
          backgroundColor: "#fd5c63",
          padding: 10,
        }}
      >
        <View>
          <Text style={{ color: "white", fontSize: 15, fontWeight: "600" }}>
            Delivery in 25 mins
          </Text>
          <Text style={{ color: "white", fontSize: 15, fontWeight: "600" }}>
            order placed at {time}
          </Text>
        </View>
        <Text style={{ color: "white", fontSize: 15, fontWeight: "600" }}>
          HELP
        </Text>
      </View>

      {/* Replace MapView with Video */}
      <Video
        source={{ uri: videoUri }} // Wrap the video URI in an object
        style={{ width: "100%", height: 400 }}
        isLooping
        resizeMode="contain"
        shouldPlay
        onError={(error) => console.error("Video Error: ", error)}
      />

      <View
        style={{
          height: 440,
          width: "100%",
          backgroundColor: isDarkMode ? "#000000" : "#ffffff",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
      >
        <View style={{ padding: 10 }}>
          <View>
            <Text
              style={{
                fontWeight: "500",
                fontSize: 17,
                textAlign: "center",
                color: isDarkMode ? "#ffffff" : "#000000",
              }}
            >
              {params?.name} has accepted your order
            </Text>
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <FontAwesome5
                name="hand-holding-heart"
                size={28}
                color="#fc8019"
              />
              <View style={{ marginLeft: 10 }}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "500",
                    paddingHorizontal: 2,
                    marginBottom: 6,
                    color: isDarkMode ? "#ffffff" : "#000000",
                  }}
                >
                  Tip your hunger Saviour
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "600",
                    color: "#696969",
                    marginRight: 10,
                    paddingHorizontal: 2,
                  }}
                >
                  Thank your delivery partner for helping you stay safe indoors.
                  Support them through these tough times with a tip
                </Text>
                <Pressable
                  style={{
                    paddingTop: 20,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => setTip(30)}
                    style={{
                      backgroundColor: "#F5F5F5",
                      marginHorizontal: 10,
                      paddingHorizontal: 10,
                      borderRadius: 7,
                    }}
                  >
                    <Text
                      style={{
                        padding: 10,
                        color: "#002D62",
                        fontWeight: "bold",
                      }}
                    >
                      ₹30
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => setTip(50)}
                    style={{
                      alignItems: "center",
                      backgroundColor: "#F5F5F5",
                      marginHorizontal: 10,
                      borderRadius: 7,
                    }}
                  >
                    <Text
                      style={{
                        padding: 4,
                        color: "#002D62",
                        fontWeight: "bold",
                      }}
                    >
                      ₹50
                    </Text>
                    <Text
                      style={{
                        backgroundColor: "orange",
                        paddingHorizontal: 10,
                        fontSize: 14,
                        fontWeight: "bold",
                        color: "white",
                      }}
                    >
                      Most Tipped
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => setTip(70)}
                    style={{
                      backgroundColor: "#F5F5F5",
                      marginHorizontal: 10,
                      paddingHorizontal: 10,
                      borderRadius: 7,
                    }}
                  >
                    <Text
                      style={{
                        padding: 10,
                        color: "#002D62",
                        fontWeight: "bold",
                      }}
                    >
                      ₹70
                    </Text>
                  </TouchableOpacity>
                </Pressable>
              </View>
            </View>
            {tip ? (
              <View>
                <Text
                  style={{
                    color: "#fc8019",
                    padding: 10,
                    marginLeft: 10,
                    marginRight: 10,
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  please pay {"₹"} {tip} to your delivery agent at the time of
                  delivery
                </Text>
                <TouchableOpacity
                  onPress={() => setTip(0)}
                  activeOpacity={0.7}
                  style={{
                    padding: 10,
                    marginLeft: 10,
                    marginRight: 10,
                    position: "absolute",
                    top: 40,
                    paddingBottom: 40,
                  }}
                >
                  <Text
                    style={{ color: "red", fontSize: 14, fontWeight: "700" }}
                  >
                    (Cancel)
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default order;
