import { View, ViewStyle } from "react-native";
import React from "react";

interface LineProps {
  color?: string;
  style?: ViewStyle;
}

export const Line = ({ color, style }: LineProps) => {
  return (
    <View
      style={[
        {
          width: "100%",
          borderBottomColor: color || "#D0D0D0",
          borderWidth: 1,
          marginVertical: 24,
        },
        style,
      ]}
    />
  );
};
