import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import React, { useRef} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useBooks } from '@/context/BooksContext';
import LottieView from 'lottie-react-native';
import GenreChart from '@/components/GenreChart';
import ReadingBarChart from '@/components/ReadingBarChart';
import { AntDesign } from '@expo/vector-icons';

const Home = () => {
    const { books, loading } = useBooks();
  const animation = useRef<LottieView>(null);
    if (loading) {
          return <ActivityIndicator animating={loading} color="#000" size='large' />
    }

    if (!books || books.length === 0) {
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
                  <Text className='text-center text-lg font-pregular mt-4'>No books found! 📚</Text>
                </View>
      );
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

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
              <View className='h-full w-full justify-center items-center mb-10'>
                <View className='w-full bg-white p-5 shadow-md shadow-slate-400'>
                  <Text className='text-black text-3xl font-pbold text-center'>
                  Your Reading Stats
                              </Text>
                              <Text className='text-black-200 font-plight text-lg mt-4 text-center'>
                              Track your reading {'\n'} progress and achievements 
                              </Text>
                </View>
                

                <View className="w-full flex-row justify-center my-6 flex-wrap gap-x-4 gap-y-4">
  {/* Column 1 */}
  <View className="bg-white px-3 py-3 flex-row shadow-md shadow-slate-400 items-center rounded-md gap-3 w-[45%]">
    <View className="flex-col justify-center items-center w-10 h-10 bg-blue-100 rounded-full">
      <AntDesign name="book" size={16} color="blue" />
    </View>
    <View className="flex-col">
      <Text className="text-lg font-pbold">{booksRead}</Text>
      <Text className="text-xs font-pregular text-black-100">Books Read</Text>
    </View>
  </View>

  {/* Column 2 */}
  <View className="bg-white px-3 py-3 flex-row gap-3 shadow-md shadow-slate-400 items-center rounded-md w-[45%]">
    <View className="flex-col justify-center items-center w-10 h-10 bg-green-100 rounded-full">
      <Ionicons name="book-outline" size={16} color="green" />
    </View>
    <View className="flex-col">
      <Text className="text-lg font-pbold">{activeBooks}</Text>
      <Text className="text-xs font-pregular text-black-100">Active Books</Text>
    </View>
  </View>

  {/* Column 3 */}
  <View className="bg-white px-3 py-3 flex-row gap-3 shadow-md shadow-slate-400 items-center rounded-md w-[45%]">
    <View className="flex-col justify-center items-center w-10 h-10 bg-red-100 rounded-full">
      <Ionicons name="analytics" size={16} color="red" />
    </View>
    <View className="flex-col">
      <Text className="text-lg font-pbold">{totalPagesRead}</Text>
      <Text className="text-xs font-pregular text-black-100">Pages Read</Text>
    </View>
  </View>

  {/* Column 4 */}
  <View className="bg-white px-3 py-3 flex-row gap-3 shadow-md shadow-slate-400 items-center rounded-md w-[45%]">
    <View className="flex-col justify-center items-center w-10 h-10 bg-indigo-100 rounded-full">
      <Ionicons name="stats-chart" size={16} color="indigo" />
    </View>
    <View className="flex-col">
      <Text className="text-lg font-pbold">{avgPagesPerDay.toFixed(1)}</Text>
      <Text className="text-xs font-pregular text-black-100">Avg Pages/Day</Text>
    </View>
  </View>
</View>
<ReadingBarChart />
<GenreChart />

<View className='flex-row mx-4 mt-2'>
<View className='w-full bg-secondary rounded-md p-5'>
  <Text className='text-white font-psemibold text-lg text-center'>Keep reading!</Text>
  <Text className='text-white font-pmedium text-sm text-center mt-2'>You're doing great! Every page is a new adventure.</Text>
</View>
</View>


              </View>
              </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
