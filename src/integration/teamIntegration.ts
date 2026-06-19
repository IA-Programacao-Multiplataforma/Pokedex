import axios from 'axios';

const API_TEAM = 'https://lnh1dhp1mj.execute-api.us-east-1.amazonaws.com/api-pokemon/pokemon/v1';
const API_TEAM_UPDATE = 'localhost:8080/api-pokemon/pokemon/v1'

// Busca os pokémons atuais do time do usuário
export const getTeam = async (userId: string): Promise<string[]> => {
    try {
        const response = await axios.get(`${API_TEAM}/team`, {
            params: { 'user-id': userId }
        });

        if (response.data && response.data.team) {
            return response.data.team.map((p: any) => String(p.index));
        }
        
        return [];
    } catch (error) {
        console.error("Erro ao buscar o time na nuvem:", error);
        return [];
    }
};

// Substitui um Pokémon específico do time por outro (Conforme imagem do Postman)
export const updateTeam = async (userId: string, removedId: string, newId: string): Promise<boolean> => {
    try {
        await axios.put(`${API_TEAM_UPDATE}/team`, null, {
            params: { 
                'user-id': userId,
                'removed-pokemon': removedId,
                'new-pokemon': newId
            }
        });
        return true;
    } catch (error) {
        console.error("Erro ao atualizar o Pokémon no time:", error);
        return false;
    }
};