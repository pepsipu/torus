import { Tabs } from "expo-router";
import React from "react";
import BlurView from "@/components/BlurView";
import { AppleNewsLogo } from "@/components/icons/AppleNewsLogo";
import { useRouter } from "expo-router";
import { Platform, StatusBar, StyleSheet, useColorScheme } from "react-native";
import { tabs } from "../data/tabs";
import { Ionicons } from "@expo/vector-icons";

export const unstable_settings = {
  initialRouteName: "(index)",
};

export default function TabLayout() {
  const router = useRouter();

  return (
    <>
      <Tabs
        screenOptions={{
          animation: "shift",
          tabBarActiveTintColor: "#FF6C0C",
          headerShown: false,
          lazy: true,
          tabBarStyle: {
            position: "absolute",
            backgroundColor: Platform.select({
              ios: "transparent",
              android: "rgba(255, 255, 255, 1)",
            }),
            borderTopWidth: StyleSheet.hairlineWidth,
            borderTopColor: "rgba(0,0,0,0.2)",
            elevation: 0,
          },
          headerStyle: {
            height: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          },
          tabBarBackground: () =>
            Platform.OS === "ios" ? (
              <BlurView
                tint={"systemThickMaterialLight"}
                intensity={80}
                style={StyleSheet.absoluteFill}
              />
            ) : null,
        }}
      >
        {tabs.map(tab => {
          return <Tabs.Screen
          name={tab.name}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={tab.icon} color={color} />
            ),
          }}
        />
        })}
        
      </Tabs>
    </>
  );
}
