import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Radius } from '@/constants/theme';

type SocialButtonProps = {
  icon: 'logo-facebook' | 'logo-google';
  onPress?: () => void;
};

export function SocialButton({ icon, onPress }: SocialButtonProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
      <Ionicons name={icon} size={20} color="#141416" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 52,
    height: 52,
    borderRadius: Radius.md,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.8,
  },
});
