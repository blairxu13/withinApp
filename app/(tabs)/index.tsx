import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { signOut } from '@/services/auth';

export default function FunctionScreen() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace('/');
  };

  return (
    <LinearGradient
      colors={['rgba(255, 255, 255, 0.72)', 'rgba(255, 201, 181, 0.61)']}
      locations={[0.0481, 0.9231]}
      style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start', padding: 10, gap: 10 }}
    >

      {/* Main name header */}
      <Text className="text-5xl font-black text-black mt-[43px]">
        Hello Jade
      </Text>

      {/* Function section header */}
      <Text className="mt-[78px] ml-[11px] text-[15px] font-bold text-black">
        Function
      </Text>

      {/* Function boxes row */}
      <View className="ml-[11px] flex-row gap-[17px]">

        {/* Function 1 box */}
        <View className="w-[97px] h-[75px] bg-[#FFF9C4] rounded-[25px] items-center justify-center">
          <FontAwesome5 name="star-and-crescent" size={40} color="#F4C2C2" />
        </View>

        {/* Function 2 box */}
        <View className="w-[97px] h-[75px] bg-[#FFF9C4] rounded-[25px] items-center justify-center">
          <FontAwesome5 name="yin-yang" size={40} color="#F4C2C2" />
        </View>
      </View>

      {/* Folder box */}
      <View className="flex-1 self-stretch bg-box-gray rounded-[15px] p-3">

        {/* Folder header row */}
        <View className="flex-row justify-between items-start">
          <Text className="text-[25px] font-bold text-black ml-2">
            Folder
          </Text>

          {/* Delete folder circle */}
          <View className="w-[50px] h-[50px] bg-delete-pink rounded-full items-center justify-center">
              <FontAwesome5 name="plus" size={30} color="black" />
            </View>
        </View>
      </View>

      {/* Back to login */}
      <View className="self-stretch items-center pb-5">
        <Pressable
          onPress={handleSignOut}
          className="bg-black/15 px-6 py-3 rounded-[10px]"
        >
          <Text className="text-sm font-semibold text-black">Back to Login</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}
