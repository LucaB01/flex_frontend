import { Pressable, View, ViewStyle } from "react-native";
import React from "react";
import gStyles from "../../../styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { Text } from "..";
import { TextPresets } from "../Text/TextPresets";
import { useNavigation } from "@react-navigation/native";

interface HeaderProps {
  textPreset?: TextPresets;
  title?: string;
  style?: ViewStyle;
  backIcon?: boolean;
  iconSize?: number;
  iconColor?: string;
}

export const Header = ({
  textPreset,
  title,
  style,
  backIcon,
  iconColor,
  iconSize,
}: HeaderProps) => {
  const navigation = useNavigation();

  return (
    <View style={[gStyles.row, gStyles.alignCenter, { justifyContent: "space-between", paddingVertical: 24, paddingLeft: 12 }, style]}>
      {backIcon && (
        <Pressable
          onPress={() => navigation.canGoBack() && navigation.goBack()}
          hitSlop={{top: 20, left: 20, right: 20, bottom: 10}}
        >
          <FontAwesomeIcon
            icon="chevron-left"
            size={iconSize || 20}
            color={iconColor || "white"}
          />
        </Pressable>
      )}
      <Text preset={textPreset || "header"}>{title}</Text>
      {backIcon && <FontAwesomeIcon
        icon="chevron-left"
        size={iconSize || 24}
        color={"transparent"}
      />}
    </View>
  );
};
