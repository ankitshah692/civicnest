import { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { colors, radius } from "../../theme.js";
import SessionTimer from "./SessionTimer.js";
import ModalCard from "../common/ModalCard.js";
import { useAccessibility } from "../../context/AccessibilityContext.js";
import { getScale, textStyles } from "../../utils/typography.js";

const KioskShell = ({ children, onReset }) => {
  const { textScale } = useAccessibility();
  const scale = getScale(textScale);
  const fonts = textStyles(scale);
  const [showWarning, setShowWarning] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    const warningTimer = setTimeout(() => setShowWarning(true), 60000);
    return () => clearTimeout(warningTimer);
  }, [resetKey]);

  const handleTimeout = () => {
    if (onReset) {
      onReset();
    }
    setShowWarning(false);
    setResetKey((prev) => prev + 1);
  };

  const resetSession = () => {
    setShowWarning(false);
    setResetKey((prev) => prev + 1);
  };

  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        <View style={styles.topRow}>
          <View style={styles.badge}>
            <Text style={[fonts.sm, styles.badgeText]}>Public Kiosk • No login required</Text>
          </View>
          <SessionTimer key={resetKey} onTimeout={handleTimeout} />
          <Pressable style={styles.startOver} onPress={handleTimeout}>
            <Text style={[fonts.sm, styles.startOverText]}>Start Over</Text>
          </Pressable>
        </View>
        <ScrollView contentContainerStyle={styles.body}>{children}</ScrollView>
      </View>
      <ModalCard
        visible={showWarning}
        title="Session ending soon"
        description="For privacy, this kiosk will clear after 30 seconds of inactivity. Tap to continue."
        confirmLabel="Continue Session"
        onConfirm={resetSession}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    padding: 16,
  },
  frame: {
    flex: 1,
    borderRadius: radius.xl,
    borderWidth: 4,
    borderColor: "#e2e8f0",
    backgroundColor: colors.backgroundWhite,
    padding: 16,
  },
  topRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    alignItems: "center",
    justifyContent: "space-between",
  },
  badge: {
    backgroundColor: colors.primaryNavy,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  badgeText: {
    color: "#fff",
    fontWeight: "700",
  },
  startOver: {
    borderWidth: 2,
    borderColor: colors.primaryNavy,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  startOverText: {
    color: colors.primaryNavy,
    fontWeight: "700",
  },
  body: {
    marginTop: 16,
    gap: 16,
    paddingBottom: 16,
  },
});

export default KioskShell;
