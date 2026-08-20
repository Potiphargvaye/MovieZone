import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { FontSize, Radius } from '@/constants/theme';

export function RatingBadge({ rating }: { rating: number }) {
  return (
    <View style={styles.badge}>
      <Ionicons name="star" size={11} color="#141416" />
      <Text style={styles.text}>{rating.toFixed(1)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: Radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  text: {
    color: '#141416',
    fontSize: FontSize.xs,
    fontWeight: '700',
  },
});
