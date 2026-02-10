import { GOOGLE_WEB_CLIENT_ID } from '@/constants/api';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { supabase } from './supabase';

// Call this once when the app starts (e.g. in root layout)
export function configureGoogleSignIn(): void {
  GoogleSignin.configure({
    // This is for Supabase to verify the user
    webClientId: GOOGLE_WEB_CLIENT_ID,
    // THIS IS THE MISSING PIECE: The iOS Client ID from Google Console
    iosClientId: '774533838966-pdiikkfdbv786911r87jj62tkqiigmja.apps.googleusercontent.com',
    offlineAccess: true,
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

export async function signOut(): Promise<void> {
  try {
    await GoogleSignin.signOut();
    await supabase.auth.signOut();
  } catch (error) {
    console.error('Sign out error:', error);
  }
}