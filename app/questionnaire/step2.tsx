import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

interface FocusOption {
  id: string;
  label: string;
  emoji: string;
}

const OPTIONS: FocusOption[] = [
  { id: 'self-growth', label: 'Self-Growth & Healing', emoji: '🌱' },
  { id: 'relationship', label: 'Navigating a Current / Past Relationship', emoji: '💞' },
  { id: 'new-love', label: 'Finding New Love', emoji: '✨' },
  { id: 'browsing', label: 'Just looking and see', emoji: '👀' },
];

export default function QuestionnaireStep2() {
  const router = useRouter();
  const { displayName } = useLocalSearchParams<{ displayName: string }>();
  const [selected, setSelected] = useState<string | null>(null);

  const handleNext = (): void => {
    if (!selected) return;

    router.push({
      pathname: '/questionnaire/step3',
      params: { displayName, focus: selected },
    });
  };

  return (
    <View className="flex-1 bg-white px-8">
      {/* Progress dots */}
      <View className="flex-row items-center justify-center gap-2 mt-[70px]">
        <View className="w-[10px] h-[10px] rounded-full bg-gray-300" />
        <View className="w-[10px] h-[10px] rounded-full bg-black" />
        <View className="w-[10px] h-[10px] rounded-full bg-gray-300" />
      </View>

      {/* Question content */}
      <View className="flex-1 justify-center">
        <Text className="text-3xl font-bold text-black mb-2">
          What is your primary focus right now?
        </Text>
        <Text className="text-base text-gray-500 mb-10">
          Pick the one that resonates most.
        </Text>

        {/* Options */}
        <View className="gap-4">
          {OPTIONS.map((option) => {
            const isSelected = selected === option.id;
            return (
              <Pressable
                key={option.id}
                onPress={() => setSelected(option.id)}
                className={`flex-row items-center rounded-2xl border-2 px-5 py-4 ${
                  isSelected ? 'border-black bg-[#FFF0F3]' : 'border-gray-200 bg-white'
                }`}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.85 : 1,
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                })}
              >
                <Text className="text-2xl mr-4">{option.emoji}</Text>
                <Text
                  className={`text-base flex-1 ${
                    isSelected ? 'font-bold text-black' : 'font-medium text-gray-700'
                  }`}
                >
                  {option.label}
                </Text>
                {isSelected && (
                  <View className="w-[22px] h-[22px] rounded-full bg-black items-center justify-center">
                    <Text className="text-white text-xs font-bold">✓</Text>
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Next button — pinned to bottom */}
      <Pressable
        onPress={handleNext}
        className="self-end rounded-full px-8 py-4 mb-[50px]"
        style={({ pressed }) => ({
          backgroundColor: selected ? '#000' : '#D1D5DB',
          opacity: pressed && selected ? 0.8 : 1,
          transform: [{ scale: pressed && selected ? 0.97 : 1 }],
        })}
        disabled={!selected}
      >
        <Text className="text-white text-lg font-semibold">Next</Text>
      </Pressable>
    </View>
  );
}
