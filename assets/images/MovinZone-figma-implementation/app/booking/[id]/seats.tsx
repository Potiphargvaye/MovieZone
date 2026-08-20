import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppButton } from '@/components/AppButton';
import { BackButton } from '@/components/BackButton';
import { Colors, FontSize, Radius, Spacing } from '@/constants/theme';
import { getMovieById } from '@/data/movies';
import { bookingStore, useBookingState } from '@/state/booking-store';

const ROWS = ['A', 'B', 'C', 'D', 'E'];
const COLUMNS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// Static mock of already-reserved seats, matching the seat map shown in Figma.
const RESERVED_SEATS = new Set([
  'A1', 'A2',
  'C1', 'C2', 'C3', 'C8', 'C9',
  'D1', 'D7', 'D8', 'D9',
  'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9',
]);

export default function SeatSelectionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const movie = getMovieById(id);
  const booking = useBookingState();

  const subtotal = useMemo(
    () => (movie ? movie.ticketPrice * booking.seats.length : 0),
    [movie, booking.seats.length]
  );

  if (!movie) {
    return (
      <SafeAreaView style={styles.root}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundText}>Movie not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleSeatPress = (seatId: string) => {
    if (RESERVED_SEATS.has(seatId)) return;
    bookingStore.toggleSeat(seatId);
  };

  const handlePay = () => {
    if (booking.seats.length === 0) return;
    router.push({
      pathname: '/booking/success',
      params: { location: 'Gables, Eswatini' },
    });
  };

  return (
    <View style={styles.root}>
      <SafeAreaView edges={['top']} style={styles.header}>
        <BackButton />
        <Text style={styles.headerTitle}>Choose your seat</Text>
        <View style={{ width: 22 }} />
      </SafeAreaView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.screenBanner}>
          <Text style={styles.screenBannerText}>Screen</Text>
        </View>

        <View style={styles.seatMap}>
          {ROWS.map((row) => (
            <View key={row} style={styles.seatRow}>
              <Text style={styles.rowLabel}>{row}</Text>
              <View style={styles.seatRowSeats}>
                {COLUMNS.map((col) => {
                  const seatId = `${row}${col}`;
                  const reserved = RESERVED_SEATS.has(seatId);
                  const selected = booking.seats.includes(seatId);
                  return (
                    <Pressable
                      key={seatId}
                      onPress={() => handleSeatPress(seatId)}
                      disabled={reserved}
                      style={[
                        styles.seatDot,
                        reserved && styles.seatReserved,
                        selected && styles.seatSelected,
                        col === 4 && styles.seatAisle,
                      ]}
                    />
                  );
                })}
              </View>
            </View>
          ))}
          <View style={styles.columnLabels}>
            <Text style={styles.rowLabel} />
            <View style={styles.seatRowSeats}>
              {COLUMNS.map((col) => (
                <Text key={col} style={[styles.colLabel, col === 4 && styles.seatAisle]}>
                  {col}
                </Text>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.legendRow}>
          <LegendItem color={Colors.available} label="Available" />
          <LegendItem color={Colors.reserved} label="Reserved" />
          <LegendItem color={Colors.selected} label="Selected" />
        </View>

        <View style={styles.purchaseCard}>
          <Text style={styles.purchaseLogo}>
            Movie<Text style={styles.purchaseLogoAccent}>zone</Text>
          </Text>
          <Text style={styles.purchaseSubtitle}>Ticket Purchase</Text>

          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={14} color={Colors.textMuted} />
            <Text style={styles.locationText}>Gables, Eswatini</Text>
          </View>

          <View style={styles.summaryRow}>
            <View style={styles.summaryDate}>
              <Text style={styles.summaryLabel}>Date</Text>
              <Text style={styles.summaryValue}>{booking.date || '—'}</Text>
            </View>
            <View style={styles.summaryChip}>
              <Text style={styles.summaryLabel}>Time</Text>
              <Text style={styles.summaryValue}>{booking.time || '—'}</Text>
            </View>
            <View style={styles.summaryChip}>
              <Text style={styles.summaryLabel}>Seats</Text>
              <Text style={[styles.summaryValue, styles.summarySeats]}>
                {booking.seats.length ? booking.seats.join(', ') : '—'}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <LineItem
            label="Movie Ticket"
            price={`£${movie.ticketPrice.toFixed(2)}`}
            qty={String(booking.seats.length)}
            total={`£${subtotal.toFixed(2)}`}
          />
          <LineItem label="3d Glasses" price="-" qty="-" total="-" />
          <LineItem label="Subtotal" price="" qty="" total={`£${subtotal.toFixed(2)}`} />

          <View style={styles.divider} />

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Payment</Text>
            <Text style={styles.totalValue}>£{subtotal.toFixed(2)}</Text>
          </View>

          <AppButton
            label="Pay"
            icon="cart-outline"
            style={styles.payButton}
            disabled={booking.seats.length === 0}
            onPress={handlePay}
          />
        </View>
      </ScrollView>
    </View>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendDot, { backgroundColor: color }]} />
      <Text style={styles.legendText}>{label}</Text>
    </View>
  );
}

function LineItem({
  label,
  price,
  qty,
  total,
}: {
  label: string;
  price: string;
  qty: string;
  total: string;
}) {
  return (
    <View style={styles.lineItemRow}>
      <Text style={styles.lineItemLabel}>{label}</Text>
      {price ? <Text style={styles.lineItemMuted}>{price}</Text> : null}
      {qty ? <Text style={styles.lineItemMuted}>{qty}</Text> : null}
      <Text style={styles.lineItemValue}>{total}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  notFound: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFoundText: {
    color: Colors.text,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  headerTitle: {
    color: Colors.text,
    fontSize: FontSize.lg,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  screenBanner: {
    height: 40,
    backgroundColor: Colors.primary,
    borderRadius: Radius.xl,
    marginTop: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  screenBannerText: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: FontSize.sm,
  },
  seatMap: {
    marginTop: Spacing.xl,
    gap: Spacing.sm,
  },
  seatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  rowLabel: {
    width: 14,
    color: Colors.textMuted,
    fontSize: FontSize.xs,
  },
  seatRowSeats: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  seatDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.available,
  },
  seatReserved: {
    backgroundColor: Colors.reserved,
  },
  seatSelected: {
    backgroundColor: Colors.selected,
  },
  seatAisle: {
    marginLeft: Spacing.md,
  },
  columnLabels: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: 2,
  },
  colLabel: {
    width: 20,
    textAlign: 'center',
    color: Colors.textFaint,
    fontSize: 10,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.lg,
    marginTop: Spacing.xl,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
  },
  purchaseCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    marginTop: Spacing.xl,
  },
  purchaseLogo: {
    color: Colors.text,
    fontSize: FontSize.lg,
    fontWeight: '800',
  },
  purchaseLogoAccent: {
    color: Colors.primary,
  },
  purchaseSubtitle: {
    color: Colors.textMuted,
    fontSize: FontSize.sm,
    marginTop: 2,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: Spacing.md,
  },
  locationText: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  summaryDate: {
    flex: 1,
    justifyContent: 'center',
  },
  summaryChip: {
    backgroundColor: Colors.cardAlt,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.sm,
    flex: 1,
  },
  summaryLabel: {
    color: Colors.textMuted,
    fontSize: 10,
  },
  summaryValue: {
    color: Colors.text,
    fontSize: FontSize.sm,
    fontWeight: '700',
    marginTop: 2,
  },
  summarySeats: {
    color: Colors.selected,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.border,
    marginVertical: Spacing.md,
  },
  lineItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  lineItemLabel: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
    flex: 1,
  },
  lineItemMuted: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
    width: 40,
    textAlign: 'right',
  },
  lineItemValue: {
    color: Colors.text,
    fontSize: FontSize.xs,
    width: 60,
    textAlign: 'right',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: {
    color: Colors.text,
    fontSize: FontSize.md,
    fontWeight: '700',
  },
  totalValue: {
    color: Colors.text,
    fontSize: FontSize.md,
    fontWeight: '700',
  },
  payButton: {
    marginTop: Spacing.lg,
  },
});
