import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
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
    const averageCGPA = Number((result.reduce((sum, item) => sum + item.CGPA, 0) / result.length).toFixed(1));
    const totalCredits = result.reduce((sum, item) => sum + item.totalCredits, 0);

    const textColor = (value: number, type: string) => {
        if (type === 'GPA') {
            if (value >= 3) {
                return '#39e6a0'
            } else if (value >= 2.4) {
                return '#faa957'
            } else {
                return '#ff4f6d'
            }
        } else if (type === 'CGPA') {
            if (value >= 8) {
                return '#39e6a0'
            } else if (value >= 6) {
                return '#faa957'
            } else {
                return '#ff4f6d'
            }
        } else {
            return '#5de2f4'
        }
    }

    const backgroundColor = (value: number, type: string) => {
        if (type === 'GPA') {
            if (value >= 3) {
                return '#07392c'
            } else if (value >= 2.4) {
                return '#4f341a'
            } else {
                return '#5b1c25'
            }
        } else if (type === 'CGPA') {
            if (value >= 8) {
                return '#07392c'
            } else if (value >= 6) {
                return '#4f341a'
            } else {
                return '#5b1c25'
            }
        } else {
            return '#214d53'
        }
    }

    const borderColor = (value: number, type: string) => {
        if (type === 'GPA') {
            if (value >= 3) {
                return '#0d5b46'
            } else if (value >= 2.4) {
                return '#81542a'
            } else {
                return '#8c2d3b'
            }
        } else if (type === 'CGPA') {
            if (value >= 8) {
                return '#0d5b46'
            } else if (value >= 6) {
                return '#81542a'
            } else {
                return '#8c2d3b'
            }
        } else {
            return '#214d53'
        }
    }

    return (
        <View style={styles.container}>
            <FlatList
            data={result}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}

            ListHeaderComponent={
                <>
                {/* Student Info */}
                <View style={styles.studentInfoContainer}>
                    <View style={{ flex: 1 }}>
                        <Text style={[ styles.studentInfoText, { fontSize: 20, color: 'lightgray', fontWeight: 'bold', marginBottom: 4}]}>{studentInfo.Name}</Text>
                        <Text style={styles.studentInfoText}>Roll No: {studentInfo.RollNo}</Text>
                        <Text style={styles.studentInfoText}>{studentInfo.Branch}</Text>
                    </View>

                    <View style={styles.currentGPAContainer}>
                        <Text style={[styles.studentInfoText, { color: '#5de2f4', fontWeight: 'bold'}]}> Current GPA</Text>
                        <Text style={[styles.studentInfoText, { color: '#5de2f4', fontWeight: 'bold', fontSize: 20, }]}>{result[result.length - 1].GPA} </Text>
                    </View>
                </View>

                {/* Result Statistics */}
                {result.length > 1 && (
                    <View style={styles.statsContainer}>
                    {/* Row 1 */}
                        <View style={[styles.rowContainer, { gap: 12 }]}>
                            <View style={styles.resultItemContainer}>
                                <Text style={styles.resultHeadingText}>Highest GPA</Text>
                                <Text style={[styles.resultText,{color: textColor(highestGPA, 'GPA')}]}>{highestGPA}</Text>
                            </View>
                            <View style={styles.resultItemContainer}>
                                <Text style={styles.resultHeadingText}>Lowest GPA</Text>
                                <Text style={[styles.resultText,{color: textColor(lowestGPA, 'GPA')}]}>{lowestGPA}</Text>
                            </View>
                        </View>

                        {/* Row 2 */}
                        <View style={[styles.rowContainer, { gap: 12 }]}>
                            <View style={styles.resultItemContainer}>
                                <Text style={styles.resultHeadingText}>Average CGPA</Text>
                                <Text style={[styles.resultText, { color: textColor(averageCGPA, 'CGPA') }]}>{averageCGPA}</Text>
                            </View>
                            <View style={styles.resultItemContainer}>
                                <Text style={styles.resultHeadingText}>Total Credits</Text>
                                <Text style={[styles.resultText, { color: textColor(totalCredits, 'Credits') }]}>{totalCredits}</Text>
                            </View>
                        </View>
                    </View>
                )}

                {/* Semester Section Heading */}
                <View style={styles.resultSectionContainer}>
                    <View style={styles.sectionDivider} />
                    <Text style={styles.sectionTitle}>Semester Results</Text>
                    <View style={styles.sectionDivider} />
                </View>
                </>
            }

            renderItem={({ item }) => (
                <View style={[styles.resultItemContainer,styles.semesterContainer]} >
                {/* Left side */}
                <View style={{ flex: 1 }}>
                    <Text style={[styles.resultHeadingText, { fontSize: 22, marginBottom: 4, color: 'lightgray',}]}>Semester {item.semester}</Text>
                    <Text style={styles.resultHeadingText}>Total Credits: {item.totalCredits}</Text>
                </View>

                {/* Right side */}
                <View style={{justifyContent: 'center',gap: 6,}}>
                    {/* GPA */}
                    <Text style={[
                        styles.semesterResultText,
                        {
                            color: textColor(item.GPA, 'GPA'),
                            backgroundColor: backgroundColor(item.GPA,'GPA'),
                            borderColor: borderColor(item.GPA,'GPA')
                        }
                    ]}
                    > GPA: {item.GPA}
                    </Text>

                    {/* CGPA */}
                    <Text style={[
                        styles.semesterResultText,
                        {
                            color: textColor(item.CGPA, 'CGPA'),
                            backgroundColor: backgroundColor(item.CGPA,'CGPA'),
                            borderColor: borderColor(item.CGPA,'CGPA')
                        }
                    ]}
                    > CGPA: {item.CGPA}
                    </Text>
                </View>
                </View>
            )}
            />
        </View>
    )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#080e18',
    paddingHorizontal: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  studentInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: '#172337',
    padding: 16,
    borderRadius: 12,
  },
  currentGPAContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    backgroundColor: '#07383e',
    borderColor: '#0f5b64',
    borderRadius: 12,
    padding: 12,
  },
  studentInfoText: {
    flexShrink: 1,
    color: '#70747c',
    fontSize: 14,
  },
  sectionDivider: {
    flex: 1,
    height: 1,
    backgroundColor: '#364564'
},
  resultSectionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
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

  
  semesterResultText: {
    borderWidth: 1,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },

    listContent: {
        paddingBottom: 20,
    },

    statsContainer: {
        marginBottom: 4,
    },

    sectionTitle: {
        color: '#9aa5b7',
        fontSize: 14,
        fontWeight: '700'
    },

    semesterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})