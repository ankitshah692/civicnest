import { View, Text, TextInput, StyleSheet } from "react-native";
import { colors, radius } from "../../theme.js";
import { useAccessibility } from "../../context/AccessibilityContext.js";
import { getScale, textStyles } from "../../utils/typography.js";

const CaregiverDashboard = () => {
  const { textScale } = useAccessibility();
  const scale = getScale(textScale);
  const fonts = textStyles(scale);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={[fonts["2xl"], styles.title]}>Caregiver Dashboard</Text>
        <Text style={[fonts.base, styles.text]}>
          A quick look at recent activity and gentle reminders.
        </Text>
      </View>

      <View style={styles.grid}>
        <View style={styles.card}>
          <Text style={[fonts.lg, styles.title]}>Engagement Summary</Text>
          <Text style={[fonts.base, styles.text]}>News read this week: 3 articles</Text>
          <Text style={[fonts.base, styles.text]}>Surveys completed: 1 survey</Text>
          <Text style={[fonts.base, styles.text]}>Events bookmarked: 2 events</Text>
        </View>
        <View style={styles.card}>
          <Text style={[fonts.lg, styles.title]}>Gentle Reminders</Text>
          <Text style={[fonts.base, styles.text]}>Schedule reminder: Town Hall on Jan 15</Text>
          <Text style={[fonts.base, styles.text]}>Follow up: Streetlight report submitted</Text>
          <Text style={[fonts.base, styles.text]}>Weekly check-in call</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={[fonts.lg, styles.title]}>Care Notes</Text>
        <Text style={[fonts.base, styles.text]}>
          Add notes about preferred times or memory prompts to show next time.
        </Text>
        <TextInput
          multiline
          style={[fonts.base, styles.input]}
          placeholder="Example: Loves hearing about library events on Tuesdays."
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  card: {
    backgroundColor: colors.backgroundWhite,
    padding: 20,
    borderRadius: radius.lg,
    gap: 8,
  },
  title: {
    color: colors.primaryNavy,
    fontWeight: "700",
  },
  text: {
    color: colors.textSecondary,
  },
  grid: {
    gap: 16,
  },
  input: {
    borderWidth: 2,
    borderColor: "#e2e8f0",
    borderRadius: radius.lg,
    padding: 12,
    minHeight: 120,
    marginTop: 8,
  },
});

export default CaregiverDashboard;
