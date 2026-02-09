import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';

export default function LandingScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} className="bg-white dark:bg-black">
      <Pressable
        onPress={() => router.replace('/(tabs)')}
        className="rounded-xl bg-black px-8 py-4 dark:bg-white"
      >
        <Text style={{ fontSize: 36 }} className="font-semibold text-white dark:text-black">
          Enter
        </Text>
      </Pressable>

      <View
        style={{ marginTop: 24, borderWidth: 1, borderColor: '#ccc', borderRadius: 12, paddingHorizontal: 20, paddingVertical: 14 }}
      >
        <Text style={{ fontSize: 16 }} className="text-black dark:text-white">
          Click here to signup or login
        </Text>
      </View>
    </View>
  );
}
