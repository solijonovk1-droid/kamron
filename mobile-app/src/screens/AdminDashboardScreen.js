import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, TextInput, Dimensions, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp, FadeInDown, ZoomIn, FadeInLeft, FadeInRight } from 'react-native-reanimated';
import { COLORS, GRADIENTS } from '../constants/Theme';
import GlassCard from '../components/GlassCard';
import { LayoutDashboard, Users, GraduationCap, Briefcase, Search, Filter, Settings, Activity, ShieldAlert, Cpu } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const AdminDashboardScreen = ({ navigation }) => {
  const users = [
    { id: '1', name: 'Sardor Karimov', role: 'Talaba', code: '#80-245', initials: 'SK', active: true, color: COLORS.primary },
    { id: '2', name: 'Prof. Alisherov N.', role: "O'qituvchi", code: '#TE-101', initials: 'AN', active: false, color: COLORS.secondary },
    { id: '3', name: 'Madina Akramova', role: 'Talaba', code: '#80-248', initials: 'MA', active: true, color: COLORS.success },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={GRADIENTS.background} style={StyleSheet.absoluteFill} />
      
      {/* Glow backgrounds */}
      <View style={[styles.glow, styles.glow1]} />
      <View style={[styles.glow, styles.glow2]} />

      <SafeAreaView style={styles.safeArea}>
        <Animated.View entering={FadeInDown.duration(800)} style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Admin Markazi</Text>
            <TouchableOpacity onPress={() => import('react-native').then(({ Alert }) => Alert.alert("Tizim Ma'lumoti", "Siz eng yuqori darajadagi (Root) ruxsatga egasiz."))}>
               <Text style={styles.headerTag}>System Root Access</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.navActions}>
            <TouchableOpacity 
              style={styles.navIcon}
              onPress={() => import('react-native').then(({ Alert }) => Alert.alert("Xabar", "Server loglari yuklanmoqda..."))}
            >
              <Cpu size={20} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.navIcon}
              onPress={() => navigation.navigate('Profil')}
            >
              <Settings size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </Animated.View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <View style={styles.statsGrid}>
            <Animated.View entering={FadeInLeft.delay(300).duration(800)} style={{flex: 1}}>
              <GlassCard style={styles.statCard}>
                 <Users size={22} color={COLORS.primary} />
                 <Text style={styles.statValue}>1,240</Text>
                 <Text style={styles.statLabel}>Barcha Talabalar</Text>
              </GlassCard>
            </Animated.View>
            <Animated.View entering={FadeInRight.delay(300).duration(800)} style={{flex: 1}}>
              <GlassCard style={styles.statCard}>
                 <GraduationCap size={22} color={COLORS.secondary} />
                 <Text style={styles.statValue}>82</Text>
                 <Text style={styles.statLabel}>Faol Ustozlar</Text>
              </GlassCard>
            </Animated.View>
          </View>

          <Animated.View entering={FadeInUp.delay(500).duration(800)}>
            <Text style={styles.sectionTitle}>Foydalanuvchilar Boshqaruvi</Text>
            <View style={styles.searchBar}>
               <Search size={18} color={COLORS.textMuted} />
               <TextInput 
                  style={styles.searchInput} 
                  placeholder="ID yoki ism bo'yicha qidirish..." 
                  placeholderTextColor="rgba(255,255,255,0.3)"
               />
               <TouchableOpacity style={styles.filterBtn}>
                 <Filter size={18} color="#fff" />
               </TouchableOpacity>
            </View>

            <GlassCard style={styles.userListCard}>
               {users.map((user, index) => (
                 <Animated.View 
                   key={user.id} 
                   entering={FadeInUp.delay(700 + index * 100).duration(600)}
                   style={[styles.userItem, index === users.length - 1 && { borderBottomWidth: 0 }]}
                 >
                    <View style={[styles.avatarBox, {backgroundColor: user.color}]}>
                      <Text style={styles.avatarText}>{user.initials}</Text>
                    </View>
                    <View style={styles.userInfo}>
                       <Text style={styles.userName}>{user.name}</Text>
                       <Text style={styles.userRole}>{user.role} • {user.code}</Text>
                    </View>
                    <View style={[styles.statusDot, !user.active && {backgroundColor: 'rgba(255,255,255,0.2)'}]} />
                    <TouchableOpacity 
                      style={styles.editBtn}
                      onPress={() => import('react-native').then(({ Alert }) => Alert.alert("Tahrirlash", `${user.name} ma'lumotlarini o'zgartirish rejimi.`))}
                    >
                      <Text style={styles.editText}>Edit</Text>
                    </TouchableOpacity>
                 </Animated.View>
               ))}
            </GlassCard>
          </Animated.View>

          <Text style={styles.sectionTitle}>Tizim Nazorati</Text>
          <View style={styles.controlGrid}>
             <Animated.View entering={ZoomIn.delay(900).duration(800)} style={{flex: 1}}>
               <TouchableOpacity>
                 <GlassCard style={styles.controlCard}>
                    <Activity size={24} color={COLORS.success} />
                    <Text style={styles.controlTitle}>Server Status</Text>
                    <Text style={styles.controlSub}>Running smoothly</Text>
                 </GlassCard>
               </TouchableOpacity>
             </Animated.View>
             <Animated.View entering={ZoomIn.delay(1050).duration(800)} style={{flex: 1}}>
               <TouchableOpacity>
                 <GlassCard style={styles.controlCard}>
                    <ShieldAlert size={24} color={COLORS.primary} />
                    <Text style={styles.controlTitle}>Xavfsizlik</Text>
                    <Text style={styles.controlSub}>Logs are clear</Text>
                 </GlassCard>
               </TouchableOpacity>
             </Animated.View>
          </View>

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
    right: -width * 0.3,
  },
  glow2: {
    backgroundColor: COLORS.secondary,
    bottom: -height * 0.2,
    left: -width * 0.3,
  },
  header: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    marginTop: Platform.OS === 'android' ? 10 : 0,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: -0.5,
  },
  headerTag: {
    fontSize: 10,
    color: COLORS.primary,
    fontWeight: '800',
    backgroundColor: 'rgba(0, 210, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginTop: 4,
    width: 120,
    textAlign: 'center',
  },
  navActions: {
    flexDirection: 'row',
    gap: 12,
  },
  navIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 100,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 35,
  },
  statCard: {
    padding: 22,
    alignItems: 'center',
    borderRadius: 24,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    marginTop: 10,
  },
  statLabel: {
    fontSize: 10,
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#fff',
    marginTop: 10,
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 18,
    paddingHorizontal: 18,
    height: 56,
    marginBottom: 20,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  filterBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userListCard: {
    padding: 12,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    gap: 15,
  },
  avatarBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 14,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 2,
  },
  userRole: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.success,
  },
  editBtn: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  editText: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '800',
  },
  controlGrid: {
    flexDirection: 'row',
    gap: 15,
  },
  controlCard: {
    paddingVertical: 25,
    paddingHorizontal: 15,
    borderRadius: 24,
    alignItems: 'center',
  },
  controlTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#fff',
    marginTop: 12,
    textAlign: 'center',
  },
  controlSub: {
    fontSize: 10,
    color: COLORS.textMuted,
    marginTop: 4,
    fontWeight: '600',
  }
});

export default AdminDashboardScreen;
