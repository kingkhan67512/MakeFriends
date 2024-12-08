import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '../../constants/theme'
import { hp, wp } from '../../helpers/common'
import ScreenWrapper from '../../components/ScreenWrapper'
import Header from '../../components/header'
import { useAuth } from '../../contexts/authContext'
import { getUserImageSrc } from '../../services/imageService'
import { Image } from 'expo-image'

const EditProfile = () => {
    const { user } = useAuth();
    let imageSource = getUserImageSrc(user.image);
    return (
        <ScreenWrapper bg='white'>
            <View style={styles.container}>
                <ScrollView style={{ flex: 1 }}>
                    <Header title='Edit Profile' />
                    <View style={styles.form}>
                        <View style={styles.avatarContainer}>
                            <Image source={imageSource} style={styles.avatar} />
                        </View>
                    </View>
                </ScrollView>
            </View>

        </ScreenWrapper>
    )
}

export default EditProfile

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingHorizontal: wp(4),
    },
    avatarContainer: {
        height: hp(14),
        width: hp(14),
        alignSelf: 'center',
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: theme.radius.xxl * 1.8,
        borderCurve: 'continuous',
        borderWidth: 1,
        borderColor: theme.colors.darkLight
    },
    cameraIcon: {
        borderRadius: 50,
        backgroundColor: 'white',
        shadowColor: theme.colors.textLight,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 7
    },
    form: {
        gap: 18,
        marginTop: 20,
    },
    input: {
        flexDirection: 'row',
        borderWidth: 0.4,
        borderColor: theme.colors.text, borderRadius: theme.radius.xxl,
        borderCurve: 'continuous',
        padding: 17,
        paddingHorizontal: 20,
        gap: 15
    },
    bio: {
        flexDirection: 'row',
        height: hp(15),
        alignItems: 'flex-start',
        paddingVertical: 15,
    }
})