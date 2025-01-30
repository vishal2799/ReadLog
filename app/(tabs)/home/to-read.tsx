import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import React, { useRef } from 'react'
import BookCard from '@/components/BookCard'
import { useBooks } from '@/context/BooksContext';
import LottieView from 'lottie-react-native';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';

const ToRead = () => {
  const { books, loading } = useBooks();
const animation = useRef<LottieView>(null);

  if (loading) {
    return <ActivityIndicator animating={loading} color="#000" size='large' />
  }

  const readingBooks = books?.filter((book) => book?.status === "ToRead") || [];

  if (readingBooks?.length === 0 || !books || books?.length === 0) {
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
              <Text className='text-center text-2xl text-black font-pmedium mt-4'>No books in your list</Text>
              <Text className='text-center text-base font-pregular text-black-200 mt-3'>Plan your next read by adding books.</Text>
              <CustomButton title='Add Book' handlePress={() => router.navigate('/(tabs)/add')} containerStyles='w-full mt-7' />
            </View>
    );
  }

  return (
    <ScrollView>
        <View className='h-full w-full justify-center items-center px-4 my-3'>
            {readingBooks?.map((el:any) => (
                <BookCard key={el?.$id} variant='ToRead' containerStyles='mb-5' data={el} />
            ))}
        </View>
    </ScrollView>
  )
}

export default ToRead