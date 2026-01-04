import { View, Text, StyleSheet } from "react-native";
import { colors, radius } from "../../theme.js";
import { useAccessibility } from "../../context/AccessibilityContext.js";
import { getScale, textStyles } from "../../utils/typography.js";

const MemoryRecapCard = () => {
  const { textScale } = useAccessibility();
  const scale = getScale(textScale);
  const fonts = textStyles(scale);

  return (
    <View style={styles.card}>
      <Text style={[fonts.xl, styles.title]}>Welcome back, Mrs. Alvarez!</Text>
      <Text style={[fonts.base, styles.text]}>Last time you reported a street light on Oak Street.</Text>
      <Text style={[fonts.base, styles.text]}>You read about the city council meeting and the new shuttle.</Text>
      <Text style={[fonts.base, styles.highlight]}>You are doing a great job staying involved.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.backgroundWhite,
    padding: 20,
    borderRadius: radius.lg,
    gap: 6,
  },
  title: {
    color: colors.primaryNavy,
    fontWeight: "700",
  },
  text: {
    color: colors.textSecondary,
  },
  highlight: {
    color: colors.accentTeal,
    fontWeight: "700",
  },
});

export default MemoryRecapCard;
