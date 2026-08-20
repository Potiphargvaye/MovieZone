import { router } from "expo-router";
import type { ReactNode } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppButton } from "@/components/AppButton";
import { Colors, FontSize, Spacing } from "@/constants/theme";

// Real asset: assets/images/image1.png (movie poster collage backdrop).
// See assets/images/README.md for the full mapping.

const backdrop = require("@/assets/images/image1.jpg");

function Backdrop({ children }: { children: ReactNode }) {
  if (backdrop) {
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
  return <View style={styles.backdrop}>{children}</View>;
}

export default function SplashScreen() {
  return (
    <View style={styles.root}>
      <Backdrop>
        <View style={styles.scrim} />
        <SafeAreaView style={styles.content} edges={["bottom"]}>
          <View style={styles.copy}>
            <Text style={styles.logo}>
              Movie<Text style={styles.logoAccent}>zone</Text>
            </Text>
            <Text style={styles.tagline}>
              Your number one movie destination.
            </Text>
            <AppButton
              label="Watch Movies"
              style={styles.button}
              onPress={() => router.push("/(auth)/sign-in")}
            />
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
    backgroundColor: "#26262C",
  },
  backdropImage: {
    opacity: 0.5,
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.overlay,
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
  },
  copy: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  logo: {
    color: Colors.text,
    fontSize: FontSize.xxl,
    fontWeight: "800",
  },
  logoAccent: {
    color: Colors.primary,
  },
  tagline: {
    color: Colors.textMuted,
    fontSize: FontSize.md,
    marginTop: Spacing.sm,
  },
  button: {
    marginTop: Spacing.lg,
    alignSelf: "flex-start",
    paddingHorizontal: Spacing.xl,
  },
});
