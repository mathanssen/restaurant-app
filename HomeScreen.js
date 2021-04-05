import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  Switch,
  TouchableOpacity,
  Platform,
  Button,
  StatusBar,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { icons, images, SIZES, COLORS, FONTS } from "./constants";
import DropDownPicker from "react-native-dropdown-picker";
import Slider from "@react-native-community/slider";

function HomeScreen() {
  // States
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [categories, setCategories] = React.useState(categoryData);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [currentValue, setCurrentValue] = useState(0);

  const categoryData = [
    {
      id: 1,
      Category: "Italian",
      icon: icons.rice_bowl,
    },
    {
      id: 2,
      Category: "North American",
      icon: icons.noodle,
    },
    {
      id: 3,
      Category: "Meditterranean",
      icon: icons.hotdog,
    },
    {
      id: 4,
      Category: "Indian",
      icon: icons.salad,
    },
    {
      id: 5,
      Category: "Dessert",
      icon: icons.hamburger,
    },
  ];

  // Get list from API
  const getRestaurants = () => {
    const restaurantsUrl =
      "https://gist.githubusercontent.com/skd09/8d8a685ffbdae387ebe041f28384c13c/raw/26e97cec1e18243e3d88c90d78d2886535a4b3a6/menu.json";

    return fetch(restaurantsUrl).then((response) =>
      response
        .json()
        .then((json) => {
          console.log("Update");
          var newData = [];
          for (var i = 0; i < json.length; i++) {
            // Check availability
            var checkAvailability = false;
            if (json[i].Available == 1) {
              checkAvailability = true;
            }

            // Check Price
            var checkPrice = false;
            console.log(sliderValue);
            if (sliderValue == 0) {
              checkPrice = true;
            } else {
              if (json[i].Price <= sliderValue) {
                checkPrice = true;
              }
            }

            // Check Category
            var checkCategory = true;
            // Check all conditions
            if (
              checkAvailability == true &&
              checkCategory == true &&
              checkPrice == true
            ) {
              newData.push(json[i]);
            }
          }

          setData(newData);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => setLoading(false))
    );
  };

  // Update functions
  useEffect(() => {
    getRestaurants();
  }, []);

  // Render Filter Options
  function renderFilterOptions() {
    if (showOptions == false) {
      setShowOptions(true);
      console.log(showOptions);
    } else {
      setShowOptions(false);
      console.log(showOptions);
    }
  }

  // Render Header
  function renderHeader() {
    return (
      // If filter option is not enable, show this
      <View>
        {showOptions == false ? (
          <View
            style={{
              flexDirection: "row",
              height: 50,
              marginBottom: 20,
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                renderFilterOptions();
              }}
              style={{
                width: 50,
                paddingRight: SIZES.padding * 2,
                justifyContent: "center",
              }}
            >
              <Image
                source={icons.search}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 50,
                paddingRight: SIZES.padding * 2,
                justifyContent: "center",
              }}
            >
              <Image
                source={icons.basket}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </TouchableOpacity>
          </View>
        ) : (
          // If filter is enable, show this
          <View
            style={{
              flexDirection: "row",
              height: 50,
              marginBottom: 20,
              marginTop: 10,
            }}
          >
            <Slider
              style={{ width: 100, height: 40 }}
              minimumValue={0}
              step={1}
              maximumValue={30}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              value={sliderValue}
              onValueChange={(e) => {
                setSliderValue(e);
              }}
              onSlidingComplete={(e) => {
                setCurrentValue(e);
                getRestaurants();
              }}

              // onValueChange={(value) => {
              //   setSliderValue({ value });
              //   console.log(sliderValue.value);
              //   getRestaurants();
              // }}
            />
            <DropDownPicker
              style={{
                width: 150,
                paddingLeft: SIZES.padding * 2,
                justifyContent: "center",
              }}
              items={[
                { label: "Item 1", value: "item1" },
                { label: "Item 2", value: "item2" },
              ]}
              defaultIndex={0}
              onChangeItem={(item) => console.log(item.label, item.value)}
            />
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={setIsEnabled}
              value={isEnabled}
            />
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  width: "70%",
                  height: "100%",
                  backgroundColor: COLORS.lightGray3,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: SIZES.radius,
                }}
              >
                <Text style={{ ...FONTS.h3 }}>Current Location</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                renderFilterOptions();
              }}
              style={{
                width: 50,
                paddingRight: SIZES.padding * 2,
                justifyContent: "center",
              }}
            >
              <Image
                source={icons.search}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 50,
                paddingRight: SIZES.padding * 2,
                justifyContent: "center",
              }}
            >
              <Image
                source={icons.basket}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }

  // Render Restaurants
  function renderRestaurantList() {
    const renderItem = ({ item }) => (
      <TouchableOpacity style={{ marginBottom: SIZES.padding * 2 }}>
        {/* Image */}
        <View
          style={{
            marginBottom: SIZES.padding,
          }}
        >
          <Image
            source={{ uri: item.Image }}
            resizeMode="cover"
            style={{
              width: "100%",
              height: 200,
              borderRadius: SIZES.radius,
            }}
          />

          <View
            style={{
              position: "absolute",
              bottom: 0,
              height: 50,
              width: SIZES.width * 0.3,
              backgroundColor: COLORS.white,
              borderTopRightRadius: SIZES.radius,
              borderBottomLeftRadius: SIZES.radius,
              alignItems: "center",
              justifyContent: "center",
              ...styles.shadow,
            }}
          >
            <Text style={{ ...FONTS.h4 }}>{item.Price}</Text>
          </View>
        </View>

        {/* Restaurant Info */}
        <Text style={{ ...FONTS.body2 }}>{item.Title}</Text>

        <View
          style={{
            marginTop: SIZES.padding,
            flexDirection: "row",
          }}
        >
          {/* Rating */}
          <Image
            source={icons.star}
            style={{
              height: 20,
              width: 20,
              tintColor: COLORS.primary,
              marginRight: 10,
            }}
          />
          <Text style={{ ...FONTS.body3 }}>{item.Ratings}</Text>

          {/* Categories */}
          <View
            style={{
              flexDirection: "row",
              marginLeft: 10,
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={{ ...FONTS.body3 }}>{item.Category}</Text>
              <Text style={{ ...FONTS.h3, color: COLORS.darkgray }}> </Text>
            </View>

            {/* Price */}
            <Text style={{ ...FONTS.body3 }}>${item.Price}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );

    return (
      <View>
        {isLoading ? (
          <ActivityIndicator
            animating={true}
            size="large"
            color={Platform.os === "ios" ? "#afafaf" : "#00a800"}
            style={{ opacity: 1 }}
          />
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => `${item.Id}`}
            renderItem={renderItem}
            contentContainerStyle={{
              paddingHorizontal: SIZES.padding * 2,
              paddingBottom: 30,
            }}
          />
        )}
      </View>
    );
  }

  // Views
  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderRestaurantList()}
    </View>
  );
}

// Style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
    marginTop: 40,
    paddingHorizontal: 24,
  },
  thumb: {
    width: "90%",
    height: 150,
    padding: 10,
    borderRadius: 10,
  },
  listItem: {
    flexDirection: "column",
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#123456",
  },
  synopsis: {
    fontSize: 15,
    textAlign: "center",
    padding: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#dddddd",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
});

export default HomeScreen;
