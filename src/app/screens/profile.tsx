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
    
    return (
        <View style={styles.container}>
            <ScrollView>
                {/* Profile Information */}
                <View style={styles.profileContainer}>
                    <Text style={styles.profileNameText}>{name}</Text>
                    <View style={styles.sectionDivider} />
                    <Text style={styles.profileDetailsText}>Roll No: {rollNo}</Text>
                    <Text style={styles.profileDetailsText}>Mobile: {mobile}</Text>
                    <Text style={styles.profileDetailsText}>Email: {email}</Text>
                    <Text style={styles.profileDetailsText}>Branch: {branch}</Text>
                    <Text style={styles.profileDetailsText}>Semester: {semester}</Text>
                </View>

                {/* Notifications */}
                <View style={styles.notificationContainer}>
                    {/* Notification Header */}
                    {/* <View style={styles.notificationHeader}>
                        <MaterialIcons name="notifications" size={16} color="gray" />
                        <Text style={[styles.profileDetailsText, { color: 'gray' }]}>Notifications Types</Text>
                    </View> */}
                    <View style={styles.notificationSectionHeader}>
                        <View style={styles.sectionDivider} />
                        <Text style={styles.sectionTitle}>Notifications</Text>
                        <View style={styles.sectionDivider} />
                    </View>

                    <View style={styles.notificationContentContainer}>
                        {/* App Updates */}
                        <View style={styles.rowContainer}>
                            {/* Icon for App Updates */}
                            <MaterialIcons style={[styles.icon, { color: '#30c287', backgroundColor: '#0e3524' }]} name="notifications-active" size={30}/>

                            {/* Description for App Updates */}
                            <View style={{ flex: 1, flexShrink: 1, marginRight: 4 }}>
                               <Text style={[styles.profileDetailsText, { fontSize: 16, color: 'white' }]}>App Updates</Text>
                               <Text style={styles.notificationDetailsText}>Get the latest updates of the app</Text>
                            </View>

                             {/* Switch for App Updates */}
                            <Switch
                                style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
                                onValueChange={() => setIsUpdateEnabled(prevState => !prevState)}
                                value={isUpdateEnabled}
                                trackColor={{ false: "#767580", true: "#134b34" }}
                                thumbColor={isUpdateEnabled ? "#30c287" : "#f4f3f4"}
                            />
                        </View>

                        <View style={styles.divider} />

                        {/* Push Notifications regarding the next classes */}
                        <View style={styles.rowContainer}>
                            {/* Icon for App Updates */}
                            <MaterialIcons style={[styles.icon, { color: '#564dfb', backgroundColor: '#232167' }]} name="school" size={30}/>

                            {/* Description for App Updates */}
                            <View style={{ flex: 1, flexShrink: 1, marginRight: 4 }}>
                               <Text style={[styles.profileDetailsText, { fontSize: 16, color: 'white' }]}>Next Class</Text>
                               <Text style={styles.notificationDetailsText}>Get notified about the next classes</Text>
                            </View>

                             {/* Switch for App Updates */}
                            <Switch
                                style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
                                onValueChange={() => setIsNextClassEnabled(prevState => !prevState)}
                                value={isNextClassEnabled}
                                trackColor={{ false: "#767580", true: "#322f91" }}
                                thumbColor={isNextClassEnabled ? "#564dfb" : "#f4f3f4"}
                            />
                        </View>

                        <View style={styles.divider} />

                        {/* Lost & Found */}
                        <View style={styles.rowContainer}>
                            {/* Icon for App Updates */}
                            <MaterialIcons style={[styles.icon, { color: '#3b8af2', backgroundColor: '#112b4c' }]} name="search" size={30}/>

                            {/* Description for App Updates */}
                            <View style={{ flex: 1, flexShrink: 1, marginRight: 4 }}>
                               <Text style={[styles.profileDetailsText, { fontSize: 16, color: 'white' }]}>Lost & Found</Text>
                               <Text style={styles.notificationDetailsText}>Alert about lost and found items in campus</Text>
                            </View>

                             {/* Switch for App Updates */}
                            <Switch
                                style={{ transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }] }}
                                onValueChange={() => setIsLostEnabled(prevState => !prevState)}
                                value={isLostEnabled}
                                trackColor={{ false: "#767580", true: "#1e477e" }}
                                thumbColor={isLostEnabled ? "#3b8af2" : "#f4f3f4"}
                            />
                        </View>
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
        marginTop: 20,
    },
    notificationContainer: {
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
    notificationContentContainer: {
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
    notificationSectionHeader: {
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