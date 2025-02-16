import { OverlayProvider } from "@/components/Overlay/OverlayProvider";
import { AudioProvider, useAudio } from "@/contexts/AudioContext";
import { RootScaleProvider, useRootScale } from "@/contexts/RootScaleContext";
import { Appearance } from "@/helper/appearance";
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
  LogBox,
  Platform,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import "../global.css";

LogBox.ignoreAllLogs();

function AnimatedStack() {
  const segments = useSegments();
  const router = useRouter();
  const { scale } = useRootScale();
  const { currentEpisode, isPlaying, togglePlayPause } = useAudio();
  const isIOS = Platform.OS === "ios";

  const animatedStyle = useAnimatedStyle(() => {
    "worklet";
    return {
      transform: [
        { scale: scale.value },
        { translateY: (1 - scale.value) * -150 },
      ],
      borderRadius: scale.value === 1 ? 0 : 50,
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

  Appearance.setColorScheme("light");

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
          <RootScaleProvider>
            <AudioProvider>
              <OverlayProvider>
                <AnimatedStack />
              </OverlayProvider>
            </AudioProvider>
          </RootScaleProvider>
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
