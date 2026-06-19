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

export const updateUserStats = async (userId: string, currentStats: UserStats, result: 'win' | 'loss'): Promise<void> => {
    try {
        const newWins = result === 'win' ? Number(currentStats.vitorias || 0) + 1 : Number(currentStats.vitorias || 0);
        const newLosses = result === 'loss' ? Number(currentStats.derrotas || 0) + 1 : Number(currentStats.derrotas || 0);
        
        await axios.put(`${API_URL}/stats/${userId}`, {
            level: currentStats.level || "1",
            vitorias: newWins.toString(),
            derrotas: newLosses.toString()
        });
    } catch (error) {
        console.error("Erro ao salvar o resultado da batalha:", error);
    }
};