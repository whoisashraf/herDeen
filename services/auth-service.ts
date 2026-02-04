import { Platform } from 'react-native';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3000/api'; // Placeholder API URL

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  };
}

interface AuthError {
  message: string;
  statusCode: number;
}

export class AuthService {
  async login(email: string, password: string): Promise<AuthResponse> {
    console.log(`Attempting to log in user: ${email}`);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'test@example.com' && password === 'password') {
          resolve({
            token: 'mock-auth-token-123',
            user: { id: '1', email, firstName: 'Test', lastName: 'User' },
          });
        } else {
          reject({ message: 'Invalid credentials', statusCode: 401 } as AuthError);
        }
      }, 1000); // Simulate network delay
    });
  }

  async signUp(firstName: string, lastName: string, email: string, password: string): Promise<AuthResponse> {
    console.log(`Attempting to sign up user: ${email}`);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'new@example.com') {
          reject({ message: 'Email already registered', statusCode: 409 } as AuthError);
        } else {
          resolve({
            token: 'mock-new-user-token-456',
            user: { id: '2', email, firstName, lastName },
          });
        }
      }, 1500); // Simulate network delay
    });
  }

  // In a real app, you might have other methods like forgotPassword, refreshToken, etc.
}

export const authService = new AuthService();
