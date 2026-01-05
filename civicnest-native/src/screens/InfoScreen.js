import { View, Text, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import ModeShell from "../components/common/ModeShell.js";
import { colors, radius } from "../theme.js";
import { useAccessibility } from "../context/AccessibilityContext.js";
import { getScale, textStyles } from "../utils/typography.js";

const InfoScreen = () => {
  const route = useRoute();
  const { title, description, items = [], cta } = route.params || {};
  const { textScale } = useAccessibility();
  const scale = getScale(textScale);
  const fonts = textStyles(scale);

  return (
    <ModeShell>
      <View style={styles.card}>
        <Text style={[fonts["2xl"], styles.title]}>{title || "Details"}</Text>
        <Text style={[fonts.base, styles.subtitle]}>{description || ""}</Text>
        <View style={styles.list}>
          {items.map((item) => (
            <View key={item} style={styles.listItem}>
              <Text style={[fonts.base, styles.listText]}>{item}</Text>
            </View>
          ))}
        </View>
        {cta && (
          <View style={styles.ctaBox}>
            <Text style={[fonts.base, styles.ctaText]}>{cta}</Text>
          </View>
        )}
      </View>
    </ModeShell>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.backgroundWhite,
    padding: 20,
    borderRadius: radius.lg,
    gap: 12,
  },
  title: {
    color: colors.primaryNavy,
    fontWeight: "700",
  },
  subtitle: {
    color: colors.textSecondary,
  },
  list: {
    gap: 10,
  },
  listItem: {
    borderWidth: 2,
    borderColor: "#e2e8f0",
    padding: 12,
    borderRadius: radius.lg,
  },
  listText: {
    color: colors.textSecondary,
    fontWeight: "600",
  },
  ctaBox: {
    borderWidth: 2,
    borderColor: colors.accentTeal,
    padding: 12,
    borderRadius: radius.lg,
  },
  ctaText: {
    color: colors.accentTeal,
    fontWeight: "700",
  },
});

export default InfoScreen;
