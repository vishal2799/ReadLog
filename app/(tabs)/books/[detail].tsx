import { View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link, router, useLocalSearchParams } from 'expo-router'
import { useBooks } from '@/context/BooksContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import BookCard from '@/components/BookCard';
import CustomButton from '@/components/CustomButton';

const LogCard = ({log}: any) => {
  return (
    <View className='bg-white shadow-md rounded-md p-4 mx-4 my-3'>
      <View className='flex-row w-full justify-between items-center'>
        <Text className='text-lg font-bold'>2023-06-15</Text>
        <Text className='py-2 px-3 rounded-full font-psemibold text-sm bg-red-50 text-secondary'>{log?.pages_read} pages</Text>
      </View>
      {log?.body !== '' && (
        <Text className='text-base font-pregular text-black-100 mt-3'>{log?.body}</Text>
      )}
    </View>
  )
}

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
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
      data={book?.logs}
      keyExtractor={(item:any) => item.$id}
      renderItem={({ item }) => (
        <LogCard
          log={item}
        />
      )}
      ListHeaderComponent={() => (
        <View className='w-full'>
          <View className='w-full flex-row justify-between bg-white p-5 shadow-md'>
            <TouchableOpacity onPress={() => router.navigate('/(tabs)/home/reading')}>
            <View className='flex-row justify-center items-center gap-3'>
              <Ionicons name='arrow-back' size={24} color='#000' />
              <Text className='font-pmedium text-xl'>{book?.title}</Text>
            </View>
            </TouchableOpacity>
            <Link href={{ pathname: `/(tabs)/add`, params: { bookId: `${book?.$id}` } }}>
            <Ionicons name='create-outline' size={24} color='#000' />
            </Link>
          </View>
          <View className='w-full px-4 my-4'>
          <BookCard data={book} variant='Reading' location='detail' containerStyles='bg-white' />
          <CustomButton
            title='Add New Log'
            handlePress={() => {
              router.dismissTo('/');
              router.push('/(tabs)/log')}
            }
            containerStyles='w-full mt-5'
          />
          <Text className='mt-5 text-2xl text-black font-psemibold'>Reading Logs</Text>
          </View>
        </View>
      )}
      ListEmptyComponent={() => (
        <View><Text>No Logs Found!</Text></View>
      )}
      />
    </SafeAreaView>
  )
}

export default BookDetails