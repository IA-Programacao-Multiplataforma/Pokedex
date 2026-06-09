import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import CustomizationModal from '../../componets/modal-perfil/customization-modal';
import {styles} from '../(app)/profile';
import BackButton  from '../../componets/button-back/button-back';

export default function Profile() {
    const router = useRouter();
    const { signOut } = useAuth();

    const [avatar, setAvatar] = useState<string>('https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjxLvyyzrsdMKUqGZciyYYbEgPdbIz21P4ATE-pjai8GL38-Ag3ANtGOBxs35FQbO3RqZWFl5g0wuzrx0MeElIKjWAkmDEDAXngsodAjKVIzMn8W0OysbeyjsOoZ96oPG0APH2PGC4hk9o/s200/01+ash.PNG');
    const [pokeballColor, setPokeballColor] = useState<string>('#E61C1C');
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const trainerName = "NOME";
    const totalBattles = 40;
    const wins = 20;
    const losses = 20;

    const handleSaveCustomization = (newAvatar: string, newColor: string) => {
        setAvatar(newAvatar);
        setPokeballColor(newColor);
    };

    const handleBackAction = () => {
        if (router.canGoBack()) {
            router.back();
        } else {
            router.replace('/pokedex'); 
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
            </View>

            {/* --- CONTEÚDO PRINCIPAL DO PERFIL --- */}
            <View style={styles.profileContent}>
                <Text style={styles.trainerNameText}>{trainerName}</Text>

                {/* Card de Estatísticas Escuro */}
                <View style={styles.statsCard}>
                    
                    {/* Seção Principal: Vitórias */}
                    <View style={styles.winsMainBox}>
                        <Text style={styles.winsTitle}>VITORIAS</Text>
                        <View style={styles.valueRow}>
                            <Text style={styles.trophyIcon}>🏆</Text>
                            <Text style={styles.mainStatNumber}>{wins}</Text>
                        </View>
                    </View>

                    {/* Sub-seções: Batalhas e Derrotas */}
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

                </View>

                {/* Botão SAIR estruturado na parte inferior da tela */}
                <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
                    <Text style={styles.logoutText}>SAIR</Text>
                </TouchableOpacity>
            </View>

            {/* Modal de Customização Importado */}
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

