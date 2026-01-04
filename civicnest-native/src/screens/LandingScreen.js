import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors, radius } from "../theme.js";
import { useAppMode } from "../context/AppModeContext.js";
import ScreenContainer from "../components/common/ScreenContainer.js";
import { useAccessibility } from "../context/AccessibilityContext.js";
import { getScale, textStyles } from "../utils/typography.js";

const LandingScreen = () => {
  const navigation = useNavigation();
  const { setMode } = useAppMode();
  const { textScale } = useAccessibility();
  const scale = getScale(textScale);
  const fonts = textStyles(scale);

  const selectMode = (mode) => {
    setMode(mode);
    navigation.navigate(mode === "kiosk" ? "KioskLocations" : "Home");
  };

  const canGoBack = navigation.canGoBack();

  return (
    <ScreenContainer>
      <Pressable
        style={[styles.backButton, !canGoBack && styles.backButtonDisabled]}
        onPress={() => navigation.goBack()}
        disabled={!canGoBack}
      >
        <Text style={[fonts.sm, styles.backText]}>Back</Text>
      </Pressable>
      <View style={styles.center}>
        <View style={styles.logoCircle}>
          <Text style={[fonts.xl, styles.logoText]}>CN</Text>
        </View>
        <Text style={[fonts["2xl"], styles.title]}>Welcome to CivicNest</Text>
        <Text style={[fonts.base, styles.subtitle]}>
          Securing the future with the past. Choose how you want to explore the demo today.
        </Text>
      </View>

      <View style={styles.cardGrid}>
        <Pressable style={styles.card} onPress={() => selectMode("app")}>
          <Text style={[fonts.xl, styles.cardTitle]}>Try the Mobile App</Text>
          <Text style={[fonts.base, styles.cardText]}>
            Explore the senior-friendly mobile experience with guided navigation.
          </Text>
        </Pressable>
        <Pressable style={styles.card} onPress={() => selectMode("kiosk")}>
          <Text style={[fonts.xl, styles.cardTitle]}>Try the Kiosk</Text>
          <Text style={[fonts.base, styles.cardText]}>
            Simulate the public kiosk with session timers and privacy cues.
          </Text>
        </Pressable>
      </View>

      <View style={styles.note}>
        <Text style={[fonts.base, styles.noteText]}>
          CivicNest is designed for seniors with cognitive impairment. Expect large buttons, calm layouts, and
          voice-first guidance.
        </Text>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  backButton: {
    alignSelf: "flex-start",
    borderWidth: 2,
    borderColor: colors.primaryNavy,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  backButtonDisabled: {
    opacity: 0.4,
  },
  backText: {
    color: colors.primaryNavy,
    fontWeight: "700",
  },
  center: {
    alignItems: "center",
    gap: 12,
  },
  logoCircle: {
    height: 80,
    width: 80,
    borderRadius: 40,
    backgroundColor: colors.primaryNavy,
    alignItems: "center",
    justifyContent: "center",
  },
  logoText: {
    color: "#fff",
    fontWeight: "700",
  },
  title: {
    color: colors.primaryNavy,
    fontWeight: "700",
    textAlign: "center",
  },
  subtitle: {
    color: colors.textSecondary,
    textAlign: "center",
  },
  cardGrid: {
    gap: 16,
  },
  card: {
    backgroundColor: colors.backgroundWhite,
    borderRadius: radius.lg,
    padding: 20,
    borderWidth: 2,
    borderColor: "#e2e8f0",
  },
  cardTitle: {
    color: colors.primaryNavy,
    fontWeight: "700",
  },
  cardText: {
    color: colors.textSecondary,
    marginTop: 6,
  },
  note: {
    backgroundColor: colors.backgroundWhite,
    borderRadius: radius.lg,
    padding: 20,
  },
  noteText: {
    color: colors.textSecondary,
  },
});

export default LandingScreen;
