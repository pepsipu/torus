import { Logo } from "@/components/NewsLogo";
import { formatSimpleDate } from "@/utils/dateFormatters";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface NewsHeaderLeftItemProps {
  size: "sm" | "md";
  secondaryTitle?: string;
  theme?: "light" | "dark";
  showNewsLogo?: boolean;
}

export const NewsHeaderLeftItem = ({
  showNewsLogo = true,
  size,
  secondaryTitle,
  theme = "light",
}: NewsHeaderLeftItemProps) => {
  return (
    <View style={styles.headerLeft}>
      {showNewsLogo && (
        <Logo
          color={theme === "light" ? "#000" : "#fff"}
          size={size === "sm" ? 28 : 36}
        />
      )}

      <Text
        style={[
          styles.secondaryTitleContainer,
          {
            paddingTop: size === "sm" ? 0 : 8,
            fontSize: size === "sm" ? 28 : 36,
          },
        ]}
      >
        {secondaryTitle ? secondaryTitle : formatSimpleDate()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 2,
    flex: 1, // Ensures it takes the full available space
  },
  secondaryTitleContainer: {
    fontWeight: "800",
    letterSpacing: -1,
    marginTop: -6,
    color: "#85848C",
  },
});
