import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, Dimensions, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp, FadeInDown, ZoomIn } from 'react-native-reanimated';
import { COLORS, GRADIENTS } from '../constants/Theme';
import GlassCard from '../components/GlassCard';
import { User, Mail, Settings, LogOut, ShieldCheck, ChevronRight, Bell, CreditCard } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const ProfileScreen = ({ navigation, route }) => {
  const { role } = route.params || { role: 'student' };

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main', params: { role: 'guest' } }],
    });
  };

  const menuItems = [
    { id: '1', title: 'Shaxsiy ma\'lumotlar', icon: User, color: COLORS.primary },
    { id: '2', title: 'Bildirishnomalar', icon: Bell, color: COLORS.secondary },
    { id: '3', title: 'To\'lovlar tarixi', icon: CreditCard, color: COLORS.success },
    { id: '4', title: 'Xavfsizlik', icon: ShieldCheck, color: '#FFD700' },
    { id: '5', title: 'Sozlamalar', icon: Settings, color: '#fff' },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={GRADIENTS.background} style={StyleSheet.absoluteFill} />
      
      {/* Glow backgrounds */}
      <View style={[styles.glow, styles.glow1]} />
      <View style={[styles.glow, styles.glow2]} />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Profile Header */}
          <Animated.View entering={FadeInDown.duration(800)} style={styles.profileHeader}>
            <View style={styles.avatarWrapper}>
              <LinearGradient colors={GRADIENTS.primary} style={styles.avatarGradient}>
                <User size={40} color="#fff" />
              </LinearGradient>
              <View style={styles.onlineBadge} />
            </View>
            <Text style={styles.userName}>Sardor Karimov</Text>
            <Text style={styles.userRole}>{role.charAt(0).toUpperCase() + role.slice(1)} • AI Talent</Text>
          </Animated.View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            {[
              { label: 'Reyting', value: '942' },
              { label: 'Bloklar', value: '1.2k' },
              { label: 'Yutuqlar', value: '12' },
            ].map((stat, i) => (
              <Animated.View key={i} entering={ZoomIn.delay(300 + i * 100).duration(600)} style={styles.statItem}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </Animated.View>
            ))}
          </View>

          {/* Menu Section */}
          <Animated.View entering={FadeInUp.delay(500).duration(800)}>
            <GlassCard style={styles.menuCard}>
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <TouchableOpacity 
                    key={item.id} 
                    style={[styles.menuItem, index === menuItems.length - 1 && { borderBottomWidth: 0 }]}
                  >
                    <View style={[styles.menuIconBox, { backgroundColor: `${item.color}20` }]}>
                      <Icon size={20} color={item.color} />
                    </View>
                    <Text style={styles.menuTitle}>{item.title}</Text>
                    <ChevronRight size={18} color="rgba(255,255,255,0.2)" />
                  </TouchableOpacity>
                );
              })}
            </GlassCard>
          </Animated.View>

          {/* Logout Button */}
          <Animated.View entering={FadeInUp.delay(800).duration(800)}>
            <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
              <LogOut size={20} color="#FF4B2B" />
              <Text style={styles.logoutText}>Tizimdan Chiqish</Text>
            </TouchableOpacity>
          </Animated.View>

          <Text style={styles.footerText}>Version 4.2.0 • EduGravity Secure</Text>

        </ScrollView>
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
  glow: {
    position: 'absolute',
    width: width * 1.2,
    height: width * 1.2,
    borderRadius: width * 0.6,
    opacity: 0.1,
  },
  glow1: {
    backgroundColor: COLORS.primary,
    top: -height * 0.2,
    right: -width * 0.2,
  },
  glow2: {
    backgroundColor: COLORS.secondary,
    bottom: -height * 0.2,
    left: -width * 0.2,
  },
  scrollContent: {
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingBottom: 120,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 35,
  },
  avatarWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    padding: 3,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginBottom: 20,
    position: 'relative',
  },
  avatarGradient: {
    flex: 1,
    borderRadius: 47,
    alignItems: 'center',
    justifyContent: 'center',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.success,
    borderWidth: 3,
    borderColor: COLORS.bgDark,
  },
  userName: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: -0.5,
  },
  userRole: {
    fontSize: 13,
    color: COLORS.textMuted,
    marginTop: 6,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '900',
    color: '#fff',
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 4,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  menuCard: {
    padding: 10,
    borderRadius: 24,
    marginBottom: 25,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    gap: 15,
  },
  menuIconBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 75, 43, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 75, 43, 0.2)',
    marginBottom: 30,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FF4B2B',
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
    color: 'rgba(255,255,255,0.2)',
    fontWeight: '600',
  },
});

export default ProfileScreen;
