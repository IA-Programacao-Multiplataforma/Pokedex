import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { Pokemon } from '@/@types/pokemon';
import { getPokemon } from '@/integration/pokemonIntegration';
import { getTeam } from '@/integration/teamIntegration'; 
import { useAuth } from '@/context/AuthContext'; 
import PokemonCard from '@/componets/card';
import PokemonList from '@/componets/List';
import Header from '@/componets/header';
import { evolvedIds } from '@/utils/evolutions';

export default function TeamScreen() {
    const { user } = useAuth(); 
    const [loading, setLoading] = useState(true);
    const [myTeam, setMyTeam] = useState<Pokemon[]>([]);
    const [others, setOthers] = useState<Pokemon[]>([]);

    useEffect(() => {
        async function loadTeamData() {
            try {
                const allPokemon = await getPokemon(151);
                
                const baseForms = allPokemon.filter(p => !evolvedIds.includes(parseInt(p.index)));

                let teamIds: string[] = [];
                if (user) {
                    teamIds = await getTeam(user);
                }

                let finalTeam: Pokemon[] = [];
                let finalOthers: Pokemon[] = [];

                if (teamIds.length > 0) {
                    finalTeam = baseForms.filter(p => teamIds.includes(p.index));
                    finalOthers = baseForms.filter(p => !teamIds.includes(p.index));
                } else {
                    const shuffled = [...baseForms].sort(() => 0.5 - Math.random());
                    finalTeam = shuffled.slice(0, 5);
                    finalOthers = shuffled.slice(5);
                }

                setMyTeam(finalTeam);
                setOthers(finalOthers);

            } catch (error) {
                console.error("Erro ao carregar os dados da tela de time:", error);
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
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#222224' },
    centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#222224' },
    loadingText: { color: '#FFF', marginTop: 10, fontWeight: 'bold' },
    teamSection: { paddingHorizontal: 15, marginBottom: 20 },
    sectionTitle: { color: '#FFCC00', fontSize: 20, fontWeight: 'bold', marginBottom: 10, textTransform: 'uppercase' },
    teamCard: { backgroundColor: '#333', borderRadius: 20, padding: 15, borderWidth: 3, borderColor: '#FFCC00', marginBottom: 20 },
    teamScroll: { gap: 15 },
    teamMemberWrapper: { width: 180 }
});