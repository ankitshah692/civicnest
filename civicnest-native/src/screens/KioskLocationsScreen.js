import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ModeShell from "../components/common/ModeShell.js";
import { colors, radius } from "../theme.js";
import { useAccessibility } from "../context/AccessibilityContext.js";
import { getScale, textStyles } from "../utils/typography.js";

const locations = [
  "Frisco Public Library - Main Branch",
  "Frisco Senior Center",
  "George A. Purefoy Municipal Center",
  "Frisco Square Community Kiosk",
  "Stonebriar Centre Info Hub",
  "Frisco Commons Park Pavilion",
];

const KioskLocationsScreen = () => {
  const navigation = useNavigation();
  const { textScale } = useAccessibility();
  const scale = getScale(textScale);
  const fonts = textStyles(scale);

  return (
    <ModeShell>
      <View style={styles.card}>
        <Text style={[fonts["2xl"], styles.title]}>Choose a Kiosk Location</Text>
        <Text style={[fonts.base, styles.subtitle]}>
          Here are active CivicNest kiosks in Frisco, TX.
        </Text>
        <View style={styles.list}>
          {locations.map((location) => (
            <View key={location} style={styles.locationItem}>
              <Text style={[fonts.base, styles.locationText]}>{location}</Text>
            </View>
          ))}
        </View>
        <Pressable style={styles.primaryButton} onPress={() => navigation.navigate("Home")}>
          <Text style={[fonts.base, styles.primaryText]}>Continue to Kiosk Home</Text>
        </Pressable>
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
  locationItem: {
    borderWidth: 2,
    borderColor: "#e2e8f0",
    padding: 12,
    borderRadius: radius.lg,
  },
  locationText: {
    color: colors.textSecondary,
    fontWeight: "600",
  },
  primaryButton: {
    backgroundColor: colors.accentTeal,
    paddingVertical: 12,
    borderRadius: radius.lg,
    alignItems: "center",
  },
  primaryText: {
    color: "#fff",
    fontWeight: "700",
  },
});

export default KioskLocationsScreen;
