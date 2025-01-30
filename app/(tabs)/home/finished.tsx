import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import React, { useRef } from 'react'
import BookCard from '@/components/BookCard'
import { useBooks } from '@/context/BooksContext';
import LottieView from 'lottie-react-native';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';

const finished = () => {
  const { books, loading } = useBooks();
  const animation = useRef<LottieView>(null);
  
    if (loading) {
      return <ActivityIndicator animating={loading} color="#000" size='large' />
    }

    
  
    const readingBooks = books?.filter((book) => book?.status === "Finished") || [];
  
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
                <Text className='text-center text-2xl text-black font-pmedium mt-4'>No books available</Text>
                <Text className='text-center text-base font-pregular text-black-200 mt-3'>You need to add a book {"\n"}before logging your reading progress.</Text>
                <CustomButton title='Add Book' handlePress={() => router.navigate('/(tabs)/add')} containerStyles='w-full mt-7' />
              </View>
      );
    }

  return (
    <>
    <ScrollView>
        <View className='h-full w-full justify-center items-center px-4 my-3'>
            {readingBooks?.map((book:any) => (
                <BookCard key={book?.$id} data={book} variant='Finished' containerStyles='mb-5' />
            ))}
        </View>
    </ScrollView>
    </>
  )
}

export default finished