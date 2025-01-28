import { View, Text, ScrollView, Image, Dimensions } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '@/context/GlobalProvider';
import CustomButton from '@/components/CustomButton';
import { signOut } from '@/lib/appwrite';

const profile = () => {
  const { user } = useGlobalContext();

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
            <Text className='text-black text-3xl font-psemibold tracking-widest text-center mt-8'>
              {user?.username}
              </Text>
              <Text className='w- text-lg text-black-200 font-pmedium mt-4'>Happy Reading!</Text>
              <CustomButton
            title='Logout'
            handlePress={() => signOut()}
            containerStyles='w-4/5 mt-7'
          />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default profile;
