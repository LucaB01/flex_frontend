import React, { ReactChild, ReactChildren } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../../colors";

interface BackgroundProps {
  children: ReactChild | ReactChildren | ReactChild[] | any;
}

export const Background: React.FC<BackgroundProps> = ({
  children,
}: BackgroundProps) => {
  return (
    <SafeAreaView style={styles.background}>
      <LinearGradient
        colors={["#182028", "#030D16", "#000000"]}
        style={styles.linearGradient}
      />
      <View style={styles.childrenContainer}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000000",
  },

  childrenContainer: {
    height: "100%",
    width: "100%",
    paddingBottom: 60,
  },

  linearGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
});
