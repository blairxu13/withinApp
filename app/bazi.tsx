import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SECRET_KEY } from '@/constants/api';

// --- Types ---

interface PickerProps {
  items: string[];
  selected: number;
  onSelect: (index: number) => void;
  width: number;
}

type Gender = 'female' | 'male';

// --- Constants ---

const ITEM_HEIGHT = 44;
const VISIBLE_ITEMS = 5;

const YEARS = Array.from({ length: 100 }, (_, i) => `${2025 - i}`);
const MONTHS = Array.from({ length: 12 }, (_, i) => `${i + 1}`.padStart(2, '0'));
const DAYS = Array.from({ length: 31 }, (_, i) => `${i + 1}`.padStart(2, '0'));
const HOURS = Array.from({ length: 24 }, (_, i) => `${i}`.padStart(2, '0'));
const MINUTES = Array.from({ length: 60 }, (_, i) => `${i}`.padStart(2, '0'));

// --- Scroll Picker Component ---

function ScrollPicker({ items, selected, onSelect, width }: PickerProps) {
  const scrollRef = useRef<ScrollView>(null);

  const handleScrollEnd = (offsetY: number) => {
    const index = Math.round(offsetY / ITEM_HEIGHT);
    const clamped = Math.max(0, Math.min(index, items.length - 1));
    onSelect(clamped);
    scrollRef.current?.scrollTo({ y: clamped * ITEM_HEIGHT, animated: true });
  };

  return (
    <View style={{ width, height: ITEM_HEIGHT * VISIBLE_ITEMS, overflow: 'hidden' }}>
      {/* Selection highlight bar */}
      <View
        className="absolute left-0 right-0 bg-[#DCEEFB] rounded-[10px]"
        style={{ top: ITEM_HEIGHT * 2, height: ITEM_HEIGHT }}
        pointerEvents="none"
      />

      <ScrollView
        ref={scrollRef}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        decelerationRate="fast"
        contentContainerStyle={{ paddingVertical: ITEM_HEIGHT * 2 }}
        contentOffset={{ x: 0, y: selected * ITEM_HEIGHT }}
        onMomentumScrollEnd={(e) => handleScrollEnd(e.nativeEvent.contentOffset.y)}
        onScrollEndDrag={(e) => {
          // Capture the value NOW before React recycles the event
          const y = e.nativeEvent.contentOffset.y;
          setTimeout(() => handleScrollEnd(y), 100);
        }}
      >
        {items.map((item, index) => (
          <View key={index} style={{ height: ITEM_HEIGHT, justifyContent: 'center', alignItems: 'center' }}>
            <Text
              className={`text-[18px] ${index === selected ? 'font-bold text-black' : 'font-normal text-gray-400'}`}
            >
              {item}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// --- Main Screen ---

export default function BaziScreen() {
  const router = useRouter();

  const [yearIndex, setYearIndex] = useState<number>(0);
  const [monthIndex, setMonthIndex] = useState<number>(0);
  const [dayIndex, setDayIndex] = useState<number>(0);
  const [hourIndex, setHourIndex] = useState<number>(0);
  const [minuteIndex, setMinuteIndex] = useState<number>(0);
  const [gender, setGender] = useState<Gender>('female');

  const handleCalculate = async (): Promise<void> => {
    // Build solarDatetime: "2002-05-20T14:30:00"
    const solarDatetime = `${YEARS[yearIndex]}-${MONTHS[monthIndex]}-${DAYS[dayIndex]}T${HOURS[hourIndex]}:${MINUTES[minuteIndex]}:00`;
    const genderValue = gender === 'female' ? 0 : 1;
    console.log('TIME AND GENDER VALUES', solarDatetime, genderValue);
    try {
      const response = await fetch(`${SUPABASE_URL}/functions/v1/calculate-bazi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
          'apikey': SUPABASE_SECRET_KEY,
        },
        body: JSON.stringify({ solarDatetime, gender: genderValue }),
      });

      const text = await response.text();
      console.log('Raw response:', response.status, text);

      if (response.ok && text) {
        const data = JSON.parse(text);
        console.log('Bazi result:', data);
        router.push({ pathname: '/bazi-details', params: { data: JSON.stringify(data) } });
      } else {
        console.error('Bazi error:', response.status, text || '(empty response)');
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  return (
    <View className="flex-1 bg-white">

      {/* Header with back button */}
      <View className="flex-row items-center pt-[55px] pb-3 px-4">
        <Pressable onPress={() => router.back()} className="p-2">
          <Feather name="arrow-left" size={24} color="black" />
        </Pressable>
        <Text className="text-[22px] font-bold text-black ml-3">Bazi Calculator</Text>
      </View>

      {/* Date of Birth section */}
      <View className="px-5 mt-4">
        <Text className="text-[16px] font-semibold text-gray-600 mb-3">Date of Birth</Text>

        <View className="flex-row justify-center items-center bg-gray-50 rounded-[20px] py-2 px-3">
          {/* Year */}
          <View className="items-center">
            <Text className="text-[11px] font-medium text-gray-400 mb-1">Year</Text>
            <ScrollPicker items={YEARS} selected={yearIndex} onSelect={setYearIndex} width={80} />
          </View>

          {/* Month */}
          <View className="items-center">
            <Text className="text-[11px] font-medium text-gray-400 mb-1">Month</Text>
            <ScrollPicker items={MONTHS} selected={monthIndex} onSelect={setMonthIndex} width={60} />
          </View>

          {/* Day */}
          <View className="items-center">
            <Text className="text-[11px] font-medium text-gray-400 mb-1">Day</Text>
            <ScrollPicker items={DAYS} selected={dayIndex} onSelect={setDayIndex} width={60} />
          </View>
        </View>
      </View>

      {/* Time section */}
      <View className="px-5 mt-6">
        <Text className="text-[16px] font-semibold text-gray-600 mb-3">Time of Birth</Text>

        <View className="flex-row justify-center items-center bg-gray-50 rounded-[20px] py-2 px-3">
          {/* Hour */}
          <View className="items-center">
            <Text className="text-[11px] font-medium text-gray-400 mb-1">Hour</Text>
            <ScrollPicker items={HOURS} selected={hourIndex} onSelect={setHourIndex} width={70} />
          </View>

          <Text className="text-[24px] font-bold text-black mx-2 mt-4">:</Text>

          {/* Minute */}
          <View className="items-center">
            <Text className="text-[11px] font-medium text-gray-400 mb-1">Min</Text>
            <ScrollPicker items={MINUTES} selected={minuteIndex} onSelect={setMinuteIndex} width={70} />
          </View>
        </View>
      </View>

      {/* Gender section */}
      <View className="px-5 mt-6">
        <Text className="text-[16px] font-semibold text-gray-600 mb-3">Gender</Text>

        <View className="flex-row gap-4">
          <Pressable
            onPress={() => setGender('female')}
            className={`flex-1 py-4 rounded-[15px] items-center border ${
              gender === 'female' ? 'bg-[#DCEEFB] border-black' : 'bg-gray-50 border-transparent'
            }`}
          >
            <Text className={`text-[16px] ${gender === 'female' ? 'font-bold text-black' : 'font-normal text-gray-400'}`}>
              Female
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setGender('male')}
            className={`flex-1 py-4 rounded-[15px] items-center border ${
              gender === 'male' ? 'bg-[#DCEEFB] border-black' : 'bg-gray-50 border-transparent'
            }`}
          >
            <Text className={`text-[16px] ${gender === 'male' ? 'font-bold text-black' : 'font-normal text-gray-400'}`}>
              Male
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Calculate button */}
      <View className="px-5 mt-8">
        <Pressable
          onPress={handleCalculate}
          className="bg-[#F4C2C2] py-4 rounded-full items-center border border-black active:opacity-60"
          style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1, transform: [{ scale: pressed ? 0.97 : 1 }] })}
        >
          <Text className="text-[16px] font-semibold text-black">Calculate</Text>
        </Pressable>
      </View>
    </View>
  );
}
