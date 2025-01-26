import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useBooks } from '@/context/BooksContext';

const BookDetails = () => {
  const {detail} = useLocalSearchParams();
  const { books, loading } = useBooks();

   if (loading) {
        return <ActivityIndicator animating={loading} color="#000" size='large' />
   }

   const book = books?.find((book) => book.$id === detail); // Find the selected book

  if (!book) {
    return <Text>Book not found</Text>;
  }

  return (
    <View>
      <Text>BookDetails {book?.title}</Text>
    </View>
  )
}

export default BookDetails