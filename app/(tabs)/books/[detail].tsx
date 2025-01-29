import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, { useRef } from 'react'
import { Link, router, useLocalSearchParams } from 'expo-router'
import { useBooks } from '@/context/BooksContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import BookCard from '@/components/BookCard';
import CustomButton from '@/components/CustomButton';
import LottieView from 'lottie-react-native';
import dayjs from "dayjs"; 
import { deleteLog, updateBookStatus } from '@/lib/appwrite';

const LogCard = ({log, handlePress}: any) => {
  return (
    <View className='bg-white shadow-md rounded-md p-4 mx-4 my-3'>
      <View className='flex-row w-full justify-between items-center'>
        <View className='flex-row gap-3 items-center'>
        <Text className='text-lg font-bold'>{dayjs(log?.$createdAt).format('YYYY-MM-DD')}</Text>
        <Text className='py-2 px-3 rounded-full font-psemibold text-sm bg-red-50 text-secondary'>{log?.pages_read} pages</Text>
        </View>
        <TouchableOpacity onPress={() => handlePress(log)}>
        <AntDesign name='delete' size={18} color='#8A8A8A' />
        </TouchableOpacity>
      </View>
      {log?.body !== '' && (
        <Text className='text-base font-pmedium text-black-100 mt-4'>{log?.body}</Text>
      )}
    </View>
  )
}

const BookDetails = () => {
  const {detail} = useLocalSearchParams();
  const { books, loading, refetch } = useBooks();
  const animation = useRef<LottieView>(null);

   if (loading) {
        return <ActivityIndicator animating={loading} color="#000" size='large' />
   }

   const book = books?.find((book) => book.$id === detail); // Find the selected book

  if (!book) {
    return <Text>Book not found</Text>;
  }

  const handleDeleteLog = async (log: any) => {
    const isFirstLog = book?.logs?.length === 1;
    const totalPagesRead = (book?.logs?.reduce((sum, log) => sum + log.pages_read, 0) || 0) - (log?.pages_read || 0);

    Alert.alert(
      "Delete Log",
      "Are you sure you want to delete this log? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: async () => {
            if (book && book?.status === 'Finished' && (totalPagesRead <= book.total_pages)) {
              await updateBookStatus(book?.$id, 'Reading');
            }
        
            if (book && book?.status === 'Reading' && isFirstLog) {
              await updateBookStatus(book?.$id, 'ToRead');
            }
            await deleteLog(log?.$id);
            refetch();
          },
          style: "destructive",
        },
      ]
    );
  };
  

  return (
    <SafeAreaView className='bg-primary h-full'>
      <FlatList
      data={book?.logs}
      keyExtractor={(item:any) => item.$id}
      renderItem={({ item }) => (
        <LogCard
          log={item}
          handlePress={handleDeleteLog}
        />
      )}
      ListHeaderComponent={() => (
        <View className='w-full'>
          <View className='w-full flex-row justify-between items-center bg-white p-5 shadow-md'>
            <TouchableOpacity className='flex-row justify-center items-center' onPress={() => router.back()}>
               <Ionicons name='arrow-back' size={24} color='#000' />
              {/* <Text className='font-pmedium text-xl'>{book?.title}</Text> */}
            </TouchableOpacity>
            <Text className='font-pmedium text-xl'>Book Details</Text>
            <Link href={{ pathname: '/(tabs)/add'}}>
            <Ionicons name='create-outline' size={24} color='#000' />
            </Link>
          </View>
          <View className='w-full px-4 my-4'>
          <BookCard data={book} variant={book.status} location='detail' containerStyles='bg-white' />
          {book.status !== 'Finished' && <CustomButton
            title='Add New Log'
            handlePress={() => router.navigate('/(tabs)/log')}
            containerStyles='w-full mt-5'
          />}
          <Text className='mt-5 text-2xl text-black font-psemibold'>Reading Logs</Text>
          </View>
        </View>
      )}
      ListEmptyComponent={() => (
        <View className='w-full justify-center items-center px-3 my-3'>
          <LottieView
                                autoPlay
                                ref={animation}
                                style={{
                                  width: 200,
                                  height: 200,
                                  backgroundColor: 'transparent',
                                }}
                                // Find more Lottie files at https://lottiefiles.com/featured
                                source={require('@/assets/reading.json')}
                              />
                              <Text className='text-center text-lg font-pregular mt-4'>No progress logged yet. Start tracking your reading journey today.</Text>
        </View>
      )}
      />
    </SafeAreaView>
  )
}

export default BookDetails