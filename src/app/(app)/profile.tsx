import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAuth } from '@/context/AuthContext';
import CustomizationModal from '@/componets/modal-perfil/customization-modal';
import BackButton from '@/componets/button-back/button-back';
import { styles } from '@/styles/profileStyles'; 
import { getUserStats, UserStats } from '@/integration/userIntegration'; 

export default function Profile() {
    const router = useRouter();
    const { user, signOut } = useAuth(); 

    const [avatar, setAvatar] = useState<string>('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjxLvyyzrsdMKUqGZciyYYbEgPdbIz21P4ATE-pjai8GL38-Ag3ANtGOBxs35FQbO3RqZWFl5g0wuzrx0MeElIKjWAkmDEDAXngsodAjKVIzMn8W0OysbeyjsOoZ96oPG0APH2PGC4hk9o/s200/01+ash.PNG');
    const [pokeballColor, setPokeballColor] = useState<string>('#E61C1C');
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    
    const [username, setUsername] = useState<string>('Treinador'); 
    const [isLoadingStats, setIsLoadingStats] = useState(true);
    const [stats, setStats] = useState<UserStats>({ vitorias: 0, derrotas: 0 });

    useEffect(() => {
        async function loadProfileData() {
            if (user) {
                const data = await getUserStats(user);
                setStats(data);
            }
            
            const storedName = await AsyncStorage.getItem('@Auth:username');
            const storedAvatar = await AsyncStorage.getItem('@Profile:avatar');
            const storedColor = await AsyncStorage.getItem('@Profile:color');

            if (storedName) setUsername(storedName);
            if (storedAvatar) setAvatar(storedAvatar);
            if (storedColor) setPokeballColor(storedColor);

            setIsLoadingStats(false);
        }
        loadProfileData();
    }, [user]);

    const wins = Number(stats.vitorias) || 0;
    const losses = Number(stats.derrotas) || 0;
    const totalBattles = wins + losses;
    const handleSaveCustomization = async (newAvatar: string, newColor: string) => {
        setAvatar(newAvatar);
        setPokeballColor(newColor);
        
        await AsyncStorage.setItem('@Profile:avatar', newAvatar);
        await AsyncStorage.setItem('@Profile:color', newColor);
    };

    const handleBackAction = () => {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace('/team'); 
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* --- TOPO ESTILO POKÉBOLA --- */}
            <View style={styles.pokeballHeader}>
                <View style={[styles.pokeballTop, { backgroundColor: pokeballColor }]} />
                <View style={styles.pokeballLine} />
                <View style={styles.pokeballCutout} />

                <BackButton onPress={handleBackAction} />

                <TouchableOpacity style={styles.avatarTouch} onPress={() => setModalVisible(true)}>
                    <Image source={{ uri: avatar }} style={styles.avatarImage} />
                </TouchableOpacity>

                {/* --- NOME DO TREINADOR NA PARTE BRANCA --- */}
                <Text style={{
                    position: 'absolute',
                    bottom: 20, 
                    alignSelf: 'center',
                    fontSize: 22,
                    fontWeight: '900',
                    color: '#222',
                    textTransform: 'uppercase',
                    letterSpacing: 1
                }}>
                    {username}
                </Text>
            </View>

            {/* --- CONTEÚDO PRINCIPAL DO PERFIL --- */}
            <View style={styles.profileContent}>
                <View style={styles.statsCard}>
                    {isLoadingStats ? (
                        <ActivityIndicator size="large" color="#FFCC00" style={{ padding: 40 }} />
                    ) : (
                        <>
                            <View style={styles.winsMainBox}>
                                <Text style={styles.winsTitle}>VITORIAS</Text>
                                <View style={styles.valueRow}>
                                    <Text style={styles.trophyIcon}>🏆</Text>
                                    <Text style={styles.mainStatNumber}>{wins}</Text>
                                </View>
                            </View>

                            <View style={styles.secondaryStatsRow}>
                                <View style={styles.subStatBox}>
                                    <Text style={styles.subStatTitle}>BATALHAS</Text>
                                    <View style={styles.valueRow}>
                                        <Text style={styles.swordsIcon}>⚔️</Text>
                                        <Text style={styles.subStatNumber}>{totalBattles}</Text>
                                    </View>
                                </View>

                                <View style={styles.subStatBox}>
                                    <Text style={styles.subStatTitle}>DERROTAS</Text>
                                    <View style={styles.valueRow}>
                                        <Text style={styles.shieldIcon}>🛡️</Text>
                                        <Text style={styles.subStatNumber}>{losses}</Text>
                                    </View>
                                </View>
                            </View>
                        </>
                    )}
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
                    <Text style={styles.logoutText}>SAIR</Text>
                </TouchableOpacity>
            </View>

            <CustomizationModal 
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                currentAvatar={avatar}
                currentBgColor={pokeballColor}
                onSave={handleSaveCustomization}
            />
        </SafeAreaView>
    );
}