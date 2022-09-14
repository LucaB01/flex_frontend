import {
  Pressable,
  LayoutChangeEvent,
  ViewStyle,
  View,
  TextStyle,
} from "react-native";
import React, { useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { colors } from "../../../colors";
import { presets } from "../Text/TextPresets";

interface ToggleProps {
  leftText: string;
  rightText: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Toggle = ({
  leftText,
  rightText,
  style,
  textStyle,
}: ToggleProps) => {
  const offset = useSharedValue(false);
  const [containerWidth, setContainerWidth] = useState(0);

  const animatedContainer = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: offset.value
            ? withTiming(containerWidth / 2)
            : withTiming(0),
        },
      ],
    };
  });

  const animatedTextColorLeft = useAnimatedStyle(() => {
    return {
      color: offset.value ? withTiming("#FFFFFF") : withTiming("#000000"),
    };
  });

  const animatedTextColorRight = useAnimatedStyle(() => {
    return {
      color: offset.value ? withTiming("#000000") : withTiming("#FFFFFF"),
    };
  });

  return (
    <Pressable
      onPress={() => {
        offset.value = !offset.value;
      }}
      style={[
        {
          position: "relative",
          display: "flex",
          width: "100%",
          height: 60,
          backgroundColor: colors.gray,
          borderRadius: 16,
        },
        style,
      ]}
      onLayout={({
        nativeEvent: {
          layout: { width },
        },
      }: LayoutChangeEvent) => setContainerWidth(width)}
    >
      <View
        style={{
          position: "absolute",
          left: 0,
          width: "50%",
          height: "100%",
          zIndex: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Animated.Text style={[presets.bold, textStyle, animatedTextColorLeft]}>
          {leftText}
        </Animated.Text>
      </View>
      <View
        style={{
          position: "absolute",
          right: 0,
          width: "50%",
          height: "100%",
          zIndex: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Animated.Text
          style={[presets.bold, textStyle, animatedTextColorRight]}
        >
          {rightText}
        </Animated.Text>
      </View>
      <Animated.View
        style={[
          {
            width: "50%",
            height: "100%",
            backgroundColor: colors.primaryColor,
            borderRadius: 16,
            alignSelf: "flex-start",
          },
          animatedContainer,
        ]}
      />
    </Pressable>
  );
};
