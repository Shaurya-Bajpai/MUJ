import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native'

type ProfileProps = {
  name: string;
  rollNo: string;
  mobile: string;
  email: string;
  branch: string;
  semester: string;
}

type CardItemProps = {
    icon: React.ComponentProps<typeof MaterialIcons>['name'];
    iconColor: string;
    iconBackgroundColor: string;
    title: string;
    subtitle: string;
    isValue: boolean;
    onToggle: (value: boolean) => void;
    trackColor: string;
    thumbColor: string;
}

function CardItem({
    icon,
    iconColor,
    iconBackgroundColor,
    title,
    subtitle,
    isValue,
    onToggle,
    trackColor,
    thumbColor
}: CardItemProps) {
    return (
        <View style={styles.rowContainer}>
            {/* Icon for App Updates */}
            <MaterialIcons name={icon} size={30} style={[styles.icon, { color: iconColor, backgroundColor: iconBackgroundColor }]}/>

            {/* Description for App Updates */}
            <View style={{ flex: 1, flexShrink: 1, marginRight: 4 }}>
                <Text style={[styles.profileDetailsText, { fontSize: 16, color: 'white' }]}>{title}</Text>
                <Text style={styles.notificationDetailsText}>{subtitle}</Text>
            </View>

                {/* Switch for App Updates */}
            <Switch
                style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
                onValueChange={() => onToggle(!isValue)}
                value={isValue}
                trackColor={{ false: "#767580", true: trackColor }}
                thumbColor={isValue ? thumbColor : "#f4f3f4"}
            />
        </View>
    )
}

export default function ProfileScreen({
    name,
    rollNo,
    branch,
    mobile,
    email,
    semester
}: ProfileProps) {
    const [isUpdateEnabled, setIsUpdateEnabled] = useState(false);
    const [isNextClassEnabled, setIsNextClassEnabled] = useState(false);
    const [isLostEnabled, setIsLostEnabled] = useState(false);
    const [isSoundEnabled, setIsSoundEnabled] = useState(false);
    const [isVibrationEnabled, setIsVibrationEnabled] = useState(false);
    const [isHapticsEnabled, setIsHapticsEnabled] = useState(false);
    
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                {/* Profile Information */}
                <View style={styles.profileContainer}>
                    <Text style={styles.profileNameText}>{name}</Text>
                    <View style={[styles.sectionDivider, { marginBottom: 12 }]} />
                    <Text style={styles.profileDetailsText}>Roll No: {rollNo}</Text>
                    <Text style={styles.profileDetailsText}>Mobile: {mobile}</Text>
                    <Text style={styles.profileDetailsText}>Email: {email}</Text>
                    <Text style={styles.profileDetailsText}>Branch: {branch}</Text>
                    <Text style={styles.profileDetailsText}>Semester: {semester}</Text>
                </View>

                {/* Notifications */}
                <View style={styles.cardContainer}>
                    {/* Notification Header */}
                    {/* <View style={styles.notificationHeader}>
                        <MaterialIcons name="notifications" size={16} color="gray" />
                        <Text style={[styles.profileDetailsText, { color: 'gray' }]}>Notifications Types</Text>
                    </View> */}
                    <View style={styles.sectionHeader}>
                        <View style={styles.sectionDivider} />
                        <Text style={styles.sectionTitle}>Notifications</Text>
                        <View style={styles.sectionDivider} />
                    </View>

                    <View style={styles.contentContainer}>
                        {/* App Updates */}
                        <CardItem
                            icon="notifications-active"
                            iconColor="#30c287"
                            iconBackgroundColor="#0e3524"
                            title="App Updates"
                            subtitle="Get the latest updates of the app"
                            isValue={isUpdateEnabled}
                            onToggle={setIsUpdateEnabled}
                            trackColor="#134b34"
                            thumbColor="#30c287"
                        />

                        <View style={styles.divider} />

                        {/* Push Notifications regarding the next classes */}
                        <CardItem
                            icon="school"
                            iconColor="#37cadd"
                            iconBackgroundColor="#0c4148"
                            title="Next Class"
                            subtitle="Get notified about the next classes"
                            isValue={isNextClassEnabled}
                            onToggle={setIsNextClassEnabled}
                            trackColor="#0c4148"
                            thumbColor="#37cadd"
                        />

                        <View style={styles.divider} />

                        {/* Lost & Found */}
                        <CardItem
                            icon="search"
                            iconColor="#f23b3b"
                            iconBackgroundColor="#571515"
                            title="Lost & Found"
                            subtitle="Alert about lost and found items in campus"
                            isValue={isLostEnabled}
                            onToggle={setIsLostEnabled}
                            trackColor="#601616"
                            thumbColor="#f23b3b"
                        />
                    </View>
                </View>

                {/* Sounds and Vibration */}
                <View style={styles.cardContainer}>
                    {/* Section Header */}
                    <View style={styles.sectionHeader}>
                        <View style={styles.sectionDivider} />
                        <Text style={styles.sectionTitle}>Sounds & Vibration</Text>
                        <View style={styles.sectionDivider} />
                    </View>
                    
                    {/* Section Content */}
                    <View style={styles.contentContainer}>
                        {/* Sound */}
                        <CardItem
                            icon="volume-up"
                            iconColor="#d3a021"
                            iconBackgroundColor="#3d300e"
                            title="Sound"
                            subtitle="Play sound of notifications"
                            isValue={isSoundEnabled}
                            onToggle={setIsSoundEnabled}
                            trackColor="#5d4917"
                            thumbColor="#d3a021"
                        />

                        <View style={styles.divider} />

                        {/* Vibration */}
                        <CardItem
                            icon="vibration"
                            iconColor="#8c86ff"
                            iconBackgroundColor="#22205e"
                            title="Vibration"
                            subtitle="Want Vibration on notifications"
                            isValue={isVibrationEnabled}
                            onToggle={setIsVibrationEnabled}
                            trackColor="#322f91"
                            thumbColor="#8c86ff"
                        />

                        <View style={styles.divider} />

                        {/* haptics */}
                        <CardItem
                            icon="waving-hand"
                            iconColor="#3b8af2"
                            iconBackgroundColor="#112b4c"
                            title="Haptics"
                            subtitle="Haptic feedback on button press"
                            isValue={isHapticsEnabled}
                            onToggle={setIsHapticsEnabled}
                            trackColor="#1e477e"
                            thumbColor="#3b8af2"
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#080e18',
        paddingHorizontal: 16,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#2b3750',
        marginVertical: 14,
    },
    sectionDivider: {
        flex: 1,
        height: 1,
        backgroundColor: '#2b3750',
    },
    profileContainer: {
        flex: 1,
        backgroundColor: '#101827',
        borderColor: '#364564',
        borderWidth: 1,
        padding: 16,
        borderRadius: 12,
        marginTop: 14,
    },
    cardContainer: {
        flex: 1,
        borderRadius: 12,
        marginTop: 20,
    },
    notificationHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 6,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#101827',
        borderColor: '#364564',
        borderWidth: 1,
        padding: 16,
        borderRadius: 12,
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
    },



    icon: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 50,
        marginRight: 4,
    },


    profileNameText: {
        color: '#5de2f4',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 12,
    },
    profileDetailsText: {
        color: '#47acb9',
        fontSize: 14,
        marginBottom: 2,
        fontWeight: '600',
    },
    notificationDetailsText: {
        color: 'gray',
        fontSize: 13,
        marginBottom: 2,
        fontWeight: '600',
    },
    sectionTitle: {
        color: '#9aa5b7',
        fontSize: 14,
        fontWeight: '700'
    },
})