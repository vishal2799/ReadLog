import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { PieChart } from 'react-native-gifted-charts'
import { useBooks } from '@/context/BooksContext';

const GenreChart = () => {
        const { books } = useBooks();
    
    const [genreData, setGenreData] = useState<{ value: number; color: string; text: string }[]>([]);

    useEffect(() => {
      if (books && books.length > 0) {
        // Group books by genre
        const genreCount: Record<string, number> = {};
        books.forEach((book:any) => {
          const genre = book.genre || "Unknown"; // Default to 'Unknown' if genre is not set
          genreCount[genre] = (genreCount[genre] || 0) + 1;
        });
  
        // Format data for the PieChart
        const data = Object.keys(genreCount).map((genre, index) => ({
          value: genreCount[genre],
          color: generateColor(index), // Generate unique color for each genre
          text: genre, // Genre name for the legend
        }));
  
        setGenreData(data);
      }
    }, [books]);
  
    // Function to generate unique colors
    const generateColor = (index: number) => {
      const colors = [
        "#4CAF50",
        "#FF9800",
        "#2196F3",
        "#F44336",
        "#9C27B0",
        "#3F51B5",
      ];
      return colors[index % colors.length]; // Cycle through colors if genres exceed predefined ones
    };
  
    if (!genreData.length) {
      return <Text>No genre data available</Text>;
    }
  return (
    <View className='mx-3 mb-4 flex-row'>
      <View className='w-full bg-white rounded-md p-5'>
        <Text className='text-xl font-psemibold mb-4'>Genre Breakdown</Text>
        <View className='w-full flex-row justify-center'>
        <PieChart data={genreData}/>
        </View>
        <View className='flex-row justify-center mt-4 gap-x-2 gap-y-2 flex-wrap'>
        {genreData.map(item => (
              <View key={item.text} className='flex-row items-center gap-2'>
                <View className='w-4 h-4 rounded-full' style={[{ backgroundColor: item.color }]} />
                <Text className='text-sm font-plight'>{item.text}</Text>
              </View>
            ))}
        </View>
      </View>
    </View>
  )
}

export default GenreChart