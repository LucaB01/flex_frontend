import { ViewStyle } from "react-native";
import { colors } from "../../../colors";

/**
 * All text will start off looking like this.
 */
const BASE_VIEW: ViewStyle = {
  borderRadius: 8,
  width: "100%",
  height: 50,
  backgroundColor: colors.primaryColor,
  justifyContent: "center",
  alignItems: "center",
  shadowColor: "rgba(136, 154, 175, 0.15)",
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 10,
  elevation: 2,
  flexDirection: "row",
  // justifyContent: "space-between"
};

export const buttonPresets: Record<string, ViewStyle> = {
  primary: {
    ...BASE_VIEW,
  } as ViewStyle,

  secondary: {
    ...BASE_VIEW,
    backgroundColor: colors.gray,
  } as ViewStyle,

  white: {
    ...BASE_VIEW,
    backgroundColor: colors.offWhite,
  },
};

export type ButtonPresetNames = keyof typeof buttonPresets;
