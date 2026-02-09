import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { onGoogleButtonPress } from '@/services/auth';

export default function LandingScreen() {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    await onGoogleButtonPress();
    router.replace('/(tabs)');
  };

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

      <Pressable
        onPress={handleGoogleSignIn}
        style={{ marginTop: 24, borderWidth: 1, borderColor: '#ccc', borderRadius: 12, paddingHorizontal: 20, paddingVertical: 14 }}
      >
        <Text style={{ fontSize: 16 }} className="text-black dark:text-white">
          Sign in with Google
        </Text>
      </Pressable>
    </View>
  );
}
