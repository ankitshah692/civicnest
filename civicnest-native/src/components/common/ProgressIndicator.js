import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../theme.js";
import { useAccessibility } from "../../context/AccessibilityContext.js";
import { getScale, textStyles } from "../../utils/typography.js";

const ProgressIndicator = ({ steps = [], currentStep = 0 }) => {
  const { textScale } = useAccessibility();
  const scale = getScale(textScale);
  const fonts = textStyles(scale);

  return (
    <View style={styles.container}>
      <View style={styles.barRow}>
        {steps.map((step, index) => (
          <View
            key={step}
            style={[
              styles.bar,
              {
                backgroundColor: index <= currentStep ? colors.accentTeal : "#e2e8f0",
              },
            ]}
          />
        ))}
      </View>
      <Text style={[fonts.sm, styles.label]}>
        Step {currentStep + 1} of {steps.length}: {steps[currentStep]}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  barRow: {
    flexDirection: "row",
    gap: 6,
  },
  bar: {
    flex: 1,
    height: 8,
    borderRadius: 999,
  },
  label: {
    color: colors.textSecondary,
  },
});

export default ProgressIndicator;
