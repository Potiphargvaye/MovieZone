import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppButton } from "@/components/AppButton";
import { PosterCard } from "@/components/PosterCard";
import { RatingBadge } from "@/components/RatingBadge";
import { SectionHeader } from "@/components/SectionHeader";
import { Colors, FontSize, Radius, Spacing } from "@/constants/theme";
import { comingSoon, heroMovie, nowPlaying } from "@/data/movies";

const MONTHS = ["All", "January", "February", "March"];

export default function HomeScreen() {
  const [activeMonth, setActiveMonth] = useState("January");

  return (
    <SafeAreaView style={styles.root} edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.logo}>
            Movie<Text style={styles.logoAccent}>zone</Text>
          </Text>
          <Pressable hitSlop={10}>
            <Ionicons
              name="notifications-outline"
              size={22}
              color={Colors.text}
            />
          </Pressable>
        </View>

        <Pressable
          style={styles.hero}
          onPress={() => router.push(`/movie/${heroMovie.id}`)}
        >
          <ImageBackground
            source={heroMovie.backdrop ?? heroMovie.poster ?? undefined}
            style={[
              styles.heroPoster,
              { backgroundColor: heroMovie.placeholderColor },
            ]}
            imageStyle={styles.heroImage}
          >
            <View style={styles.heroScrim} />

            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>{heroMovie.title}</Text>

              <View style={styles.heroMetaRow}>
                <RatingBadge rating={heroMovie.rating} />

                <View style={styles.ageBadge}>
                  <Text style={styles.ageBadgeText}>{heroMovie.ageRating}</Text>
                </View>

                <Text style={styles.heroMetaText}>
                  {heroMovie.year} {heroMovie.duration} {heroMovie.genre}
                </Text>
              </View>

              <AppButton
                label="Watch Now"
                style={styles.watchNowButton}
                onPress={() => router.push(`/movie/${heroMovie.id}`)}
              />
            </View>
          </ImageBackground>

          <View style={styles.dotsRow}>
            {[0, 1, 2, 3].map((i) => (
              <View key={i} style={[styles.dot, i === 0 && styles.dotActive]} />
            ))}
          </View>
        </Pressable>

        <View style={styles.section}>
          <SectionHeader
            title="Now Playing"
            subtitle="Playing in theaters now"
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.rowContent}
          >
            {nowPlaying.map((movie) => (
              <PosterCard
                key={movie.id}
                movie={movie}
                variant="nowPlaying"
                onPress={() => router.push(`/movie/${movie.id}`)}
              />
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <SectionHeader
            title="Coming Soon This Year"
            subtitle="Movies on their way to the big screen"
          />

          <View style={styles.filterRow}>
            <View style={styles.yearPill}>
              <Text style={styles.yearPillText}>2025</Text>
              <Ionicons name="chevron-down" size={13} color={Colors.text} />
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.monthsRow}>
                {MONTHS.map((month) => (
                  <Pressable key={month} onPress={() => setActiveMonth(month)}>
                    <Text
                      style={[
                        styles.monthText,
                        activeMonth === month && styles.monthTextActive,
                      ]}
                    >
                      {month}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.rowContent}
          >
            {comingSoon.map((movie) => (
              <PosterCard
                key={movie.id}
                movie={movie}
                variant="comingSoon"
                onPress={() => router.push(`/movie/${movie.id}`)}
              />
            ))}
          </ScrollView>
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
  scrollContent: {
    paddingBottom: Spacing.xxl,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  logo: {
    color: Colors.text,
    fontSize: FontSize.xl,
    fontWeight: "800",
  },
  logoAccent: {
    color: Colors.primary,
  },
  hero: {
    paddingHorizontal: Spacing.lg,
  },
  heroPoster: {
    height: 480,
    borderRadius: Radius.xl,
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  heroImage: {
    borderRadius: Radius.lg,
  },
  heroPlaceholderIcon: {
    position: "absolute",
    top: "35%",
    alignSelf: "center",
  },
  heroScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  heroContent: {
    padding: Spacing.lg,
  },
  heroTitle: {
    color: Colors.text,
    fontSize: FontSize.xxl,
    fontWeight: "700",
  },
  heroMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginTop: Spacing.sm,
    flexWrap: "wrap",
  },
  ageBadge: {
    borderWidth: 1,
    borderColor: Colors.white,
    borderRadius: Radius.pill,
    width: 22,
    height: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  ageBadgeText: {
    color: Colors.white,
    fontSize: 9,
    fontWeight: "700",
  },
  heroMetaText: {
    color: Colors.text,
    fontSize: FontSize.xs,
  },
  watchNowButton: {
    marginTop: Spacing.md,
    alignSelf: "flex-start",
    paddingHorizontal: Spacing.xl,
    height: 44,
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginTop: Spacing.md,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.border,
  },
  dotActive: {
    backgroundColor: Colors.primary,
    width: 16,
  },
  section: {
    marginTop: Spacing.xl,
    paddingLeft: Spacing.lg,
  },
  rowContent: {
    gap: Spacing.md,
    paddingRight: Spacing.lg,
  },
  filterRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  yearPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: Colors.white,
    borderRadius: Radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  yearPillText: {
    color: "#141416",
    fontSize: FontSize.xs,
    fontWeight: "700",
  },
  monthsRow: {
    flexDirection: "row",
    gap: Spacing.md,
    paddingRight: Spacing.lg,
  },
  monthText: {
    color: Colors.textMuted,
    fontSize: FontSize.sm,
  },
  monthTextActive: {
    color: Colors.text,
    fontWeight: "700",
    textDecorationLine: "underline",
    textDecorationColor: Colors.primary,
  },
});
