import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Pressable, StyleSheet, Text, ViewStyle } from 'react-native';

import { Colors, Radius, FontSize } from '@/constants/theme';

type AppButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'outline';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  icon?: keyof typeof Ionicons.glyphMap;
};

export function AppButton({
  label,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
  icon,
}: AppButtonProps) {
  const isOutline = variant === 'outline';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        isOutline ? styles.outline : styles.primary,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={Colors.white} />
      ) : (
        <>
          {icon && (
            <Ionicons
              name={icon}
              size={16}
              color={isOutline ? Colors.text : Colors.white}
              style={styles.icon}
            />
          )}
          <Text style={[styles.label, isOutline && styles.outlineLabel]}>{label}</Text>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 52,
    borderRadius: Radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  icon: {
    marginRight: 8,
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    color: Colors.white,
    fontSize: FontSize.md,
    fontWeight: '700',
  },
  outlineLabel: {
    color: Colors.text,
  },
});
