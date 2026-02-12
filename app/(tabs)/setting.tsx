import { View, Text, Pressable, ScrollView } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// --- Types ---

interface SettingItem {
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
}

// --- Section data ---

const SETTINGS_SECTIONS: SettingItem[] = [
  { label: 'History', icon: 'history' },
  { label: 'Membership', icon: 'card-membership' },
  { label: 'Update', icon: 'system-update' },
];

// --- Component ---

export default function SettingScreen() {
  return (
    <ScrollView className="flex-1 bg-[#FFF0F3]" contentContainerStyle={{ alignItems: 'center', paddingBottom: 40 }}>

      {/* Header */}
      <Text className="text-[22px] font-bold text-gray-800 mt-[55px]">
        Settings
      </Text>

      {/* Profile picture circle */}
      <View className="w-[100px] h-[100px] bg-[#F8D7E0] rounded-full items-center justify-center mt-6">
        <MaterialIcons name="person" size={50} color="#E91E63" />
      </View>
      <Text className="text-[16px] font-semibold text-gray-800 mt-3">
        Jade
      </Text>

      {/* Settings sections */}
      <View className="w-full px-5 mt-8 gap-3">
        {SETTINGS_SECTIONS.map((item) => (
          <Pressable
            key={item.label}
            className="flex-row items-center bg-white rounded-2xl px-5 py-4"
            style={{ shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 }}
          >
            <View className="w-[40px] h-[40px] bg-[#FFF0F3] rounded-full items-center justify-center mr-4">
              <MaterialIcons name={item.icon} size={22} color="#E91E63" />
            </View>
            <Text className="flex-1 text-[16px] font-medium text-gray-800">
              {item.label}
            </Text>
            <MaterialIcons name="chevron-right" size={24} color="#C9A0A0" />
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}
