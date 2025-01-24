import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import BookCard from '@/components/BookCard'

const finished = () => {
  return (
    <ScrollView>
        <View className='h-full w-full justify-center items-center px-4 my-3'>
            {[1,2,3].map((el) => (
                <BookCard key={el} variant='Finished' containerStyles='mb-5' />
            ))}
        </View>
    </ScrollView>
  )
}

export default finished