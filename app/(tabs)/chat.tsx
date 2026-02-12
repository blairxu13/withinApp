import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// --- Types ---

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  timestamp: Date;
}

// --- Dummy data to show the UI ---

const INITIAL_MESSAGES: Message[] = [
  { id: '1', text: 'Hey! How are you?', sender: 'other', timestamp: new Date() },
  { id: '2', text: "I'm good! Working on the app 🎉", sender: 'me', timestamp: new Date() },
  { id: '3', text: 'Nice, it looks great so far', sender: 'other', timestamp: new Date() },
];

// --- Component ---

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState<string>('');
  const flatListRef = useRef<FlatList<Message>>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (flatListRef.current && messages.length > 0) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const handleSend = (): void => {
    if (inputText.trim().length === 0) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'me',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');
  };

  const renderMessage = ({ item }: { item: Message }) => {
    const isMe = item.sender === 'me';

    return (
      <View className={`px-3 mb-2 ${isMe ? 'items-end' : 'items-start'}`}>
        <View
          className={`max-w-[75%] px-4 py-2.5 ${
            isMe
              ? 'bg-[#F48FB1] rounded-[20px] rounded-br-[4px]'
              : 'bg-white rounded-[20px] rounded-bl-[4px]'
          }`}
          style={!isMe ? { shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 } : undefined}
        >
          <Text className={`text-[16px] ${isMe ? 'text-white' : 'text-gray-800'}`}>
            {item.text}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-[#FFF0F3]"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      {/* Header */}
      <View className="pt-[55px] pb-3 px-5 bg-[#FFF0F3] border-b border-[#F8D7E0]">
        <Text className="text-[22px] font-bold text-gray-800 text-center">
          Chat
        </Text>
      </View>

      {/* Messages list */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 16 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Input bar */}
      <View className="flex-row items-end px-3 py-2 bg-[#FFF0F3] border-t border-[#F8D7E0]">
        <TextInput
          className="flex-1 bg-white rounded-full px-4 py-2.5 text-[16px] text-gray-800 mr-2"
          style={{ maxHeight: 100, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 1 }}
          placeholder="Message..."
          placeholderTextColor="#C9A0A0"
          value={inputText}
          onChangeText={setInputText}
          multiline
          returnKeyType="default"
        />
        <Pressable
          onPress={handleSend}
          className="w-[40px] h-[40px] bg-[#F48FB1] rounded-full items-center justify-center"
          style={{ opacity: inputText.trim().length > 0 ? 1 : 0.4 }}
        >
          <MaterialIcons name="arrow-upward" size={22} color="white" />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
