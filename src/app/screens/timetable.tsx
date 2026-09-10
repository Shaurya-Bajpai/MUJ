import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const classes = [
  { id: 1, subject: 'MANAGERIAL ECONOMICS', timeIn: '09:00 AM', timeOut: '10:00 AM' },
  { id: 2, subject: 'MARKETING MANAGEMENT', timeIn: '10:00 AM', timeOut: '11:00 AM' },
  { id: 3, subject: 'FINANCIAL ACCOUNTING', timeIn: '11:00 AM', timeOut: '11:00 AM' },
  { id: 4, subject: 'ORGANIZATIONAL BEHAVIOUR', timeIn: '12:00 PM', timeOut: '01:00 PM' },
  { id: 5, subject: 'DATA ANALYSIS IN EXCEL', timeIn: '01:00 PM', timeOut: '02:00 PM' },
  { id: 6, subject: 'PYTHON FOR DATA ANALYTICS', timeIn: '02:00 PM', timeOut: '03:00 PM' },
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

      {/* Week days */}
      <ScrollView
        horizontal
        style={styles.scrollView}
        showsHorizontalScrollIndicator={false}
      >
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080e18',
  },

  scrollView: {
    marginTop: 10,
    marginHorizontal: 10,
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
});