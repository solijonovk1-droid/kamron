import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Alert, ScrollView, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp, FadeInDown, FadeIn, ZoomIn } from 'react-native-reanimated';
import { COLORS, GRADIENTS } from '../constants/Theme';
import GlassCard from '../components/GlassCard';
import { User, Lock, Mail, ArrowLeft, ArrowRight, GraduationCap, Briefcase, Building, ShieldCheck } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');

  const handleRegister = () => {
    if (!name || !username || !password) {
      Alert.alert("Xato", "Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }
    
    Alert.alert("Tabriklaymiz!", "Ro'yxatdan o'tish muvaffaqiyatli yakunlandi. Endi tizimga kiring.");
    navigation.navigate('Login');
  };

  const roles = [
    { id: 'student', name: 'Talaba', icon: GraduationCap },
    { id: 'teacher', name: "Ustoz", icon: Briefcase },
    { id: 'university', name: 'OTM', icon: Building },
  ];

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
             <Text style={styles.securityText}>Haqiqiy Vaqtda Himoya</Text>
          </View>
        </Animated.View>

        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
        >
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            <Animated.View entering={FadeInUp.delay(200).duration(800)} style={styles.header}>
               <Text style={styles.title}>Yangi Profil Ochish</Text>
               <Text style={styles.subtitle}>EduGravity tizimining barcha imkoniyatlaridan foydalaning</Text>
            </Animated.View>

            <Animated.View entering={FadeInUp.delay(400).duration(1000)}>
              <GlassCard style={styles.regCard}>
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>F.I.SH (To'liq ismingiz)</Text>
                  <View style={styles.inputContainer}>
                    <User size={20} color="rgba(255,255,255,0.4)" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Masalan: Aziz Rahimov"
                      placeholderTextColor="rgba(255,255,255,0.2)"
                      value={name}
                      onChangeText={setName}
                    />
                  </View>
                </View>

                <Text style={styles.label}>Rolni Tanlang</Text>
                <View style={styles.roleGrid}>
                  {roles.map((item) => {
                    const Icon = item.icon;
                    const isActive = role === item.id;
                    return (
                      <TouchableOpacity 
                        key={item.id} 
                        style={[styles.roleBox, isActive && styles.roleBoxActive]}
                        onPress={() => setRole(item.id)}
                      >
                         <Icon size={24} color={isActive ? COLORS.primary : "rgba(255,255,255,0.3)"} />
                         <Text style={[styles.roleName, isActive && styles.roleNameActive]}>{item.name}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Login (Foydalanuvchi nomi)</Text>
                  <View style={styles.inputContainer}>
                    <Mail size={20} color="rgba(255,255,255,0.4)" style={styles.inputIcon} />
                    <TextInput
                      style={styles.input}
                      placeholder="Masalan: aziz123"
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

                <TouchableOpacity style={styles.regBtn} onPress={handleRegister}>
                  <LinearGradient colors={GRADIENTS.primary} style={styles.gradientBtn}>
                    <Text style={styles.btnText}>Ro'yxatdan O'tish</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </GlassCard>
            </Animated.View>

            <Animated.View entering={FadeInDown.delay(600).duration(800)} style={styles.footer}>
              <Text style={styles.footerText}>Profilingiz bormi? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Kirish</Text>
              </TouchableOpacity>
            </Animated.View>
          </ScrollView>
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
  glow: {
    position: 'absolute',
    width: width * 1,
    height: width * 1,
    borderRadius: width * 0.5,
    opacity: 0.1,
  },
  glow1: { backgroundColor: COLORS.secondary, top: -100, right: -100 },
  glow2: { backgroundColor: COLORS.success, bottom: -100, left: -100 },
  scrollContent: {
    paddingHorizontal: 25,
    paddingBottom: 40,
    paddingTop: 20,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: -1,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textMuted,
    textAlign: 'center',
    fontWeight: '600',
  },
  regCard: {
    padding: 25,
    borderRadius: 28,
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 12,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 10,
    marginLeft: 4,
    textTransform: 'uppercase',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 15,
    paddingHorizontal: 18,
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
  roleGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  roleBox: {
    flex: 1,
    height: 90,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  roleBoxActive: {
    borderColor: COLORS.primary,
    backgroundColor: 'rgba(0, 210, 255, 0.05)',
  },
  roleName: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.4)',
    fontWeight: '800',
    marginTop: 8,
    textTransform: 'uppercase',
  },
  roleNameActive: {
    color: COLORS.primary,
  },
  regBtn: {
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    marginTop: 10,
  },
  gradientBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 16,
    fontWeight: '900',
    color: '#fff',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  footerText: {
    fontSize: 14,
    color: COLORS.textMuted,
  },
  loginLink: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '900',
  },
});

export default RegisterScreen;
