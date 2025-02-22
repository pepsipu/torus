import { CategoryCard } from "@/components/CategoryCard";
import searchEntities from "@/app/data/search_entities.json";
import { Logo } from "@/components/NewsLogo";
import { Sidebar } from "@/components/Sidebar";
import SocialButtons from "@/components/SocialButtons";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter, useSegments } from "expo-router";
import {
  Platform,
  Pressable,
  Text,
  useColorScheme,
  useWindowDimensions,
  View,
} from "react-native";

import "../../global.css";
import { AppleNewsLogo } from "@/components/icons/AppleNewsLogo";
import { tabs } from "../data/tabs";

function SidebarItem({
  icon,
  label,
  href,
  isActive,
  compact = false,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  href: string;
  isActive?: boolean;
  compact?: boolean;
}) {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const hoverBg =
    colorScheme === "dark"
      ? "rgba(255, 59, 48, 0.1)"
      : "rgba(255, 59, 48, 0.1)";
  const activeBg =
    colorScheme === "dark"
      ? "rgba(255, 59, 48, 0.15)"
      : "rgba(255, 59, 48, 0.15)";
  const textColor = colorScheme === "dark" ? "#e7e9ea" : "#000000";

  const iconColor = isActive ? "#FF6C0C" : "#8E8E8F";

  const size = compact ? 28 : 24;

  return (
    <Pressable
      onPress={() => {
        window?.scrollTo({ top: 0, behavior: "smooth" });

        router.push(href as any);
      }}
      className={`flex flex-row items-center p-2 rounded-lg gap-3 mb-0.5 
        hover:bg-gray-200 transition-all duration-200  ${
          compact ? "justify-center w-10 h-10 mx-auto" : "pl-2 pr-6 mr-8"
        } ${isActive ? "bg-[#e6e6e7]" : ""}`}
      style={({ pressed, hovered }) => [
        (pressed || hovered) && { backgroundColor: hoverBg },
      ]}
    >
      <Ionicons
        name={icon as keyof typeof Ionicons.glyphMap}
        size={size}
        color={iconColor}
      />
      {!compact && (
        <Text
          className={`text-[15px] font-semibold ${isActive ? "font-bold" : ""}`}
          style={{ color: textColor }}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const DesktopWebLayout = (
  isCompact: boolean,
  borderColor: string,
  segments: string[]
) => {
  return (
    <View
      className={`${
        isCompact ? "w-[72px]" : ""
      } items-end sticky top-0 h-screen border-r border-gray-500`}
      style={{ borderRightColor: borderColor }}
    >
      <View
        className={`sticky ${
          isCompact ? "w-[72px] p-2" : "w-[275px] p-2"
        } h-full`}
      >
        <View
          className={`fixed ${
            isCompact ? "w-[72px] p-2" : "w-[275px] p-2"
          } h-full`}
        >
          <View className="mb-8 pl-3 pt-3">
            <View className="flex-row items-center gap-[2px] mt-2">
              <Logo size={isCompact ? 32 : 40} forceShow={true} />
            </View>
          </View>

          <View className="">
            {tabs.map((tab) => (
              <SidebarItem
                icon={tab.icon}
                label={tab.title}
                href={tab.href}
                compact={isCompact}
                isActive={segments[2] == tab.href}
              />
            ))}
          </View>

          <View className="mr-7 mt-4">
            {" "}
            {!isCompact && <SocialButtons showGithub />}
          </View>
        </View>
      </View>
    </View>
  );
};

const MobileWebLayout = (
  router: any,
  segments: any,
  borderColor: string,
  colorScheme: any
) => {
  return (
    <View
      className={`fixed bottom-0 left-0 right-0 h-16 flex-row border-t ${
        Platform.OS === "ios" ? "pb-5" : ""
      }`}
      style={{
        borderTopColor: borderColor,
        backgroundColor:
          colorScheme === "dark"
            ? "rgba(0, 0, 0, 0.7)"
            : "rgba(255, 255, 255, 0.7)",
        backdropFilter: Platform.OS === "web" ? "blur(12px)" : undefined,
      }}
    >
      {tabs.map((tab) => (
        <Pressable
          onPress={() => router.push(tab.href)}
          className="flex-1 items-center justify-center gap-1"
        >
          <Ionicons
            name={tab.icon}
            width={24}
            height={24}
            color={
              segments.length === 2
                ? "#FA2E47"
                : colorScheme === "dark"
                ? "#999"
                : "#666"
            }
          />
          <Text
            className="text-xs font-medium"
            style={{
              color:
                segments.length === 2
                  ? "#FA2E47"
                  : colorScheme === "dark"
                  ? "#999"
                  : "#666",
            }}
          >
            {tab.title}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

const WebLayout = () => {
  const colorScheme = useColorScheme();
  const { width } = useWindowDimensions();
  const router = useRouter();
  const segments = useSegments();

  const borderColor = colorScheme === "dark" ? "#2f3336" : "#eee";
  const isCompact = width < 1024;
  const isMobile = width < 768;
  const hideSideBar = width >= 1024;

  const Layout = isMobile
    ? MobileWebLayout(router, segments, borderColor, colorScheme)
    : DesktopWebLayout(isCompact, borderColor, segments);

  const backgroundColor = "#f9f9f9";

  return (
    <View className="flex-row left-0 right-0 bg-white justify-center relative">
      {!isMobile && Layout}
      <View className="flex-1 w-full max-w-[611px] bg-transparent">
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </View>

      <Sidebar />
      {isMobile && Layout}
    </View>
  );
};

export default WebLayout;
