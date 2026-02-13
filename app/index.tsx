import { signInWithGoogle } from '@/services/auth';
import { supabase } from '@/services/supabase';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

export default function LandingScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleGoogleSignIn = async (): Promise<void> => {
    setLoading(true);
    const success = await signInWithGoogle();
    setLoading(false);

    if (success) {
      // Check if user already completed onboarding
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('onboarding_complete')
        .single();

      if (profile?.onboarding_complete) {
        router.replace('/(tabs)');
      } else {
        router.replace('/questionnaire/step1');
      }
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} className="bg-white dark:bg-black">
      <Pressable
        onPress={async () => {
          const { data: profile } = await supabase
            .from('profiles')
            .select('onboarding_complete')
            .single();

          if (profile?.onboarding_complete) {
            router.replace('/(tabs)');
          } else {
            router.replace('/questionnaire/step1');
          }
        }}
        className="rounded-xl bg-black px-8 py-4 dark:bg-white"
      >
        <Text style={{ fontSize: 36 }} className="font-semibold text-white dark:text-black">
          Enter
        </Text>
      </Pressable>

      <Pressable
        onPress={handleGoogleSignIn}
        disabled={loading}
        style={{ marginTop: 24, borderWidth: 1, borderColor: '#ccc', borderRadius: 12, paddingHorizontal: 20, paddingVertical: 14, opacity: loading ? 0.5 : 1 }}
      >
        {loading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Text style={{ fontSize: 16 }} className="text-black dark:text-white">
            Sign in with Google
          </Text>
        )}
      </Pressable>
    </View>
  );
}
