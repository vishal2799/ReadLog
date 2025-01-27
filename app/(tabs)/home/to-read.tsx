import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import React, { useRef } from 'react'
import BookCard from '@/components/BookCard'
import { useBooks } from '@/context/BooksContext';
import LottieView from 'lottie-react-native';

const ToRead = () => {
  const { books, loading } = useBooks();
const animation = useRef<LottieView>(null);

  if (loading) {
    return <ActivityIndicator animating={loading} color="#000" size='large' />
  }

  const readingBooks = books?.filter((book) => book.status === "ToRead") || [];

  if (readingBooks.length === 0) {
    return (
      <View className='h-full w-full justify-center items-center px-3 my-3'>
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
                        <Text className='text-center text-lg font-pregular mt-4'>Your To Read list is empty. Add books you'd love to explore next! 📚</Text>
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