import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import {
  Platform,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import "../global.css";

function AnimatedStack() {
  const segments = useSegments();
  const router = useRouter();

  const animatedStyle = useAnimatedStyle(() => {
    "worklet";
    return {
      transform: [
        { scale: 1 },
      ],
      borderRadius: 0,
      backgroundColor: "#fff",
    };
  }, []);

  const containerStyle = useAnimatedStyle(() => {
    "worklet";

    return {
      flex: 1,
      backgroundColor: "#000",
    };
  }, []);

  return (
    <Animated.View style={containerStyle}>
      <Animated.View
        style={[
          styles.stackContainer,
          Platform.OS === "ios" && animatedStyle,
          Platform.OS === "web" && {
            position: "relative",
            overflow: "unset!important",
            height: "auto",
          },
        ]}
      >
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </Animated.View>
    </Animated.View>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        style={"dark"}
        backgroundColor="transparent"
        translucent={true}
      />
      <GestureHandlerRootView style={styles.container}>
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
              <AnimatedStack />
        </ThemeProvider>
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: Platform.OS !== "web" ? 1 : 0,
    backgroundColor: Platform.OS === "ios" ? "black" : "transparent",
  },
  stackContainer: {
    flex: 1,
    overflow: "hidden",
  },
});
