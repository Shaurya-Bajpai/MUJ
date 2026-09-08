import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import Login from './login/login';
import DetailScreen from './screens/details';
import HomeScreen from './home';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      {/* <AppTabs /> */}
      {/* <Details
        courseCode="MBA6102"
        courseName="MANAGERIAL ECONOMICS"
        present={8}
        absent={5}
      /> */}
      {/* <Login /> */}
      <HomeScreen firstName="Shaurya" />
    </ThemeProvider>
  );
}
