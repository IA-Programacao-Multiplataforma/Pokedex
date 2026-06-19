import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { Pokemon } from '@/@types/pokemon';
import { getPokemon } from '@/integration/pokemonIntegration';
import { getTeam } from '@/integration/teamIntegration'; 
import { useAuth } from '@/context/AuthContext'; 
import PokemonCard from '@/componets/card';
import PokemonList from '@/componets/List';
import Header from '@/componets/header';
import { styles } from '@/styles/teamStyles';

export default function TeamScreen() {
    const { user } = useAuth(); 
    const [loading, setLoading] = useState(true);
    const [myTeam, setMyTeam] = useState<Pokemon[]>([]);
    const [others, setOthers] = useState<Pokemon[]>([]);

    useEffect(() => {
        async function loadTeamData() {
            try {
                // 1. Busca os 149 Pokémons da Pokédex local (com os IDs em formato "001", "099")
                const allPokemon = await getPokemon(149);
                
                // Extrai o ID do usuário de forma segura
                const currentUserId = user && typeof user === 'object' 
                    ? String((user as any).id || (user as any).uid) 
                    : String(user || '');

                let teamIds: string[] = [];
                if (currentUserId) {
                    teamIds = await getTeam(currentUserId);
                }

                let finalTeam: Pokemon[] = [];

                // 2. Se a API retornou os IDs do time (formatos como "114", "99")
                if (teamIds && teamIds.length > 0) {
                    // Corrigimos o match convertendo ambos para Número Inteiro.
                    // Assim, "099" vira 99 e "99" vira 99, dando o match perfeito!
                    finalTeam = allPokemon.filter(pokemonLocal => 
                        teamIds.some(idApi => parseInt(idApi, 10) === parseInt(pokemonLocal.index, 10))
                    );
                }

                // 3. Caso de segurança: se a API falhar ou estiver vazia, sorteia 5 iniciais
                if (finalTeam.length === 0) {
                    const shuffled = [...allPokemon].sort(() => 0.5 - Math.random());
                    finalTeam = shuffled.slice(0, 5);
                }

                // Como combinado, a lista de reservas ("Outros") inicia 100% vazia
                setMyTeam(finalTeam);
                setOthers([]);

            } catch (error) {
                console.error("Erro ao carregar os dados no Centro Pokémon:", error);
            } finally {
                setLoading(false);
            }
        }

        loadTeamData();
    }, [user]);

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#FFCC00" />
                <Text style={styles.loadingText}>Conectando ao Centro Pokémon...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header />

            <PokemonList 
                data={others} 
                isSilhouetteList={true}  
                hideEvolve={true}       
                ListHeaderComponent={
                    <View style={styles.teamSection}>
                        <Text style={styles.sectionTitle}>MEU TIME ATUAL</Text>
                        <View style={styles.teamCard}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.teamScroll}>
                                {myTeam.map((p) => (
                                    <View key={p.index} style={styles.teamMemberWrapper}>
                                        <PokemonCard pokemon={p} hideEvolve={true} />
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                        <Text style={styles.sectionTitle}>OUTROS POKÉMONS DISPONÍVEIS</Text>
                        {others.length === 0 && (
                            <Text style={{ color: '#aaa', textAlign: 'center', marginVertical: 30, fontSize: 14 }}>
                                Você ainda não possui Pokémons na reserva. Explore para capturar!
                            </Text>
                        )}
                    </View>
                }
            />
        </View>
    );
}