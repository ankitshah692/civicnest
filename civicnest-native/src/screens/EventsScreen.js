import { View, Text, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import ModeShell from "../components/common/ModeShell.js";
import { mockEvents } from "../data/mockEvents.js";
import { colors, radius } from "../theme.js";
import { useAccessibility } from "../context/AccessibilityContext.js";
import { getScale, textStyles } from "../utils/typography.js";

const filters = ["This Week", "This Month", "Near Me"];

const EventsScreen = () => {
  const [activeFilter, setActiveFilter] = useState(filters[0]);
  const { textScale } = useAccessibility();
  const scale = getScale(textScale);
  const fonts = textStyles(scale);

  return (
    <ModeShell>
      <View style={styles.header}>
        <Text style={[fonts["2xl"], styles.title]}>Community Events</Text>
        <Text style={[fonts.base, styles.subtitle]}>
          Find gatherings, workshops, and civic activities.
        </Text>
        <View style={styles.filterRow}>
          {filters.map((filter) => (
            <Pressable
              key={filter}
              style={[
                styles.filterChip,
                filter === activeFilter && styles.filterChipActive,
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text
                style={[
                  fonts.sm,
                  styles.filterText,
                  filter === activeFilter && styles.filterTextActive,
                ]}
              >
                {filter}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {mockEvents.map((event) => (
        <View key={event.id} style={styles.card}>
          <Text style={[fonts.xl, styles.title]}>{event.title}</Text>
          <Text style={[fonts.sm, styles.meta]}>{event.date} • {event.time}</Text>
          <Text style={[fonts.sm, styles.meta]}>{event.location}</Text>
          <Text style={[fonts.base, styles.subtitle]}>{event.description}</Text>
          <View style={styles.row}>
            <Pressable style={styles.outlineButton}>
              <Text style={[fonts.sm, styles.outlineText]}>Add to Calendar</Text>
            </Pressable>
            <Pressable style={styles.secondaryButton}>
              <Text style={[fonts.sm, styles.secondaryText]}>Get Directions</Text>
            </Pressable>
          </View>
        </View>
      ))}
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
  filterRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  filterChip: {
    borderWidth: 2,
    borderColor: "#e2e8f0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  filterChipActive: {
    borderColor: colors.accentTeal,
    backgroundColor: "#e6fffa",
  },
  filterText: {
    color: colors.textSecondary,
    fontWeight: "700",
  },
  filterTextActive: {
    color: colors.accentTeal,
  },
  card: {
    backgroundColor: colors.backgroundWhite,
    padding: 20,
    borderRadius: radius.lg,
    gap: 8,
  },
  meta: {
    color: colors.textSecondary,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 8,
  },
  outlineButton: {
    borderWidth: 2,
    borderColor: colors.primaryNavy,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.lg,
  },
  outlineText: {
    color: colors.primaryNavy,
    fontWeight: "700",
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: colors.accentTeal,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.lg,
  },
  secondaryText: {
    color: colors.accentTeal,
    fontWeight: "700",
  },
});

export default EventsScreen;
