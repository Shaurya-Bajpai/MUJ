import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'

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
  const [cards, setCards] = useState([
    { id: 1, title: 'MANAGERIAL ECONOMICS', attendance: 100 },
    { id: 2, title: 'MARKETING MANAGEMENT', attendance: 100 },
    { id: 3, title: 'FINANCIAL ACCOUNTING', attendance: 100 },
    { id: 4, title: 'ORGANIZATIONAL BEHAVIOUR', attendance: 45 },
    { id: 5, title: 'DATA ANALYSIS IN EXCEL', attendance: 100 },
    { id: 6, title: 'PYTHON FOR DATA ANALYTICS', attendance: 74 },
  ]);
  
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>

        <FlatList
          data={cards}
          keyExtractor={(item) => item.id.toString()}
          ItemSeparatorComponent={() => <View style={{paddingVertical: 5}} />}
          renderItem={({ item }) => (
            <Pressable onPress={() => console.log(`Card ${item.id} pressed`)}>
              <View style={styles.card}>
                <View style={{flexDirection: 'row', gap: 10}}>
                  <Text style={[styles.cardTitle, {backgroundColor: Percentage(item.attendance)}]}>{item.attendance}%</Text>
                  <Text style={styles.cardContent}>{item.title}</Text>
                </View>
              </View>
            </Pressable>
          )}
        />
      
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
    flex: 1,
    marginHorizontal: 20,
  },
  card: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 20,
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