import MaterialIcons from '@expo/vector-icons/build/MaterialIcons';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type CourseCardProps = {
  courseName: string;
  mte1?: number;
  mte2?: number;
  ete?: number;
  cws?: number;
  session?: number;
  prs?: number;
};

function CourseCard({
  courseName,
  mte1,
  mte2,
  ete,
  cws,
  session,
  prs
}: CourseCardProps) {

  const getColor = (mark: number, type: string) => {
    if (mark >= 0 && mark <= 10) {
      return '#ff0000'; // Red for marks between 0-10
    } else if (mark >= 11 && mark <= 20) {
      return type == 'mte1' || type == 'cws' ? '#ffff00' : '#ff0000'; // Orange for marks between 11-20
    }
    else if (mark >= 21 && mark <= 30) {
      return type == 'mte1' || type == 'cws' ? '#00ff00' : '#ffff00'; // Yellow for marks between 21-30
    }
    else if (mark >= 31 && mark <= 40) {
      return '#00ff00'; // Green for marks between 31-40
    }
    return '#ffffff'; // Default color for marks outside the specified ranges
  }

  return (
    <View style={styles.courseCard}>
      <Text style={styles.courseNameText}>{courseName}</Text>

      <View style={[styles.sectionDivider]} />

      <View style={{ marginBottom: 8 }}>
        <View style={styles.marksContainer}>
          {mte1 !== undefined && <Text style={[styles.courseDetailText, { flex: 1 }]}>MTE 1 - &nbsp;
            <Text style={{ color: getColor(mte1, 'mte1') }}>{mte1}</Text>
          </Text>}
          {cws !== undefined && <Text style={[styles.courseDetailText, { flex: 1 }]}>CWS - &nbsp;
            <Text style={{ color: getColor(cws, 'cws') }}>{cws}</Text>
          </Text>}
        </View>
          {ete !== undefined && <Text style={[styles.courseDetailText, { marginTop: 8 }]}>ETE - &nbsp;
            <Text style={{ color: getColor(ete, 'ete') }}>{ete}</Text>
          </Text>}

        
        <View style={[styles.marksContainer]}>
          {mte2 !== undefined && <Text style={[styles.courseDetailText, { flex: 1 }]}>MTE 2 - &nbsp;
            <Text style={{ color: getColor(mte2, 'mte2') }}>{mte2}</Text>
          </Text>}
          {prs !== undefined && <Text style={[styles.courseDetailText, { flex: 1 }]}>PRS - &nbsp;
            <Text style={{ color: getColor(prs, 'prs') }}>{prs}</Text>
          </Text>}
        </View>
          {session !== undefined && <Text style={[styles.courseDetailText, { marginTop: 8 }]}>Re-Session - &nbsp;
            <Text style={{ color: getColor(session, 'session') }}>{session}</Text>
          </Text>}
        </View>
    </View>
  );
}

export default function ExammarksScreen({ onBack }: { onBack: () => void }) {
  const [selected, setSelected] = useState('Select Semester');
  const [open, setOpen] = useState(false);
  
  const options = ['Semester 1','Semester 2','Semester 3','Semester 4','Semester 5','Semester 6','Semester 7','Semester 8','Semester 9','Semester 10'];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onBack()}>
          <MaterialIcons style={styles.icon} name="keyboard-arrow-left" size={25} color="#D8E0EA" />
        </TouchableOpacity>
        <Text style={styles.screenTitle}>Exam Marks</Text>
      </View>

      <View style={{ height: 1, backgroundColor: '#263147', marginTop: 6, marginBottom: 12 }} />
      
      {/* Dropdown for selecting semester */}
      <View style={{ marginHorizontal: 16, zIndex: 1 }}>
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
                style={{ padding: 16 }}
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

      <ScrollView style={{ marginTop: 16, marginHorizontal: 16 }} contentContainerStyle={{ paddingBottom: 16 }}>
        {
          selected !== 'Select Semester' ? (
            <>
              <CourseCard courseName="Mathematics" mte1={25}/>
              <View style={[styles.divider]} />
              <CourseCard courseName="Data Structures" mte1={25} cws={20}/>
              <View style={[styles.divider]} />
              <CourseCard courseName="Operating Systems" mte1={20} ete={30} cws={15}/>
              <View style={[styles.divider]} />
              <CourseCard courseName="Database Management Systems" mte1={30} mte2={35} ete={40} cws={25}/>
              <View style={[styles.divider]} />
              <CourseCard courseName="Computer Networks" mte1={15} mte2={20} ete={25} cws={10} prs={5} />
              <View style={[styles.divider]} />
              <CourseCard courseName="Software Engineering" mte1={28} mte2={32} ete={38} cws={22} session={0} prs={11} />
            </>
          ) : null
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080e18',
    paddingTop: 20,
  },
  marksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    gap: 8,
    marginTop: 8,
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 6,
    gap: 12,
  },

  screenTitle: {
    color: 'lightgray',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  icon: {
    backgroundColor: '#172337',
    padding: 10,
    borderRadius: 12,
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

  divider: {
    height: 1,
    backgroundColor: '#384768',
    marginVertical: 20,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#2b3750',
    marginTop: 10,
    marginBottom: 6,
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
    zIndex: 1,
  },

  courseCard: {
    backgroundColor: '#101827',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#263147',
  },

  dropdownItemText: {
    color: '#aeb8c8',
    fontSize: 14,
  },
  selectedItemText: {
    color: '#5de2f4',
    fontWeight: '700',
  },
  dropdownText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  courseNameText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  courseDetailText: {
    // flex: 1,
    color: '#aeb8c8',
    fontSize: 14,
    textAlign: 'center',
    backgroundColor: '#1e2d47',
    borderWidth: 1,
    borderColor: '#374b78',
    paddingHorizontal: 10,
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 4,
    fontWeight: '600',
  },
})