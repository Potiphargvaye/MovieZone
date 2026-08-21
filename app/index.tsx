import { router } from "expo-router";
import type { ReactNode } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppButton } from "@/components/AppButton";
import { Colors, FontSize, Radius, Spacing } from "@/constants/theme";

// Landing page background image
const backdrop = require("@/assets/images/image1.jpg");

function Backdrop({ children }: { children: ReactNode }) {
  return (
    <ImageBackground
      source={backdrop}
      style={styles.backdrop}
      imageStyle={styles.backdropImage}
    >
      {children}
    </ImageBackground>
  );
}

export default function SplashScreen() {
  return (
    <View style={styles.root}>
      <Backdrop>
        {/* Dark overlay for better text visibility */}
        <View style={styles.scrim} />

        <SafeAreaView style={styles.content}>
          <View style={styles.centerContent}>
            {/* Brand */}
            <Text style={styles.logo}>
              Movie<Text style={styles.logoAccent}>zone</Text>
            </Text>

            {/* Small label */}
            <View style={styles.badge}>
              <Text style={styles.badgeText}>YOUR CINEMA EXPERIENCE</Text>
            </View>

            {/* Main heading */}
            <Text style={styles.title}>
              Movies. Moments.{"\n"}
              <Text style={styles.titleAccent}>Memories.</Text>
            </Text>

            {/* Description */}
            <Text style={styles.description}>
              Discover the latest movies, explore what is playing, and book your
              perfect cinema experience in just a few taps.
            </Text>

            {/* CTA */}
            <AppButton
              label="Explore Movies"
              style={styles.button}
              onPress={() => router.push("/(auth)/sign-in")}
            />

            <Text style={styles.footerText}>
              Discover • Choose • Book • Enjoy
            </Text>
          </View>
        </SafeAreaView>
      </Backdrop>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  backdrop: {
    flex: 1,
  },

  backdropImage: {
    opacity: 0.65,
  },

  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.68)",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: Spacing.lg,
  },

  centerContent: {
    width: "100%",
    alignItems: "center",
  },

  logo: {
    color: Colors.text,
    fontSize: FontSize.xxl,
    fontWeight: "900",
    letterSpacing: -1,
    marginBottom: Spacing.xl,
  },

  logoAccent: {
    color: Colors.primary,
  },

  badge: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.md,
    paddingVertical: 7,
    marginBottom: Spacing.md,
    backgroundColor: "rgba(0,0,0,0.25)",
  },

  badgeText: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
    fontWeight: "700",
    letterSpacing: 1.2,
  },

  title: {
    color: Colors.text,
    fontSize: 40,
    fontWeight: "900",
    textAlign: "center",
    lineHeight: 47,
    letterSpacing: -1,
  },

  titleAccent: {
    color: Colors.primary,
  },

  description: {
    color: "#D1D1D6",
    fontSize: FontSize.md,
    lineHeight: 24,
    textAlign: "center",
    maxWidth: 340,
    marginTop: Spacing.md,
  },

  button: {
    marginTop: Spacing.xl,
    alignSelf: "stretch",
    borderRadius: Radius.md,
  },

  footerText: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
    marginTop: Spacing.lg,
    letterSpacing: 0.5,
  },
});
