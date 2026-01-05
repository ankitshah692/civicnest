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
    link: "Info",
    payload: {
      title: "Volunteer Opportunities",
      description: "Choose a volunteer opportunity near you.",
      items: [
        "Frisco Food Pantry - Tues 10:00 AM",
        "Library Reading Buddy - Wed 2:00 PM",
        "Park Clean-Up - Sat 9:00 AM",
        "Senior Center Welcome Desk - Mon 1:00 PM",
      ],
      cta: "Tap a location to request a call back.",
    },
  },
  {
    title: "Contact Your Representative",
    description: "Send a simple message to your local leaders.",
    action: "Send a Message",
    link: "Info",
    payload: {
      title: "Contact Your Representative",
      description: "Quick contacts for Frisco, TX.",
      items: [
        "Mayor's Office: (972) 292-5000",
        "City Council District 1",
        "City Council District 2",
        "City Council District 3",
      ],
      cta: "We can draft a short message for you.",
    },
  },
  {
    title: "Register to Vote",
    description: "Check registration, update your address, or request help.",
    action: "Start Registration",
    link: "Info",
    payload: {
      title: "Register to Vote",
      description: "Key steps to register in Texas.",
      items: [
        "Check eligibility requirements",
        "Complete voter registration form",
        "Mail the form to the county registrar",
      ],
      cta: "Need help? Call 311 for assistance.",
    },
  },
  {
    title: "Community Groups",
    description: "Find local groups that share your interests.",
    action: "Find Groups",
    link: "Info",
    payload: {
      title: "Community Groups",
      description: "Local groups and meetups in Frisco.",
      items: [
        "Frisco Walking Club",
        "Senior Center Art Circle",
        "Neighborhood Watch Group",
        "Gardeners Meetup",
      ],
      cta: "Tap a group to receive meeting details.",
    },
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
              onPress={() => {
                if (section.link === "ReportIssue") {
                  navigation.navigate(section.link);
                  return;
                }
                if (section.link === "Info") {
                  navigation.navigate("Info", section.payload);
                }
              }}
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
