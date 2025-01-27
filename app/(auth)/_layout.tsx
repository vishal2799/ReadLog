import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const AuthLayout = () => {
  return (
    <>
    <Stack>
        <Stack.Screen name='sign-in' options={{headerShown: false}} />
        <Stack.Screen name='sign-up' options={{headerShown: false}} />
    </Stack>
    <StatusBar backgroundColor="#F8F9FA" style="dark" />
    </>
  )
}

export default AuthLayout