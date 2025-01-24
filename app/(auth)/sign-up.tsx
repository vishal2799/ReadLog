import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
  ToastAndroid,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router } from 'expo-router';
import { icons, images } from '@/constants';
import CustomButton from '@/components/CustomButton';
import FormField from '@/components/FormField';
import { createUser } from '@/lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

const SignUp = () => {
  const { setUser, setIsLogged } = useGlobalContext();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (form.username === '' || form.email === '' || form.password === '') {
      ToastAndroid.show('Please fill all the fields.', ToastAndroid.SHORT);
    } else {
      setIsSubmitting(true);
      try {
        const result = await createUser(
          form.email,
          form.password,
          form.username
        );
        setUser(result);
        setIsLogged(true);
        ToastAndroid.show('User signed up successfully', ToastAndroid.SHORT);
        router.replace('/home');
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
              Create an Account
            </Text>
            <Text className='text-black-200 font-plight text-lg mt-4 text-center'>
              Sign up to start your reading journey.
            </Text>
          </View>
          <FormField
            title='Username'
            placeholder='Enter Your Username'
            value={form.username}
            handleChangeText={(text) => setForm({ ...form, username: text })}
          />
          <FormField
            title='Email'
            placeholder='Enter Your Email'
            value={form.email}
            handleChangeText={(text) => setForm({ ...form, email: text })}
            otherStyles='mt-7'
          />
          <FormField
            title='Password'
            placeholder='Enter Your Password'
            value={form.password}
            handleChangeText={(text) => setForm({ ...form, password: text })}
            otherStyles='mt-7'
          />
          <CustomButton
            title='Sign Up'
            handlePress={submit}
            isLoading={isSubmitting}
            containerStyles='w-full mt-7'
          />
          <View className='flex justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-black-100 font-pregular'>
              Have an account already?
            </Text>
            <Link
              href='/sign-in'
              className='text-lg font-psemibold text-secondary'
            >
              Sign In
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
