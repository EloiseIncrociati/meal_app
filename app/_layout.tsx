import React from "react";
import { Tabs } from "expo-router";
import TabBar from "@/components/TabBar";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { StyleSheet } from "react-native";

const _layout = () => {
  return (
    <Provider store={store}>
      <Tabs tabBar={(props) => <TabBar {...props} />}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            headerTitleAlign: "center",
            headerTintColor: "#a44cff",
          }}
        />
        <Tabs.Screen
          name="favorites"
          options={{
            title: "Favorites",
            headerTitleAlign: "center",
            headerTintColor: "#a44cff",
          }}
        />
      </Tabs>
    </Provider>
  );
};

export default _layout;
