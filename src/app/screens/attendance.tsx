import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

type AttendanceProps = {
  onCoursePress: (course: {
    id: string;
    title: string;
    present: number;
    total: number;
  }) => void;
};

const courses = [
  { id: "MBB6102", title: 'MANAGERIAL ECONOMICS', present: 4, total: 9 },
  { id: "MBA6109", title: 'MARKETING MANAGEMENT', present: 6, total: 8 },
  { id: "MBA6113", title: 'FINANCIAL ACCOUNTING', present: 4, total: 7 },
  { id: "MBA6115", title: 'ORGANIZATIONAL BEHAVIOUR', present: 7, total: 10 },
  { id: "MBB6108", title: 'DATA ANALYSIS IN EXCEL', present: 10, total: 10 },
  { id: "MBB6107", title: 'PYTHON FOR DATA ANALYTICS', present: 1, total: 2 },
];

const getColor = (percentage: number) =>
  percentage >= 75
    ? '#39e6a0'
    : percentage >= 50
    ? '#ffc52f'
    : '#ff4f6d';

export default function AttendaceScreen({ onCoursePress }: AttendanceProps) {
  const [filter, setFilter] = useState('All');

  // Overall attendance
  const present = courses.reduce((sum, item) => sum + item.present, 0);
  const total = courses.reduce((sum, item) => sum + item.total, 0);
  const absent = total - present;
  const overall = total === 0 ? 0 : (present / total) * 100;

  // Filter courses
  const filtered = courses.filter(item => {
    const percentage = item.total === 0
      ? 0
      : (item.present / item.total) * 100;

    if (filter === 'Safe') return percentage >= 75;
    if (filter === 'Risk') return percentage < 75;

    return true;
  });

  const safeCount = courses.filter(
    item => item.total > 0 && item.present / item.total >= 0.75
  ).length;

  const riskCount = courses.length - safeCount;

  const circumference = 2 * Math.PI * 40;

  return (
    <View style={styles.container}>
      
      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 16, paddingHorizontal: 16 }}

        ListHeaderComponent={
          <>

            {/* Filters */}
            <View style={styles.filters}>
              {[
                ['All', `All Courses (${courses.length})`],
                ['Risk', `At Risk (${riskCount})`],
                ['Safe', `Safe (${safeCount})`],
              ].map(([value, text]) => (
                <Pressable
                  key={value}
                  onPress={() => setFilter(value)}
                  style={[
                    styles.filter,
                    filter === value && styles.active,
                  ]}
                >
                  <Text
                    style={[
                      styles.filterText,
                      filter === value && styles.activeText,
                    ]}
                  >
                    {text}
                  </Text>
                </Pressable>
              ))}
            </View>
          </>
        }

        renderItem={({ item }) => {
          // Everything for this course is calculated here
          const percentage = item.total === 0 ? 0 : (item.present / item.total) * 100;

          const ratio = item.total === 0 ? 0 : item.present / item.total;

          const itemAbsent = item.total - item.present;

          const greenLength = circumference * ratio;
          const redLength = circumference * (1 - ratio);

          // Classes that can be bunked while staying at 75%
          const canBunk = percentage >= 70 ? Math.max(0, Math.floor(item.present / 0.70 - item.total)) : 0;

          // Classes needed to reach 75%
          const classesNeeded = percentage < 70 ? Math.ceil((0.70 * item.total - item.present) / 0.30) : 0;

          const color = getColor(percentage);

          return (
            <Pressable
              onPress={() => { onCoursePress(item) }}
              style={[
                styles.card,
                percentage < 50 && styles.risk,
                percentage >= 50 &&
                  percentage < 75 &&
                  styles.alert,
              ]}
            >
              {/* Course information */}
              <View style={{ flex: 1 }}>

                <Text style={[styles.code, { color }]}>{item.id} </Text>

                <Text style={styles.title}>{item.title}</Text>

                <Text style={styles.info}>
                  {/* {item.present}/{item.total} Present */}
                  <Text style={{ color }}>
                    {'  •  '}
                    {percentage >= 70
                      ? percentage == 70 ? `Don't leave class` : `Can bunk ${canBunk}`
                      : `Attend next ${classesNeeded} class${
                          classesNeeded !== 1 ? 'es' : ''
                        } for 70%`}
                  </Text>
                </Text>

                {/* Optional absent information */}
                {/* <Text style={styles.absentText}>Absent: {itemAbsent}</Text> */}
              </View>

              {/* Dynamic attendance circle */}
              <View style={styles.attendanceCircleWrapper}>
                <Svg
                  width={94}
                  height={94}
                  viewBox="0 0 94 94"
                  style={{
                    transform: [{ rotate: '-90deg' }],
                  }}
                >
                  {/* Red = absent */}
                  <Circle
                    cx="47" cy="47" r="40"
                    stroke="#FF4668"
                    strokeWidth="7"
                    fill="none"
                  />

                  {/* Green = present */}
                  {ratio > 0 && (
                    <Circle
                      cx="47" cy="47" r="40"
                      stroke="#14C99A"
                      strokeWidth="7"
                      fill="none"
                      strokeDasharray={`${greenLength} ${circumference}`}
                      strokeDashoffset="0"
                      strokeLinecap="butt"
                    />
                  )}

                  {/* Hide red visually when 100% */}
                  {ratio === 1 && (
                    <Circle
                      cx="47" cy="47" r="40"
                      stroke="#14C99A"
                      strokeWidth="7"
                      fill="none"
                    />
                  )}
                </Svg>

                <View style={styles.attendanceCircleInner}>
                  <Text style={[styles.attendancePercentage, { color }]}>
                    {Math.round(percentage)}%
                  </Text>
                </View>
              </View>
            </Pressable>
          );
        }}

        ItemSeparatorComponent={() => (
          <View style={{ height: 12 }} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080e18',
  },

  filters: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
    marginBottom: 14,
  },

  filter: {
    backgroundColor: '#172337',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },

  active: {
    borderWidth: 1,
    borderColor: '#08aabd',
  },

  filterText: {
    color: '#aeb8c8',
    fontSize: 13,
  },

  activeText: {
    color: '#5de2f4',
  },

  card: {
    minHeight: 145,
    backgroundColor: '#121c2d',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#233044',
    padding: 20,
    flexDirection: 'row',
  },

  risk: {
    borderColor: '#9c2945',
  },

  alert: {
    borderColor: '#765718',
  },

  code: {
    alignSelf: 'flex-start',
    backgroundColor: '#10302f',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 7,
    fontSize: 12,
    fontWeight: '800',
  },

  title: {
    color: '#fff',
    fontSize: 19,
    fontWeight: '900',
    marginVertical: 14,
    marginEnd: 8,
  },

  info: {
    color: '#c5cedb',
    fontSize: 13,
  },

  absentText: {
    color: '#7f8b9d',
    fontSize: 11,
    marginTop: 6,
  },

  attendanceCircleWrapper: {
    width: 94,
    height: 94,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  attendanceCircleInner: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  attendancePercentage: {
    fontSize: 25,
    fontWeight: '800',
  },

  footer: {
    marginTop: 16,
    padding: 18,
    borderRadius: 18,
    backgroundColor: '#102f39',
    borderWidth: 1,
    borderColor: '#0b6974',
  },

  footerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },

  footerText: {
    color: '#b8c4cf',
    fontSize: 12,
    marginTop: 5,
  },
});