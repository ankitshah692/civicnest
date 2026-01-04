import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ModeShell from "../components/common/ModeShell.js";
import BigButton from "../components/common/BigButton.js";
import { colors, radius } from "../theme.js";
import { useAccessibility } from "../context/AccessibilityContext.js";
import { getScale, textStyles } from "../utils/typography.js";

const sections = [
  {
    title: "Report an Issue",
    description: "Tell the city about a problem in four simple steps.",
    action: "Start a Report",
    link: "ReportIssue",
  },
  {
    title: "Volunteer Opportunities",
    description: "Join friendly volunteer shifts near you.",
    action: "See Opportunities",
  },
  {
    title: "Contact Your Representative",
    description: "Send a simple message to your local leaders.",
    action: "Send a Message",
  },
  {
    title: "Register to Vote",
    description: "Check registration, update your address, or request help.",
    action: "Start Registration",
  },
  {
    title: "Community Groups",
    description: "Find local groups that share your interests.",
    action: "Find Groups",
  },
];

const GetInvolvedScreen = () => {
  const navigation = useNavigation();
  const { textScale } = useAccessibility();
  const scale = getScale(textScale);
  const fonts = textStyles(scale);

  return (
    <ModeShell>
      <View style={styles.header}>
        <Text style={[fonts["2xl"], styles.title]}>Get Involved</Text>
        <Text style={[fonts.base, styles.subtitle]}>
          Simple ways to participate in civic life and stay connected.
        </Text>
      </View>

      <View style={styles.grid}>
        {sections.map((section) => (
          <View key={section.title} style={styles.card}>
            <Text style={[fonts.xl, styles.title]}>{section.title}</Text>
            <Text style={[fonts.base, styles.subtitle]}>{section.description}</Text>
            <BigButton
              label={section.action}
              variant="secondary"
              onPress={() => section.link && navigation.navigate(section.link)}
            />
          </View>
        ))}
      </View>
    </ModeShell>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.backgroundWhite,
    padding: 20,
    borderRadius: radius.lg,
    gap: 8,
  },
  title: {
    color: colors.primaryNavy,
    fontWeight: "700",
  },
  subtitle: {
    color: colors.textSecondary,
  },
  grid: {
    gap: 16,
  },
  card: {
    backgroundColor: colors.backgroundWhite,
    padding: 20,
    borderRadius: radius.lg,
    gap: 10,
  },
});

export default GetInvolvedScreen;
