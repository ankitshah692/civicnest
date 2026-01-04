export const mockSurveys = [
  {
    id: 1,
    title: "Community Park Improvements",
    description: "Help us decide how to improve Lincoln Park",
    timeEstimate: "3 minutes",
    status: "new",
    questions: [
      {
        id: 1,
        type: "single",
        text: "How often do you visit Lincoln Park?",
        options: ["Never", "Sometimes", "Often", "Every week"],
      },
      {
        id: 2,
        type: "multiple",
        text: "What would you like to see more of?",
        options: ["Benches", "Shade", "Walking paths", "Gardens"],
      },
      {
        id: 3,
        type: "scale",
        text: "How safe do you feel at the park?",
        options: ["1", "2", "3", "4", "5"],
      },
      {
        id: 4,
        type: "text",
        text: "Any other ideas to share?",
      },
    ],
  },
  {
    id: 2,
    title: "Senior Center Programs",
    description: "What activities would you like at the Senior Center?",
    timeEstimate: "4 minutes",
    status: "new",
    questions: [
      {
        id: 1,
        type: "single",
        text: "How often do you visit the Senior Center?",
        options: ["Never", "Sometimes", "Often", "Every week"],
      },
      {
        id: 2,
        type: "multiple",
        text: "Which activities interest you?",
        options: ["Art classes", "Fitness", "Cooking", "Book club"],
      },
      {
        id: 3,
        type: "scale",
        text: "How welcoming does the center feel?",
        options: ["1", "2", "3", "4", "5"],
      },
    ],
  },
];
