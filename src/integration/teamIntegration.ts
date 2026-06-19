import axios from 'axios';

const API_URL = 'https://lnh1dhp1mj.execute-api.us-east-1.amazonaws.com/api-pokemon/pokemon/v1';

// 🔥 O SEGREDO DO ERRO 400: Limpa os zeros à esquerda (ex: "001" vira "1")
const cleanId = (id: string) => parseInt(id, 10).toString();

export const getTeam = async (userId: string): Promise<string[]> => {
    try {
        const response = await axios.get(`${API_URL}/team`, {
            params: { 'user-id': userId }
        });
        if (response.data && response.data.team) {
            return response.data.team.map((p: any) => String(p.index || p.id));
        }
        return [];
    } catch (error) {
        console.error("Erro ao buscar o time na nuvem:", error);
        return [];
    }
};

// 👇 NOVA FUNÇÃO: Busca os capturados direto da AWS (Para o computador ver!)
export const getCapturedFromApi = async (userId: string): Promise<string[]> => {
    try {
        const response = await axios.get(`${API_URL}/captured`, {
            params: { 'user-id': userId }
        });
        
        if (response.data) {
            const list = response.data.captured || response.data;
            if (Array.isArray(list)) {
                return list.map((p: any) => String(p.index || p.id || p));
            }
        }
        return [];
    } catch (error) {
        // Se a rota não existir, ignora e o App vai usar a memória do celular
        return [];
    }
};

export const updateTeam = async (userId: string, removedId: string, newId: string): Promise<boolean> => {
    try {
        await axios.put(`${API_URL}/team`, null, {
            params: { 
                'user-id': userId,
                'removed-pokemon': cleanId(removedId), 
                'new-pokemon': cleanId(newId)          
            }
        });
        return true;
    } catch (error) {
        console.error("Erro ao atualizar o Pokémon no time:", error);
        return false;
    }
};

export const captureNewPokemon = async (userId: string, pokemonId: string): Promise<boolean> => {
    try {
        await axios.put(`${API_URL}/captured`, null, {
            params: { 
                'user-id': userId,
                'pokemon-id': cleanId(pokemonId) 
            }
        });
        return true;
    } catch (error) {
        console.error("Erro ao capturar Pokémon na AWS:", error);
        return false;
    }
};

export const deleteCapturedPokemon = async (userId: string, pokemonId: string): Promise<boolean> => {
    try {
        await axios.delete(`${API_URL}/captured`, {
            params: { 
                'user-id': userId,
                'pokemon-id': cleanId(pokemonId) 
            }
        });
        return true;
    } catch (error) {
        console.error("Erro ao deletar Pokémon na AWS:", error);
        return false;
    }
};