import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { AccessibilityProvider } from "./src/context/AccessibilityContext.js";
import { AppModeProvider } from "./src/context/AppModeContext.js";
import LandingScreen from "./src/screens/LandingScreen.js";
import KioskLocationsScreen from "./src/screens/KioskLocationsScreen.js";
import HomeScreen from "./src/screens/HomeScreen.js";
import NewsScreen from "./src/screens/NewsScreen.js";
import ReportIssueScreen from "./src/screens/ReportIssueScreen.js";
import SurveysScreen from "./src/screens/SurveysScreen.js";
import EventsScreen from "./src/screens/EventsScreen.js";
import GetInvolvedScreen from "./src/screens/GetInvolvedScreen.js";
import CaregiverScreen from "./src/screens/CaregiverScreen.js";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <AccessibilityProvider>
      <AppModeProvider>
        <NavigationContainer>
          <StatusBar style="dark" />
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Landing" component={LandingScreen} />
            <Stack.Screen name="KioskLocations" component={KioskLocationsScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="News" component={NewsScreen} />
            <Stack.Screen name="ReportIssue" component={ReportIssueScreen} />
            <Stack.Screen name="Surveys" component={SurveysScreen} />
            <Stack.Screen name="Events" component={EventsScreen} />
            <Stack.Screen name="GetInvolved" component={GetInvolvedScreen} />
            <Stack.Screen name="Caregiver" component={CaregiverScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AppModeProvider>
    </AccessibilityProvider>
  );
};

export default App;
