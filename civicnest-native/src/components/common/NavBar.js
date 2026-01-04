import { View, Text, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors, radius } from "../../theme.js";
import { useAccessibility } from "../../context/AccessibilityContext.js";
import { getScale, textStyles } from "../../utils/typography.js";

const NavBar = ({ title = "CivicNest" }) => {
  const navigation = useNavigation();
  const {
    highContrast,
    textScale,
    voiceGuidance,
    toggleContrast,
    toggleVoiceGuidance,
    increaseTextSize,
    decreaseTextSize,
  } = useAccessibility();
  const scale = getScale(textScale);
  const fonts = textStyles(scale);

  const canGoBack = navigation.canGoBack();

  return (
    <View style={[styles.container, highContrast && styles.contrastContainer]}>
      <View style={styles.headerRow}>
        <Pressable
          style={[styles.backButton, !canGoBack && styles.backButtonDisabled]}
          onPress={() => navigation.goBack()}
          disabled={!canGoBack}
        >
          <Text style={[fonts.xs, styles.backText, highContrast && styles.contrastText]}>
            Back
          </Text>
        </Pressable>
        <View style={styles.titleBlock}>
          <Text style={[fonts.lg, styles.title, highContrast && styles.contrastText]}>{title}</Text>
          <Text style={[fonts.sm, styles.subtitle, highContrast && styles.contrastText]}>
            Securing the future with the past
          </Text>
        </View>
      </View>
      <View style={styles.actions}>
        <Pressable style={styles.chip} onPress={toggleContrast}>
          <Text style={[fonts.xs, styles.chipText, highContrast && styles.contrastText]}>
            {highContrast ? "Standard" : "High Contrast"}
          </Text>
        </Pressable>
        <View style={styles.textSizeGroup}>
          <Pressable style={styles.iconButton} onPress={decreaseTextSize}>
            <Text style={[fonts.xs, styles.chipText]}>A-</Text>
          </Pressable>
          <Text style={[fonts.xs, styles.chipText]}>{textScale}</Text>
          <Pressable style={styles.iconButton} onPress={increaseTextSize}>
            <Text style={[fonts.xs, styles.chipText]}>A+</Text>
          </Pressable>
        </View>
        <Pressable style={[styles.chip, styles.voiceChip]} onPress={toggleVoiceGuidance}>
          <Text style={[fonts.xs, styles.voiceText]}>{voiceGuidance ? "Voice On" : "Voice Off"}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundWhite,
    padding: 16,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: "#dbe5f2",
    gap: 12,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backButton: {
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
  titleBlock: {
    flex: 1,
  },
  contrastContainer: {
    backgroundColor: colors.highContrastBg,
    borderColor: colors.highContrastText,
  },
  title: {
    fontWeight: "700",
    color: colors.primaryNavy,
  },
  subtitle: {
    color: colors.textSecondary,
  },
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    borderWidth: 2,
    borderColor: colors.primaryNavy,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  chipText: {
    color: colors.primaryNavy,
    fontWeight: "700",
  },
  voiceChip: {
    borderColor: colors.accentTeal,
  },
  voiceText: {
    color: colors.accentTeal,
    fontWeight: "700",
  },
  textSizeGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderWidth: 2,
    borderColor: colors.primaryNavy,
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  iconButton: {
    paddingHorizontal: 6,
  },
  contrastText: {
    color: colors.highContrastText,
  },
});

export default NavBar;
