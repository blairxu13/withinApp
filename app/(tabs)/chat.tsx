import { View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { signOut } from '@/services/auth';

export default function ChatScreen() {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace('/');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} className="bg-pink-400">
      <Text style={{ fontSize: 36 }} className="font-bold text-white">Chat</Text>

      <Pressable
        onPress={handleSignOut}
        style={{ marginTop: 24, backgroundColor: 'rgba(0,0,0,0.3)', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 10 }}
      >
        <Text style={{ fontSize: 16 }} className="font-semibold text-white">Back to Login</Text>
      </Pressable>
    </View>
  );
}
