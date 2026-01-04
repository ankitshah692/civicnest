import { View, Text, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import { mockNews } from "../data/mockNews.js";
import ModeShell from "../components/common/ModeShell.js";
import AudioButton from "../components/common/AudioButton.js";
import { colors, radius } from "../theme.js";
import { useAccessibility } from "../context/AccessibilityContext.js";
import { getScale, textStyles } from "../utils/typography.js";

const filters = ["All Updates", "City News", "Community Events", "Public Safety"];

const categoryMap = {
  traffic: "City News",
  "local government": "City News",
  "community events": "Community Events",
  "public safety": "Public Safety",
};

const NewsScreen = () => {
  const [activeFilter, setActiveFilter] = useState(filters[0]);
  const [expanded, setExpanded] = useState(null);
  const { textScale } = useAccessibility();
  const scale = getScale(textScale);
  const fonts = textStyles(scale);

  const filtered = activeFilter === "All Updates"
    ? mockNews
    : mockNews.filter((item) => categoryMap[item.category] === activeFilter);

  return (
    <ModeShell>
      <View style={styles.header}>
        <Text style={[fonts["2xl"], styles.title]}>Today&apos;s Updates</Text>
        <Text style={[fonts.base, styles.subtitle]}>January 4, 2026</Text>
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

      {filtered.map((article) => (
        <View key={article.id} style={styles.card}>
          <View style={styles.rowBetween}>
            <View style={{ flex: 1 }}>
              <Text style={[fonts.xl, styles.cardTitle]}>{article.title}</Text>
              <Text style={[fonts.sm, styles.meta]}>{article.date} • {article.category}</Text>
            </View>
            <AudioButton text={article.summary} label="Read aloud" />
          </View>
          <Text style={[fonts.base, styles.summary]}>{article.summary}</Text>
          {expanded === article.id && (
            <Text style={[fonts.base, styles.summary]}>{article.fullText}</Text>
          )}
          <Pressable onPress={() => setExpanded(expanded === article.id ? null : article.id)}>
            <Text style={[fonts.sm, styles.link]}>{expanded === article.id ? "Show less" : "Read more"}</Text>
          </Pressable>
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
    gap: 10,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  cardTitle: {
    color: colors.primaryNavy,
    fontWeight: "700",
  },
  meta: {
    color: colors.textSecondary,
  },
  summary: {
    color: colors.textSecondary,
  },
  link: {
    color: colors.primaryBlue,
    fontWeight: "700",
  },
});

export default NewsScreen;
