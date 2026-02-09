import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function FunctionScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-peach-bg px-[18px] pt-[53px]">

      {/* Main name header */}
      <Text className="text-5xl font-black text-black">
        Hello Jade
      </Text>

      {/* Function section header */}
      <Text className="mt-[88px] ml-[11px] text-[15px] font-bold text-black">
        Function
      </Text>

      {/* Function boxes row */}
      <View className="mt-[18px] ml-[11px] flex-row gap-[17px]">

        {/* Function 1 box */}
        <View className="w-[97px] h-[75px] bg-box-gray rounded-[25px] items-center justify-center">
          <FontAwesome5 name="star-and-crescent" size={40} color="black" />
        </View>

        {/* Function 2 box */}
        <View className="w-[97px] h-[75px] bg-box-mauve rounded-[25px] items-center justify-center">
          <FontAwesome5 name="yin-yang" size={40} color="black" />
        </View>
      </View>

      {/* Folder box */}
      <View className="mt-[26px] flex-1 bg-box-gray rounded-[15px] p-3">

        {/* Folder header row */}
        <View className="flex-row justify-between items-start">
          <Text className="text-[25px] font-bold text-black ml-2">
            Folder
          </Text>

          {/* Delete folder circle */}
          <View className="w-[50px] h-[50px] bg-delete-pink rounded-full" />
        </View>
      </View>

      {/* Back to login */}
      <View className="flex-1 items-center justify-end pb-5">
        <Pressable
          onPress={() => router.replace('/')}
          className="bg-black/15 px-6 py-3 rounded-[10px]"
        >
          <Text className="text-sm font-semibold text-black">Back to Login</Text>
        </Pressable>
      </View>
    </View>
  );
}
