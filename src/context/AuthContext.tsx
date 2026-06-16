import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginRequest } from '../integration/authIntegration'; 

type AuthContextData = {
    isAuthenticated: boolean;
    user: string | null;
    isLoading: boolean;
    signIn: (username: string, password: string) => Promise<boolean>; 
    signOut: () => void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData() {
            const storedUser = await AsyncStorage.getItem('@Auth:user');
            if (storedUser) {
                setUser(storedUser);
                setIsAuthenticated(true);
            }
            setIsLoading(false);
        }
        loadStorageData();
    }, []);

    async function signIn(username: string, password: string): Promise<boolean> {
        try {
            const data = await loginRequest({ username, password });
            
            const displayName = data.userId;

            setUser(displayName);
            setIsAuthenticated(true);

            await AsyncStorage.setItem('@Auth:user', displayName);


            return true;
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            return false;
        }
    }

    async function signOut() {
        setUser(null);
        setIsAuthenticated(false);
        await AsyncStorage.removeItem('@Auth:user');
        await AsyncStorage.removeItem('@Auth:token');
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, signIn, signOut, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);