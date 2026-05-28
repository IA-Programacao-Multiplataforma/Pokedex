import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Pokemon } from '@/@types/pokemon';
import { getPokemonById } from '@/integration/pokemonIntegration';
import { kantoEvolutions } from '@/utils/evolutions'; 
import { styles } from './style';

const typeColors: Record<string, string> = {
    fire: '#F08030', water: '#6890F0', grass: '#78C850', electric: '#F8D030',
    bug: '#A8B820', normal: '#A8A878', poison: '#A040A0', default: '#D3D3D3'
};

export default function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
    const [currentPokemon, setCurrentPokemon] = useState<Pokemon>(pokemon);
    const [isEvolving, setIsEvolving] = useState(false);

    useEffect(() => {
        setCurrentPokemon(pokemon);
    }, [pokemon]);

    const mainType = currentPokemon.tipos[0]?.toLowerCase() || 'default';
    const backgroundColor = typeColors[mainType] || typeColors.default;
    const hpStat = currentPokemon.poderes.find(p => p.nome === 'hp')?.forca || '???';

    const currentId = parseInt(currentPokemon.index);
    const nextEvolutionId = kantoEvolutions[currentId];
    
    const canEvolve = nextEvolutionId !== undefined;
    const canDevolve = currentPokemon.index !== pokemon.index;

    const handleEvolve = async () => {
        if (!canEvolve) return;

        setIsEvolving(true);
        try {
            const evolvedPokemon = await getPokemonById(nextEvolutionId);
            setCurrentPokemon(evolvedPokemon);
        } catch (error) {
            console.error("Erro ao evoluir", error);
        } finally {
            setIsEvolving(false);
        }
    };

    const handleDevolve = () => {
        setCurrentPokemon(pokemon);
    };

    return (
        <View style={[styles.cardContainer, { backgroundColor }]}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.pokemonName}>{currentPokemon.nome}</Text>
                    <Text style={styles.pokemonId}>Nº {currentPokemon.index}</Text>
                </View>
                
                <View style={styles.headerRight}>
                    <Text style={styles.hpText}>HP {hpStat}</Text>
                    
                    <View style={styles.actionsContainer}>
                        {canDevolve && (
                            <TouchableOpacity 
                                style={[styles.actionButton, styles.devolveButton]} 
                                onPress={handleDevolve}
                            >
                                <Text style={styles.devolveButtonText}>↩ Voltar</Text>
                            </TouchableOpacity>
                        )}

                        {canEvolve && (
                            <TouchableOpacity 
                                style={[styles.actionButton, styles.evolveButton]} 
                                onPress={handleEvolve}
                                disabled={isEvolving}
                            >
                                {isEvolving ? (
                                    <ActivityIndicator size="small" color="#333" />
                                ) : (
                                    <Text style={styles.evolveButtonText}>⬆ Evoluir</Text>
                                )}
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </View>

            <View style={styles.imageFrame}>
                {currentPokemon.imagem ? (
                    <Image source={{ uri: currentPokemon.imagem }} style={styles.image} resizeMode="contain" />
                ) : (
                    <Text>Sem Imagem</Text>
                )}
            </View>

            <View style={styles.typesContainer}>
                {currentPokemon.tipos.map((tipo, idx) => (
                    <Text key={idx} style={styles.typeText}>• {tipo} •</Text>
                ))}
            </View>

            <View style={styles.attacksContainer}>
                {currentPokemon.poderes.slice(1, 4).map((poder, idx) => (
                    <View key={idx} style={styles.attackRow}>
                        <Text style={styles.attackName}>⚔️ {poder.nome}</Text>
                        <Text style={styles.attackDamage}>{poder.forca}</Text>
                    </View>
                ))}
            </View>
        </View>
    );
}
