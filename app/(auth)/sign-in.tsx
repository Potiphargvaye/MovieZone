import { router } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppButton } from '@/components/AppButton';
import { AppTextInput } from '@/components/AppTextInput';
import { SocialButton } from '@/components/SocialButton';
import { Colors, FontSize, Spacing } from '@/constants/theme';

export default function SignInScreen() {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled">
          <Text style={styles.logo}>
            Movie<Text style={styles.logoAccent}>zone</Text>
          </Text>

          <View style={styles.heading}>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Please sign in to your account to continue</Text>
          </View>

          <View style={styles.form}>
            <AppTextInput
              placeholder="Email / Phone Number"
              value={emailOrPhone}
              onChangeText={setEmailOrPhone}
              keyboardType="email-address"
            />
            <AppTextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureToggle
              secureTextEntry
            />
          </View>

          <AppButton
            label="Sign In"
            style={styles.signInButton}
            onPress={() => router.replace('/(tabs)')}
          />

          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Or sign in with</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialRow}>
            <SocialButton icon="logo-facebook" />
            <SocialButton icon="logo-google" />
          </View>

          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Not registered yet? </Text>
            <Text style={styles.footerLink} onPress={() => router.push('/(auth)/sign-up')}>
              Sign Up
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  logo: {
    color: Colors.text,
    fontSize: FontSize.xl,
    fontWeight: '800',
    textAlign: 'center',
  },
  logoAccent: {
    color: Colors.primary,
  },
  heading: {
    marginTop: Spacing.xl,
    alignItems: 'center',
  },
  title: {
    color: Colors.text,
    fontSize: FontSize.xxl,
    fontWeight: '700',
  },
  subtitle: {
    color: Colors.textMuted,
    fontSize: FontSize.sm,
    marginTop: Spacing.sm,
    textAlign: 'center',
    paddingHorizontal: Spacing.md,
  },
  form: {
    marginTop: Spacing.xxl,
    gap: Spacing.md,
  },
  signInButton: {
    marginTop: Spacing.lg,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.xl,
    gap: Spacing.sm,
  },
  dividerLine: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.border,
  },
  dividerText: {
    color: Colors.textMuted,
    fontSize: FontSize.xs,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.md,
    marginTop: Spacing.lg,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.xl,
  },
  footerText: {
    color: Colors.textMuted,
    fontSize: FontSize.sm,
  },
  footerLink: {
    color: Colors.primary,
    fontSize: FontSize.sm,
    fontWeight: '700',
  },
});
