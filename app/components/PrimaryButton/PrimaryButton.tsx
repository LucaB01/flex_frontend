import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import React from "react";
import {
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  Pressable,
  View,
} from "react-native";
import { Fold } from "react-native-animated-spinkit";
import { colors } from "../../../colors";
import { ButtonPresetNames, buttonPresets } from "./PrimaryButton.presets";

interface PrimaryButtonProps {
  preset?: ButtonPresetNames;
  title: string;
  onPress: () => void;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  disabledStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  textStyleDisabled?: StyleProp<TextStyle>;
  disabled?: boolean;
  leftIcon?: IconProp;
  leftIconColor?: string;
  leftIconSize?: number;
  rightIcon?: IconProp;
  rightIconColor?: string;
  rightIconSize?: number;
  notch?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  onPress,
  preset,
  title,
  loading,
  style,
  disabledStyle = styles.disabledPrimaryButton,
  textStyleDisabled = styles.buttonText,
  textStyle = styles.buttonText,
  disabled,
  leftIcon,
  leftIconColor,
  leftIconSize,
  rightIcon,
  rightIconColor,
  rightIconSize,
  notch,
}: PrimaryButtonProps) => {
  const buttonStyle = [
    preset ? buttonPresets[preset] : buttonPresets.primary,
    style,
  ];
  const buttonTextStyle = [styles.buttonText, textStyle];

  if (preset === "secondary") {
    buttonTextStyle.push({ color: colors.white });
  }

  if (disabled) {
    buttonStyle.push(disabledStyle);
  }

  if (loading) {
    return (
      <Pressable
        style={[disabledStyle ? disabledStyle : {}, style]}
        disabled={true}
      >
        <Fold size={25} color={colors.white} />
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress} style={buttonStyle} disabled={disabled}>
      {notch && <View style={styles.triangle} />}
      {leftIcon && !loading && (
        <FontAwesomeIcon
          icon={leftIcon}
          color={leftIconColor || "white"}
          size={leftIconSize || 20}
        />
      )}
      <Text style={buttonTextStyle}>{title}</Text>
      {rightIcon && !loading && (
        <FontAwesomeIcon
          icon={rightIcon}
          color={rightIconColor || "white"}
          size={rightIconSize || 20}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  disabledPrimaryButton: {
    opacity: 0.5,
  },

  buttonText: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 17,
    color: colors.black,
  },

  triangle: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderBottomWidth: 100,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "red",
  },
});
