import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import AppNav from "./navigation/AppNav";
import { persistor, store } from "./store/store";

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <AppNav />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export { App };
