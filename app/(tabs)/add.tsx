import {
  View,
  Text,
  ScrollView,
  Image,
  TextInput,
  Alert,
  ToastAndroid,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import FormField from '@/components/FormField';
import { Picker } from '@react-native-picker/picker';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
import { useGlobalContext } from '@/context/GlobalProvider';
import { addBook } from '@/lib/appwrite';
import { StatusBar } from 'expo-status-bar';

const add = () => {
  const { user } = useGlobalContext();

  const [form, setForm] = useState({
    title: '',
    author: '',
    totalPages: '0',
  });

  const [selectedLanguage, setSelectedLanguage] = useState();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (form.title === '' || form.author === '' || form.totalPages === '') {
      ToastAndroid.show('Please fill all the fields.', ToastAndroid.SHORT);
    } else {
      setIsSubmitting(true);
      try {
        const newBook = {
          title: form.title,
          author: form.author,
          genre: selectedLanguage,
          total_pages: Number(form.totalPages),
          status: 'ToRead',
          user_id: user.$id,
        };

        const book = await addBook(newBook);
        console.log(book);
        setForm({ title: '', author: '', totalPages: '0' });
        ToastAndroid.show('Book added successfully', ToastAndroid.SHORT);

        router.push('/home');
      } catch (error) {
        ToastAndroid.show((error as Error).message, ToastAndroid.SHORT);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleChange = (text: string) => {
    // Allow only numbers
    const numericValue = text.replace(/[^0-9]/g, '');
    setForm({ ...form, totalPages: numericValue });
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='h-full w-full justify-center items-center px-4 my-6'>
          <View className='w-full flex flex-col items-center justify-center text-center mb-10'>
            <Image
              source={images.LogoSmall}
              className='w-[100px] h-[70px]'
              resizeMode='contain'
            />
            <Text className='text-black text-3xl font-pbold text-center mt-5'>
              Add a Book
            </Text>
            <Text className='text-black-200 font-plight text-lg mt-4 text-center'>
              Expand your reading journey,{'\n'} one book at a time
            </Text>
          </View>
          <FormField
            title='Title'
            placeholder='Enter book title'
            value={form.title}
            handleChangeText={(text) => setForm({ ...form, title: text })}
          />
          <FormField
            title='Author'
            placeholder='Enter author name'
            value={form.author}
            handleChangeText={(text) => setForm({ ...form, author: text })}
            otherStyles='mt-7'
          />
          <View className={`space-y-2 mt-7`}>
            <Text className='font-pmedium text-base text-black-100 mb-2'>
              Genre
            </Text>
            <View className='w-full h-14 border-2 border-gray-100 focus:border-secondary rounded-2xl flex flex-row items-center'>
              <Picker
                mode='dropdown'
                style={{ width: '100%' }}
                selectedValue={selectedLanguage}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedLanguage(itemValue)
                }
              >
                <Picker.Item label='Fiction' value='Fiction' />
                <Picker.Item label='Non-Fiction' value='Non-Fiction' />
                <Picker.Item label='Science Fiction' value='ScienceFiction' />
                <Picker.Item label='Fantasy' value='Fantasy' />
                <Picker.Item label='Mystery' value='Mystery' />
                <Picker.Item label='Thriller' value='Thriller' />
                <Picker.Item
                  label='Historical Fiction'
                  value='HistoricalFiction'
                />
                <Picker.Item label='Romance' value='Romance' />
                <Picker.Item label='Biography' value='Biography' />
              </Picker>
            </View>
          </View>
          <FormField
            title='Total Pages'
            placeholder='Enter total book pages'
            keyboardType='numeric'
            value={form.totalPages}
            handleChangeText={handleChange}
            otherStyles='mt-7'
          />
          <CustomButton
            title='Save Book'
            handlePress={submit}
            isLoading={isSubmitting}
            containerStyles='w-full mt-7'
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default add;
