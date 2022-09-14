import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import React from "react";
import Router from "./app/routing/Router";
import { Provider as MobxProvider } from "mobx-react";
import stores from "./app/stores/index";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Toast from "react-native-toast-message";
import { StatusBar } from "react-native";
import { colors } from "./colors";
if (__DEV__) {
  import("./app/services/reactotronConfig").then(() =>
    console.log("Reactotron Configured")
  );
}

library.add(fas);

const App: React.FC = () => {
  return (
    <MobxProvider {...stores}>
      <StatusBar
        backgroundColor={colors.primaryColor}
        barStyle="light-content"
      />
      <NavigationContainer
        theme={{
          dark: true,
          colors: {
            primary: colors.primaryColor,
            background: colors.dark,
            card: colors.primaryColor,
            text: colors.primaryColor,
            border: colors.primaryColor,
            notification: colors.primaryColor,
          },
        }}
      >
        <Router />
      </NavigationContainer>
      <Toast
        ref={(ref: any) => {
          Toast.setRef(ref);
        }}
      />
    </MobxProvider>
  );
};

export default App;
