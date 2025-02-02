import React, { useEffect } from "react";
import { Tabs } from "expo-router";
import TabBar from "@/components/TabBar";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

const _layout = () => {
  const primaryColor = "#a44cff";

  return (
    <Provider store={store}>
      <Tabs tabBar={(props) => <TabBar {...props} />}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            headerTitleAlign: "center",
            headerTintColor: primaryColor,
          }}
        />
        <Tabs.Screen
          name="favorites"
          options={{
            title: "Favorites",
            headerTitleAlign: "center",
            headerTintColor: primaryColor,
          }}
        />
      </Tabs>
    </Provider>
  );
};

export default _layout;
