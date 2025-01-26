import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const BookLayout = () => {
  return (
    <Stack>
        <Stack.Screen name='add' options={{headerShown: false}} />
        <Stack.Screen name='[detail]' options={{headerShown: false}} />
    </Stack>
  )
}

export default BookLayout