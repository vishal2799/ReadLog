import { Redirect, Tabs } from 'expo-router'
import { useGlobalContext } from '@/context/GlobalProvider';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text, View } from 'react-native';

import { FC } from 'react';

interface TabIconProps {
  icon: string;
  color: string;
  name: string;
  focused: boolean;
}

const TabIcon: FC<TabIconProps> = ({ icon, color, name, focused }) => {
  return (
    <View className="flex w-14 items-center justify-center gap-2">
      <Ionicons name={icon as keyof typeof Ionicons.glyphMap} size={24} color={`${focused ? '#FF6F61' : '#4A4A4A'}`} />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabLayout = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && !isLogged) return <Redirect href="/sign-in" />;

  
  return (
    <>
    <Tabs screenOptions={{
          tabBarActiveTintColor: "#FF6F61",
          tabBarInactiveTintColor: "#4A4A4A",
          tabBarShowLabel: false,
          tabBarStyle: {
            paddingTop: 10,
            backgroundColor: "#F8F9FA",
            borderTopWidth: 1,
            borderTopColor: "#FF6F61",
            height: 70,
          },
        }}>
        <Tabs.Screen name='home' options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon='home-outline'
                color={color}
                name="Home"
                focused={focused}
              />
            ),
          }}/>
        <Tabs.Screen name='add' options={{
            title: "Add",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon='add-circle-outline'
                color={color}
                name="Add"
                focused={focused}
              />
            ),
          }}/>
          <Tabs.Screen name='log' options={{
            title: "Log",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon='analytics-outline'
                color={color}
                name="Log"
                focused={focused}
              />
            ),
          }}/>
          <Tabs.Screen name='stats' options={{
            title: "Stats",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon='stats-chart-outline'
                color={color}
                name="Stats"
                focused={focused}
              />
            ),
          }}/>
          <Tabs.Screen name='profile' options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon='person-outline'
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}/>
    </Tabs>
    </>
  )
}

export default TabLayout