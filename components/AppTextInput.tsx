import { useState } from 'react';
import { StyleSheet, TextInput, TextInputProps, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Colors, Radius, FontSize } from '@/constants/theme';

type AppTextInputProps = TextInputProps & {
  secureToggle?: boolean;
};

export function AppTextInput({ secureToggle, secureTextEntry, style, ...rest }: AppTextInputProps) {
  const [hidden, setHidden] = useState(!!secureTextEntry);

  return (
    <View style={styles.wrapper}>
      <TextInput
        placeholderTextColor={Colors.placeholder}
        style={[styles.input, secureToggle && styles.inputWithIcon, style]}
        secureTextEntry={secureToggle ? hidden : secureTextEntry}
        autoCapitalize="none"
        {...rest}
      />
      {secureToggle && (
        <Pressable
          onPress={() => setHidden((prev) => !prev)}
          hitSlop={12}
          style={styles.iconButton}>
          <Ionicons
            name={hidden ? 'eye-off-outline' : 'eye-outline'}
            size={18}
            color={Colors.textMuted}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    height: 52,
    borderRadius: Radius.md,
    backgroundColor: Colors.card,
    paddingHorizontal: 18,
    color: Colors.text,
    fontSize: FontSize.md,
  },
  inputWithIcon: {
    paddingRight: 44,
  },
  iconButton: {
    position: 'absolute',
    right: 16,
  },
});
