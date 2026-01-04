import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import BigButton from "../components/common/BigButton.js";
import AudioButton from "../components/common/AudioButton.js";
import MemoryRecapCard from "../components/app/MemoryRecapCard.js";
import ModeShell from "../components/common/ModeShell.js";
import { useAppMode } from "../context/AppModeContext.js";
import { useAccessibility } from "../context/AccessibilityContext.js";
import { getScale, textStyles } from "../utils/typography.js";
import { colors, radius } from "../theme.js";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { mode } = useAppMode();
  const { textScale } = useAccessibility();
  const scale = getScale(textScale);
  const fonts = textStyles(scale);

  const goTo = (screen) => navigation.navigate(screen);

  return (
    <ModeShell onReset={() => navigation.navigate("Home")}>
      {mode === "app" && <MemoryRecapCard />}

      <View style={styles.card}>
        <Text style={[fonts["2xl"], styles.title]}>Welcome to CivicNest!</Text>
        <Text style={[fonts.base, styles.subtitle]}>Select an option to begin.</Text>

        <View style={styles.grid}>
          <BigButton label="Get Involved" onPress={() => goTo("GetInvolved")} />
          <BigButton label="News" variant="secondary" onPress={() => goTo("News")} />
          <BigButton label="Surveys" variant="outline" onPress={() => goTo("Surveys")} />
          <BigButton label="Events" onPress={() => goTo("Events")} />
        </View>

        <AudioButton
          text="Welcome to CivicNest. Choose Get Involved, News, Surveys, or Events to continue."
          label="Listen to instructions"
        />
      </View>
    </ModeShell>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.backgroundWhite,
    padding: 20,
    borderRadius: radius.lg,
    gap: 12,
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
});

export default HomeScreen;
