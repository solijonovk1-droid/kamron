import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp, FadeInDown, ZoomIn } from 'react-native-reanimated';
import { COLORS, GRADIENTS } from '../constants/Theme';
import GlassCard from '../components/GlassCard';
import { Briefcase, ArrowLeft, Hexagon, Star, ShieldCheck, ChevronRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

const JobsScreen = ({ navigation }) => {
  const jobs = [
    { id: 1, company: 'EPAM Systems', title: 'Technical Strategy Lead', type: 'Guaranteed', color: COLORS.secondary },
    { id: 2, company: 'Google (Central Asia)', title: 'Cloud Solutions Architect', type: 'Premium Match', color: COLORS.primary },
    { id: 3, company: 'Amazon Web Services', title: 'Senior DevOps Engineer', type: 'Elite Match', color: '#FFD700' },
    { id: 4, company: 'Tashkent IT Park', title: 'Fullstack Developer', type: 'High Priority', color: COLORS.success },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient colors={GRADIENTS.background} style={StyleSheet.absoluteFill} />
      
      {/* Glow backgrounds */}
      <View style={[styles.glow, styles.glow1]} />
      <View style={[styles.glow, styles.glow2]} />

      <SafeAreaView style={styles.safeArea}>
        <Animated.View entering={FadeInDown.duration(800)} style={styles.headerNav}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <ArrowLeft size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Premium Ishlar</Text>
        </Animated.View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <Animated.View entering={FadeInUp.delay(200).duration(800)} style={styles.hero}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Premium 100%</Text>
            </View>
            <Text style={styles.title}>Aqlli Ish Topish Tizimi</Text>
            <Text style={styles.subtitle}>Sizning o'rningiz bititguningizcha platforma sizga eng yuqori maoshli ishlarni bron qiladi.</Text>
          </Animated.View>

          <Text style={styles.sectionTitle}>Top Vakansiyalar Siz Uchun</Text>
          
          <View style={styles.jobList}>
            {jobs.map((job, index) => (
              <Animated.View key={job.id} entering={FadeInUp.delay(400 + index * 100).duration(800)}>
                <GlassCard style={styles.jobCard}>
                  <View style={styles.jobHeader}>
                    <View style={[styles.logoPlaceholder, { backgroundColor: `${job.color}20` }]}>
                      <Text style={[styles.logoText, { color: job.color }]}>{job.company.charAt(0)}</Text>
                    </View>
                    <View style={{flex: 1}}>
                      <Text style={styles.companyName}>{job.company}</Text>
                      <Text style={styles.jobTitle}>{job.title}</Text>
                    </View>
                    <View style={[styles.typeBadge, { borderColor: `${job.color}40`, backgroundColor: `${job.color}10` }]}>
                      <Text style={[styles.typeText, { color: job.color }]}>{job.type}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.jobFooter}>
                    <View style={styles.featureRow}>
                       <ShieldCheck size={14} color={COLORS.success} />
                       <Text style={styles.featureText}>Blockchain Tasdiqlangan</Text>
                    </View>
                    <TouchableOpacity 
                      style={styles.applyBtn}
                      onPress={() => import('react-native').then(({ Alert }) => Alert.alert("Vakansiya", `${job.title} (${job.company}) lavozimi uchun batafsil ma'lumot yuklanmoqda...`))}
                    >
                       <Text style={styles.applyText}>Batafsil</Text>
                       <ChevronRight size={16} color={COLORS.primary} />
                    </TouchableOpacity>
                  </View>
                </GlassCard>
              </Animated.View>
            ))}
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
  glow1: { backgroundColor: COLORS.secondary, top: -width * 0.4, right: -width * 0.4 },
  glow2: { backgroundColor: COLORS.primary, bottom: -width * 0.4, left: -width * 0.4 },
  headerNav: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    gap: 15,
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
  headerTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: -0.5,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 50,
  },
  hero: {
    alignItems: 'center',
    marginBottom: 40,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(144, 0, 255, 0.1)',
    borderRadius: 8,
    marginBottom: 15,
  },
  badgeText: {
    color: COLORS.secondary,
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 20,
  },
  jobList: {
    gap: 15,
  },
  jobCard: {
    padding: 20,
    borderRadius: 24,
  },
  jobHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  logoPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 22,
    fontWeight: '900',
  },
  companyName: {
    fontSize: 13,
    color: COLORS.textMuted,
    fontWeight: '600',
    marginBottom: 2,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
  },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
  },
  typeText: {
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  jobFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  featureText: {
    fontSize: 12,
    color: COLORS.success,
    fontWeight: '700',
  },
  applyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  applyText: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: '800',
  },
});

export default JobsScreen;
