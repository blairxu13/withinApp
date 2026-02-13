import { supabase } from '@/services/supabase';
import { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function FunctionScreen() {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [displayName, setDisplayName] = useState<string>('');

  useEffect(() => {
    const fetchName = async (): Promise<void> => {
      // 1. Get the currently logged-in user's ID
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      console.log('Auth user:', user?.id, 'error:', userError?.message);
      if (!user) return;

      // 2. Query profiles table filtered by that ID
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('user_name')
        .eq('id', user.id)
        .single();

      console.log('Profile result:', profile, 'error:', profileError?.message);

      if (profile?.user_name) {
        setDisplayName(profile.user_name);
      }
    };

    fetchName();
  }, []);

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{ flexDirection: 'column', alignItems: 'flex-start', padding: 10, gap: 10, paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >

      {/* Main name header */}
      <Text className="text-3xl font-bold text-black mt-[100px]">
        Hello {displayName || '...'}
      </Text>

      {/* Search bar */}
      <View className="mt-[30px] self-stretch flex-row items-center bg-gray-100 rounded-full px-4 py-2.5 mx-1">
        <MaterialIcons name="search" size={22} color="#999" />
        <TextInput
          className="flex-1 ml-2 text-[15px] text-gray-800"
          placeholder="Search..."
          placeholderTextColor="#999"
        />
      </View>

      {/* Function boxes row */}
      <View className="mt-[20px] self-stretch flex-row justify-evenly">

        {/* Tarot box */}
        <View className="items-center gap-[6px]">
          <View className="w-[97px] h-[75px] bg-[#DCEEFB] rounded-[25px] items-center justify-center border border-black" style={{ shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 3 }}>
            <View className="items-center justify-center">
              <FontAwesome5 name="star-and-crescent" size={40} color="black" style={{ position: 'absolute' }} />
              <FontAwesome5 name="star-and-crescent" size={37} color="#F4C2C2" />
            </View>
          </View>
          <Text className="text-[12px] font-semibold text-black">Tarot</Text>
        </View>

        {/* Bazi box */}
        <Pressable className="items-center gap-[6px]" onPress={() => router.push('/bazi-menu')}>
          <View className="w-[97px] h-[75px] bg-[#DCEEFB] rounded-[25px] items-center justify-center border border-black" style={{ shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 3 }}>
            <View className="items-center justify-center">
              <FontAwesome5 name="yin-yang" size={40} color="black" style={{ position: 'absolute' }} />
              <FontAwesome5 name="yin-yang" size={37} color="#F4C2C2" />
            </View>
          </View>
          <Text className="text-[12px] font-semibold text-black">Bazi</Text>
        </Pressable>

        {/* Box 3 */}
        <View className="items-center gap-[6px]">
          <View className="w-[97px] h-[75px] bg-[#DCEEFB] rounded-[25px] items-center justify-center border border-black" style={{ shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 3 }}>
          </View>
        </View>
      </View>

      {/* Function boxes row 2 */}
      <View className="self-stretch flex-row justify-evenly">

        {/* Box 4 */}
        <View className="items-center gap-[6px]">
          <View className="w-[97px] h-[75px] bg-[#DCEEFB] rounded-[25px] items-center justify-center border border-black" style={{ shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 3 }}>
          </View>
        </View>

        {/* Box 5 */}
        <View className="items-center gap-[6px]">
          <View className="w-[97px] h-[75px] bg-[#DCEEFB] rounded-[25px] items-center justify-center border border-black" style={{ shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 3 }}>
          </View>
        </View>

        {/* Box 6 */}
        <View className="items-center gap-[6px]">
          <View className="w-[97px] h-[75px] bg-[#DCEEFB] rounded-[25px] items-center justify-center border border-black" style={{ shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 6, shadowOffset: { width: 0, height: 2 }, elevation: 3 }}>
          </View>
        </View>
      </View>

      {/* Folder box */}
      <View
        className="self-stretch bg-[#FFF0F3] border border-[#F8D7E0] rounded-[15px] p-3 mt-[16px] min-h-[300px]"
        style={{ shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 3 }}
      >

        {/* Folder header row */}
        <View className="flex-row justify-between items-start">
          <Text className="text-[25px] font-bold text-black ml-2">
            Folder
          </Text>

          {/* Plus button */}
          <View className="relative">
            <Pressable
              onPress={() => setShowMenu(!showMenu)}
              className="w-[50px] h-[50px] bg-delete-pink rounded-full items-center justify-center"
            >
              <FontAwesome5 name="plus" size={30} color="black" />
            </Pressable>

            {/* Dropdown menu */}
            {showMenu && (
              <View
                className="absolute right-0 top-[55px] rounded-[35px] py-5 px-5 gap-8"
                style={{ backgroundColor: 'rgba(255,255,255,0.92)', width: 75, shadowColor: '#000', shadowOpacity: 0.12, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 5 }}
              >
                <Pressable className="items-center">
                  <FontAwesome5 name="hourglass" size={32} color="black" />
                </Pressable>
                <Pressable className="items-center">
                  <FontAwesome5 name="book" size={32} color="black" />
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
