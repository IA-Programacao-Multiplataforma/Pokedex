import axios from 'axios';

const API_URL = 'https://lnh1dhp1mj.execute-api.us-east-1.amazonaws.com/api-pokemon/pokemon/v1';

export const getTeam = async (userId: string): Promise<string[]> => {
    try {
        const response = await axios.get(`${API_URL}/team`, {
            params: { 'user-id': userId }
        });

        return response.data || [];
        
    } catch (error) {
        console.error("Erro ao buscar o time na nuvem:", error);
        return [];
    }
};