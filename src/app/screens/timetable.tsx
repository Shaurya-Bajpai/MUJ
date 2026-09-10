import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const classes = [
  { id: "MBB6102", subject: 'MANAGERIAL ECONOMICS', timeIn: '09:50', timeOut: '10:40', location: 'R3AB0211' },
  { id: "MBA6109", subject: 'MARKETING MANAGEMENT', timeIn: '10:40', timeOut: '11:30', location: 'R3AB0211' },
  { id: "MBA6113", subject: 'FINANCIAL ACCOUNTING', timeIn: '11:30', timeOut: '12:20', location: 'R3AB0211' },
  { id: "MBA6115", subject: 'ORGANIZATIONAL BEHAVIOUR', timeIn: '12:20', timeOut: '01:10', location: 'R3AB0211' },
  { id: "MBB6108", subject: 'DATA ANALYSIS IN EXCEL', timeIn: '01:10', timeOut: '02:00', location: 'R3AB0211' },
  { id: "MBB6107", subject: 'PYTHON FOR DATA ANALYTICS', timeIn: '02:00', timeOut: '02:50', location: 'R3AB0211' },
];

const weekDays = [
  { value: 'Mon', label: 'Mon' },
  { value: 'Tue', label: 'Tue' },
  { value: 'Wed', label: 'Wed' },
  { value: 'Thu', label: 'Thu' },
  { value: 'Fri', label: 'Fri' },
];

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function getISTDay() {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    timeZone: 'Asia/Kolkata',
  }).format(new Date());
}

function getDefaultDay() {
  const day = getISTDay();

  if (day === 'Sun') {
    // Sunday → next week's Monday
    return 'Mon';
  }

  if (day === 'Sat') {
    // Saturday → Friday
    return 'Fri';
  }

  // Monday-Friday → today
  return day;
}

function getTodayDay() {
  return getISTDay();
}

export default function TimeTableScreen() {
  const today = getTodayDay();
  const [dayFilter, setDayFilter] = useState(getDefaultDay);

  return (
    <View style={styles.container}>

      <View style={{marginTop: 10, marginBottom: 16}}>
      {/* Week days */}
        <ScrollView horizontal={true} >
          <View style={styles.dayContainer}>

            {/* Week day filters */}
            {weekDays.map(({ value, label }) => {
              const isSelected = dayFilter === value;
              const isToday = today === value;

              return (
                <Pressable
                  key={value}
                  onPress={() => setDayFilter(value)}
                  style={[
                    styles.filter,
                    isSelected && styles.active,
                    isToday && { backgroundColor: '#1c2d42' },
                  ]}
                >
                  <Text
                    style={[
                      styles.filterText,
                      isSelected && { color: '#5de2f4' },
                      isToday && { backgroundColor: '#1c2d42' },
                    ]}
                  >
                    {label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      </View>

      {/* Section Divider */}
      <View style={styles.sectionDivider} />


      {/* Classes */}
      <View style={{ flex: 1}}>
      <ScrollView>
        {classes.map(({ id, subject, timeIn, timeOut, location }) => (
          <View key={id} style={styles.classContainer}>
            {/* Time details */}
            <View style={styles.timeContainer}>
              <Text style={[styles.timeText, { fontSize: 18, color: '#5de2f4', fontWeight: '800' }]}>{timeIn}</Text>
              <MaterialIcons name="arrow-downward" size={25} color="#9ca8bb" />
              <Text style={[styles.timeText, { color: '#6f757d' }]}>{timeOut}</Text>
            </View>

            {/* Subject details */}
            <View style={styles.detailContainer}>
              {/* <View style={styles.subjectParameterContainer} > */}
                {/* <MaterialIcons name="donut-large" size={16} color="#9ca8bb" style={{ marginRight: 4 }} /> */}
                <Text style={[styles.idText]}>{id}</Text>
              {/* </View> */}

              {/* <View style={styles.subjectParameterContainer} > */}
                {/* <MaterialIcons name="school" size={16} color="#9ca8bb" style={{ marginRight: 4 }} /> */}
                <Text style={[styles.detailText, styles.subjectText]}>{subject}</Text>
              {/* </View> */}
              
              <View style={styles.subjectParameterContainer} >
                <MaterialIcons name="location-on" size={16} color="#9ca8bb" style={{ marginRight: 6 }} />
                <Text style={styles.detailText}>{location}</Text>
              </View>

            </View>
          </View>
        ))}
      </ScrollView>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080e18',
    paddingHorizontal: 16,
  },
  
  sectionDivider: {
    height: 1,
    backgroundColor: '#263147',
    marginBottom: 12,
  },

  dayContainer: {
    height: 50,
    flexDirection: 'row',
    gap: 10,
  },

  filter: {
    backgroundColor: '#172337',
    paddingHorizontal: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },

  filterText: {
    color: '#aeb8c8',
    fontSize: 13,
  },

  // Selected day
  active: {
    borderWidth: 1,
    borderColor: '#08aabd',
  },



  classContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#121c2d',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#233044',
    padding: 16,
    marginBottom: 12,
  },
  timeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  subjectParameterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },



  timeText: {
    color: '#aeb8c8',
    fontSize: 13,
    fontWeight: '600',
  },
  detailText: {
    color: '#575b61',
    fontSize: 13,
    fontWeight: '600',
  },
  idText: {
    width: 80,
    textAlign: 'center',
    color: '#08aabd',
    borderWidth: 1,
    borderColor: '#055e68',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 50,
    fontSize: 12,
  },
  subjectText: {
    color: 'lightgray',
    fontSize: 16,
    fontWeight: '800',
    marginVertical: 6,
  },
});