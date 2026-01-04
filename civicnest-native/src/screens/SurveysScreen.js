import { useMemo, useState } from "react";
import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import ModeShell from "../components/common/ModeShell.js";
import ProgressIndicator from "../components/common/ProgressIndicator.js";
import AudioButton from "../components/common/AudioButton.js";
import BigButton from "../components/common/BigButton.js";
import { mockSurveys } from "../data/mockSurveys.js";
import { colors, radius } from "../theme.js";
import { useAccessibility } from "../context/AccessibilityContext.js";
import { getScale, textStyles } from "../utils/typography.js";

const scaleFaces = ["😞", "😕", "😐", "🙂", "😊"];

const SurveysScreen = () => {
  const [activeSurvey, setActiveSurvey] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [completed, setCompleted] = useState(false);
  const { textScale } = useAccessibility();
  const scale = getScale(textScale);
  const fonts = textStyles(scale);

  const survey = useMemo(
    () => mockSurveys.find((item) => item.id === activeSurvey),
    [activeSurvey]
  );

  const question = survey?.questions[currentIndex];

  const updateAnswer = (value) => {
    if (!question) return;
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  };

  const nextQuestion = () => {
    if (!survey) return;
    if (currentIndex === survey.questions.length - 1) {
      setCompleted(true);
      return;
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const prevQuestion = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  if (!survey) {
    return (
      <ModeShell>
        <View style={styles.header}>
          <Text style={[fonts["2xl"], styles.title]}>Surveys</Text>
          <Text style={[fonts.base, styles.subtitle]}>
            Share your voice through short, easy surveys.
          </Text>
        </View>
        {mockSurveys.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={[fonts.xl, styles.title]}>{item.title}</Text>
            <Text style={[fonts.base, styles.subtitle]}>{item.description}</Text>
            <Text style={[fonts.sm, styles.meta]}>Estimated time: {item.timeEstimate}</Text>
            <BigButton
              label="Start Survey"
              variant="secondary"
              onPress={() => {
                setActiveSurvey(item.id);
                setCurrentIndex(0);
                setAnswers({});
                setCompleted(false);
              }}
            />
          </View>
        ))}
      </ModeShell>
    );
  }

  if (completed) {
    return (
      <ModeShell>
        <View style={[styles.card, styles.centered]}>
          <Text style={[fonts["2xl"], styles.title]}>Thank you!</Text>
          <Text style={[fonts.base, styles.subtitle]}>Your survey answers have been saved.</Text>
          <BigButton label="Back to Surveys" onPress={() => setActiveSurvey(null)} />
        </View>
      </ModeShell>
    );
  }

  return (
    <ModeShell>
      <View style={styles.header}>
        <Text style={[fonts["2xl"], styles.title]}>{survey.title}</Text>
        <Text style={[fonts.base, styles.subtitle]}>{survey.description}</Text>
        <ProgressIndicator steps={survey.questions.map((q) => q.text)} currentStep={currentIndex} />
      </View>

      <View style={styles.card}>
        <View style={styles.rowBetween}>
          <Text style={[fonts.xl, styles.title]}>{question.text}</Text>
          <AudioButton text={question.text} />
        </View>

        {question.type === "single" && (
          <View style={styles.optionList}>
            {question.options.map((option) => (
              <Pressable key={option} style={styles.option} onPress={() => updateAnswer(option)}>
                <Text style={[fonts.base, styles.optionText]}>{option}</Text>
                <Text style={[fonts.base, styles.optionCheck]}>
                  {answers[question.id] === option ? "✓" : ""}
                </Text>
              </Pressable>
            ))}
          </View>
        )}

        {question.type === "multiple" && (
          <View style={styles.optionList}>
            {question.options.map((option) => {
              const selected = answers[question.id] || [];
              const checked = selected.includes(option);
              return (
                <Pressable
                  key={option}
                  style={styles.option}
                  onPress={() => {
                    const updated = checked
                      ? selected.filter((item) => item !== option)
                      : [...selected, option];
                    updateAnswer(updated);
                  }}
                >
                  <Text style={[fonts.base, styles.optionText]}>{option}</Text>
                  <Text style={[fonts.base, styles.optionCheck]}>{checked ? "✓" : ""}</Text>
                </Pressable>
              );
            })}
          </View>
        )}

        {question.type === "scale" && (
          <View style={styles.scaleRow}>
            {question.options.map((option, index) => (
              <Pressable
                key={option}
                style={[
                  styles.scaleButton,
                  answers[question.id] === option && styles.scaleButtonActive,
                ]}
                onPress={() => updateAnswer(option)}
              >
                <Text style={[fonts.lg, styles.scaleEmoji]}>{scaleFaces[index]}</Text>
                <Text style={[fonts.base, styles.optionText]}>{option}</Text>
              </Pressable>
            ))}
          </View>
        )}

        {question.type === "text" && (
          <TextInput
            style={[fonts.base, styles.input, styles.textArea]}
            placeholder="Type your answer here"
            value={answers[question.id] || ""}
            onChangeText={(value) => updateAnswer(value)}
            multiline
          />
        )}

        <View style={styles.row}>
          <Pressable style={styles.outlineButton} onPress={prevQuestion} disabled={currentIndex === 0}>
            <Text style={[fonts.base, styles.outlineText]}>Previous</Text>
          </Pressable>
          <Pressable style={styles.primaryButton} onPress={nextQuestion}>
            <Text style={[fonts.base, styles.primaryText]}>Next</Text>
          </Pressable>
        </View>
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
  meta: {
    color: colors.textSecondary,
  },
  card: {
    backgroundColor: colors.backgroundWhite,
    padding: 20,
    borderRadius: radius.lg,
    gap: 12,
  },
  centered: {
    alignItems: "center",
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  optionList: {
    gap: 10,
  },
  option: {
    borderWidth: 2,
    borderColor: "#e2e8f0",
    padding: 12,
    borderRadius: radius.lg,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  optionText: {
    color: colors.textSecondary,
    fontWeight: "600",
  },
  optionCheck: {
    color: colors.accentTeal,
    fontWeight: "700",
  },
  scaleRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  scaleButton: {
    borderWidth: 2,
    borderColor: "#e2e8f0",
    borderRadius: radius.lg,
    padding: 12,
    alignItems: "center",
    width: 80,
  },
  scaleButtonActive: {
    borderColor: colors.accentTeal,
    backgroundColor: "#e6fffa",
  },
  scaleEmoji: {
    marginBottom: 4,
  },
  input: {
    borderWidth: 2,
    borderColor: "#e2e8f0",
    borderRadius: radius.lg,
    padding: 12,
  },
  textArea: {
    minHeight: 120,
    textAlignVertical: "top",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  outlineButton: {
    borderWidth: 2,
    borderColor: colors.primaryNavy,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: radius.lg,
  },
  outlineText: {
    color: colors.primaryNavy,
    fontWeight: "700",
  },
  primaryButton: {
    backgroundColor: colors.accentTeal,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: radius.lg,
  },
  primaryText: {
    color: "#fff",
    fontWeight: "700",
  },
});

export default SurveysScreen;
