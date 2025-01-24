import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import BookCard from '@/components/BookCard'

const reading = () => {
  return (
    <ScrollView>
        <View className='h-full w-full justify-center items-center px-4 my-3'>
            {[1,2,3,4,5,6].map((el) => (
                <BookCard key={el} variant='Reading' containerStyles='mb-5' />
            ))}
        </View>
    </ScrollView>
  )
}

export default reading