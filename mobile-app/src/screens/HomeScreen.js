import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Dimensions, SafeAreaView, Platform, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Animated, { FadeInUp, FadeInDown, FadeInLeft, FadeInRight, ZoomIn } from 'react-native-reanimated';
import { COLORS, GRADIENTS } from '../constants/Theme';
import { TRANSLATIONS } from '../constants/Translations';
import GlassCard from '../components/GlassCard';
import ChatModal from '../components/ChatModal';
import { User, Bell, Globe, Moon, Sun, Briefcase, GraduationCap, ArrowRight, LayoutDashboard, Building, MessageCircle } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const [lang, setLang] = useState('uz');
  const [chatVisible, setChatVisible] = useState(false);
  const t = TRANSLATIONS[lang] || TRANSLATIONS['uz'];

  return (
    <View style={styles.container}>
      <LinearGradient colors={GRADIENTS.background} style={StyleSheet.absoluteFill} />
      
      {/* Dynamic Glow Backgrounds */}
      <View style={[styles.glow, styles.glow1]} />
      <View style={[styles.glow, styles.glow2]} />
      <View style={[styles.glow, styles.glow3]} />

      <SafeAreaView style={styles.safeArea}>
        {/* Animated Nav Bar */}
        <Animated.View entering={FadeInDown.delay(100).duration(800)} style={styles.navBarWrapper}>
           <BlurView intensity={25} tint="dark" style={styles.navBar}>
            <Text style={styles.logoText}>Edu<Text style={{color: COLORS.primary}}>Gravity</Text></Text>
            <View style={styles.navActions}>
              <TouchableOpacity style={styles.navIcon}><Moon size={18} color="#fff" /></TouchableOpacity>
              <TouchableOpacity style={styles.navIcon}><Globe size={18} color="#fff" /></TouchableOpacity>
              <TouchableOpacity style={styles.navIcon}><Bell size={18} color="#fff" /></TouchableOpacity>
            </View>
          </BlurView>
        </Animated.View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Hero Section */}
          <Animated.View entering={FadeInUp.delay(300).duration(1000)} style={styles.heroSection}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Bitirguncha Ish Kafolati 100%</Text>
            </View>
            <Text style={styles.heroTitle}>
              EduGravity <Text style={{ color: COLORS.primary }}>Intellektual</Text> Ta'lim Tizimi
            </Text>
            <Text style={styles.heroDesc}>
              Talabalar uchun baholar reytingi va o'qituvchilar uchun aqlli boshqaruv tizimi. Kelajakni bugun quring.
            </Text>
            
            <View style={styles.heroButtons}>
              <TouchableOpacity 
                 onPress={() => navigation.navigate('Login')}
                 style={styles.primaryBtn}
              >
                <LinearGradient colors={GRADIENTS.primary} style={styles.gradientBtn}>
                  <Text style={[styles.btnText, { color: '#fff' }]}>Karyerani Boshlash</Text>
                  <ArrowRight size={20} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.secondaryBtn}
                onPress={() => navigation.navigate('Jobs')}
              >
                <Text style={styles.btnText}>Vakansiyalar</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>

          {/* Blockchain Stats Section */}
          <View style={styles.blockchainSection}>
            <View style={styles.sectionBadge}>
              <Text style={styles.sectionBadgeText}>Xavfsizlik 100%</Text>
            </View>
            <Text style={styles.sectionMainTitle}>Shaffoflik & Blockchain</Text>
            <Text style={styles.sectionDesc}>Baholaringiz HEMIS bazasidan integratsiya qilingan va Blockchain tarmog'ida muhrlangan.</Text>
            
            <View style={styles.statsGrid}>
               {[
                 { label: 'Bloklar', value: '4M+' },
                 { label: 'OTMlar', value: '120' },
                 { label: 'Ishonch', value: '100%' },
               ].map((stat, i) => (
                 <Animated.View key={i} entering={ZoomIn.delay(500 + i * 100)} style={styles.statBox}>
                    <Text style={styles.statValue}>{stat.value}</Text>
                    <Text style={styles.statLabel}>{stat.label}</Text>
                 </Animated.View>
               ))}
            </View>
          </View>

          {/* Role Navigation */}
          <Text style={styles.sectionTitle}>Tizim Imkoniyatlari</Text>
          <View style={styles.roleGrid}>
             {[
               { title: 'Talaba Paneli', sub: 'Reyting va Blockchain', icon: GraduationCap, color: COLORS.primary },
               { title: 'Ish Beruvchilar', sub: 'Eng yaxshi kadrlar', icon: Briefcase, color: COLORS.secondary },
               { title: 'OTM Ma\'muriyati', sub: 'Akademik boshqaruv', icon: Building, color: COLORS.success },
             ].map((role, i) => (
               <Animated.View key={i} entering={FadeInUp.delay(800 + i * 150)}>
                 <GlassCard style={styles.roleCard} onPress={() => navigation.navigate('Login')}>
                    <View style={[styles.roleIconBox, { backgroundColor: `${role.color}15` }]}>
                      <role.icon size={22} color={role.color} />
                    </View>
                    <View style={{flex: 1}}>
                      <Text style={styles.roleTitle}>{role.title}</Text>
                      <Text style={styles.roleSubtitle}>{role.sub}</Text>
                    </View>
                    <ArrowRight size={16} color="rgba(255,255,255,0.2)" />
                 </GlassCard>
               </Animated.View>
             ))}
          </View>

          {/* Detailed Footer */}
          <View style={styles.footer}>
             <View style={styles.footerSection}>
                <Text style={styles.footerHeader}>Tashkilot haqida</Text>
                {['Biz haqimizda', 'Yangiliklar', 'Aloqa'].map(link => (
                  <Text key={link} style={styles.footerLink}>{link}</Text>
                ))}
             </View>
             
             <View style={styles.footerSection}>
                <Text style={styles.footerHeader}>Imkoniyatlar</Text>
                {['O\'qituvchilarga', 'Talabalarga', 'Ota-onalarga'].map(link => (
                  <Text key={link} style={styles.footerLink}>{link}</Text>
                ))}
             </View>

             <View style={styles.footerBottom}>
                <Text style={styles.copyright}>&copy; 2026 EduGravity. Barcha huquqlar himoyalangan.</Text>
             </View>
          </View>

        </ScrollView>

        {/* Floating AI Chatbot Button */}
        <Animated.View entering={ZoomIn.duration(500)} style={styles.chatToggle}>
          <TouchableOpacity onPress={() => setChatVisible(true)} style={styles.chatBtn}>
            <MessageCircle size={28} color="#fff" />
          </TouchableOpacity>
        </Animated.View>

        {/* AI Chat Modal */}
        <ChatModal 
          visible={chatVisible} 
          onClose={() => setChatVisible(false)} 
        />

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
  glow1: { backgroundColor: COLORS.secondary, top: -height * 0.2, left: -width * 0.3 },
  glow2: { backgroundColor: COLORS.primary, top: height * 0.1, right: -width * 0.4 },
  glow3: { backgroundColor: COLORS.success, bottom: -height * 0.2, left: width * 0.1 },
  navBarWrapper: {
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  navBar: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  logoText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: -1,
  },
  navActions: {
    flexDirection: 'row',
    gap: 12,
  },
  navIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 150,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 50,
  },
  badge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(0, 255, 136, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(0, 255, 136, 0.15)',
    borderRadius: 50,
    marginBottom: 25,
  },
  badgeText: {
    color: COLORS.success,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  heroTitle: {
    fontSize: 38,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 46,
    marginBottom: 20,
    letterSpacing: -1.5,
  },
  heroDesc: {
    fontSize: 15,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
    marginBottom: 40,
    fontWeight: '500',
  },
  heroButtons: {
    flexDirection: 'row',
    gap: 15,
    width: '100%',
  },
  primaryBtn: {
    flex: 1.2,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
  },
  gradientBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  secondaryBtn: {
    flex: 1,
    height: 60,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(255,255,255,0.03)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 15,
    fontWeight: '800',
  },
  blockchainSection: {
    alignItems: 'center',
    marginBottom: 60,
    paddingTop: 40,
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  sectionBadge: {
    backgroundColor: 'rgba(0, 255, 136, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
    marginBottom: 15,
  },
  sectionBadgeText: {
    color: COLORS.success,
    fontSize: 11,
    fontWeight: '800',
  },
  sectionMainTitle: {
    fontSize: 26,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 10,
  },
  sectionDesc: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textMuted,
    marginTop: 4,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  roleGrid: {
    gap: 12,
    marginBottom: 60,
  },
  roleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 22,
    gap: 15,
  },
  roleIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 2,
  },
  roleSubtitle: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  footer: {
    paddingTop: 50,
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  footerSection: {
    marginBottom: 30,
  },
  footerHeader: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 15,
  },
  footerLink: {
    fontSize: 14,
    color: COLORS.textMuted,
    marginBottom: 12,
    fontWeight: '500',
  },
  footerBottom: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  copyright: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.2)',
    fontWeight: '600',
    textAlign: 'center',
  },
  chatToggle: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 100 : 85,
    right: 20,
  },
  chatBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  chatWindow: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: width - 40,
    height: 400,
    borderRadius: 30,
    overflow: 'hidden',
    zIndex: 1000,
  },
  chatInner: {
    flex: 1,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#fff',
  },
  chatBody: {
    flex: 1,
  },
  botMsg: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 15,
    borderRadius: 20,
    borderBottomLeftRadius: 5,
    maxWidth: '85%',
  },
  msgText: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
  },
  chatInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 20,
  },
  chatInput: {
    flex: 1,
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 15,
    paddingHorizontal: 15,
    color: '#fff',
  },
  sendBtn: {
    width: 50,
    height: 50,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
