import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, SafeAreaView, Platform, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp, FadeInDown, FadeInLeft, FadeInRight, ZoomIn } from 'react-native-reanimated';
import { COLORS, GRADIENTS } from '../constants/Theme';
import GlassCard from '../components/GlassCard';
import { ChevronLeft, Bell, Users, PlusCircle, Search, Edit3, TrendingUp, Info, GraduationCap } from 'lucide-react-native';

const { width, height } = Dimensions.get('window');

const TeacherDashboardScreen = ({ navigation }) => {
  const students = [
    { id: '1', initials: 'SK', name: 'Sardor Karimov', ball: 912, rating: '#3 - Himoyalangan', statusColor: COLORS.success, action: 'Baho qo\'yish' },
    { id: '2', initials: 'MA', name: 'Madina Akramova', ball: 940, rating: '#1 - Himoyalangan', statusColor: COLORS.success, action: 'Baho qo\'yish' },
    { id: '3', initials: 'AT', name: 'Aziz To\'lqin', ball: 820, rating: '#15 - Navbatda', statusColor: '#FFD700', action: 'Baho qo\'yish' },
    { id: '4', initials: 'LS', name: 'Laylo Shokirova', ball: 880, rating: '#8 - Himoyalangan', statusColor: COLORS.success, action: 'Baho qo\'yish' },
    { id: '5', initials: 'BR', name: 'Bekzod Rahimov', ball: 760, rating: '#42 - Past', statusColor: '#FF4B2B', action: 'Baho qo\'yish' },
    { id: '6', initials: 'AB', name: 'Asadov Bekzod', ball: 985, rating: '#1 - Himoyalangan', statusColor: COLORS.success, action: 'Tahrirlash' },
    { id: '7', initials: 'TN', name: 'Toirov Nodir', ball: 890, rating: '#12 - Ochilgan', statusColor: COLORS.textMuted, action: 'Tahrirlash' },
  ];

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
          
          <TouchableOpacity 
            style={styles.profileBtn}
            onPress={() => navigation.navigate('Profil')}
          >
            <LinearGradient colors={['#00D2FF', '#3a7bd5']} style={styles.profileGradient}>
              <Text style={styles.profileBtnText}>Profilga Kirish</Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <View style={styles.topRow}>
            {/* Left Section (Metrics & Notifications) */}
            <View style={styles.leftCol}>
              <Animated.View entering={FadeInLeft.delay(300).duration(800)}>
                <GlassCard style={styles.metricsCard}>
                  <Text style={styles.cardTitle}>Guruh Ko'rsatkichlari</Text>
                  
                  <View style={styles.metricItem}>
                    <Text style={styles.metricLabel}>O'rtacha GPA</Text>
                    <View style={styles.gpaRow}>
                      <Text style={styles.gpaValue}>4.62</Text>
                      <Text style={styles.gpaChange}>+2.4%</Text>
                    </View>
                  </View>

                  <View style={styles.metricItem}>
                    <Text style={styles.metricLabel}>O'zlashtirish Darajasi</Text>
                    <View style={styles.progressBarBg}>
                      <LinearGradient 
                        colors={[COLORS.primary, '#9400FF']} 
                        start={{x: 0, y:0}} 
                        end={{x: 1, y: 0}} 
                        style={[styles.progressBarFill, { width: '88%' }]} 
                      />
                    </View>
                    <Text style={styles.progressText}>88% Talabalar muvaffaqiyatli</Text>
                  </View>
                </GlassCard>
              </Animated.View>

              <Animated.View entering={FadeInLeft.delay(500).duration(800)}>
                <GlassCard style={styles.notificationsCard}>
                  <Text style={styles.cardTitle}>Yangi Bildirishnomalar</Text>
                  <View style={styles.notificationItem}>
                    <View style={[styles.notifLine, { backgroundColor: COLORS.primary }]} />
                    <Text style={styles.notifText}>3 ta talaba uy vazifasini kechikib topshirdi.</Text>
                  </View>
                  <View style={styles.notificationItem}>
                    <View style={[styles.notifLine, { backgroundColor: COLORS.success }]} />
                    <Text style={styles.notifText}>Sardor Karimov IELTS 8.5 ball natijasini yukladi.</Text>
                  </View>
                </GlassCard>
              </Animated.View>
            </View>

            {/* Right Section (Student List) */}
            <View style={styles.rightCol}>
              <Animated.View entering={FadeInRight.delay(400).duration(800)}>
                <Text style={styles.sectionTitle}>Talabalar Ro'yxati (CS-102)</Text>
                
                <GlassCard style={styles.tableCard}>
                  {/* Table Header */}
                  <View style={styles.tableHeader}>
                    <Text style={[styles.headerText, { flex: 2.5 }]}>F.I.SH</Text>
                    <Text style={[styles.headerText, { flex: 1, textAlign: 'center' }]}>Ball (100)</Text>
                    <Text style={[styles.headerText, { flex: 2, textAlign: 'center' }]}>Reyting</Text>
                    <Text style={[styles.headerText, { flex: 1.5, textAlign: 'right' }]}>Amal</Text>
                  </View>

                  {/* Table Rows with Stagger */}
                  {students.map((student, index) => (
                    <Animated.View 
                      key={student.id} 
                      entering={FadeInUp.delay(600 + index * 100).duration(500)}
                      style={styles.tableRow}
                    >
                      <View style={styles.studentInfo}>
                        <View style={[styles.avatar, { backgroundColor: student.initials === 'SK' ? '#00D2FF' : 
                                                             student.initials === 'MA' ? '#FF5E62' :
                                                             student.initials === 'AT' ? '#9D50BB' :
                                                             student.initials === 'LS' ? '#11998e' :
                                                             student.initials === 'BR' ? '#3a7bd5' :
                                                             COLORS.textMuted }]}>
                          <Text style={styles.avatarText}>{student.initials}</Text>
                        </View>
                        <Text style={styles.studentName} numberOfLines={1}>{student.name}</Text>
                      </View>

                      <Text style={styles.scoreText}>{student.ball}</Text>

                      <Text style={[styles.ratingText, { color: student.statusColor }]}>{student.rating}</Text>

                      <TouchableOpacity 
                        style={styles.actionBtn}
                        onPress={() => {
                          import('react-native').then(({ Alert }) => {
                            Alert.alert(
                              student.action,
                              `${student.name} uchun ballarni boshqarish tizimi ochilmoqda...`,
                              [{ text: "OK" }]
                            );
                          });
                        }}
                      >
                        {student.action === 'Baho qo\'yish' ? (
                          <LinearGradient colors={['#9400FF', '#BD00FF']} style={styles.actionGradient}>
                            <Text style={styles.actionBtnText}>{student.action}</Text>
                          </LinearGradient>
                        ) : (
                          <View style={styles.editBtn}>
                            <Text style={styles.editBtnText}>{student.action}</Text>
                          </View>
                        )}
                      </TouchableOpacity>
                    </Animated.View>
                  ))}
                </GlassCard>
              </Animated.View>
            </View>
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
    backgroundColor: COLORS.secondary,
    top: -height * 0.2,
    left: -width * 0.2,
  },
  glow2: {
    backgroundColor: COLORS.primary,
    bottom: -height * 0.2,
    right: -width * 0.2,
  },
  header: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: Platform.OS === 'android' ? 10 : 0,
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
  profileBtn: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileGradient: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileBtnText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 100,
  },
  topRow: {
    flexDirection: Platform.OS === 'web' || width > 800 ? 'row' : 'column',
    gap: 20,
  },
  leftCol: {
    flex: 1,
    gap: 20,
  },
  rightCol: {
    flex: 2.2,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: '#fff',
    marginBottom: 20,
    letterSpacing: -1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 20,
    opacity: 0.9,
  },
  metricsCard: {
    padding: 22,
    borderRadius: 24,
  },
  metricItem: {
    marginBottom: 22,
  },
  metricLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
    marginBottom: 10,
    fontWeight: '600',
  },
  gpaRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
  },
  gpaValue: {
    fontSize: 32,
    fontWeight: '900',
    color: COLORS.success,
  },
  gpaChange: {
    fontSize: 14,
    color: COLORS.success,
    marginBottom: 6,
    fontWeight: '700',
  },
  progressBarBg: {
    height: 10,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 5,
    marginBottom: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 5,
  },
  progressText: {
    fontSize: 11,
    color: COLORS.textMuted,
    fontWeight: '500',
  },
  notificationsCard: {
    padding: 22,
    borderRadius: 24,
  },
  notificationItem: {
    flexDirection: 'row',
    marginBottom: 18,
    alignItems: 'center',
    gap: 12,
  },
  notifLine: {
    width: 3,
    height: 22,
    borderRadius: 2,
  },
  notifText: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    flex: 1,
    lineHeight: 18,
    fontWeight: '500',
  },
  tableCard: {
    padding: 0,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.05)',
    borderRadius: 26,
  },
  tableHeader: {
    flexDirection: 'row',
    padding: 18,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  headerText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  tableRow: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  studentInfo: {
    flex: 2.5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 12,
    fontWeight: '900',
    color: '#fff',
  },
  studentName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
  },
  scoreText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 15,
    fontWeight: '900',
    color: '#fff',
  },
  ratingText: {
    flex: 2,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: -0.2,
  },
  actionBtn: {
    flex: 1.5,
    alignItems: 'flex-end',
  },
  actionGradient: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    minWidth: 95,
    alignItems: 'center',
  },
  actionBtnText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '800',
  },
  editBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    minWidth: 95,
    alignItems: 'center',
  },
  editBtnText: {
    color: COLORS.textMuted,
    fontSize: 11,
    fontWeight: '800',
  },
});

export default TeacherDashboardScreen;
