import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './style';

export default function Header() {
    const router = useRouter();
    const { signOut } = useAuth();
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.header, { paddingTop: insets.top + 10 }]}> 
            <View style={styles.titleContainer}>
                <Text style={styles.title}>PokéApp</Text>
                <Text style={styles.subtitle}>Trainer Dashboard</Text>
            </View>

            <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.navButton} onPress={() => router.replace('/pokedex')}>
                    <Text style={styles.navText}>Pokedex</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.navButton, styles.activeButton]} onPress={() => router.replace('/team')}>
                    <Text style={[styles.navText, styles.activeButtonText]}>Time</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navButton} onPress={() => router.replace('/profile')}>
                    <Text style={styles.navText}>Perfil</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.navButton, styles.logoutButton]} onPress={signOut}>
                    <Text style={styles.navText}>Sair</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

