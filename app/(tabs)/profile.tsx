import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors, FontSize, Radius, Spacing } from "@/constants/theme";

const MENU_ITEMS = [
  { key: "tickets", label: "My Tickets", icon: "ticket-outline" as const },
  { key: "payment", label: "Payment Methods", icon: "card-outline" as const },
  { key: "rewards", label: "Rewards & Coupons", icon: "gift-outline" as const },
  {
    key: "settings",
    label: "Account Settings",
    icon: "settings-outline" as const,
  },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <View style={styles.header}>
        <Pressable
          hitSlop={12}
          onPress={() =>
            router.canGoBack() ? router.back() : router.replace("/(tabs)")
          }
        >
          <Ionicons name="arrow-back" size={22} color={Colors.text} />
        </Pressable>
        <View style={styles.headerIcons}>
          <Ionicons name="settings-outline" size={20} color={Colors.text} />
          <Ionicons
            name="notifications-outline"
            size={20}
            color={Colors.primary}
          />
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.avatarWrap}>
          <Image
            source={require("@/assets/images/myimage.jpeg")}
            style={styles.avatar}
          />
          <Text style={styles.name}>Potiphar G Vaye</Text>
          <Text style={styles.detail}>marybethwalker@gmail.com</Text>
          <Text style={styles.detail}>+250794241623</Text>
        </View>

        <View style={styles.menu}>
          {MENU_ITEMS.map((item) => (
            <Pressable key={item.key} style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <Ionicons name={item.icon} size={18} color={Colors.text} />
                <Text style={styles.menuItemLabel}>{item.label}</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={18}
                color={Colors.textMuted}
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  headerIcons: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  scrollContent: {
    paddingBottom: Spacing.xxl,
  },
  avatarWrap: {
    alignItems: "center",
    marginTop: Spacing.md,
  },
  avatar: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: Colors.card,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.md,
  },
  name: {
    color: Colors.text,
    fontSize: FontSize.lg,
    fontWeight: "700",
  },
  detail: {
    color: Colors.textMuted,
    fontSize: FontSize.sm,
    marginTop: 2,
  },
  menu: {
    marginTop: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.card,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  menuItemLabel: {
    color: Colors.text,
    fontSize: FontSize.md,
    fontWeight: "500",
  },
});
