import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface GlassViewProps {
  children: any;
  style?: ViewStyle;
  overlayStyle?: ViewStyle;
}

export const GlassView: React.FC<GlassViewProps> = ({
  children,
  style,
  overlayStyle,
}: GlassViewProps) => {
  return (
    <BlurView
      tint="light"
      intensity={50}
      style={[styles.blurContainer, overlayStyle]}
    >
      <LinearGradient
        colors={["rgba(0,0,0,0.5)", "rgba(0,0,0,0.8)", "rgba(0,0,0,0.8)"]}
        start={{ x: 1, y: 1 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.55, 0.8]}
        style={[styles.card, style]}
      >
        {children}
      </LinearGradient>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  blurContainer: {
    display: "flex",
    height: "100%",
    width: "100%",
    alignItems: "center",
    borderRadius: 16,
    justifyContent: "center",
  },

  card: {
    width: "100%",
    height: "100%",
    borderColor: "rgba(255,255,255,0.3)",
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 20,
    paddingBottom: 30,
  },
});
