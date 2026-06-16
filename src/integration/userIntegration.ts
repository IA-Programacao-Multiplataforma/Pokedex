import axios from 'axios';

const API_URL = 'https://lnh1dhp1mj.execute-api.us-east-1.amazonaws.com/api-pokemon/auth/v1';

export interface UserStats {
    level?: string | number;
    vitorias?: string | number;
    derrotas?: string | number;
}

export const getUserStats = async (userId: string): Promise<UserStats> => {
    try {
        const response = await axios.get(`${API_URL}/stats/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar status do treinador:", error);
        return { vitorias: 0, derrotas: 0, level: 1 }; 
    }
};