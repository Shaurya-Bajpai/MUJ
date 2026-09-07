import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';
import Login from './login/login';
import Home from './home/home';
import Details from './home/details';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      {/* <AppTabs /> */}
      {/* <Home /> */}
      <Details 
        courseCode="MBA6102"
        courseName="MANAGERIAL ECONOMICS"
        present={8}
        absent={5}
      />
      {/* <Login /> */}
    </ThemeProvider>
  );
}
