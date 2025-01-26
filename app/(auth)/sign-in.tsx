import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  Alert,
  ToastAndroid,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { images } from '@/constants';
import CustomButton from '@/components/CustomButton';
import FormField from '@/components/FormField';
import { useGlobalContext } from '../../context/GlobalProvider';
import { getCurrentUser, signIn } from '@/lib/appwrite';

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (form.email === '' || form.password === '') {
      ToastAndroid.show('Please fill all the fields.', ToastAndroid.SHORT);
    } else {
      setIsSubmitting(true);
      try {
        await signIn(form.email, form.password);
        const result = await getCurrentUser();
        setUser(result);
        setIsLogged(true);
        ToastAndroid.show('User signed in successfully', ToastAndroid.SHORT);
        router.replace('/(tabs)/home/reading');
      } catch (error) {
        ToastAndroid.show((error as Error).message, ToastAndroid.SHORT);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View
          className='w-full flex justify-center h-full px-4 my-6'
          style={{
            minHeight: Dimensions.get('window').height - 100,
          }}
        >
          <View className='w-full flex flex-col items-center justify-center text-center mb-10'>
            <Image
              source={images.LogoSmall}
              className='w-[100px] h-[70px]'
              resizeMode='contain'
            />
            <Text className='text-black text-3xl font-pbold text-center mt-5'>
              Welcome Back
            </Text>
            <Text className='text-black-200 font-plight text-lg mt-4 text-center'>
              Sign in to continue your reading journey.
            </Text>
          </View>
          <FormField
            title='Email'
            placeholder='Enter Your Email'
            value={form.email}
            handleChangeText={(text) => setForm({ ...form, email: text })}
          />
          <FormField
            title='Password'
            placeholder='Enter Your Password'
            value={form.password}
            handleChangeText={(text) => setForm({ ...form, password: text })}
            otherStyles='mt-7'
          />
          <CustomButton
            title='Sign In'
            handlePress={submit}
            isLoading={isSubmitting}
            containerStyles='w-full mt-7'
          />
          <View className='flex justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-black-100 font-pregular'>
              Don't have an account?
            </Text>
            <Link
              href='/sign-up'
              className='text-lg font-psemibold text-secondary'
            >
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
