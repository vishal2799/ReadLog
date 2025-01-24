import { View, Text, ToastAndroid } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../context/GlobalProvider';
import { signOut } from '@/lib/appwrite';
import { router } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import Ionicons from '@expo/vector-icons/Ionicons';

const Home = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);
    ToastAndroid.show('Logout Successfully', ToastAndroid.SHORT);
    router.replace('/sign-in');
  };

  return (
    <SafeAreaView className='bg-primary'>
      <View>
        <Text className='text-3xl text-black'>{user?.username}</Text>
        <CustomButton
          title='Logout'
          containerStyles='mb-5'
          handlePress={logout}
        />
              <Ionicons name="checkmark-circle" size={32} color="green" />

      </View>
    </SafeAreaView>
  );
};

export default Home;
