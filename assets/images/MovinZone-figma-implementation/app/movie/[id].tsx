import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppButton } from '@/components/AppButton';
import { BackButton } from '@/components/BackButton';
import { RatingBadge } from '@/components/RatingBadge';
import { Colors, FontSize, Radius, Spacing } from '@/constants/theme';
import { getMovieById } from '@/data/movies';
import { bookingStore } from '@/state/booking-store';

const SCHEDULE_DAYS = [
  { label: 'Oct 6', sublabel: 'Friday' },
  { label: 'Oct 7', sublabel: 'Saturday' },
  { label: 'Oct 8', sublabel: 'Sunday' },
];

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const movie = getMovieById(id);

  const [favorited, setFavorited] = useState(false);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const [dayIndex, setDayIndex] = useState(0);
  const [timeIndex, setTimeIndex] = useState(0);

  if (!movie) {
    return (
      <SafeAreaView style={styles.root}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Movie not found.</Text>
          <AppButton label="Go Back" onPress={() => router.back()} style={{ marginTop: Spacing.lg }} />
        </View>
      </SafeAreaView>
    );
  }

  const handleBookSeat = () => {
    const day = SCHEDULE_DAYS[dayIndex];
    const time = movie.showtimes[timeIndex];
    bookingStore.start(movie.id, `${day.label}, ${day.sublabel}`, time.time);
    router.push(`/booking/${movie.id}/seats`);
  };

  return (
    <View style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={[styles.backdrop, { backgroundColor: movie.placeholderColor }]}>
          <Ionicons
            name="film-outline"
            size={44}
            color="rgba(0,0,0,0.35)"
            style={styles.backdropIcon}
          />
          <SafeAreaView edges={['top']} style={styles.backdropHeader}>
            <BackButton />
            <Pressable hitSlop={12} onPress={() => setFavorited((prev) => !prev)}>
              <Ionicons
                name={favorited ? 'heart' : 'heart-outline'}
                size={22}
                color={favorited ? Colors.primary : Colors.text}
              />
            </Pressable>
          </SafeAreaView>
        </View>

        <View style={styles.body}>
          <Text style={styles.title}>{movie.title}</Text>
          <View style={styles.metaRow}>
            <RatingBadge rating={movie.rating} />
            <View style={styles.ageBadge}>
              <Text style={styles.ageBadgeText}>{movie.ageRating}</Text>
            </View>
            <Text style={styles.metaText}>
              {movie.year}  {movie.duration}  {movie.genre}
            </Text>
          </View>

          <Text style={styles.description} numberOfLines={descriptionExpanded ? undefined : 3}>
            {movie.description}{' '}
            <Text style={styles.readMore} onPress={() => setDescriptionExpanded((prev) => !prev)}>
              {descriptionExpanded ? 'Read Less' : 'Read More'}
            </Text>
          </Text>

          <View style={styles.infoRow}>
            <View style={[styles.infoPoster, { backgroundColor: movie.placeholderColor }]}>
              <Ionicons name="film-outline" size={22} color="rgba(0,0,0,0.35)" />
            </View>
            <View style={styles.infoColumn}>
              <InfoLine label="Director:" value={movie.director} />
              <InfoLine label="Cast:" value={movie.cast} />
              <InfoLine label="Release Date:" value={movie.releaseDate} />
              <InfoLine label="Ticket Price:" value={`£${movie.ticketPrice.toFixed(2)}`} />
            </View>
          </View>

          <Text style={styles.sectionTitle}>Viewing Schedule</Text>
          <View style={styles.pillRow}>
            {SCHEDULE_DAYS.map((day, index) => {
              const active = index === dayIndex;
              return (
                <Pressable
                  key={day.label}
                  onPress={() => setDayIndex(index)}
                  style={[styles.datePill, active && styles.datePillActive]}>
                  <Text style={[styles.datePillLabel, active && styles.pillLabelActive]}>
                    {day.label}
                  </Text>
                  <Text style={[styles.datePillSublabel, active && styles.pillLabelActive]}>
                    {day.sublabel}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.detailField}>
            <Text style={styles.detailFieldLabel}>Location:</Text>
            <View style={styles.detailFieldValueRow}>
              <Text style={styles.detailFieldValue}>Gables, Eswatini</Text>
              <Ionicons name="chevron-down" size={14} color={Colors.textMuted} />
            </View>
          </View>
          <View style={styles.detailField}>
            <Text style={styles.detailFieldLabel}>3d Glasses:</Text>
            <View style={styles.detailFieldValueRow}>
              <Text style={styles.detailFieldValue}>No</Text>
              <Ionicons name="chevron-down" size={14} color={Colors.textMuted} />
            </View>
          </View>

          <Text style={styles.sectionTitle}>Viewing Times</Text>
          <View style={styles.pillRow}>
            {movie.showtimes.map((show, index) => {
              const active = index === timeIndex;
              return (
                <Pressable
                  key={show.time}
                  onPress={() => setTimeIndex(index)}
                  style={[styles.timePill, active && styles.datePillActive]}>
                  <Text style={[styles.datePillLabel, active && styles.pillLabelActive]}>
                    {show.time}
                  </Text>
                  <Text style={[styles.datePillSublabel, active && styles.pillLabelActive]}>
                    {show.seatsAvailable} seats available
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <SafeAreaView edges={['bottom']} style={styles.footer}>
        <AppButton label="Book A Seat" onPress={handleBookSeat} />
      </SafeAreaView>
    </View>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoLine}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 140,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.lg,
  },
  notFoundText: {
    color: Colors.text,
    fontSize: FontSize.md,
  },
  backdrop: {
    height: 300,
  },
  backdropIcon: {
    position: 'absolute',
    top: '45%',
    alignSelf: 'center',
  },
  backdropHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
  },
  body: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
  },
  title: {
    color: Colors.text,
    fontSize: FontSize.xxl,
    fontWeight: '700',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
    flexWrap: 'wrap',
  },
  ageBadge: {
    borderWidth: 1,
    borderColor: Colors.textMuted,
    borderRadius: Radius.pill,
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ageBadgeText: {
    color: Colors.text,
    fontSize: 9,
    fontWeight: '700',
  },
  metaText: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
  },
  description: {
    color: Colors.textMuted,
    fontSize: FontSize.sm,
    lineHeight: 20,
    marginTop: Spacing.md,
  },
  readMore: {
    color: Colors.primary,
    fontWeight: '700',
  },
  infoRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  infoPoster: {
    width: 90,
    height: 128,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoColumn: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  infoLine: {
    marginBottom: Spacing.sm,
  },
  infoLabel: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
  },
  infoValue: {
    color: Colors.text,
    fontSize: FontSize.sm,
    fontWeight: '600',
    marginTop: 2,
  },
  sectionTitle: {
    color: Colors.text,
    fontSize: FontSize.lg,
    fontWeight: '700',
    marginTop: Spacing.xl,
    marginBottom: Spacing.md,
  },
  pillRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    flexWrap: 'wrap',
  },
  datePill: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingVertical: 10,
    paddingHorizontal: Spacing.md,
    alignItems: 'center',
    minWidth: 84,
  },
  timePill: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingVertical: 10,
    paddingHorizontal: Spacing.md,
    alignItems: 'center',
    minWidth: 104,
  },
  datePillActive: {
    backgroundColor: Colors.white,
    borderColor: Colors.white,
  },
  datePillLabel: {
    color: Colors.text,
    fontSize: FontSize.sm,
    fontWeight: '700',
  },
  datePillSublabel: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
    marginTop: 2,
  },
  pillLabelActive: {
    color: '#141416',
  },
  detailField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
    marginTop: Spacing.sm,
  },
  detailFieldLabel: {
    color: Colors.textMuted,
    fontSize: FontSize.sm,
  },
  detailFieldValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailFieldValue: {
    color: Colors.text,
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.background,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.border,
  },
});
