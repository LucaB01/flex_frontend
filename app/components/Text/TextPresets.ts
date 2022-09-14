import { TextStyle } from "react-native";
import { colors } from "../../../colors";

const BASE: TextStyle = {
  color: colors.text,
  fontSize: 16,
};

export const presets = {
  default: BASE,

  bold: { ...BASE, fontWeight: "bold" } as TextStyle,
  header: { ...BASE, fontSize: 24, fontWeight: "bold" } as TextStyle,
  secondary: { ...BASE, fontSize: 10, opacity: 0.6 } as TextStyle,
  smallTitle: { ...BASE, fontSize: 20, fontWeight: "700" },
};

export type TextPresets = keyof typeof presets;
