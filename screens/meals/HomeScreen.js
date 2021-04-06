import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  FlatList,
  LogBox,
  ActivityIndicator,
  Switch,
  TouchableOpacity,
  Platform,
} from "react-native";
import { icons, SIZES, COLORS, FONTS } from "../../constants";
import DropDownPicker from "react-native-dropdown-picker";
import Slider from "@react-native-community/slider";
import NumericInput from "react-native-numeric-input";
import Order from "../../classes/Order";
import Food from "../../classes/Food";
import Modal from "react-native-modal";

export const HomeScreen = (props) => {
  // Settings
  LogBox.ignoreAllLogs();

  // Variables
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [isEnabled, setIsEnabled] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [modalDescription, setModalDescription] = useState("");

  // Category Array
  const categoryData = [
    { label: "Italian", value: "Italian" },
    { label: "North American", value: "North American" },
    { label: "Meditterranean", value: "Meditterranean" },
    { label: "Indian", value: "Indian" },
    { label: "Dessert", value: "Dessert" },
    { label: "Mexican", value: "Mexican" },
    { label: "Soup", value: "Soup" },
    { label: "Hot Beverage", value: "Hot Beverage" },
    { label: "Middle eastern food", value: "Middle eastern food" },
    { label: "Persian", value: "Persian" },
    { label: "Japanese", value: "Japanese" },
    { label: "Others", value: "Others" },
  ];

  /*
   * @TODO get information from the current user
   */
  const customerName = "Matheus";
  const customerBillingAddress = "Street";
  const shippingAddress = "Queen";
  const order = new Order(
    customerName,
    customerBillingAddress,
    shippingAddress
  );

  // Add food to cart
  function addToCart(item, quantity) {
    var newFood = new Food(
      item.Id,
      item.Title,
      item.Description,
      item.Image,
      item.Ratings,
      item.Price,
      item.Available,
      item.Category,
      quantity
    );

    let oldCart = cart;
    var foodExists = false;
    for (let food = 0; food < oldCart.length; food++) {
      if (oldCart[food].Id == item.Id) {
        foodExists = true;
        break;
      }
    }

    if (foodExists == true) {
      if (quantity > 0) {
        oldCart.splice(
          oldCart.findIndex((a) => a.Id === item.Id),
          1
        );
        oldCart.push(newFood);
      } else {
        oldCart.splice(
          oldCart.findIndex((a) => a.Id === item.Id),
          1
        );
      }
    } else {
      oldCart.push(newFood);
    }
    setCart(oldCart);
    order.setCart(cart);
    order.calculatePayment();
    setSubtotal(order.subtotalAmount);
    setDiscount(order.discountPercent * 100);
    setFinalAmount(order.finalAmount);
  }

  // Get list from API
  const getRestaurants = () => {
    const restaurantsUrl =
      "https://gist.githubusercontent.com/skd09/8d8a685ffbdae387ebe041f28384c13c/raw/26e97cec1e18243e3d88c90d78d2886535a4b3a6/menu.json";

    console.log("Fetch API");
    return fetch(restaurantsUrl).then((response) =>
      response
        .json()
        .then((json) => {
          var newData = [];
          for (var i = 0; i < json.length; i++) {
            // Check availability
            var checkAvailability = false;
            if (isEnabled == true) {
              if (json[i].Available == 1) {
                checkAvailability = true;
              }
            } else {
              checkAvailability = true;
            }

            // Check Price
            var checkPrice = false;
            if (sliderValue == 0) {
              checkPrice = true;
            } else {
              if (json[i].Price <= sliderValue) {
                checkPrice = true;
              }
            }

            // Check Category
            var checkCategory = false;
            if (selectedCategory == "") {
              checkCategory = true;
            } else {
              if (json[i].Category == selectedCategory) {
                checkCategory = true;
              }
            }

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

  /*
   * @TODO use navigator to go to checkout screen
   */
  const navigateToPayment = () => {
    props.navigation.navigate({
      routeName: "Checkout",
      params: {
        order: order,
      },
    });
  };

  // Display filter options when the button is pressed
  function renderFilterOptions() {
    if (showOptions == false) {
      setShowOptions(true);
    } else {
      setShowOptions(false);
      getRestaurants();
    }
  }

  // Display cart when the button is pressed
  function displayCart() {
    if (showCart == false) {
      setShowCart(true);
    } else {
      setShowCart(false);
    }
  }

  // Show details when pressed
  function renderModal() {
    return (
      <View>
        {isModalVisible == true ? (
          <View style={{ flex: 1 }}>
            <Modal isVisible={isModalVisible}>
              <Image
                source={{ uri: modalImage }}
                resizeMode="cover"
                style={styles.restaurantImgModal}
              />
              <Text style={styles.restaurantDescModal}>{modalDescription}</Text>
              <Button
                color={COLORS.primary}
                marginTop={40}
                title="Back"
                onPress={toggleModal}
              />
            </Modal>
          </View>
        ) : (
          <View></View>
        )}
      </View>
    );
  }

  // Set modal
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // Render Header
  function renderHeader() {
    return (
      // If filter option is not enable, show this
      <View>
        {showOptions == false ? (
          <View style={styles.header}>
            {showCart == false ? (
              <TouchableOpacity
                onPress={() => {
                  renderFilterOptions();
                }}
                style={styles.filter}
              >
                <Image
                  source={icons.filter}
                  resizeMode="contain"
                  style={styles.img}
                />
              </TouchableOpacity>
            ) : (
              <Text></Text>
            )}
            <TouchableOpacity
              onPress={() => {
                displayCart();
              }}
              style={styles.cart}
            >
              {showCart == false ? (
                <Image
                  source={icons.basket}
                  resizeMode="contain"
                  style={styles.cartImg}
                />
              ) : (
                <Image
                  source={icons.back}
                  resizeMode="contain"
                  style={styles.cartImg}
                />
              )}
            </TouchableOpacity>
          </View>
        ) : (
          // If filter is enable, show this
          <View style={styles.filterOptions}>
            <Text style={styles.filterText}>Filter Options</Text>
            <Text style={styles.filterTextDetail}>
              Price Max.: ${sliderValue}
            </Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              step={1}
              maximumValue={30}
              minimumTrackTintColor="black"
              maximumTrackTintColor="black"
              value={sliderValue}
              onValueChange={(e) => {
                setSliderValue(e);
              }}
            />
            <Text style={styles.filterTextDetail}>Category</Text>
            <DropDownPicker
              style={styles.dropDownPicker}
              dropDownMaxHeight={200}
              items={categoryData}
              defaultIndex={0}
              onChangeItem={(item) => {
                console.log(item.value);
                setSelectedCategory(item.value);
              }}
            />
            <Text style={styles.filterTextDetail}>
              Only Available Restaurants
            </Text>
            <Switch
              style={styles.switch}
              trackColor={{ false: "#767577", true: "#767577" }}
              thumbColor={isEnabled ? "green" : "#f4f3f4"}
              onValueChange={setIsEnabled}
              value={isEnabled}
            />
            <TouchableOpacity
              onPress={() => {
                renderFilterOptions();
              }}
              style={styles.buttonFilter}
            >
              <Text style={[styles.applyText]}>Apply</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }

  // Get current item quantity
  function getQuantity(item) {
    var q = 0;
    if (cart.length > 0) {
      for (let food = 0; food < cart.length; food++) {
        if (cart[food].Id == item.Id) {
          q = cart[food].quantity;
          break;
        }
      }
    }
    return q;
  }

  // Render Cart
  function renderCart(props) {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={styles.cartTouchable}
        onPress={() => {
          setModalImage(item.Image);
          setModalDescription(item.Description);
          toggleModal();
        }}
      >
        <View style={styles.cartView}>
          <Image
            source={{ uri: item.Image }}
            resizeMode="cover"
            style={styles.restaurantImg}
          />
          <View style={styles.price}>
            <Text style={styles.priceText}>$ {item.Price}</Text>
          </View>
        </View>
        <Text style={styles.restaurantTitle}>{item.Title}</Text>
        <Text style={styles.restaurantCategoryText}>{item.Category}</Text>
        <View style={styles.ratings}>
          <Image source={icons.star} style={styles.restaurantRating} />
          <Text style={styles.restaurantRatingFont}>{item.Ratings}</Text>
        </View>
        <View style={styles.restaurantCategoryView}>
          {item.Available == 1 ? (
            <NumericInput
              value={getQuantity(item)}
              totalWidth={80}
              totalHeight={30}
              minValue={0}
              step={1}
              valueType="real"
              rounded
              textColor={COLORS.black}
              iconStyle={{ color: "white" }}
              rightButtonBackgroundColor={COLORS.primary}
              leftButtonBackgroundColor={COLORS.primary}
              onChange={(value) => {
                addToCart(item, value);
              }}
            />
          ) : (
            <Text style={styles.restaurantNotAvailability}>Not Available</Text>
          )}
        </View>
      </TouchableOpacity>
    );

    const renderItemCart = ({ item }) => (
      <TouchableOpacity style={styles.cartRender}>
        <View style={styles.cartRenderView}></View>
        <Text style={styles.cartRestaurantInfo}>{item.Title}</Text>
        <View style={styles.cartRestaurantInfoView}>
          <View style={styles.cartRestaurantPriceView}>
            <Text style={styles.cartRestaurantPrice}>${item.Price}</Text>
          </View>
          <View style={styles.cartNumericInput}>
            <NumericInput
              value={item.quantity}
              totalWidth={80}
              totalHeight={30}
              step={1}
              valueType="real"
              rounded
              textColor={COLORS.black}
              iconStyle={{ color: "white" }}
              rightButtonBackgroundColor={COLORS.primary}
              leftButtonBackgroundColor={COLORS.primary}
              onChange={(value) => {
                addToCart(item, value);
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );

    return (
      // If cart option is not enable, show this
      <View>
        {showCart == false && showOptions == false ? (
          <View>
            {isLoading ? (
              <ActivityIndicator
                animating={true}
                size="large"
                color={Platform.os === "ios" ? "#afafaf" : "#00a800"}
                style={styles.loading}
              />
            ) : (
              <FlatList
                data={data}
                keyExtractor={(item) => `${item.Id}`}
                renderItem={renderItem}
                contentContainerStyle={styles.flatList}
              />
            )}
          </View>
        ) : (
          <View>
            {showOptions == false ? (
              // If cart is enable, show this
              <View>
                {cart.length > 0 ? (
                  <View>
                    <FlatList
                      data={cart}
                      keyExtractor={(item) => `${item.Id}`}
                      renderItem={renderItemCart}
                      contentContainerStyle={styles.cartFlatList}
                    />
                    <Text style={styles.cartSubtotal}>
                      Subtotal: ${subtotal}
                    </Text>
                    <Text style={styles.cartDiscount}>
                      Discount: {discount}%{" "}
                    </Text>
                    <Text style={styles.cartFinalAmount}>
                      Final Amount: ${finalAmount}{" "}
                    </Text>
                    <Button
                      onPress={navigateToPayment}
                      title="Proceed to Checkout"
                      color={COLORS.primary}
                    />
                  </View>
                ) : (
                  <Text style={styles.cartEmpty}>Your cart is empty :(</Text>
                )}
              </View>
            ) : (
              <Text></Text>
            )}
          </View>
        )}
      </View>
    );
  }

  // Views
  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderModal()}
      {renderCart()}
    </View>
  );
};

// Navigation Settings
HomeScreen.navigationOptions = {
  headerTitle: "Home",
};

// Style
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: "row",
    height: 50,
    marginBottom: 20,
    marginTop: 10,
  },
  filter: {
    width: "90%",
    justifyContent: "center",
  },
  img: {
    width: 30,
  },
  cart: {
    width: 50,
    justifyContent: "center",
  },
  cartImg: {
    width: 50,
    height: 30,
  },
  filterOptions: {
    backgroundColor: COLORS.lightGray4,
    height: "90%",
    marginLeft: 30,
    marginRight: 30,
  },
  filterText: {
    marginTop: 35,
    fontSize: 30,
  },
  ratings: {
    flex: 1,
    flexDirection: "row",
  },
  slider: {
    width: 120,
    height: 40,
  },
  filterTextDetail: {
    marginTop: 30,
    fontSize: 20,
  },
  dropDownPicker: {
    width: 100,
    justifyContent: "center",
  },
  switch: {
    display: "flex",
    alignSelf: "flex-start",
    marginTop: 10,
  },
  filterIcon: {
    marginTop: 100,
  },
  filterImg: {
    width: 40,
    height: 40,
  },
  cartTouchable: {
    marginBottom: 30,
  },
  cartView: {
    marginBottom: 10,
  },
  restaurantImg: {
    width: "100%",
    height: 200,
    borderRadius: 30,
  },
  restaurantImgModal: {
    width: "90%",
    margin: 10,
    height: 400,
  },
  restaurantTitle: {
    fontSize: 23,
  },
  restaurantRating: {
    height: 20,
    width: 20,
    tintColor: COLORS.primary,
    marginRight: 10,
  },
  restaurantRatingFont: {
    ...FONTS.body3,
  },
  restaurantCategoryView: {
    marginTop: 8,
  },
  restaurantCategoryText: {
    fontSize: 15,
  },
  restaurantPrice: {
    ...FONTS.body3,
  },
  restaurantAvailability: {
    marginTop: 0,
    marginLeft: 0,
  },
  restaurantNotAvailability: {
    marginLeft: 0,
    color: COLORS.primary,
  },
  cartRender: {
    marginBottom: 20,
  },
  cartRenderView: {
    marginBottom: 10,
  },
  cartRestaurantInfo: {
    ...FONTS.body2,
  },
  cartRestaurantInfoView: {
    marginTop: 10,
    flexDirection: "row",
  },
  cartRestaurantPrice: {
    ...FONTS.body3,
  },
  cartRestaurantPriceView: {
    flexDirection: "row",
    marginLeft: 10,
  },
  cartNumericInput: {
    marginLeft: 30,
  },
  loading: {
    opacity: 1,
  },
  flatList: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  cartFlatList: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  cartSubtotal: {
    fontSize: 20,
    margin: 5,
  },
  cartDiscount: {
    fontSize: 20,
    color: "green",
    margin: 5,
  },
  cartFinalAmount: {
    fontSize: 20,
    margin: 5,
  },
  cartEmpty: {
    fontSize: 30,
    textAlign: "center",
    marginTop: 150,
  },
  price: {
    position: "absolute",
    bottom: 0,
    height: 50,
    width: SIZES.width * 0.3,
    backgroundColor: COLORS.white,
    borderTopRightRadius: SIZES.radius,
    borderBottomLeftRadius: SIZES.radius,
    alignItems: "center",
    justifyContent: "center",
  },
  priceText: {
    fontSize: 25,
    color: COLORS.primary,
  },
  buttonFilter: {
    marginTop: 100,
    height: 50,
    width: 100,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4a148c",
    shadowColor: "#2AC062",
    shadowOpacity: 0.4,
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 20,
  },
  applyText: {
    fontSize: 16,
    textTransform: "uppercase",
    color: "#FFFFFF",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  restaurantDescModal: {
    color: COLORS.white,
    justifyContent: "center",
    textAlign: "center",
    marginBottom: 30,
    fontSize: 15,
    alignContent: "center",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default HomeScreen;
