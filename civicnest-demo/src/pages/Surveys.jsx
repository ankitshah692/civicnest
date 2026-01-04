import { useMemo, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, Smile, Meh, Frown, Laugh } from "lucide-react";
import { mockSurveys } from "../data/mockSurveys.js";
import ProgressIndicator from "../components/common/ProgressIndicator.jsx";
import AudioPlayer from "../components/common/AudioPlayer.jsx";
import BigButton from "../components/common/BigButton.jsx";

const scaleIcons = [Frown, Meh, Smile, Smile, Laugh];

const Surveys = () => {
  const [activeSurvey, setActiveSurvey] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [completed, setCompleted] = useState(false);

  const survey = useMemo(
    () => mockSurveys.find((item) => item.id === activeSurvey),
    [activeSurvey]
  );

  const question = survey?.questions[currentIndex];

  const updateAnswer = (value) => {
    if (!question) {
      return;
    }
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
  };

  const nextQuestion = () => {
    if (!survey) {
      return;
    }
    if (currentIndex === survey.questions.length - 1) {
      setCompleted(true);
      return;
    }
    setCurrentIndex((prev) => prev + 1);
  };

  const prevQuestion = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  if (!survey) {
    return (
      <section className="space-y-6">
        <header className="rounded-xl bg-white/90 p-6 shadow-sm surface-panel">
          <h1 className="font-display text-senior-2xl text-civic-navy">Surveys</h1>
          <p className="mt-2 text-senior-base text-slate-600">
            Share your voice through short, easy surveys.
          </p>
        </header>

        <div className="grid gap-6">
          {mockSurveys.map((item) => (
            <div key={item.id} className="rounded-xl bg-white p-6 shadow-sm surface-panel">
              <h2 className="font-display text-senior-xl text-civic-navy">{item.title}</h2>
              <p className="mt-2 text-senior-base text-slate-600">{item.description}</p>
              <p className="mt-2 text-senior-sm text-slate-500">Estimated time: {item.timeEstimate}</p>
              <BigButton
                label="Start Survey"
                onClick={() => {
                  setActiveSurvey(item.id);
                  setCurrentIndex(0);
                  setCompleted(false);
                  setAnswers({});
                }}
                variant="secondary"
                audioLabel={`Start survey ${item.title}`}
              />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (completed) {
    return (
      <section className="space-y-6">
        <header className="rounded-xl bg-white p-6 text-center shadow-sm surface-panel">
          <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
          <h1 className="mt-4 font-display text-senior-2xl text-civic-navy">Thank you!</h1>
          <p className="mt-2 text-senior-base text-slate-600">Your survey answers have been saved.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <BigButton label="Back to Surveys" onClick={() => setActiveSurvey(null)} />
          </div>
        </header>
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <header className="rounded-xl bg-white/90 p-6 shadow-sm surface-panel">
        <h1 className="font-display text-senior-2xl text-civic-navy">{survey.title}</h1>
        <p className="mt-2 text-senior-base text-slate-600">{survey.description}</p>
        <div className="mt-4">
          <ProgressIndicator steps={survey.questions.map((q) => q.text)} currentStep={currentIndex} />
        </div>
      </header>

      <div className="rounded-xl bg-white p-6 shadow-sm surface-panel space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-senior-xl text-civic-navy">{question.text}</h2>
          <AudioPlayer text={question.text} />
        </div>

        {question.type === "single" && (
          <div className="space-y-3">
            {question.options.map((option) => (
              <label key={option} className="flex items-center gap-3 rounded-xl border-2 border-slate-200 p-4">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  className="h-6 w-6"
                  checked={answers[question.id] === option}
                  onChange={() => updateAnswer(option)}
                />
                <span className="text-senior-base text-slate-600">{option}</span>
              </label>
            ))}
          </div>
        )}

        {question.type === "multiple" && (
          <div className="space-y-3">
            {question.options.map((option) => {
              const selected = answers[question.id] || [];
              const checked = selected.includes(option);
              return (
                <label key={option} className="flex items-center gap-3 rounded-xl border-2 border-slate-200 p-4">
                  <input
                    type="checkbox"
                    className="h-6 w-6"
                    checked={checked}
                    onChange={() => {
                      const updated = checked
                        ? selected.filter((item) => item !== option)
                        : [...selected, option];
                      updateAnswer(updated);
                    }}
                  />
                  <span className="text-senior-base text-slate-600">{option}</span>
                </label>
              );
            })}
          </div>
        )}

        {question.type === "scale" && (
          <div className="grid gap-3 md:grid-cols-5">
            {question.options.map((option, index) => {
              const Icon = scaleIcons[index];
              const selected = answers[question.id] === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => updateAnswer(option)}
                  className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-senior-base font-semibold ${
                    selected ? "border-civic-teal bg-teal-50 text-civic-teal" : "border-slate-200"
                  }`}
                >
                  <Icon className="h-8 w-8" />
                  {option}
                </button>
              );
            })}
          </div>
        )}

        {question.type === "text" && (
          <textarea
            rows="4"
            className="w-full rounded-xl border-2 border-slate-200 p-4 text-senior-base"
            value={answers[question.id] || ""}
            onChange={(event) => updateAnswer(event.target.value)}
            placeholder="Type your answer here"
          />
        )}

        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={prevQuestion}
            className="flex items-center gap-2 rounded-xl border-2 border-civic-navy px-6 py-3 text-senior-base font-semibold text-civic-navy"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-5 w-5" /> Previous
          </button>
          <button
            type="button"
            onClick={nextQuestion}
            className="flex items-center gap-2 rounded-xl bg-civic-teal px-6 py-3 text-senior-base font-semibold text-white"
          >
            Next <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Surveys;
