import { Pressable, StyleSheet, Text } from "react-native";
import { colors, radius } from "../../theme.js";
import useVoiceGuidance from "../../hooks/useVoiceGuidance.js";
import { useAccessibility } from "../../context/AccessibilityContext.js";
import { getScale, textStyles } from "../../utils/typography.js";

const AudioButton = ({ text, label = "Listen" }) => {
  const { textScale, highContrast } = useAccessibility();
  const { speak, stop, isSpeaking, enabled } = useVoiceGuidance();
  const scale = getScale(textScale);
  const fonts = textStyles(scale);

  const handlePress = () => {
    if (!enabled) {
      return;
    }
    if (isSpeaking) {
      stop();
    } else {
      speak(text);
    }
  };

  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        {
          borderColor: colors.accentTeal,
          backgroundColor: pressed ? "#e6fffa" : "transparent",
          opacity: enabled ? 1 : 0.5,
        },
      ]}
      onPress={handlePress}
      accessibilityRole="button"
    >
      <Text
        style={[
          fonts.sm,
          {
            color: highContrast ? colors.highContrastText : colors.accentTeal,
            fontWeight: "700",
          },
        ]}
      >
        {isSpeaking ? "Stop" : label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    borderWidth: 2,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: radius.lg,
    alignSelf: "flex-start",
  },
});

export default AudioButton;
