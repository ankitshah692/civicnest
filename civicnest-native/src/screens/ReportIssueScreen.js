import { useMemo, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import ModeShell from "../components/common/ModeShell.js";
import ProgressIndicator from "../components/common/ProgressIndicator.js";
import BigButton from "../components/common/BigButton.js";
import { colors, radius } from "../theme.js";
import { useAccessibility } from "../context/AccessibilityContext.js";
import { getScale, textStyles } from "../utils/typography.js";

const issueTypes = [
  "Road/Sidewalk Problem",
  "Street Light Out",
  "Garbage/Litter",
  "Parking Issue",
  "Tree/Park Concern",
  "Something Else",
];

const steps = ["Select Type", "Location", "Details", "Confirm", "Success"];

const ReportIssueScreen = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const [formData, setFormData] = useState({
    type: null,
    location: "",
    details: "",
  });
  const reference = useMemo(() => Math.floor(Math.random() * 90000 + 10000), []);
  const { textScale } = useAccessibility();
  const scale = getScale(textScale);
  const fonts = textStyles(scale);

  const nextStep = () => setStepIndex((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStepIndex((prev) => Math.max(prev - 1, 0));

  return (
    <ModeShell>
      <View style={styles.header}>
        <Text style={[fonts["2xl"], styles.title]}>Report an Issue</Text>
        <Text style={[fonts.base, styles.subtitle]}>
          We&apos;ll guide you through a simple report in a few steps.
        </Text>
        <ProgressIndicator steps={steps} currentStep={stepIndex} />
      </View>

      {stepIndex === 0 && (
        <View style={styles.grid}>
          {issueTypes.map((type) => (
            <BigButton key={type} label={type} onPress={() => {
              setFormData((prev) => ({ ...prev, type }));
              nextStep();
            }} />
          ))}
        </View>
      )}

      {stepIndex === 1 && (
        <View style={styles.card}>
          <Text style={[fonts.base, styles.label]}>Where is it located?</Text>
          <TextInput
            style={[fonts.base, styles.input]}
            placeholder="Enter an address or landmark"
            value={formData.location}
            onChangeText={(value) => setFormData((prev) => ({ ...prev, location: value }))}
          />
          <Pressable style={styles.secondaryChip}>
            <Text style={[fonts.sm, styles.secondaryText]}>Use my location</Text>
          </Pressable>
          <View style={styles.mapPlaceholder}>
            <Text style={[fonts.sm, styles.placeholderText]}>Simple map preview will appear here.</Text>
          </View>
          <View style={styles.row}>
            <BigButton label="Back" variant="outline" onPress={prevStep} />
            <BigButton label="Continue" onPress={nextStep} />
          </View>
        </View>
      )}

      {stepIndex === 2 && (
        <View style={styles.card}>
          <Text style={[fonts.base, styles.label]}>Tell us more (optional)</Text>
          <TextInput
            style={[fonts.base, styles.input, styles.textArea]}
            placeholder="Add any helpful details"
            value={formData.details}
            onChangeText={(value) => setFormData((prev) => ({ ...prev, details: value }))}
            multiline
          />
          <View style={styles.row}>
            <BigButton label="Back" variant="outline" onPress={prevStep} />
            <BigButton label="Continue" onPress={nextStep} />
          </View>
        </View>
      )}

      {stepIndex === 3 && (
        <View style={styles.card}>
          <Text style={[fonts.xl, styles.title]}>Confirm your report</Text>
          <Text style={[fonts.base, styles.summary]}>Issue: {formData.type || "Not selected"}</Text>
          <Text style={[fonts.base, styles.summary]}>Location: {formData.location || "Not provided"}</Text>
          <Text style={[fonts.base, styles.summary]}>Details: {formData.details || "No extra details"}</Text>
          <View style={styles.row}>
            <BigButton label="Back" variant="outline" onPress={prevStep} />
            <BigButton label="Submit Report" onPress={nextStep} />
          </View>
        </View>
      )}

      {stepIndex === 4 && (
        <View style={[styles.card, styles.centered]}>
          <Text style={[fonts["2xl"], styles.title]}>Your report was sent!</Text>
          <Text style={[fonts.base, styles.summary]}>Reference number: #{reference}</Text>
          <View style={styles.row}>
            <BigButton label="Report Another Issue" onPress={() => setStepIndex(0)} />
          </View>
        </View>
      )}
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
    gap: 12,
  },
  card: {
    backgroundColor: colors.backgroundWhite,
    padding: 20,
    borderRadius: radius.lg,
    gap: 12,
  },
  label: {
    color: colors.primaryNavy,
    fontWeight: "700",
  },
  input: {
    borderWidth: 2,
    borderColor: "#e2e8f0",
    borderRadius: radius.lg,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: "top",
  },
  secondaryChip: {
    borderWidth: 2,
    borderColor: colors.primaryNavy,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    alignSelf: "flex-start",
  },
  secondaryText: {
    color: colors.primaryNavy,
    fontWeight: "700",
  },
  mapPlaceholder: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#e2e8f0",
    padding: 16,
    borderRadius: radius.lg,
    alignItems: "center",
  },
  placeholderText: {
    color: colors.textSecondary,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  summary: {
    color: colors.textSecondary,
  },
  centered: {
    alignItems: "center",
  },
});

export default ReportIssueScreen;
