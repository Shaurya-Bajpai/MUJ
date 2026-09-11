import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ResultScreen() {
    const studentInfo = {
        Name: 'Shaurya Bajpai',
        RollNo: '123456',
        Branch: 'Computer Science & Engineering',
    }
    const result = [
        { id: 1, CGPA: 9.5, GPA: 2.5, semester: 1, totalCredits: 20 },
        { id: 2, CGPA: 8.5, GPA: 2.0, semester: 2, totalCredits: 22 },
        { id: 3, CGPA: 7.9, GPA: 3.5, semester: 3, totalCredits: 12 },
        { id: 4, CGPA: 9.0, GPA: 2.2, semester: 4, totalCredits: 20 },
    ]
    const highestGPA = Math.max(...result.map(item => item.GPA));
    const lowestGPA = Math.min(...result.map(item => item.GPA));
    const averageCGPA = result.reduce((sum, item) => sum + item.CGPA, 0) / result.length;
    const totalCredits = result.reduce((sum, item) => sum + item.totalCredits, 0);

    const resultInfoHighestGpaColor = `${
        highestGPA >= 3 ? '#19f3b9' : highestGPA >= 2 ? '#faa957' : '#FF4D65'
    }`
    const resultInfoLowestGpaColor = `${
        lowestGPA >= 3 ? '#19f3b9' : lowestGPA >= 2 ? '#faa957' : '#FF4D65'
    }`
    const resultInfoAverageCgpaColor = `${
        averageCGPA >= 3 ? '#19f3b9' : averageCGPA >= 2 ? '#faa957' : '#FF4D65'
    }`

  return (
    <View style={styles.container}>

        {/* Student Info */}
        <View style={styles.studentInfoContainer}>
            <View>
                <Text style={[styles.studentInfoText, { fontSize: 16, color: 'lightgray', fontWeight: 'bold', marginBottom: 4 }]}>{studentInfo.Name}</Text>
                <Text style={styles.studentInfoText}>Roll No: {studentInfo.RollNo}</Text>
                <Text style={styles.studentInfoText}>{studentInfo.Branch}</Text>
            </View>
            <View style={styles.currentGPAContainer} >
                <Text style={[styles.studentInfoText, { color: '#5de2f4', fontWeight: 'bold' }]}>Current GPA</Text>
                <Text style={[styles.studentInfoText, { color: '#5de2f4', fontWeight: 'bold' }]}>{result[result.length - 1].GPA}</Text>
            </View>
        </View>

        {/* Result */}
        <View style={{ flex: 1 }}>
            {
                result.length > 1 ? (
                    // result.map(({ id, CGPA, GPA, semester }) => (
                    <View>
                        <View style={{flexDirection: 'row', gap: 12}}>
                            <View style={styles.resultItemContainer}>
                                <Text style={[styles.resultHeadingText]}>Highest GPA</Text>
                                <Text style={[styles.resultText, { color: resultInfoHighestGpaColor }]}>{highestGPA}</Text>
                            </View>
                            <View style={styles.resultItemContainer}>
                                <Text style={[styles.resultHeadingText]}>Lowest GPA</Text>
                                <Text style={[styles.resultText, { color: resultInfoLowestGpaColor }]}>{lowestGPA}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', gap: 12}}>
                            <View style={styles.resultItemContainer}>
                                <Text style={[styles.resultHeadingText]}>Average CGPA</Text>
                                <Text style={[styles.resultText, { color: resultInfoAverageCgpaColor }]}>{averageCGPA}</Text>
                            </View>
                            <View style={styles.resultItemContainer}>
                                <Text style={[styles.resultHeadingText]}>Total Credits</Text>
                                <Text style={[styles.resultText, { color: '#5de2f4' }]}>{totalCredits}</Text>
                            </View>
                        </View>
                    </View>
                ) : null
            }
        </View>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080e18',
    paddingHorizontal: 16,
  },

  studentInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    backgroundColor: '#172337',
    padding: 16,
    borderRadius: 12,
  },
  currentGPAContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#08aabd',
    borderRadius: 12,
    padding: 12,
  },
  studentInfoText: {
    flexShrink: 1,
    color: '#70747c',
    fontSize: 14,
  },



  resultItemContainer: {
    flex: 1,
    backgroundColor: '#121c2d',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  resultText: {
    color: '#70747c',
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  resultHeadingText: {
    color: '#70747c',
    fontSize: 12,
    marginBottom: 4,
    fontWeight: '600',
  },
})