import { Pressable, StyleSheet, Text, View } from 'react-native'
import MaterialIcons from '@expo/vector-icons/build/MaterialIcons'
import AttendanceScreen from './screens/attendance';
import TimeTableScreen from './screens/timetable';
import ResultScreen from './screens/result';
import DetailScreen from './screens/details';
import { useState } from 'react';
import ProfileScreen from './screens/profile';

type HomeProps = {
  firstName: string;
  lastName?: string;
};

export default function HomeScreen({ 
    firstName,
    lastName
  }: HomeProps) {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  
  if (activeTab === 'detail' && selectedCourse) {
    return (
      <DetailScreen
        courseCode={selectedCourse.id}
        courseName={selectedCourse.title}
        present={selectedCourse.present}
        absent={selectedCourse.total - selectedCourse.present}
        onBack={() => setActiveTab('home')}
      />
    );
  }
  
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

      {activeTab === 'home' && (
        <AttendanceScreen
          onCoursePress={(course) => {
            setSelectedCourse(course);
            setActiveTab('detail');
          }}
        />
      )}

      {activeTab === 'timetable' && <TimeTableScreen />}

      {activeTab === 'analytics' && <ResultScreen />}

      {activeTab === 'profile' && (
        <ProfileScreen
          name={firstName+ ' ' + lastName}
          rollNo="123456"
          mobile="9876543210"
          email="shaurya.123456@muj.manipal.edu"
          branch="Computer Science & Engineering"
          semester="I"
        />
      )}

      {/* Bottom navigation */}
      <View style={styles.nav}>
        <Pressable
          style={styles.navItem}
          onPress={() => setActiveTab('home')}
        >
          <MaterialIcons name="home" size={20} color={activeTab === 'home' ? '#45e5ad' : '#9ca8bb'} />
          <Text style={[styles.navText, activeTab === 'home' && styles.navActive]}>Home</Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={() => setActiveTab('timetable')}
        >
          <MaterialIcons name="calendar-today" size={20} color={activeTab === 'timetable' ? '#45e5ad' : '#9ca8bb'} />
          <Text style={[styles.navText, activeTab === 'timetable' && styles.navActive]}>Timetable</Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={() => setActiveTab('analytics')}
        >
          <MaterialIcons name="bar-chart" size={20} color={activeTab === 'analytics' ? '#45e5ad' : '#9ca8bb'} />
          <Text style={[styles.navText, activeTab === 'analytics' && styles.navActive]}>Analytics</Text>
        </Pressable>

        <Pressable
          style={styles.navItem}
          onPress={() => setActiveTab('profile')}
        >
          <MaterialIcons name="person" size={20} color={activeTab === 'profile' ? '#45e5ad' : '#9ca8bb'} />
          <Text style={[styles.navText, activeTab === 'profile' && styles.navActive]}>Profile</Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#080e18',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 70,
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
    fontWeight: '600',
  },

  navActive: {
    color: '#45e5ad',
    textAlign: 'center',
    fontSize: 12,
    fontWeight: 'bold',
  },
})