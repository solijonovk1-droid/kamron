import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Animated as RNAnimated, SafeAreaView, Platform, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Animated, { FadeInUp, FadeInDown, ZoomIn } from 'react-native-reanimated';
import { COLORS, GRADIENTS } from '../constants/Theme';
import { TRANSLATIONS } from '../constants/Translations';
import GlassCard from '../components/GlassCard';
import { User, Bell, ChevronLeft, CreditCard, GraduationCap, Clock, Award, CheckCircle, ShieldCheck } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const StudentDashboardScreen = ({ navigation }) => {
  const [lang, setLang] = useState('uz');
  const [flipped, setFlipped] = useState(false);
  const flipAnim = useRef(new RNAnimated.Value(0)).current;
  const t = TRANSLATIONS[lang] || TRANSLATIONS['uz'];

  const handleFlip = () => {
    const toValue = flipped ? 0 : 180;
    setFlipped(!flipped);
    RNAnimated.spring(flipAnim, {
      toValue: toValue,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
  };

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = { transform: [{ rotateY: frontInterpolate }] };
  const backAnimatedStyle = { transform: [{ rotateY: backInterpolate }] };

  return (
    <View style={styles.container}>
      <LinearGradient colors={GRADIENTS.background} style={StyleSheet.absoluteFill} />
      
      {/* Glow backgrounds */}
      <View style={[styles.glow, styles.glow1]} />
      <View style={[styles.glow, styles.glow2]} />

      <SafeAreaView style={styles.safeArea}>
        <Animated.View entering={FadeInDown.duration(800)} style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <ChevronLeft size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Talaba Paneli</Text>
          <TouchableOpacity 
            style={styles.avatarMini}
            onPress={() => navigation.navigate('Profil')}
          >
            <Text style={styles.avatarText}>SK</Text>
          </TouchableOpacity>
        </Animated.View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <Animated.View entering={ZoomIn.delay(300).duration(1000)}>
            <Text style={styles.sectionLabel}>DIGITAL TALENT PASSPORT</Text>
            {/* 3D Talent Passport Simulation */}
            <TouchableOpacity activeOpacity={1} onPress={handleFlip} style={styles.passportWrapper}>
              <RNAnimated.View style={[styles.passportCard, frontAnimatedStyle, flipped && { opacity: 0 }]}>
                <LinearGradient colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.02)']} style={styles.passportInner}>
                  <View style={styles.passportHeader}>
                     <View>
                        <Text style={styles.passportLabel}>TALENT PASSPORT</Text>
                        <Text style={styles.passportSubLabel}>EDUGRAVITY NETWORK</Text>
                     </View>
                     <Award size={24} color="#FFD700" />
                  </View>
                  
                  <View style={styles.passportBody}>
                    <View style={styles.avatarBox}>
                       <LinearGradient colors={['#00D2FF', '#3a7bd5']} style={styles.avatarGradient}>
                          <Text style={styles.avatarBoxText}>SK</Text>
                       </LinearGradient>
                    </View>
                    <View>
                      <Text style={styles.passportName}>Sardor Karimov</Text>
                      <View style={styles.idRow}>
                        <ShieldCheck size={12} color={COLORS.primary} />
                        <Text style={styles.passportId}>ID: 80-245-092-11</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.passportFooter}>
                    <View>
                      <Text style={styles.footerLabel}>PROF INDEX</Text>
                      <Text style={styles.footerValue}>912 <Text style={styles.premiumBadge}>★ PREMIUM</Text></Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                      <Text style={styles.footerLabel}>RANK</Text>
                      <Text style={styles.footerValue}>#3</Text>
                    </View>
                  </View>
                </LinearGradient>
              </RNAnimated.View>

              <RNAnimated.View style={[styles.passportCard, styles.passportBack, backAnimatedStyle, !flipped && { opacity: 0 }]}>
                <LinearGradient colors={['rgba(0,0,0,0.9)', 'rgba(0,0,0,0.6)']} style={styles.passportInner}>
                  <View style={styles.magneticStrip} />
                  <View style={styles.backContent}>
                     <Text style={[styles.passportLabel, { marginBottom: 10 }]}>VERIFIED BY BLOCKCHAIN</Text>
                     <View style={styles.hashBox}>
                        <Text style={styles.hashText} numberOfLines={1}>0x8F9a4C72bC49e9128f9a4c72bc49d012...89cf</Text>
                     </View>
                     <View style={styles.qrRow}>
                        <View style={styles.qrPlaceholder}>
                           <View style={styles.qrInner} />
                        </View>
                        <View style={{flex: 1, marginLeft: 15}}>
                           <Text style={styles.qrInfo}>Ushbu passport Blockchain texnologiyasi orqali himoyalangan va haqiqiyligi tasdiqlangan.</Text>
                        </View>
                     </View>
                  </View>
                </LinearGradient>
              </RNAnimated.View>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(500).duration(800)}>
            <Text style={styles.sectionTitle}>Bugungi Baholar</Text>
            <GlassCard style={styles.tableCard}>
              <View style={styles.tableRowHeader}>
                <Text style={styles.th}>Fan nomi</Text>
                <Text style={[styles.th, { textAlign: 'center' }]}>Baho</Text>
                <Text style={[styles.th, { textAlign: 'right' }]}>Status</Text>
              </View>
              
              <View style={styles.tableRow}>
                <Text style={styles.tdMain}>Algoritmlar</Text>
                <Text style={[styles.tdValue, { color: COLORS.success }]}>5</Text>
                <View style={styles.statusBadge}><Text style={styles.statusText}>Keldi</Text></View>
              </View>

              <View style={styles.tableRow}>
                <Text style={styles.tdMain}>Ingliz Tili</Text>
                <Text style={[styles.tdValue, { color: COLORS.primary }]}>8.5</Text>
                <View style={styles.statusBadge}><Text style={styles.statusText}>Keldi</Text></View>
              </View>
            </GlassCard>
          </Animated.View>

          <Animated.View entering={FadeInUp.delay(700).duration(800)}>
            <Text style={styles.sectionTitle}>Dars Jadvali</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scheduleRow}>
              <GlassCard style={styles.scheduleCard}>
                 <Text style={styles.timeText}>09:00 - 10:30</Text>
                 <Text style={styles.subjectText}>Algoritmlar</Text>
                 <Text style={styles.roomText}>D-402 xona</Text>
              </GlassCard>
              <GlassCard style={[styles.scheduleCard, { borderLeftColor: COLORS.secondary }]}>
                 <Text style={styles.timeText}>11:00 - 12:30</Text>
                 <Text style={styles.subjectText}>Big Data Analysis</Text>
                 <Text style={styles.roomText}>Online Zoom</Text>
              </GlassCard>
            </ScrollView>
          </Animated.View>

           <Animated.View entering={FadeInUp.delay(900).duration(800)}>
            <Text style={styles.sectionTitle}>Takliflar</Text>
            <GlassCard style={styles.inviteCard}>
               <View style={styles.inviteHeader}>
                  <Text style={styles.inviteTitle}>Amity University</Text>
                  <View style={styles.grantBadge}><Text style={styles.grantText}>100% GRANT</Text></View>
               </View>
               <Text style={styles.inviteDesc}>Sizning yuqori ballaringiz sababli bepul o'qish imkoniyati.</Text>
               <TouchableOpacity 
                  style={styles.acceptBtn}
                  onPress={() => {
                    import('react-native').then(({ Alert }) => {
                      Alert.alert("Tabriklaymiz!", "Sizning grant so'rovingiz muvaffaqiyatli qabul qilindi. Tez orada universitet siz bilan bog'lanadi.");
                    });
                  }}
               >
                  <LinearGradient colors={GRADIENTS.primary} style={styles.acceptGradient}>
                     <Text style={styles.acceptBtnText}>Qabul Qilish</Text>
                  </LinearGradient>
               </TouchableOpacity>
            </GlassCard>
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
  header: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
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
    fontWeight: '800',
    color: '#fff',
    letterSpacing: -0.5,
  },
  avatarMini: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#fff',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 100,
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
    top: -width * 0.2,
    right: -width * 0.3,
  },
  glow2: {
    backgroundColor: COLORS.primary,
    bottom: -width * 0.2,
    left: -width * 0.3,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: COLORS.textMuted,
    marginBottom: 10,
    letterSpacing: 2,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
    marginTop: 35,
    marginBottom: 15,
    letterSpacing: -0.5,
  },
  passportWrapper: {
    height: 220,
    width: '100%',
    zIndex: 10,
    ...Platform.select({
      ios: {
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
      },
      android: {
        elevation: 15,
      }
    })
  },
  passportCard: {
    height: '100%',
    width: '100%',
    backfaceVisibility: 'hidden',
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(0, 210, 255, 0.3)',
    overflow: 'hidden',
  },
  passportBack: {
    position: 'absolute',
    top: 0,
    backgroundColor: '#000',
  },
  passportInner: {
    flex: 1,
    padding: 25,
  },
  passportHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  passportLabel: {
    fontSize: 14,
    fontWeight: '900',
    color: '#fff',
    opacity: 0.9,
    letterSpacing: 1,
  },
  passportSubLabel: {
    fontSize: 7,
    color: COLORS.primary,
    letterSpacing: 3,
    marginTop: 2,
  },
  passportBody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 18,
    marginTop: 5,
  },
  avatarBox: {
    width: 70,
    height: 70,
    borderRadius: 15,
    overflow: 'hidden',
  },
  avatarGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarBoxText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
  },
  passportName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  idRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  passportId: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '600',
  },
  passportFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 'auto',
  },
  footerLabel: {
    fontSize: 9,
    color: 'rgba(255,255,255,0.4)',
    fontWeight: '700',
    letterSpacing: 1,
  },
  footerValue: {
    fontSize: 22,
    fontWeight: '900',
    color: '#fff',
    marginTop: 2,
  },
  premiumBadge: {
    fontSize: 10,
    color: COLORS.success,
  },
  magneticStrip: {
    height: 45,
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginHorizontal: -25,
    marginTop: 10,
  },
  backContent: {
    marginTop: 20,
    flex: 1,
  },
  hashBox: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  hashText: {
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: '600',
  },
  qrRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
  },
  qrPlaceholder: {
    width: 65,
    height: 65,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
  },
  qrInner: {
    flex: 1,
    backgroundColor: '#000',
    borderRadius: 2,
  },
  qrInfo: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 10,
    lineHeight: 15,
  },
  tableCard: {
    padding: 0,
    borderRadius: 20,
    overflow: 'hidden',
  },
  tableRowHeader: {
    flexDirection: 'row',
    padding: 18,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
    backgroundColor: 'rgba(255,255,255,0.02)',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 18,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  th: {
    flex: 1,
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  tdMain: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },
  tdValue: {
    flex: 1,
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
  },
  statusBadge: {
    flex: 1,
    alignItems: 'flex-end',
  },
  statusText: {
    backgroundColor: 'rgba(0, 255, 136, 0.1)',
    color: COLORS.success,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    fontSize: 10,
    fontWeight: '800',
  },
  scheduleRow: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  scheduleCard: {
    width: 180,
    marginRight: 15,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
    borderRadius: 18,
    padding: 15,
  },
  timeText: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  subjectText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
    marginVertical: 8,
  },
  roomText: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '700',
  },
  inviteCard: {
    padding: 22,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: 'rgba(144, 0, 255, 0.2)',
  },
  inviteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  inviteTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
  },
  grantBadge: {
    backgroundColor: 'rgba(144, 0, 255, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  grantText: {
    fontSize: 11,
    color: COLORS.secondary,
    fontWeight: '900',
  },
  inviteDesc: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 25,
    lineHeight: 20,
  },
  acceptBtn: {
    height: 50,
    borderRadius: 15,
    overflow: 'hidden',
  },
  acceptGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acceptBtnText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#fff',
  },
});

export default StudentDashboardScreen;
