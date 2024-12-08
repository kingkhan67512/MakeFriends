import { Alert, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import { useAuth } from '../../contexts/authContext';
import { useRouter } from 'expo-router';
import Header from '../../components/header';
import { hp, wp } from '../../helpers/common';
import Icon from '../../assets/icons';
import { theme } from '../../constants/theme';
import { supabase } from '../../lib/supabase';
import Avatar from '../../components/Avatar';

const Profile = () => {
    const { user, setAuth } = useAuth();
    const router = useRouter();

    const onLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            Alert.alert('Sign out', 'Error signing out!');
        }
    };

    const handleLogout = async () => {
        Alert.alert('Confirm', 'Are you sure you want to log out?', [
            { text: 'Cancel', onPress: () => console.log('Modal cancelled'), style: 'cancel' },
            { text: 'Confirm', onPress: () => onLogout(), style: 'destructive' },
        ]);
    };

    return (
        <ScreenWrapper bg="white">
            <UserHeader user={user} router={router} handleLogout={handleLogout} />
        </ScreenWrapper>
    );
};

const UserHeader = ({ user, router, handleLogout }) => {
    console.log("userprofile:",);
    return (
        
        <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: wp(4) }}>
            <Header title="Profile" />
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Icon name="logout" color={theme.colors.rose} />
            </TouchableOpacity>
            <View style={styles.container}>
                <View style={{ marginBottom: 15 }}>
                    <View style={styles.avatarContainer}>
                        <Avatar
                            uri={user?.image || ''}
                            size={hp(12)}
                            rounded={theme.radius.xxl * 1.4}
                        />
                        <Pressable style={styles.editIcon} onPress={() => router.push('editProfile')}>
                            <Icon name="edit" strokeWidth={2.5} size={20} />
                        </Pressable>
                    </View>
                    {/* Username and Address */}
                    <View style={{ alignItems: 'center', marginBottom: 10 }}>
                        <Text style={styles.userName}>{user?.user_metadata?.name || 'No name available'}</Text>
                        <Text style={styles.infoText}>{user?.address || 'No address provided'}</Text>
                    </View>
                    {/* Email */}
                    <View style={styles.info}>
                        <Icon name="mail" color={theme.colors.textLight} />
                        <Text style={styles.infoText}>{user?.email || 'No email provided'}</Text>
                    </View>
                    {/* Phone */}
                    {
                        user && user.phoneNumber && (
                            <View style={styles.info}>
                        <Icon name="camera" color={theme.colors.textLight} />
                        <Text style={styles.infoText}>{user?.phoneNumber || 'No phone number provided'}</Text>
                        </View>
                        )
                    }
                    {
                        (
                            <View style={styles.info}>
                        <Icon name="call" color={theme.colors.textLight} />
                        <Text style={styles.infoText}>{user.bio || 'Hey There I am using Link Up'}</Text>
                        </View>
                        )
                    }
                    
                </View>
            </View>
        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    logoutButton: {
        position: 'absolute',
        right: 20,
        padding: 10,
        borderRadius: theme.radius.sm,
        backgroundColor: '#fee2e2',
        zIndex: 10,
    },
    infoText: {
        fontSize: hp(1.8),
        fontWeight: '500',
        marginLeft:20,
        color: theme.colors.textLight,
    },
    userName: {
        fontSize: hp(3),
        fontWeight: 'bold',
        color: theme.colors.textDark,
    },
    headerContainer: {
        marginHorizontal: wp(4),
        marginBottom: 20,
    },
    avatarContainer: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 15,
    },
    editIcon: {
        position: 'absolute',
        bottom: -10,
        right: -10,
        padding: 7,
        borderRadius: 50,
        backgroundColor: 'white',
        shadowColor: theme.colors.textLight,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 7,
    },
    info: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        
        
    },
    noPosts: {
        fontSize: hp(2),
        textAlign: 'center',
        color: theme.colors.text,
    },
});
