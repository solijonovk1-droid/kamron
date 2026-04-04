export const COLORS = {
  primary: '#00d2ff',
  secondary: '#9000ff',
  accent: '#ff00ea',
  bgDark: '#050b18',
  textMain: '#e0e0e0',
  textMuted: '#a0a0a0',
  success: '#00ff88',
  white: '#ffffff',
  black: '#000000',
  glassBg: 'rgba(255, 255, 255, 0.05)',
  glassBorder: 'rgba(255, 255, 255, 0.1)',
};

export const GRADIENTS = {
  primary: ['#00d2ff', '#9000ff'],
  background: ['#0a1128', '#050b18'],
  accent: ['#ff00ea', '#9000ff'],
};

export const GLASS_STYLE = {
  backgroundColor: COLORS.glassBg,
  borderWidth: 1,
  borderColor: COLORS.glassBorder,
  borderRadius: 20,
  padding: 20,
  backdropFilter: 'blur(12px)', // Note: backdropFilter isn't directly supported in React Native StyleSheet but can be simulated with Expo BlurView
};

export const LIGHT_THEME = {
  bgDark: '#f0f4f8',
  textMain: '#102a43',
  textMuted: '#486581',
  cardBg: 'rgba(5, 11, 24, 0.05)',
  glassBorder: 'rgba(0, 0, 0, 0.05)',
};
