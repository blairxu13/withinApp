import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Feather from '@expo/vector-icons/Feather';

// --- Types ---

interface BaziResult {
  [key: string]: string | number | Record<string, string>;
}

// --- Component ---

export default function BaziDetailsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ data: string }>();

  // Parse the JSON string passed from bazi.tsx
  const result: BaziResult | null = params.data ? JSON.parse(params.data) : null;

  return (
    <View className="flex-1 bg-white">

      {/* Header */}
      <View className="flex-row items-center pt-[55px] pb-3 px-4">
        <Pressable onPress={() => router.back()} className="p-2">
          <Feather name="arrow-left" size={24} color="black" />
        </Pressable>
        <Text className="text-[22px] font-bold text-black ml-3">Bazi Chart</Text>
      </View>

      {/* Result content */}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {result ? (
          Object.entries(result).map(([key, value]) => (
            <View key={key} className="mb-4 bg-gray-50 rounded-[15px] px-5 py-4">
              <Text className="text-[13px] font-medium text-gray-400 mb-1">{key}</Text>
              {typeof value === 'object' && value !== null ? (
                // Nested object (e.g. 五行, 纳音)
                Object.entries(value).map(([subKey, subValue]) => (
                  <View key={subKey} className="flex-row justify-between mt-1">
                    <Text className="text-[15px] text-gray-500">{subKey}</Text>
                    <Text className="text-[15px] font-semibold text-black">{String(subValue)}</Text>
                  </View>
                ))
              ) : (
                <Text className="text-[18px] font-semibold text-black">{String(value)}</Text>
              )}
            </View>
          ))
        ) : (
          <View className="items-center mt-20">
            <Text className="text-[16px] text-gray-400">No bazi data available</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
