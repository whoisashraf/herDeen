import { useRouter, useSegments } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  signIn: (token: string) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false); // Simulate auth state
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Basic redirection logic based on authentication status
  useEffect(() => {
    if (!mounted) return;

    // For now, don't redirect - let users see the onboarding first
    // This can be enabled when the backend is ready
    /*
    const inAuthGroup = segments[0] === '(auth)';
    const inDrawerGroup = segments[0] === '(drawer)';
    const currentRoute = segments.join('/');
    const isOnboarding = currentRoute === 'index';

    if (isOnboarding) {
      return;
    }

    if (isAuthenticated && (inAuthGroup || inDrawerGroup)) {
      router.replace('/(drawer)');
    } else if (!isAuthenticated && !inAuthGroup && !isOnboarding) {
      router.replace('/(auth)/login');
    }
    */
  }, [isAuthenticated, segments, mounted]);

  const signIn = (token: string) => {
    // In a real app, you would store the token securely (e.g., AsyncStorage)
    // and validate it. For now, we just set isAuthenticated to true.
    console.log('Signing in with token:', token);
    setIsAuthenticated(true);
  };

  const signOut = () => {
    // In a real app, you would remove the token from storage
    console.log('Signing out');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

