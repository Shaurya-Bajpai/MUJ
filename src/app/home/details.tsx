import { StyleSheet, ScrollView, Text, TouchableOpacity, View } from 'react-native'
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
    <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
    >
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


            {/* Attendance */}
            <View style={styles.attendanceCard}>

                {/* Top section */}
                <View style={styles.attendanceTop}>

                    {/* Circular percentage */}
                    <View style={styles.attendanceCircle}>
                        <View style={styles.attendanceCircleInner}>
                            <Text style={styles.attendancePercentage}>
                                {
                                    present + absent === 0? 0: Math.round((present / (present + absent)) * 100)
                                }%
                            </Text>

                            <Text style={styles.currentText}>CURRENT</Text>
                        </View>
                    </View>


                    {/* Total classes */}
                    <View style={styles.totalClassesContainer}>
                        <Text style={styles.totalLabel}>TOTAL</Text>

                        <Text style={styles.totalLabel}>CLASSES</Text>

                        <View style={styles.totalNumberRow}>
                            <Text style={styles.totalNumber}>{present + absent}</Text>
                            <Text style={styles.heldText}>held</Text>
                        </View>

                        <Text style={styles.minimumText}>Min. required:</Text>

                        <Text style={styles.minimumPercentage}>75%</Text>

                    </View>


                    {/* Present / Absent */}
                    <View style={styles.attendanceStats}>
                        {/* Present */}
                        <View style={styles.statPresent}>
                            <View style={styles.statDotPresent} />
                            <Text style={styles.statTextPresent}>Present</Text>
                            <Text style={styles.statNumberPresent}>{present}</Text>
                        </View>

                        {/* Absent */}
                        <View style={styles.statAbsent}>
                            <View style={styles.statDotAbsent} />
                            <Text style={styles.statTextAbsent}>Absent</Text>
                            <Text style={styles.statNumberAbsent}>{absent}</Text>
                        </View>
                    </View>
                </View>


                {/* Ratio distribution */}
                <View style={styles.ratioSection}>
                    <View style={styles.ratioHeader}>
                        <Text style={styles.ratioTitle}>Ratio Distribution</Text>
                        <Text style={styles.ratioNumbers}>{present} P / {absent} A</Text>
                    </View>


                    <View style={styles.ratioBar}>
                        <View style={[styles.ratioPresent,{flex:present + absent === 0? 0: present}]} />
                        <View style={[styles.ratioAbsent,{flex:present + absent === 0? 0: absent}]} />
                    </View>

                </View>

            </View>

            <View style={styles.divider} />

            {/* Target Attendance */}

            <View style={styles.targetCard}>

                <View style={styles.targetHeader}>
                    <Text style={styles.targetTitle}>
                        Target Attendance
                    </Text>

                    <Text style={styles.targetValue}>
                        {targetAttendance}%
                    </Text>
                </View>

                <Slider
                    style={styles.targetSlider}
                    minimumValue={50}
                    maximumValue={100}
                    step={5}
                    value={targetAttendance}
                    onValueChange={(value) => setTargetAttendance(value)}
                    minimumTrackTintColor="#14C99A"
                    maximumTrackTintColor="#3A4354"
                    thumbTintColor="#FFFFFF"
                />

                <View style={styles.targetScale}>
                    <Text style={styles.targetScaleText}>
                        50%
                    </Text>

                    <Text style={styles.targetScaleText}>
                        75% (College Req)
                    </Text>

                    <Text style={styles.targetScaleText}>
                        100%
                    </Text>
                </View>

            </View>

            <View style={styles.sectionDivider} />
            

            <View style={styles.divider} />


            {/* Attendance Simulator */}
            <View style={styles.simulatorHeader}>
                <View style={styles.simulatorTitleRow}>
                    <View style={styles.simulatorIcon}>
                        <Text style={styles.simulatorIconText}>▣</Text>
                    </View>

                    <Text style={styles.simulatorTitle}>Attendance Simulator</Text>
                </View>

                <TouchableOpacity>
                    <Text style={styles.resetText}>Reset</Text>
                </TouchableOpacity>
            </View>


            <View style={styles.simulatorCards}>
                {/* Attend */}
                <View style={styles.simulatorCardAttend}>
                    <Text style={styles.simulatorCardTitleAttend}>✓ Attend Next</Text>

                    <Text style={styles.simulatorCount}>{presentCount}</Text>

                    <View style={styles.counterRow}>
                        <TouchableOpacity
                            style={styles.counterMinus}
                            onPress={() => {
                                if (presentCount > 0) {
                                    setPresentCount(presentCount - 1);
                                    Haptics.impactAsync(
                                        Haptics.ImpactFeedbackStyle.Light
                                    );
                                }
                            }}
                            disabled={presentCount === 0}
                        >
                            <Text style={styles.counterMinusText}>-</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.counterPlusAttend}
                            onPress={() => {
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                setPresentCount(presentCount + 1);
                            }}
                        >
                            <Text style={styles.counterPlusText}>+</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                {/* Miss */}
                <View style={styles.simulatorCardMiss}>
                    <Text style={styles.simulatorCardTitleMiss}>× Miss / Bunk</Text>
                    <Text style={styles.simulatorCount}>{absentCount}</Text>
                    
                    <View style={styles.counterRow}>
                        <TouchableOpacity
                            style={styles.counterMinus}
                            onPress={() => {
                                if (absentCount > 0) {
                                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                    setAbsentCount(absentCount - 1);
                                }
                            }}
                            disabled={absentCount === 0}
                        >
                            <Text style={styles.counterMinusText}>-</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.counterPlusMiss}
                            onPress={() => {
                                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                setAbsentCount(absentCount + 1);
                            }}
                        >
                            <Text style={styles.counterPlusText}>+</Text>
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
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#07101F',
    },

    scrollContent: {
        backgroundColor: '#07101F',
        paddingBottom: 30,
    },

    container: {
        marginTop: 20,
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





    // Attendance card
    attendanceCard: {
        backgroundColor: '#121C2D',
        borderRadius: 28,
        borderWidth: 1,
        borderColor: '#26334A',
        padding: 24,
    },

    attendanceTop: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },

    attendanceCircle: {
        width: 94,
        height: 94,
        borderRadius: 47,
        borderWidth: 9,
        borderColor: '#14C99A',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 14,
        flexShrink: 0,
    },

    attendanceCircleInner: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    attendancePercentage: {
        color: '#FFFFFF',
        fontSize: 25,
        fontWeight: '800',
    },

    currentText: {
        color: '#9AA5B8',
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 0.5,
    },

    totalClassesContainer: {
        flex: 1,
        minWidth: 0,
    },

    totalLabel: {
        color: '#9AA5B8',
        fontSize: 14,
        fontWeight: '800',
        letterSpacing: 0.7,
    },

    totalNumberRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginTop: 2,
    },

    totalNumber: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: '800',
    },

    heldText: {
        color: '#9AA5B8',
        fontSize: 13,
        marginLeft: 5,
    },

    minimumText: {
        color: '#9AA5B8',
        fontSize: 13,
        marginTop: 4,
    },

    minimumPercentage: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '800',
    },

    attendanceStats: {
        width: 116,
        gap: 10,
        flexShrink: 1,
    },

    statPresent: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#075B50',
        backgroundColor: '#102B2D',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 9,
        width: '100%',
    },

    statAbsent: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#61253F',
        backgroundColor: '#281B2B',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 9,
        width: '100%',
    },

    statDotPresent: {
        width: 9,
        height: 9,
        borderRadius: 5,
        backgroundColor: '#36D6A5',
        marginRight: 7,
    },

    statDotAbsent: {
        width: 9,
        height: 9,
        borderRadius: 5,
        backgroundColor: '#FF6682',
        marginRight: 7,
    },

    statTextPresent: {
        color: '#6FE0BB',
        fontSize: 12,
        fontWeight: '700',
        flex: 1,
    },

    statTextAbsent: {
        color: '#FF8BA0',
        fontSize: 12,
        fontWeight: '700',
        flex: 1,
    },

    statNumberPresent: {
        color: '#36D6A5',
        fontSize: 14,
        fontWeight: '800',
    },

    statNumberAbsent: {
        color: '#FF6682',
        fontSize: 14,
        fontWeight: '800',
    },

    ratioSection: {
        borderTopWidth: 1,
        borderTopColor: '#263147',
        marginTop: 20,
        paddingTop: 17,
    },

    ratioHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },

    ratioTitle: {
        color: '#9AA5B8',
        fontSize: 13,
    },

    ratioNumbers: {
        color: '#D3D9E3',
        fontSize: 12,
    },

    ratioBar: {
        height: 8,
        width: '100%',
        flexDirection: 'row',
        overflow: 'hidden',
        borderRadius: 5,
        backgroundColor: '#263147',
    },

    ratioPresent: {
        backgroundColor: '#16C79A',
    },

    ratioAbsent: {
        backgroundColor: '#FF4668',
    },


    // Target Attendance
    targetCard: {
        backgroundColor: '#1B2638',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#2B374B',
        paddingHorizontal: 20,
        paddingVertical: 18,
    },

    targetHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    targetTitle: {
        color: '#DCE2EC',
        fontSize: 15,
        fontWeight: '700',
    },

    targetValue: {
        color: '#8797FF',
        fontSize: 18,
        fontWeight: '800',
    },

    targetSlider: {
        width: '100%',
        height: 42,
        marginTop: 5,
    },

    targetScale: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: -2,
    },

    targetScaleText: {
        color: '#9BA7B9',
        fontSize: 12,
    },

    sectionDivider: {
        height: 1,
        backgroundColor: '#263147',
        marginVertical: 12,
    },



    // Attendance Simulator
    simulatorHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 14,
    },

    simulatorTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    simulatorIcon: {
        width: 34,
        height: 34,
        borderRadius: 10,
        backgroundColor: '#202A5A',
        borderWidth: 1,
        borderColor: '#39468C',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 9,
    },

    simulatorIconText: {
        color: '#91A0FF',
        fontSize: 17,
    },

    simulatorTitle: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '800',
    },

    resetText: {
        color: '#8997FF',
        fontSize: 13,
        fontWeight: '600',
    },

    simulatorCards: {
        flexDirection: 'row',
        gap: 14,
    },

    simulatorCardAttend: {
        flex: 1,
        minWidth: 0,
        backgroundColor: '#101F2D',
        borderWidth: 1,
        borderColor: '#075C51',
        borderRadius: 20,
        padding: 18,
        alignItems: 'center',
    },

    simulatorCardMiss: {
        flex: 1,
        minWidth: 0,
        backgroundColor: '#201827',
        borderWidth: 1,
        borderColor: '#63233E',
        borderRadius: 20,
        padding: 18,
        alignItems: 'center',
    },

    simulatorCardTitleAttend: {
        color: '#3BD5A7',
        fontSize: 13,
        fontWeight: '800',
        marginBottom: 14,
    },

    simulatorCardTitleMiss: {
        color: '#FF6682',
        fontSize: 13,
        fontWeight: '800',
        marginBottom: 14,
    },

    simulatorCount: {
        color: '#FFFFFF',
        fontSize: 32,
        fontWeight: '800',
        marginBottom: 14,
    },

    counterRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
    },

    counterMinus: {
        width: 40,
        height: 40,
        borderRadius: 13,
        backgroundColor: '#202B3D',
        borderWidth: 1,
        borderColor: '#344158',
        alignItems: 'center',
        justifyContent: 'center',
    },

    counterMinusText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '800',
    },

    counterPlusAttend: {
        width: 40,
        height: 40,
        borderRadius: 13,
        backgroundColor: '#10C994',
        alignItems: 'center',
        justifyContent: 'center',
    },

    counterPlusMiss: {
        width: 40,
        height: 40,
        borderRadius: 13,
        backgroundColor: '#FF4668',
        alignItems: 'center',
        justifyContent: 'center',
    },

    counterPlusText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '800',
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