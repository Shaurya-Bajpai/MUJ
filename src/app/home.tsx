import { StyleSheet, Text, View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/build/MaterialIcons'
import AttendanceScreen from './screens/attendance';
import TimeTableScreen from './screens/timetable';

type HomeProps = {
  firstName: string;
};

export default function HomeScreen({ firstName }: HomeProps) {
  return (
    <View style={styles.container}>


      {/* Header */}
      <View style={styles.header}>
          <Text style={styles.hello}>Hello, {firstName}</Text>

        <Text style={styles.sem}>
          <MaterialIcons
            name="refresh"
            size={20}
            color="#62dcf5"
          />
        </Text>
      </View>

      <View style={{
          height: 1,
          backgroundColor: '#263147',
          marginTop: 6,
      }} />


      {/* <AttendanceScreen firstName="John" /> */}
      <TimeTableScreen />

      {/* Bottom navigation */}
      <View style={styles.nav}>
        <Text style={styles.navActive}>
          <MaterialIcons name="home" size={20} color="#45e5ad" />
          {'\n'}Home
        </Text>

        <Text style={styles.navText}>
          <MaterialIcons name="calendar-today" size={20} color="#9ca8bb" />
          {'\n'}Timetable
        </Text>

        <Text style={styles.navText}>
          <MaterialIcons name="bar-chart" size={20} color="#9ca8bb" />
          {'\n'}Analytics
        </Text>

        <Text style={styles.navText}>
          <MaterialIcons name="person" size={20} color="#9ca8bb" />
          {'\n'}Profile
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#080e18',
    },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 6,
  },

  hello: {
    color: '#9aa5b7',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
  },

  heading: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '900',
  },

  sem: {
    backgroundColor: '#172337',
    padding: 12,
    borderRadius: 25,
  },
  nav: {
    height: 75,
    backgroundColor: '#0d1523',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  navText: {
    color: '#596476',
    textAlign: 'center',
    fontSize: 11,
  },

  navActive: {
    color: '#45e5ad',
    textAlign: 'center',
    fontSize: 11,
  },
})