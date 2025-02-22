import Ionicons from "@expo/vector-icons/Ionicons";

interface Tab {
  name: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  href: string;
}

export const tabs: Tab[] = [
  {
    name: "(index)",
    title: "Campus",
    icon: "compass",
    href: "/",
  },
];
