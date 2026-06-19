import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Pokemon } from '@/@types/pokemon';
import { getPokemon } from '@/integration/pokemonIntegration';
import { getTeam, captureNewPokemon } from '@/integration/teamIntegration'; 
import PokemonCard from '@/componets/card';
import Header from '@/componets/header';
import { evolvedIds } from '@/utils/evolutions';
import { styles } from '@/styles/battleStyles';
import { useAuth } from '@/context/AuthContext';
import { getUserStats, updateUserStats } from '@/integration/userIntegration';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BattleScreen() {
    const router = useRouter();
    const { user } = useAuth(); 
    const [loading, setLoading] = useState(true);
    
    const [playerPokemon, setPlayerPokemon] = useState<Pokemon | null>(null);
    const [opponentPokemon, setOpponentPokemon] = useState<Pokemon | null>(null);
    
    const [isBattling, setIsBattling] = useState(false);
    const [chosenAttribute, setChosenAttribute] = useState<string | null>(null);
    const [battleMessage, setBattleMessage] = useState<string>("Clique no botão para sortear um atributo e iniciar a batalha!");
    const [winner, setWinner] = useState<'player' | 'opponent' | 'draw' | null>(null);
    const [hasCaptured, setHasCaptured] = useState(false);

    const currentUserId = user && typeof user === 'object' 
        ? String((user as any).id || (user as any).uid) 
        : String(user || '');

    useEffect(() => {
        loadFighters();
    }, [user]);

    async function loadFighters() {
        setLoading(true);
        setWinner(null);
        setChosenAttribute(null);
        setHasCaptured(false);
        setBattleMessage("Preparando a arena...");
        
        try {
            const allPokemon = await getPokemon(149);
            const baseForms = allPokemon.filter(p => !evolvedIds.includes(parseInt(p.index)));
            
            let teamIds: string[] = [];
            if (currentUserId) {
                teamIds = await getTeam(currentUserId);
            }

            let userTeamPokemon: Pokemon[] = [];
            if (teamIds && teamIds.length > 0) {
                userTeamPokemon = allPokemon.filter(pokemonLocal => 
                    teamIds.some(idApi => parseInt(idApi, 10) === parseInt(pokemonLocal.index, 10))
                );
            }

            if (userTeamPokemon.length > 0) {
                const randomPlayerIndex = Math.floor(Math.random() * userTeamPokemon.length);
                setPlayerPokemon(userTeamPokemon[randomPlayerIndex]);
            } else {
                const shuffledBase = [...baseForms].sort(() => 0.5 - Math.random());
                setPlayerPokemon(shuffledBase[0]);
            }

            const shuffledOpponent = [...baseForms].sort(() => 0.5 - Math.random());
            const filteredOpponent = shuffledOpponent.filter(p => p.index !== userTeamPokemon[0]?.index);
            setOpponentPokemon(filteredOpponent[0] || shuffledOpponent[0]);

            setBattleMessage("Lutadores a postos! Inicie a batalha.");
        } catch (error) {
            console.error("Erro ao carregar lutadores:", error);
            setBattleMessage("Erro ao carregar a arena.");
        } finally {
            setLoading(false);
        }
    }

    const startBattle = async () => { 
        if (!playerPokemon || !opponentPokemon) return;
        
        setIsBattling(true);
        setWinner(null);
        setBattleMessage("Sorteando atributo...");

        const randomIndex = Math.floor(Math.random() * playerPokemon.poderes.length);
        const selectedPower = playerPokemon.poderes[randomIndex];
        const opponentPower = opponentPokemon.poderes.find(p => p.nome === selectedPower.nome);

        const playerStat = parseInt(selectedPower.forca);
        const opponentStat = opponentPower ? parseInt(opponentPower.forca) : 0;

        setChosenAttribute(selectedPower.nome.toUpperCase());

        let matchResult: 'win' | 'loss' | 'draw' = 'draw';

        if (playerStat > opponentStat) {
            matchResult = 'win';
            setWinner('player');
            setBattleMessage(`Você Venceu! Seu ${selectedPower.nome} (${playerStat}) destruiu o do rival (${opponentStat}).`);
        } else if (opponentStat > playerStat) {
            matchResult = 'loss';
            setWinner('opponent');
            setBattleMessage(`Você Perdeu! O ${selectedPower.nome} do rival (${opponentStat}) superou o seu (${playerStat}).`);
        } else {
            setWinner('draw');
            setBattleMessage(`Empate! Ambos possuem ${playerStat} de ${selectedPower.nome}.`);
        }

        if (currentUserId && matchResult !== 'draw') {
            const currentStats = await getUserStats(currentUserId);
            await updateUserStats(currentUserId, currentStats, matchResult);
        }
        
        setIsBattling(false);
    };

    const handleCapture = async () => {
        if (!currentUserId || !opponentPokemon) return;
        
        const success = await captureNewPokemon(currentUserId, opponentPokemon.index);
        
        if (success) {
            setHasCaptured(true);
            
            const storedCaptured = await AsyncStorage.getItem(`@Captured:${currentUserId}`);
            const capturedArray = storedCaptured ? JSON.parse(storedCaptured) : [];
            
            if (!capturedArray.includes(opponentPokemon.index)) {
                capturedArray.push(opponentPokemon.index);
                await AsyncStorage.setItem(`@Captured:${currentUserId}`, JSON.stringify(capturedArray));
            }

            Alert.alert(
                "Captura Concluída! 🔴", 
                `${opponentPokemon.nome} foi capturado! Ele foi enviado para a reserva do seu Time.`
            );
        } else {
            Alert.alert("Ah não!", `O ${opponentPokemon.nome} escapou da Pokébola!`);
        }
    };

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#E3350D" />
                <Text style={styles.loadingText}>Conectando à Arena de Batalha...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Header />

            <View style={styles.arena}>
                <View style={[styles.fighterWrapper, winner === 'opponent' && styles.winnerGlow]}>
                    <Text style={styles.teamLabel}>RIVAL</Text>
                    {opponentPokemon && (
                        <PokemonCard pokemon={opponentPokemon} hideEvolve={true} />
                    )}
                </View>

                <View style={styles.vsPanel}>
                    <Text style={styles.vsText}>VS</Text>
                    
                    {chosenAttribute && (
                        <View style={styles.attributeBox}>
                            <Text style={styles.attributeLabel}>ATRIBUTO SORTEADO</Text>
                            <Text style={styles.attributeValue}>⚔️ {chosenAttribute} ⚔️</Text>
                        </View>
                    )}

                    <Text style={[
                        styles.messageText,
                        winner === 'player' && { color: '#78C850' },
                        winner === 'opponent' && { color: '#E3350D' },
                        winner === 'draw' && { color: '#FFCC00' }
                    ]}>
                        {battleMessage}
                    </Text>

                    <TouchableOpacity 
                        style={[styles.battleButton, isBattling && styles.battleButtonDisabled]} 
                        onPress={winner ? loadFighters : startBattle}
                        disabled={isBattling}
                    >
                        <Text style={styles.battleButtonText}>
                            {isBattling ? 'BATALHANDO...' : (winner ? 'PRÓXIMO ROUND' : '⚔️ BATALHAR !')}
                        </Text>
                    </TouchableOpacity>

                    {(winner === 'player' && !hasCaptured) && (
                        <TouchableOpacity 
                            style={[styles.battleButton, { backgroundColor: '#4CAF50', marginTop: 15, borderColor: '#1B5E20' }]} 
                            onPress={handleCapture}
                        >
                            <Text style={[styles.battleButtonText, { color: '#FFF' }]}>🔴 CAPTURAR RIVAL!</Text>
                        </TouchableOpacity>
                    )}

                    {hasCaptured && (
                        <Text style={{ color: '#4CAF50', fontWeight: 'bold', marginTop: 15, fontSize: 16 }}>
                            Pokémon Capturado! ✅
                        </Text>
                    )}
                </View>

                <View style={[styles.fighterWrapper, winner === 'player' && styles.winnerGlow]}>
                    <Text style={styles.teamLabel}>SEU POKÉMON</Text>
                    {playerPokemon && (
                        <PokemonCard pokemon={playerPokemon} hideEvolve={true} />
                    )}
                </View>
            </View>
        </ScrollView>
    );
}