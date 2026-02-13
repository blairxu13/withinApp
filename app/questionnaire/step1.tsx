import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, TextInput, View, KeyboardAvoidingView, Platform } from 'react-native';

interface Step1Answers {
  displayName: string;
}

export default function QuestionnaireStep1() {
  const router = useRouter();
  const [displayName, setDisplayName] = useState<string>('');

  const handleNext = (): void => {
    if (!displayName.trim()) return;

    router.push({
      pathname: '/questionnaire/step2',
      params: { displayName: displayName.trim() },
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View className="flex-1 bg-white px-8">
        {/* Progress dots */}
        <View className="flex-row items-center justify-center gap-2 mt-[70px]">
          <View className="w-[10px] h-[10px] rounded-full bg-black" />
          <View className="w-[10px] h-[10px] rounded-full bg-gray-300" />
          <View className="w-[10px] h-[10px] rounded-full bg-gray-300" />
        </View>

        {/* Question content — pushed to vertical center with flex */}
        <View className="flex-1 justify-center">
          <Text className="text-3xl font-bold text-black mb-2">
            What's your display name?
          </Text>
          <Text className="text-base text-gray-500 mb-10">
            This is how others will see you.
          </Text>

          {/* Input */}
          <TextInput
            className="border-b-2 border-black text-xl text-black py-3"
            placeholder="Type your name..."
            placeholderTextColor="#ccc"
            value={displayName}
            onChangeText={setDisplayName}
            autoFocus
            returnKeyType="next"
            onSubmitEditing={handleNext}
          />
        </View>

        {/* Next button — pinned to bottom */}
        <Pressable
          onPress={handleNext}
          className="self-end rounded-full px-8 py-4 mb-[50px]"
          style={({ pressed }) => ({
            backgroundColor: displayName.trim() ? '#000' : '#D1D5DB',
            opacity: pressed && displayName.trim() ? 0.8 : 1,
            transform: [{ scale: pressed && displayName.trim() ? 0.97 : 1 }],
          })}
          disabled={!displayName.trim()}
        >
          <Text className="text-white text-lg font-semibold">Next</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
