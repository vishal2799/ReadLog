import {
    MaterialTopTabNavigationEventMap,
    MaterialTopTabNavigationOptions,
    createMaterialTopTabNavigator,
  } from "@react-navigation/material-top-tabs";
  import { withLayoutContext } from "expo-router";
  import { ParamListBase, TabNavigationState } from "@react-navigation/native";
  
  const { Navigator } = createMaterialTopTabNavigator();
  
  export const MaterialTopTabs = withLayoutContext<
    MaterialTopTabNavigationOptions,
    typeof Navigator,
    TabNavigationState<ParamListBase>,
    MaterialTopTabNavigationEventMap
  >(Navigator);
  
  export default function TabLayout() {
    return (
        <>
    <MaterialTopTabs screenOptions={{tabBarIndicatorStyle: {backgroundColor: '#FF6F61'}, tabBarLabelStyle: {fontSize: 14, fontFamily: 'Poppins-Medium'}}}>
        <MaterialTopTabs.Screen name="reading" options={{ title: "Reading" }} />
        <MaterialTopTabs.Screen name="to-read" options={{ title: "To Read" }} />
        <MaterialTopTabs.Screen name="finished" options={{ title: "Finished" }} />
      </MaterialTopTabs>
      </>
    );
  }