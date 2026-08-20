import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { Colors } from '@/constants/theme';

type BackButtonProps = {
  onPress?: () => void;
  color?: string;
};

export function BackButton({ onPress, color = Colors.text }: BackButtonProps) {
  return (
    <Pressable
      onPress={onPress ?? (() => router.back())}
      hitSlop={12}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
      <Ionicons name="arrow-back" size={22} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.6,
  },
});
