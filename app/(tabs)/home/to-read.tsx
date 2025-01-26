import { View, Text, ScrollView, ActivityIndicator } from 'react-native'
import React from 'react'
import BookCard from '@/components/BookCard'
import { useBooks } from '@/context/BooksContext';

const ToRead = () => {
  const { books, loading } = useBooks();

  if (loading) {
    return <ActivityIndicator animating={loading} color="#000" size='large' />
  }

  const readingBooks = books?.filter((book) => book.status === "ToRead") || [];

  if (readingBooks.length === 0) {
    return (
      <View>
        <Text>No books are currently being read. 📚</Text>
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