import { StyleSheet, Text, View , Image, Pressable } from 'react-native'
import React from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import {StatusBar} from 'expo-status-bar'
import {hp,wp} from '../helpers/common'
import { theme } from "../constants/theme";
import  Button  from '../components/Button'
import {useRouter} from 'expo-router'
const welcome = () => {
  const router=useRouter();
  return (
    <ScreenWrapper bg='white'>
        <StatusBar style='dark'/>
        <View style={styles.container}>
        <Image
        style={styles.welcomeImage} 
        source={require('../assets/images/welcome.png')}
        resizeMode='contain'
        /> 
        <View>
          <Text style={styles.title}>LinkUp!</Text>
          <Text style={styles.punchline}>Find Connections That Spark, One Swipe at a Time! 💕</Text>
        </View>
        <View style={styles.footer}>
          <Button
            title='Getting Started'
            buttonStyle={{marginHorizontal:wp(3)}}
            onPress={()=>router.push('signUp')}
          />
          <View style={styles.bottomTextContainer}>
            <Text style={styles.loginText}>
                Already have an account!
            </Text>
            <Pressable onPress={()=>router.push('login')}>
              <Text style={[styles.loginText,{color:theme.colors.primaryDark,fontWeight:theme.fonts.semibold}]}>
              Login
              </Text>
            </Pressable>
          </View>
        </View>
        </View>
    </ScreenWrapper>
  )
}

export default welcome

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'space-around',
        backgroundColor:'white',
        paddingHorizontal:wp(4)
    },
    welcomeImage:{
      height:hp(40),
      width:wp(80),
      alignSelf:'center',
    },
    punchline:{
      textAlign:'center',
      paddingHorizontal:wp(10),
      fontSize:hp(1.7),
      color:theme.colors.text,
    },
    title:{
      color:theme.colors.text,
      fontWeight:theme.fonts.extraBold,
      textAlign:'center',
      fontSize:hp(4),
    },
    footer:{
      gap:30,
      width:'100%'
    },
    bottomTextContainer:{
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center',
      gap:5
    },
    loginText:{
      textAlign:'center',
      color:theme.colors.text,
      fontSize:hp(1.6)
    }


})