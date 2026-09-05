import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

function Percentage(value: number) {
  if (value >= 75) {
    return '#4fff7b'
  } else if (value > 50 && value < 75) {
    return '#f8f807'
  } else {
    return '#ff4f4f';
  }
}

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>

        <View style={styles.card}>
          <View style={{flexDirection: 'row', gap: 10}}>
            <Text style={[styles.cardTitle, {backgroundColor: Percentage(100)}]}>100%</Text>
            <Text style={styles.cardContent}>MANAGERIAL ECONOMICS</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={{flexDirection: 'row', gap: 10}}>
            <Text style={[styles.cardTitle, {backgroundColor: Percentage(100)}]}>100%</Text>
            <Text style={styles.cardContent}>MARKETING MANAGEMENT</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={{flexDirection: 'row', gap: 10}}>
            <Text style={[styles.cardTitle, {backgroundColor: Percentage(100)}]}>100%</Text>
            <Text style={styles.cardContent}>FINANCIAL ACCOUNTING</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={{flexDirection: 'row', gap: 10}}>
            <Text style={[styles.cardTitle, {backgroundColor: Percentage(95)}]}>95%</Text>
            <Text style={styles.cardContent}>ORGANIZATIONAL BEHAVIOUR</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={{flexDirection: 'row', gap: 10}}>
            <Text style={[styles.cardTitle, {backgroundColor: Percentage(100)}]}>100%</Text>
            <Text style={styles.cardContent}>DATA ANALYSIS IN EXCEL</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={{flexDirection: 'row', gap: 10}}>
            <Text style={[styles.cardTitle, {backgroundColor: Percentage(94)}]}>94%</Text>
            <Text style={styles.cardContent}>PYTHON FOR DATA ANALYTICS</Text>
          </View>
        </View>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
  },
  cardContainer: {
    marginHorizontal: 20,
  },
  card: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginBottom: 12,
    // backgroundColor: 'black',
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardTitle: {
    width: '20%',
    height: 65,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    // backgroundColor: '#4fff7b',
    paddingHorizontal: 10,
    borderRadius: 100,
  },
  cardContent: {
    flex: 1,
    flexShrink: 1,
    textAlignVertical: 'center',
    textAlign: 'left',
    fontSize: 16,
    color: 'gray',    
  },
})