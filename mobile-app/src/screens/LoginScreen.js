import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Alert, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp, FadeInDown, FadeIn, ZoomIn } from 'react-native-reanimated';
import { COLORS, GRADIENTS } from '../constants/Theme';
import { TRANSLATIONS } from '../constants/Translations';
import GlassCard from '../components/GlassCard';
import { User, Lock, Mail, ArrowLeft, ArrowRight, ShieldCheck, Cpu } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [lang, setLang] = useState('uz');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [clickCount, setClickCount] = useState(0);
  const t = TRANSLATIONS[lang] || TRANSLATIONS['uz'];

  const handleLogin = () => {
    const trimmedUser = username.trim().toLowerCase();
    
    if (!trimmedUser || !password) {
      Alert.alert("Xato", "Login va parolni kiriting!");
      return;
    }

    const testUsers = {
      'admin': { pass: 'admin123', role: 'admin' },
      'teacher': { pass: '123', role: 'teacher' },
      'student': { pass: '123', role: 'student' },
      'uni': { pass: 'uni123', role: 'university' },
      'madina': { pass: '123', role: 'student' }
    };

    const user = testUsers[trimmedUser];

    if (user && user.pass === password) {
      Alert.alert("Xush kelibsiz!", "Tizimga muvaffaqiyatli kirdingiz.");
      navigation.reset({
        index: 0,
        routes: [{ 
          name: 'Main', 
          params: { role: user.role } 
        }],
      });
    } else {
      Alert.alert("Xato", "Login yoki parol noto'g'ri!");
    }
  };

  const quickLogin = (u, p) => {
    setUsername(u);
    setPassword(p);
  };

  const onLogoPress = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= 3) {
      Alert.alert(
        "Admin Rejimi",
        "Test parollari:\n\nAdmin: admin / admin123\nStudent: student / 123\nTeacher: teacher / 123"
      );
      setClickCount(0);
    }
    setTimeout(() => setClickCount(0), 3000);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={GRADIENTS.background} style={StyleSheet.absoluteFill} />
      
      {/* Glow effects */}
      <View style={[styles.glow, styles.glow1]} />
      <View style={[styles.glow, styles.glow2]} />

      <SafeAreaView style={styles.safeArea}>
        <Animated.View entering={FadeIn.duration(800)} style={styles.headerNav}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.securityBadge}>
             <ShieldCheck size={16} color={COLORS.success} />
             <Text style={styles.securityText}>256-bit AES Secure</Text>
          </View>
        </Animated.View>

        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.content}
        >
          <TouchableOpacity onPress={onLogoPress}>
            <Animated.View entering={ZoomIn.delay(200).duration(800)} style={styles.logoWrapper}>
               <LinearGradient colors={GRADIENTS.primary} style={styles.logoIcon}>
                  <Cpu size={32} color="#fff" />
               </LinearGradient>
               <Text style={styles.logoText}>EduGravity</Text>
            </Animated.View>
          </TouchableOpacity>

          <Animated.View entering={FadeInUp.delay(400).duration(800)} style={styles.header}>
            <Text style={styles.title}>Tizimga Kirish</Text>
            <Text style={styles.subtitle}>Blockchain asosidagi ta'lim ekotizimi</Text>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(600).duration(1000)}>
            <GlassCard style={styles.loginCard}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Login yoki Email</Text>
                <View style={styles.inputContainer}>
                  <User size={20} color="rgba(255,255,255,0.4)" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="student / teacher / admin"
                    placeholderTextColor="rgba(255,255,255,0.2)"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Parol</Text>
                <View style={styles.inputContainer}>
                  <Lock size={20} color="rgba(255,255,255,0.4)" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="********"
                    placeholderTextColor="rgba(255,255,255,0.2)"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>
              </View>

              <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                <LinearGradient colors={GRADIENTS.primary} style={styles.gradientBtn}>
                   <Text style={styles.btnText}>Tizimga Kirish</Text>
                   <ArrowRight size={20} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            </GlassCard>

            <View style={styles.testSection}>
               <Text style={styles.testTitle}>Tezkor Sinov (Dev Only):</Text>
               <View style={styles.testButtons}>
                  <TouchableOpacity onPress={() => quickLogin('student', '123')} style={styles.testBtn}><Text style={styles.testBtnText}>Talaba</Text></TouchableOpacity>
                  <TouchableOpacity onPress={() => quickLogin('teacher', '123')} style={styles.testBtn}><Text style={styles.testBtnText}>Ustoz</Text></TouchableOpacity>
                  <TouchableOpacity onPress={() => quickLogin('admin', 'admin123')} style={styles.testBtn}><Text style={styles.testBtnText}>Admin</Text></TouchableOpacity>
               </View>
            </View>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(800).duration(800)} style={styles.footer}>
            <Text style={styles.footerText}>Hali profil yo'qmi? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerLink}>Ro'yxatdan o'tish</Text>
            </TouchableOpacity>
          </Animated.View>

        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgDark,
  },
  safeArea: {
    flex: 1,
  },
  headerNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  backBtn: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0, 255, 136, 0.05)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 136, 0.2)',
  },
  securityText: {
    fontSize: 10,
    color: COLORS.success,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    justifyContent: 'center',
    paddingBottom: 50,
  },
  logoWrapper: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoIcon: {
    width: 70,
    height: 70,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  logoText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: -1,
  },
  glow: {
    position: 'absolute',
    width: width * 1,
    height: width * 1,
    borderRadius: width * 0.5,
    opacity: 0.1,
  },
  glow1: { backgroundColor: COLORS.primary, top: -100, right: -100 },
  glow2: { backgroundColor: COLORS.secondary, bottom: -100, left: -100 },
  header: {
    marginBottom: 35,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textMuted,
    textAlign: 'center',
    fontWeight: '600',
  },
  loginCard: {
    padding: 25,
    borderRadius: 28,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 8,
    textTransform: 'uppercase',
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 15,
    paddingHorizontal: 16,
    height: 58,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  loginBtn: {
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    marginTop: 10,
  },
  gradientBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  btnText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#fff',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 35,
  },
  footerText: {
    fontSize: 14,
    color: COLORS.textMuted,
  },
  registerLink: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '900',
  },
  testSection: {
    marginTop: 25,
    alignItems: 'center',
  },
  testTitle: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.4)',
    fontWeight: '800',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  testButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  testBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  testBtnText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.6)',
    fontWeight: '700',
  },
});

export default LoginScreen;
