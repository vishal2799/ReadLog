import { View, Text, ScrollView, Image, Dimensions, ToastAndroid } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '@/context/GlobalProvider';
import CustomButton from '@/components/CustomButton';
import { signOut } from '@/lib/appwrite';
import { router } from 'expo-router';

const profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);
    ToastAndroid.show('Logout Successfully', ToastAndroid.SHORT);
    router.replace('/sign-in');
  };


  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='h-full w-full justify-center items-center px-4' style={{
                    minHeight: Dimensions.get('window').height - 100,
                  }}>
          <View className='w-full flex flex-col items-center justify-center text-center'>
            <View className='w-20 h-20 border border-secondary rounded-full flex justify-center items-center'>
              <Image
                source={{ uri: user?.avatar }}
                className='w-[90%] h-[90%] rounded-full'
                resizeMode='cover'
              />
            </View>
            <Text className='text-secondary text-3xl font-psemibold tracking-widest text-center mt-6'>
              {user?.username}
              </Text>
              <Text className='text-lg text-black-100 font-pregular mt-2'>{user?.email}</Text>
              <CustomButton
            title='Logout'
            handlePress={logout}
            containerStyles='w-4/5 mt-6'
          />
          <Text className='text-xl tracking-widest text-black font-pmedium mt-6'>Happy Reading!</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default profile;
