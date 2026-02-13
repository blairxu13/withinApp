import { supabase } from '@/services/supabase';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Alert, Pressable, Text, View } from 'react-native';

interface ExperienceOption {
  id: string;
  label: string;
  description: string;
}

const OPTIONS: ExperienceOption[] = [
  { id: 'beginner', label: 'Beginner', description: 'New to metaphysics — just getting started.' },
  { id: 'intermediate', label: 'Intermediate', description: 'Know the basics, explored a few readings.' },
  { id: 'advanced', label: 'Advanced', description: 'Deep knowledge, use it regularly.' },
];

export default function QuestionnaireStep3() {
  const router = useRouter();
  const { displayName, focus } = useLocalSearchParams<{ displayName: string; focus: string }>();
  const [selected, setSelected] = useState<string | null>(null);
  const [saving, setSaving] = useState<boolean>(false);

  const handleFinish = async (): Promise<void> => {
    if (!selected) return;
    setSaving(true);

    try {
      // Get the currently authenticated user
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        Alert.alert('Error', 'No authenticated user found.');
        setSaving(false);
        return;
      }

      // Save questionnaire answers to the profiles table
      const { error } = await supabase
        .from('user_profiles')
        .update({
          user_name: displayName,
          user_intent: focus,
          user_experience: selected,
          onboarding_complete: true,
        })
        .eq('id', user.id);

      if (error) {
        console.error('Save questionnaire error:', error);
        Alert.alert('Error', 'Failed to save your answers. Please try again.');
        setSaving(false);
        return;
      }

      // Navigate to the main app
      router.replace('/(tabs)');
    } catch (err) {
      console.error('Questionnaire save error:', err);
      Alert.alert('Error', 'Something went wrong.');
      setSaving(false);
    }
  };

  return (
    <View className="flex-1 bg-white px-8">
      {/* Progress dots */}
      <View className="flex-row items-center justify-center gap-2 mt-[70px]">
        <View className="w-[10px] h-[10px] rounded-full bg-gray-300" />
        <View className="w-[10px] h-[10px] rounded-full bg-gray-300" />
        <View className="w-[10px] h-[10px] rounded-full bg-black" />
      </View>

      {/* Question content */}
      <View className="flex-1 justify-center">
        <Text className="text-3xl font-bold text-black mb-2">
          How much experience do you have with Metaphysics?
        </Text>
        <Text className="text-base text-gray-500 mb-10">
          Specifically for understanding relationships.
        </Text>

        {/* Options */}
        <View className="gap-4">
          {OPTIONS.map((option) => {
            const isSelected = selected === option.id;
            return (
              <Pressable
                key={option.id}
                onPress={() => setSelected(option.id)}
                className={`rounded-2xl border-2 px-5 py-5 ${
                  isSelected ? 'border-black bg-[#FFF0F3]' : 'border-gray-200 bg-white'
                }`}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.85 : 1,
                  transform: [{ scale: pressed ? 0.98 : 1 }],
                })}
              >
                <View className="flex-row items-center justify-between">
                  <Text
                    className={`text-lg ${
                      isSelected ? 'font-bold text-black' : 'font-semibold text-gray-700'
                    }`}
                  >
                    {option.label}
                  </Text>
                  {isSelected && (
                    <View className="w-[22px] h-[22px] rounded-full bg-black items-center justify-center">
                      <Text className="text-white text-xs font-bold">✓</Text>
                    </View>
                  )}
                </View>
                <Text className="text-sm text-gray-500 mt-1">{option.description}</Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Finish button — pinned to bottom */}
      <Pressable
        onPress={handleFinish}
        className="self-end rounded-full px-8 py-4 mb-[50px]"
        style={({ pressed }) => ({
          backgroundColor: selected && !saving ? '#F4C2C2' : '#D1D5DB',
          borderWidth: selected ? 1 : 0,
          borderColor: '#000',
          opacity: (pressed && selected) || saving ? 0.8 : 1,
          transform: [{ scale: pressed && selected ? 0.97 : 1 }],
        })}
        disabled={!selected || saving}
      >
        {saving ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Text className="text-black text-lg font-semibold">Let's go</Text>
        )}
      </Pressable>
    </View>
  );
}
