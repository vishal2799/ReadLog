import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useBooks } from '@/context/BooksContext';
import { BarChart } from 'react-native-gifted-charts';
import dayjs from "dayjs"; // For date calculations

const ReadingBarChart = () => {
    const { books } = useBooks();
  const [barData, setBarData] = useState<{ value: number; label: string; frontColor: string }[]>([]);

  useEffect(() => {
    if (books && books.length > 0) {
      // Array to store pages read for each day of the current week
      const currentWeekData = Array(7).fill(0);

      books.forEach((book) => {
        book.logs?.forEach((log:any) => {
          const logDate = dayjs(log.$createdAt); // Parse ISO date
          const dayOfWeek = logDate.day(); // Get the day of the week (0 = Sunday, 6 = Saturday)

          // Check if the log is within the current week
          if (logDate.isSame(dayjs(), "week")) {
            currentWeekData[dayOfWeek] += log.pages_read;
          }
        });
      });

      // Format data for BarChart
      const formattedData = currentWeekData.map((value, index) => ({
        value,
        label: dayjs().day(index).format("dd"), // e.g., "Sun", "Mon"
        frontColor: generateColor(index), // Assign colors to each bar
      }));

      setBarData(formattedData);
    }
  }, [books]);

  // Function to generate colors for the bars
  const generateColor = (index: number) => {
    const colors = ["#4CAF50", "#FF9800", "#2196F3", "#F44336", "#9C27B0", "#3F51B5", "#FFC107"];
    return colors[index % colors.length];
  };

  if (!barData.length) {
    return <Text>No reading data available for this week</Text>;
  }

  return (
    <View className='mx-3 mb-4 flex-row'>
          <View className='w-full bg-white rounded-md p-5'>
            <Text className='text-xl font-psemibold mb-4'>Reading Progress</Text>
            <View className='w-full flex-row justify-center'>
            <BarChart
        data={barData}
        barWidth={10} // Width of each bar
        spacing={20} // Space between bars
        roundedTop // Round the top edges of the bars
        roundedBottom // Round the bottom edges of the bars
        noOfSections={5} // Number of horizontal sections in the chart
        yAxisTextStyle={{ color: "#888" }} // Style for Y-axis labels
        xAxisLabelTextStyle={{ color: "#555" }} // Style for X-axis labels
        hideRules // Hide horizontal grid lines
      />

            </View>
            <View className='flex-row justify-center mt-4 gap-x-2 gap-y-2 flex-wrap'>
            
            </View>
          </View>
        </View>
  )
}

export default ReadingBarChart