import axios from 'axios';
import { AuthCredentials, AuthResponse } from '@/@types/auth';

const AUTH_API = axios.create({
    baseURL: 'https://lnh1dhp1mj.execute-api.us-east-1.amazonaws.com/api-pokemon/auth/v1',
});

// Função de Login
export const loginRequest = async (credentials: AuthCredentials): Promise<AuthResponse> => {
    const response = await AUTH_API.post<AuthResponse>('/login', credentials);
    return response.data;
};

// Função de Registro
export const registerRequest = async (credentials: AuthCredentials): Promise<AuthResponse> => {
    const response = await AUTH_API.post<AuthResponse>('/register', credentials);
    return response.data;
};