import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import { colors, radius } from "../../theme.js";
import { useAccessibility } from "../../context/AccessibilityContext.js";
import { getScale, textStyles } from "../../utils/typography.js";

const ModalCard = ({ visible, title, description, confirmLabel = "Okay", onConfirm, onCancel }) => {
  const { textScale } = useAccessibility();
  const scale = getScale(textScale);
  const fonts = textStyles(scale);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={[fonts.xl, styles.title]}>{title}</Text>
          <Text style={[fonts.base, styles.description]}>{description}</Text>
          <View style={styles.actions}>
            <Pressable style={[styles.button, styles.confirm]} onPress={onConfirm}>
              <Text style={[fonts.base, styles.confirmText]}>{confirmLabel}</Text>
            </Pressable>
            {onCancel && (
              <Pressable style={[styles.button, styles.cancel]} onPress={onCancel}>
                <Text style={[fonts.base, styles.cancelText]}>Cancel</Text>
              </Pressable>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    backgroundColor: colors.backgroundWhite,
    borderRadius: radius.lg,
    padding: 24,
    gap: 12,
  },
  title: {
    color: colors.primaryNavy,
    fontWeight: "700",
  },
  description: {
    color: colors.textSecondary,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: radius.lg,
    alignItems: "center",
  },
  confirm: {
    backgroundColor: colors.accentTeal,
  },
  confirmText: {
    color: "#fff",
    fontWeight: "700",
  },
  cancel: {
    borderWidth: 2,
    borderColor: colors.primaryNavy,
  },
  cancelText: {
    color: colors.primaryNavy,
    fontWeight: "700",
  },
});

export default ModalCard;
