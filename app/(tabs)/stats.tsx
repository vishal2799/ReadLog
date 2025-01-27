import { View, Text, ToastAndroid, ScrollView, ActivityIndicator } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../context/GlobalProvider';
import { signOut } from '@/lib/appwrite';
import { router } from 'expo-router';
import CustomButton from '@/components/CustomButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useBooks } from '@/context/BooksContext';

const Home = () => {
    const { books, loading } = useBooks();

    if (loading) {
          return <ActivityIndicator animating={loading} color="#000" size='large' />
    }

    if (!books || books.length === 0) {
      return <div>No books found!</div>;
    }

    // Calculate KPIs
  const booksRead = books.filter(book => book.status === "Finished").length;
  const activeBooks = books.filter(book => book.status === "Reading").length;

  const totalPagesRead = books.reduce(
    (sum, book) =>
      sum + (book.logs?.reduce((logSum, log) => logSum + log.pages_read, 0) || 0),
    0
  );

  const firstLogDate = books
    .flatMap(book => book.logs?.map(log => log.body) || [])
    .sort()[0]; // Get the earliest log date

  const daysSinceFirstLog = firstLogDate
    ? Math.max(
        (Date.now() - new Date(firstLogDate).getTime()) / (1000 * 60 * 60 * 24),
        1
      )
    : 1;

  const avgPagesPerDay = totalPagesRead / daysSinceFirstLog;


  
  const { user, setUser, setIsLogged } = useGlobalContext();

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);
    ToastAndroid.show('Logout Successfully', ToastAndroid.SHORT);
    router.replace('/sign-in');
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
              <View className='h-full w-full justify-center items-center'>
                <View className='w-full bg-white p-5'>
                  <Text className='text-black text-3xl font-pbold text-center mt-5'>
                  Your Reading Stats
                              </Text>
                              <Text className='text-black-200 font-plight text-lg mt-4 text-center'>
                              Track your reading {'\n'} progress and achievements 
                              </Text>
                </View>
                

                <View className="w-full flex-row justify-center my-6 flex-wrap gap-x-4 gap-y-4">
  {/* Column 1 */}
  <View className="bg-white px-3 py-3 flex-row justify-between items-center rounded-md gap-3 w-[45%]">
    <View className="flex-col justify-center items-center w-10 h-10 bg-green-100 rounded-full">
      <Ionicons name="book-outline" size={16} color="green" />
    </View>
    <View className="flex-col">
      <Text className="text-lg font-pbold">{booksRead}</Text>
      <Text className="text-xs font-pregular text-black-100">Books Read</Text>
    </View>
  </View>

  {/* Column 2 */}
  <View className="bg-white px-3 py-3 flex-row justify-between items-center rounded-md gap-3 w-[45%]">
    <View className="flex-col justify-center items-center w-10 h-10 bg-green-100 rounded-full">
      <Ionicons name="book-outline" size={16} color="green" />
    </View>
    <View className="flex-col">
      <Text className="text-lg font-pbold">{activeBooks}</Text>
      <Text className="text-xs font-pregular text-black-100">Active Books</Text>
    </View>
  </View>

  {/* Column 3 */}
  <View className="bg-white px-3 py-3 flex-row justify-between items-center rounded-md gap-3 w-[45%]">
    <View className="flex-col justify-center items-center w-10 h-10 bg-green-100 rounded-full">
      <Ionicons name="book-outline" size={16} color="green" />
    </View>
    <View className="flex-col">
      <Text className="text-lg font-pbold">{totalPagesRead}</Text>
      <Text className="text-xs font-pregular text-black-100">Pages Read</Text>
    </View>
  </View>

  {/* Column 4 */}
  <View className="bg-white px-3 py-3 flex-row justify-between items-center rounded-md gap-3 w-[45%]">
    <View className="flex-col justify-center items-center w-10 h-10 bg-green-100 rounded-full">
      <Ionicons name="book-outline" size={16} color="green" />
    </View>
    <View className="flex-col">
      <Text className="text-lg font-pbold">{avgPagesPerDay.toFixed(1)}</Text>
      <Text className="text-xs font-pregular text-black-100">Avg Pages/Day</Text>
    </View>
  </View>
</View>


              </View>
              </ScrollView>
      {/* <View>
        <Text className='text-3xl text-black'>{user?.username}</Text>
        <CustomButton
          title='Logout'
          containerStyles='mb-5'
          handlePress={logout}
        />
              <Ionicons name="checkmark-circle" size={32} color="green" />

      </View> */}
    </SafeAreaView>
  );
};

export default Home;
