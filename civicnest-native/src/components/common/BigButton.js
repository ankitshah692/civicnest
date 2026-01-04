import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, radius } from "../../theme.js";
import { useAccessibility } from "../../context/AccessibilityContext.js";
import { getScale, textStyles } from "../../utils/typography.js";

const BigButton = ({ icon, label, onPress, variant = "primary", size = "large", disabled }) => {
  const { textScale, highContrast } = useAccessibility();
  const scale = getScale(textScale);
  const fonts = textStyles(scale);

  const styleMap = {
    primary: {
      backgroundColor: colors.primaryNavy,
      textColor: "#fff",
    },
    secondary: {
      backgroundColor: colors.accentTeal,
      textColor: "#fff",
    },
    outline: {
      backgroundColor: "transparent",
      textColor: colors.primaryNavy,
      borderColor: colors.primaryNavy,
      borderWidth: 2,
    },
  };

  const variantStyle = styleMap[variant] || styleMap.primary;
  const isLarge = size === "large";

  return (
    <Pressable
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: highContrast ? colors.highContrastBg : variantStyle.backgroundColor,
          opacity: pressed ? 0.92 : 1,
          borderColor: variantStyle.borderColor,
          borderWidth: variantStyle.borderWidth,
        },
        disabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
    >
      <View style={styles.content}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <Text
          style={[
            fonts[isLarge ? "lg" : "base"],
            {
              color: highContrast ? colors.highContrastText : variantStyle.textColor,
              fontWeight: "700",
            },
          ]}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    minHeight: 64,
    minWidth: 200,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: radius.lg,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  icon: {
    marginRight: 4,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default BigButton;
