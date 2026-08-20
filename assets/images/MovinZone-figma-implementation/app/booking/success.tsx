import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppButton } from '@/components/AppButton';
import { Colors, FontSize, Spacing } from '@/constants/theme';
import { bookingStore, useBookingState } from '@/state/booking-store';

export default function BookingSuccessScreen() {
  const booking = useBookingState();
  const { location } = useLocalSearchParams<{ location?: string }>();

  const handleProceed = () => {
    bookingStore.reset();
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <Ionicons name="checkmark" size={40} color={Colors.background} />
        </View>

        <Text style={styles.title}>Success!</Text>
        <Text style={styles.subtitle}>Your seat has been reserved.</Text>

        <Text style={styles.detail}>
          Be sure to show up at <Text style={styles.bold}>{location ?? 'Gables, Eswatini'}</Text> on{' '}
          <Text style={styles.bold}>{booking.date || 'your selected date'}</Text> with the details of
          your ticket purchase!
        </Text>

        <AppButton label="Proceed" onPress={handleProceed} style={styles.button} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
  },
  iconCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: Colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  title: {
    color: Colors.text,
    fontSize: FontSize.xxl,
    fontWeight: '700',
  },
  subtitle: {
    color: Colors.textMuted,
    fontSize: FontSize.md,
    marginTop: Spacing.sm,
  },
  detail: {
    color: Colors.textMuted,
    fontSize: FontSize.sm,
    textAlign: 'center',
    marginTop: Spacing.lg,
    lineHeight: 20,
  },
  bold: {
    color: Colors.text,
    fontWeight: '700',
  },
  button: {
    marginTop: Spacing.xxl,
    paddingHorizontal: Spacing.xxl,
  },
});
