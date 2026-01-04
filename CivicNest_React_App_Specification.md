# CivicNest React App - Technical Specification

## Overview

**Project Name:** CivicNest Demo Application  
**Purpose:** Interactive pitch demonstration showcasing the CivicNest platform for civic engagement accessibility for seniors with cognitive impairment  
**Tagline:** "Securing the future with the past"

---

## 1. Product Vision

CivicNest is a civic engagement platform designed specifically for seniors (65+), particularly those with Mild Cognitive Impairment (MCI). The demo app should showcase:

- **Cognitive-friendly UX**: Large buttons, minimal choices, predictable screens
- **Voice-first navigation**: Audio guidance capabilities
- **Dual access modes**: Mobile app view + Kiosk simulation
- **Senior-focused news**: Plain-language civic updates
- **Issue reporting**: Simplified municipal reporting flow
- **Accessibility**: High contrast, large text, intuitive navigation

---

## 2. Design System

### 2.1 Color Palette

```css
/* Primary Colors */
--primary-navy: #1a365d;      /* Main brand color from deck */
--primary-blue: #2c5282;      /* Secondary brand */
--accent-purple: #805ad5;     /* "Nest" accent color */
--accent-teal: #38b2ac;       /* CTA highlights */

/* Semantic Colors */
--background-light: #e8eef4;  /* Light gray-blue background */
--background-white: #ffffff;
--text-primary: #1a365d;
--text-secondary: #4a5568;

/* Accessibility Colors */
--high-contrast-bg: #000000;
--high-contrast-text: #ffffff;
--success-green: #38a169;
--warning-orange: #dd6b20;
```

### 2.2 Typography

```css
/* Primary Font - Senior-friendly, high readability */
--font-primary: 'Nunito', 'Segoe UI', sans-serif;

/* Display Font - For headers */
--font-display: 'Poppins', 'Arial Black', sans-serif;

/* Font Sizes - Larger than standard for accessibility */
--text-xs: 1rem;        /* 16px minimum */
--text-sm: 1.125rem;    /* 18px */
--text-base: 1.25rem;   /* 20px - body text */
--text-lg: 1.5rem;      /* 24px */
--text-xl: 2rem;        /* 32px */
--text-2xl: 2.5rem;     /* 40px */
--text-3xl: 3rem;       /* 48px - main headings */
```

### 2.3 Component Standards

- **Minimum button size**: 64px height, 200px width
- **Minimum touch target**: 48x48px
- **Border radius**: 12-16px (friendly, rounded corners)
- **Spacing**: 24px minimum between interactive elements
- **Icons**: Minimum 32px, paired with text labels always

---

## 3. Application Architecture

### 3.1 Tech Stack

```
Framework: React 18+
Routing: React Router v6
State: React Context + useReducer
Styling: Tailwind CSS + Custom CSS variables
Icons: Lucide React
Animations: Framer Motion (subtle, purposeful)
Audio: Web Speech API (text-to-speech)
Build: Vite
```

### 3.2 Project Structure

```
civicnest-demo/
├── public/
│   ├── audio/              # Pre-recorded audio prompts
│   └── images/             # App images and icons
├── src/
│   ├── components/
│   │   ├── common/         # Reusable UI components
│   │   │   ├── BigButton.jsx
│   │   │   ├── NavBar.jsx
│   │   │   ├── AudioPlayer.jsx
│   │   │   ├── ProgressIndicator.jsx
│   │   │   └── Modal.jsx
│   │   ├── kiosk/          # Kiosk-specific components
│   │   │   ├── KioskShell.jsx
│   │   │   ├── WelcomeScreen.jsx
│   │   │   └── SessionTimer.jsx
│   │   └── app/            # Mobile app components
│   │       ├── AppShell.jsx
│   │       ├── CaregiverDashboard.jsx
│   │       └── MemoryRecaps.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── News.jsx
│   │   ├── ReportIssue.jsx
│   │   ├── Surveys.jsx
│   │   ├── Events.jsx
│   │   └── GetInvolved.jsx
│   ├── context/
│   │   ├── AppContext.jsx
│   │   └── AccessibilityContext.jsx
│   ├── hooks/
│   │   ├── useVoiceGuidance.js
│   │   └── useAccessibility.js
│   ├── data/
│   │   ├── mockNews.js
│   │   ├── mockSurveys.js
│   │   └── mockEvents.js
│   ├── utils/
│   │   └── textToSpeech.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
└── vite.config.js
```

---

## 4. Core Features & Screens

### 4.1 Mode Selection (Landing Page)

**Purpose:** Allow demo viewers to choose between App mode and Kiosk mode

**UI Elements:**
- CivicNest logo (centered, animated entry)
- Tagline: "Securing the future with the past"
- Two large cards:
  - 📱 "Try the Mobile App" - Phone mockup view
  - 🖥️ "Try the Kiosk" - Simulated kiosk interface
- Brief description under each option

**Interactions:**
- Hover/focus states with gentle scale animation
- Click navigates to respective mode

---

### 4.2 Home Screen (Both Modes)

**Layout:**
```
┌─────────────────────────────────┐
│     CIVICNEST                   │
│     Welcome to CivicNest!       │
│     Select an option to begin   │
├─────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐    │
│  │ 📋       │  │ 📰       │    │
│  │ Get      │  │ News     │    │
│  │ Involved │  │          │    │
│  └──────────┘  └──────────┘    │
│  ┌──────────┐  ┌──────────┐    │
│  │ ✓        │  │ 📅       │    │
│  │ Surveys  │  │ Events   │    │
│  └──────────┘  └──────────┘    │
├─────────────────────────────────┤
│  🔊 Listen to instructions      │
└─────────────────────────────────┘
```

**Features:**
- 4 main navigation buttons (large, icon + text)
- Audio guidance toggle (speaks navigation options)
- High contrast mode toggle
- Text size adjustment (+/-)

---

### 4.3 News Page

**Purpose:** Plain-language civic updates for seniors

**Header:** "Today's Updates" with date

**News Card Component:**
```jsx
{
  id: 1,
  title: "City Council Meeting Summary",
  plainSummary: "The city council met yesterday. They decided to fix the roads on Main Street. Work starts next Monday.",
  category: "Local Government",
  date: "January 3, 2026",
  readTime: "2 min",
  audioAvailable: true
}
```

**UI Elements per card:**
- Large readable headline
- Plain-language summary (8th grade reading level max)
- Category badge
- "Read Aloud" button (🔊)
- "Read More" expansion
- Visual icons representing category

**Filters:**
- "All Updates"
- "City News"
- "Community Events"
- "Public Safety"

---

### 4.4 Report an Issue Page

**Purpose:** Simplified municipal issue reporting

**Multi-step wizard flow:**

**Step 1 - What's the problem?** (Large icon buttons)
```
🚧 Road/Sidewalk Problem
💡 Street Light Out
🗑️ Garbage/Litter
🚗 Parking Issue
🌳 Tree/Park Concern
❓ Something Else
```

**Step 2 - Where is it?**
- Large text input for address OR
- "Use my location" button
- Simple map with pin (optional)

**Step 3 - Tell us more (optional)**
- Large textarea
- Voice input option 🎤
- Optional photo upload (simplified)

**Step 4 - Confirm & Submit**
- Summary of report
- Large "Submit Report" button
- "Go Back" option

**Step 5 - Success Screen**
- ✅ Checkmark animation
- "Your report was sent!"
- Reference number
- "Report Another Issue" or "Go Home"

---

### 4.5 Surveys Page

**Purpose:** Simplified civic surveys

**Survey List View:**
- Active surveys with large cards
- Title, brief description, estimated time
- Progress indicator if partially complete

**Survey Taking View:**
- One question per screen
- Large radio buttons / checkboxes
- Clear progress bar (Step 2 of 5)
- "Previous" and "Next" navigation
- Audio option for questions

**Question Types to Support:**
1. Single choice (large radio buttons)
2. Multiple choice (large checkboxes)
3. Scale (1-5 with emoji faces: 😞 😕 😐 🙂 😊)
4. Short text (large input)

**Mock Survey Data:**
```javascript
{
  id: 1,
  title: "Community Park Improvements",
  description: "Help us decide how to improve Lincoln Park",
  questions: 4,
  timeEstimate: "3 minutes",
  status: "new"
}
```

---

### 4.6 Events Page

**Purpose:** Community events in accessible format

**Event Card:**
- Large title
- Date & Time (prominently displayed)
- Location with simple map preview
- "Add to Calendar" button
- "Get Directions" button
- "Learn More" expansion

**Filters:**
- "This Week"
- "This Month"
- "Near Me"

---

### 4.7 Get Involved Page

**Purpose:** Ways to participate in civic life

**Sections:**
1. **Volunteer Opportunities** - Simple cards with sign-up
2. **Contact Your Representative** - Simplified contact flow
3. **Register to Vote** - Information and links
4. **Community Groups** - Local organizations

---

## 5. Kiosk-Specific Features

### 5.1 Kiosk Shell

**Visual Elements:**
- Simulated kiosk frame/bezel
- "Public Kiosk" indicator
- Session timer (visible countdown)
- "Start Over" button always visible
- Proximity sensor indicator (simulated)

### 5.2 Auto-Clear Session

- 60-second inactivity warning modal
- 90-second auto-logout
- Visual and audio countdown
- All data cleared on session end

### 5.3 Anonymous Mode Indicator

- "No login required" badge
- Privacy reassurance message
- "Your information is not saved"

---

## 6. App-Specific Features

### 6.1 Caregiver Dashboard (App Only)

**Access:** Toggle in settings or separate login

**Dashboard Elements:**
- Activity summary for connected senior
- Engagement metrics (surveys completed, news read)
- Gentle reminder scheduling
- Notes section

### 6.2 Memory-Friendly Recaps

- "Welcome back!" with personalized message
- "Last time you..." recap
- "You read about..." recent news summary
- Encouragement messages

### 6.3 Personalized News Feed

- Interests selection during onboarding
- Algorithm-free, curated content
- Saved articles section

---

## 7. Accessibility Features

### 7.1 Voice Guidance System

```javascript
// useVoiceGuidance hook
const useVoiceGuidance = () => {
  const speak = (text, options = {}) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = options.rate || 0.85; // Slower for seniors
    utterance.pitch = options.pitch || 1;
    utterance.volume = options.volume || 1;
    speechSynthesis.speak(utterance);
  };
  
  return { speak, stop, isSpeaking };
};
```

**Voice announcements for:**
- Page navigation
- Button focus
- Form instructions
- Success/error feedback
- News article reading

### 7.2 High Contrast Mode

- Toggle in header/settings
- Inverts to dark background, white text
- Increases border visibility
- Removes background patterns

### 7.3 Text Size Controls

- Three sizes: Regular, Large, Extra Large
- Scales all text proportionally
- Persists in localStorage

### 7.4 Keyboard Navigation

- Full keyboard accessibility
- Visible focus indicators (thick, colored)
- Skip links for screen readers
- Logical tab order

---

## 8. Mock Data Requirements

### 8.1 News Articles (5-8 items)

```javascript
// mockNews.js
export const mockNews = [
  {
    id: 1,
    title: "Road Work on Oak Street",
    summary: "Starting Monday, workers will fix potholes on Oak Street between 1st and 5th Avenue. Please use Maple Street instead.",
    fullText: "...",
    category: "traffic",
    date: "2026-01-04",
    important: true
  },
  // ... more items
];
```

### 8.2 Surveys (2-3 items)

```javascript
// mockSurveys.js
export const mockSurveys = [
  {
    id: 1,
    title: "Senior Center Programs",
    description: "What activities would you like at the Senior Center?",
    questions: [
      {
        id: 1,
        type: "single",
        text: "How often do you visit the Senior Center?",
        options: ["Never", "Sometimes", "Often", "Every week"]
      },
      // ... more questions
    ]
  }
];
```

### 8.3 Events (4-6 items)

```javascript
// mockEvents.js
export const mockEvents = [
  {
    id: 1,
    title: "Community Coffee Hour",
    date: "2026-01-10",
    time: "10:00 AM",
    location: "City Library, Main Room",
    description: "Join your neighbors for coffee and conversation."
  }
];
```

---

## 9. Animations & Interactions

### 9.1 Page Transitions

- Subtle fade-in (200ms)
- Gentle slide-up for content entry
- No jarring or fast animations

### 9.2 Button Interactions

```css
.big-button {
  transition: transform 0.2s, box-shadow 0.2s;
}
.big-button:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}
.big-button:active {
  transform: scale(0.98);
}
```

### 9.3 Loading States

- Simple spinner with "Loading..." text
- Progress bars for multi-step processes
- Skeleton screens avoided (can be confusing)

### 9.4 Success Animations

- Large checkmark with scale-up animation
- Confetti optional for survey completion
- Clear, celebratory feedback

---

## 10. Responsive Breakpoints

```css
/* Mobile First - this IS the primary experience */
/* Base: 320px+ (large phone / kiosk simulation) */

/* Tablet/Small Desktop: 768px+ */
@media (min-width: 768px) {
  /* Side-by-side layouts where appropriate */
}

/* Desktop: 1024px+ */
@media (min-width: 1024px) {
  /* Kiosk simulation with frame */
  /* Dashboard layouts for caregiver view */
}
```

---

## 11. Performance Requirements

- Initial load < 3 seconds
- Time to interactive < 2 seconds
- No layout shifts after load
- Images optimized and lazy-loaded
- Works offline (basic functionality via service worker)

---

## 12. Demo Scenarios

### Scenario 1: Mrs. Alvarez Reports a Streetlight

1. User arrives at kiosk home screen
2. Voice says "Welcome to CivicNest. How can we help you today?"
3. Taps "Get Involved"
4. Taps "Report an Issue"
5. Selects "Street Light Out"
6. Enters location (or uses "Near this kiosk")
7. Optionally adds note
8. Confirms and submits
9. Sees success message with reference number

### Scenario 2: Reading Today's News

1. User taps "News"
2. Sees today's civic updates
3. Taps "Read Aloud" on an article
4. Voice reads the plain-language summary
5. User can tap "Stop" or let it finish
6. Taps another article or returns home

### Scenario 3: Completing a Survey

1. User taps "Surveys"
2. Sees available survey about park improvements
3. Taps "Start Survey"
4. Answers 4 questions (one per screen)
5. Reviews answers on summary screen
6. Submits survey
7. Sees "Thank you!" confirmation

---

## 13. Implementation Priorities

### Phase 1 - Core Demo (MVP)

1. ✅ Landing page with mode selection
2. ✅ Home screen with navigation
3. ✅ News page with mock articles
4. ✅ Report Issue flow (simplified)
5. ✅ Basic accessibility (high contrast, text size)
6. ✅ Voice guidance for navigation

### Phase 2 - Enhanced Demo

7. Surveys page with one complete survey
8. Events page
9. Kiosk auto-clear timer
10. Caregiver dashboard preview

### Phase 3 - Polish

11. Full animations
12. All mock data populated
13. Offline support
14. Print/export capabilities

---

## 14. Environment Setup Instructions

```bash
# Create new Vite React project
npm create vite@latest civicnest-demo -- --template react

# Navigate to project
cd civicnest-demo

# Install dependencies
npm install react-router-dom lucide-react framer-motion

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Start development server
npm run dev
```

### Tailwind Config

```javascript
// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'civic-navy': '#1a365d',
        'civic-blue': '#2c5282',
        'civic-purple': '#805ad5',
        'civic-teal': '#38b2ac',
        'civic-light': '#e8eef4',
      },
      fontFamily: {
        'display': ['Poppins', 'sans-serif'],
        'body': ['Nunito', 'sans-serif'],
      },
      fontSize: {
        'senior-sm': '1.125rem',
        'senior-base': '1.25rem',
        'senior-lg': '1.5rem',
        'senior-xl': '2rem',
        'senior-2xl': '2.5rem',
      }
    },
  },
  plugins: [],
}
```

---

## 15. Key Success Metrics for Demo

The demo should clearly show:

1. **Simplicity**: "My grandmother could use this"
2. **Accessibility**: Voice, high contrast, large targets
3. **Trust**: Clear, calm, non-overwhelming interface
4. **Functionality**: Complete user journeys work
5. **Differentiation**: Unlike generic civic apps

---

## 16. Assets Needed

### Images
- CivicNest logo (SVG preferred)
- Category icons (6-8 simple icons)
- Success checkmark animation
- Placeholder images for news (optional)

### Audio (if pre-recorded preferred)
- Welcome message
- Navigation prompts
- Success confirmations

### Fonts (Google Fonts)
- Poppins (600, 700)
- Nunito (400, 600, 700)

---

## Appendix A: Component API Reference

### BigButton Component

```jsx
<BigButton
  icon={<Home />}           // Lucide icon
  label="Go Home"           // Button text
  onClick={() => {}}        // Click handler
  variant="primary"         // primary | secondary | outline
  size="large"              // large | medium
  audioLabel="Go to home page"  // Voice announcement
  disabled={false}
/>
```

### NewsCard Component

```jsx
<NewsCard
  article={articleObject}
  onReadAloud={() => {}}
  onExpand={() => {}}
/>
```

### StepWizard Component

```jsx
<StepWizard
  steps={['Select Type', 'Location', 'Details', 'Confirm']}
  currentStep={2}
  onNext={() => {}}
  onBack={() => {}}
  onComplete={() => {}}
>
  {/* Step content */}
</StepWizard>
```

---

## Appendix B: Accessibility Checklist

- [ ] All interactive elements have visible focus states
- [ ] Color contrast ratio ≥ 4.5:1 (normal text) / 3:1 (large text)
- [ ] All images have alt text
- [ ] Form inputs have associated labels
- [ ] Error messages are announced to screen readers
- [ ] No content relies solely on color to convey meaning
- [ ] Touch targets are minimum 48x48px
- [ ] Text can be resized up to 200% without loss of functionality
- [ ] Keyboard navigation follows logical order
- [ ] No time limits without user control

---

*End of Specification Document*

**Version:** 1.0  
**Last Updated:** January 4, 2026  
**Prepared for:** CivicNest Pitch Demo
