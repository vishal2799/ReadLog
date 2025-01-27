import React from 'react'
import { Stack } from 'expo-router'


const BookLayout = () => {
  
  return (
    <Stack>
        <Stack.Screen name='[detail]' options={{headerShown: false}} />
    </Stack>
  )
}

export default BookLayout