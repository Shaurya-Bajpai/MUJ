import { StyleSheet, ScrollView, Text, View, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import * as Haptics from 'expo-haptics';
import Slider from '@react-native-community/slider';
import Svg, { Circle } from 'react-native-svg';
import { MaterialIcons } from '@expo/vector-icons';

type DetailsProps = {
    courseCode: string,
    courseName: string,
    present: number,
    absent: number,
    onBack: () => void,
}

export default function DetailScreen({
    courseCode,
    courseName,
    present,
    absent,
    onBack
}: DetailsProps) {

    const [isPreditionMode, setIsPredictionMode] = useState(false);
    const [presentCount, setPresentCount] = useState(0);
    const [absentCount, setAbsentCount] = useState(0);
    const [targetAttendance, setTargetAttendance] = useState(70);

    const attendanceRatio = present + absent === 0 ? 0 : present / (present + absent);
    const attendancePercentage = Math.round(attendanceRatio * 100);

    const circumference = 2 * Math.PI * 40;
    const greenLength = circumference * attendanceRatio;
    const redLength = circumference * (1 - attendanceRatio);

    // Classes need to attend to reach target attendance
    const totalClasses = present + absent; 
    const classesNeeded = 
        targetAttendance >= 100 ? absent > 0 ? Infinity : 0 : Math.max( 0, Math.ceil( ( targetAttendance * totalClasses - 100 * present ) / (100 - targetAttendance)));

    // Classes can miss to stay at target attendance
    const classesCanMiss = 
        targetAttendance === 0 ? Infinity : Math.max( 0, Math.floor( (100 * present) / targetAttendance - totalClasses ) );


    const PresentCountIncrement = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setPresentCount(presentCount + 1);
    }
    const PresentCountDecrement = () => {
        if (presentCount > 0) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setPresentCount(presentCount - 1);
        }
    }
    const AbsentCountIncrement = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setAbsentCount(absentCount + 1);
    }
    const AbsentCountDecrement = () => {
        if (absentCount > 0) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setAbsentCount(absentCount - 1);
        }
    }    
    const ResetSimulator = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setPresentCount(0);
        setAbsentCount(0);
    }


    // Projected Attendance Width
    const projectedAttendanceBarWidth =
        presentCount + absentCount === 0 ? (
            present + absent === 0? 0: Math.round((present /(present + absent)) *100)
        ) : Math.round(((presentCount + present) / (present + absent + presentCount + absentCount)) * 100)


    // Attendance 
    const projectedAttendance = 
        presentCount + absentCount === 0 ? (
            present + absent === 0 ? 0 : Math.round((present / (present + absent)) * 100)
        ) : Math.round(((presentCount + present) / (present + absent + presentCount + absentCount)) * 100)
    const belowTagetAttendance = 
        targetAttendance - (presentCount + present) / (present + absent + presentCount + absentCount) * 100 > 0 ? (
            Math.round(targetAttendance - ((presentCount + present) / (present + absent + presentCount + absentCount) * 100))
        ) : 0


    // Projected Attendance Colors
    const projectedCardColor = `${
        (presentCount + present) / (present + absent + presentCount + absentCount) * 100 >= 60 && (presentCount + present) / (present + absent + presentCount + absentCount) * 100 < 80 ? '#202004' : (presentCount + present) / (present + absent + presentCount + absentCount) * 100 >= 80 ? '#101F2D' : '#201827'
    }`
    const projectedAttendanceColor = `${
        (presentCount + present) / (present + absent + presentCount + absentCount) * 100 >= 60 && (presentCount + present) / (present + absent + presentCount + absentCount) * 100 < 80 ? '#fffc4dd9' : (presentCount + present) / (present + absent + presentCount + absentCount) * 100 >= 80 ? '#14C99A' : '#FF4D65'
    }`


  return (
    <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
            <TouchableOpacity onPress={() => onBack()}>
                <MaterialIcons style={[styles.icon, { borderRadius: 12 }]} name="keyboard-arrow-left" size={25} color="#D8E0EA" />
            </TouchableOpacity>

            <Text style={styles.courseCodeText}>{courseCode}</Text>

            <TouchableOpacity onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                setIsPredictionMode(!isPreditionMode);
            }}>
                <MaterialIcons style={styles.icon} name="calculate" size={22} color="#62dcf5" />
            </TouchableOpacity>
        </View>

        <View style={{ height: 1, backgroundColor: '#263147', marginTop: 6 }} />

        <View style={{flex:1, paddingHorizontal:16}}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
            >

                {/* Course Information */}
                <View style={styles.courseCard}>
                    <View style={styles.courseTopRow}>
                        <View style={styles.courseHeadingContainer}>

                            {/* <View style={styles.departmentRow}>
                                <Text style={styles.departmentText}>DEPARTMENT OF CS</Text>
                                <Text style={styles.dot}>•</Text>
                                <Text style={styles.sectionText}>Section B</Text>
                            </View> */}
                            <Text style={styles.departmentText}>Course Name</Text>
                            <View style={{height:4}} />

                            <Text style={styles.courseName}>{courseName}</Text>

                            {/* <Text style={styles.professorText}>♙  Prof. Sarah Jenkins • Hall 402</Text> */}

                        </View>

                        {
                            classesNeeded > 0 ? (
                                <View style={[styles.targetBadge,{backgroundColor:'#32182A', borderColor:'#7A294A'}]}>
                                    <Text style={[styles.targetBadgeText, {color: '#FF6C8B'}]}>Behind</Text>
                                    <Text style={[styles.targetBadgeText, {color: '#FF6C8B'}]}>Target</Text>
                                </View>
                            ) : classesCanMiss > 0 ? (
                                <View style={[styles.targetBadge,{backgroundColor:'#101F2D', borderColor:'#19D19B'}]}>
                                    <Text style={[styles.targetBadgeText, {color: '#19D19B'}]}>Above</Text>
                                    <Text style={[styles.targetBadgeText, {color: '#19D19B'}]}>Target</Text>
                                </View>
                            ) : (
                                <View style={[styles.targetBadge,{backgroundColor:'#202004', borderColor:'#fffc4dd9'}]}>
                                    <Text style={[styles.targetBadgeText, {color: '#fffc4dd9'}]}>Reached</Text>
                                    <Text style={[styles.targetBadgeText, {color: '#fffc4dd9'}]}>Target</Text>
                                </View>
                            )
                        }
                    </View>


                    <View style={styles.courseDivider} />

                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <View style={styles.infoIcon}>
                            <Text style={styles.infoIconText}>i</Text>
                        </View>

                        {/* Info Text */}
                        {
                            classesNeeded > 0 ? (
                                <Text style={styles.infoText}>
                                    Attend next{' '}
                                    <Text style={{color: '#FF6C8B', fontWeight: '800'}}>
                                        {classesNeeded} class
                                    </Text>{' '}
                                    to reach target
                                </Text>
                            ) : classesCanMiss > 0 ? (
                                <Text style={styles.infoText}>
                                    You can miss up to{' '}
                                    <Text style={{color: '#19D19B', fontWeight: '800'}}>
                                        {classesCanMiss} class
                                    </Text>{' '}
                                    and still maintain target attendance
                                </Text>
                            ) : (
                                <Text style={styles.infoText}>
                                    You are at your target attendance
                                </Text>
                            )
                        }
                    </View>
                </View>


                <View style={styles.sectionSpacing} />


                {/* Attendance */}
                <View style={styles.attendanceCard}>
                    <Text style={styles.targetTitle}>Current Attendance</Text>
                    <View style={styles.ratioSection} />

                    {/* Top section */}
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                        {/* Percentage Circle */}
                        <View style={styles.attendanceCircleWrapper}>
                            {
                            present + absent === 0 ? (
                                <Svg width={94} height={94}>
                                    <Circle
                                        cx="47" cy="47" r={40}
                                        stroke="#3A4354"
                                        strokeWidth="7"
                                        fill="none"
                                    />
                                </Svg>
                            ) : (
                                <Svg
                                    width={94}
                                    height={94}
                                    viewBox="0 0 94 94"
                                    style={{ transform: [{ rotate: '-90deg' }] }}
                                >
                                    {/* Green = Present */}
                                    <Circle
                                        cx="47" cy="47" r={40}
                                        stroke="#14C99A"
                                        strokeWidth="7"
                                        fill="none"
                                        strokeDasharray={`${greenLength} ${circumference}`}
                                        strokeDashoffset="0"
                                        strokeLinecap="butt"
                                    />

                                    {/* Red = Absent */}
                                    {attendanceRatio < 1 && (
                                        <Circle
                                            cx="47" cy="47" r={40}
                                            stroke="#FF4668"
                                            strokeWidth="7"
                                            fill="none"
                                            strokeDasharray={`${redLength} ${circumference}`}
                                            strokeDashoffset={-greenLength}
                                            strokeLinecap="butt"
                                        />
                                    )}
                                </Svg>
                            )}

                            <View style={styles.attendanceCircleInner}>
                                <Text style={styles.attendancePercentage}>
                                    {attendancePercentage}%
                                </Text>
                            </View>
                        </View>


                        {/* Total classes */}
                        {/* <View style={styles.totalClassesContainer}>
                            <Text style={styles.totalLabel}>TOTAL</Text>
                            <Text style={styles.totalLabel}>CLASSES</Text>

                            <View style={styles.totalNumberRow}>
                                <Text style={styles.totalNumber}>{present + absent}</Text>
                                <Text style={styles.heldText}>held</Text>
                            </View>

                            <Text style={styles.minimumText}>Min. required:</Text>
                            <Text style={styles.minimumPercentage}>75%</Text>

                        </View> */}


                        {/* Present / Absent */}
                        <View style={{flex:0.5, gap:10, flexShrink:1}}>
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
                            <View style={[styles.ratioPresent,{flex:present + absent === 0 ? 0: present}]} />
                            <View style={[styles.ratioAbsent,{flex:present + absent === 0 ? 0: absent}]} />
                        </View>
                    </View>
                </View>

                <View style={styles.sectionSpacing} />

                {/* Target Attendance */}
                <View style={styles.targetCard}>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                        <Text style={styles.targetTitle}>Target Attendance</Text>
                        <Text style={styles.targetValue}>{targetAttendance}%</Text>
                    </View>

                    <Slider
                        style={styles.targetSlider}
                        minimumValue={45}
                        maximumValue={95}
                        step={5}
                        value={targetAttendance}
                        onValueChange={(value) => setTargetAttendance(value)}
                        minimumTrackTintColor="#14C99A"
                        maximumTrackTintColor="#3A4354"
                        thumbTintColor="#FFFFFF"
                        thumbSize={18}
                    />

                    <View style={styles.targetScale}>
                        <Text style={styles.targetScaleText}>45%</Text>
                        <Text style={styles.targetScaleText}>70% (College Req)</Text>
                        <Text style={styles.targetScaleText}>95%</Text>
                    </View>

                    <View style={styles.courseDivider} />

                    <View style={{flexDirection:'row', alignItems:'center'}}>
                        <View style={styles.infoIcon}>
                            <MaterialIcons name="star" size={15} color="#F3C84B" />
                        </View>
                        <Text style={[styles.professorText , { color: '#8b9dc0' }]}>Click on calculator icon in topbar to predict your attendance</Text>
                    </View>
                </View>

                <View style={styles.sectionSpacing} />

                {/* Attendance Simulator */}
                {isPreditionMode ? (
                    <View style={styles.attendanceCard}>
                        <View style={styles.simulatorHeader}>
                            <View style={styles.simulatorTitleRow}>
                                <View style={styles.simulatorIcon}>
                                    <Text style={styles.simulatorIconText}>▣</Text>
                                </View>

                                <Text style={styles.simulatorTitle}>Attendance Simulator</Text>
                            </View>

                            <TouchableOpacity onPress={() => ResetSimulator()}>
                                <Text style={styles.resetText}>Reset</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.ratioSection} />

                        <View style={styles.simulatorCards}>
                            {/* Attend */}
                            <View style={[styles.simulatorCard, { borderColor: '#075C51', backgroundColor: '#101F2D' }]}>
                                <Text style={[styles.simulatorCardTitle, { color: '#3BD5A7' }]}>✓ Attend Next</Text>

                                <Text style={styles.simulatorCount}>{presentCount}</Text>

                                <View style={styles.counterRow}>
                                    <TouchableOpacity
                                        style={styles.counterMinus}
                                        onPress={() => PresentCountDecrement() }
                                        disabled={presentCount === 0}
                                    >
                                        <Text style={styles.counterText}>-</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[styles.counterPlus, { backgroundColor: '#10C994' }]}
                                        onPress={() => PresentCountIncrement() }
                                    >
                                        <Text style={styles.counterText}>+</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>

                            {/* Miss */}
                            <View style={[styles.simulatorCard, { borderColor: '#63233E', backgroundColor: '#201827' }]}>
                                <Text style={[styles.simulatorCardTitle, { color: '#FF6682' }]}>× Miss / Bunk</Text>
                                <Text style={styles.simulatorCount}>{absentCount}</Text>
                                
                                <View style={styles.counterRow}>
                                    <TouchableOpacity
                                        style={styles.counterMinus}
                                        onPress={() => AbsentCountDecrement() }
                                        disabled={absentCount === 0}
                                    >
                                        <Text style={styles.counterText}>-</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[styles.counterPlus, { backgroundColor: '#FF4D4D' }]}
                                        onPress={() => AbsentCountIncrement()}
                                    >
                                        <Text style={styles.counterText}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={styles.sectionSpacing} />

                        {/* Projected Attendance */}
                        <View style={[styles.projectedCard, { backgroundColor: projectedCardColor }]}>
                            {/* Header */}
                            <View style={styles.projectedHeader}>
                                <View>
                                    <Text style={styles.projectedTitle}>PROJECTED ATTENDANCE</Text>
                                    {
                                        targetAttendance - (presentCount + present) / (present + absent + presentCount + absentCount) * 100 > 0 ? (
                                            <Text style={styles.belowTarget}>
                                                •&nbsp;
                                                {belowTagetAttendance}
                                                % below target
                                            </Text>
                                        ) : null
                                    }
                                </View>

                                <Text style={{ fontSize: 32, fontWeight: 'bold', color: projectedAttendanceColor }}>{projectedAttendance}%</Text>
                            </View>


                            {/* Projection Bar */}
                            <View style={{marginVertical: 14}}>
                                <View style={styles.projectedBar}>
                                    <View style={[styles.projectedBarFill,{ width: `${projectedAttendanceBarWidth}%`, backgroundColor: projectedAttendanceColor }]} />

                                    {/* Target Attendance marker */}
                                    <View style={[styles.targetMarker,{left: `${targetAttendance}%`}]}/>
                                </View>
                            </View>


                            {/* Projected Numbers */}
                            <View style={styles.projectedStats}>
                                {/* Present */}
                                <View style={[styles.projectedBox, { borderColor: '#075C51', backgroundColor: '#102B32' }]}>
                                    <Text style={[styles.projectedNumberText, { color: '#25D3A3'}]}>{present + presentCount}</Text>
                                    <Text style={styles.projectedLabel}>PRESENT</Text>
                                </View>

                                {/* Absent */}
                                <View style={[styles.projectedBox, { borderColor: '#63233E', backgroundColor: '#2B1C2D' }]}>
                                    <Text style={[styles.projectedNumberText, { color: '#FF6682' }]}>{absent + absentCount}</Text>
                                    <Text style={styles.projectedLabel}>ABSENT</Text>
                                </View>

                                {/* Total */}
                                <View style={[styles.projectedBox, { borderColor: '#344158', backgroundColor: '#1B2638' }]}>
                                    <Text style={[styles.projectedNumberText, { color: '#FFFFFF' }]}>{present + presentCount + absent + absentCount}</Text>
                                    <Text style={styles.projectedLabel}>TOTAL</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                ) : null }
            </ScrollView>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#07101F',
    },

    scrollContent: {
        backgroundColor: '#07101F',
        paddingTop: 12,
        paddingBottom: 30,
    },

    container: {
        flex: 1,
        backgroundColor: '#07101F',
        paddingTop: 20,
    },

    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 6,
        gap: 12,
    },
  
    icon: {
        backgroundColor: '#172337',
        padding: 11,
        borderRadius: 25,
    },

    courseCodePill: {
    },

    courseCodeText: {
        paddingHorizontal: 15,
        paddingVertical: 7,
        borderRadius: 20,
        backgroundColor: '#0D1D2B',
        borderWidth: 1,
        borderColor: '#064F48',
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
        padding: 20,
    },

    courseTopRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
        flexShrink: 1,
    },

    targetBadge: {
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        alignItems: 'center',
    },

    targetBadgeText: {
        fontSize: 13,
        fontWeight: '800',
    },

    courseDivider: {
        height: 1,
        backgroundColor: '#263147',
        marginTop: 18,
        marginBottom: 8,
    },

    infoIcon: {
        width: 28,
        height: 28,
        borderRadius: 9,
        backgroundColor: '#292C29',
        borderColor: '#665B27',
        borderWidth: 1,
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

    sectionSpacing: {
        height: 22,
    },





    // Attendance card
    attendanceCard: {
        backgroundColor: '#121C2D',
        borderRadius: 28,
        borderWidth: 1,
        borderColor: '#26334A',
        padding: 20,
    },

    attendanceTop: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },

    attendanceCircle: {
        width: 94,
        height: 94,
        borderRadius: 50,
        borderWidth: 7,
        alignItems: 'center',
        justifyContent: 'center',
        // marginRight: 14,
        flexShrink: 0,
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

    statPresent: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#075B50',
        backgroundColor: '#102B2D',
        borderRadius: 20,
        padding: 8,
    },

    statAbsent: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#61253F',
        backgroundColor: '#281B2B',
        borderRadius: 20,
        padding: 8,
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
        marginRight: 4,
    },

    statNumberAbsent: {
        color: '#FF6682',
        fontSize: 14,
        fontWeight: '800',
        marginRight: 4,
    },

    ratioSection: {
        borderTopWidth: 1,
        borderTopColor: '#263147',
        marginTop: 10,
        paddingTop: 8,
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
        backgroundColor: '#121C2D',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#2B374B',
        paddingHorizontal: 20,
        paddingVertical: 18,
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
        marginTop: 8,
    },

    simulatorCard: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 20,
        padding: 18,
        alignItems: 'center',
    },

    simulatorCardTitle: {
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

    counterPlus: {
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
        borderRadius: 12,
        backgroundColor: '#FF4668',
        alignItems: 'center',
        justifyContent: 'center',
    },

    counterText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '800',
    },


    projectedCard: {
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#344158',
        padding: 20,
    },

    projectedHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },

    projectedTitle: {
        color: '#9BA7B9',
        fontSize: 13,
        fontWeight: '800',
        letterSpacing: 0.7,
    },

    belowTarget: {
        color: '#FF7188',
        fontSize: 12,
        fontWeight: '700',
        marginTop: 5,
    },

    projectedBar: {
        height: 11,
        backgroundColor: '#080F1D',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#283449',
        overflow: 'hidden',
        position: 'relative',
    },

    projectedBarFill: {
        height: '100%',
        borderRadius: 8,
    },

    targetMarker: {
        position: 'absolute',
        top: -2,
        bottom: -2,
        width: 3,
        backgroundColor: '#FFFFFF',
        marginLeft: -1.5,
    },

    projectedStats: {
        flexDirection: 'row',
        gap: 10,
    },

    projectedBox: {
        flex: 1,
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 14,
        paddingVertical: 10,
    },

    projectedNumberText: {
        fontSize: 16,
        fontWeight: '800',
    },

    projectedLabel: {
        color: '#9BA7B9',
        fontSize: 11,
        fontWeight: '700',
        marginTop: 3,
        letterSpacing: 0.3,
    },
})