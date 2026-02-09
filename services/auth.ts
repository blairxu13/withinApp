import { GOOGLE_WEB_CLIENT_ID } from '@/constants/api';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { supabase } from './supabase';

// Call this once when the app starts (e.g. in root layout)
export function configureGoogleSignIn(): void {
  GoogleSignin.configure({
    webClientId: GOOGLE_WEB_CLIENT_ID,
  });
}

// Call this when the user taps the sign-in button
export async function onGoogleButtonPress(): Promise<void> {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();

    if (userInfo.data?.idToken) {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: userInfo.data.idToken,
      });

      if (error) console.error('Supabase sign-in error:', error.message);
    }
  } catch (error) {
    console.error('Google sign-in error:', error);
  }
}