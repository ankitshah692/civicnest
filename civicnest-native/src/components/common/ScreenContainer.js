import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../../theme.js";
import { useAccessibility } from "../../context/AccessibilityContext.js";

const ScreenContainer = ({ children, scroll = true }) => {
  const { highContrast } = useAccessibility();

  if (highContrast) {
    return (
      <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.highContrastBg }]}
        >
        {scroll ? <ScrollView contentContainerStyle={styles.scroll}>{children}</ScrollView> : children}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient colors={["#f4f7fb", colors.backgroundLight]} style={StyleSheet.absoluteFill} />
      {scroll ? (
        <ScrollView contentContainerStyle={styles.scroll}>{children}</ScrollView>
      ) : (
        <View style={[styles.scroll, styles.fill]}>{children}</View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scroll: {
    padding: 16,
    gap: 16,
  },
  fill: {
    flex: 1,
  },
});

export default ScreenContainer;
