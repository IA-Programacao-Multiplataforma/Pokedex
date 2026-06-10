import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Pokemon } from '@/@types/pokemon';
import { getPokemon } from '@/integration/pokemonIntegration';
import PokemonCard from '@/componets/card';
import Header from '@/componets/header';
import { evolvedIds } from '@/utils/evolutions';

export default function TeamScreen() {
    const [loading, setLoading] = useState(true);
    const [myTeam, setMyTeam] = useState<Pokemon[]>([]);
    const [others, setOthers] = useState<Pokemon[]>([]);

    useEffect(() => {
        async function loadInitialData() {
            try {
                const data = await getPokemon(151);
                
                const baseForms = data.filter(p => !evolvedIds.includes(parseInt(p.index)));

                const shuffled = [...baseForms].sort(() => 0.5 - Math.random());

                setMyTeam(shuffled.slice(0, 5));
                setOthers(shuffled.slice(5));

            } catch (error) {
                console.error("Erro ao carregar time:", error);
            } finally {
                setLoading(false);
            }
        }
        loadInitialData();
    }, []);

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#FFCC00" />
                <Text style={styles.loadingText}>Montando seu time...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header />

            <FlatList
                data={others}
                keyExtractor={(item) => item.index.toString()}
                numColumns={2}
                columnWrapperStyle={styles.row}
                renderItem={({ item }) => (
                    <View style={styles.cardWrapper}>
                        <PokemonCard pokemon={item} />
                    </View>
                )}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={true}
                ListHeaderComponent={
                    <View style={styles.teamSection}>
                        <Text style={styles.sectionTitle}>MEU TIME ATUAL</Text>
                        <View style={styles.teamCard}>
                            <FlatList
                                data={myTeam}
                                keyExtractor={(item) => item.index.toString()}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.teamScroll}
                                renderItem={({ item }) => (
                                    <View style={styles.teamMemberWrapper}>
                                        <PokemonCard pokemon={item} />
                                    </View>
                                )}
                            />
                        </View>
                        <Text style={styles.sectionTitle}>POKÉMONS CAPTURADOS</Text>
                    </View>
                }
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#18181B',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#18181B',
    },
    loadingText: {
        color: '#FFF',
        marginTop: 10,
        fontSize: 16,
    },

    contentContainer: {
        paddingHorizontal: 14,
        paddingBottom: 24,
    },
    teamSection: {
        marginBottom: 22,
    },
    sectionTitle: {
        color: '#FFCC00',
        fontSize: 20,
        fontWeight: '900',
        marginBottom: 12,
        textTransform: 'uppercase',
    },
    teamCard: {
        backgroundColor: '#1F1F24',
        borderRadius: 24,
        paddingVertical: 16,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: '#FFCC00',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.35,
        shadowRadius: 14,
        elevation: 10,
    },
    teamScroll: {
        gap: 16,
        paddingLeft: 6,
        paddingRight: 6,
    },
    teamMemberWrapper: {
        width: 180,
    },
    row: {
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 14,
    },
    cardWrapper: {
        flexBasis: '48%',
        maxWidth: '48%',
        alignItems: 'center',
    },
});