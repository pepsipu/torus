import React from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { OliveWalkIcon } from "./icons/OliveWalkIcon";

interface NewsLogoProps {
  size?: number;
  color?: string;
  forceShow?: boolean;
}

export const Logo = ({
  size = 24,
  forceShow = false,
}: NewsLogoProps) => {
  const { width } = useWindowDimensions();
  const showSidebar = width >= 1024;
  const isMobile = width < 768;

  if (!showSidebar && !forceShow && !isMobile) {
    return null;
  }

  if (showSidebar && !forceShow && !isMobile) {
    return null;
  }

  return (
    <View style={styles.container}>
      <OliveWalkIcon name="logo-apple" size={size} />
      {(showSidebar || isMobile) && (
        <Text style={[styles.text, { fontSize: size }]}>Walk</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  text: {
    fontWeight: "800",
  },
});
