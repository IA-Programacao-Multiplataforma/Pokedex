import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Pokemon } from '@/@types/pokemon';
import { getPokemon } from '@/integration/pokemonIntegration';
import PokemonList from '@/componets/List';
import Header from '@/componets/header';
import { evolvedIds } from '@/utils/evolutions'; 
import { styles } from '../../styles/pokedexStyles'; 
import { useAuth } from '@/context/AuthContext';
import route, { Redirect } from 'expo-router';

export default function Pokedex() {
    const [loading, setLoading] = useState(true);
    const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);  

    useEffect(() => {
        async function loadData() {
            try {
                const data = await getPokemon(151);
                
                const baseFormsOnly = data.filter(
                    (p) => !evolvedIds.includes(parseInt(p.index))
                );

                setPokemonList(baseFormsOnly);
            } catch (error) {
                console.error('Erro ao carregar os pokémons:', error);
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    return (
        <View style={styles.container}>
            <Header />

            {loading ? (
                <View style={styles.centerContainer}>
                    <ActivityIndicator size="large" color="#FFCC00" />
                    <Text style={styles.loadingText}>Abrindo pacotes de cartas...</Text>
                </View>
            ) : (
                <PokemonList data={pokemonList} />
            )}
        </View>
    );
}