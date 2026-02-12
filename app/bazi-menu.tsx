import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function BaziMenuScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">

      {/* Header with back button */}
      <View className="flex-row items-center pt-[55px] pb-3 px-4">
        <Pressable onPress={() => router.back()} className="p-2">
          <Feather name="arrow-left" size={24} color="black" />
        </Pressable>
        <Text className="text-[22px] font-bold text-black ml-3">Bazi</Text>
      </View>

      {/* Buttons */}
      <View className="px-5 mt-10 gap-5">

        {/* Add New Bazi */}
        <Pressable
          onPress={() => router.push('/bazi')}
          className="flex-row items-center bg-[#F4C2C2] rounded-[20px] px-6 py-5 border border-black"
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1, transform: [{ scale: pressed ? 0.97 : 1 }] })}
        >
          <View className="w-[45px] h-[45px] bg-white rounded-full items-center justify-center mr-4">
            <FontAwesome5 name="plus" size={20} color="#F4C2C2" />
          </View>
          <Text className="text-[18px] font-semibold text-black">Add New Bazi</Text>
        </Pressable>

        {/* View Existing Bazi Chart */}
        <Pressable
          onPress={() => router.push('/bazi-details')}
          className="flex-row items-center bg-[#DCEEFB] rounded-[20px] px-6 py-5 border border-black"
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1, transform: [{ scale: pressed ? 0.97 : 1 }] })}
        >
          <View className="w-[45px] h-[45px] bg-white rounded-full items-center justify-center mr-4">
            <FontAwesome5 name="book" size={20} color="#DCEEFB" />
          </View>
          <Text className="text-[18px] font-semibold text-black">View Existing Bazi Chart</Text>
        </Pressable>
      </View>
    </View>
  );
}
