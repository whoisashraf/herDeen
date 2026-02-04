import { authService } from '@/services/auth-service';
import type { ReactNode } from 'react';
import React, { createContext, useContext, useState } from 'react';

type User = { id: string; email: string; firstName?: string; lastName?: string } | null;

type AuthContextType = {
    isAuthenticated: boolean;
    user: User;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
    signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User>(null);
    const [token, setToken] = useState<string | null>(null);

    const signIn = async (email: string, password: string) => {
        const res = await authService.login(email, password);
        setToken(res.token);
        setUser(res.user);
    };

    const signUp = async (firstName: string, lastName: string, email: string, password: string) => {
        const res = await authService.signUp(firstName, lastName, email, password);
        setToken(res.token);
        setUser(res.user);
    };

    const signOut = () => {
        setToken(null);
        setUser(null);
    };

    const ctx: AuthContextType = {
        isAuthenticated: !!token,
        user,
        signIn,
        signUp,
        signOut,
    };

    return <AuthContext.Provider value={ctx}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
    return ctx;
}
