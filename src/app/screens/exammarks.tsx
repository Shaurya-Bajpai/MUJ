import MaterialIcons from '@expo/vector-icons/build/MaterialIcons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native'

export default function ExammarksScreen() {
  const [selected, setSelected] = useState('Select Semester');
  const [open, setOpen] = useState(false);
  
  const options = ['Semester 1','Semester 2','Semester 3','Semester 4','Semester 5','Semester 6','Semester 7','Semester 8','Semester 9','Semester 10'];

  return (
    <View style={styles.container}>
      {/* Dropdown for selecting semester */}
      <View>
        {/* Selected item */}
        <Pressable 
          style={[
            styles.dropdownButton,
            open && { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }
          ]} 
          onPress={() => setOpen(!open)}
        >
          <Text style={styles.dropdownText}>{selected}</Text>
          <MaterialIcons name={open ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={24} color="#9ca8bb"/>
        </Pressable>

        {/* Dropdown items */}
        {open && (
          <View style={styles.dropdownMenu}>
            {options.map((option) => (
              <Pressable
                key={option}
                style={styles.dropdownItem}
                onPress={() => {
                  setSelected(option);
                  setOpen(false);
                }}
              >
                <Text style={[styles.dropdownItemText, selected === option && styles.selectedItemText]}>{option}</Text>
              </Pressable>
            ))}
          </View>
        )}

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080e18',
    paddingHorizontal: 16,
    paddingTop: 12,
  },

  dropdownButton: {
    height: 50,
    backgroundColor: '#172337',
    borderWidth: 1,
    borderColor: '#263147',
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  dropdownText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },

  dropdownMenu: {
    position: 'absolute',
    top: 52,
    left: 0,
    right: 0,
    backgroundColor: '#121c2d',
    borderWidth: 1,
    borderColor: '#263147',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    overflow: 'hidden',
  },

  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  dropdownItemText: {
    color: '#aeb8c8',
    fontSize: 14,
  },

  selectedItemText: {
    color: '#5de2f4',
    fontWeight: '700',
  }
})