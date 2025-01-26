import { View, Text } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Link } from 'expo-router'

interface BookCardProps {
    containerStyles?: string;
    variant?: string;
    data?: any;
    location?: string;
}

const BookCard:React.FC<BookCardProps> = ({containerStyles, variant = 'Reading', data, location}) => {
    const progressPercentage = (progressPercentage:any) => Math.min(
        Math.ceil(( progressPercentage/ data.total_pages) * 100),
        100
      );

    const bookStatus = (variant:string) => {
        if(variant === 'Reading'){
          return <Text className='font-psemibold text-sm text-secondary'>{data.progressPercentage}% complete</Text>
        } else if(variant === 'ToRead') {
           return (
            <View className='flex-row justify-center items-center gap-1'>
                        <Ionicons name="time-outline" size={16} color='#FF6F61' />
           <Text className='font-psemibold text-sm text-secondary'>To Read</Text>
           </View>
           )
        } else {
           return (
            <View className='flex-row justify-center items-center gap-1'>
                        <Ionicons name="book" size={16} color='#FF6F61' />
           <Text className='font-psemibold text-sm text-secondary'>Finished</Text>
        </View>)
        }
    }
  return (
    <View className={`w-full bg-primary rounded-lg p-5 shadow-md ${containerStyles}`}>
                    <View className='flex flex-row justify-between items-center'>
                        <Text className='text-xl font-psemibold text-secondary'>{data?.title}</Text>
                        <Text className='py-2 px-3 rounded-full font-psemibold text-sm bg-red-50 text-secondary'>{data?.genre}</Text>
                    </View>
                    <Text className='text-black text-base font-pregular mt-2'>{data?.author}</Text>
                    <View className='flex flex-row justify-between items-center mt-4'>
                        <View className='flex-row justify-center items-center gap-2'>
                        <Ionicons name="book-outline" size={18} />
                        <Text className='text-sm font-pregular'>{data?.total_pages} pages</Text>
                        </View>
                        {bookStatus(variant)}
                    </View>
                    {variant === 'Reading' && (<View className='w-full h-1 bg-gray-200 rounded-sm mt-3'>
                        <View className='h-full bg-secondary' style={{width: progressPercentage(data.progressPercentage)}}></View>
                    </View>)}
                    
          {location !== 'detail' && (
            <Link href={{
              pathname: '/(tabs)/books/[detail]',
              params: { detail: `${data?.$id}` },
            }} className='mt-3'>
            <View className='w-full flex-row justify-end items-center gap-1'>
            <Text className='text-sm font-psemibold text-secondary'>Book Details</Text>
            <Ionicons name="chevron-forward" size={18} color='#FF6F61'/>
            </View>
            </Link>
          ) }
          
                </View>
  )
}

export default BookCard