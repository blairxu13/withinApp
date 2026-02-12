import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { supabase } from './supabase';

// Completes any pending auth redirect when the app re-opens
WebBrowser.maybeCompleteAuthSession();

// Build the redirect URI from the scheme defined in app.json ("withinapp")
const redirectUri = AuthSession.makeRedirectUri();

/**
 * Opens a browser for Google sign-in via Supabase OAuth.
 * Works in Expo Go — no dev build required.
 *
 * Flow:
 * 1. Ask Supabase for the Google OAuth URL
 * 2. Open that URL in a browser (user signs in with Google)
 * 3. Google redirects back to Supabase, Supabase redirects back to our app
 * 4. We extract the access_token + refresh_token from the redirect URL
 * 5. Set the session in Supabase so the user is logged in
 *
 * Returns true if sign-in succeeded, false otherwise.
 */
export async function signInWithGoogle(): Promise<boolean> {
  try {
    // Step 1: Get the OAuth URL from Supabase
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUri,
        skipBrowserRedirect: true, // We'll open the browser ourselves
      },
    });

    if (error || !data.url) {
      console.error('OAuth URL error:', error?.message);
      return false;
    }

    // Step 2: Open browser for Google sign-in
    const result = await WebBrowser.openAuthSessionAsync(data.url, redirectUri);

    if (result.type !== 'success') {
      // User cancelled or something went wrong
      return false;
    }

    // Step 3: Parse tokens from the redirect URL
    // Supabase returns them as URL hash fragments: ...#access_token=xxx&refresh_token=xxx
    const url = result.url;
    const hashPart = url.split('#')[1];

    if (!hashPart) {
      console.error('No hash fragment in redirect URL');
      return false;
    }

    const params: Record<string, string> = {};
    hashPart.split('&').forEach((pair) => {
      const [key, value] = pair.split('=');
      if (key && value) params[key] = decodeURIComponent(value);
    });

    const accessToken = params['access_token'];
    const refreshToken = params['refresh_token'];

    if (!accessToken || !refreshToken) {
      console.error('Missing tokens in redirect URL');
      return false;
    }

    // Step 4: Set the session in Supabase
    const { error: sessionError } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    if (sessionError) {
      console.error('Session error:', sessionError.message);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Sign-in error:', error);
    return false;
  }
}
