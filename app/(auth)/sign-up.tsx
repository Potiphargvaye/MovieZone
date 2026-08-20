import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
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

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);

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
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Lets get you started and create your account</Text>
          </View>

          <View style={styles.form}>
            <AppTextInput placeholder="Name" value={name} onChangeText={setName} />
            <AppTextInput placeholder="Surname" value={surname} onChangeText={setSurname} />
            <AppTextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <AppTextInput
              placeholder="Phone Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            <AppTextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureToggle
              secureTextEntry
            />
          </View>

          <Pressable style={styles.agreementRow} onPress={() => setAgreed((prev) => !prev)}>
            <View style={[styles.checkbox, agreed && styles.checkboxChecked]}>
              {agreed && <Ionicons name="checkmark" size={13} color={Colors.white} />}
            </View>
            <Text style={styles.agreementText}>
              Yes, I understand and agree to the Moviezone Terms of Service, including the{' '}
              <Text style={styles.agreementLink}>User Agreement and Privacy Policy</Text>.
            </Text>
          </Pressable>

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
    marginTop: Spacing.xl,
    gap: Spacing.md,
  },
  agreementRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: Spacing.lg,
    gap: Spacing.sm,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.textMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  agreementText: {
    flex: 1,
    color: Colors.textMuted,
    fontSize: FontSize.xs,
    lineHeight: 18,
  },
  agreementLink: {
    color: Colors.primary,
    fontWeight: '700',
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
