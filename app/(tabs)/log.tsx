import { View, Text, ScrollView, Image, ToastAndroid } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import FormField from '@/components/FormField';
import { Picker } from '@react-native-picker/picker';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
import { useGlobalContext } from '@/context/GlobalProvider';
import { addLog, getAllLogs, updateBookStatus } from '@/lib/appwrite';
import { useBooks } from '@/context/BooksContext';
import LottieView from 'lottie-react-native';

const Log = () => {
   const animation = useRef<LottieView>(null);
  const { user } = useGlobalContext();
  const { books, refetch } = useBooks();
  const [form, setForm] = useState({
    notes: '',
    totalPages: '0',
  });

  const [selectedBook, setSelectedBook] = useState<string | undefined>(
    undefined
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Set the first book as default when the screen loads
    if (books && books?.length > 0) {
      setSelectedBook(books[0]?.$id); // Pre-select the first book
    }
  }, [books]);

  const submit = async () => {
    if (form.totalPages === '') {
      ToastAndroid.show('Please fill all the fields.', ToastAndroid.SHORT);
    } else {
      setIsSubmitting(true);
      try {
        const newLog = {
          body: form.notes,
          bookId: selectedBook,
          pages_read: Number(form.totalPages),
          userId: user?.$id,
        };

        if (!selectedBook) {
          throw new Error('No book selected');
        }
        const logs = await getAllLogs(selectedBook);
        const isFirstLog = logs?.length === 0;
        const totalPagesRead = logs?.reduce((sum, log) => sum + log?.pages_read, 0) + newLog?.pages_read;

        if (isFirstLog) {
          await updateBookStatus(selectedBook, 'Reading');
        }
  
        const selectedBookDetails = books?.find((b) => b?.$id === selectedBook);
        if (selectedBookDetails && totalPagesRead >= selectedBookDetails?.total_pages) {
          await updateBookStatus(selectedBook, 'Finished');
        }
  
        const log = await addLog(newLog);
        console.log(log);
        refetch();
        setForm({ notes: '', totalPages: '0' });
        ToastAndroid.show('Your progress has been logged.', ToastAndroid.SHORT);
        router.push('/(tabs)/home/reading');

        // if (isFirstLog) {
        //   const newStatus = await updateBookStatus(selectedBook, 'Reading');
        //   const log = await addLog(newLog);
        //   console.log(log);
        //   refetch();
        //   setForm({ notes: '', totalPages: '0' });
        //   ToastAndroid.show(
        //     'Your progress has been logged.',
        //     ToastAndroid.SHORT
        //   );
        //   router.push('/(tabs)/home/reading');
        // } else {
        //   const log = await addLog(newLog);
        //   console.log(log);
        //   refetch();
        //   setForm({ notes: '', totalPages: '0' });
        //   ToastAndroid.show(
        //     'Your progress has been logged.',
        //     ToastAndroid.SHORT
        //   );
        //   router.push('/(tabs)/home/reading');
        // }
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

  if (!books || books?.length === 0) {
    return (
      <View className='h-full w-full justify-center items-center px-6 my-3'>
                <LottieView
              autoPlay
              ref={animation}
              style={{
                width: 200,
                height: 200,
                backgroundColor: 'transparent',
              }}
              // Find more Lottie files at https://lottiefiles.com/featured
              source={require('@/assets/bookshelf.json')}
            />
                <Text className='text-center text-2xl text-black font-pmedium mt-4'>No books available</Text>
                <Text className='text-center text-base font-pregular text-black-200 mt-3'>You need to add a book {"\n"}before logging your reading progress.</Text>
                <CustomButton title='Add Book' handlePress={() => router.navigate('/(tabs)/add')} containerStyles='w-full mt-7' />
              </View>
    );
  }

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='h-full w-full justify-center items-center px-4 my-6'>
          <View className='w-full flex flex-col items-center justify-center text-center mb-10'>
            <Image
              source={images?.LogoSmall}
              className='w-[100px] h-[70px]'
              resizeMode='contain'
            />
            <Text className='text-black text-3xl font-pbold text-center mt-5'>
              Log Reading Progress
            </Text>
            <Text className='text-black-200 font-plight text-lg mt-4 text-center'>
              Expand your reading journey,{'\n'} one book at a time
            </Text>
          </View>
          <View className={`space-y-2`}>
            <Text className='font-pmedium text-base text-black-100 mb-2'>
              Select a Book:
            </Text>
            <View className='w-full h-14 border-2 border-gray-100 focus:border-secondary rounded-2xl flex flex-row items-center'>
              <Picker
                mode='dropdown'
                style={{ width: '100%' }}
                selectedValue={selectedBook}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedBook(itemValue)
                }
              >
                {books?.map((book) => (
                  <Picker.Item
                    key={book?.$id}
                    label={book?.title}
                    value={book?.$id}
                  />
                ))}
              </Picker>
            </View>
          </View>
          <FormField
            title='How many pages did you read today?'
            placeholder='Enter pages read'
            keyboardType='numeric'
            value={form.totalPages}
            handleChangeText={handleChange}
            otherStyles='mt-7'
          />
          <FormField
            title='Notes (Optional):'
            placeholder='Enter your thoughts'
            value={form.notes}
            handleChangeText={(text) => setForm({ ...form, notes: text })}
            otherStyles='mt-7'
          />

          <CustomButton
            title='Save Progress'
            handlePress={submit}
            isLoading={isSubmitting}
            containerStyles='w-full mt-7'
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Log;
