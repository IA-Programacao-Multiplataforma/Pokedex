import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pokemon } from '@/@types/pokemon';
import { getPokemon } from '@/integration/pokemonIntegration';
import { getTeam, updateTeam, deleteCapturedPokemon, getCapturedFromApi } from '@/integration/teamIntegration'; 
import { useAuth } from '@/context/AuthContext'; 
import PokemonCard from '@/componets/card';
import PokemonList from '@/componets/List';
import Header from '@/componets/header';
import { styles, modalStyles } from '@/styles/teamStyles';

export default function TeamScreen() {
    const { user } = useAuth(); 
    const [loading, setLoading] = useState(true);
    
    const [myTeam, setMyTeam] = useState<Pokemon[]>([]);
    const [others, setOthers] = useState<Pokemon[]>([]);
    const [swapCandidate, setSwapCandidate] = useState<Pokemon | null>(null);

    const [actionModal, setActionModal] = useState<{visible: boolean, pokemon: Pokemon | null}>({visible: false, pokemon: null});
    const [msgModal, setMsgModal] = useState<{visible: boolean, title: string, message: string}>({visible: false, title: '', message: ''});

    const currentUserId = user && typeof user === 'object' 
        ? String((user as any).id || (user as any).uid) 
        : String(user || '');

    async function loadTeamData() {
        try {
            setLoading(true);
            const allPokemon = await getPokemon(149);
            
            let teamIds: string[] = [];
            let capturedIds: string[] = []; 

            if (currentUserId) {
                const localTeam = await AsyncStorage.getItem(`@MyTeam:${currentUserId}`);
                
                if (localTeam && JSON.parse(localTeam).length > 0) {
                    teamIds = JSON.parse(localTeam);
                } else {
                    teamIds = await getTeam(currentUserId);
                }

                const cloudCaptured = await getCapturedFromApi(currentUserId);
                const storedCaptured = await AsyncStorage.getItem(`@Captured:${currentUserId}`);
                const localCaptured = storedCaptured ? JSON.parse(storedCaptured) : [];
                
                capturedIds = Array.from(new Set([...cloudCaptured, ...localCaptured]));
                await AsyncStorage.setItem(`@Captured:${currentUserId}`, JSON.stringify(capturedIds));
            }

            let finalTeam: Pokemon[] = [];
            if (teamIds && teamIds.length > 0) {
                finalTeam = allPokemon.filter(pokemonLocal => 
                    teamIds.some(idApi => parseInt(idApi, 10) === parseInt(pokemonLocal.index, 10))
                );
            }

            if (finalTeam.length === 0) {
                const shuffled = [...allPokemon].sort(() => 0.5 - Math.random());
                finalTeam = shuffled.slice(0, 5);
                const newTeamIds = finalTeam.map(p => p.index);
                await AsyncStorage.setItem(`@MyTeam:${currentUserId}`, JSON.stringify(newTeamIds));
            }

            const capturedPokemon = allPokemon.filter(pokemonLocal => 
                capturedIds.some(idApi => parseInt(idApi, 10) === parseInt(pokemonLocal.index, 10)) &&
                !finalTeam.some(teamPoke => parseInt(teamPoke.index, 10) === parseInt(pokemonLocal.index, 10))
            );

            setMyTeam(finalTeam);
            setOthers(capturedPokemon);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadTeamData();
    }, [user]);

    const handleReservePress = (pokemon: Pokemon) => {
        if (swapCandidate) return; 
        setActionModal({ visible: true, pokemon });
    };

    const releasePokemon = async (pokemon: Pokemon) => {
        if (!currentUserId) return;
        setActionModal({ visible: false, pokemon: null });
        
        await deleteCapturedPokemon(currentUserId, pokemon.index);
        
        const storedCaptured = await AsyncStorage.getItem(`@Captured:${currentUserId}`);
        let capturedArray = storedCaptured ? JSON.parse(storedCaptured) : [];
        capturedArray = capturedArray.filter((id: string) => parseInt(id, 10) !== parseInt(pokemon.index, 10));
        await AsyncStorage.setItem(`@Captured:${currentUserId}`, JSON.stringify(capturedArray));
        
        setMsgModal({ visible: true, title: "Adeus!", message: `${pokemon.nome} foi devolvido para a natureza.` });
        loadTeamData(); 
    };

    const executeSwap = async (pokemonToRemove: Pokemon) => {
        if (!currentUserId || !swapCandidate) return;
        
        setLoading(true);
        await updateTeam(currentUserId, pokemonToRemove.index, swapCandidate.index);
        
        const storedCaptured = await AsyncStorage.getItem(`@Captured:${currentUserId}`);
        let capturedArray = storedCaptured ? JSON.parse(storedCaptured) : [];
        capturedArray = capturedArray.filter((id: string) => parseInt(id, 10) !== parseInt(swapCandidate.index, 10)); 
        capturedArray.push(pokemonToRemove.index); 
        await AsyncStorage.setItem(`@Captured:${currentUserId}`, JSON.stringify(capturedArray));
        
        const localTeam = await AsyncStorage.getItem(`@MyTeam:${currentUserId}`);
        let teamArray = localTeam ? JSON.parse(localTeam) : myTeam.map(p => p.index);
        teamArray = teamArray.filter((id: string) => parseInt(id, 10) !== parseInt(pokemonToRemove.index, 10));
        teamArray.push(swapCandidate.index);
        await AsyncStorage.setItem(`@MyTeam:${currentUserId}`, JSON.stringify(teamArray));
        
        setMsgModal({ 
            visible: true, 
            title: "Sucesso!", 
            message: `${swapCandidate.nome} entrou no seu time no lugar de ${pokemonToRemove.nome}!` 
        });
        
        setSwapCandidate(null);
        loadTeamData();
    };

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#FFCC00" />
                <Text style={styles.loadingText}>A atualizar o Sistema do PC...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Header />

            {swapCandidate && (
                <View style={{ backgroundColor: '#E3350D', padding: 10, alignItems: 'center' }}>
                    <Text style={{ color: '#FFF', fontWeight: 'bold', textAlign: 'center' }}>
                        Selecione quem vai sair do time para dar lugar ao {swapCandidate.nome}
                    </Text>
                    <TouchableOpacity onPress={() => setSwapCandidate(null)}>
                        <Text style={{ color: '#FFCC00', marginTop: 5, textDecorationLine: 'underline' }}>Cancelar Troca</Text>
                    </TouchableOpacity>
                </View>
            )}

            <PokemonList 
                data={others} 
                hideEvolve={true} 
                onPokemonPress={handleReservePress}
                ListHeaderComponent={
                    <View style={styles.teamSection}>
                        <Text style={styles.sectionTitle}>MEU TIME ATUAL</Text>
                        <View style={[styles.teamCard, swapCandidate ? { borderColor: '#E3350D' } : {}]}>
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.teamScroll}>
                                {myTeam.map((p) => (
                                    <View key={p.index} style={styles.teamMemberWrapper}>
                                        <PokemonCard 
                                            pokemon={p} 
                                            hideEvolve={true} 
                                            onPress={swapCandidate ? () => executeSwap(p) : undefined} 
                                        />
                                    </View>
                                ))}
                            </ScrollView>
                        </View>
                        <Text style={styles.sectionTitle}>OUTROS POKÉMONS DISPONÍVEIS</Text>
                        
                        {others.length === 0 ? (
                            <Text style={{ color: '#aaa', textAlign: 'center', marginVertical: 30, fontSize: 14 }}>
                                A sua reserva está vazia. Batalhe para capturar mais Pokémons!
                            </Text>
                        ) : null}
                    </View>
                }
            />

            <Modal animationType="fade" transparent={true} visible={actionModal.visible}>
                <View style={modalStyles.overlay}>
                    <View style={modalStyles.modalBox}>
                        <Text style={modalStyles.modalTitle}>Gerir Reserva</Text>
                        <Text style={modalStyles.modalText}>
                            O que deseja fazer com {actionModal.pokemon?.nome}?
                        </Text>

                        <TouchableOpacity 
                            style={modalStyles.buttonPrimary} 
                            onPress={() => {
                                setSwapCandidate(actionModal.pokemon);
                                setActionModal({ visible: false, pokemon: null });
                                setMsgModal({ visible: true, title: "Modo de Troca", message: `Agora toque no Pokémon do seu TIME ATUAL que deseja substituir por ${actionModal.pokemon?.nome}.` });
                            }}
                        >
                            <Text style={modalStyles.buttonTextDark}>🔄 Trocar para o Time</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={modalStyles.buttonDanger} 
                            onPress={() => actionModal.pokemon && releasePokemon(actionModal.pokemon)}
                        >
                            <Text style={modalStyles.buttonTextWhite}>🗑️ Soltar (Deletar)</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={modalStyles.buttonCancel} 
                            onPress={() => setActionModal({ visible: false, pokemon: null })}
                        >
                            <Text style={modalStyles.buttonTextWhite}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal animationType="fade" transparent={true} visible={msgModal.visible}>
                <View style={modalStyles.overlay}>
                    <View style={modalStyles.modalBox}>
                        <Text style={modalStyles.modalTitle}>{msgModal.title}</Text>
                        <Text style={modalStyles.modalText}>{msgModal.message}</Text>
                        <TouchableOpacity 
                            style={modalStyles.buttonPrimary} 
                            onPress={() => setMsgModal({ visible: false, title: '', message: '' })}
                        >
                            <Text style={modalStyles.buttonTextDark}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}