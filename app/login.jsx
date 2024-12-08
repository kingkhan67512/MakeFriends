import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import Animated, { FadeIn, SlideInLeft, SlideInUp } from 'react-native-reanimated';
import ScreenWrapper from '../components/ScreenWrapper';
import { theme } from '../constants/theme';
import { StatusBar } from 'expo-status-bar';
import BackButton from '../components/BackButton';
import { useRouter } from 'expo-router';
import { hp, wp } from '../helpers/common';
import Input from '../components/input';
import Icon from '../assets/icons';
import Button from '../components/Button';
import { supabase } from '../lib/supabase';

const Login = () => {
  const router = useRouter();
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const [loading, setLoading] = useState(false);

  const onSubmit =async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert('Login', 'Please fill all the fields!');
      return;
    }
    const email = emailRef.current.trim();
    const password = passwordRef.current.trim();

    setLoading(true);

    
      const {error} = await supabase.auth.signInWithPassword({
        email,
        password
      });

      // console.log("session:",session);
      setLoading(false);
      console.log('Error:', error);
      if(error){
        Alert.alert("Login",error.message);
      }
    }

  return (
    <ScreenWrapper bg="white">
      <StatusBar style="dark" />
      <View style={styles.container}>
        {/* Animated Back Button */}
        <Animated.View entering={SlideInLeft.delay(100).duration(500)}>
          <BackButton router={router} />
        </Animated.View>

        {/* Welcome Section with Slide-In Animation */}
        <Animated.View entering={SlideInUp.delay(200).duration(500)}>
          <Text style={styles.welcomeText}>Hey,</Text>
          <Text style={styles.welcomeText}>Welcome Back</Text>
        </Animated.View>

        {/* Form Heading with Fade-In Animation */}
        <Animated.View entering={FadeIn.delay(300).duration(500)}>
          <Text style={styles.formHeading}>Please Login to Continue</Text>
        </Animated.View>

        {/* Input Fields with Sequential Animations */}
        <Animated.View entering={SlideInUp.delay(400).duration(500)}>
          <Input
            icon={<Icon name="mail" size={26} strokeWidth={1.6} />}
            placeholder="Enter your email"
            onChangeText={(value) => (emailRef.current = value)}
          />
        </Animated.View>
        <Animated.View entering={SlideInUp.delay(500).duration(500)}>
          <Input
            icon={<Icon name="lock" size={26} strokeWidth={1.6} />}
            placeholder="Enter your password"
            secureTextEntry
            onChangeText={(value) => (passwordRef.current = value)}
          />
        </Animated.View>

        {/* Animated Forgot Password Text */}
        <Animated.View entering={FadeIn.delay(600).duration(500)}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </Animated.View>

        {/* Animated Button */}
        <Animated.View entering={SlideInUp.delay(700).duration(500)}>
          <Button title="Login" loading={loading} onPress={onSubmit} />
        </Animated.View>

        {/* Footer Section */}
        <Animated.View entering={FadeIn.delay(800).duration(500)} style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <Pressable onPress={()=>router.push('signUp')}>
            <Text
              style={[
                styles.footerText,
                { color: theme.colors.primaryDark, fontWeight: theme.fonts.semibold },
              ]}
            >
              SignUp
            </Text>
          </Pressable>
        </Animated.View>
      </View>
    </ScreenWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    gap:20,
    justifyContent: 'center',
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
    backgroundColor: 'white',
  },
  welcomeText: {
    fontSize: wp(6),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
    marginBottom: hp(1),
  },
  formHeading: {
    fontSize: wp(3.5),
    color: theme.colors.text,
    fontWeight: theme.fonts.semibold,
    marginBottom: hp(2),
  },
  forgotPassword: {
    textAlign: 'right',
    fontWeight: theme.fonts.semibold,
    color: theme.colors.primaryDark,
    marginTop: hp(1),
    marginBottom: hp(2),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(3),
  },
  footerText: {
    textAlign: 'center',
    color: theme.colors.text,
    fontSize: hp(1.8),
  },
});
