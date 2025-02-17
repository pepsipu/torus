import searchEntities from "@/app/data/search_entities.json";
import { Home, NewsPlus, Search, Sports } from "@/assets/svg/tab-icons";
import { CategoryCard } from "@/components/CategoryCard";
import { Logo } from "@/components/NewsLogo";
import { Sidebar } from "@/components/Sidebar";
import SocialButtons from "@/components/SocialButtons";
import { useAudio } from "@/contexts/AudioContext";
import { useColorScheme } from "@/hooks/useColorScheme";
import { getAllEntitiesForSection } from "@/src/utils/entityUtils";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter, useSegments } from "expo-router";
import {
  Platform,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

import "../../global.css";

type Entity = {
  id: string;
  title: string;
  logo?: string;
  icon?: string;
  type: string;
  entity_type?: string;
  description?: string;
  theme?: {
    backgroundColor: string;
    textColor: string;
  };
};

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

  const getIcon = () => {
    switch (icon) {
      case "home":
        return <Home width={size} height={size} color={iconColor} />;
      case "news":
        return <NewsPlus width={size} height={size} color={iconColor} />;
      case "sports":
        return <Sports width={size} height={size} color={iconColor} />;
      case "search":
        return <Search width={size} height={size} color={iconColor} />;
      case "headset":
        return <Ionicons name="headset" size={size} color={iconColor} />;
      default:
        return (
          <Ionicons
            name={icon as keyof typeof Ionicons.glyphMap}
            size={size}
            color={iconColor}
          />
        );
    }
  };

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
      {getIcon()}
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

const WebLayout = () => {
  const colorScheme = useColorScheme();
  const { width } = useWindowDimensions();
  const router = useRouter();
  const segments = useSegments();
  const { commands } = useAudio();
  const { loadEpisodeWithoutPlaying, closePlayer } = commands;

  const borderColor = colorScheme === "dark" ? "#2f3336" : "#eee";
  const isCompact = width < 1024;
  const isMobile = width < 768;
  const hideSideBar = width >= 1024;

  const backgroundColor = "#f9f9f9";

  return (
    <View className="flex-row left-0 right-0 bg-white justify-center relative">
      {!isMobile && (
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
                <SidebarItem
                  icon="compass-outline"
                  label="Campus"
                  href="/"
                  compact={isCompact}
                  isActive={segments.length === 2}
                />
                <SidebarItem
                  icon="calendar-outline"
                  label="Schedule"
                  href="/news+"
                  compact={isCompact}
                  isActive={segments[2] === "news+"}
                />
              </View>

              <View className="mt-8 gap-2">
                {!isCompact && (
                  <Text className="text-sm font-medium text-gray-500 px-3">
                    Home
                  </Text>
                )}
                <SidebarItem
                  icon="search"
                  label="Following"
                  href="/(tabs)/(search)"
                  compact={isCompact}
                  isActive={segments[1] === "(search)"}
                />
              </View>

              {searchEntities.sections.map((section) => {
                if (section.id !== "my_following") return null;
                return (
                  <View
                    key={section.id}
                    className="gap-3 rounded-2xl p-3 mt-4 mr-6"
                    style={{ backgroundColor: "#00000008" }}
                  >
                    {!isCompact && (
                      <Text className="text-sm text-gray-500">
                        {section.title}
                      </Text>
                    )}
                    <View className="gap-3">
                      {getAllEntitiesForSection(section.id).map(
                        (entity: Entity) => (
                          <CategoryCard
                            key={entity.id}
                            title={entity.title}
                            logo={entity.logo}
                            icon={entity.icon}
                            id={entity.id}
                            entity_type={entity.type}
                            minimal={true}
                            disable_name={isCompact}
                          />
                        )
                      )}
                    </View>
                  </View>
                );
              })}

              {/* {!isCompact && <SocialButtons showTwitter />} */}

              <View className="mr-7 mt-4">
                {" "}
                {!isCompact && <SocialButtons showGithub />}
              </View>
            </View>
          </View>
        </View>
      )}

      <View className="flex-1 w-full max-w-[611px] bg-transparent">
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </View>

      <Sidebar />

      {isMobile && (
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
          <Pressable
            onPress={() => router.push("/")}
            className="flex-1 items-center justify-center gap-1"
          >
            <Home
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
              Home
            </Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("/news+")}
            className="flex-1 items-center justify-center gap-1"
          >
            <NewsPlus
              width={24}
              height={24}
              color={
                segments[2] === "news+"
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
                  segments[2] === "news+"
                    ? "#FA2E47"
                    : colorScheme === "dark"
                    ? "#999"
                    : "#666",
              }}
            >
              News+
            </Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("/sports")}
            className="flex-1 items-center justify-center gap-1"
          >
            <Sports
              width={30}
              height={30}
              color={
                segments[2] === "sports"
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
                  segments[2] === "sports"
                    ? "#FA2E47"
                    : colorScheme === "dark"
                    ? "#999"
                    : "#666",
              }}
            >
              Sports
            </Text>
          </Pressable>
          <Pressable
            onPress={() => router.push("/audio")}
            className="flex-1 items-center justify-center gap-1"
          >
            <Ionicons
              name="headset"
              size={24}
              color={
                segments[2] === "audio"
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
                  segments[2] === "audio"
                    ? "#FA2E47"
                    : colorScheme === "dark"
                    ? "#999"
                    : "#666",
              }}
            >
              Audio
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              router.push("/search");
              window?.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex-1 items-center justify-center gap-1"
          >
            <Search
              width={24}
              height={24}
              color={
                segments[2] === "search"
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
                  segments[2] === "search"
                    ? "#FA2E47"
                    : colorScheme === "dark"
                    ? "#999"
                    : "#666",
              }}
            >
              Following
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default WebLayout;
