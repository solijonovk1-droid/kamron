import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Modal, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, SafeAreaView, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInUp, FadeInDown, SlideInRight, SlideInLeft } from 'react-native-reanimated';
import { X, Send, Bot, User, Cpu, Sparkles } from 'lucide-react-native';
import { COLORS, GRADIENTS } from '../constants/Theme';

const { width, height } = Dimensions.get('window');

const ChatModal = ({ visible, onClose }) => {
  const [messages, setMessages] = useState([
    { id: '1', text: 'Salom! Men EduGravity AI yordamchisiman. Sizga qanday yordam bera olaman?', isBot: true },
  ]);
  const [inputText, setInputText] = useState('');
  const [typing, setTyping] = useState(false);
  const flatListRef = useRef(null);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMsg = { id: Date.now().toString(), text: inputText, isBot: false };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setTyping(true);

    // Simulate AI Response
    setTimeout(() => {
      const botMsg = { 
        id: (Date.now() + 1).toString(), 
        text: getAIResponse(inputText), 
        isBot: true 
      };
      setMessages(prev => [...prev, botMsg]);
      setTyping(false);
    }, 1500);
  };

  const getAIResponse = (text) => {
    const t = text.toLowerCase();
    if (t.includes('salom')) return 'Assalomu alaykum! O\'qishlaringizda omad tilayman.';
    if (t.includes('grant')) return 'EduGravity platformasida hozirda 12 xil xalqaro grantlar mavjud. Talaba dashboardiga o\'tib batafsil ko\'rishingiz mumkin.';
    if (t.includes('blockchain')) return 'Bizning barcha diplom va sertifikatlarimiz Polygon blockchain tarmog\'ida saqlanadi va 100% haqiqiydir.';
    return 'Tushunarlik. Ushbu savolingiz bo\'yicha mutaxassislarimiz bilan bog\'lanishingizni tavsiya qilaman.';
  };

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    }
  }, [messages, typing]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.container}>
        <BlurView intensity={80} tint="dark" style={StyleSheet.absoluteFill} />
        
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <View style={styles.headerInfo}>
               <View style={styles.botIcon}>
                  <Bot size={20} color="#fff" />
                  <View style={styles.onlineDot} />
               </View>
               <View>
                  <Text style={styles.headerTitle}>Gravity AI</Text>
                  <Text style={styles.headerStatus}>{typing ? 'Yozmoqda...' : 'Onlayn'}</Text>
               </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
               <X size={24} color="rgba(255,255,255,0.6)" />
            </TouchableOpacity>
          </View>

          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.chatList}
            renderItem={({ item }) => (
              <Animated.View 
                entering={item.isBot ? SlideInLeft : SlideInRight}
                style={[
                  styles.msgWrapper, 
                  item.isBot ? styles.botWrapper : styles.userWrapper
                ]}
              >
                {item.isBot && <View style={styles.msgIcon}><Cpu size={14} color={COLORS.primary} /></View>}
                <LinearGradient 
                   colors={item.isBot ? ['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.03)'] : GRADIENTS.primary}
                   style={[styles.bubble, item.isBot ? styles.botBubble : styles.userBubble]}
                >
                   <Text style={[styles.msgText, !item.isBot && { color: '#fff' }]}>{item.text}</Text>
                </LinearGradient>
                {!item.isBot && <View style={styles.msgIconUser}><User size={14} color="#fff" /></View>}
              </Animated.View>
            )}
          />

          {typing && (
            <View style={styles.typingBox}>
               <Sparkles size={14} color={COLORS.primary} />
               <Text style={styles.typingText}>AI o'ylamoqda...</Text>
            </View>
          )}

          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={20}
          >
            <View style={styles.inputArea}>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Xabar yozing..."
                  placeholderTextColor="rgba(255,255,255,0.3)"
                  value={inputText}
                  onChangeText={setInputText}
                  multiline
                />
                <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
                  <LinearGradient colors={GRADIENTS.primary} style={styles.sendGradient}>
                    <Send size={20} color="#fff" />
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  botIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  onlineDot: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: COLORS.success,
    borderWidth: 2,
    borderColor: COLORS.bgDark,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: '#fff',
  },
  headerStatus: {
    fontSize: 12,
    color: COLORS.success,
    fontWeight: '600',
  },
  closeBtn: {
    padding: 8,
  },
  chatList: {
    padding: 20,
    paddingBottom: 40,
  },
  msgWrapper: {
    flexDirection: 'row',
    marginBottom: 20,
    maxWidth: '85%',
    alignItems: 'flex-end',
    gap: 10,
  },
  botWrapper: {
    alignSelf: 'flex-start',
  },
  userWrapper: {
    alignSelf: 'flex-end',
  },
  bubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  botBubble: {
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
  userBubble: {
    borderBottomRightRadius: 4,
  },
  msgText: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 22,
  },
  msgIcon: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 210, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  msgIconUser: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  typingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 25,
    paddingBottom: 15,
  },
  typingText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '700',
    fontStyle: 'italic',
  },
  inputArea: {
    padding: 20,
    paddingBottom: Platform.OS === 'ios' ? 0 : 20,
    borderTopWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 25,
    paddingLeft: 20,
    paddingRight: 6,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 15,
    maxHeight: 100,
  },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  sendGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 4,
  },
});

export default ChatModal;
