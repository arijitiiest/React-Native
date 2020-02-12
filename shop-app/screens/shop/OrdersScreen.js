import React, { useEffect, useState, useCallback } from "react";
import { Platform, FlatList, ActivityIndicator, View, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/UI/HeaderButtom";
import OrderItem from "../../components/shop/OrderItem";
import * as orderActions from "../../store/actions/order";
import Colors from "../../constants/Colors";

const OrdersScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const orders = useSelector(state => state.orders.orders);

  const dispatch = useDispatch();

  const loadOrders = useCallback(async () => {
    setIsLoading(true);
    await dispatch(orderActions.fetchOrders());
    setIsLoading(false);
  }, [dispatch, setIsLoading]);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (orders.length === 0) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>No orders found!, maybe ordering some products?</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <OrderItem
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
          items={itemData.item.items}
        />
      )}
    />
  );
};

OrdersScreen.navigationOptions = navData => {
  return {
    headerTitle: "Your Orders",
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => navData.navigation.toggleDrawer()}
        />
      </HeaderButtons>
    )
  };
};

export default OrdersScreen;
