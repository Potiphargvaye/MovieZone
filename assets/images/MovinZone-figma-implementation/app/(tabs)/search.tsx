import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, FontSize, Spacing } from '@/constants/theme';

// Note: the Figma kit doesn't include a dedicated Search/Browse screen,
// but the bottom tab bar on the Account screen shows 3 tabs (Home, Search,
// Profile), so this tab needs a destination. Kept intentionally minimal
// rather than inventing new UI that isn't in the design.
export default function SearchScreen() {
  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.content}>
        <Ionicons name="search-outline" size={32} color={Colors.textMuted} />
        <Text style={styles.title}>Search</Text>
        <Text style={styles.subtitle}>
          A dedicated search screen wasn&apos;t included in the shared Figma frames.
        </Text>
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
    gap: Spacing.sm,
  },
  title: {
    color: Colors.text,
    fontSize: FontSize.lg,
    fontWeight: '700',
  },
  subtitle: {
    color: Colors.textMuted,
    fontSize: FontSize.sm,
    textAlign: 'center',
  },
});
