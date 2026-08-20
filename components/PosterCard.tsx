import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors, FontSize, Radius, Spacing } from '@/constants/theme';
import type { Movie } from '@/data/movies';

const CARD_WIDTH = 148;
const CARD_HEIGHT = 210;

type PosterCardProps = {
  movie: Movie;
  variant: 'nowPlaying' | 'comingSoon';
  onPress?: () => void;
};

export function PosterCard({ movie, variant, onPress }: PosterCardProps) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={[styles.poster, { backgroundColor: movie.placeholderColor }]}>
        {movie.poster ? (
          <Image source={movie.poster} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
        ) : (
          <Ionicons
            name="film-outline"
            size={28}
            color="rgba(0,0,0,0.35)"
            style={styles.placeholderIcon}
          />
        )}

        {variant === 'comingSoon' && (
          <Pressable hitSlop={8} style={styles.heartButton}>
            <Ionicons name="heart-outline" size={16} color={Colors.white} />
          </Pressable>
        )}

        {variant === 'nowPlaying' ? (
          <View style={styles.timesRow}>
            {movie.showtimes.slice(0, 3).map((show) => (
              <View key={show.time} style={styles.timePill}>
                <Text style={styles.timePillText}>{show.time}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Pressable style={styles.bookNowButton} onPress={onPress}>
            <Text style={styles.bookNowText}>Book Now</Text>
          </Pressable>
        )}
      </View>

      {variant === 'nowPlaying' ? (
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>{movie.duration}</Text>
          <Text style={styles.metaText}>{movie.ageRating}</Text>
        </View>
      ) : null}
      <Text style={styles.title} numberOfLines={1}>
        {movie.title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
  },
  poster: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: Radius.lg,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  placeholderIcon: {
    position: 'absolute',
    top: '40%',
    alignSelf: 'center',
  },
  heartButton: {
    position: 'absolute',
    top: Spacing.sm,
    right: Spacing.sm,
  },
  timesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    padding: Spacing.sm,
  },
  timePill: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  timePillText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '700',
  },
  bookNowButton: {
    margin: Spacing.sm,
    backgroundColor: Colors.primary,
    borderRadius: Radius.sm,
    paddingVertical: 8,
    alignItems: 'center',
  },
  bookNowText: {
    color: Colors.white,
    fontSize: FontSize.xs,
    fontWeight: '700',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
  },
  metaText: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
  },
  title: {
    color: Colors.text,
    fontSize: FontSize.sm,
    fontWeight: '600',
    marginTop: 4,
  },
});
