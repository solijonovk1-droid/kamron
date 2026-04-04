import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp, FadeInDown, ZoomIn, FadeInLeft, FadeInRight } from 'react-native-reanimated';
import { COLORS, GRADIENTS } from '../constants/Theme';
import GlassCard from '../components/GlassCard';
import { Building, Users, Briefcase, TrendingUp, BarChart, Settings, Plus, LayoutDashboard, Search } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const UniversityDashboardScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <LinearGradient colors={GRADIENTS.background} style={StyleSheet.absoluteFill} />
      
      {/* Glow backgrounds */}
      <View style={[styles.glow, styles.glow1]} />
      <View style={[styles.glow, styles.glow2]} />

      <SafeAreaView style={styles.safeArea}>
        <Animated.View entering={FadeInDown.duration(800)} style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>OTM Markazi</Text>
            <Text style={styles.headerSub}>Toshkent Axborot Texnologiyalari Universiteti</Text>
          </View>
          <TouchableOpacity 
            style={styles.settingsBtn}
            onPress={() => navigation.navigate('Profil')}
          >
            <Settings size={22} color="#fff" />
          </TouchableOpacity>
        </Animated.View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <View style={styles.statsGrid}>
            <Animated.View entering={FadeInLeft.delay(300).duration(800)} style={{flex: 1}}>
              <GlassCard style={styles.statCard}>
                <View style={[styles.statIconBox, { backgroundColor: 'rgba(0, 210, 255, 0.1)' }]}>
                  <Users size={20} color={COLORS.primary} />
                </View>
                <Text style={styles.statValue}>5,420</Text>
                <Text style={styles.statLabel}>Barcha Talabalar</Text>
              </GlassCard>
            </Animated.View>
            <Animated.View entering={FadeInRight.delay(300).duration(800)} style={{flex: 1}}>
              <GlassCard style={styles.statCard}>
                <View style={[styles.statIconBox, { backgroundColor: 'rgba(144, 0, 255, 0.1)' }]}>
                  <Briefcase size={20} color={COLORS.secondary} />
                </View>
                <Text style={styles.statValue}>1,200</Text>
                <Text style={styles.statLabel}>Vakansiyalar</Text>
              </GlassCard>
            </Animated.View>
          </View>

          <Animated.View entering={FadeInUp.delay(500).duration(800)}>
            <GlassCard style={styles.progressCard}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressTitle}>Bitiruvchilar Ishga Joylashuvi</Text>
                <View style={styles.trendBadge}>
                   <TrendingUp size={16} color={COLORS.success} />
                   <Text style={styles.trendText}>+5%</Text>
                </View>
              </View>
              <View style={styles.chartWrapper}>
                 <LinearGradient 
                  colors={['rgba(255,255,255,0.05)', 'transparent']} 
                  style={styles.chartInner}
                 >
                    <BarChart size={40} color="rgba(255,255,255,0.1)" />
                    <Text style={styles.placeholderText}>Haqiqiy vaqt rejimidagi statistika</Text>
                 </LinearGradient>
              </View>
              <View style={styles.statsFooter}>
                 <View>
                    <Text style={styles.percentageText}>92%</Text>
                    <Text style={styles.percentageSub}>O'rtacha ko'rsatkich</Text>
                 </View>
                 <View style={styles.separator} />
                 <View>
                    <Text style={[styles.percentageText, { color: COLORS.primary }]}>86%</Text>
                    <Text style={styles.percentageSub}>Target Plan</Text>
                 </View>
              </View>
            </GlassCard>
          </Animated.View>

          <Text style={styles.sectionTitle}>Boshqaruv Paneli</Text>
          <View style={styles.actionGrid}>
            <Animated.View entering={ZoomIn.delay(700).duration(800)} style={styles.actionItem}>
              <TouchableOpacity onPress={() => import('react-native').then(({ Alert }) => Alert.alert("Vakansiya", "Yangi ish o'rni e'lon qilish formasi yuklanmoqda..."))}>
                <GlassCard style={styles.actionCard}>
                   <View style={[styles.iconBox, { backgroundColor: 'rgba(0, 255, 136, 0.1)' }]}>
                      <Plus size={24} color={COLORS.success} />
                   </View>
                   <Text style={styles.actionText}>Vakansiya Qo'shish</Text>
                </GlassCard>
              </TouchableOpacity>
            </Animated.View>
            
            <Animated.View entering={ZoomIn.delay(850).duration(800)} style={styles.actionItem}>
              <TouchableOpacity onPress={() => import('react-native').then(({ Alert }) => Alert.alert("HEMIS", "HEMIS integratsiyasi orqali talabalar natijalari tahlil qilinmoqda..."))}>
                <GlassCard style={styles.actionCard}>
                   <View style={[styles.iconBox, { backgroundColor: 'rgba(0, 210, 255, 0.1)' }]}>
                      <LayoutDashboard size={24} color={COLORS.primary} />
                   </View>
                   <Text style={styles.actionText}>HEMIS Analitika</Text>
                </GlassCard>
              </TouchableOpacity>
            </Animated.View>
          </View>

          <Text style={styles.sectionTitle}>Eng Faol Hamkorlar</Text>
          <Animated.View entering={FadeInUp.delay(1000).duration(800)}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.partnerRow}>
               {['Google', 'EPAM', 'Artel', 'Huawei', 'Najot Ta\'lim'].map((name, i) => (
                  <TouchableOpacity key={i} onPress={() => import('react-native').then(({ Alert }) => Alert.alert("Hamkor", `${name} bilan premium darajadagi hamkorlik yo'lga qo'yilgan.`))}>
                    <GlassCard style={styles.partnerCard}>
                       <View style={styles.partnerIcon}>
                          <Building size={20} color={COLORS.textMuted} />
                       </View>
                       <Text style={styles.partnerName}>{name}</Text>
                       <Text style={styles.partnerStatus}>Premium</Text>
                    </GlassCard>
                  </TouchableOpacity>
               ))}
            </ScrollView>
          </Animated.View>

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
    backgroundColor: COLORS.secondary,
    top: -height * 0.2,
    left: -width * 0.2,
  },
  glow2: {
    backgroundColor: COLORS.success,
    bottom: -height * 0.2,
    right: -width * 0.2,
  },
  header: {
    padding: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? 10 : 0,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: -0.5,
  },
  headerSub: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginTop: 4,
    fontWeight: '500',
  },
  settingsBtn: {
    width: 48,
    height: 48,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 20,
  },
  statCard: {
    padding: 20,
    alignItems: 'flex-start',
    borderRadius: 24,
  },
  statIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
  },
  statLabel: {
    fontSize: 10,
    color: COLORS.textMuted,
    marginTop: 5,
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  progressCard: {
    padding: 25,
    marginBottom: 35,
    borderRadius: 28,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  progressTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#fff',
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0, 255, 136, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  trendText: {
    fontSize: 12,
    color: COLORS.success,
    fontWeight: '700',
  },
  chartWrapper: {
    height: 140,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    overflow: 'hidden',
  },
  chartInner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: 12,
    marginTop: 12,
    fontWeight: '500',
  },
  statsFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    gap: 25,
  },
  percentageText: {
    fontSize: 30,
    fontWeight: '900',
    color: COLORS.success,
  },
  percentageSub: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '600',
    marginTop: 2,
  },
  separator: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 20,
    letterSpacing: -0.5,
  },
  actionGrid: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 35,
  },
  actionItem: {
    flex: 1,
  },
  actionCard: {
    padding: 20,
    alignItems: 'center',
    borderRadius: 24,
  },
  iconBox: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 18,
  },
  partnerRow: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  partnerCard: {
    width: 140,
    marginRight: 15,
    alignItems: 'center',
    padding: 20,
    borderRadius: 22,
  },
  partnerIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.03)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  partnerName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  partnerStatus: {
    fontSize: 10,
    color: COLORS.primary,
    fontWeight: '800',
    marginTop: 6,
    textTransform: 'uppercase',
  },
});

export default UniversityDashboardScreen;
