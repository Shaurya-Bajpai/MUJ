import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useState } from 'react'
import * as Haptics from 'expo-haptics';
import Slider from '@react-native-community/slider';

type DetailsProps = {
    courseCode: string,
    courseName: string,
    present: number,
    absent: number
}

export default function Details({
    courseCode,
    courseName,
    present,
    absent
}: DetailsProps) {

    const [width, setWidth] = useState(0);
    const [presentCount, setPresentCount] = useState(0);
    const [absentCount, setAbsentCount] = useState(0);
    const [targetAttendance, setTargetAttendance] = useState(70);

  return (
    <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
            <TouchableOpacity style={styles.headerButton}>
                <Text style={styles.backIcon}>‹</Text>
            </TouchableOpacity>

            <View style={styles.headerCenter}>
                <View style={styles.courseCodePill}>
                    <Text style={styles.courseCodeText}>{courseCode}</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.headerButton}>
                <Text style={styles.settingsIcon}>⚙</Text>
            </TouchableOpacity>

        </View>

        {/* Course Information */}
        <View style={styles.courseCard}>
            <View style={styles.courseTopRow}>
                <View style={styles.courseHeadingContainer}>

                    <View style={styles.departmentRow}>
                        <Text style={styles.departmentText}>DEPARTMENT OF CS</Text>
                        <Text style={styles.dot}>•</Text>
                        <Text style={styles.sectionText}>Section B</Text>
                    </View>

                    <Text style={styles.courseName}>{courseName}</Text>

                    <Text style={styles.professorText}>♙  Prof. Sarah Jenkins • Hall 402</Text>

                </View>

                <View style={styles.targetBadge}>
                    <Text style={styles.targetBadgeText}>
                        Behind
                    </Text>

                    <Text style={styles.targetBadgeText}>
                        Target
                    </Text>
                </View>

            </View>


            <View style={styles.courseDivider} />

            <View style={styles.infoRow}>
                <View style={styles.infoIcon}>
                    <Text style={styles.infoIconText}>
                        i
                    </Text>
                </View>

                <Text style={styles.infoText}>
                    Attend next{' '}
                    <Text style={styles.infoHighlight}>
                        7 consecutive classes
                    </Text>{' '}
                    to reach 75%
                </Text>
            </View>

        </View>


        <View style={styles.sectionSpacing} />

        <View style={styles.attendance}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
                <View>
                    <Text style={styles.title}>Attendance </Text>
                    <Text style={{fontSize: 32, color: 'lightgreen', fontWeight: 'bold'}}>
                        {
                            present + absent === 0 ? 0 : Math.round((present / (present + absent)) * 100)
                        }%
                    </Text>
                </View>

                <View>
                    <Text style={[styles.presentText, styles.attendanceText]}>{present} Present</Text>
                    <Text style={[styles.absentText, styles.attendanceText]}>{absent} Absent</Text>
                </View>
            </View>
            
            {/* Attendance Slider */}
            <View style={{flexDirection: 'row'}}>
                <View style={{
                        height: 10,
                        flex: present + absent === 0 ? 0 : present,
                        backgroundColor: 'lightgreen',
                        borderTopLeftRadius: 50,
                        borderBottomLeftRadius: 50,
                        borderTopRightRadius: present + absent === 0 ? 50 : 0,
                        borderBottomRightRadius: present + absent === 0 ? 50 : 0,
                    }}
                />

                <View style={{
                        height: 10,
                        flex: present + absent === 0 ? 0 : absent,
                        backgroundColor: 'lightcoral',
                        borderTopRightRadius: 50,
                        borderBottomRightRadius: 50,
                        borderTopLeftRadius: present + absent === 0 ? 50 : 0,
                        borderBottomLeftRadius: present + absent === 0 ? 50 : 0,
                    }}
                />
            </View>



            <Text style={{textAlign: 'center', color: 'white', fontWeight: '700', letterSpacing: 0.5}}>Total classes: {present + absent}</Text>

        </View>

        <View style={styles.divider} />

        <View style={{flexDirection: 'row',}}>
            <View style={{backgroundColor: 'lightgray', padding: 20, borderRadius: 8, flex: 1}}>

                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
                    <Text style={styles.percentText}>Target Attendance</Text>
                    <Text style={styles.percentText}>{targetAttendance}%</Text>
                </View>

                <Slider
                    // style={{width: '100%', height: 36}}
                    minimumValue={50}
                    maximumValue={100}
                    step={5}
                    value={targetAttendance}
                    onValueChange={(value) => setTargetAttendance(value)}
                    minimumTrackTintColor="black"
                    maximumTrackTintColor="gray"
                    thumbTintColor="gray"
                />

                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10}}>
                    <Text style={[styles.percentText, {color: 'gray'}]}>50%</Text>
                    <Text style={[styles.percentText, {color: 'gray'}]}>100%</Text>
                </View>

            </View>
        </View>
        

        <View style={styles.divider} />


        <View style={styles.percentCalculator}>
            <View style={styles.percentDetails}>
                <Text style={styles.percentText}>Attend Classes</Text>

                <View style={styles.present}>
                    <TouchableOpacity 
                        style={styles.percentButton}
                        onPress={() => {
                            if (presentCount > 0) {
                                setPresentCount(presentCount - 1);
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                            }
                        }}
                        disabled={presentCount === 0}
                    >
                        <Text style={[styles.button, styles.subtractButton]}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.countText}>{presentCount}</Text>
                    <TouchableOpacity 
                        style={styles.percentButton}
                        onPress={() => {
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                            setPresentCount(presentCount + 1);
                        }}
                    >
                        <Text style={[styles.button, styles.addButton, {backgroundColor: 'green'}]}>+</Text>
                    </TouchableOpacity>
                </View>
                
            </View>

            <View style={styles.percentDetails}>
                <Text style={styles.percentText}>Miss Classes</Text>
                <View style={styles.absent}>
                    <TouchableOpacity 
                        style={styles.percentButton}
                        onPress={() => {
                            if (absentCount > 0) {
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                setAbsentCount(absentCount - 1);
                            }
                        }}
                        disabled={absentCount === 0}
                    >
                        <Text style={[styles.button, styles.subtractButton]}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.countText}>{absentCount}</Text>
                    <TouchableOpacity 
                        style={styles.percentButton}
                        onPress={() => {
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                            setAbsentCount(absentCount + 1);
                        }}
                    >
                        <Text style={[styles.button, styles.addButton, {backgroundColor: 'lightcoral'}]}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>


        <View style={styles.divider} />



        {/* Predicted Attendance */}
        <View style={styles.result}>
            <View style={[styles.card, {flex: 1}]}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={styles.percentText}>Predicted Attendance</Text>
                    <Text style={styles.countText}>
                        {
                            presentCount + absentCount === 0 ? 
                                (
                                    present + absent === 0 ? 0 : Math.round((present / (present + absent)) * 100)
                                ) : Math.round((presentCount / (presentCount + absentCount)) * 100)
                        }%
                    </Text>
                </View>

                <View style={styles.resultSlider} />

                <View style={{flexDirection: 'row', justifyContent: 'space-between', gap: 10, marginTop: 10}}>
                    <View style={[styles.predictClasses, {backgroundColor: 'lightgreen'}]}>
                        <Text style={styles.percentText}>{present + presentCount}</Text>
                        <Text style={styles.percentText}>Present</Text>
                    </View>
                    <View style={[styles.predictClasses, {backgroundColor: 'lightcoral'}]}>
                        <Text style={styles.percentText}>{absent + absentCount}</Text>
                        <Text style={styles.percentText}>Absent</Text>
                    </View>
                    <View style={[styles.predictClasses, {backgroundColor: 'lightgray'}]}>
                        <Text style={styles.percentText}>{present + presentCount + absent + absentCount}</Text>
                        <Text style={styles.percentText}>Total</Text>
                    </View>
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
        marginHorizontal: 20,
    },

    // Header
    header: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },

    headerButton: {
        width: 48,
        height: 48,
        borderRadius: 16,
        backgroundColor: '#101A2B',
        borderWidth: 1,
        borderColor: '#1E2A3C',
        alignItems: 'center',
        justifyContent: 'center',
    },

    backIcon: {
        color: '#D8E0EA',
        fontSize: 38,
        fontWeight: '300',
        lineHeight: 40,
        marginTop: -5,
    },

    settingsIcon: {
        color: '#D8E0EA',
        fontSize: 24,
    },

    headerCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },

    courseCodePill: {
        paddingHorizontal: 15,
        paddingVertical: 7,
        borderRadius: 20,
        backgroundColor: '#0D1D2B',
        borderWidth: 1,
        borderColor: '#064F48',
    },

    courseCodeText: {
        color: '#22D3A3',
        fontSize: 14,
        fontWeight: '800',
        letterSpacing: 0.5,
    },

    semesterText: {
        color: '#AAB3C2',
        fontSize: 14,
    },


    // Course card

    courseCard: {
        backgroundColor: '#121C2D',
        borderRadius: 28,
        borderWidth: 1,
        borderColor: '#26334A',
        padding: 24,
    },

    courseTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },

    courseHeadingContainer: {
        flex: 1,
        paddingRight: 12,
    },

    departmentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 7,
    },

    departmentText: {
        color: '#A8B3C6',
        fontSize: 14,
        fontWeight: '800',
        letterSpacing: 0.5,
    },

    dot: {
        color: '#5D687B',
        marginHorizontal: 8,
        fontSize: 14,
    },

    sectionText: {
        color: '#9DA8BB',
        fontSize: 13,
    },

    courseName: {
        color: '#FFFFFF',
        fontSize: 23,
        lineHeight: 28,
        fontWeight: '800',
    },

    professorText: {
        color: '#9AA5B8',
        fontSize: 14,
        marginTop: 8,
    },

    targetBadge: {
        backgroundColor: '#32182A',
        borderWidth: 1,
        borderColor: '#7A294A',
        borderRadius: 22,
        paddingHorizontal: 13,
        paddingVertical: 8,
        alignItems: 'center',
    },

    targetBadgeText: {
        color: '#FF6C8B',
        fontSize: 13,
        fontWeight: '800',
    },

    courseDivider: {
        height: 1,
        backgroundColor: '#263147',
        marginVertical: 18,
    },

    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    infoIcon: {
        width: 28,
        height: 28,
        borderRadius: 9,
        backgroundColor: '#292C29',
        borderWidth: 1,
        borderColor: '#665B27',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },

    infoIconText: {
        color: '#F3C84B',
        fontSize: 15,
        fontWeight: '800',
    },

    infoText: {
        flex: 1,
        color: '#D3D9E3',
        fontSize: 14,
        lineHeight: 20,
    },

    infoHighlight: {
        color: '#19D19B',
        fontWeight: '800',
    },

    sectionSpacing: {
        height: 22,
    },




    divider: {
        height: 1,
        backgroundColor: 'lightgray',
        marginVertical: 10,
    },
    courseAttendance: {
        flexDirection: 'row',
        marginBottom: 10,
        backgroundColor: 'gray',
        padding: 20,
        borderRadius: 8,
    },
    attendanceDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },


    // Text Styles
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    subTitle: {
        flexShrink: 1,
        fontSize: 18,
        color: 'gray',
    },
    percentText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
    countText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
    },
    attendanceText: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8,
        fontWeight: 'bold',
    },
    presentText: {
        color: 'green',
        backgroundColor: 'lightgreen',
        marginBottom: 8,
    },
    absentText: {
        color: 'red',
        backgroundColor: 'lightcoral',
    },

    attendance: {
        backgroundColor: 'gray',
        padding: 20,
        borderRadius: 8,
    },


    present: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    absent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },




    percentDetails: {
        flex: 1,
        backgroundColor: 'lightgray',
        padding: 10,
        borderRadius: 8,
        justifyContent: 'space-between',
    },

    
    percentCalculator: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    percentButton: {
        backgroundColor: 'lightgray',
        padding: 5,
        marginHorizontal: 5,
    },


    button: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        borderRadius: 70,
    },
    subtractButton: {
        backgroundColor: 'gray',
        paddingHorizontal: 16,
        paddingVertical: 8,     
    },
    addButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
    },



    result: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    card: {
        backgroundColor: 'gray',
        padding: 20,
        borderRadius: 8,
    },
    predictClasses: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'lightgray',
        padding: 10,
        borderRadius: 8,
    },


    // Sliders
    resultSlider: {
        backgroundColor: 'lightgreen',
        borderRadius: 50,
        padding: 6,
        marginVertical: 10,
    },
})