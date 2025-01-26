import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, router } from "expo-router";
import { images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import { useGlobalContext } from "@/context/GlobalProvider";

export default function Index() {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/(tabs)/home/reading" />;
  
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{
        height: '100%'
      }}>
        <View className="w-full flex justify-center items-center h-full px-4">
          <Image source={images.Logo} className="w-[140px] h-[84px]" resizeMode='contain' />
          <Image source={images.BookReading} className="w-[250px] h-[200px] mb-5 mt-2" resizeMode='contain' />
          <Text className="text-black text-3xl font-pbold text-center">Welcome to Your{"\n"} Reading Journey!</Text>
          <Text className="text-black-200 font-plight text-lg mt-4 text-center">Track your books, set goals, and discover your reading habits.</Text>
          <CustomButton title='Get Started' handlePress={() => router.push('/sign-in')} containerStyles='w-full mt-7' />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#F8F9FA" style="dark" />
    </SafeAreaView>
  );
}
