import React, { useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { BlurView } from 'expo-blur';
import { COLORS } from '../constants/Theme';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedView = Animated.createAnimatedComponent(View);

const GlassCard = ({ children, style, onPress, isSecondary = false }) => {
  const animatedValue = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(animatedValue, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const Container = onPress ? AnimatedTouchable : AnimatedView;

  return (
    <Container
      activeOpacity={0.9}
      onPress={onPress}
      onPressIn={onPress ? handlePressIn : undefined}
      onPressOut={onPress ? handlePressOut : undefined}
      style={[styles.container, style, { transform: [{ scale: animatedValue }] }]}
    >
      <BlurView intensity={20} tint="dark" style={styles.blurContainer}>
        {children}
      </BlurView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.glassBorder,
    backgroundColor: COLORS.glassBg,
    marginVertical: 10,
  },
  blurContainer: {
    padding: 20,
    width: '100%',
  },
});

export default GlassCard;
